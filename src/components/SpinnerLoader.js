import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { View, ActivityIndicator, StyleSheet, Dimensions, Modal } from 'react-native'
import Colors from '../themes/colors';
const width = Dimensions.get("screen").width
const height = Dimensions.get("screen").height

/*
SpinnerLoader component 
*/
const SpinnerLoader = forwardRef(({
    
},ref)=>{

    const [isLoading, setIsLoading] = useState(false);

    useImperativeHandle(ref, () => ({
        show: () => {
            setIsLoading(true) 
        },
        hide:() => {
            setIsLoading(false) 
        } 
    }));

    if (isLoading) {
        return (
            <Modal style={{flex:1}} transparent={true} animationType="fade">
                <View style={[styles.container,{height:height,width:width}]}>
                    <ActivityIndicator style={{bottom:50}}  size="large" color={Colors.red} />
                </View>
            </Modal>
        )
    }else{
        return null
    }

})

export default SpinnerLoader


const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:'rgba(0,0,0,0.1)',
    },
})