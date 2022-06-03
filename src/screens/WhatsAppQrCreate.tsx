import React,{useState,useRef} from "react";
import {View, Text, Pressable, TextInput} from "react-native";
import Ionicons  from 'react-native-vector-icons/Ionicons';
import { StackParamList } from "../navigation/StackNavigation";
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import { ScreenLabel } from "../components/ScreenLabel";
import { StackScreenHeader } from "../components/StackScreenHeader";
import { globalStyle } from "../styles/globalStyles";
import PhoneInput from "react-native-phone-number-input";


type Props = NativeStackScreenProps<StackParamList>;

export const WhatsAppQrCreate = ({navigation}:Props) =>{
    const [value, setValue] = useState("");
    const [formattedValue, setFormattedValue] = useState("");

    const phoneInput = useRef<PhoneInput>(null);
    const [qrData, setQrData] = useState("")


    console.log({formattedValue})

    return (
        <View>
            <StackScreenHeader
                navigation={navigation}
                qrData={phoneInput.current?.isValidNumber(value) && value}
            />
            <ScreenLabel screenIcon={<Ionicons name="logo-whatsapp" size={24} color="#00acee"/>}/>
            <View style={{marginTop:30, marginLeft:15, marginRight:15}}>
                <PhoneInput
                ref={phoneInput}
                defaultValue={value}
                defaultCode="IN"
                layout="first"
                onChangeText={(text) => {
                    setValue(text);
                }}
                onChangeFormattedText={(text) => {
                    setFormattedValue(text);
                }}
                withDarkTheme={false}
                withShadow={false}
                autoFocus={false}
            />
            </View>
        </View>
    )
}