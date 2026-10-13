import { LitElement, css, html } from "lit";
import "./composer.js";
import "./menu.js";
import { openMenuOnContext, postMenuItems, postProperties } from "./parts.js";
import "./post-form.js";
import { sharedStyles } from "./styles.js";
import { define, notifyError, relativeTime } from "./util.js";

/**
 * Detail view of a thread: the post (first message) as a full-width card
 * with its properties, below it the comments (all further messages).
 * Fires "back" when the user leaves the thread.
 */
class MbThread extends LitElement {
  static properties = {
    thread: { attribute: false },
    ctx: { attribute: false }, // { api, me, names, reactions, priorities, knownTags, language }
    _editingPost: { state: true },
    _editingComment: { state: true }, // message id
    _picker: { state: true }, // message id with open reaction picker
  };

  get _post() {
    return this.thread.messages[0];
  }

  get _comments() {
    return this.thread.messages.slice(1);
  }

  render() {
    const comments = this._comments;
    return html`
      <button class="plain back" @click=${this._back}>← Zurück</button>
      ${this._editingPost ? this._renderPostForm() : this._renderPost()}
      <h4>Kommentare${comments.length ? ` (${comments.length})` : ""}</h4>
      <div class="comments">${comments.map((m) => this._renderComment(m))}</div>
      <mb-composer
        placeholder="Kommentieren…"
        .send=${(text) => this.ctx.api.reply(this.thread.id, text)}
      ></mb-composer>
    `;
  }

  _renderPost() {
    const { thread, ctx } = this;
    const post = this._post;
    return html`
      <article class="post prio-${thread.priority}" @contextmenu=${openMenuOnContext}>
        <header>
          <span class="meta">
            ${ctx.names[thread.sender]} → ${ctx.names[thread.recipient]} ·
            ${relativeTime(post.created, ctx.language)}${post.edited ? " · bearbeitet" : ""}
          </span>
          <mb-menu
            .items=${postMenuItems(this, ctx, thread, {
              edit: () => (this._editingPost = true),
              leave: this._back,
            })}
          ></mb-menu>
        </header>
        <div class="properties">${postProperties(thread)}</div>
        <div class="text">${post.text}</div>
        ${this._renderReactions(post)}
      </article>
    `;
  }

  _renderPostForm() {
    const { thread, ctx } = this;
    return html`
      <mb-post-form
        class="post prio-${thread.priority}"
        cancelable
        label="Speichern"
        ?withText=${this._post.author === ctx.me}
        .text=${this._post.text}
        .tags=${thread.tags}
        .priority=${thread.priority}
        .priorities=${ctx.priorities}
        .suggestions=${ctx.knownTags}
        .send=${(values) => this._savePost(values)}
        @cancel=${() => (this._editingPost = false)}
      ></mb-post-form>
    `;
  }

  _renderComment(message) {
    const { ctx } = this;
    const mine = message.author === ctx.me;
    const editing = this._editingComment === message.id;
    return html`
      <div class="comment ${mine ? "mine" : ""}">
        <div class="meta">
          ${ctx.names[message.author]} · ${relativeTime(message.created, ctx.language)}
          ${message.edited ? " · bearbeitet" : ""}
        </div>
        ${
          editing
            ? html`<mb-composer
                cancelable
                label="Speichern"
                .value=${message.text}
                .send=${(text) => this._saveComment(message.id, text)}
                @cancel=${() => (this._editingComment = null)}
              ></mb-composer>`
            : html`<div class="text">${message.text}</div>`
        }
        ${this._renderReactions(
          message,
          mine && !editing
            ? html`<button class="plain" @click=${() => (this._editingComment = message.id)}>
                Bearbeiten
              </button>`
            : "",
        )}
      </div>
    `;
  }

  _renderReactions(message, extra = "") {
    const { ctx } = this;
    return html`
      <div class="reactions">
        ${Object.entries(message.reactions).map(
          ([emoji, users]) => html`
            <button
              class="chip ${users.includes(ctx.me) ? "own" : ""}"
              title=${users.map((u) => ctx.names[u]).join(", ")}
              @click=${() => this._react(message.id, emoji)}
            >
              ${emoji} ${users.length}
            </button>
          `,
        )}
        <button class="plain" title="Reagieren" @click=${() => this._togglePicker(message.id)}>
          ☺＋
        </button>
        ${extra}
      </div>
      ${
        this._picker === message.id
          ? html`<div class="picker">
              ${ctx.reactions.map(
                (emoji) =>
                  html`<button class="plain" @click=${() => this._react(message.id, emoji)}>
                    ${emoji}
                  </button>`,
              )}
            </div>`
          : ""
      }
    `;
  }

  _back = () => this.dispatchEvent(new Event("back"));

  _togglePicker(messageId) {
    this._picker = this._picker === messageId ? null : messageId;
  }

  async _savePost({ text, tags, priority }) {
    const { api, me } = this.ctx;
    const post = this._post;
    const calls = [api.update(this.thread.id, { tags, priority })];
    if (post.author === me && text.trim() !== post.text) {
      calls.push(api.edit(this.thread.id, post.id, text));
    }
    await Promise.all(calls);
    this._editingPost = false;
  }

  async _saveComment(messageId, text) {
    await this.ctx.api.edit(this.thread.id, messageId, text);
    this._editingComment = null;
  }

  _react(messageId, emoji) {
    this._picker = null;
    this.ctx.api.react(this.thread.id, messageId, emoji).catch((err) => notifyError(this, err));
  }

  static styles = [
    sharedStyles,
    css`
      :host {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      .back {
        align-self: flex-start;
      }
      .post {
        padding: 16px;
        border-radius: 12px;
        border-left: 4px solid var(--prio-color);
        background: var(--secondary-background-color);
      }
      .post header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
      }
      .post .text {
        font-size: 1.15em;
        margin: 8px 0;
      }
      .properties {
        display: flex;
        flex-wrap: wrap;
        gap: 4px;
        margin-top: 4px;
      }
      h4 {
        margin: 4px 0 0;
        font-weight: 500;
        color: var(--secondary-text-color);
      }
      .comments {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .comment {
        max-width: 85%;
        padding: 8px 12px;
        border-radius: 12px 12px 12px 4px;
        background: var(--secondary-background-color);
      }
      .comment.mine {
        align-self: flex-end;
        border-radius: 12px 12px 4px 12px;
        background: rgba(var(--rgb-primary-color), 0.15);
      }
      .text {
        white-space: pre-wrap;
        overflow-wrap: anywhere;
        margin: 2px 0;
      }
      .reactions,
      .picker {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 4px;
      }
      .chip {
        padding: 0 8px;
        color: var(--primary-text-color);
        background: var(--card-background-color);
        border: 1px solid var(--divider-color);
      }
      .chip.own {
        border-color: var(--primary-color);
      }
      .picker button {
        font-size: 1.3em;
      }
    `,
  ];
}

define("mb-thread", MbThread);
