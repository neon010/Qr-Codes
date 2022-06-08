import React from "react";
import {View, Text, Pressable, ScrollView, StyleSheet} from "react-native";
import { StackParamList } from "../navigation/StackNavigation";
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons  from 'react-native-vector-icons/Ionicons';
import { colors } from "../styles/colors";
import { globalStyle } from "../styles/globalStyles";



type Props = NativeStackScreenProps<StackParamList>;

const createQrCodeMethods =[
    {
        name:"TextQrCreate",
        icon:"md-text-outline",
        screenName:"Text",
        Color:colors.textIconColor
    },
    {
        name:"ClipboardQrCreate",
        icon:"clipboard-outline",
        screenName:"Content from clipboard",
        Color:colors.clipboardIconColor
    },
    {
        name:"LinkQrCreate",
        icon:"link-outline",
        screenName:"URL",
        Color:colors.linkIconColor
    },
    {
        name:"EmailQrCreate",
        icon:"mail-outline",
        screenName:"Email",
        Color:colors.emailIconColor
    },
    {
        name:"WhatsAppQrCreate",
        icon:"logo-whatsapp",
        screenName:"WhatsApp",
        Color:colors.whatsAppColor
    },
    {
        name:"FacebookQrCreate",
        icon:"logo-facebook",
        screenName:"Facebook",
        Color:colors.facebookColor
    },
    {
        name:"YoutubeQrCreate",
        icon:"logo-youtube",
        screenName:"Youtube",
        Color:colors.youtubeColor
    },
    {
        name:"TwitterQrCreate",
        icon:"logo-twitter",
        screenName:"Twitter",
        Color:colors.twitterColor
    }
]
    


export const CreateScreen = ({navigation}:Props) =>{

    const insets = useSafeAreaInsets();

    return (
        <ScrollView style={{marginTop:insets.top}}>
            <View style={{padding:16,marginBottom:10, backgroundColor:"#fff"}}>
                <Text style={globalStyle.primaryTextStyle}>Create QR Code</Text>
            </View>
            <View style={{backgroundColor:"#fff"}}>
                {
                    createQrCodeMethods.map((item:any)=>{
                        return (
                            <Pressable style={styles.button} key={item.name} onPress={()=>navigation.navigate(item.name)}>
                                <Ionicons name={item.icon} size={24} color={item.Color}/>
                                <Text style={{...globalStyle.primaryTextStyle,marginLeft:20}}>{item.screenName}</Text>
                            </Pressable>
                        )
                    })
                }
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    button:{
        ...globalStyle.displayItemInRow,
        padding:12,
        borderBottomWidth:StyleSheet.hairlineWidth,
        borderBottomColor:'#ccc',
    },
    text:{
        marginLeft:20,
        color:"#1f2937"
    }
})

