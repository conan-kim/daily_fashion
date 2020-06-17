import React, {useState, useEffect} from 'react';
import {ActivityIndicator} from 'react-native';
import auth from '@react-native-firebase/auth';
import { NavigationContainer } from '@react-navigation/native';
import {userUtils, userProfileApi} from '../utils/api';
import GetNewUserDataScreen from '../screens/others/GetNewUserDataScreen';
import Drawer from '../navigation/Drawer';
import Stack from '../navigation/Stack';

export default () => {
  const user = auth().currentUser;
  const [isLoading, setIsLoading] = useState(true);
  const [isNewUser, setIsNewUser] = useState(false);

  useEffect(() => {
    getData();
  }, [isNewUser]);

  const getData = async () => {
    const isFirstLogin = await userUtils.isNewUser();
    setIsNewUser(isFirstLogin);
    if (isFirstLogin === true) {
      userProfileApi.createUserProfile(user);
    }
    setIsLoading(false);
  };

  return isLoading ? (
    <ActivityIndicator style={{flex: 1}} size="large" />
  ) : isNewUser ? (
    <GetNewUserDataScreen setIsNewUser={setIsNewUser} />
  ) : (
    <NavigationContainer>
        <Stack />
    </NavigationContainer>
  );
};
