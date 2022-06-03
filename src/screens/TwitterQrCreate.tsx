import React,{useState} from "react";
import {View, Text, Pressable, TextInput} from "react-native";
import Ionicons  from 'react-native-vector-icons/Ionicons';
import { StackParamList } from "../navigation/StackNavigation";
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {generateQr} from "../utils/generateQr"
import { ScreenLabel } from "../components/ScreenLabel";
import { StackScreenHeader } from "../components/StackScreenHeader";
import { globalStyle } from "../styles/globalStyles";



type Props = NativeStackScreenProps<StackParamList>;

export const TwitterQrCreate = ({navigation}:Props) =>{
    const [text, setText] = useState("");
    const [error,setError] = useState<any>("");
    const [qrData, setQrData] = useState("")

    const [type, setType] = useState("URL")


    return (
        <View>
            <StackScreenHeader
                navigation={navigation}
                qrData={qrData}
            />
            <ScreenLabel screenIcon={<Ionicons name="logo-twitter" size={24} color="#00acee"/>}/>
            <View style={{...globalStyle.displayItemInCenter}}>
                <View style={{...globalStyle.displayItemInRow}}>
                    <Pressable 
                    style={{
                        padding:15, 
                        backgroundColor: type === "URL" ? "green": "transparent"
                    }}
                    onPress={()=> {
                        setType("URL")
                        setText("")
                        setQrData("")
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
                        padding:15, 
                        backgroundColor: type === "userName" ? "green": "transparent"
                    }}
                    onPress={()=> {
                        setType("userName")
                        setText("")
                        setQrData("")
                    }}
                    >
                        <Text
                        style={{
                            color: type === "userName" ? "#fff":"#000"
                        }}
                        >UserName</Text>
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
                        if(type === "userName"){
                            setQrData(`https://twitter.com/${text}`)
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