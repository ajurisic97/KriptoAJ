# Projektne faze
- [x] - Opis projekta
- [x] - Početna struktura aplikacije
- [x] - Prototip
- [x] - Konzultacije
- [ ] - Finalna verzija
- [ ] - Obrana projekta

## Opis projekta
Potrebno je napisati kratki opis projekta.
Opis mora sadržavati popis funkcionalnosti koje će biti implementirane (npr. "prijava korisnika", "unos novih poruka", "pretraživanje poruka po autoru" itd...)

## Početna struktura aplikacije
Potrebno je inicijalizirati početnu strukturu backend i frontend aplikacija.
Aplikacije moraju biti u odvojenim mapama koje su već inicijalizirane.
Ukoliko radite aplikaciju sa statičkim frontend sadržajem, onda u mapi mora biti izvorni kôd aplikacije

## Prototip
U ovoj fazi bi trebali imati "grubu" verziju svoje aplikacije. Ova verzija bi trebala imati implementirane osnovne funkcionalnosti koje su navedene u opisu projekta. Ne očekuje se da su implementirane SVE funkcionalnosti niti da su postojeće funkcionalnosti potpuno ispravne.

## Konzultacije
Nakon izrade prototipa potrebno se javiti nastavniku za termin konzultacija. Na konzultacijama ćete ukratko pokazati svoj prototip te će se po potrebi napraviti modifikacija početnih zahtjeva. Dovršeni projekti bez ove faze neće biti prihvaćeni.

## Finalna verzija
Nakon demonstracije prototipa možete nastaviti sa razvojem aplikacije i implementacijom svih funkcionalnosti. Prilikom razvoja potrebno je voditi dnevnik aktivnosti prema zadanim uputama.

## Obrana projekta
Zadnja faza je obrana projekta - nakon završetka finalne verzije svoje aplikacije javite se nastavniku za dogovor oko termina obrane projekta.

# Opis projekta
## Kratki opis
- AJ kripto služi kao stranica za pregled tržišta kripto valuta kao i virtualni portfolio korisnika. Na početnoj stranici svaka uloga (gost, korisnik, administrator) može vidjeti trenutno stanje tržišta određenog broja kripto valuta te pretraživati određenu kripto valutu po njenom nazivu. 
- Nakon što se korisnik ulogira dobija mogućnost stavljanja određenih kripto-valuta u svoj portfolio. Virtualni novac koji korisnik ima na raspolaganju će biti stavljen određeni limit zbog zanimljivosti same aplikacije (npr. kod registracije korisnik će birati koliki limit on želi). Korisnik odlaskom u svoj virtualni novčanik može vidjeti odnos uloženog virtualnog novca i trenutnog stanja određene kripto-valute (npr. 1 bitcoin je kupio po 40.000$, dan nakon vrijednost bitcoina je 100.000$ - korisniku u portfoliu stoji trenutno stanje 100.000$ i profit 250%) kao i ukupno preostalo stanje svog virtualnog računa (koje nije uloženo u kripto-valute). Korisnik, također može prodavati svoje kripto valute po trenutnoj cijeni i time povećavati (ili eventualno smanjiti) svoje stanje računa. 
- Uloga administratora će biti ništa više od same kontrole korisnika koji koriste aplikaciju. Pa će administrator imati ovlasti uređivati, brisati i pregledavati korisničke podatke. 
## Tehnologije
1. React
2. Express
3. MongoDB
## Popis funkcionalnosti
1. Gost:
    - pregled kripto valuta (naziv, cijena, market cap)
    - tražilica po imenu kripto valute
2. Korisnik:
    - sve funkcionalnosti kao u stavci 1
    - virtualni novčanik 
    - pregled i brisanje portfolia i virtualno kupljenih kripto valuta
3. Admin:
    - pregled/izmjena podataka o korisnicima
    - brisanje korisničkih računa
