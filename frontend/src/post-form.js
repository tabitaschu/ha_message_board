import { LitElement, css, html } from "lit";
import { sharedStyles } from "./styles.js";
import { memeButton } from "./parts.js";
import { define, PRIORITY_LABELS, notifyError } from "./util.js";

/**
 * Form for a post: title, text (optional), tags and priority. Used to create
 * and to edit posts. `send({ title, text, tags, priority })` must return a
 * promise; the form resets when it resolves. Without `withContent` only tags
 * and priority are editable (a non-author editing someone else's post).
 */
class MbPostForm extends LitElement {
  static properties = {
    send: { attribute: false },
    priorities: { attribute: false },
    suggestions: { attribute: false }, // known tags
    title: { type: String },
    text: { type: String },
    tags: { attribute: false },
    priority: { type: String },
    withContent: { type: Boolean },
    cancelable: { type: Boolean },
    loadMemes: { attribute: false }, // enables the GIF button
    placeholder: { type: String },
    label: { type: String },
    _tagDraft: { state: true },
    _busy: { state: true },
  };

  constructor() {
    super();
    this.title = "";
    this.text = "";
    this.tags = [];
    this.priority = "normal";
    this.suggestions = [];
    this.label = "Senden";
    this._tagDraft = "";
  }

  render() {
    const unusedSuggestions = this.suggestions.filter((s) => !this._hasTag(s));
    return html`
      ${
        this.withContent
          ? html`<input
                class="title"
                .value=${this.title}
                placeholder=${this.placeholder ?? "Titel"}
                maxlength="120"
                ?disabled=${this._busy}
                @input=${(e) => (this.title = e.target.value)}
                @keydown=${(e) => e.key === "Enter" && this._submit()}
              />
              <textarea
                rows="2"
                .value=${this.text}
                placeholder="Details (optional)"
                ?disabled=${this._busy}
                @input=${(e) => (this.text = e.target.value)}
                @keydown=${(e) => e.key === "Enter" && (e.ctrlKey || e.metaKey) && this._submit()}
              ></textarea>`
          : ""
      }
      <div class="row">
        <div class="tags">
          ${this.tags.map(
            (tag) =>
              html`<span class="tag"
                >${tag}<button class="plain" title="Entfernen" @click=${() => this._removeTag(tag)}>
                  ×
                </button></span
              >`,
          )}
          <input
            list="known-tags"
            placeholder="+ Tag"
            .value=${this._tagDraft}
            @input=${this._onTagInput}
            @keydown=${this._onTagKeyDown}
            @blur=${this._commitTag}
          />
          <datalist id="known-tags">
            ${unusedSuggestions.map((tag) => html`<option value=${tag}></option>`)}
          </datalist>
        </div>
        <div class="priority" role="radiogroup" aria-label="Priorität">
          ${this.priorities.map(
            (p) =>
              html`<button
                role="radio"
                aria-checked=${p === this.priority}
                class=${p === this.priority ? `prio-${p}` : "secondary"}
                @click=${() => (this.priority = p)}
              >
                ${PRIORITY_LABELS[p]}
              </button>`,
          )}
        </div>
      </div>
      <div class="actions">
        ${
          this.withContent
            ? memeButton(
                this.loadMemes,
                () => this.renderRoot.querySelector("textarea"),
                (value) => (this.text = value),
              )
            : ""
        }
        <span class="spacer"></span>
        ${
          this.cancelable
            ? html`<button
                class="secondary"
                @click=${() => this.dispatchEvent(new Event("cancel"))}
              >
                Abbrechen
              </button>`
            : ""
        }
        <button
          ?disabled=${this._busy || (this.withContent && !this.title.trim())}
          @click=${this._submit}
        >
          ${this.label}
        </button>
      </div>
    `;
  }

  _hasTag(tag) {
    return this.tags.some((t) => t.toLowerCase() === tag.toLowerCase());
  }

  _onTagInput(e) {
    this._tagDraft = e.target.value;
    // Picking a datalist suggestion fires input with the complete value.
    if (e.inputType === "insertReplacementText" || e.inputType === undefined) this._commitTag();
  }

  _onTagKeyDown(e) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      this._commitTag();
    } else if (e.key === "Backspace" && !this._tagDraft && this.tags.length) {
      this.tags = this.tags.slice(0, -1);
    }
  }

  _commitTag() {
    const tag = this._tagDraft.trim();
    if (tag && !this._hasTag(tag)) this.tags = [...this.tags, tag];
    this._tagDraft = "";
  }

  _removeTag(tag) {
    this.tags = this.tags.filter((t) => t !== tag);
  }

  async _submit() {
    if (this._busy) return;
    this._commitTag();
    this._busy = true;
    try {
      const { title, text, tags, priority } = this;
      await this.send({ title, text, tags, priority });
      this.title = "";
      this.text = "";
      this.tags = [];
      this.priority = "normal";
    } catch (err) {
      notifyError(this, err);
    } finally {
      this._busy = false;
    }
  }

  static styles = [
    sharedStyles,
    css`
      :host {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      textarea,
      input {
        box-sizing: border-box;
        font: inherit;
        color: var(--primary-text-color);
        background: var(--card-background-color);
        border: 1px solid var(--divider-color);
        border-radius: 8px;
      }
      textarea {
        width: 100%;
        padding: 8px;
        resize: vertical;
      }
      input.title {
        width: 100%;
        padding: 8px;
        font-weight: 500;
      }
      .tags input {
        flex: 1;
        min-width: 80px;
        padding: 2px 8px;
      }
      .row {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 8px;
      }
      .tags {
        display: flex;
        flex: 1;
        flex-wrap: wrap;
        align-items: center;
        gap: 4px;
        min-width: 180px;
      }
      .tag button {
        padding: 0 0 0 4px;
      }
      .priority {
        display: flex;
        gap: 4px;
      }
      .priority button {
        padding: 2px 10px;
        font-size: 0.9em;
      }
      .spacer {
        flex: 1;
      }
      .actions {
        display: flex;
        align-items: center;
        gap: 8px;
      }
    `,
  ];
}

define("mb-post-form", MbPostForm);
