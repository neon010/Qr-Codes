import React,{useState} from "react";
import {View, TextInput} from "react-native";
import Ionicons  from 'react-native-vector-icons/Ionicons';
import { StackParamList } from "../navigation/StackNavigation";
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import { ScreenLabel } from "../components/ScreenLabel";
import { StackScreenHeader } from "../components/StackScreenHeader";
import { globalStyle } from "../styles/globalStyles";
import { colors } from "../styles/colors";
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';



type Props = NativeStackScreenProps<StackParamList>;

export const LinkQrCreate = ({navigation}:Props) =>{
    const [url, setUrl] = useState("");

    const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-3106903641712143~3177864857';


    return (
        <View>
            <StackScreenHeader
                navigation={navigation}
                qrData={url}
            />
            <ScreenLabel screenIcon={<Ionicons name="link-outline" size={24} color={colors.linkIconColor}/>}/>
            <View style={{marginTop:30, marginLeft:15, marginRight:15}}>
                <TextInput
                    placeholder="URL"
                    placeholderTextColor={colors.placeHolderColor}
                    value={url}
                    onChangeText={(text)=> setUrl(text)}
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