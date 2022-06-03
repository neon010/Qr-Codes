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

export const LinkQrCreate = ({navigation}:Props) =>{
    const [url, setUrl] = useState("");
    const [error,setError] = useState<any>("");
    const [imageUri, setImageUri] = useState<any>(null);


    return (
        <View>
            <StackScreenHeader
                navigation={navigation}
                qrData={url}
            />
            <ScreenLabel screenIcon={<Ionicons name="link-outline" size={24} color="#00acee"/>}/>
            <View style={{marginTop:30, marginLeft:15, marginRight:15}}>
                <TextInput
                    placeholder="URL"
                    placeholderTextColor="grey"
                    value={url}
                    onChangeText={(text)=> setUrl(text)}
                    style={{
                        ...globalStyle.textInput
                    }}
                />
            </View>
        </View>
    )
}