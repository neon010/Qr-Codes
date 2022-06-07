import React,{useState} from "react";
import {View,TextInput} from "react-native";
import Ionicons  from 'react-native-vector-icons/Ionicons';
import { StackParamList } from "../navigation/StackNavigation";
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import { ScreenLabel } from "../components/ScreenLabel";
import { StackScreenHeader } from "../components/StackScreenHeader";
import { globalStyle } from "../styles/globalStyles";
import { isPhoneNumber } from "../utils/scanDataTypes";
import { colors } from "../styles/colors";


type Props = NativeStackScreenProps<StackParamList>;

export const WhatsAppQrCreate = ({navigation}:Props) =>{
    const [value, setValue] = useState("");


    console.log(value)

    return (
        <View>
            <StackScreenHeader
                navigation={navigation}
                qrData={isPhoneNumber(value) && value}
            />
            <ScreenLabel screenIcon={<Ionicons name="logo-whatsapp" size={24} color={colors.whatsAppColor}/>}/>
            <View style={{marginTop:30, marginLeft:15, marginRight:15,...globalStyle.displayItemInCenter}}>
                <TextInput
                    placeholder="Enter a valid phone number"
                    placeholderTextColor={colors.placeHolderColor}
                    keyboardType="numeric"
                    value={value}
                    onChangeText={(text)=> {
                        setValue(text)

                    }}
                    style={{
                        padding: 10,
                        borderWidth:1,
                        borderRadius:10,
                        width:275
                    }}
                />
            </View>
        </View>
    )
}

