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

export const TextQrCreate = ({navigation}:Props) =>{
    const [text, setText] = useState("");
    const [error,setError] = useState<any>("");
    const [imageUri, setImageUri] = useState<any>(null);


    return (
        <View>
            <StackScreenHeader 
                navigation={navigation}
                qrData={text}
            />
            <ScreenLabel screenIcon={<Ionicons name="md-text-outline" size={24} color="#FF0000"/>}/>
            <View style={{marginTop:30, marginLeft:15, marginRight:15}}>
                <TextInput
                    placeholder="Enter some text"
                    multiline={true}
                    numberOfLines={5}
                    placeholderTextColor="grey"
                    value={text}
                    onChangeText={(text)=> setText(text)}
                    style={{
                        ...globalStyle.textArea
                    }}
                />
            </View>
        </View>
    )
}