import React,{useState, useCallback} from "react"
import { View,Text,ScrollView, Pressable,Alert } from "react-native"
import { deleteScanHistory, getScanHistory } from "../writingFile/createFile"
import Ionicons  from 'react-native-vector-icons/Ionicons';
import { scanDataTypes } from "../utils/scanDataTypes";
import { globalStyle } from "../styles/globalStyles";
import { useFocusEffect } from '@react-navigation/native';
import { colors } from "../styles/colors";
import { truncate } from "../utils/truncateText";

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

    const confirmDelete = (id:string) =>
        Alert.alert(
        "Confirm delete",
        "",
        [
            {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
            },
            { text: "OK", onPress: async() => {
                const createdHistory = await deleteScanHistory(id);
                if(createdHistory.data){
                    setScanHistory(createdHistory.data)
                }else{
                    setErrMSg("history is empty")
                }
                
            } }
        ]
    );


    return (
        <ScrollView contentContainerStyle={{marginBottom:50}}>
            {
                errMsg ? (
                    <View
                    style={{height:400,...globalStyle.displayItemInCenter}}
                    >
                        <Text style={globalStyle.primaryTextStyle}>{errMsg}</Text>
                    </View>
                ):(
                    Object.keys(scanHistory).length > 0 ? (
                        Object.keys(scanHistory).map((key)=>{
                            return (
                                <Pressable 
                                onPress={()=>
                                    navigation.navigate("SaveQrCodeData", {
                                        scanData:scanHistory[key].content
                                    })
                                }
                                key={key} style={{...globalStyle.displayItemInRow, padding:10}}
                                >
                                    <View style={{padding:10, backgroundColor:colors.primaryColor, borderRadius:5,marginRight:10}}>
                                        <Ionicons name={scanDataTypes(scanHistory[key].content).logo} size={24} color="#fff"/>
                                    </View>
                                    <View style={{...globalStyle.displayItemInSpaceBetween,width:"88%"}}>
                                        <View>
                                            <Text style={globalStyle.primaryTextStyle}>{truncate(scanHistory[key].content)}</Text>
                                            <Text style={globalStyle.secondaryTextStyle}>{(new Date(scanHistory[key].time)).toLocaleDateString()}</Text>
                                        </View>
                                        <View>
                                            <Pressable
                                            onPress={()=>{
                                                confirmDelete(key)
                                            }} 
                                            >
                                                <Ionicons name="trash" size={24}/>
                                            </Pressable>
                                        </View>
                                    </View>
                                </Pressable>
                            )
                        })
                    ):(
                    <View
                    style={{height:400,...globalStyle.displayItemInCenter}}
                    >
                        <Text style={globalStyle.primaryTextStyle}
                        >Scan history is empty</Text>
                    </View>
                    )
                )
            }
        </ScrollView>
    )
}