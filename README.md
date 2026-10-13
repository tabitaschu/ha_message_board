# Message Board für Home Assistant

Inboxen mit Threads zwischen Home-Assistant-Benutzern: Posts, Antworten,
feste Emoji-Reaktionen, Bearbeiten eigener Nachrichten, Archiv.

## Installation

1. `custom_components/message_board/` nach `<config>/custom_components/` kopieren
   (oder Repo in HACS als *Custom repository*, Typ *Integration* hinzufügen).
2. Home Assistant neu starten.
3. *Einstellungen → Geräte & Dienste → Integration hinzufügen → Message Board*,
   mindestens zwei Benutzer wählen.
4. Dashboard → Karte hinzufügen → **Message Board** (oder YAML: `type: custom:message-board-card`).

Die Card wird von der Integration selbst ausgeliefert, eine Lovelace-Ressource ist nicht nötig.

## Verhalten

| Aktion | Wer | Zählt als ungelesen? |
|---|---|---|
| Neuer Post | jedes Mitglied, in die Inbox eines anderen | ja, beim Empfänger |
| Antwort | beide Beteiligte | ja, beim anderen; holt den Thread aus dem Archiv |
| Bearbeiten | nur Autor | nein |
| Reaktion | beide Beteiligte | nein |
| Archivieren | beide Beteiligte | archivierte Threads zählen nie |

Ein Thread gilt als gelesen, sobald man ihn in der Card öffnet.

## Schnittstelle

Pro Mitglied: `binary_sensor.message_board_unread_<name>`
(`on` bei mindestens einem ungelesenen Thread, Attribut `unread_threads`).

## Entwicklung

```bash
npm install && npm run build          # Card: frontend/src → custom_components/…/frontend
pip install pytest-homeassistant-custom-component
pytest                                # Logik- und End-to-End-Tests
```

| Datei | Zweck |
|---|---|
| `board.py` | Domänenlogik und Zugriffsprüfung, ohne HA-Abhängigkeit |
| `websocket_api.py` | WebSocket-Befehle für die Card; Benutzer kommt aus der Verbindung |
| `binary_sensor.py` | Unread-Sensoren |
| `config_flow.py` | Auswahl der Mitglieder |
| `frontend/src/` | Lit-Card: Inboxen, Thread-Ansicht, Eingabefeld |
