//REACT
import React, { useEffect, useRef } from "react";

//REACT-NATIVE
import { ScrollView, View, Dimensions, Animated } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

//SCREENS
import Header from "../header/Header";

//STYLE
import styles from "./menteesStyle";

//REACT-NATIVE-PAPER
import { FAB, Text } from "react-native-paper";

//REACT-NAVIGATION
import { useTheme } from "@react-navigation/native";

//REACT-REDUX
import { useSelector, useDispatch } from "react-redux";

//COMPONENTS
import UserList from "../../shared/components/UserList/UserList";
import UserCard from "../../shared/components/UserList/UserCard";

const { height, width } = Dimensions.get("window");

const Mentees = ({ navigation }) => {
  const [startAnimate, setStartAnimate] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const translation = useRef(new Animated.Value(100)).current;
  const yTranslation = useRef(new Animated.Value(100)).current;
  useEffect(() => {
    if (!startAnimate) {
      Animated.timing(translation, {
        toValue: width - 150,
        duration: 2000,
        useNativeDriver: false,
      }).start();
      Animated.timing(yTranslation, {
        toValue: height - 200,
        duration: 2000,
        useNativeDriver: false,
      }).start();
    }

    setStartAnimate(true);
  }, []);
  //VER LO USEEFFECT
  const loginUser = useSelector((state) => state.loggedUser.user);
  const dispatch = useDispatch();
  const { colors } = useTheme();
  useEffect(() => {
    if (loginUser?.mentees.length == 0) {
      setVisible(true);
    }
  }, []);
  const menteesToShow = () => {
    let mentees = loginUser?._id
      ? loginUser?.mentees
        ? [...loginUser.mentees] || []
        : []
      : [];
    const length = mentees.length;
    if (length !== 4) {
      for (let i = 0; i < 5 - length; i++) {
        mentees.push(null);
      }
    }
    return mentees;
  };
  const mentor = loginUser.mentor || "hola";

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <Header navigation={navigation} />
          <Text style={styles.title}>
            {loginUser.role == "mentor" ? "MENTEES" : "MENTOR"}
          </Text>
          <View style={[styles.body, { backgroundColor: colors.background }]}>
            <View style={styles.usersContainer}>
              {(loginUser.role == "mentor" && loginUser.mentees?.length == 0) ||
              (loginUser.role == "mentee" && !loginUser.mentor) ? (
                <View style={{ marginVertical: hp("25%") }}>
                  <View style={styles.n}>
                    <Text style={styles.nText}>
                      No tenes{" "}
                      {loginUser.role == "mentor" ? "ningún mentee" : "mentor"}{" "}
                      todavía.
                    </Text>
                  </View>
                </View>
              ) : loginUser.role == "mentee" ? (
                <UserCard user={mentor} navigation={navigation} />
              ) : (
                <UserList users={menteesToShow()} navigation={navigation} />
              )}
            </View>
            {loginUser?.mentees?.length == 4 && (
              <View style={styles.noteContainer}>
                <Text style={styles.note}>
                  Solamente puedes tener hasta 5 mentees,
                </Text>
                <Text style={styles.note}>
                  elimina los que ya tienes para agregar nuevos.
                </Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
      {(loginUser?.role?.includes("mentor") && loginUser.mentees?.length < 5) ||
      (loginUser?.role?.includes("mentee") && !loginUser.mentor) ? (
        <Animated.View
          style={{
            position: "absolute",
            zIndex: 1,
            width: 100,
            height: 100,
            borderRadius: 50,
            backgroundColor: yTranslation.interpolate({
              inputRange: [0, 375, height - 200],
              outputRange: ["grey", "lightgrey", "transparent"],
            }),
            opacity: translation.interpolate({
              inputRange: [0, 100],
              outputRange: [0, 1],
            }),
            transform: [
              { translateX: translation },
              { translateY: yTranslation },

              {
                rotate: translation.interpolate({
                  inputRange: [0, 50, width - 150],
                  outputRange: ["0deg", "180deg", "360deg"],
                }),
              },
            ],
          }}
        >
          <FAB
            style={styles.fab}
            icon="account-plus"
            onPress={() => navigation.navigate("SearchMatch")}
          />
        </Animated.View>
      ) : null}
    </>
  );
};

export default Mentees;
