import React,{useState} from "react";
import {View,TextInput} from "react-native";
import Ionicons  from 'react-native-vector-icons/Ionicons';
import { StackParamList } from "../navigation/StackNavigation";
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import { ScreenLabel } from "../components/ScreenLabel";
import { StackScreenHeader } from "../components/StackScreenHeader";
import { globalStyle } from "../styles/globalStyles";
import { isPhoneNumber } from "../utils/scanDataTypes";
import { colors } from "../styles/colors";
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';


type Props = NativeStackScreenProps<StackParamList>;

export const WhatsAppQrCreate = ({navigation}:Props) =>{
    const [value, setValue] = useState("");


    const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-3106903641712143~3177864857';


    return (
        <View>
            <StackScreenHeader
                navigation={navigation}
                qrData={isPhoneNumber(value) && value}
            />
            <ScreenLabel screenIcon={<Ionicons name="logo-whatsapp" size={24} color={colors.whatsAppColor}/>}/>
            <View style={{marginTop:30, marginLeft:15, marginRight:15}}>
                <TextInput
                    placeholder="Enter a valid phone number"
                    placeholderTextColor={colors.placeHolderColor}
                    keyboardType="numeric"
                    value={value}
                    onChangeText={(text)=> {
                        setValue(text)

                    }}
                    style={{
                        ...globalStyle.textInput
                    }}
                />
            </View>
            <View style={{position:'absolute',bottom:-120}}>
                <BannerAd
                  unitId={adUnitId}
                  size={BannerAdSize.FULL_BANNER }
                  requestOptions={{
                    requestNonPersonalizedAdsOnly: true,  
                  }}
                />
            </View>
        </View>
    )
}

