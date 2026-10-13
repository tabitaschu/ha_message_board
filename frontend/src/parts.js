// Templates and actions shared by the inbox list and the thread view.
import { html } from "lit";
import "./meme-picker.js";
import { PRIORITY_LABELS, confirmDelete, insertAtCursor, notifyError } from "./util.js";

const SHORTCODE = /:([a-z0-9_-]+):/gi;

/** Message text with known meme shortcodes (":name:") shown as images. */
export function richText(text, memes) {
  const parts = [];
  let last = 0;
  for (const match of text.matchAll(SHORTCODE)) {
    const url = memes.get(match[1].toLowerCase());
    if (!url) continue; // unknown shortcode stays plain text
    parts.push(text.slice(last, match.index));
    parts.push(html`<img class="meme" src=${url} alt=${match[0]} title=${match[0]} />`);
    last = match.index + match[0].length;
  }
  parts.push(text.slice(last));
  return parts;
}

/**
 * GIF button for a text field: inserts the chosen shortcode at the cursor of
 * `field()` and passes the new value to `onChange`. Renders nothing without
 * `loadMemes`.
 */
export function memeButton(loadMemes, field, onChange) {
  if (!loadMemes) return "";
  return html`<mb-meme-picker
    .loadMemes=${loadMemes}
    @meme-select=${(e) => onChange(insertAtCursor(field(), `:${e.detail}: `))}
  ></mb-meme-picker>`;
}

/** Priority badge (only when not "normal") and tag chips of a post. */
export const postProperties = (thread) => html`
  ${
    thread.priority === "normal"
      ? ""
      : html`<span class="prio-badge prio-${thread.priority}"
          >${PRIORITY_LABELS[thread.priority]}</span
        >`
  }
  ${thread.tags.map((tag) => html`<span class="tag">${tag}</span>`)}
`;

/**
 * Menu items for a post. `edit` adds "Bearbeiten"; `leave` runs when the
 * post disappears from the current view (archived or deleted).
 */
export function postMenuItems(host, ctx, thread, { edit, leave } = {}) {
  const run = (promise) => promise.catch((err) => notifyError(host, err));
  const archiving = !thread.archived;
  return [
    ...(edit ? [{ label: "Bearbeiten", action: edit }] : []),
    {
      label: archiving ? "Archivieren" : "Wiederherstellen",
      action: () => {
        run(ctx.api.setArchived(thread.id, archiving));
        if (archiving) leave?.();
      },
    },
    {
      label: "Löschen",
      danger: true,
      action: () => {
        if (!confirmDelete()) return;
        run(ctx.api.delete(thread.id));
        leave?.();
      },
    },
  ];
}

/** Opens the element's mb-menu on right-click. Use as @contextmenu handler. */
export function openMenuOnContext(e) {
  e.preventDefault();
  e.currentTarget.querySelector("mb-menu")?.show();
}
