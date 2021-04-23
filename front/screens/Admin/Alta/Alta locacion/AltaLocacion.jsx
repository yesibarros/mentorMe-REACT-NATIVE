//REACT
import * as React from "react";

//REACT-NATIVE
import { View, Text, TextInput, Alert } from "react-native";

//REACT-NATIVE-PAPER
import { Button } from "react-native-paper";

//REACT-REDUX
import { useDispatch } from "react-redux";
import { createLocation } from "../../../../state/admin/locaciones/thunks";

//REACT-NAVIGATION
import { useTheme } from "@react-navigation/native";

//STYLE
import styles from "../altaStyles";


const AltaLocacion = ({ nombre, setViewModal }) => {
  const { colors } = useTheme();
  const [name, setName] = React.useState("");
  const dispatch = useDispatch();
  const handleCreation = () => {
    if (!name) {
      return alert("Debes ingresar un nombre");
    } else {
      dispatch(createLocation(name)).then(() => {
        return Alert.alert("Acción completa", "Locación creada exitosamente", [
          { text: "OK", onPress: () => setViewModal(false) },
        ]);
      });
    }
  };

  return (
    <View
      style={[styles.viewContainer, { backgroundColor: colors.background }]}
    >
      <View style={styles.wrapper}>
        <Text style={[styles.title, { color: colors.text }]}>
          Creación de {nombre}
        </Text>

        <TextInput
          value={name}
          onChangeText={(text) => setName(text)}
          style={[
            styles.input,
            { color: "black", backgroundColor: "rgba(255, 255, 255, 0.7)" },
          ]}
          multiline
        />

        <View style={styles.buttonContainer}>
          <Button
            style={styles.Button}
            onPress={() => {
              setViewModal(false);
            }}
          >
            <Text style={styles.textButton}>Cerrar</Text>
          </Button>

          <Button style={styles.Button} onPress={() => handleCreation()}>
            <Text style={styles.textButton}>GUARDAR</Text>
          </Button>
        </View>
      </View>
    </View>
  );
};

export default AltaLocacion;