import React,{useState} from "react";
import {View, Text, Pressable, TextInput} from "react-native";
import Ionicons  from 'react-native-vector-icons/Ionicons';
import { StackParamList } from "../navigation/StackNavigation";
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import { ScreenLabel } from "../components/ScreenLabel";
import { StackScreenHeader } from "../components/StackScreenHeader";
import { globalStyle } from "../styles/globalStyles";



type Props = NativeStackScreenProps<StackParamList>;

export const YoutubeQrCreate = ({navigation}:Props) =>{
    const [text, setText] = useState("");
    const [qrData, setQrData] = useState("")
    const [type, setType] = useState("URL")

    return (
        <View>
            <StackScreenHeader
                navigation={navigation}
                qrData={qrData}
            />
            <ScreenLabel screenIcon={<Ionicons name="logo-youtube" size={24} color="#FF0000"/>}/>
            <View style={{...globalStyle.displayItemInCenter, marginTop:15}}>
                <View style={{...globalStyle.displayItemInRow,borderWidth:1, borderColor:"green",borderRadius:20,}}>
                    <Pressable 
                    style={{
                        width:70, 
                        height:35,
                        padding:10,
                        justifyContent:'center',
                        alignItems:'center',
                        backgroundColor: type === "URL" ? "green": "transparent",
                        borderRadius:20,
                        borderColor:'green'
                    }}
                    onPress={()=> {
                        setType("URL");
                        setQrData("");
                        setText("");
                    }}
                    >
                        <Text 
                        style={{
                            color: type === "URL" ? "#fff":"#000"
                        }}
                        >URL</Text>
                    </Pressable>
                    <Pressable 
                    style={{
                        width:70, 
                        height:35,
                        padding:10,
                        justifyContent:'center',
                        alignItems:'center',
                        backgroundColor: type === "videoId" ? "green": "transparent",
                        borderRadius:20,
                        borderColor:'green'
                    }}
                    onPress={()=> {
                        setType("videoId")
                        setQrData("")
                        setText("")
                    }}
                    >
                        <Text
                        style={{
                            color: type === "videoId" ? "#fff":"#000"
                        }}
                        >Video ID</Text>
                    </Pressable>
                    <Pressable 
                    style={{
                        width:90, 
                        height:35,
                        justifyContent:'center',
                        alignItems:'center',
                        backgroundColor: type === "channelName" ? "green": "transparent",
                        borderRadius:20,
                        borderColor:'green'
                    }}
                    onPress={()=> {
                        setType("channelName")
                        setText("")
                        setText("")
                    }}>
                        <Text
                        style={{
                            color: type === "channelName" ? "#fff":"#000"
                        }}
                        >Channel Id</Text>
                    </Pressable>
                </View>
            </View>
            <View style={{marginTop:30, marginLeft:15, marginRight:15}}>
                <TextInput
                    placeholder={type}
                    placeholderTextColor="grey"
                    value={text}
                    onChangeText={(text)=> {
                        setText(text)
                        if(type === "videoId"){
                            setQrData(`https://www.youtube.com/watch?v=${text}`)
                        }else if(type === "channelName"){
                            setQrData(`https://www.youtube.com/channel/${text}`)
                        }else{
                            setQrData(text)
                        }
                    }}
                    style={{
                        ...globalStyle.textInput
                    }}
                />
            </View>
        </View>
    )
}