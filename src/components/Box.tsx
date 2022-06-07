import React, { useEffect, useState } from 'react';
import {View,Animated,Easing,StyleSheet} from 'react-native';
import { colors } from '../styles/colors';


export const Box = () =>{
    const [animatedValue, setAnimatedValue] = useState(new Animated.Value(0));

    const animate = () =>{
     animatedValue.setValue(0)
     Animated.timing(animatedValue,{
         toValue: 1,
         duration: 5000,
         easing: Easing.linear,
         useNativeDriver:false
       }
     ).start(() => animate())
   }
  
    useEffect(()=>{
     animate()
    },[])
 
    const marginTop = animatedValue.interpolate({
     inputRange: [0, 1],
     outputRange: [-20, 180]
   })
    return (
        <View style={{width:220, height:220, borderWidth:StyleSheet.hairlineWidth, borderColor:colors.primaryColor}}>
            <View style={{width:25, height:5, backgroundColor:colors.dangerColor, transform:[{translateY:-5}]}}></View>
            <View style={{width:25, height:5, backgroundColor:colors.dangerColor, transform:[{translateX:-14},{translateY:0},{rotateZ:"90deg"}]}}></View>

            <View style={{width:25, height:5, backgroundColor:colors.dangerColor, transform:[{translateX:195},{translateY:-15}]}}></View>
            <View style={{width:25, height:5, backgroundColor:colors.dangerColor, transform:[{translateX:209},{translateY:-10},{rotateZ:"90deg"}]}}></View>

            <View style={{width:25, height:5, backgroundColor:colors.dangerColor, transform:[{translateX:0},{translateY:199}]}}></View>
            <View style={{width:25, height:5, backgroundColor:colors.dangerColor, transform:[{translateX:-15},{translateY:184},{rotateZ:"90deg"}]}}></View>

            <View style={{width:25, height:5, backgroundColor:colors.dangerColor, transform:[{translateX:195},{translateY:190}]}}></View>
            <View style={{width:25, height:5, backgroundColor:colors.dangerColor, transform:[{translateX:209},{translateY:175},{rotateZ:"90deg"}]}}></View>
            <Animated.View
                style={{height:1, marginTop, backgroundColor:'#fff'}}
            >
            </Animated.View>
        </View>
    )
}