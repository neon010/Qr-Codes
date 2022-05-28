import React from "react";
import {View, Text, Pressable} from "react-native";
import { StackParamList } from "../navigation/StackNavigation";
import {NativeStackScreenProps} from '@react-navigation/native-stack';


type Props = NativeStackScreenProps<StackParamList>;

export const SaveQrCodeData = ({navigation,route}:Props) =>{

    //@ts-ignore
    const {scanData} = route.params;

    return (
        <View>
            <Text>CreateScreen</Text>
            <Pressable
            onPress={()=>{navigation.navigate("GenQrCodeScreen")}} 
            >
                <Text>{scanData}</Text>
            </Pressable>
        </View>
    )
}