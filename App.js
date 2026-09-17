import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import HomeScreen from "./src/screens/HomeScreen";
import UpdateTemp from "./src/components/UpdateTemp";

export default function App() {
  const [tela, setTela] = useState("home");

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      {tela === "home" ? (
        <>
          <HomeScreen />

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
    backgroundColor: "#fff",
  },

  botao: {
    backgroundColor: "#3498DB",
    paddingVertical: 14,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignSelf: "center",
    marginBottom: 30,
  },

  textoBotao: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
