import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import { useTheme } from '@shopify/restyle';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
//Screens

import { moderateScale, moderateVerticalScale } from '../utils/scalingUtils';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import Colors from '../themes/colors';
import NewsScreen from '../screens/NewsScreen';


const Tab = createBottomTabNavigator();

const HomeTabNavigator = () => {

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size, focused}) => (
          <TabBarIcon
            color={color}
            size={moderateVerticalScale(size,0.8)}
            focused={focused}
            routeName={route.name}
          />
        ),
        tabBarShowLabel: false,
        tabBarStyle: {
          height:moderateScale(65),
        },
        headerShown:false,
        gestureEnabled: false,
      })}>
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
      <Tab.Screen name="NewsScreen" component={NewsScreen} />
      <Tab.Screen name="ProfileScreen" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const TabBarIcon = (props) => {
  let color = "";
  let iconName = ""
  if (props.routeName == 'HomeScreen') {
    iconName = "live-tv"
    color = props.focused
      ? Colors.red
      : Colors.grey
    return (
      <MaterialIcons name = {iconName} size = {moderateScale(30)} color={color} />
    );
  } else if (props.routeName == 'NewsScreen') {
    iconName = "newspaper-outline"
    color = props.focused
      ? Colors.red
      : Colors.grey
    return (
      <Ionicons name = {iconName} size = {moderateScale(30)} color={color} />
    );
  } else if (props.routeName == 'ProfileScreen') {
    iconName = "user"
    color = props.focused
      ? Colors.red
      : Colors.grey
    return (
      <FeatherIcon name = {iconName} size = {moderateScale(30)} color={color} />
    );
  }
};

export default HomeTabNavigator;
