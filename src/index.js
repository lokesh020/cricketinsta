import 'react-native-gesture-handler';

import React, { useEffect } from 'react';
import { LogBox, Platform, StatusBar } from 'react-native'
import { ThemeProvider } from '@shopify/restyle'
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import NetworkLogger from 'react-native-network-logger';



import SplashScreen from 'react-native-splash-screen'
import RootNavigator from './navigators/RootNavigator';
import SpinnerLoader from './components/SpinnerLoader';
import { spinnerRef } from './utils/SpinnerRef';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

const Index = () => {

  useEffect(() => {

    const initApp = () => {
      setStatusBar()
      GoogleSignin.configure({
        scopes: ['https://www.googleapis.com/auth/userinfo.profile'], // what API you want to access on behalf of the user, default is email and profile
        webClientId: '720477655390-ij48os7e728i4c2cqe7f1omermoosu14.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
        offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
        hostedDomain: '', // specifies a hosted domain restriction
        forceCodeForRefreshToken: true,
        accountName: '', // [Android] specifies an account name on the device that should be used
      });
      if (__DEV__){
        LogBox.ignoreLogs(['Require cycle:','EventEmitter.removeListener'])
      }
    }
    
    initApp()
    
    //unmounting effect
    return ()=>{

    }

  }, []);

  const setStatusBar = () => {
    if (Platform.OS==="android") {
      StatusBar.setBackgroundColor("black")
    }else{
      StatusBar.setBarStyle("light-content")
    }
  }

  return (
    <SafeAreaProvider>
        <NavigationContainer
            onReady={() => {
              SplashScreen.hide()
            }}>
                <RootNavigator/>
                <SpinnerLoader ref = {spinnerRef}/>
          </NavigationContainer>
    </SafeAreaProvider>
  )

}



export default Index;