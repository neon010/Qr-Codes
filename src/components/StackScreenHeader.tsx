import React from "react"
import { View,Text,Pressable } from "react-native"
import Ionicons  from 'react-native-vector-icons/Ionicons';
import { colors } from "../styles/colors";
import { globalStyle } from "../styles/globalStyles";
import {generateQr} from "../utils/generateQr"


export const StackScreenHeader = (props:any)=>{
    return (
        <View 
        style={{
            ...globalStyle.displayItemInSpaceBetween,
            backgroundColor:colors.whiteColor,
            padding:15
        }}
        >
            <Pressable 
            style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}
            onPress={()=>props.navigation.goBack()}>
                <Ionicons name="arrow-back" size={24}/>
                <Text style={{marginLeft:10, color:colors.primaryheadingColor}}>Back</Text>
            </Pressable>
            <Pressable 
            style={{flexDirection:'row', alignItems:'center'}}
            onPress={async()=>{
                if(!props.qrData) return;
                console.log(props.qrData)
                const response = await generateQr(props.qrData);
                if(response?.error){
                    //@ts-ignore
                    setError(response?.error)
                    return;
                }
                props.navigation.navigate("SaveQrCodeSvg",{
                    //@ts-ignore
                    uri:response,
                    content:props.qrData
                })
            }}>
                <Text 
                style={{
                    marginRight:5,
                    color: !props.qrData ? colors.dangerColor:colors.primaryColor
                }}>Create</Text>
                <Ionicons 
                name="checkmark-sharp" 
                size={24}
                color={!props.qrData ? colors.dangerColor:colors.primaryColor}
                />
            </Pressable>
        </View>
    )
}