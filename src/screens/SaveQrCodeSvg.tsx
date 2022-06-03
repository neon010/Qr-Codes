import React, { useState } from "react";
import {View, Text, Image,StyleSheet,PermissionsAndroid,Pressable} from "react-native";
import { StackParamList } from "../navigation/StackNavigation";
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Ionicons  from 'react-native-vector-icons/Ionicons';
import RNFS from "react-native-fs"
import Share from 'react-native-share';


type Props = NativeStackScreenProps<StackParamList>;

export const SaveQrCodeSvg = ({navigation, route}:Props) =>{

    const [message, setMessage] = useState("");

    // @ts-ignore
    const {uri} = route.params;



    return (
        <View>
             <View 
            style={{
                flexDirection:"row", 
                justifyContent:"space-between", 
                alignItems:"center",
                backgroundColor:"#fff",
                padding:15
            }}
            >
                <Pressable onPress={()=>navigation.goBack()}>
                    <Ionicons 
                    name="arrow-back" 
                    size={24}
                    />
                </Pressable>
            </View>
            <View style={{justifyContent:"center", alignItems:"center", marginTop:50}}>
                <Image 
                source={{uri}}
                style={{
                    backgroundColor: '#F3F3F3',
                    width: 300,
                    height: 250,
                    borderWidth: StyleSheet.hairlineWidth,
                    marginBottom: 16,
                }}
                />
            </View>
            <View style={{flexDirection:'row', justifyContent:"center", alignItems:"center", marginTop:50}}>
                <Pressable 
                style={{marginRight:20, padding:10, backgroundColor:"black"}}
                onPress={async()=>{
                    console.log("save");
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
                        } else {
                            console.log("Camera permission denied");
                        }
                    }catch (error) {
                        setMessage("Coudld not able to save file")
                    }
                }}>
                    <Text style={{color:"#fff"}}>Save</Text>
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
                style={{marginRight:20, padding:10, backgroundColor:"black"}}
                >
                    <Text style={{color:"#fff"}}>Share</Text>
                </Pressable>
            </View>
            <View>
                <Text>{message}</Text>
            </View>
            <View>
                <Image source={{uri:`${RNFS.PicturesDirectoryPath}/hello.png`}} style={{width:250, height:250}}/>
            </View>
        </View>
    )
}