import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Feather from 'react-native-vector-icons/Feather'
import { MainStackNavigator } from "./Stack";
import AntDesign from 'react-native-vector-icons/AntDesign'
import Home from "../Screens/Home";
import Settings from "../Screens/Settings";
import { responsiveHeight } from "react-native-responsive-dimensions";
const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator  screenOptions={({ route }) => ({
      tabBarActiveTintColor: "#f5610a",
      tabBarInactiveTintColor: "#555",
      tabBarLabelStyle: {
        fontSize: 14,
      },
      
    })}>
      <Tab.Screen name="Home" component={Home} options={{
      tabBarLabel: 'Home',
      headerShown:false,           
      tabBarIcon: ({ color, size }) => (
        <AntDesign name="home" color={color} size={28} />
      ),
      
    }}
    />
      <Tab.Screen name="Settings" component={Settings} options={{
      tabBarLabel: 'Settings',
      headerShown:false,
      tabBarIcon: ({ color, size }) => (
        <Feather name="settings" color={color} size={28} />
      ),
    }}/>

    </Tab.Navigator>
  );
};

export default BottomTabNavigator;