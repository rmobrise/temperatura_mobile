import axios from "axios";

import {
  AIO_USERNAME,
  AIO_KEY,
  AIO_FEEDNAME,
} from "../config/adafruitConfig";

// Criando instância do axios configurada para o Adafruit IO
const BASE_URL = `https://io.adafruit.com/api/v2/${AIO_USERNAME}/feeds/`;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "X-AIO-KEY": AIO_KEY,
    "Content-Type": "application/json",
  },
});

const adafruit = {
  // Busca a última temperatura cadastrada no feed
  getUltimaTemperatura: () =>
    api.get(`${AIO_FEEDNAME}/data/last`),

  // Envia uma nova temperatura para o feed
  atualizarTemperatura: (valor) =>
    api.post(`${AIO_FEEDNAME}/data`, {
      value: valor,
    }),
};

export default adafruit;
