import React from "react";
import {View, Text, Pressable,Linking,Alert,} from "react-native";
import { StackParamList } from "../navigation/StackNavigation";
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import { globalStyle } from "../styles/globalStyles";
import Clipboard from '@react-native-clipboard/clipboard';
import { scanDataTypes } from "../utils/scanDataTypes";
import Share from 'react-native-share';
import Ionicons  from 'react-native-vector-icons/Ionicons';
import { colors } from "../styles/colors";
import { showToastWithGravity } from "../utils/toastAndroid";

type Props = NativeStackScreenProps<StackParamList>;



export const SaveQrCodeData = ({navigation,route}:Props) =>{



    //@ts-ignore
    const {scanData} = route.params;

    return (
        <View>
           <View 
            style={{
                ...globalStyle.displayItemInSpaceBetween,
                backgroundColor:colors.whiteColor,
                padding:15
            }}
            >
                <Pressable 
                style={{flexDirection:'row', alignItems:'center'}}
                onPress={()=>navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24}/>
                    <Text style={{marginLeft:5,color:colors.primaryColor}}>Back</Text>
                </Pressable>
            </View>           
            <View 
            style={{
                marginTop:25,
                marginLeft:10,
                marginRight:10,
                backgroundColor: colors.whiteColor,
                height: 300,
                borderRadius:10,
                shadowColor: '#000',
                shadowOpacity: 0.1,
                shadowOffset: {
                    width: 20,
                    height: 20
                }
            }}>
                <View style={{padding:10}}>
                    <View style={{position:'relative', left:"40%",top:"-12%" }}>
                        <View style={{width:50, height:50,borderRadius:30, backgroundColor:colors.primaryColor, alignItems:"center", justifyContent:"center"}}>
                            <Ionicons name={scanDataTypes(scanData).logo} size={24} color="#FF0000"/>
                        </View>
                    </View>
                    <View style={{justifyContent:'center', alignItems:"center",marginTop:20, marginLeft:10,marginRight:10}}>
                        <Text style={{color:colors.primaryheadingColor}}>{scanData}</Text>
                    </View>
                    <View style={{justifyContent:'center', alignItems:"center", marginTop:20,}}>
                        <View style={{
                            marginTop:30, 
                            marginLeft:10,
                            marginRight:10,
                            flexDirection:"row" ,
                            justifyContent:"space-between", 
                            alignItems:"center"
                            }}>
                                {
                                    scanDataTypes(scanData).type === "PHONE" && (
                                        <Pressable 
                                        onPress={async ()=>{
                                            const phone = scanData;
                                            let url =`whatsapp://send?text=&phone=${phone}`;
                                            const supported = await Linking.canOpenURL(url);
                                            console.log({supported})
                                            if (supported) {
                                                await Linking.openURL(url);
                                            } else {
                                                Alert.alert(`Don't know how to open this URL: ${url}`);
                                            }
                                        }}      
                                        style={{width:80, height:35,marginRight:15, backgroundColor:colors.primaryColor, borderRadius:25, justifyContent:"center", alignItems:"center"}}>
                                            <Text style={{color:colors.whiteColor}}>Whatsapp</Text>
                                        </Pressable>
                                    )
                                }
                                {
                                    scanDataTypes(scanData).type === "URL" && (
                                        <Pressable 
                                        onPress={async ()=>{
                                            const url = scanData;

                                            const supported = await Linking.canOpenURL(url);
                                            console.log({supported})
                                            if (supported) {
                                                await Linking.openURL(url);
                                            } else {
                                                Alert.alert(`Don't know how to open this URL: ${url}`);
                                            }
                                        }}      
                                        style={{width:80, height:35,marginRight:15, backgroundColor:colors.primaryColor, borderRadius:25, justifyContent:"center", alignItems:"center"}}>
                                            <Text style={{color:colors.whiteColor}}>Open Link</Text>
                                        </Pressable>
                                    )
                                }
                            <Pressable 
                            onPress={()=>{
                                Clipboard.setString(scanData)
                                showToastWithGravity("Copied to clipboard");
                            }}
                            style={{width:80, height:35,marginRight:15, backgroundColor:colors.primaryColor, borderRadius:25, justifyContent:"center", alignItems:"center"}}>
                                <Text style={{color:colors.whiteColor}}>Copy</Text>
                            </Pressable>
                            <Pressable 
                            onPress={()=>{
                                const options= {
                                    url:scanData
                                }
                                Share.open(options)
                                .then((res) => {
                                  console.log(res);
                                })
                                .catch((err) => {
                                  err && console.log(err);
                                });
                            }}
                            style={{width:80, height:35,marginRight:15, backgroundColor:colors.primaryColor, borderRadius:25, justifyContent:"center", alignItems:"center"}}>
                                <Text style={{color:colors.whiteColor}}>Share</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}