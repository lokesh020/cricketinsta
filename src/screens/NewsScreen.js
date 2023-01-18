import React, {useEffect, useState} from 'react'
import { StyleSheet, ActivityIndicator, View, Image, Text, FlatList } from 'react-native'
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
NewsScreen component 
*/
const NewsScreen = ({navigation,route}) =>  {

    const [news, setNews] = useState([
        {
            title : "Relief to see Dhananjaya among the runs: Naveed Nawaz",
            description : "Sri Lanka assistant coach reckoned the team will go into the England game with a positive outlook as they remain alive in the T20 World Cup",
            image : Image.resolveAssetSource(Images.news_img).uri
        },
        {
            title : "Grappling KL Rahul has leadership group's unequivocal backing",
            description : "I think in Rohit's and my mind, there's absolutely no doubt about who's going to open for us",
            image : Image.resolveAssetSource(Images.news_img).uri
        },
        {
            title : "No overhaul but WC showing to determine changes to selection committee",
            description : "With a new dispensation in the BCCI in place, there is always this thinking to have a fresh start but the board will have little choice if the Indian team does well in the World Cup",
            image : Image.resolveAssetSource(Images.news_img).uri
        },
        {
            title : "No overhaul but WC showing to determine changes to selection committee",
            description : "With a new dispensation in the BCCI in place, there is always this thinking to have a fresh start but the board will have little choice if the Indian team does well in the World Cup",
            image : Image.resolveAssetSource(Images.news_img).uri
        },
        {
            title : "No overhaul but WC showing to determine changes to selection committee",
            description : "With a new dispensation in the BCCI in place, there is always this thinking to have a fresh start but the board will have little choice if the Indian team does well in the World Cup",
            image : Image.resolveAssetSource(Images.news_img).uri
        },
        {
            title : "No overhaul but WC showing to determine changes to selection committee",
            description : "With a new dispensation in the BCCI in place, there is always this thinking to have a fresh start but the board will have little choice if the Indian team does well in the World Cup",
            image : Image.resolveAssetSource(Images.news_img).uri
        },
        {
            title : "No overhaul but WC showing to determine changes to selection committee",
            description : "With a new dispensation in the BCCI in place, there is always this thinking to have a fresh start but the board will have little choice if the Indian team does well in the World Cup",
            image : Image.resolveAssetSource(Images.news_img).uri
        },
    ]);

    useEffect(() => {
        return ()=>{
        }
    }, []);

    const renderNews = ({item,index}) => {
        return (
            <NewsItem
                item={item}
                index={index}/>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <Text style={styles.txt}>News</Text>
                <FlatList
                    data={news}
                    renderItem={renderNews}/>
            </View>
        </SafeAreaView>
    )
}

export default NewsScreen

const NewsItem = ({
    item,
    index
}) => {
    return (
        <View style={styles.newsItem}>
            <View style={{width:moderateScale(100)}}>
                <Image source={{uri : item.image}} style={styles.newsImg}/>
            </View>
            <View style={{marginHorizontal:5,justifyContent:"center"}}>
                <Text style={styles.newsTitle} numberOfLines={2}>{item.title}</Text>
                <Text style={styles.newsDesc} numberOfLines={2}>{item.description}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    txt : {
        color:"black",
        fontSize:moderateScale(22),
        fontFamily : Fonts.AvenirLTStd_Heavy,
        marginTop: moderateScale(20),
        marginLeft: moderateScale(20)
    },
    newsItem : {
        marginHorizontal: moderateScale(25),
        marginTop : moderateScale(25),
        borderRadius : moderateScale(8),
        borderWidth : StyleSheet.hairlineWidth,
        borderColor : Colors.red,
        flexDirection:"row"
    },
    newsImg : {
        width:moderateScale(100),
        height : moderateScale(100),
        resizeMode : "cover"
    },
    newsTitle : {
        color:"black",
        fontSize:moderateScale(16),
        fontFamily : Fonts.AvenirLTStd_Heavy,
        width: moderateScale(190),
        marginBottom : moderateScale(10)
    },
    newsDesc : {
        color:"black",
        fontSize:moderateScale(13),
        fontFamily : Fonts.AvenirLTStd_Light,
        width: moderateScale(190)
    }
})