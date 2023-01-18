import React, {useEffect,useState} from 'react'
import { StyleSheet, ActivityIndicator, View, Image, Text, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import {useTheme} from '@shopify/restyle'
import { CommonActions } from '@react-navigation/native'
import Images from '../assets/images'
import { moderateScale } from '../utils/scalingUtils';
import Fonts from '../assets/fonts';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Colors from '../themes/colors';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import * as SpinnerRef from '../utils/SpinnerRef'
/*
ProfileScreen component 
*/
const ProfileScreen = ({navigation,route}) =>  {

    const [name, setName] = useState("");
    const [picUri, setPicUri] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        const init = () => {
            getUserName()
        }
        init()
    }, []);

    const getUserName = async() => {
        const userInfo = await GoogleSignin.getCurrentUser()
        if (userInfo) {
            setName(userInfo.user.name)
            setPicUri(userInfo.user.photo)
            setEmail(userInfo.user.email)
        }
    }

    const onBackBtnPress = () => {
        navigation.goBack()
    }

    const onPrivacyPolicyPress = () => {
        navigation.navigate("PrivacyPolicyScreen")
    }

    const onTermsNConditionPress = () => {
        navigation.navigate("TermsNConditionScreen")
    }

    const onLogOut = async() => {
        SpinnerRef.show()
        await GoogleSignin.signOut()
        SpinnerRef.hide()
        goToLogin()
    }

    const onChooseAPlanPress = () => {
        navigation.navigate("ChoosePlanScreen")
    }

    const goToLogin = () => {
        navigation.dispatch(CommonActions.reset({
            index: 1,
            routes:[{name:"LoginScreen"}]
        }))
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <View style={{flexDirection:"row",alignItems:"center",backgroundColor:Colors.red,height:moderateScale(50),justifyContent:"center"}}>
                    <TouchableOpacity onPress={onBackBtnPress}  style={{flexDirection:"row",marginLeft:moderateScale(15),alignItems:"center"}}>
                    </TouchableOpacity>
                    <Text style={styles.txtSettings}>Settings</Text>
                </View>
                <View style={{flexDirection:"row",marginTop:moderateScale(25),marginLeft:moderateScale(20),alignItems:"center"}}>
                    <View style={{borderRadius:moderateScale(40)}}>
                        <Image source={(picUri)?{uri:picUri}:Images.dummy_img} style={{width:moderateScale(80),height:moderateScale(80),resizeMode:"cover",borderRadius:moderateScale(40)}}/>
                    </View>
                    <View style={{marginLeft:moderateScale(15),}}>
                        <Text style={styles.txtName}>{name}</Text>    
                        <Text style={styles.txtEmail} numberOfLines={1}>{email}</Text>    
                    </View>
                </View>
                <TouchableOpacity  style={[styles.btnSettingRow,{marginTop:moderateScale(40),}]}>
                    <View style={{flexDirection:"row",alignItems:"center"}}>
                        <Ionicons name = {"md-notifications-outline"} size = {moderateScale(26)} color={"black"} />
                        <Text style={styles.settingOptionTxt}>Notification</Text>
                    </View>
                    <Ionicons name = {"chevron-forward-sharp"} size = {moderateScale(26)} color={"black"} />
                </TouchableOpacity>
                <TouchableOpacity onPress={onChooseAPlanPress}  style={styles.btnSettingRow}>
                    <View style={{flexDirection:"row",alignItems:"center"}}>
                        <FontAwesome name = {"send-o"} size = {moderateScale(22)} color={"black"} />
                        <Text style={styles.settingOptionTxt}>Choose Plan</Text>
                    </View>
                    <Ionicons name = {"chevron-forward-sharp"} size = {moderateScale(26)} color={"black"} />
                </TouchableOpacity>
                <TouchableOpacity  style={styles.btnSettingRow}>
                    <View style={{flexDirection:"row",alignItems:"center"}}>
                        <Ionicons name = {"people-outline"} size = {moderateScale(26)} color={"black"} />
                        <Text style={styles.settingOptionTxt}>About Us</Text>
                    </View>
                    <Ionicons name = {"chevron-forward-sharp"} size = {moderateScale(26)} color={"black"} />
                </TouchableOpacity>
                <TouchableOpacity onPress={onPrivacyPolicyPress}  style={styles.btnSettingRow}>
                    <View style={{flexDirection:"row",alignItems:"center"}}>
                        <Ionicons name = {"md-document-outline"} size = {moderateScale(26)} color={"black"} />
                        <Text style={styles.settingOptionTxt}>Privacy</Text>
                    </View>
                    <Ionicons name = {"chevron-forward-sharp"} size = {moderateScale(26)} color={"black"} />
                </TouchableOpacity>
                <TouchableOpacity onPress={onTermsNConditionPress}  style={styles.btnSettingRow}>
                    <View style={{flexDirection:"row",alignItems:"center"}}>
                        <Ionicons name = {"md-document-outline"} size = {moderateScale(26)} color={"black"} />
                        <Text style={styles.settingOptionTxt}>Terms & condition</Text>
                    </View>
                    <Ionicons name = {"chevron-forward-sharp"} size = {moderateScale(26)} color={"black"} />
                </TouchableOpacity>
                <TouchableOpacity onPress={onLogOut}  style={styles.btnSettingRow}>
                    <View style={{flexDirection:"row",alignItems:"center"}}>
                        <Ionicons name = {"log-out-outline"} size = {moderateScale(26)} color={"black"} />
                        <Text style={styles.settingOptionTxt}>Log out</Text>
                    </View>
                    <Ionicons name = {"chevron-forward-sharp"} size = {moderateScale(26)} color={"black"} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}
export default ProfileScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    txtSettings : {
        color:"white",
        fontSize:moderateScale(20),
        fontFamily : Fonts.AvenirLTStd_Heavy,
    },
    txtName : {
        color:"black",
        fontSize:moderateScale(18),
        fontFamily : Fonts.AvenirLTStd_Heavy,
    },
    txtEmail : {
        color:"black",
        fontSize:moderateScale(16),
        fontFamily : Fonts.AvenirLTStd_Heavy,
        marginTop:moderateScale(5),
        marginRight : moderateScale(1)
    },
    btnSettingRow : {
        flexDirection:"row",
        marginHorizontal:moderateScale(25),
        alignItems:"center",
        marginTop:moderateScale(25),
        justifyContent:"space-between"
    },
    settingOptionTxt : {
        color:"black",
        fontSize:moderateScale(18),
        fontFamily : Fonts.AvenirLTStd_Medium,
        marginLeft:moderateScale(20)
    }
})