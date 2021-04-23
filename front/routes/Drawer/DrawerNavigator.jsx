//REACT
import React from "react";

//REACT-NAVIGATION
import { createDrawerNavigator } from "@react-navigation/drawer";

//SCREENS
import TabBarNavigator from "../Tab/TabNavigator";
import ScreenDrawer from "./ScreenDrawer";
import Requests from "../../screens/Requests/Requests";
import Mentor from "../../screens/Mentor/Mentor";
import Notifications from "../../screens/Notifications/Notifications";
import Admin from "../../screens/Admin/Admin";
import SingleUser from "../../screens/SingleUser/SingleUser";
import Search from "../../screens/Match/Search";
import Progress from "../../screens/Progress/Progress";
import Meeting from "../../screens/Meeting/Meeting";
import Header from "../../screens/header/Header";
import MatchComparison from "../../screens/Matchs/MatchComparison";

const Drawer = createDrawerNavigator();

export default function MyTabs() {
  return (
    <Drawer.Navigator drawerContent={(props) => <ScreenDrawer {...props} />}>
      <Drawer.Screen name="TabBarNavigator" component={TabBarNavigator} />
      <Drawer.Screen name="SingleUser" component={SingleUser} />
      <Drawer.Screen name="Solicitudes" component={Requests} />
      <Drawer.Screen name="Mentor" component={Mentor} />
      <Drawer.Screen name="Notificaciones" component={Notifications} />
      <Drawer.Screen name="Admin" component={Admin} />
      <Drawer.Screen name="SearchMatch" component={Search} />
      <Drawer.Screen name="Progreso" component={Progress} />
      <Drawer.Screen name="Meeting" component={Meeting} />
      <Drawer.Screen name="Header" component={Header} />
      <Drawer.Screen name="Requests" component={Requests} />
      <Drawer.Screen name="MatchComparison" component={MatchComparison} />
    </Drawer.Navigator>
  );
}
