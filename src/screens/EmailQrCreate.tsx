import React, {useState} from "react";
import {View, TextInput} from "react-native";
import Ionicons  from 'react-native-vector-icons/Ionicons';
import { StackParamList } from "../navigation/StackNavigation";
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import { ScreenLabel } from "../components/ScreenLabel";
import { StackScreenHeader } from "../components/StackScreenHeader";
import { globalStyle } from "../styles/globalStyles";
import { colors } from "../styles/colors";

type Props = NativeStackScreenProps<StackParamList>;

export const EmailQrCreate = ({navigation}:Props) =>{
    const [email, setEmail] = useState("");


    return (
        <View>
            <StackScreenHeader
                navigation={navigation}
                qrData={email}
            />
            <ScreenLabel screenIcon={<Ionicons name="mail-outline" size={24} color={colors.emailIconColor}/>}/>
            <View style={{marginTop:30, marginLeft:15, marginRight:15}}>
                <TextInput
                    placeholder="Email Address"
                    multiline={true}
                    placeholderTextColor={colors.placeHolderColor}
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