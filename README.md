# Kokoushuoneiden varausrajapinta API

## Yleiskuva

Yksinkertainen REST-rajapinta kokoushuoneiden varauksiin. Tallennus on
muistissa, joten data nollautuu palvelimen käynnistyksessä.

## Oletukset ja rajaukset

- Käytössä on valmiiksi luodut huoneet: A25, A26, A27, A28, A29, A30
- Ei käyttäjähallintaa tai autentikointia
- Aikavälit annetaan ISO 8601 -muodossa (UTC)

## Käynnistys

```bash
npm install
npm run dev
```

Palvelin:
[http://localhost:3000](http://localhost:3000)

- Rajapintaa voi kokeilla esimerkiksi Postmanilla

## Skriptit

- `npm run dev` käynnistää kehityspalvelimen
- `npm run build` kääntää TypeScriptin
- `npm start` ajaa käännetyn sovelluksen

## Rajapinnan päätepiste

### POST /bookings

```json
{
  "roomId": "A25",
  "start": "2026-01-20T10:00:00Z",
  "end": "2026-01-20T11:00:00Z"
}
```

Vastaus (201):

```json
{
  "id": "uuid",
  "roomId": "A25",
  "start": "2026-01-20T10:00:00.000Z",
  "end": "2026-01-20T11:00:00.000Z"
}
```

### DELETE /bookings/:id

Vastaus (204): ei sisältöä

### GET /rooms/:roomId/bookings

Vastaus (200):

```json
[
  {
    "id": "uuid",
    "roomId": "A25",
    "start": "2026-01-20T10:00:00.000Z",
    "end": "2026-01-20T11:00:00.000Z"
  }
]
```

### GET /rooms/available?start=...&end=...

Esimerkki:

```
GET /rooms/available?start=2026-01-20T10:00:00Z&end=2026-01-20T11:00:00Z
```

Vastaus:

```json
["A25", "A26", "A29"]
```

## Validointi ja virheet

- Varaukset eivät voi olla menneisyydessä
- Aloitusajan täytyy olla ennen lopetusaikaa
- Päällekkäiset varaukset estetään huonekohtaisesti
- Virhe vastaukset palautetaan muodossa:

```json
{ "error": "Virheviesti" }
```
