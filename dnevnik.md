# Evidencija aktivnosti

## 4.9.2021.
Pocetak | Kraj
------- | ----
23:50   | 00:00

## 5.9.2021.
Pocetak | Kraj
------- | ----
19:00   | 20:09
23:00   | 0:27
### Kratki opis promjena
- Dodana react app u backend i frontend (početak samo).
- Pripremljen kostur aplikacije (instalirani dodaci)

## 6.9.2021.
Pocetak | Kraj
------- | ----
17:00   | 17:47
20:00   | 21:22
23:00   | 23:57
- Prva faza izrade projekta (početna struktura aplikacije i dodani opisi aplikacije) - backend
- Dodani modeli za bazu podataka (Portfolio.js & User.js)

## 8.9.2021.
Pocetak | Kraj
------- | ----
21:00 | 22:08
- Dodan kontroler za login i registraciju korisnika (login.js) i napravljene izmjene modela User za validaciju
- Dodani uvjeti za ispunjenje registracije (unique username, email, format emaila, podudaranje lozinki)
- Početak metode za login administratora / eventualnu registraciju administratora

## 9.9.2021.
Pocetak | Kraj
------- | ----
00:10 | 01:36
02:00 | 3:10
18:00 | 19:07
21:00 |21:51
- Dodan test za korisnika, napravljene poneke promjene na modelu i kontrolerima
- Popravljene greške u testovima (korisnici.test.js, modelu i kontrolerima za "User")
- Dodani kontroler za portfolio (get,edit,delete)
- Izmjena kod Edita za Usera (nije bilo potrebe mjenjati sve stavke Usera - dodana stavka za datum), u frontendu dodane prazne stranice (pages), services (napravljen service users.js, ostali prazni ), pripremljene rute i dodaci za rad

## 10.9.2021.
Pocetak | Kraj
------- | ----
00:15 | 2:20
03:00 | 4:12
15:00 | 17:12
22:00 | 23:17
23:42 | 1:13
- Izmjene na testovima i modelu (poteskoce s dodavanjem portfolia)
- (BACKEND) dodan test za portfolio 
- (FRONTEND) Dodane stranice (pages) za login (korisnici i admin) i registraciju (bez dijelova formi), dodani serveri za login/registraciju kao i za portfolio
- (FRONTEND) dodane komponente Coin i NavBar. Coin je dovrsena. Napravljena i uredena pocetna stranica bez navigacijske trake. Koristen gotovi API (sa stranice coingecko) za pocetnu stranicu koji ce sluziti kao podloga za bazu (portfolio, favoriti)
- (BACKEND) napravljene izmjene za model Usera (zbog admina, maknuto required za polje Stanje), napravljene neke preinake ruta, (FRONTEND) dovršena početna stranica, dodana navbar komponenta
- (FRONTEND) napravljene stranice za logiranje administratora, logiranje korisnika i registraciju korisnika, postavljena stanja za panel administratora (upravljanje korisnika), definirane sve rute

## 11.9.2021.
Pocetak | Kraj
------- | ----
16:30 | 18:00
20:30 | 23:02
23:20 | 0:22
- Dodan localstorage za ulogu i usera, na temelju njega je promjenjen i NavBar. Izmjenjen input za početno stanje računa (select list->klasican unos). Definirane sve rute kod navigacijske trake. Dodan jednostavniji footer
- Stvaranje forme za edit korisnika (neuspješni submit)
- Dodana funkcionalnost brisanja korisnika - gotova implementacija funckionalnosti vezanih uz administratora (edit,delete i pregled korisnika & prijava/odjava)

## 12.9.2021.
Pocetak | Kraj
------- | ----
15:30 | 20:14
23:00 | 01:00
- Izmjena servera za portfolio (frontend), dodana stavka trenutne cijene na pocetnu stranicu, napravljena izmjena u backendu kod dohvacanja tokena. Dodana komponenta Portfelja, napravljena stranica za pregled Portfelja korisnika bez funkcionalnosti kupnje/prodaje

## 13.9.2021.
Pocetak | Kraj
------- | ----
15:00 | 19:30
19:30 | 21:10
22:00 | 23:21
- Dodane funkcije za kupovanje i prodaju kripto (BuyCrypto.js) i komponenta (Trade.js). Uredene rute
- Dovršena funkcija da kupnju kripto (dodavanje portfelja) - moguce eventualne izmjene za uređenje stanja korisnika

## 18.9.2021.
Pocetak | Kraj
------- | ----
19:00 | 01:05
- Dovršena funkcija za prodaju kriptovaluta (dodana komponenta Sell, stranica SellCrypto, izmjenjen server za portfolio)
- Napravljene blage izmjene u backendu u portfolios kontroleru
- Napravljene blage izmjene u frontendu za stranicu kupnje kriptovaluta

## 189.9.2021.
Pocetak | Kraj
------- | ----
01:25 | 03:48
- Napravljeno uređenje svih stranica osim panela administratora