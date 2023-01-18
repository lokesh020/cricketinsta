import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import { useTheme } from '@shopify/restyle';

//Screens

import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import LoginScreen from '../screens/LoginScreen';
import HomeTabNavigator from './HomeTabNavigator';
import PrivacyPolicyScreen from '../screens/PrivacyPolicyScreen';
import TermsNConditionScreen from '../screens/TermsNConditionScreen';
import ChoosePlanScreen from '../screens/ChoosePlanScreen';


const Stack = createStackNavigator();

const RootNavigator = () => {

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}>

      <Stack.Screen name="AuthLoadingScreen" component={AuthLoadingScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="HomeTabNavigator" component={HomeTabNavigator} />
      <Stack.Screen name="PrivacyPolicyScreen" component={PrivacyPolicyScreen} />
      <Stack.Screen name="TermsNConditionScreen" component={TermsNConditionScreen} />
      <Stack.Screen name="ChoosePlanScreen" component={ChoosePlanScreen} />

    </Stack.Navigator>
  );
};

export default RootNavigator;
