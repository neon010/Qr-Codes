import React from "react";
import {View, Text, Pressable, ScrollView, StyleSheet} from "react-native";
import { StackParamList } from "../navigation/StackNavigation";
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons  from 'react-native-vector-icons/Ionicons';


type Props = NativeStackScreenProps<StackParamList>;

const createQrCodeMethods =[
    {
        name:"TextQrCreate",
        icon:"md-text-outline",
        screenName:"Text"
    },
    {
        name:"ClipboardQrCreate",
        icon:"clipboard-outline",
        screenName:"Content from clipboard"
    },
    {
        name:"LocationQrCreate",
        icon:"location-outline",
        screenName:"Geo"
    },
    {
        name:"LinkQrCreate",
        icon:"link-outline",
        screenName:"URL"
    },
    {
        name:"EmailQrCreate",
        icon:"mail-outline",
        screenName:"Email"
    },
    {
        name:"WhatsAppQrCreate",
        icon:"logo-whatsapp",
        screenName:"WhatsApp"
    },
    {
        name:"FacebookQrCreate",
        icon:"logo-facebook",
        screenName:"Facebook"
    },
    {
        name:"YoutubeQrCreate",
        icon:"logo-youtube",
        screenName:"Youtube"
    },
    {
        name:"TwitterQrCreate",
        icon:"logo-twitter",
        screenName:"Twitter"
    }
]
    


export const CreateScreen = ({navigation}:Props) =>{

    const insets = useSafeAreaInsets();

    return (
        <ScrollView style={{marginTop:insets.top}}>
            <View style={{padding:10, marginTop:10, marginBottom:10}}>
                <Text style={{fontSize:20, color:"black"}}>Create QR Code</Text>
            </View>
            <View style={{marginLeft:10, marginRight:10, backgroundColor:"#fff", borderRadius:15}}>
                {
                    createQrCodeMethods.map((item:any)=>{
                        return (
                            <Pressable style={styles.button} key={item.name} onPress={()=>navigation.navigate(item.name)}>
                                <Ionicons name={item.icon} size={24} color="#1e293b"/>
                                <Text style={styles.text}>{item.screenName}</Text>
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
        flexDirection:"row", 
        padding:15,
        borderBottomWidth:1,
        borderBottomColor:'#ccc'
    },
    text:{
        marginLeft:30,
        color:"#1f2937"
    }
})

