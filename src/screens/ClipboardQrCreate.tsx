import React, {useState, useEffect} from "react";
import {View, TextInput,} from "react-native";
import Clipboard from '@react-native-clipboard/clipboard';
import Ionicons  from 'react-native-vector-icons/Ionicons';
import { StackParamList } from "../navigation/StackNavigation";
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import { ScreenLabel } from "../components/ScreenLabel";
import { StackScreenHeader } from "../components/StackScreenHeader";
import { globalStyle } from "../styles/globalStyles";
import { colors } from "../styles/colors";

type Props = NativeStackScreenProps<StackParamList>;

export const ClipboardQrCreate = ({navigation}:Props) =>{

    const [clipboardText, setClipboardText] = useState("");


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
            <ScreenLabel screenIcon={<Ionicons name="clipboard-outline" size={24} color={colors.clipboardIconColor}/>}/>
            <View style={{marginTop:30, marginLeft:15, marginRight:15}}>
                <TextInput
                    placeholder="Enter some text"
                    multiline={true}
                    numberOfLines={5}
                    placeholderTextColor={colors.placeHolderColor}
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