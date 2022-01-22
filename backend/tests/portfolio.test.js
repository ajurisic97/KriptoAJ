const bcrypt = require('bcrypt');
const Korisnik = require('../models/User');
const Portfolio = require('../models/Portfolio');
const mongoose = require('mongoose');
const supertest = require('supertest');
mongoose.set('useFindAndModify', false);

const app = require('../app');
const User = require('../models/User');
const api = supertest(app);

beforeEach(async () => {
    //await Portfolio.deleteMany({});
    //await Korisnik.deleteMany({});
    var passHash2 = await bcrypt.hash('tajna', 10);
    const korisnik = new Korisnik({
        username: 'testUser2222',
        email: 'testUser@gmail.com',
        stanje: 100000,
        uloga: 'user',
        password: passHash2
    })
    await korisnik.save();

    const user = await Korisnik.findOne({});
    const datum = new Date();
    //const options = { year: 'numeric', month: 'long', day: 'numeric' };
    //const datum2 = datum.toLocaleDateString(undefined, options);

    let portfolio = new Portfolio({
        nazivKripto: 'ADA Cardano',
          skraceniNaziv: 'ADA',
          datumKupnje: datum,
          cijenaKupnje: 2.59,
          kolicina: 5,
          user: user._id,
    });
    await portfolio.save();
    user.portfolio = user.portfolio.concat(portfolio._id);
    await user.save();
});

test('Dodavanje novog portfolia', async () => {
    console.log("Pokretanje testa");
    const korisnik = {
      username: 'testUser2222',
      password: 'tajna'
    };
    
    const result = await api
      .post('/api/user/login')
      .send(korisnik)
      .expect(200)
      .expect('Content-Type', /application\/json/);
    
    const token = 'bearer ' + result.body.token;
    //const datum = new Date();
    //const options = { year: 'numeric', month: 'long', day: 'numeric' };
    //const datum2 = datum.toLocaleDateString(undefined, options);
    const datum2 = new Date();
    const user = await Korisnik.findOne({
        username: korisnik.username,
        uloga: 'user'
    });
    let portfolio = {
        nazivKripto: 'ADA Cardano2',
          skraceniNaziv: 'ADA',
          datumKupnje: datum2,
          cijenaKupnje: 2.65,
          kolicina: 10,
          user: user._id

    };
    
    await api
      .post('/api/portfolio/novi')
      .set('Authorization', token)
      .send(portfolio)
      .expect(200)
      .expect('Content-Type', /application\/json/);
  
    const response = await api
      .get('/api/portfolio')
      .set('Authorization', token)
      .expect(200)
      .expect('Content-Type', /application\/json/);
  
    expect(response.body).toHaveLength(2);
});

test('Brisanje portfolia',async()=>{
    const korisnik = {
        username: 'testUser',
        password: 'tajna',
    };
    const result = await api
      .post('/api/user/login')
      .send(korisnik)
      .expect(200)
      .expect('Content-Type', /application\/json/);
  
    const token = 'bearer ' + result.body.token;
    const response = await api
      .get('/api/portfolio')
      .set('Authorization', token)
      .expect(200)
      .expect('Content-Type', /application\/json/);
    await api
      .delete(`/api/portfolio/${response.body[0].id}`).expect(204);
    const response2 = await api
      .get('/api/portfolio')
      .set('Authorization', token)
      .expect(200)
      .expect('Content-Type', /application\/json/);
  
    expect(response2.body).toHaveLength(response.body.length-1);
})

afterAll(() => {
    mongoose.connection.close();
});