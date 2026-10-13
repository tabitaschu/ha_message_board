import { LitElement, css, html } from "lit";
import { BoardApi } from "./api.js";
import "./menu.js";
import { openMenuOnContext, postMenuItems, postProperties } from "./parts.js";
import "./post-form.js";
import { sharedStyles } from "./styles.js";
import "./thread-view.js";
import {
  define,
  knownTags,
  lastMessage,
  notifyError,
  relativeTime,
  seenByOther,
  sortByPriority,
} from "./util.js";

/**
 * Lovelace card: one inbox per board member.
 * "Meine Inbox" holds threads addressed to me; "Inbox <name>" holds the
 * threads I sent to that person. Wide cards show inboxes side by side,
 * narrow cards as tabs.
 */
class MessageBoardCard extends LitElement {
  static properties = {
    _data: { state: true }, // { me, users, reactions, priorities, threads } from the subscription
    _error: { state: true },
    _openThreadId: { state: true },
    _activeInbox: { state: true },
  };

  setConfig(config) {
    this._config = config;
  }

  set hass(hass) {
    // Not reactive on purpose: the card renders from its own subscription,
    // not from entity state changes.
    this._hass = hass;
    this._subscribe();
  }

  getCardSize() {
    return 6;
  }

  static getStubConfig() {
    return {};
  }

  connectedCallback() {
    super.connectedCallback();
    this._subscribe();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._subscription?.then((unsubscribe) => unsubscribe()).catch(() => {});
    this._subscription = null;
  }

  _subscribe() {
    if (this._subscription || !this._hass || !this.isConnected) return;
    this._api = new BoardApi(this._hass.connection);
    this._subscription = this._api.subscribe((event) => {
      this._data = { ...this._data, ...event };
    });
    this._subscription.catch((err) => {
      this._error = err.message;
      this._subscription = null;
    });
  }

  updated() {
    this._markOpenThreadRead();
  }

  _markOpenThreadRead() {
    const thread = this._openThread;
    if (!thread?.unread || this._markingRead === thread.id) return;
    this._markingRead = thread.id;
    this._api
      .markRead(thread.id)
      .catch((err) => notifyError(this, err))
      .finally(() => (this._markingRead = null));
  }

  get _openThread() {
    return this._data?.threads.find((t) => t.id === this._openThreadId);
  }

  get _ctx() {
    const { me, users, reactions, priorities, threads } = this._data;
    return {
      api: this._api,
      me,
      reactions,
      priorities,
      knownTags: knownTags(threads),
      names: Object.fromEntries(users.map((u) => [u.id, u.name])),
      language: this._hass.locale?.language ?? this._hass.language,
    };
  }

  _inboxes() {
    const { me, users, threads } = this._data;
    const others = users.filter((u) => u.id !== me);
    return [
      { id: me, title: "Meine Inbox", threads: threads.filter((t) => t.recipient === me) },
      ...others.map((u) => ({
        id: u.id,
        title: `Inbox ${u.name}`,
        composeTo: u,
        threads: threads.filter((t) => t.recipient === u.id && t.sender === me),
      })),
    ];
  }

  render() {
    if (this._error) return html`<ha-card><div class="empty">${this._error}</div></ha-card>`;
    if (!this._data) return html`<ha-card><div class="empty">Lädt…</div></ha-card>`;
    const ctx = this._ctx;
    const thread = this._openThread;
    return html`
      <ha-card>
        ${
          thread
            ? html`<mb-thread
                .thread=${thread}
                .ctx=${ctx}
                @back=${() => (this._openThreadId = null)}
              ></mb-thread>`
            : this._renderInboxes(ctx)
        }
      </ha-card>
    `;
  }

  _renderInboxes(ctx) {
    const inboxes = this._inboxes();
    const active = this._activeInbox ?? ctx.me;
    return html`
      <nav class="tabs">
        ${inboxes.map(
          (inbox) => html`
            <button
              class=${inbox.id === active ? "" : "secondary"}
              @click=${() => (this._activeInbox = inbox.id)}
            >
              ${inbox.title} ${this._renderBadge(inbox)}
            </button>
          `,
        )}
      </nav>
      <div class="inboxes">
        ${inboxes.map(
          (inbox) => html`
            <section class=${inbox.id === active ? "active" : ""}>
              <h3>${inbox.title} ${this._renderBadge(inbox)}</h3>
              ${
                inbox.composeTo
                  ? html`<mb-post-form
                      withText
                      placeholder="Neue Nachricht an ${inbox.composeTo.name}…"
                      .priorities=${ctx.priorities}
                      .suggestions=${ctx.knownTags}
                      .send=${(post) => ctx.api.create(inbox.composeTo.id, post)}
                    ></mb-post-form>`
                  : ""
              }
              ${this._renderThreadList(
                sortByPriority(
                  inbox.threads.filter((t) => !t.archived),
                  ctx.priorities,
                ),
                ctx,
              )}
              ${this._renderArchive(
                inbox.threads.filter((t) => t.archived),
                ctx,
              )}
            </section>
          `,
        )}
      </div>
    `;
  }

  _renderBadge(inbox) {
    const unread = inbox.threads.filter((t) => t.unread).length;
    return unread ? html`<span class="badge">${unread}</span>` : "";
  }

  _renderArchive(threads, ctx) {
    if (!threads.length) return "";
    return html`
      <details>
        <summary class="meta">Archiv (${threads.length})</summary>
        ${this._renderThreadList(threads, ctx)}
      </details>
    `;
  }

  _renderThreadList(threads, ctx) {
    if (!threads.length) return html`<div class="empty meta">Keine Nachrichten</div>`;
    return html`<ul>
      ${threads.map((t) => this._renderThreadItem(t, ctx))}
    </ul>`;
  }

  _renderThreadItem(thread, ctx) {
    const comments = thread.messages.length - 1;
    return html`
      <li class="post prio-${thread.priority}" @contextmenu=${openMenuOnContext}>
        <button
          class="open ${thread.unread ? "unread" : ""}"
          @click=${() => (this._openThreadId = thread.id)}
        >
          <span class="headline">
            ${thread.unread ? html`<span class="dot"></span>` : ""}
            <span class="preview">${thread.messages[0].text}</span>
          </span>
          <span class="properties">${postProperties(thread)}</span>
          <span class="meta">
            ${relativeTime(lastMessage(thread).created, ctx.language)}
            ${comments ? ` · ${comments} ${comments === 1 ? "Kommentar" : "Kommentare"}` : ""}
            ${seenByOther(thread, ctx.me) ? " · gelesen ✓" : ""}
          </span>
        </button>
        <mb-menu .items=${postMenuItems(this, ctx, thread)}></mb-menu>
      </li>
    `;
  }

  static styles = [
    sharedStyles,
    css`
      ha-card {
        container-type: inline-size;
        padding: 16px;
      }
      .tabs {
        display: flex;
        gap: 8px;
        margin-bottom: 12px;
      }
      .inboxes {
        display: grid;
        gap: 16px;
      }
      h3 {
        margin: 0 0 8px;
        font-weight: 500;
      }
      section {
        display: flex;
        flex-direction: column;
        gap: 8px;
        min-width: 0;
      }
      @container (max-width: 599px) {
        h3,
        section:not(.active) {
          display: none;
        }
      }
      @container (min-width: 600px) {
        .tabs {
          display: none;
        }
        .inboxes {
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
        }
      }
      .badge {
        display: inline-block;
        min-width: 1.4em;
        padding: 0 4px;
        border-radius: 0.7em;
        font-size: 0.8em;
        text-align: center;
        color: var(--text-primary-color);
        background: var(--error-color);
      }
      ul {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      li.post {
        display: flex;
        align-items: flex-start;
        border-radius: 12px;
        border-left: 4px solid var(--prio-color);
        background: var(--secondary-background-color);
      }
      button.open {
        display: flex;
        flex: 1;
        flex-direction: column;
        gap: 4px;
        min-width: 0;
        padding: 10px 12px;
        border-radius: 12px;
        text-align: left;
        color: var(--primary-text-color);
        background: none;
      }
      button.open.unread .preview {
        font-weight: 600;
      }
      .headline {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .properties {
        display: flex;
        flex-wrap: wrap;
        gap: 4px;
      }
      li.post mb-menu {
        margin: 6px 4px 0 0;
      }
      .preview {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        overflow-wrap: anywhere;
      }
      .empty {
        padding: 8px 0;
      }
      summary {
        cursor: pointer;
        padding: 4px 0;
      }
    `,
  ];
}

define("message-board-card", MessageBoardCard);

window.customCards = window.customCards || [];
if (!window.customCards.some((c) => c.type === "message-board-card")) {
  window.customCards.push({
    type: "message-board-card",
    name: "Message Board",
    description: "Inboxen mit Posts, Tags, Priorität und Kommentaren.",
  });
}
