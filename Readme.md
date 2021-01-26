# Hannelore

danis is dick

Hanelore ist ein Telegram Chatbot, den wir in einer Chatgruppe unter Freunden einsetzen.

## Deployment

Aktuell ist Hannelore als [Zeit](https://zeit.co/) service deployed. Zukünftig könnte jedoch ein direktes Deployment bei AWS in Frage kommen. Das hängt in erster Line davon ab, ob das kostenlose Kontigent bei Zeit ausreicht.

## Features

### Badword filter

Hannelore lauscht auf die Chat-Nachrichten und schimpft, wenn jemand ein schlimmes Wort sagt.

### Chuck Norris

Immer, wenn jemand "Chuck" oder "Norris" in seiner Chatnachricht erwähnt, haut die Hannelore einen Fakt über ebendiesen raus.

Nutzt die API von [https://api.chucknorris.io/jokes/random](https://api.chucknorris.io/jokes/random)

### Echo

Jede Nachricht, die mit "Hannelore, wiederhole:" beginnt, wird brav wiederholt.

### Gifs

Wenn ein Kommando mit `/gif <search>` gesendet wird, schickt Hannelore coole bewegte Bilder.

Nutzt die API von [giphy](https://developers.giphy.com/docs/api/endpoint#random)

### Weisheit

Auf das Kommando `/lebensweisheit` wird von Hannelore einer dieser zum besten gegeben.

### IFTTT

Ich habe auch einige externe anbindungen über [IFTTT](https://ifttt.com/) gelöst:

#### Morgendliches Wetter

Zu einem bestimmten Zeitpunkt (aktuell 06:15 Uhr) wird eine Nachricht mit dem vorhergesagtem Wetter für Nürnberg gesendet.

#### Ins Bett bringen

Von So - Do schickt Hannelore alle anwesenden in die Haia

#### Free games on steam (in test)

Es gibt einen Trigger, der auslöst, wenn in [/gamedeals](https://reddit.com/r/gamedeals) ein neuer Post mit den
Schlagworten `steam` und `free` erscheint.

## Technisches

Die einzelnen Handler liegen im Verzeichnis `./messagehandlers`.
Jedes Modul muss ein Objekt exportieren, das folgendes Interface implementiert:

```ts
interface Handler{
  name: string
  canHandle(update: Update): boolean
  handle(update: Update): Promise<any>
}
```

Zudem muss die `index.ts` um den entsprechenden Handler erweitert werden (hiefür hab ich noch keine "drop in"-Lösung).

Bei einer neuen Nachricht an Hannelore (direkt oder wenn sie als Admin in einer Gruppe ist), wird `canHandle` aufgerufen.
Wenn der erste Handler `true` zurückliefert, wird dessen `handle` methode ausgeführt.

Der Bot ist so konfiguriert, dass alle Nachrichten an `./api/index.ts` weitergeleitet werden. Dieser Endpunkt überprüft die Handler entsprechend.

Unter `./api/webhooks/ifttt.ts` ist ein weiterer Webhook, der die Trigger von IFTTT behandelt.

## Future improvements

### Statemanagement

Ich überlege, eine [FaunaDB](https://faunda.com) für das Statemanagement anzubinden.

### Frontend

Ich weiß nicht, wie nötig ein Frontend zur Verwaltung des Bots ist. Falls es notwendig werden sollte könnte man hierfür
z.B. Next.js nutzen und das in diesem Repo mit integrieren.
