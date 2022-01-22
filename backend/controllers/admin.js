const routerAdmin = require('express').Router();
const Portfolio = require('../models/Portfolio');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

//svi korisnici:
routerAdmin.get('/', async (req, res) => {
  const allUsers = await User.find({ uloga: 'user' }).populate('portfolio');
  console.log(allUsers);
  res.json(allUsers);
});

//dohvaćanje određenog korisnika
routerAdmin.get('/:id', async (req, res) => {
  const user = await User.find({ _id: req.params.id }).populate('portfolio', {
    _id: 1,
  });
  if (user) {
    res.json(user);
  } else {
    res.status(404).end();
  }
});

//update korisnika
routerAdmin.put('/:id', async (req, res) => {
  const data = req.body;
  const userId = req.params.id;
  if (data.password != data.password2) {
    return res.status(404).send({
      error: 'Passwords are not equal',
    });
  }
  const user = await User.findById(userId);
  console.log('Korisnik:',user);
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(data.password, salt);

  const dataEdit = {
    username: data.username,
    email: data.email,
    password: hashedPassword,
    stanje: data.stanje,

  };

  User.findByIdAndUpdate(userId, dataEdit, {
    new: true,
    useFindAndModify: false,
  }).then((newUser) => {
    console.log("baza",newUser);
    res.json(newUser);
  });
});

// brisanje korisnika
routerAdmin.delete('/:id', async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById(userId);
  console.log('Brisanje -> Korisnik:',user);
  // prvo brišemo sve iz portfolia
  await Portfolio.deleteMany({
    user: {
      $in: [userId],
    },
  });
  await User.findByIdAndRemove(userId, { useFindAndModify: false });
  res.status(204).end();
});

module.exports = routerAdmin;
