import React, {useState, useEffect} from 'react';
import {YellowBox} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import auth from '@react-native-firebase/auth';
import TestScreen from './screens/TestScreen';
import MainScreenController from './controller/MainScreenController';
import Authentication from './component/Authentication';

// firebase와 연동하면 항상 나오는 내용. 웹과 앱에 동시에 작용하는 언어다 보니 백엔드와 연결할 때 연결 시간에 대한 문제가 발생함.
console.ignoredYellowBox = ['Setting a timer'];
YellowBox.ignoreWarnings(['Setting a timer']);

export default function App() {
  const isTestMode = false;
  const [isApplicationReady, setIsApplicationReady] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState();

  useEffect(() => {
    getData();
  }, []);

  // application ready가 되면 splash 화면을 끈다.
  useEffect(() => {
    isApplicationReady === true ? SplashScreen.hide() : null;
  }, [isApplicationReady]);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  // application ready는 여기서 다른 작업을 처리한 뒤 바꾼다.
  const getData = () => {
    console.log('getting data...');
    setTimeout(() => {
      console.log('getting data Done!');
      setIsApplicationReady(true);
    }, 3000);
  };

  const onAuthStateChanged = user => {
    setIsAuthenticated(!!user);
    setUser(user);
  };

  return isTestMode ? (
    <TestScreen />
  ) : isAuthenticated ? (
    <MainScreenController />
  ) : (
    <Authentication />
  );
}
