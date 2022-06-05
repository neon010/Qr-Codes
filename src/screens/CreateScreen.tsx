import React from "react";
import {View, Text, Pressable, ScrollView, StyleSheet} from "react-native";
import { StackParamList } from "../navigation/StackNavigation";
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons  from 'react-native-vector-icons/Ionicons';
import { Colors } from "react-native/Libraries/NewAppScreen";


type Props = NativeStackScreenProps<StackParamList>;

const createQrCodeMethods =[
    {
        name:"TextQrCreate",
        icon:"md-text-outline",
        screenName:"Text",
        Color:"#d946ef"
    },
    {
        name:"ClipboardQrCreate",
        icon:"clipboard-outline",
        screenName:"Content from clipboard",
        Color:"#3b82f6"
    },
    {
        name:"LinkQrCreate",
        icon:"link-outline",
        screenName:"URL",
        Color:"#84cc16"
    },
    {
        name:"EmailQrCreate",
        icon:"mail-outline",
        screenName:"Email",
        Color:"cyan"
    },
    {
        name:"WhatsAppQrCreate",
        icon:"logo-whatsapp",
        screenName:"WhatsApp",
        Color:"#25D366"
    },
    {
        name:"FacebookQrCreate",
        icon:"logo-facebook",
        screenName:"Facebook",
        Color:"#4267B2"
    },
    {
        name:"YoutubeQrCreate",
        icon:"logo-youtube",
        screenName:"Youtube",
        Color:"#FF0000"
    },
    {
        name:"TwitterQrCreate",
        icon:"logo-twitter",
        screenName:"Twitter",
        Color:"#00acee"
    }
]
    


export const CreateScreen = ({navigation}:Props) =>{

    const insets = useSafeAreaInsets();

    return (
        <ScrollView style={{marginTop:insets.top}}>
            <View style={{padding:10,marginBottom:10, backgroundColor:"#fff"}}>
                <Text style={{fontSize:20, color:"black"}}>Create QR Code</Text>
            </View>
            <View style={{backgroundColor:"#fff"}}>
                {
                    createQrCodeMethods.map((item:any)=>{
                        return (
                            <Pressable style={styles.button} key={item.name} onPress={()=>navigation.navigate(item.name)}>
                                <Ionicons name={item.icon} size={24} color={item.Color}/>
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
        padding:12,
        borderBottomWidth:StyleSheet.hairlineWidth,
        borderBottomColor:'#ccc'
    },
    text:{
        marginLeft:20,
        color:"#1f2937"
    }
})

