# Meeting Room Booking API

## Oletukset

- Varauksien kestot ovat vähintään päivän mittaiset.
- Varaajalla ei ole tietoa, että mitkä huoneet ovat varaus hetkellä saatavilla

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
  "roomId": "A101",
  "start": "2026-01-20T10:00:00Z",
  "end": "2026-01-20T11:00:00Z"
}
```

### DELETE /bookings/:id

### GET /rooms/:roomId/bookings

```

```
