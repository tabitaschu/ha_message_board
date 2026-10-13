// Thin client for the integration's WebSocket commands.
const PREFIX = "message_board";

export class BoardApi {
  constructor(connection) {
    this._connection = connection;
  }

  /** Resolves to an unsubscribe function. */
  subscribe(onEvent) {
    return this._connection.subscribeMessage(onEvent, { type: `${PREFIX}/subscribe` });
  }

  create(recipient, { title, text, tags, priority }) {
    return this._send("create", { recipient, title, text, tags, priority });
  }

  /** Change the post; pass only what changes ({ title, text, tags, priority }). */
  update(threadId, properties) {
    return this._send("update", { thread_id: threadId, ...properties });
  }

  delete(threadId) {
    return this._send("delete", { thread_id: threadId });
  }

  reply(threadId, text) {
    return this._send("reply", { thread_id: threadId, text });
  }

  editComment(threadId, messageId, text) {
    return this._send("edit", { thread_id: threadId, message_id: messageId, text });
  }

  /** Meme images on the server: [{ name, url }]. */
  memes() {
    return this._send("memes", {});
  }

  react(threadId, messageId, emoji) {
    return this._send("react", { thread_id: threadId, message_id: messageId, emoji });
  }

  setArchived(threadId, archived) {
    return this._send("archive", { thread_id: threadId, archived });
  }

  markRead(threadId) {
    return this._send("mark_read", { thread_id: threadId });
  }

  _send(command, payload) {
    return this._connection.sendMessagePromise({ type: `${PREFIX}/${command}`, ...payload });
  }
}
