try {
  axios();
  //   "https://sistemas.anac.gov.br/dadosabertos/Aeronaves/RAB/dados_aeronaves.json"
  axios("https://altinodantas.github.io/checkmark/data/dados.json").then(
    (response) => {
      checkRegistration(response.data);
    }
  );
} catch (error) {
  console.log(error);
  console.log("A consulta falhou!");
}

const checkRegistration = (data) => {
  const btnSearch = document.querySelector(".btn-search");
  const message = document.querySelector(".message");
  const aircraftRegistration = document.getElementById("registration");
  const prefix = document.getElementById("prefix");
  const model = document.getElementById("model");
  const year = document.getElementById("year");
  const manufacturer = document.getElementById("manufacturer");
  const operator = document.getElementById("operator");
  const rab = document.getElementById("rab");
  const jetphotos = document.getElementById("jetphotos");
  const flightradar = document.getElementById("flightradar");

  aircraftRegistration.focus();

  btnSearch.addEventListener("click", () => {
    searchRegistration();
    aircraftRegistration.focus();
  });

  aircraftRegistration.addEventListener("keypress", (e) => {
    if (e.keyCode === 13) {
      searchRegistration();
      aircraftRegistration.focus();
    }
  });

  const searchRegistration = () => {
    if (aircraftRegistration.value.length === 5) {
      const result = data.filter(
        (registro) =>
          registro.MARCA === aircraftRegistration.value.toUpperCase()
      );

      if (result.length === 1) {
        message.innerHTML = "Digite o registro da aeronave";
        message.classList.remove("error");
        aircraftRegistration.value = "";

        result.map((reg) => {
          const setLinkRab = `https://sistemas.anac.gov.br/aeronaves/cons_rab_resposta.asp?textMarca=${reg.MARCA}`;
          const setLinkJetphotos = `https://www.jetphotos.com/photo/keyword/${formatPrefix(
            reg.MARCA
          )}`;
          const setLinkFlighradar = `https://www.flightradar24.com/data/aircraft/${reg.MARCA.toLowerCase()}`;

          prefix.innerHTML = formatPrefix(reg.MARCA);
          manufacturer.innerHTML = reg.NMFABRICANTE;
          model.innerHTML = reg.DSMODELO;
          year.innerHTML = reg.NRANOFABRICACAO;
          operator.innerHTML = reg.NMOPERADOR;

          rab.setAttribute("href", setLinkRab);
          jetphotos.setAttribute("href", setLinkJetphotos);
          flightradar.setAttribute("href", setLinkFlighradar);
        });
      } else {
        message.innerHTML = "Registro não encontrado";
        message.classList.add("error");
      }
    } else {
      message.innerHTML = "Digite as 5 letras do registro (PR-ABC).";
      message.classList.add("error");
    }
  };
};

const formatPrefix = (reg) => {
  const registration = reg.slice(0, 2) + "-" + reg.slice(2, 5).toString();

  return registration;
};
