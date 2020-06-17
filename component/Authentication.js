import React from 'react';
import {StatusBar, YellowBox} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './../navigation/AuthStack';

export default () => {
  return (
    <>
      <NavigationContainer>
        <AuthStack />
      </NavigationContainer>
      <StatusBar barStyle={'light-content'} />
    </>
  );
};
