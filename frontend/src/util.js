// Small helpers shared by the card's components.

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

export const lastMessage = (thread) => thread.messages[thread.messages.length - 1];

export const otherParticipant = (thread, me) =>
  thread.sender === me ? thread.recipient : thread.sender;

/** True if the other participant has read the thread since my last message. */
export function seenByOther(thread, me) {
  const last = lastMessage(thread);
  if (last.author !== me) return false;
  return (thread.last_read[otherParticipant(thread, me)] ?? 0) >= last.created;
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
