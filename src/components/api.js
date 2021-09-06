import axios from "axios";

const api  = axios.create({
    baseURL: 'https://sistemas.anac.gov.br/dadosabertos/Aeronaves/RAB/dados_aeronaves.json'
})

export default api;