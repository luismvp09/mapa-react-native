//import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Button, Text } from "react-native";
import { Map, Modal, Panel, Input, List } from "./components";
import { useState } from "react";

export default function App() {
  const [puntos, setPuntos] = useState([]);
  const [puntoTemp, setPuntoTemp] = useState({});
  const [nombre, setNombre] = useState("");
  const [visivilityFilter, setvisivilityFilter] = useState("new_punto");
  const [visibility, setVisibility] = useState(false);
  const [pointsFilter, setPointsFilter] = useState(true);

  const handleLongPress = ({ nativeEvent }) => {
    setvisivilityFilter("new_punto");
    setPuntoTemp(nativeEvent.coordinate);
    setVisibility(true);
  };

  const handleChangeText = (text) => {
    setNombre(text);
  };
  const handleSubmit = () => {
    const newPunto = { coordinate: puntoTemp, name: nombre };
    setPuntos(puntos.concat(newPunto));
    setVisibility(false);
    setNombre("");
  };

  const handleLista = () => {
    setvisivilityFilter("all_puntos");
    setVisibility(true);
  };

  const togglePointsFilter = () => setPointsFilter(!pointsFilter) 

  return (
    <View style={styles.container}>
      <Map onLongPress={handleLongPress} puntos={puntos} pointsFilter={pointsFilter} />
      <Panel onPressLeft={handleLista} textLeft="Lista" togglePointsFilter={togglePointsFilter} />
      <Modal visibility={visibility}>
        {visivilityFilter === "new_punto" ? (
          <View style={styles.form}>
            <Input
              title="Nombre"
              placeholder="Nombre del punto"
              onChangeText={handleChangeText}
            />
            <Button title="Aceptar" onPress={handleSubmit} />
          </View>
        ) : (
          <List puntos={puntos} closeModal={() => setVisibility(false)} />
        )}
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    padding: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
