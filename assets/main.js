// axios.get('https://sistemas.anac.gov.br/dadosabertos/Aeronaves/RAB/dados_aeronaves.json')
axios('https://altinodantas.github.io/checkmark/data/dados.json')
    .then(response => {
        checkRegistration(response.data)
    }
);

const checkRegistration = (data) => {
    const btnSearch = document.querySelector(".btn-search");
    const message = document.querySelector(".message");
    const aircraftRegistration = document.getElementById("registration");
    const prefix = document.querySelector(".prefix");
    const model = document.querySelector(".model");
    const year = document.querySelector(".year");
    const manufacturer = document.querySelector(".manufacturer");
    const operator = document.querySelector(".operator");
    const rab = document.querySelector(".rab");
    const jetphotos = document.querySelector(".jetphotos");

    aircraftRegistration.focus();

    btnSearch.addEventListener('click', () => {
        searchRegistration();
    });

    aircraftRegistration.addEventListener('keypress', (e) => {
        if (e.keyCode === 13) {
            searchRegistration();
    }});

    const searchRegistration = () => {
        if (aircraftRegistration.value.length === 5) {

            const result = data.filter(registro => registro.MARCA === aircraftRegistration.value.toUpperCase());

            if (result.length === 1) {
                
                message.innerHTML = 'Digite o registro da aeronave';
                message.classList.remove("error");
                aircraftRegistration.value = '';                

                result.map(reg => {
                    const setLinkJetphotos = `https://www.jetphotos.com/photo/keyword/${formatPrefix(reg.MARCA)}`;
                    const setLinkRab = `https://sistemas.anac.gov.br/aeronaves/cons_rab_resposta.asp?textMarca=${reg.MARCA}`;

                    prefix.innerHTML = formatPrefix(reg.MARCA);
                    manufacturer.innerHTML = reg.NMFABRICANTE;
                    model.innerHTML = reg.DSMODELO;
                    year.innerHTML = reg.NRANOFABRICACAO;
                    operator.innerHTML = reg.NMOPERADOR;

                    jetphotos.setAttribute("href", setLinkJetphotos);
                    rab.setAttribute("href", setLinkRab);
                });               

            } else {
                message.innerHTML = 'Registro não encontrado';
                message.classList.add("error");
            }
        } else {
            message.innerHTML = 'Digite as 5 letras do registro (PR-ABC).';
            message.classList.add("error");
        }
    }
}

const formatPrefix = (reg) => {
    const registration = reg.slice(0, 2) + '-' + reg.slice(2,5).toString();

    return registration;
}
