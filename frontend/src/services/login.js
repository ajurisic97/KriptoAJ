import axios from 'axios';
const osnovniUrl = 'http://localhost:3001/api/user';

const loginAdmin = async (novaPrijava) => {
    const response = await axios.post(`${osnovniUrl}/loginadmin`, novaPrijava);
    return response;
}
const loginUser = async (novaPrijava) => {
    const response = await axios.post(`${osnovniUrl}/login`, novaPrijava);
    return response;
}
const registracija = async (noviKorisnik) => {
    const response = await axios.post(`${osnovniUrl}/registracija`, noviKorisnik);
    return response;
}

export default {
    loginAdmin: loginAdmin,
    loginUser: loginUser,
    registracija: registracija,
};