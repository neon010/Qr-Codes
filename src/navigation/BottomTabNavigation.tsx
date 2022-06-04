import React from "react";
import {View, Text} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ScanScreen } from "../screens/ScanScreen";
import { CreateScreen } from "../screens/CreateScreen";
import { HistoryScreen } from "../screens/HistoryScreen";
import Ionicons  from 'react-native-vector-icons/Ionicons';
import FontAwesome  from 'react-native-vector-icons/FontAwesome';
import { TopTabNavigation } from "./TopTabNavigation";


export type BottomTabParamList = {
    ScanScreen: undefined;
    CreateScreen: undefined;
    HistoryScreen: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();



export const BottomTabNavigation = () =>{

    return (
        <Tab.Navigator
        screenOptions={{
            tabBarShowLabel:false,
            tabBarStyle: {
            backgroundColor: 'white',
            position: 'absolute',
            height: 70,
            shadowColor: '#000',
            shadowOpacity: 0.06,
            shadowOffset: {
                width: 10,
                height: 10
            },
        }

        }}
        >
            <Tab.Screen
                name="ScanScreen" 
                component={ScanScreen} 
                options={{
                    headerShown:false,
                    tabBarIcon:({focused})=>{
                        return (
                            <View style={{width:80, justifyContent:"center", alignItems:"center"}}>
                                <Ionicons name="scan" size={24}/>
                                <Text style={{fontSize: 12}}>Sacn</Text>
                            </View>
                        )
                    }
                }}
            />
            <Tab.Screen
                name="CreateScreen" 
                component={CreateScreen}
                options={{
                    headerShown:false,
                    tabBarIcon:({focused})=>{
                        return (
                            <View style={{width:80, justifyContent:"center", alignItems:"center"}}>
                                <Ionicons name="create-outline" size={24}/>
                                <Text style={{fontSize: 12}}>Create</Text>
                            </View>
                        )
                    }
                }} 
            />
            <Tab.Screen
                name="HistoryScreen" 
                component={TopTabNavigation} 
                options={{
                    headerShown:false,
                    tabBarIcon:({focused})=>{
                        return (
                            <View style={{width:80, justifyContent:"center", alignItems:"center"}}>
                                <FontAwesome name="history" size={24}/>
                                <Text style={{fontSize: 12}}>History</Text>
                            </View>
                        )
                    }
                }}
            />
        </Tab.Navigator>
    )
}