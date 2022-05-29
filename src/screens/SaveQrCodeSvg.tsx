import React from "react";
import {View, Text, Image,StyleSheet,Pressable} from "react-native";
import { StackParamList } from "../navigation/StackNavigation";
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Ionicons  from 'react-native-vector-icons/Ionicons';
import RNFetchBlob from 'rn-fetch-blob';
import RNFS from "react-native-fs"
import Share from 'react-native-share';


type Props = NativeStackScreenProps<StackParamList>;

export const SaveQrCodeSvg = ({navigation, route}:Props) =>{

    // @ts-ignore
    const {uri} = route.params;

    console.log(uri)

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
                    height: 300,
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
                        const picsName = uri.split("/").pop();
                        console.log(picsName)

                        const newPath = `${RNFS.DocumentDirectoryPath}/${picsName}`; // You don't really need the `'file://` prefix
                        console.log(newPath);
                    
                        // COPY the file
                        RNFS.moveFile(uri, newPath)
                          .then((success) => {
                            console.log('IMG moved!');
                            console.log(newPath);
                          })
                          .catch((err) => {
                            console.log(err.message);
                          });
                    
            
                        // await RNFetchBlob.fs.mkdir(`${RNFetchBlob.fs.dirs.PictureDir}/QRCode123`)
                        // await RNFetchBlob.fs.mv(uri, 
                        //     `${RNFetchBlob.fs.dirs.PictureDir}/QRCode/${picsName}`
                        // )
                        // console.log("picture saved save");
                    }catch (error) {
                        console.log(error)
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
        </View>
    )
}