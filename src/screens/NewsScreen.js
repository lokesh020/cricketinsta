import React, {useEffect, useRef, useState} from 'react'
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
import RenderHTML from 'react-native-render-html';

/*
NewsScreen component 
*/
const NewsScreen = ({navigation,route}) =>  {

    const pageNo = useRef(1)
    const pageSize = useRef(20)
    const totalRecords = useRef(0)

    const [news, setNews] = useState([]);

    useEffect(() => {
        const init = ()=>{
            newsApi()
        }
        init()
        return ()=>{
        }
    }, []);

    const newsApi = () => {
        let apiUrl = WebConstants.base_url+WebConstants.post_list+"?per_page="+pageSize.current+"&page="+pageNo.current
        WebApi.getRequest(apiUrl).then((res)=>{
            totalRecords.current = res.totalRecords
            const arr = res.data.map((e)=>{
                console.log("e._links",e._links["wp:featuredmedia"][0])
                const links = e._links["wp:featuredmedia"]
                const title = e.title.rendered.replace(/<[^>]+>/g, '')
                const content = e.content.rendered.replace(/<[^>]+>/g, '')
                return ({
                    id : e.id,
                    title : title,
                    content : content,
                    mediaIdRef : links[0].href
                })
            })
            const promises = arr.map((e)=>{
                console.log("mediaIdRef",e.mediaIdRef)
                return WebApi.getRequest(e.mediaIdRef)
            })
            Promise.all(promises).then((res)=>{
                const news = arr.map((e,i)=>{
                    const obj = {
                        ...e,
                        mediaUrl : res[i].data.media_details.sizes.thumbnail.gs_link
                    }
                    return obj
                })
                console.log("news",JSON.stringify(news))
                setNews([...news])
            })
        })
    }
    const newsLoadMoreApi = () => {
        let apiUrl = WebConstants.base_url+WebConstants.post_list+"?per_page="+pageSize.current+"&page="+pageNo.current
        WebApi.getRequest(apiUrl).then((res)=>{
            totalRecords.current = res.totalRecords
            const arr = res.data.map((e)=>{
                console.log("e._links",e._links["wp:featuredmedia"][0])
                const links = e._links["wp:featuredmedia"]
                const title = e.title.rendered.replace(/<[^>]+>/g, '')
                const content = e.content.rendered.replace(/<[^>]+>/g, '')
                return ({
                    id : e.id,
                    title : title,
                    content : content,
                    mediaIdRef : links[0].href
                })
            })
            const promises = arr.map((e)=>{
                console.log("mediaIdRef",e.mediaIdRef)
                return WebApi.getRequest(e.mediaIdRef)
            })
            Promise.all(promises).then((res)=>{
                const serverData = arr.map((e,i)=>{
                    const obj = {
                        ...e,
                        mediaUrl : res[i].data.media_details.sizes.thumbnail.gs_link
                    }
                    return obj
                })
                console.log("news",JSON.stringify(news))
                setNews([...news,...serverData])
            })
        })
    }

    const onLoadMoreNews = () => {
        pageNo.current = pageNo.current + 1;
        const MAX_PAGE_NO = Math.ceil(totalRecords.current / pageSize.current);
        if (pageNo.current<=MAX_PAGE_NO) {
            newsLoadMoreApi()
        }
    }

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
                    renderItem={renderNews}
                    onEndReached={onLoadMoreNews}/>
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
                <Image source={{uri : item.mediaUrl}} style={styles.newsImg}/>
            </View>
            <View style={{marginHorizontal:5,justifyContent:"center"}}>
                <Text style={styles.newsTitle} numberOfLines={2}>{item.title}</Text>
                <Text style={styles.newsDesc} numberOfLines={2}>{item.content}</Text>
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