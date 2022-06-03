import React, {useState, useEffect} from "react";
import {View, Text,TextInput,Pressable} from "react-native";
import Ionicons  from 'react-native-vector-icons/Ionicons';
import { StackParamList } from "../navigation/StackNavigation";
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {generateQr} from "../utils/generateQr"
import { ScreenLabel } from "../components/ScreenLabel";
import { StackScreenHeader } from "../components/StackScreenHeader";
import { globalStyle } from "../styles/globalStyles";

type Props = NativeStackScreenProps<StackParamList>;

export const EmailQrCreate = ({navigation}:Props) =>{
    const [email, setEmail] = useState("");
    const [imageUri, setImageUri] = useState<any>(null);

    return (
        <View>
            <StackScreenHeader
                navigation={navigation}
                qrData={email}
            />
            <ScreenLabel screenIcon={<Ionicons name="mail-outline" size={24} color="#00acee"/>}/>
            <View style={{marginTop:30, marginLeft:15, marginRight:15}}>
                <TextInput
                    placeholder="Email Address"
                    multiline={true}
                    placeholderTextColor="grey"
                    value={email}
                    onChangeText={(text)=> setEmail(text)}
                    style={{
                        ...globalStyle.textInput
                    }}
                />
            </View>
        </View>
    )
}