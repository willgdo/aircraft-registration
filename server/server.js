import http from "node:http";

async function getData() {
  const response = await fetch(
    "https://sistemas.anac.gov.br/dadosabertos/Aeronaves/RAB/dados_aeronaves.json"
  );
  const data = await response.json();
  return data;
}

const server = http.createServer(async (request, response) => {
  try {
    const data = await getData();
    // const firstAircraftBrand = data[1]?.MARCA || "Desconhecida";
    const firstAircraftBrand = data
      .filter((reg) => reg.MARCA === "PTMUG")
      .map((reg) => reg.PROPRIETARIO);

    response.writeHead(200, { "Content-Type": "text/plain" });
    response.end(`Aeronave: ${firstAircraftBrand}`);
  } catch (error) {
    console.error("Erro ao buscar dados:", error);

    response.writeHead(500, { "Content-Type": "text/plain" });
    response.end("Erro ao buscar os dados.");
  } finally {
    console.log("Requisição finalizada.");
  }
});

server.listen(3333, () => {
  console.log("Servidor rodando em http://localhost:3333");
});
