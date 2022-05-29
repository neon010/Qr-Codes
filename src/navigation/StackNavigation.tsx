import React from "react";
import {View, Text} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BottomTabNavigation, BottomTabParamList } from "./BottomTabNavigation";
import { GenQrCodeScreen } from "../screens/GenQrCodeScreen";
import { SaveQrCodeData } from "../screens/SaveQrCodeData";
import { TextQrCreate } from "../screens/TextQrCreate";
import { ClipboardQrCreate } from "../screens/ClipboardQrCreate";
import { LocationQrCreate } from "../screens/LocationQrCreate";
import { LinkQrCreate } from "../screens/LinkQrCreate";
import { WifiQrCreate } from "../screens/WifiQrCreate";
import { EmailQrCreate } from "../screens/EmailQrCreate";
import { SmsQrCreate } from "../screens/SmsQrCreate";
import { ContactQrCreate } from "../screens/ContactQrCreate";
import { WhatsAppQrCreate } from "../screens/WhatsAppQrCreate";
import { FacebookQrCreate } from "../screens/FacebookQrCreate";
import { YoutubeQrCreate } from "../screens/YoutubeQrCreate";
import { TwitterQrCreate } from "../screens/TwitterQrCreate";
import { SaveQrCodeSvg } from "../screens/SaveQrCodeSvg";

export type StackParamList = {
    Scan: BottomTabParamList;
    GenQrCodeScreen:undefined;
    SaveQrCodeData:{
        scanData:string
    }
    TextQrCreate:undefined;
    ClipboardQrCreate:undefined;
    LocationQrCreate:undefined;
    LinkQrCreate:undefined;
    WifiQrCreate:undefined;
    EmailQrCreate:undefined;
    SmsQrCreate:undefined;
    ContactQrCreate:undefined;
    WhatsAppQrCreate:undefined;
    FacebookQrCreate:undefined;
    YoutubeQrCreate:undefined;
    TwitterQrCreate:undefined;
    SaveQrCodeSvg:{
        uri:string
    }
};

const Stack = createNativeStackNavigator<StackParamList>();

const qrCodeCreateRoutes = [
    {name:'TextQrCreate', component:TextQrCreate},
    {name:'ClipboardQrCreate', component:ClipboardQrCreate},
    {name:'LocationQrCreate',component:LocationQrCreate},
    {name:'LinkQrCreate',component:LinkQrCreate},
    {name:'WifiQrCreate',component:WifiQrCreate},
    {name:'EmailQrCreate',component:EmailQrCreate},
    {name:'SmsQrCreate',component:SmsQrCreate},
    {name:'ContactQrCreate',component:ContactQrCreate},
    {name:'WhatsAppQrCreate',component:WhatsAppQrCreate},
    {name:'FacebookQrCreate',component:FacebookQrCreate},
    {name:'YoutubeQrCreate',component:YoutubeQrCreate},
    {name:'TwitterQrCreate',component:TwitterQrCreate},
]
    


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
            <Stack.Screen
                name="SaveQrCodeSvg" 
                component={SaveQrCodeSvg} 
                options={{
                    headerShown:false
                }} 
            />
            {
                qrCodeCreateRoutes.map(item=>{
                    return (
                        <Stack.Screen
                        //@ts-ignore
                        name={item.name} 
                        component={item.component} 
                        options={{
                            headerShown:false
                        }} 
                        />
                    )
                })
            }

        </Stack.Navigator>
    )
}