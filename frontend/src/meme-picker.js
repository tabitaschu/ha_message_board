import { LitElement, css, html } from "lit";
import { sharedStyles } from "./styles.js";
import { define, notifyError } from "./util.js";

/**
 * "GIF" button with a gallery of the server's meme images.
 * `loadMemes()` must resolve to [{ name, url }]; it is called on every open,
 * so new files show up without reloading. Fires "meme-select" with the name.
 */
class MbMemePicker extends LitElement {
  static properties = {
    loadMemes: { attribute: false },
    _memes: { state: true }, // null while closed
  };

  render() {
    return html`
      <button class="plain" title="GIF einfügen" @click=${this._toggle}>GIF</button>
      ${this._memes ? html`<div class="popup">${this._renderGallery()}</div>` : ""}
    `;
  }

  _renderGallery() {
    if (!this._memes.length) {
      return html`<div class="empty meta">
        Noch keine GIFs. Lege Dateien in <code>/config/message_board/memes/</code> ab; der Dateiname
        ist das Kürzel.
      </div>`;
    }
    return this._memes.map(
      (meme) => html`
        <button class="meme" title=":${meme.name}:" @click=${() => this._select(meme.name)}>
          <img src=${meme.url} alt=":${meme.name}:" loading="lazy" />
        </button>
      `,
    );
  }

  async _toggle() {
    if (this._memes) {
      this._memes = null;
      return;
    }
    try {
      this._memes = await this.loadMemes();
    } catch (err) {
      notifyError(this, err);
    }
  }

  _select(name) {
    this._memes = null;
    this.dispatchEvent(new CustomEvent("meme-select", { detail: name }));
  }

  static styles = [
    sharedStyles,
    css`
      :host {
        position: relative;
        display: inline-block;
      }
      .popup {
        position: absolute;
        bottom: 100%;
        left: 0;
        z-index: 10;
        display: grid;
        grid-template-columns: repeat(auto-fill, 72px);
        gap: 4px;
        width: min(320px, 80vw);
        max-height: 240px;
        overflow-y: auto;
        padding: 8px;
        border-radius: 8px;
        background: var(--card-background-color);
        box-shadow: var(--ha-card-box-shadow, 0 2px 8px rgba(0, 0, 0, 0.25));
      }
      button.meme {
        padding: 0;
        border-radius: 6px;
        background: none;
      }
      button.meme img {
        display: block;
        width: 72px;
        height: 72px;
        object-fit: cover;
        border-radius: 6px;
      }
      .empty {
        grid-column: 1 / -1;
      }
    `,
  ];
}

define("mb-meme-picker", MbMemePicker);
