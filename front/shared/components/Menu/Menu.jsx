// REACT
import * as React from "react";

// REACT REDUX
import { useSelector, useDispatch } from "react-redux";
import { cancelMatch, finishMentoring } from "../../../state/loggedUser/thunks";
import { getSingleUser } from "../../../state/singleUser/thunks";
import { createMeets, getMyMeets } from "../../../state/Meetings/thunks";

// REACT NATIVE
import { View, Modal, Alert } from "react-native";

// REACT NATIVE PAPER
import { IconButton, Menu, Divider } from "react-native-paper";

// SCREENS
import ConfirmCancelMatch from "./ConfirmCancelMatch";
import SendMeeting from "./SendMeeting";
import EndOfMentoring from "./EndOfMentoring";
import TextEndOfMentoring from "./TextEndOfMentoring";

const MyComponent = ({ userId, navigation }) => {
  const [visible, setVisible] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const [showModalMeeting, setModalMeeting] = React.useState(false);
  const [showModalEndOfMeeting, setModalEndOfMeeting] = React.useState(false);
  const [showModalTextEnd, setModalTextEnd] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const user = useSelector((state) => state.loggedUser.user);
  const dispatch = useDispatch();
  const mentor = user.mentor?._id == userId && userId;
  const mentee = (user.mentees?.filter((ment) => ment._id == userId))[0];
  const handleCancelMatch = (rol) => {
    setIsLoading(true);
    closeMenu();
    dispatch(cancelMatch({ [rol]: userId })).then(() => {
      setIsLoading(false);
      setShowModal(false);
    });
  };

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const selectUser = (id) => {
    dispatch(getSingleUser({ id })).then((data) => {
      closeMenu();
      navigation.navigate("SingleUser");
    });
  };

  const handleSendMeeting = (meeting) => {
    dispatch(createMeets(meeting)).then(() => {
      dispatch(getMyMeets()).then(() => navigation.navigate("Meeting"));
    });
  };

  const handleEndOfMeeting = () => {
    setModalTextEnd(!showModalTextEnd);
    closeMenu(true);
  };

  const handleSendEndOfMentoring = (message) => {
    dispatch(
      finishMentoring({ ["mentee"]: userId, messageEndOfMentoring: message })
    ).then(() => {
      return Alert.alert(
        "Felicidades",
        `${mentee.firstName} dejo de ser tu meente, gracias por acompañarlo en este proceso.`,
        [
          {
            text: "Ok",
            onPress: () => navigation.navigate("Mis mentees"),
          },
        ]
      );
    });
  };

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={<IconButton icon="dots-vertical" onPress={openMenu} />}
      >
        <Menu.Item
          icon="account-outline"
          onPress={() => selectUser(userId)}
          title="Ver perfil"
        />
        {user?.role?.includes("mentor") && (
          <Menu.Item
            icon="rocket-launch-outline"
            onPress={() => {
              closeMenu();
              navigation.navigate("Progreso", { idCurrent: userId });
            }}
            title="Objetivos"
          />
        )}
        <Menu.Item
          icon="account-multiple-outline"
          onPress={() => {
            setModalMeeting(true);
          }}
          title="Reunirse"
        />
        {user?.role?.[0] === "mentor" && (
          <Menu.Item
            icon="account-check-outline"
            onPress={() => {
              setModalEndOfMeeting(true);
            }}
            title="Finalizar mentoreo"
          />
        )}

        <Divider />
        <Menu.Item
          icon="account-cancel-outline"
          onPress={() => setShowModal(true)}
          title="Cancelar match"
        />
      </Menu>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModalMeeting}
        animationType="slide"
        onRequestClose={() => setModalMeeting(!showModalMeeting)}
      >
        <SendMeeting
          handleSendMeeting={handleSendMeeting}
          setModalMeeting={setModalMeeting}
          mentee={mentee}
          mentor={mentor}
          isLoading={isLoading}
          closeMenu={closeMenu}
        />
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={showModalEndOfMeeting}
        animationType="slide"
        onRequestClose={() => setModalEndOfMeeting(!showModalEndOfMeeting)}
      >
        <EndOfMentoring
          handleEndOfMeeting={handleEndOfMeeting}
          setModalEndOfMeeting={setModalEndOfMeeting}
          mentee={mentee}
          isLoading={isLoading}
        />
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={showModalTextEnd}
        animationType="slide"
        onRequestClose={() => setModalTextEnd(!showModalTextEnd)}
      >
        <TextEndOfMentoring
          handleSendEndOfMentoring={handleSendEndOfMentoring}
          setModalTextEnd={setModalTextEnd}
          isLoading={isLoading}
          closeMenu={closeMenu}
        />
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        animationType="slide"
        onRequestClose={() => setShowModal(!showModal)}
      >
        <ConfirmCancelMatch
          cancelMatch={handleCancelMatch}
          setShowModal={setShowModal}
          mentee={mentee}
          mentor={user?.mentor}
          isLoading={isLoading}
        />
      </Modal>
    </View>
  );
};

export default MyComponent;
