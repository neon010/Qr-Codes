import React,{useState,useCallback} from "react"
import { View,Text,ScrollView, Pressable } from "react-native"
import { getScanHistory } from "../writingFile/createFile"
import Ionicons  from 'react-native-vector-icons/Ionicons';
import { scanDataTypes } from "../utils/scanDataTypes";
import { globalStyle } from "../styles/globalStyles";
import { useFocusEffect } from '@react-navigation/native';
import { colors } from "../styles/colors";

export const ScanHistory = ({navigation}:{navigation:any})=>{
    const [scanHistory, setScanHistory] = useState<any>({});
    const [errMsg, setErrMSg] = useState<any>(null);


    useFocusEffect(
        useCallback(()=>{
            async function scanHistory(){
                const scanHistory = await getScanHistory();
                if(scanHistory.code === 200){
                    setScanHistory(scanHistory.data)
                }else{
                    setErrMSg("history is empty")
                }
    
            }
            scanHistory()
        },[])
    )



    return (
        <ScrollView>
            {
                errMsg ? (
                    <View
                    style={{height:400,...globalStyle.displayItemInCenter}}
                    >
                        <Text style={{color:colors.primaryheadingColor}}>{errMsg}</Text>
                    </View>
                ):(
                    Object.keys(scanHistory).length > 0 ? (
                        Object.keys(scanHistory).map((key)=>{
                            return (
                                <View key={key} style={{...globalStyle.displayItemInRow, padding:10}}>
                                    <View style={{padding:10, backgroundColor:colors.primaryColor, borderRadius:5,marginRight:10}}>
                                        <Ionicons name={scanDataTypes(scanHistory[key].content).logo} size={24} color="#fff"/>
                                    </View>
                                    <View style={{...globalStyle.displayItemInSpaceBetween,width:"88%"}}>
                                        <View>
                                            <Text style={{color:colors.primaryheadingColor}}>{scanHistory[key].content}</Text>
                                            <Text style={{color:colors.secondaryHeadingColor}}>{(new Date(scanHistory[key].time)).toLocaleDateString()}</Text>
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
                    ):(
                    <View
                    style={{height:400,...globalStyle.displayItemInCenter}}
                    >
                        <Text style={{color:colors.primaryheadingColor}}
                        >Scan history is empty</Text>
                    </View>
                    )
                )
            }
        </ScrollView>
    )
}