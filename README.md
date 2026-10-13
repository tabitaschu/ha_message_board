# Message Board für Home Assistant

Inboxen zwischen Home-Assistant-Benutzern: Posts mit Titel, Tags und Priorität
(Info / Niedrig / Normal / Hoch), Kommentare darunter, feste Emoji-Reaktionen,
Bearbeiten, Archiv, Löschen.

## Installation

1. `custom_components/message_board/` nach `<config>/custom_components/` kopieren
   (oder Repo in HACS als *Custom repository*, Typ *Integration* hinzufügen).
2. Home Assistant neu starten.
3. *Einstellungen → Geräte & Dienste → Integration hinzufügen → Message Board*,
   mindestens zwei Benutzer wählen.
4. Dashboard → Karte hinzufügen → **Message Board** (oder YAML: `type: custom:message-board-card`).

Die Integration liefert die Card selbst aus. Erscheint sie nicht in der Kartenauswahl, als Ressource
eintragen (*Einstellungen → Dashboards → ⋮ → Ressourcen*): URL `/message_board/message-board-card.js?v=<Version>`,
Typ *JavaScript-Modul*. `<Version>` = `version` aus `manifest.json`, nach jedem Update anpassen.
Steht dort noch eine alte Version, lädt der Browser die alte Card bzw. findet sie gar nicht.

## Verhalten

| Aktion | Wer | Zählt als ungelesen? |
|---|---|---|
| Neuer Post | jedes Mitglied, in die Inbox eines anderen | ja, beim Empfänger |
| Kommentar | beide Beteiligte | ja, beim anderen; holt den Post aus dem Archiv |
| Titel / Text bearbeiten | nur Autor | nein |
| Tags / Priorität ändern | beide Beteiligte | nein |
| Post löschen (inkl. Kommentare) | beide Beteiligte | – |
| Reaktion | beide Beteiligte | nein |
| Archivieren | beide Beteiligte | archivierte Posts zählen nie |

Ein Post gilt als gelesen, sobald man ihn in der Card öffnet.
Ungelesene Posts sind eingefärbt und mit Punkt markiert. Wo man selbst geschrieben hat, zeigt die
Kachel den Stand beim Gegenüber: „● Neu“ (noch nicht geöffnet) oder „✓ Gelesen“.
Aktionen für einen Post (Bearbeiten, Archivieren, Löschen): Menü „⋮“ oder Rechtsklick.
Listen sind nach neuester Aktivität sortiert; „⇅“ schaltet auf Priorität um (pro Browser gemerkt).

## Memes / Reaction-GIFs

GIFs (auch PNG, JPG, WebP) in `/config/message_board/memes/` ablegen, z. B. per File editor oder Samba.
Der Dateiname ohne Endung ist das Kürzel (`bitte.gif` → `:bitte:`, nur a–z, 0–9, `_` und `-`).
In Posts und Kommentaren werden bekannte Kürzel als Bild angezeigt; der Button „GIF“ an den
Eingabefeldern zeigt alle verfügbaren Bilder. Neue Dateien erscheinen ohne Neustart.
Die Bilder werden vom eigenen HA-Server geladen, es gehen keine Anfragen an externe Dienste.

## Schnittstelle

Pro Mitglied zwei Binärsensoren, jeweils mit Attribut `threads` (Anzahl):

| Sensor | `on`, wenn … |
|---|---|
| `binary_sensor.message_board_unread_<name>` | irgendein Post ungelesene Inhalte hat (inkl. Kommentare) |
| `binary_sensor.message_board_attention_<name>` | ein **neuer Post** mit Priorität Normal oder Hoch ungelesen ist; Kommentare, Edits, Info und Niedrig nie |

Für Benachrichtigungen (z. B. eine Lampe) ist `attention` gedacht.

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
