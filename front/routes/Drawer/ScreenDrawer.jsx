//REACT
import React from "react";

//REACT-NATIVE
import { View, Text } from "react-native";

//REACT-NATIVE-PAPER
import {
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  TouchableRipple,
  Switch,
} from "react-native-paper";

//REACT-REDUX
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../state/loggedUser/actions";
import { setTheme } from "../../state/Theme/actions";
import { setToggleRole } from "../../state/ToggleRole/actions";

//REACT-NAVIGATION
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { useTheme } from "@react-navigation/native";

//EXPO
import * as Linking from "expo-linking";

//STYLE
import styles from "./drawerStyles";

//ICON
import Icon from "react-native-vector-icons/MaterialCommunityIcons";



const ScreenDrawer = (props) => {
  const user = useSelector((state) => state.loggedUser.user);
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  const isMentor = useSelector((state) => state.toggleRole);

  const isDarkTheme = useSelector((state) => state.darkTheme);
  const toggleTheme = () => {
    // setIsDarkTheme(!isDarkTheme);
    dispatch(setTheme());
  };
  const toggleRole = () => {
    dispatch(setToggleRole());
  };
  const oppositeRole =
    user.role && user.role[0] === "mentor" ? "Mis mentees" : "Mi mentor";
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: "row", marginTop: 15 }}>
              <Avatar.Image
                source={{
                  uri: user.img,
                }}
                size={50}
              />
              <View style={{ marginLeft: 15, flexDirection: "column" }}>
                <Title style={styles.title}>
                  {`${user.firstName} ${user.lastName}`}
                </Title>
                <Caption style={styles.caption}>
                  {user.email?.length > 17
                    ? `${user.email.slice(1, 18)}...`
                    : user.email}
                </Caption>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.section}>
                <Paragraph style={[styles.paragraph, styles.caption]}>
                  {user.mentor ? "1" : 0}
                </Paragraph>
                <Caption style={([styles.caption], { marginLeft: 10 })}>
                  Mentor
                </Caption>
              </View>
              <View style={styles.section}>
                <Paragraph style={[styles.paragraph, styles.caption]}>
                  {user.mentees && user.mentees.length}
                </Paragraph>
                <Caption style={([styles.caption], { marginLeft: 10 })}>
                  Mentees
                </Caption>
              </View>
            </View>
          </View>

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="home-outline" color={color} size={size} />
              )}
              label="Home"
              onPress={() => {
                props.navigation.navigate("Mi perfil");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="bell-outline" color={color} size={size} />
              )}
              label="Notificaciones"
              onPress={() => {
                props.navigation.navigate("Notificaciones");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="account-outline" color={color} size={size} />
              )}
              label={`Solicitudes ${
                user.receivedPendingRequests == 0
                  ? ""
                  : user.receivedPendingRequests
              }`}
              onPress={() => {
                props.navigation.navigate("Solicitudes");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="bookmark-outline" color={color} size={size} />
              )}
              label={oppositeRole}
              onPress={() => props.navigation.navigate(oppositeRole)}
            />
            {user.role == "mentor" && (
              <DrawerItem
                icon={({ color, size }) => (
                  <Icon
                    name="shield-account-outline"
                    color={color}
                    size={size}
                  />
                )}
                label="Admin"
                onPress={() => props.navigation.navigate("Admin")}
              />
            )}

            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="account-outline" color={color} size={size} />
              )}
              label="Reuniones"
              onPress={() => props.navigation.navigate("Meeting")}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="account-check-outline" color={color} size={size} />
              )}
              label="Support"
              onPress={() => {
                Linking.openURL("https://github.com/yesibarros/globantProject");
              }}
            />
          </Drawer.Section>
          <Drawer.Section title="Preferences">
            <TouchableRipple
              onPress={() => {
                toggleTheme();
              }}
            >
              <View style={styles.preference}>
                <Text style={{ color: colors.text }}>Dark Theme</Text>
                <View pointerEvents="none">
                  <Switch value={isDarkTheme} />
                </View>
              </View>
            </TouchableRipple>
          </Drawer.Section>
          {user.role &&
            user.role.includes("mentor") &&
            user.role.includes("mentee") && (
              <Drawer.Section title="Cuál es tu rol hoy?">
                <TouchableRipple
                  onPress={() => {
                    toggleRole();
                  }}
                >
                  <View style={styles.preference}>
                    <Text style={{ color: colors.text }}>Mentees</Text>
                    <View pointerEvents="none">
                      <Switch value={isMentor} />
                    </View>
                    <Text style={{ color: colors.text }}>Mentor</Text>
                  </View>
                </TouchableRipple>
              </Drawer.Section>
            )}
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({ color, size }) => (
            <Icon name="exit-to-app" color={color} size={size} />
          )}
          label="Sign Out"
          onPress={handleLogout}
        />
      </Drawer.Section>
    </View>
  );
};

export default ScreenDrawer;
