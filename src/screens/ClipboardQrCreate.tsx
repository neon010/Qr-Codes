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
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

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

    const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-3106903641712143/9234091024';

    console.log({adUnitId})


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