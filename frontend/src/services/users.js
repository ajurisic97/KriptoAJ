import axios from 'axios';
const osnovniUrl = 'http://localhost:3001/api/admin';

const dohvatiSve = async ()=> {
    const promise = await axios.get(osnovniUrl);
    return promise;
};
const izbrisiUsera = async (idUser) => {
    const response = await axios.delete(`${osnovniUrl}/${idUser}`);
    return response;
};
const urediUsera = async (idUser, uredeniUser) => {
    const response = await axios.put(`${osnovniUrl}/${idUser}`, uredeniUser);
    return response;
};

export default {
    urediUsera:urediUsera,
    dohvatiSve: dohvatiSve,
    izbrisiUsera: izbrisiUsera,
};