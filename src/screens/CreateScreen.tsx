import React from "react";
import {View, Text, Pressable} from "react-native";
import { StackParamList } from "../navigation/StackNavigation";
import {NativeStackScreenProps} from '@react-navigation/native-stack';


type Props = NativeStackScreenProps<StackParamList>;

export const CreateScreen = ({navigation}:Props) =>{
    return (
        <View>
            <Text>CreateScreen</Text>
            <Pressable
            onPress={()=>{navigation.navigate("GenQrCodeScreen")}} 
            >
                <Text>Go to Generate</Text>
            </Pressable>
        </View>
    )
}