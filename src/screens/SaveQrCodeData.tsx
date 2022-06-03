import React from "react";
import {View, Text, Pressable,Linking,Alert, PermissionsAndroid} from "react-native";
import { StackParamList } from "../navigation/StackNavigation";
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import { globalStyle } from "../styles/globalStyles";
import Clipboard from '@react-native-clipboard/clipboard';
import { scanDataTypes } from "../utils/scanDataTypes";
import Share from 'react-native-share';
import Ionicons  from 'react-native-vector-icons/Ionicons';

type Props = NativeStackScreenProps<StackParamList>;

const getIconName = (domain:string)=>{
    if(domain === "twitter"){
        return "logo-twitter"
    }else if(domain === "youtube"){
        return "logo-youtube"
    }else if(domain === "facebook"){
        return "logo-facebook"
    }else{
        return "link-outline"
    }
}

export const SaveQrCodeData = ({navigation,route}:Props) =>{

    //@ts-ignore
    const {scanData} = route.params;

    return (
        <View>
           <View 
            style={{
                ...globalStyle.displayItemInSpaceBetween,
                backgroundColor:"#fff",
                padding:15
            }}
            >
                <Pressable 
                style={{flexDirection:'row', alignItems:'center'}}
                onPress={()=>navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24}/>
                    <Text style={{marginRight:5}}>Back</Text>
                </Pressable>
            </View>           
            <View 
            style={{
                marginTop:25,
                marginLeft:10,
                marginRight:10,
                backgroundColor: 'white',
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
                    <View style={{justifyContent:'center', alignItems:"center", marginTop:10,}}>
                        <Ionicons name={scanDataTypes(scanData).logo} size={24} color="#FF0000"/>
                        <Text style={{fontSize:28}}>{scanDataTypes(scanData).type === "URL" ? scanDataTypes(scanData).domain : scanDataTypes(scanData).type}</Text>
                    </View>
                    <View style={{justifyContent:'center', alignItems:"center",marginTop:20, marginLeft:10,marginRight:10}}>
                        <Text>{scanData}</Text>
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
                                    scanDataTypes(scanData).Url && (
                                        <Pressable 
                                        onPress={async ()=>{
                                            const url = scanData;
                                            console.log(url)
                                            // Checking if the link is supported for links with custom URL scheme.
                                            const supported = await Linking.canOpenURL(url);
                                            console.log({supported})
                                            if (supported) {
                                                // Opening the link with some app, if the URL scheme is "http" the web link should be opened
                                                // by some browser in the mobile
                                                await Linking.openURL(url);
                                            } else {
                                                Alert.alert(`Don't know how to open this URL: ${url}`);
                                            }
                                        }}      
                                        style={{padding:10, marginRight:15, backgroundColor:'green'}}>
                                            <Text style={{color:"#fff"}}>Open Link</Text>
                                        </Pressable>
                                    )
                                }
                            <Pressable 
                            onPress={()=>{
                                Clipboard.setString(scanData)
                                console.log("data saved")
                            }}
                            style={{padding:10, marginRight:15, backgroundColor:'green'}}>
                                <Text style={{color:"#fff"}}>Copy</Text>
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
                            style={{padding:10, marginRight:15, backgroundColor:'green'}}>
                                <Text style={{color:"#fff"}}>Share</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}