//REACT
import * as React from "react";

//REACT-NATIVE
import { View, Text, Alert } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

//REACT-NATIVE-PAPER
import { Button } from "react-native-paper";

//REACT-REDUX
import { useSelector, useDispatch } from "react-redux";
import {
  getCountries,
  deleteCountry,
} from "../../../../state/admin/paises/thunks";
import PillButton from "../../../../shared/components/PillButton";

//REACT-NAVIGATION
import { useTheme } from "@react-navigation/native";

//STYLE
import styles from "../bajaStyles";

const BajaPais = ({ nombre, setViewDelModal, setIsLoading }) => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.admin.paises);
  const [selectedCountries, setSelectedCountries] = React.useState([]);

  React.useEffect(() => {
    dispatch(getCountries()).then(() => setIsLoading(false));
  }, []);

  const handleSelect = (id) => {
    const country = selectedCountries.filter((t) => t._id == id);
    if (country.length) {
      setSelectedCountries((prevState) =>
        prevState.filter((t) => t._id !== id)
      );
    } else {
      setSelectedCountries((prevState) => [...prevState, { _id: id }]);
    }
  };

  const handleDelete = () => {
    selectedCountries.forEach((country) => {
      dispatch(deleteCountry({ _id: country._id }));
    });

    return Alert.alert("Acción completa", "Pais/es borrado/s exitosamente", [
      { text: "OK", onPress: () => setViewDelModal(false) },
    ]);
  };

  return (
    <View
      style={[styles.viewContainer, { backgroundColor: colors.background }]}
    >
      <Text style={[styles.title, { color: colors.text }]}>
        Baja de {nombre}
      </Text>
      <View style={styles.mapContainer}>
        <ScrollView>
          {countries &&
            countries.length > 0 &&
            countries.map((country) => {
              const selected = selectedCountries.filter(
                (singleCountry) => singleCountry._id == country._id
              ).length
                ? true
                : false;
              return (
                <PillButton
                  title={country.countryName}
                  key={country._id}
                  id={country._id}
                  selected={selected}
                  onSelect={handleSelect}
                />
              );
            })}
        </ScrollView>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          style={styles.Button}
          onPress={() => {
            setViewDelModal(false);
          }}
        >
          <Text style={styles.textButton}>Cerrar</Text>
        </Button>

        <Button style={styles.Button} onPress={() => handleDelete()}>
          <Text style={styles.textButton}>GUARDAR</Text>
        </Button>
      </View>
    </View>
  );
};
export default BajaPais;
