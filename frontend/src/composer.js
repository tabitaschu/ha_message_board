import { LitElement, css, html } from "lit";
import { sharedStyles } from "./styles.js";
import { memeButton } from "./parts.js";
import { define, notifyError } from "./util.js";

/**
 * Text input with send button. Used for new threads, replies and edits.
 * `send(text)` must return a promise; the field is cleared when it resolves.
 * Ctrl/Cmd+Enter submits. With `cancelable`, a cancel button fires "cancel".
 */
class MbComposer extends LitElement {
  static properties = {
    send: { attribute: false },
    value: { type: String },
    placeholder: { type: String },
    label: { type: String },
    cancelable: { type: Boolean },
    loadMemes: { attribute: false }, // enables the GIF button
    _busy: { state: true },
  };

  constructor() {
    super();
    this.value = "";
    this.label = "Senden";
  }

  render() {
    return html`
      <textarea
        rows="2"
        .value=${this.value}
        placeholder=${this.placeholder ?? ""}
        ?disabled=${this._busy}
        @input=${(e) => (this.value = e.target.value)}
        @keydown=${this._onKeyDown}
      ></textarea>
      <div class="actions">
        ${memeButton(
          this.loadMemes,
          () => this.renderRoot.querySelector("textarea"),
          (value) => (this.value = value),
        )}
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
        <button ?disabled=${this._busy || !this.value.trim()} @click=${this._submit}>
          ${this.label}
        </button>
      </div>
    `;
  }

  _onKeyDown(e) {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) this._submit();
  }

  async _submit() {
    if (!this.value.trim() || this._busy) return;
    this._busy = true;
    try {
      await this.send(this.value);
      this.value = "";
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
        display: block;
      }
      textarea {
        box-sizing: border-box;
        width: 100%;
        resize: vertical;
        padding: 8px;
        font: inherit;
        color: var(--primary-text-color);
        background: var(--card-background-color);
        border: 1px solid var(--divider-color);
        border-radius: 8px;
      }
      .spacer {
        flex: 1;
      }
      .actions {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-top: 4px;
      }
    `,
  ];
}

define("mb-composer", MbComposer);
