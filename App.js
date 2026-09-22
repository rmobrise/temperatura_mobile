  import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import HomeScreen from "./src/screens/HomeScreen";
import UpdateTemp from "./src/components/UpdateTemp";

export default function App() {
  const [tela, setTela] = useState("home");
  
  // O estado fica no App para não ser destruído ao trocar de tela
  const [historico, setHistorico] = useState([]);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      {tela === "home" ? (
        <>
          <HomeScreen historico={historico} setHistorico={setHistorico} />

          <TouchableOpacity
            style={styles.botao}
            onPress={() => setTela("update")}
          >
            <Text style={styles.textoBotao}>
              Atualizar Temperatura
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        <UpdateTemp setTela={setTela} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  botao: {
    backgroundColor: '#3498db',
    padding: 15,
    margin: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 40,
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  }
});