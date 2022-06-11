import React, { useState } from "react";
import {View, Text, Image,StyleSheet,PermissionsAndroid,Pressable} from "react-native";
import { StackParamList } from "../navigation/StackNavigation";
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Ionicons  from 'react-native-vector-icons/Ionicons';
import RNFS from "react-native-fs"
import Share from 'react-native-share';
import { createQrCodeHistory } from "../writingFile/createdQRHistory";
import { globalStyle } from "../styles/globalStyles";
import { colors } from "../styles/colors";
import { showToastWithGravity } from "../utils/toastAndroid";


type Props = NativeStackScreenProps<StackParamList>;

export const SaveQrCodeSvg = ({navigation, route}:Props) =>{

    const [message, setMessage] = useState("");

    // @ts-ignore
    const {uri,content} = route.params;




    return (
        <View>
             <View 
            style={{
                flexDirection:"row", 
                justifyContent:"space-between", 
                alignItems:"center",
                padding:10
            }}
            >
                <Pressable 
                style={{
                    ...globalStyle.displayItemInSpaceBetween
                }}
                onPress={()=>navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24}/>
                    <Text style={{marginLeft:10}}>Back</Text>
                </Pressable>
            </View>

            <View style={{...globalStyle.displayItemInCenter, marginTop:50}}>
                <Image 
                source={{uri}}
                style={{
                    backgroundColor: '#F3F3F3',
                    width: 250,
                    height: 250,
                    borderWidth: StyleSheet.hairlineWidth,
                    marginBottom: 16,
                    shadowColor: '#000',
                    shadowOpacity: 0.06,
                    shadowOffset: {
                        width: 10,
                        height: 10
                    },
                }}
                />
            </View>
            <View style={{flexDirection:'row', justifyContent:"center", alignItems:"center", marginTop:20}}>
                <Pressable 
                style={{
                    ...globalStyle.pilledShapeButtonSave,

                }}
                onPress={async()=>{
                    try {
                        
                        const granted = await PermissionsAndroid.request(
                            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                            {
                              title: "Cool Photo App WRITE_EXTERNAL_STORAGE Permission",
                              message:
                                "Cool Photo App needs access to your WRITE_EXTERNAL_STORAGE " +
                                "so you can take awesome pictures.",
                              buttonNeutral: "Ask Me Later",
                              buttonNegative: "Cancel",
                              buttonPositive: "OK"
                            }
                        );
                        if (granted === PermissionsAndroid.RESULTS.GRANTED) {

                            const picsName = `${(Math.random()*1000000).toString()}.png`;
                            const newPath = `file://${RNFS.PicturesDirectoryPath}/${picsName}`; 
 
                            // COPY the file
                            await RNFS.copyFile(uri, newPath)
                              .then((success) => {
                                setMessage(`Image saved to ${newPath}`)
                            })
                              .catch((err) => {
                                setMessage(err.message)
                            });

                            createQrCodeHistory({uri:newPath,content})

                            showToastWithGravity("QR code image saved in pictures folder")

                        } else {
                            setMessage("Need permission to write on phone")
                        }
                    }catch (error) {
                        setMessage("Coudld not able to save file")
                    }
                }}>
                    <Text style={{color:colors.whiteColor}}>Save</Text>
                </Pressable>
                <Pressable
                onPress={()=>{
                    const options= {
                        filename:uri
                    }
                    Share.open(options)
                    .then((res) => {
                      console.log(res);
                    })
                    .catch((err) => {
                      err && console.log(err);
                    });
                }}
                style={{...globalStyle.pilledShapeButtonSave}}
                >
                    <Text style={{color:colors.whiteColor}}>Share</Text>
                </Pressable>
            </View>
        </View>
    )
}