import React, {useLayoutEffect} from 'react';
import {TouchableOpacity, Platform, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';
import Discovery from '../screens/MainScreens/Discovery';
import MyInfo from '../screens/MainScreens/MyInfo';

const Tabs = createBottomTabNavigator();

const getHeaderName = props =>
  props?.route?.state?.routeNames[props.route.state.index] || 'Discovery';

export default props => {
  const _onAlarmPress = () => {};
  const _onLogOutPress = () => {
    auth().signOut();
  };
  useLayoutEffect(() => {
    props.navigation.setOptions({
      title: getHeaderName(props),
      headerRight: () => {
        if (getHeaderName(props) === 'MyInfo') {
          return (
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity style={{padding: 15}} onPress={_onAlarmPress}>
                <Icon
                  name={
                    Platform.OS === 'ios'
                      ? 'ios-notifications-outline'
                      : 'md-notifications-outline'
                  }
                  color="grey"
                  size={25}
                />
              </TouchableOpacity>
              <TouchableOpacity style={{padding: 15}} onPress={_onLogOutPress}>
                <Icon
                  name={Platform.OS === 'ios' ? 'ios-log-out' : 'md-log-out'}
                  color="grey"
                  size={25}
                />
              </TouchableOpacity>
            </View>
          );
        }
      },
    });
  });
  return (
    <Tabs.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: props => {
          //   console.log("hi", props);
          let iconName = Platform.OS === 'ios' ? 'ios-' : 'md-';
          if (route.name === 'Discovery') {
            iconName += props.focused ? 'heart' : 'heart-empty';
          } else if (route.name === 'MyInfo') {
            iconName += 'person';
          } else {
            iconName += 'checkmark';
          }
          return (
            <Icon
              name={iconName}
              size={24}
              color={props.focused ? 'black' : 'grey'}
            />
          );
        },
        tabBarLabel: () => null,
      })}
      tabBarOptions={{
        // 탭 아이콘의 기본 색을 정하는 것
        activeTintColor: 'black',
        inactiveTintColor: 'grey',
      }}>
      <Tabs.Screen name="Discovery" component={Discovery} />
      <Tabs.Screen name="MyInfo" component={MyInfo} />
    </Tabs.Navigator>
  );
};
