import React,{useState} from "react";
import {View, Text, Pressable, TextInput} from "react-native";
import Ionicons  from 'react-native-vector-icons/Ionicons';
import { StackParamList } from "../navigation/StackNavigation";
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import { ScreenLabel } from "../components/ScreenLabel";
import { StackScreenHeader } from "../components/StackScreenHeader";
import { globalStyle } from "../styles/globalStyles";
import { colors } from "../styles/colors";

type Props = NativeStackScreenProps<StackParamList>;

export const FacebookQrCreate = ({navigation}:Props) =>{
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
            <ScreenLabel screenIcon={<Ionicons name="logo-facebook" size={24} color={colors.facebookColor}/>}/>
            <View style={{...globalStyle.displayItemInCenter}}>
                <View style={{...globalStyle.displayItemInRow,marginTop:10}}>
                    <Pressable 
                    style={{
                        backgroundColor: type === "URL" ? colors.primaryColor: "transparent",
                        width:100,
                        height:40,
                        marginRight:10,
                        borderRadius:25,
                        alignItems:'center',
                        justifyContent:'center'
                    }}
                    onPress={()=> {
                        setType("URL")
                        setText("")
                        setQrData("")
                    }}
                    >
                        <Text 
                        style={{
                            color: type === "URL" ? colors.whiteColor:colors.primaryheadingColor
                        }}
                        >URL</Text>
                    </Pressable>
                    <Pressable 
                    style={{
                        backgroundColor: type === "Facebook Id" ? colors.primaryColor: "transparent",
                        width:100,
                        height:40,
                        marginRight:10,
                        borderRadius:25,
                        alignItems:'center',
                        justifyContent:'center'
                    }}
                    onPress={()=> {
                        setType("Facebook Id")
                        setText("");
                        setQrData("")
                    }}
                    >
                        <Text
                        style={{
                            color: type === "Facebook Id" ? colors.whiteColor:colors.primaryheadingColor
                        }}
                        >FacebookId</Text>
                    </Pressable>
                </View>
            </View>
            <View style={{marginTop:30, marginLeft:15, marginRight:15}}>
                <TextInput
                    placeholder={type}
                    placeholderTextColor={colors.placeHolderColor}
                    value={text}
                    onChangeText={(text)=> {
                        setText(text)
                        if(type === "Facebook Id"){
                            setQrData(`https://www.facebook.com/${text}`)
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