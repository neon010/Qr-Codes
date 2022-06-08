import React from "react";
import {View, Text} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ScanScreen } from "../screens/ScanScreen";
import { CreateScreen } from "../screens/CreateScreen";
import Ionicons  from 'react-native-vector-icons/Ionicons';
import FontAwesome  from 'react-native-vector-icons/FontAwesome';
import { TopTabNavigation } from "./TopTabNavigation";
import { colors } from "../styles/colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { globalStyle } from "../styles/globalStyles";



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
            backgroundColor: colors.whiteColor,
            position: 'absolute',
            height: 70,
            shadowColor: colors.primaryheadingColor,
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
                            <TouchableOpacity  activeOpacity={.7} style={{width:80, ...globalStyle.displayItemInCenter}}>
                                <Ionicons name="scan" size={24} color={focused ? colors.primaryColor:colors.secondaryHeadingColor }/>
                                <Text 
                                style={focused ? globalStyle.tabNavigationTextFocused:globalStyle.tabNavigationText}>Sacn</Text>
                            </TouchableOpacity>
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
                            <TouchableOpacity  activeOpacity={.7} style={{width:80, ...globalStyle.displayItemInCenter}}>
                                <Ionicons name="create-outline" size={24} color={focused ? colors.primaryColor:colors.secondaryHeadingColor }/>
                                <Text 
                                style={focused ? globalStyle.tabNavigationTextFocused:globalStyle.tabNavigationText}>Create</Text>
                            </TouchableOpacity>
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
                            <TouchableOpacity  activeOpacity={.7} style={{width:80, ...globalStyle.displayItemInCenter}}>
                                <FontAwesome name="history" size={24} color={focused ? colors.primaryColor:colors.secondaryHeadingColor }/>
                                <Text 
                                style={focused ? globalStyle.tabNavigationTextFocused:globalStyle.tabNavigationText}>History</Text>
                            </TouchableOpacity>
                        )
                    }
                }}
            />
        </Tab.Navigator>
    )
}