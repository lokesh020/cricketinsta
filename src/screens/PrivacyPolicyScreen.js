import React, {useEffect} from 'react'
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
import WebView from 'react-native-webview';
import Constants from '../utils/constants';
import * as SpinnerRef from '../utils/SpinnerRef'
/*
PrivacyPolicyScreen component 
*/
const PrivacyPolicyScreen = ({navigation,route}) =>  {


    useEffect(() => {
        const init = () => {
            SpinnerRef.show()
        }
        init()
    }, []);

    const onBackBtnPress = () => {
        navigation.goBack()
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <View style={{flexDirection:"row",alignItems:"center",width:"100%",justifyContent:"space-between",height:moderateScale(50),backgroundColor:Colors.red}}>
                    <TouchableOpacity onPress={onBackBtnPress}  style={{flexDirection:"row",marginLeft:moderateScale(15),alignItems:"center",}}>
                        <Ionicons name = {"chevron-back-sharp"} size = {moderateScale(30)} color={"white"} />
                    </TouchableOpacity>
                    <Text style={styles.txtHeader}>Privacy Policy</Text>
                    <View style={{width:moderateScale(40)}}></View>
                </View>
                <WebView 
                    source={{ uri: Constants.privacy_policy_url }}
                    onLoadEnd={()=>{SpinnerRef.hide()}}/>
            </View>
        </SafeAreaView>
    )
}
export default PrivacyPolicyScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    txtHeader : {
        color:"white",
        fontSize:moderateScale(18),
        fontFamily : Fonts.AvenirLTStd_Heavy,
    },
    txtName : {
        color:"black",
        fontSize:moderateScale(18),
        fontFamily : Fonts.AvenirLTStd_Heavy,
    },
    txtEmail : {
        color:"black",
        fontSize:moderateScale(18),
        fontFamily : Fonts.AvenirLTStd_Heavy,
        marginTop:moderateScale(5)
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
        fontFamily : Fonts.AvenirLTStd_Heavy,
        marginLeft:moderateScale(20)
    }
})