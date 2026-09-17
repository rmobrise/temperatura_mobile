import { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

import adafruit from "../services/api";

const TEMPERATURA_LIMITE = 20.0;

const HomeScreen = () => {
  const [temperatura, setTemperatura] = useState(null);
  const [status, setStatus] = useState("Aguardando...");
  const [erro, setErro] = useState(null);

  const corStatus =
    status === "ALERTA" ? "#E74C3C" : "#2ECC71";

  useEffect(() => {
    const buscarTemperatura = async () => {
      try {
        const response =
          await adafruit.getUltimaTemperatura();

        const valor = parseFloat(response.data.value);

        setTemperatura(valor);
        setErro(null);

        if (valor > TEMPERATURA_LIMITE) {
          setStatus("ALERTA");
        } else {
          setStatus("NORMAL");
        }
      } catch (error) {
        console.log(
          "Erro ao buscar temperatura",
          error
        );

        setErro(
          "Não foi possível buscar a temperatura"
        );
      }
    };

    buscarTemperatura();

    const intervalo = setInterval(
      buscarTemperatura,
      3000
    );

    return () => clearInterval(intervalo);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
        Monitor de temperatura
      </Text>

      {erro && (
        <Text style={styles.erro}>
          {erro}
        </Text>
      )}

      <Text style={styles.temperatura}>
        {temperatura != null
          ? `${temperatura.toFixed(2)}°C`
          : "Carregando"}
      </Text>

      <View
        style={[
          styles.statusBox,
          { backgroundColor: corStatus },
        ]}
      >
        <Text style={styles.statusTexto}>
          {status}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
  },

  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },

  temperatura: {
    fontSize: 40,
    marginBottom: 20,
  },

  statusBox: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },

  statusTexto: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  erro: {
    color: "red",
    marginBottom: 10,
  },
});

export default HomeScreen;
