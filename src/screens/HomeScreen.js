import React, {useEffect, useState} from 'react'
import { StyleSheet, ActivityIndicator, View, Image, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import {useTheme} from '@shopify/restyle'
import { CommonActions } from '@react-navigation/native'
import Images from '../assets/images'
import { moderateScale } from '../utils/scalingUtils';
import Fonts from '../assets/fonts';
import Colors from '../themes/colors';
import WebApi from '../utils/WebApi';
import WebConstants from '../utils/WebConstants';
import Constants from '../utils/constants';

/*
HomeScreen component 
*/
const HomeScreen = ({navigation,route}) =>  {

    const [liveMatchState, setLiveMatchState] = useState(null);

    useEffect(() => {
        getTodayLiveMatchAPI()
        const interval = setInterval(() => {
            getTodayLiveMatchAPI()
        }, 5000);
        return ()=>{
            clearInterval(interval)
        }
    }, []);

    const getTodayLiveMatchAPI = () => {
        const apiUrl = WebConstants.match_list + "?status=3&token=" + Constants.match_api_token + "&per_page1&&paged=1"
        WebApi.getRequest(apiUrl).then((res)=>{
            if (res.data.response.items.length > 0) {
                const match = res.data.response.items[0]
                setLiveMatchState(match)
            }
        })
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
              {(liveMatchState) &&  <View style= {{width:"100%",height:moderateScale(200),backgroundColor:Colors.red,borderBottomLeftRadius:50,borderBottomRightRadius:50}}>
                    <Text style={styles.txt}>Today's Matches</Text>
                    <View style = {{marginHorizontal: moderateScale(20),borderRadius:16,backgroundColor:"white",height:moderateScale(100),marginTop:moderateScale(25),flexDirection:"row",paddingHorizontal:20,justifyContent:"space-between"}}>
                        <View style={{flex:0.4,justifyContent:"center"}}>
                            <View style={{flexDirection:"row"}}>
                                <Image 
                                        style={{width:50,height:50,resizeMode:"cover"}}  
                                        source={{uri:liveMatchState.teama.logo_url}}/>
                                <View style={{marginLeft:5}}>
                                    <Text style={styles.teamName}>{liveMatchState.teama.short_name}</Text>  
                                    <Text style={styles.teamScore}>{liveMatchState.teama.scores}</Text>  
                                </View>
                            </View>
                            <View style={{marginTop:10}}>
                                <Text style={styles.teamOvers}>{liveMatchState.teama.overs} overs</Text>         
                            </View>
                        </View>
                        <View style={{flex:0.4,justifyContent:"center"}}>
                            <View style={{flexDirection:"row"}}>
                                    <Image 
                                        style={{width:50,height:50,resizeMode:"cover"}}  
                                        source={{uri:liveMatchState.teamb.logo_url}}/>
                                    <View style={{marginLeft:10}}>
                                        <Text style={styles.teamName}>{liveMatchState.teamb.short_name}</Text>  
                                        <Text style={styles.teamScore}>{liveMatchState.teamb.scores}</Text>  
                                    </View>
                            </View>
                            <View style={{marginTop:10}}>
                            <Text style={styles.teamOvers}>{liveMatchState.teamb.overs} overs</Text>         
                            </View>
                        </View>
                    </View>
                </View>}
            </View>
        </SafeAreaView>
    )
}
export default HomeScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    txt : {
        color:"black",
        fontSize:moderateScale(18),
        fontFamily : Fonts.AvenirLTStd_Heavy,
        marginTop: moderateScale(30),
        marginLeft: moderateScale(20)
    },
    teamName : {
        color:"black",
        fontSize:moderateScale(14),
        fontFamily : Fonts.AvenirLTStd_Medium,
    },
    teamScore : {
        color:"black",
        fontSize:moderateScale(16),
        fontFamily : Fonts.AvenirLTStd_Heavy,
    },
    teamOvers : {
        color:"black",
        fontSize:moderateScale(12),
        fontFamily : Fonts.AvenirLTStd_Book,
    }
})