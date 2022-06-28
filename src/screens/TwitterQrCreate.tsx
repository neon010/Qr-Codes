import React,{useState} from "react";
import {View, Text, Pressable, TextInput} from "react-native";
import Ionicons  from 'react-native-vector-icons/Ionicons';
import { StackParamList } from "../navigation/StackNavigation";
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import { ScreenLabel } from "../components/ScreenLabel";
import { StackScreenHeader } from "../components/StackScreenHeader";
import { globalStyle } from "../styles/globalStyles";
import { colors } from "../styles/colors";
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';



type Props = NativeStackScreenProps<StackParamList>;

export const TwitterQrCreate = ({navigation}:Props) =>{
    const [text, setText] = useState("");
    const [qrData, setQrData] = useState("");
    const [type, setType] = useState("URL");

    const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-3106903641712143/9234091024';


    return (
        <View>
            <StackScreenHeader
                navigation={navigation}
                qrData={qrData}
            />
            <ScreenLabel screenIcon={<Ionicons name="logo-twitter" size={24} color={colors.twitterColor}/>}/>
            <View style={{...globalStyle.displayItemInCenter}}>
                <View style={{...globalStyle.displayItemInRow, marginTop:15}}>
                    <Pressable 
                    style={{
                        backgroundColor: type === "URL" ? colors.primaryColor: "transparent",
                        ...globalStyle.pilledShapeButton
                    }}
                    onPress={()=> {
                        setType("URL")
                        setText("")
                        setQrData("")
                    }}
                    >
                        <Text style={{color: type === "URL" ? colors.whiteColor:colors.primaryheadingColor }}>URL</Text>
                    </Pressable>
                    <Pressable 
                    style={{
                        backgroundColor: type === "User Name" ? colors.primaryColor: "transparent",
                        ...globalStyle.pilledShapeButton
                    }}
                    onPress={()=> {
                        setType("User Name");
                        setText("");
                        setQrData("");
                    }}
                    >
                        <Text style={{color: type === "User Name" ? colors.whiteColor:colors.primaryheadingColor}}>User Name</Text>
                    </Pressable>
                </View>
            </View>
            <View style={{marginTop:30, marginLeft:15, marginRight:15}}>
                <TextInput
                    placeholder={type}
                    placeholderTextColor={colors.placeHolderColor}
                    value={text}
                    onChangeText={(text)=> {
                        setText(text)
                        if(type === "User Name"){
                            setQrData(`https://twitter.com/${text}`)
                        }else{
                            setQrData(text)
                        }
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