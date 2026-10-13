// Templates and actions shared by the inbox list and the thread view.
import { html } from "lit";
import { PRIORITY_LABELS, confirmDelete, notifyError } from "./util.js";

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
