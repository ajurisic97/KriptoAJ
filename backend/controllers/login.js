const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const Korisnik = require('../models/User')


//Login korisnika
loginRouter.post('/login', async (req, res) => {
    console.log("Početak prijave!\n");
    const podaci = req.body;
    const korisnik = await Korisnik.findOne({
        username: podaci.username,
        uloga: 'user'
    });
    if (!korisnik) {
      console.log("NEMA KORISNIKA");
      return res.status(404).json({
        error: 'Username does not exists',
      });
    }
    // ako korisnik nije null onda usporedivamo. Saljemo 2 parametra iz podataka usporedujemo "pass" iz frontenda i usporedujemo sa njegovim podacima iz baze
    const passDobar = await bcrypt.compare(podaci.password, korisnik.password)
    if(!passDobar){
      return res.status(404).json({
        error: 'Neispravni username ili lozinka'
        
      })
    }
    const korisnikToken = {
      username : korisnik.username,
      id: korisnik.id
    }
    console.log("slijedi autentficikacija");
    
    const token = jwt.sign(korisnikToken, process.env.SECRET)
    console.log("Uspješna autentifikacija");
    res
    .status(200)
    .send({
      token,username: korisnik.username
    })
})

//Registracija korisnika
loginRouter.post('/registracija',async (req, res) => {
    const podaci = req.body;
    // provjera 1: je li se pw i ponovljena pw podudarjau
    if(podaci.password != podaci.password2){
        return res.status(404).send({
            error: 'Lozinke se ne podudaraju'});
    }
    // provjera 2 (mail)
    const postojeciMail=await Korisnik.findOne({email: podaci.email});
    if(postojeciMail){
        return res.status(404).send({
            error: 'Mail vec postoji u sustavu!'});
    }
    // Provjera 3: format maila:
    var losMail=true;
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(podaci.email))
    {
        losMail=false;
    }
    if(losMail){
        return res.status(404).send({
            error: 'Nepravilan format maila'});
    }
    // Provjera 4 (username)
    const postojeciUsername=await Korisnik.findOne({username: podaci.username});
    if(postojeciUsername){
        return res.status(404).send({
            error: 'Username vec postoji u sustavu!'});
    }
    //hashiranje PWa
    const runde = 10;
    const passwordHash = await bcrypt.hash(podaci.password, runde);

    // stvaranje objekta
    const korisnik = new Korisnik({
        username : podaci.username,
        email: podaci.email,
        password: passwordHash,
        stanje: podaci.stanje,
        uloga: 'user',
        favoriti: ['']
    });
    console.log("Sad slijedi registracija:");
    try {
        const savedUser = await korisnik.save();
        const userGet = await Korisnik.findOne({ username: podaci.username });
        const userToken = {
          username: korisnik.username,
          id: korisnik.id,
        };
        const token = jwt.sign(userToken, process.env.SECRET); 
        res.status(200).send({ token, username: korisnik.username });
      } catch (err) {
        console.log(err);

        res.status(400).send(err);
      }
    /*
    //spremanje u bazu
    const noviKorisnik = await korisnik.save()
    res.json(noviKorisnik);
    // za automatski login nakon registracije
    const korisnikToken = {
        username : korisnik.username,
        id: korisnik._id
    }
    const token = jwt.sign(korisnikToken, process.env.SECRET)
    console.log("Uspješna autentifikacija");
    res
    .status(200)
    .send({token,username: korisnik.username,ime: korisnik.ime
    });*/


})


//Login admina
loginRouter.post('/loginadmin', async (req, res) => {
    const podaci = req.body;
    //validacija
  const adminExists = await Korisnik.findOne({ uloga: 'admin' });
  console.log(adminExists);
  if (adminExists==null && podaci.username == 'admin' && podaci.password == 'admin') {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin', salt);
    //kreiramo admin acc ako ne postoji
    const admin = new Korisnik({
      username: 'admin',
      email: 'admin@gmail.com',
      password: hashedPassword,
      uloga: 'admin',
      stanje: 10000
      });
    try {
      console.log("Admin:",admin.username);
      console.log("PW:",admin.password);
      const userToken = {
        username: admin.username,
        id: admin.id,
      };
      
      const token = jwt.sign(userToken, process.env.SECRET); 
      
      const kreirajAdmina = await admin.save();
      res.status(200).send({ token, username: admin.username });
    } catch (err) {
      console.log("ERROR ODMA VATA");
      res.status(400).send(err);
    }
  }
  else 
  {

    const validPassowrd = await bcrypt.compare(
      req.body.password,
      adminExists.password
    );
    if (!validPassowrd || req.body.username != adminExists.username) {
      return res.status(404).json({
        error: 'Pogresan username ili lozinka',
      });
    }
    const userToken = {
      username: adminExists.username,
      id: adminExists.id,
    };
    console.log(userToken);
    const token = jwt.sign(userToken, process.env.SECRET); 
    console.log('Uspjesno spajanje administratora');
    res.status(200).send({ token, username: adminExists.username });
  }
})


module.exports = loginRouter