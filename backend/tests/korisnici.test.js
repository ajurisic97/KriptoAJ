const bcrypt = require('bcrypt');
const Korisnik = require('../models/User');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);

const korisniciIzBaze = async () => {
    const korisnici = await Korisnik.find({})
    console.log("Korisnici iz baze\n",korisnici);
    return korisnici.map(p => p.toJSON())
}
beforeEach(async () => {
    await Korisnik.deleteMany({})

    const passHash2 = await bcrypt.hash('tajna', 10)
    const korisnik = new Korisnik({
        username: 'testUser',
        email: 'testUser@gmail.com',
        stanje: 100000,
        uloga: 'user',
        password: passHash2
    })
    const passHash3 = await bcrypt.hash('tajna2', 10)

    await korisnik.save();
    const korisnik2 = new Korisnik({
        username: 'testUser2',
        email: 'testUser2@gmail.com',
        stanje: 10000,
        uloga: 'user',
        password: passHash3
    })
    await korisnik2.save();
    
})
test('JSON format in response ', async () => {
    await api
      .get('/api/admin')
      .expect(200)
      .expect('Content-Type', /application\/json/);
});
test('database has two users', async () => {
    const response = await api.get('/api/admin');
    expect(response.body).toHaveLength(2);
});
test('Creating new user is valid', async () => {
    const users = await Korisnik.find({});
    const startUsers = users.map((u) => u.toJSON());
  
    const newUser = {
        username: 'testUser3',
        email: 'testUser3@gmail.com',
        stanje: 100000,
        uloga: 'user',
        password: 'testUser3',
        password2: 'testUser3'
    };
  
    await api
      .post('/api/user/registracija')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/);
  
    const users2 = await Korisnik.find({});
    const endUsers = users2.map((u) => u.toJSON());
    expect(endUsers).toHaveLength(startUsers.length + 1);
  
    const haveUsername = endUsers.map((u) => u.username);
    expect(haveUsername).toContain(newUser.username);
  });

/*
test('stvaranje novog korisnika', async () =>{
    const pocetniKorisnici = await korisniciIzBaze();
    const novi = {
        username: 'ajurisic97',
        email: 'ajurisic@gmail.com',
        stanje: 100000,
        uloga: 'user',
        favoriti: ['BTC','CTSI'],
        password: 'ajurisic97',
        password2: 'ajurisic97'
        
    }

    const response = await api
    .post('/api/user/registracija')
    .send(novi)
    .expect(404)
    .expect('Content-Type', /application\/json/);

    const korisniciKraj = await korisniciIzBaze();
    expect(korisniciKraj).toHaveLength(pocetniKorisnici.length + 1);

    const svaImena = korisniciKraj.map(k => k.username);
    expect(svaImena).toContain(novi.username);
})*/
test('Uspjesan login', async () => {
    const user = {
      username: 'testUser',
      password: 'tajna',
    };
  
    const response = await api
      .post('/api/user/login')
      .send(user)
      .expect(200)
      .expect('Content-Type', /application\/json/);
  
  });

afterAll(async () => {
    await mongoose.connection.close();
})