import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabNavigator from "./app/navigation/Tab";
import DrawerNavigator from "./app/navigation/Drawer";


const App = () => {
  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
}
export default App