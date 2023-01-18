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
ChoosePlanScreen component 
*/
const ChoosePlanScreen = ({navigation,route}) =>  {


    useEffect(() => {
        const init = () => {
        }
        init()
    }, []);

    const onBackBtnPress = () => {
        navigation.goBack()
    }

    const onBuyNowBtnPress = () => {
        
    }

    return (
        <SafeAreaView style={styles.container}>
                <View style={{flexDirection:"row",alignItems:"center",width:"100%",justifyContent:"space-between",height:moderateScale(50),backgroundColor:Colors.red}}>
                    <TouchableOpacity onPress={onBackBtnPress}  style={{flexDirection:"row",marginLeft:moderateScale(15),alignItems:"center",}}>
                        <Ionicons name = {"chevron-back-sharp"} size = {moderateScale(30)} color={"white"} />
                    </TouchableOpacity>
                    <Text style={styles.txtHeader}>Plan</Text>
                    <View style={{width:moderateScale(60)}}></View>
                </View>
                <View style={{flex:1}}>
                    <Text style={styles.txtSubHeader}>Choose a Plan</Text> 
                    <View style={{marginHorizontal:moderateScale(40),borderWidth:1,borderColor:Colors.red,marginTop:moderateScale(30),height:moderateScale(210),borderRadius:moderateScale(15)}}>
                        <Text style={styles.txtPlanName}>Cricket lovers</Text> 
                        <Text style={styles.txtPlanPrice}>$10 only</Text> 
                        <Text style={styles.txtPlanDesc}>It will provide you cricket news on your finger tips</Text> 
                        <TouchableOpacity style={styles.buyNowBtn} onPress={onBuyNowBtnPress}>
                            <Text style={styles.buyNowTxt}>Buy Now</Text>
                        </TouchableOpacity>
                    </View>
                </View>
        </SafeAreaView>
    )
}
export default ChoosePlanScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    txtHeader : {
        color:"white",
        fontSize:moderateScale(18),
        fontFamily : Fonts.AvenirLTStd_Heavy,
    },
    txtSubHeader : {
        color:"black",
        fontSize:moderateScale(20),
        fontFamily : Fonts.AvenirLTStd_Black,
        marginTop:moderateScale(40),
        alignSelf:"center"
    },
    txtPlanName : {
        color:Colors.red,
        fontSize:moderateScale(18),
        fontFamily : Fonts.AvenirLTStd_Black,
        marginTop:moderateScale(20),
        alignSelf:"center"
    },
    txtPlanPrice : {
        color:"black",
        fontSize:moderateScale(15),
        fontFamily : Fonts.AvenirLTStd_Medium,
        marginTop:moderateScale(15),
        alignSelf:"center"
    },
    txtPlanDesc : {
        color:"black",
        fontSize:moderateScale(15),
        fontFamily : Fonts.AvenirLTStd_Medium,
        marginTop:moderateScale(20),
        marginHorizontal:moderateScale(10),
        textAlign:"center"
    },
    buyNowBtn :{
        width : moderateScale(100),
        height:moderateScale(40),
        borderRadius : moderateScale(20),
        alignItems:"center",
        justifyContent:"center",
        marginTop : moderateScale(20),
        backgroundColor:Colors.red,
        alignSelf:"center"
    },
    buyNowTxt : {
        color : "white",
        fontFamily : Fonts.AvenirLTStd_Medium,
        fontSize : moderateScale(18)
    }
})