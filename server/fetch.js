async function getData() {
  const response = await fetch(
    "https://sistemas.anac.gov.br/dadosabertos/Aeronaves/RAB/dados_aeronaves.json"
  );
  const data = await response.json();
  return data;
}

export const load = async () => {
  try {
    const data = await getData();
    return data;
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
  } finally {
    console.log("Requisição finalizada.");
  }
};
