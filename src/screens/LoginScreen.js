import React, {useEffect} from 'react'
import { StyleSheet, ActivityIndicator, View, Image, TouchableOpacity, Text, Dimensions } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import {useTheme} from '@shopify/restyle'
import { CommonActions } from '@react-navigation/native'
import Images from '../assets/images'
import { moderateScale } from '../utils/scalingUtils';
import Colors from '../themes/colors';
import Fonts from '../assets/fonts';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-google-signin/google-signin';
import * as SpinnerRef from '../utils/SpinnerRef'

const width = Dimensions.get("screen").width
const height = Dimensions.get("screen").height

/*
LoginScreen component 
*/
const LoginScreen = ({navigation,route}) =>  {


    useEffect(() => {
        const init = () => {
            
        }
        init()
    }, []);

    const onGoogleLoginPress = () => {
        signInWithGoogle()
    }

    const signInWithGoogle = async() => {
        try {
            SpinnerRef.show()
            await GoogleSignin.hasPlayServices();
            await GoogleSignin.signIn();
            navigation.dispatch(CommonActions.reset({
                index: 1,
                routes:[{name:"HomeTabNavigator"}]
            }))
            SpinnerRef.hide()
          } catch (error) {
            SpinnerRef.hide()
            console.log(JSON.stringify(error))
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
              // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
              // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
              // play services not available or outdated
            } else {
              // some other error happened
            }
          }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <Image source={Images.login_bg_img} style={{flex:1}} resizeMode="cover"/>
            </View>
            <TouchableOpacity style={styles.loginWithGoogleBtn} onPress={onGoogleLoginPress}>
                <Image source={Images.google_logo_img} style={styles.gLogoImg}/>
                <Text style={styles.gLoginTxt}>Continue with Google</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}
export default LoginScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    loginWithGoogleBtn :{
        marginHorizontal : moderateScale(30),
        flexDirection:"row",
        height:moderateScale(45),
        borderRadius : moderateScale(8),
        alignItems:"center",
        justifyContent:"space-between",
        position : "absolute",
        marginTop : height - moderateScale(170),
        backgroundColor:"white",
        width : width - moderateScale(60),
        paddingHorizontal : moderateScale(15),
        paddingRight : moderateScale(30)
    },
    gLogoImg : {
        width : moderateScale(30),
        height : moderateScale(30),
        resizeMode : "contain"
    },
    gLoginTxt : {
        color : Colors.red,
        fontFamily : Fonts.AvenirLTStd_Heavy,
        fontSize : moderateScale(18)
    }
})