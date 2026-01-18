# Meeting Room Booking API

## Oletukset

- Käytössä on valmiiksi luodut huoneet: A25, A26, A27, A28, A29, A30

## Käynnistys

```bash
npm install
npm run dev
```

Palvelin:
[http://localhost:3000](http://localhost:3000)

## Endpoints

### POST /bookings

```json
{
  "roomId": "A25",
  "start": "2026-01-20T10:00:00Z",
  "end": "2026-01-20T11:00:00Z"
}
```

### DELETE /bookings/:id

### GET /rooms/:roomId/bookings

### GET /rooms/available?start=...&end=...

Esimerkki:

```
GET /rooms/available?start=2026-01-20T10:00:00Z&end=2026-01-20T11:00:00Z
```

Vastaus:

```json
["A25", "A26", "A29"]
```
