import React, {useState, useEffect} from "react";
import {View, Text,TextInput,Pressable} from "react-native";
import Clipboard from '@react-native-clipboard/clipboard';
import Ionicons  from 'react-native-vector-icons/Ionicons';
import { StackParamList } from "../navigation/StackNavigation";
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import { ScreenLabel } from "../components/ScreenLabel";
import { StackScreenHeader } from "../components/StackScreenHeader";
import { globalStyle } from "../styles/globalStyles";

type Props = NativeStackScreenProps<StackParamList>;

export const ClipboardQrCreate = ({navigation}:Props) =>{

    const [clipboardText, setClipboardText] = useState("");
    const [imageUri, setImageUri] = useState<any>(null);

    useEffect(()=>{
        const getClipboardText =  async () =>{
            const text = await Clipboard.getString();
            setClipboardText(text)
        }
        getClipboardText();
    },[]);

    return (
        <View>
            <StackScreenHeader
                navigation={navigation}
                qrData={clipboardText}
            />
            <ScreenLabel screenIcon={<Ionicons name="clipboard-outline" size={24} color="#00acee"/>}/>
            <View style={{marginTop:30, marginLeft:15, marginRight:15}}>
                <TextInput
                    placeholder="Enter some text"
                    multiline={true}
                    numberOfLines={5}
                    placeholderTextColor="grey"
                    value={clipboardText}
                    onChangeText={(text)=> setClipboardText(text)}
                    style={{
                        ...globalStyle.textArea
                    }}
                />
            </View>
        </View>
    )
}