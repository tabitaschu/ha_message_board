import { LitElement, css, html } from "lit";
import "./composer.js";
import { sharedStyles } from "./styles.js";
import { notifyError, relativeTime } from "./util.js";

/**
 * One thread: messages, reactions, inline editing, reply and archive.
 * Fires "back" when the user leaves the thread.
 */
class MbThread extends LitElement {
  static properties = {
    thread: { attribute: false },
    ctx: { attribute: false }, // { api, me, names, reactions, language }
    _editing: { state: true }, // message id being edited
    _picker: { state: true }, // message id with open reaction picker
  };

  render() {
    const { thread, ctx } = this;
    return html`
      <header>
        <button class="plain" @click=${() => this.dispatchEvent(new Event("back"))}>
          ← Zurück
        </button>
        <span class="title">${ctx.names[thread.sender]} → ${ctx.names[thread.recipient]}</span>
        <button class="secondary" @click=${this._toggleArchived}>
          ${thread.archived ? "Wiederherstellen" : "Archivieren"}
        </button>
      </header>
      <div class="messages">${thread.messages.map((m) => this._renderMessage(m))}</div>
      <mb-composer
        placeholder="Antworten…"
        .send=${(text) => ctx.api.reply(thread.id, text)}
      ></mb-composer>
    `;
  }

  _renderMessage(message) {
    const { ctx } = this;
    const mine = message.author === ctx.me;
    return html`
      <div class="message ${mine ? "mine" : ""}">
        <div class="meta">
          ${ctx.names[message.author]} · ${relativeTime(message.created, ctx.language)}
          ${message.edited ? html` · bearbeitet` : ""}
        </div>
        ${
          this._editing === message.id
            ? html`<mb-composer
                cancelable
                label="Speichern"
                .value=${message.text}
                .send=${(text) => this._saveEdit(message.id, text)}
                @cancel=${() => (this._editing = null)}
              ></mb-composer>`
            : html`<div class="text">${message.text}</div>`
        }
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
          ${
            mine && this._editing !== message.id
              ? html`<button class="plain" @click=${() => (this._editing = message.id)}>
                  Bearbeiten
                </button>`
              : ""
          }
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
      </div>
    `;
  }

  _togglePicker(messageId) {
    this._picker = this._picker === messageId ? null : messageId;
  }

  async _saveEdit(messageId, text) {
    await this.ctx.api.edit(this.thread.id, messageId, text);
    this._editing = null;
  }

  _react(messageId, emoji) {
    this._picker = null;
    this._run(this.ctx.api.react(this.thread.id, messageId, emoji));
  }

  _toggleArchived() {
    const archiving = !this.thread.archived;
    this._run(this.ctx.api.setArchived(this.thread.id, archiving));
    if (archiving) this.dispatchEvent(new Event("back"));
  }

  _run(promise) {
    promise.catch((err) => notifyError(this, err));
  }

  static styles = [
    sharedStyles,
    css`
      :host {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      header {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .title {
        flex: 1;
        font-weight: 500;
      }
      .messages {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .message {
        max-width: 85%;
        padding: 8px 12px;
        border-radius: 12px;
        background: var(--secondary-background-color);
      }
      .message.mine {
        align-self: flex-end;
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

customElements.define("mb-thread", MbThread);
