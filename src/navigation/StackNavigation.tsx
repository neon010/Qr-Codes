import React from "react";
import {View, Text} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BottomTabNavigation, BottomTabParamList } from "./BottomTabNavigation";
import { GenQrCodeScreen } from "../screens/GenQrCodeScreen";
import { SaveQrCodeData } from "../screens/SaveQrCodeData";


export type StackParamList = {
    Scan: BottomTabParamList;
    GenQrCodeScreen:undefined;
    SaveQrCodeData:{
        scanData:string
    }
};

const Stack = createNativeStackNavigator<StackParamList>();



export const StackNavigation = () =>{

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Scan" 
                component={BottomTabNavigation}
                options={{
                    headerShown:false
                }} 
            />
            <Stack.Screen
                name="GenQrCodeScreen" 
                component={GenQrCodeScreen} 
                options={{
                    headerShown:false
                }} 
            />
            <Stack.Screen
                name="SaveQrCodeData" 
                component={SaveQrCodeData} 
                options={{
                    headerShown:false
                }} 
            />
        </Stack.Navigator>
    )
}