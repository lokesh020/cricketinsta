import React, {useEffect} from 'react'
import { StyleSheet, ActivityIndicator, View } from 'react-native'
import {useTheme} from '@shopify/restyle'
import { CommonActions } from '@react-navigation/native'
import { GoogleSignin } from '@react-native-google-signin/google-signin'


/*
AuthLoadingScreen component 
*/
const AuthLoadingScreen = ({navigation,route}) =>  {


    useEffect(() => {
        const init = () => {
            decideInitialRoute()
        }
        init()
    }, []);

    const decideInitialRoute = async() => {
        const isSigned = await GoogleSignin.isSignedIn()
        if (isSigned) {
            goToHomeTabNavigator()
        }else{
            goToLogin()
        }
    }

    const goToLogin = () => {
        navigation.dispatch(CommonActions.reset({
            index: 1,
            routes:[{name:"LoginScreen"}]
        }))
    }
    
    const goToHomeTabNavigator = () => {
        navigation.dispatch(CommonActions.reset({
            index: 1,
            routes:[{name:"HomeTabNavigator"}]
        }))
    }

    return (
        <View style={styles.container}>
            <ActivityIndicator style = {{width:150,height:150}} size = "large" color = {"#EC1B30"} />
        </View>
    )
}
export default AuthLoadingScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"white",
        justifyContent:"center",
        alignItems:"center"
    }
})