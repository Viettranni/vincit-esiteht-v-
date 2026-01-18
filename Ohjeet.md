## Tavoite

Tehtäväsi on toteuttaa yksinkertainen kokoushuoneiden varausrajapinta (API).

Palvelun tulee tarjota käyttäjille seuraavat toiminnot:

- Varauksen luonti: Varaa huone tietylle aikavälille.
- Varauksen peruutus: Poista varaus.
- Varausten katselu: Listaa kaikki tietyn huoneen varaukset.

## Toimintalogiikka (business rules):

- Varaukset eivät saa mennä päällekkäin (kaksi henkilöä ei voi varata samaa huonetta
  samaan aikaan).
- Varaukset eivät voi sijoittua menneisyyteen.
- Aloitusajan täytyy olla ennen lopetusaikaa.

<br>

TODO:

- Tarkista rajapintojen toiminnallisuus (logiikka virheet)
- Koodin laatu ja luettavuus
- Rakenne
- ~~Virheenkäsittely~~

~~
