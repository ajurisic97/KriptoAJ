require('dotenv').config()

const PORT = process.env.PORT

// Baza podataka
const password = process.env.ATLAS_PASS
const dbname = process.env.NODE_ENV === 'myFirstDatabase'
? 'crypto-test'
: 'crypto';
const DB_URI = `mongodb+srv://ajurisic97:${password}@clustercryptoaj.knand.mongodb.net/${dbname}?retryWrites=true&w=majority`

module.exports = {PORT, DB_URI}