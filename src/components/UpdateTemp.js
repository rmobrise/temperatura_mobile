import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import adafruit from "../services/api";

const UpdateTemp = ({ setTela }) => {
  const [temperatura, setTemperatura] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [enviando, setEnviando] = useState(false);

  const enviarTemperatura = async () => {
    if (temperatura.trim() === "") {
      setMensagem("Digite uma temperatura.");
      return;
    }

    const valor = Number(temperatura.replace(",", "."));

    if (isNaN(valor)) {
      setMensagem("Digite um valor numérico válido.");
      return;
    }

    try {
      setEnviando(true);
      setMensagem("");

      await adafruit.atualizarTemperatura(valor);

      setMensagem("Temperatura enviada com sucesso!");

      setTimeout(() => {
        setTela("home");
      }, 500);
    } catch (error) {
      console.log("Erro ao enviar temperatura:", error);
      setMensagem("Não foi possível enviar a temperatura.");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
        Atualizar Temperatura
      </Text>

      <Text style={styles.label}>
        Digite a nova temperatura:
      </Text>

      <TextInput
        style={styles.input}
        value={temperatura}
        onChangeText={setTemperatura}
        placeholder="Ex: 25.5"
        keyboardType="numeric"
      />

      {mensagem !== "" && (
        <Text
          style={
            mensagem.includes("sucesso")
              ? styles.sucesso
              : styles.erro
          }
        >
          {mensagem}
        </Text>
      )}

      <TouchableOpacity
        style={[
          styles.botao,
          enviando && styles.botaoDesabilitado,
        ]}
        onPress={enviarTemperatura}
        disabled={enviando}
      >
        <Text style={styles.textoBotao}>
          {enviando ? "Enviando..." : "Enviar"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botaoVoltar}
        onPress={() => setTela("home")}
      >
        <Text style={styles.textoVoltar}>
          Voltar
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },

  titulo: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 30,
  },

  label: {
    fontSize: 16,
    marginBottom: 10,
  },

  input: {
    width: "80%",
    height: 50,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 18,
    textAlign: "center",
    marginBottom: 15,
  },

  botao: {
    width: "80%",
    backgroundColor: "#3498DB",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },

  botaoDesabilitado: {
    opacity: 0.5,
  },

  textoBotao: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold",
  },

  botaoVoltar: {
    marginTop: 15,
    paddingVertical: 12,
  },

  textoVoltar: {
    color: "#3498DB",
    fontSize: 16,
    fontWeight: "bold",
  },

  sucesso: {
    color: "#27AE60",
    marginBottom: 10,
    fontWeight: "bold",
  },

  erro: {
    color: "#E74C3C",
    marginBottom: 10,
    fontWeight: "bold",
  },
});

export default UpdateTemp;
