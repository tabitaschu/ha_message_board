import { LitElement, css, html } from "lit";
import { sharedStyles } from "./styles.js";
import { define } from "./util.js";

/**
 * "⋮" button with a popup of actions.
 * `items`: [{ label, action, danger? }]. Open it programmatically with
 * `show()`, e.g. from a contextmenu (right-click) handler of the parent.
 */
class MbMenu extends LitElement {
  static properties = {
    items: { attribute: false },
    _open: { state: true },
  };

  constructor() {
    super();
    this.items = [];
    this._onOutsideClick = (e) => {
      if (!e.composedPath().includes(this)) this._open = false;
    };
  }

  show() {
    this._open = true;
  }

  updated(changed) {
    if (!changed.has("_open")) return;
    const method = this._open ? "addEventListener" : "removeEventListener";
    document[method]("click", this._onOutsideClick, true);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener("click", this._onOutsideClick, true);
  }

  render() {
    return html`
      <button class="plain" title="Aktionen" @click=${() => (this._open = !this._open)}>⋮</button>
      ${
        this._open
          ? html`<div class="popup" role="menu">
              ${this.items.map(
                (item) => html`
                  <button
                    role="menuitem"
                    class="plain ${item.danger ? "danger" : ""}"
                    @click=${() => this._select(item)}
                  >
                    ${item.label}
                  </button>
                `,
              )}
            </div>`
          : ""
      }
    `;
  }

  _select(item) {
    this._open = false;
    item.action();
  }

  static styles = [
    sharedStyles,
    css`
      :host {
        position: relative;
        display: inline-block;
      }
      :host > button {
        font-size: 1.2em;
        line-height: 1;
      }
      .popup {
        position: absolute;
        right: 0;
        z-index: 10;
        display: flex;
        flex-direction: column;
        min-width: 160px;
        padding: 4px 0;
        border-radius: 8px;
        background: var(--card-background-color);
        box-shadow: var(--ha-card-box-shadow, 0 2px 8px rgba(0, 0, 0, 0.25));
      }
      .popup button {
        padding: 8px 16px;
        border-radius: 0;
        text-align: left;
        color: var(--primary-text-color);
      }
      .popup button:hover {
        background: var(--secondary-background-color);
      }
      .popup button.danger {
        color: var(--error-color);
      }
    `,
  ];
}

define("mb-menu", MbMenu);
