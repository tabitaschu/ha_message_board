// Small helpers shared by the card's components.

/** Register a custom element once (the bundle may be loaded twice, e.g. via two URLs). */
export function define(name, constructor) {
  if (!customElements.get(name)) customElements.define(name, constructor);
}

const UNITS = [
  ["year", 31536000],
  ["month", 2592000],
  ["week", 604800],
  ["day", 86400],
  ["hour", 3600],
  ["minute", 60],
];

/** "vor 5 Minuten" style text for a UNIX timestamp in seconds. */
export function relativeTime(timestamp, language) {
  const rtf = new Intl.RelativeTimeFormat(language, { numeric: "auto" });
  const delta = timestamp - Date.now() / 1000;
  for (const [unit, seconds] of UNITS) {
    if (Math.abs(delta) >= seconds) return rtf.format(Math.round(delta / seconds), unit);
  }
  return rtf.format(0, "second");
}

export const PRIORITY_LABELS = { info: "Info", low: "Niedrig", normal: "Normal", high: "Hoch" };

/** List orders. The server sends threads newest activity first, so "time" keeps that order. */
export const SORTS = {
  time: { label: "Neueste", apply: (threads) => threads },
  priority: {
    label: "Priorität",
    // Highest priority first; stable sort keeps newest activity within a priority.
    apply: (threads, priorities) =>
      [...threads].sort((a, b) => priorities.indexOf(b.priority) - priorities.indexOf(a.priority)),
  },
};

/** All tags in use, for suggestions (case-insensitive unique, sorted). */
export function knownTags(threads) {
  const tags = new Map();
  for (const tag of threads.flatMap((t) => t.tags)) tags.set(tag.toLowerCase(), tag);
  return [...tags.values()].sort((a, b) => a.localeCompare(b));
}

/** Ask before destroying a post; returns true if confirmed. */
export const confirmDelete = () => window.confirm("Post mit allen Kommentaren löschen?");

export const lastMessage = (thread) => thread.messages[thread.messages.length - 1];

export const otherParticipant = (thread, me) =>
  thread.sender === me ? thread.recipient : thread.sender;

/**
 * Whether the other participant has read my latest message in the thread:
 * "read", "new" (not yet), or null if I have not written anything there.
 */
export function readStatus(thread, me) {
  const mine = thread.messages.filter((m) => m.author === me);
  if (!mine.length) return null;
  const readUntil = thread.last_read[otherParticipant(thread, me)] ?? 0;
  return readUntil >= mine[mine.length - 1].created ? "read" : "new";
}

/** Value of a text field with `snippet` inserted at the cursor (or appended). */
export function insertAtCursor(field, snippet) {
  const start = field.selectionStart ?? field.value.length;
  const end = field.selectionEnd ?? start;
  return field.value.slice(0, start) + snippet + field.value.slice(end);
}

/** Show an error as Home Assistant toast. */
export function notifyError(element, error) {
  element.dispatchEvent(
    new CustomEvent("hass-notification", {
      detail: { message: error?.message ?? String(error) },
      bubbles: true,
      composed: true,
    }),
  );
}
