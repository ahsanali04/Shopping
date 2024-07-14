import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from '../Screens/Home';
import Settings from '../Screens/Settings';
import {NavigationContainer} from '@react-navigation/native';
const Drawer = createDrawerNavigator();
import Contact from '../Screens/Contact';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const stack = createNativeStackNavigator();

const MainStackNavigator = () => {
  return (
    <stack.Navigator>
      <stack.Screen
        name="Contact"
        component={Contact}
        options={{
          headerShown: false,
        }}
      />
    </stack.Navigator>
  );
};

export {MainStackNavigator};

const styles = StyleSheet.create({});
