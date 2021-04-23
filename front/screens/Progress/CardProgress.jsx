//REACT
import React, { useState } from "react";

//REACT-NATIVE
import {
  View,
  TouchableOpacity,
  Text,
  Modal,
  KeyboardAvoidingView,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { ScrollView } from "react-native-gesture-handler";
import SelectPicker from "react-native-form-select-picker";

//REACT-NATIVE-PAPER
import {
  Card,
  Button,
  Avatar,
  IconButton,
  TextInput,
} from "react-native-paper";

//REACT-REDUX
import { useDispatch, useSelector } from "react-redux";
import { updateObjective, getObjectives } from "../../state/objetivos/thunks";

//STYLE
import styles from "./cardProgressStyle";

const CardProgress = ({ item, last }) => {
  const loggedUser = useSelector((state) => state.loggedUser.user);
  const [viewModal, setViewModal] = useState(false);
  const [feedbackMentor, setFeedbackMentor] = React.useState("");
  const [selected, setSelected] = useState();
  const dispatch = useDispatch();
  const border = last ? "transparent" : "lightgrey";
  const idMentee = item.mentee && item.mentee._id;

  const handleUpdate = () => {
    if (!feedbackMentor && selected !== "pending") {
      return alert("Debes dar una devolución");
    } else {
      dispatch(
        updateObjective({
          id: item._id,
          status: selected,
          feedback: feedbackMentor,
        })
      )
        .then(() => dispatch(getObjectives(idMentee)))
        .then(() => {
          setViewModal(false);
        });
    }
  };

  return (
    <View style={styles.progressContainer}>
      <View style={[styles.container, { borderColor: border }]}>
        <Avatar.Icon
          size={hp("7%")}
          color="#009387"
          icon={item.status === "pending" ? "progress-clock" : "check-bold"}
          style={styles.avatar}
        ></Avatar.Icon>
        <Card style={styles.card}>
          <Card.Title
            title={item.objectiveName}
            subtitle={item.description}
            right={(props) => (
              <IconButton
                {...props}
                size={hp("3%")}
                color="#009387"
                icon="eye-plus"
                onPress={() => {
                  setViewModal(true);
                }}
              />
            )}
          />
        </Card>

        <KeyboardAvoidingView
          behavior="padding"
          style={{
            flex: 1,
          }}
          enabled={Platform.OS === "android"}
          keyboardVerticalOffset={80}
        >
          <Modal visible={viewModal} transparent={true} animationType="slide">
            <View style={styles.viewContainer}>
              <View
                style={{
                  flex: 0.3,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: hp("3%"),
                    fontWeight: "bold",
                    alignContent: "center",
                    textTransform: "uppercase",
                    marginLeft: 10,
                  }}
                >
                  {item.objectiveName}
                </Text>
              </View>

              <Card style={styles.empty}>
                <ScrollView>
                  <Text
                    style={{
                      fontSize: 20,
                      padding: 10,
                    }}
                  >
                    {item.description}
                  </Text>
                </ScrollView>
              </Card>
              <View
                style={{
                  flex: 0.7,
                  justifyContent: "space-around",
                }}
              >
                <Text style={{ fontSize: 20, paddingLeft: 20 }}>
                  Fecha: 20/4/2020
                </Text>
                {loggedUser.role && loggedUser.role[0] === "mentor" ? (
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={{ fontSize: 20, paddingLeft: 20 }}>
                      Modificar Estado:
                    </Text>
                    <SelectPicker
                      onValueChange={(value) => {
                        setSelected(value);
                      }}
                      selected={selected}
                      style={styles.inputLocation}
                      placeholder="Selecciona el estado"
                    >
                      <SelectPicker.Item
                        label="Pendiente"
                        value="pending"
                        key="pending"
                      />
                      <SelectPicker.Item
                        label="Logrado"
                        value="achieved"
                        key="achieved"
                      />
                      <SelectPicker.Item
                        label="Excelente"
                        value="excellent"
                        key="excellent"
                      />
                    </SelectPicker>
                  </View>
                ) : (
                  <Text style={{ fontSize: 20, paddingLeft: 20 }}>
                    Estado: {item.status}
                  </Text>
                )}
                {loggedUser &&
                loggedUser.role &&
                loggedUser.role.includes("mentor") ? (
                  <View
                    style={{
                      alignItems: "center",
                    }}
                  >
                    <TextInput
                      style={{ width: "90%" }}
                      label="Devolucion"
                      value={feedbackMentor}
                      onChangeText={(feedbackMentor) =>
                        setFeedbackMentor(feedbackMentor)
                      }
                    />
                  </View>
                ) : (
                  <Text style={{ fontSize: 20, paddingLeft: 20 }}>
                    Devolucion:
                    {item.feedback
                      ? item.feedback
                      : "No hay devoluciones todavia."}
                  </Text>
                )}
              </View>
              {/* crear un select que tenga 3 opciones */}
              {/* implementar calender */}
              <TouchableOpacity />

              <View
                style={{
                  flex: 0.4,
                  alignItems: "center",
                  flexDirection: "row",
                  justifyContent: "space-around",
                }}
              >
                {/* <View > */}
                <Button
                  style={{
                    backgroundColor: "#009387",
                    width: "40%",
                    height: "40%",
                    justifyContent: "center",
                  }}
                  onPress={() => {
                    setViewModal(false);
                  }}
                >
                  <Text
                    style={{
                      fontSize: hp("2%"),
                      color: "white",
                      textAlign: "center",
                    }}
                  >
                    Cerrar
                  </Text>
                </Button>

                {loggedUser &&
                loggedUser.role &&
                loggedUser.role.includes("mentor") ? (
                  <Button
                    style={{
                      backgroundColor: "#009387",
                      width: "40%",
                      height: "40%",
                      justifyContent: "center",
                    }}
                    onPress={() => {
                      return handleUpdate();
                    }}
                  >
                    <Text
                      style={{
                        fontSize: hp("2%"),
                        color: "white",
                        textAlign: "center",
                      }}
                    >
                      GUARDAR
                    </Text>
                  </Button>
                ) : null}
              </View>
            </View>
          </Modal>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};

export default CardProgress;
