import { load } from "./fetch.js";

const getData = async () => {
  const data = await load();
  const search =
    data
      .filter((reg) => reg?.MARCA === "PSBTG")
      .map((reg) => reg?.PROPRIETARIO) || "Desconhecido";
  console.log(search);
};
getData();
