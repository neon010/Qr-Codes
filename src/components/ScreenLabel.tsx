import React from "react"
import { View,Text } from "react-native"
import { globalStyle } from "../styles/globalStyles"

export const ScreenLabel = (props:any)=>{
    return (
    <View style={{justifyContent:'center', alignItems:'center'}}>
        <View 
        style={{
            ...globalStyle.displayItemInCenter,
            padding:20, 
            borderRadius:10, 
            marginTop:35,
            backgroundColor:"#cffafe" 
        }}
        >
            {props.screenIcon}
        </View>
    </View>
    )
}