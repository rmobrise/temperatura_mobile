import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";

import adafruit from "../services/api";

const TEMPERATURA_LIMITE = 20.0;

// Recebe historico e setHistorico via props do App.js
const HomeScreen = ({ historico, setHistorico }) => {
  const [temperatura, setTemperatura] = useState(null);
  const [status, setStatus] = useState("Aguardando...");
  const [erro, setErro] = useState(null);
  const [mostrarHistorico, setMostrarHistorico] = useState(false);

  const corStatus = status === "ALERTA" ? "#E74C3C" : "#2ECC71";

  useEffect(() => {
    const buscarTemperatura = async () => {
      try {
        const response = await adafruit.getUltimaTemperatura();
        const valor = parseFloat(response.data.value);

        setTemperatura(valor);
        setErro(null);

        if (valor > TEMPERATURA_LIMITE) {
          setStatus("ALERTA");
        } else {
          setStatus("NORMAL");
        }

        setHistorico((historicoAtual) => {
          const novoRegistro = {
            id: Date.now().toString(),
            valor: valor,
            horario: new Date().toLocaleTimeString(),
          };

          if (historicoAtual.length === 0) {
            return [novoRegistro];
          }

          const ultimoRegistroSalvo = historicoAtual[0];

          if (ultimoRegistroSalvo.valor !== valor) {
            return [novoRegistro, ...historicoAtual];
          }

          return historicoAtual;
        });
      } catch (error) {
        console.log("Erro ao buscar temperatura", error);
        setErro("Não foi possível buscar a temperatura");
      }
    };

    buscarTemperatura();
    const intervalo = setInterval(buscarTemperatura, 3000);

    return () => clearInterval(intervalo);
  }, []);

  const renderItemHistorico = ({ item }) => (
    <View style={styles.itemHistorico}>
      <Text style={styles.textoItemHistorico}>
        Temp: {item.valor.toFixed(2)}°C
      </Text>
      <Text style={styles.textoItemHistorico}>{item.horario}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Monitor de temperatura</Text>

      {erro && <Text style={styles.erro}>{erro}</Text>}

      <Text style={styles.temperatura}>
        {temperatura != null ? `${temperatura.toFixed(2)}°C` : "Carregando"}
      </Text>

      <View style={[styles.statusBox, { backgroundColor: corStatus }]}>
        <Text style={styles.statusTexto}>{status}</Text>
      </View>

      <TouchableOpacity
        style={styles.botaoHistorico}
        onPress={() => setMostrarHistorico(!mostrarHistorico)}
      >
        <Text style={styles.textoBotaoHistorico}>
          {mostrarHistorico ? "Esconder Histórico" : "Ver Histórico"}
        </Text>
      </TouchableOpacity>

      {mostrarHistorico && (
        <View style={styles.listaContainer}>
          {historico.length === 0 ? (
            <Text style={styles.textoVazio}>Nenhuma mudança registrada.</Text>
          ) : (
            <FlatList
              data={historico}
              keyExtractor={(item) => item.id}
              renderItem={renderItemHistorico}
              style={styles.lista}
            />
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    paddingTop: 60,
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
    marginBottom: 20,
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
  botaoHistorico: {
    backgroundColor: "#3498db",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 20,
  },
  textoBotaoHistorico: {
    color: "#fff",
    fontWeight: "bold",
  },
  listaContainer: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 20,
  },
  lista: {
    flex: 1,
  },
  itemHistorico: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  textoItemHistorico: {
    fontSize: 16,
    color: "#333",
  },
  textoVazio: {
    textAlign: "center",
    color: "#7f8c8d",
    fontSize: 16,
    marginTop: 20,
  },
});

export default HomeScreen;