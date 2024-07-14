import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {MainStackNavigator} from './Stack';
import {ContactStackNavigator} from './stack';
import BottomTabNavigator from './Tab';
import Contact from '../Screens/Contact';
const Drawer = createDrawerNavigator();
import {store} from '../redux/store';
import {Provider} from 'react-redux';
import Cart from '../Screens/Cart';

const DrawerNavigator = () => {
  return (
    <Provider store={store}>
      <Drawer.Navigator>
        <Drawer.Screen
          name="HOME"
          component={BottomTabNavigator}
          options={{
            headerShown: false,
          }}
        />
        <Drawer.Screen
          name="contact"
          component={MainStackNavigator}
          options={{
            headerShown: false,
            drawerItemStyle: {display: 'none'},
          }}
        />
        <Drawer.Screen
          name="Cart"
          component={Cart}
          options={{
            headerShown: false,
            drawerItemStyle: {display: 'none'},
          }}
        />
      </Drawer.Navigator>
    </Provider>
  );
};

export default DrawerNavigator;
