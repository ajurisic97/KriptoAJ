const portfolioRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

const User = require('../models/User');
const Portfolio = require('../models/Portfolio');


const dohvatiToken = req => {
    //console.log("Zahtjev za tokenom pokrenut");
    // iz cijelog zahtjeva dohvacamo samo 1 header
    const auth = req.get('authorization')
    
    // provjeravamo je li postoji
    if(auth && auth.toLowerCase().startsWith('bearer')){
      return auth.substring(7)
      // vraca cijeli token koji je BEARER{token}
    }
    return null
}

// DOHVAĆANJE svih portfolia
portfolioRouter.get('/', async (req, res) => {
    console.log("Dohvaćanje cijelog portfelja:\n");
    const token = dohvatiToken(req);
    console.log(token);
    const dekToken = jwt.verify(token, process.env.SECRET);
    console.log("dekToken",dekToken);
    if(!token || !dekToken.id || dekToken===null){
      console.log("NEISPRAVAN TOKEN");
      return res.status(401).json({
          error: 'Neispravan token!!'
        })
    }
    const portfolios = await Portfolio.find({
        user: dekToken.id
    })
    console.log("Portfelji:",portfolios);
    
    res.json(portfolios);
})

// DOHVAĆANJE portfolia po id:
portfolioRouter.get('/:id', (req, res) => {
    /*console.log("Pokrenut proces dohvaćanja jednog portfolia");
    const token = dohvatiToken(req);
    const dekToken = jwt.verify(token, process.env.SECRET);
    if(!token || !dekToken.id || dekToken==null){
        return res.status(401).json({
          error: 'Neispravan token!!'
        })
    };*/
    const porto = Portfolio.findById(req.params.id);
    if(porto){
        res.json(porto);
    }
    else{
        res.status(404).end();
    }
});
portfolioRouter.get('/user/:id', async (req, res) => {
  const user = await User.find({ _id: req.params.id }).populate('portfolio', {
    _id: 1,
  });
  if (user) {
    res.json(user);
  } else {
    res.status(404).end();
  }
});
// DODAVANJE novog portfolia
portfolioRouter.post('/novi', async (req, res) => {
    podaci = req.body;
    const token = dohvatiToken(req);
    const dekToken = jwt.verify(token, process.env.SECRET);
    if (!token || !dekToken.id) {
      return res.status(401).json({
        error: 'Neispravan token!!'
      });
    }
    //const options = { year: 'numeric', month: 'long', day: 'numeric' };
    //const datum2 = datum.toLocaleDateString(undefined, options);
    const noviPortfolio = new Portfolio({
        nazivKripto: podaci.nazivKripto,
        skraceniNaziv: podaci.skraceniNaziv,
        datumKupnje: new Date(),
        cijenaKupnje: podaci.cijenaKupnje,
        kolicina: podaci.kolicina,
        user: dekToken.id

    });
      const noviP = await noviPortfolio.save();
      const user = await User.findById(dekToken.id);
      user.portfolio = user.portfolio.concat(noviP._id);
      user.stanje = user.stanje - podaci.kolicina*podaci.cijenaKupnje;
      await user.save();
      return res.send(noviPortfolio);


});

  //EDIT portfolia
portfolioRouter.put('/:id', async (req, res) => {
    const podaci = req.body;
    const id = req.params.id;
    const token = dohvatiToken(req);
    const dekToken=jwt.verify(token, process.env.SECRET);
    if(!token || !dekToken.id || dekToken==null){
     return res.status(401).json({
       error: 'Neispravan token!!'
     });
    }
    // portfolio koji se treba urediti:
    const portfolio = await Portfolio.findById(id);
    // mijenja se sa sljedećim portfoliu:
    const noviPortfolio = new Portfolio( {
        nazivKripto: podaci.nazivKripto,
        skraceniNaziv: podaci.skraceniNaziv,
        datumKupnje: new Date(),
        cijenaKupnje: podaci.cijenaKupnje,
        kolicina: podaci.kolicina,
        user: dekToken.id,

    });
    Portfolio.findByIdAndUpdate(id,noviPortfolio, {new: true})
    .then(noviP => {res.json(noviP)});
    
})

// DELETE portfolia
portfolioRouter.delete('/:id', async (req, res) => {
    console.log("Brisanje portfolia");
    const id = req.params.id;
    const podaci = req.body;
    const porto = await Portfolio.findById(id);
    //console.log(porto);
    const token = dohvatiToken(req);
    const dekToken=jwt.verify(token, process.env.SECRET);
    if(!token || !dekToken.id || dekToken==null){
     return res.status(401).json({
       error: 'Neispravan token!!'
     });
    }
    const user = await User.findById(dekToken.id);
    user.stanje = user.stanje + 100;
    user.save();
    /*const user = await User.findById(dekToken.id);
    user.stanje = user.stanje + porto.kolicina*podaci.iznos;
    user.save();*/

    await Portfolio.findByIdAndRemove(id);
    res.status(204).end();
});

module.exports =portfolioRouter;