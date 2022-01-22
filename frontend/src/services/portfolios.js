import axios from 'axios';
const osnovniUrl='http://localhost:3001/api/portfolio';
const osnovniUrl2='http://localhost:3001/api/portfolio/user';


let token = null;
const postaviToken = (noviToken) =>{
    token = `bearer ${noviToken}`;
}
const dohvatiUsera = async (idUsera)=>{
    const config = {
        headers: {Authorization: token}
    }
    const response = await axios.get(`${osnovniUrl2}/${idUsera}`,config);
    return response;
}
const dohvatiSve = async () => {
    const config = {
        headers: {Authorization: token}
    }
    console.log(osnovniUrl);
    const response = await axios.get(osnovniUrl,config);
    console.log("RES",response);
    return response;
}
const dodajPortfolio = async (noviPortfolio) => {
    const config = {
        headers: {Authorization: token}
    }
    const response = await axios.post(`${osnovniUrl}/novi`,noviPortfolio,config);
    console.log(response);
    return response;
}
const urediPortfolio = async (idPortfolio,noviPortfolio) => {
    const config = {
        headers: {Authorization: token}
    }
    const response = await axios.put(`${osnovniUrl}/${idPortfolio}`,noviPortfolio,config);
    return response;
}
const izbrisiPortfolio = async (idPortfolio) => {
    const config = {
        headers: {Authorization: token}
    }
    const response = await axios.delete(`${osnovniUrl}/${idPortfolio}`,config);
    return response;
}
export default{
    dohvatiSve: dohvatiSve,
    dodajPortfolio: dodajPortfolio,
    urediPortfolio: urediPortfolio,
    izbrisiPortfolio: izbrisiPortfolio,
    postaviToken: postaviToken,
    dohvatiUsera: dohvatiUsera,
};