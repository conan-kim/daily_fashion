import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Tabs from './Tabs'
import ImageDetailScreen from '../screens/others/ImageDetailScreen';
import ImageUploadScreen from '../screens/others/ImageUploadScreen';
import ProfileEditScreen from '../screens/others/ProfileEditScreen';

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={Tabs} />
    <Stack.Screen name="Image Detail" component={ImageDetailScreen} />
    <Stack.Screen name="Upload Image" component={ImageUploadScreen} />
    <Stack.Screen name="Profile Edit" component={ProfileEditScreen} />
  </Stack.Navigator>
);