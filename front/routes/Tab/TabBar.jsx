//REACT
import React, { useState } from "react";
import { useSelector } from "react-redux";

//REACT-REDUX

//REACT-NATIVE
import { View, StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

//ROUTES
import Tab from "./Tab";

//EXPO
import { LinearGradient } from "expo-linear-gradient";



const TabBar = ({ navigation }) => {
  const [selected, setSelected] = useState("Home");
  const loginUser = useSelector((state) => state.loggedUser.user);
  const state = {
    routes: [
      {
        name: "Mi perfil",
      },

      {
        name:
          loginUser.role == "admin"
            ? "Admin"
            : loginUser.role == "mentee"
            ? "Progreso"
            : "Solicitudes",
      },
      {
        name: loginUser.role == "mentor" ? "Mis mentees" : "Mi mentor",
      },
    ],
    stale: false,
    type: "tab",
  };
  const { routes } = state;
  const handlePress = (activeTab, index) => {
    if (state.index !== index) {
      setSelected(activeTab);
      navigation.navigate(activeTab);
    }
  };

  return (
    <View style={styles.wrapper}>
      <LinearGradient
        // Background Linear Gradient
        colors={["#ffc78f", "#ff9c38"]}
        style={styles.background}
      >
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-around",
          }}
        >
          {routes.map((route, index) => (
            <Tab
              tab={route}
              onPress={() => handlePress(route.name, index)}
              key={index}
            />
          ))}
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "yellow",
    width: wp("100%"),
  },
  background: {
    height: hp("6%"),
  },
});

export default TabBar;
