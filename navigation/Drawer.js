import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Stack from './Stack';
import {Dimensions} from 'react-native';

const Drawer = createDrawerNavigator();
export default () => {
  return (
    <Drawer.Navigator
      drawerPosition={'right'}
      drawerStyle={{width: Dimensions.get('window').width / 2 + 10}}
      >
      <Drawer.Screen name="Home" component={Stack} />
    </Drawer.Navigator>
  );
};
