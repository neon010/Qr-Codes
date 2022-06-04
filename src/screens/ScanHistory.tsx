import React,{useState,useCallback} from "react"
import { View,Text,ScrollView, Pressable } from "react-native"
import { getScanHistory } from "../writingFile/createFile"
import Ionicons  from 'react-native-vector-icons/Ionicons';
import { scanDataTypes } from "../utils/scanDataTypes";
import { globalStyle } from "../styles/globalStyles";
import { useFocusEffect } from '@react-navigation/native';

export const ScanHistory = ({navigation}:{navigation:any})=>{
    const [scanHistory, setScanHistory] = useState<any>(null);
    const [errMsg, setErrMSg] = useState("");


    useFocusEffect(
        useCallback(()=>{
            async function scanHistory(){
                const scanHistory = await getScanHistory();
                if(scanHistory.code === 200){
                    setScanHistory(scanHistory.data)
                }else{
                    setErrMSg(scanHistory.error)
                }
    
            }
            scanHistory()
        },[])
    )

    console.log({scanHistory})

    return (
        <ScrollView>
            {
                scanHistory && (
                    Object.keys(scanHistory).map((key)=>{
                        return (
                            <View key={key} style={{...globalStyle.displayItemInRow, padding:10}}>
                                <View style={{padding:10, backgroundColor:'red', borderRadius:5,marginRight:10}}>
                                    <Ionicons name={scanDataTypes(scanHistory[key].content).logo} size={24}/>
                                </View>
                                <View style={{...globalStyle.displayItemInSpaceBetween,width:"88%"}}>
                                    <View>
                                        <Text>{scanHistory[key].content}</Text>
                                        <Text>{(new Date(scanHistory[key].time)).toLocaleDateString()}</Text>
                                    </View>
                                    <View>
                                        <Pressable
                                        onPress={()=>{
                                            navigation.navigate("SaveQrCodeData", {
                                                scanData:scanHistory[key].content
                                            })
                                        }} 
                                        >
                                            <Ionicons name="arrow-forward-outline" size={24}/>
                                        </Pressable>
                                    </View>
                                </View>
                            </View>
                        )
                    })
                )
            }
            

        </ScrollView>
    )
}