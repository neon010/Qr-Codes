import React,{useState,useCallback} from "react"
import { View,Text,ScrollView,Pressable,Alert} from "react-native"
import { deleteCreatedQrHistory, getCreateQrCodeHistory } from "../writingFile/createdQRHistory"
import Ionicons  from 'react-native-vector-icons/Ionicons';
import { scanDataTypes } from "../utils/scanDataTypes";
import { globalStyle } from "../styles/globalStyles";
import { useFocusEffect } from '@react-navigation/native';
import { colors } from "../styles/colors";
import { truncate } from "../utils/truncateText";
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';


export const CreateHistory = ({navigation}:{navigation:any})=>{

    const [scanHistory, setScanHistory] = useState<any>({});
    const [errMsg, setErrMSg] = useState("");

    const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-3106903641712143/9234091024';


    useFocusEffect(
        useCallback(()=>{

            async function scanHistory(){
                const scanHistory = await getCreateQrCodeHistory();
                if(scanHistory.code === 200){
                    setScanHistory(scanHistory.data)
                }else{
                    setErrMSg("history is empty")
                }
    
            }
            scanHistory()
            return ()=> setScanHistory({})
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
                const createdHistory = await deleteCreatedQrHistory(id);
                if(createdHistory.data){
                    setScanHistory(createdHistory.data)
                }else{
                    setErrMSg("history is empty")
                }
            } }
        ]
    );


    return (
        <ScrollView contentContainerStyle={{marginBottom:50, paddingBottom:100}}>
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
                                onPress={()=>{
                                    navigation.navigate("SaveQrCodeSvg", {
                                        uri:scanHistory[key].uri,
                                        content:scanHistory[key].content
                                    })
                                }} 
                                key={key} style={{...globalStyle.displayItemInRow, padding:10, marginLeft:5, marginRight:5}}>
                                    <View style={{padding:10, backgroundColor:colors.primaryColor, borderRadius:5,marginRight:10}}>
                                        <Ionicons name={scanDataTypes(scanHistory[key].content).logo} size={24} color={colors.whiteColor}/>
                                    </View>
                                    <View style={{...globalStyle.displayItemInSpaceBetween,width:"88%"}}>
                                        <View>
                                            <Text style={globalStyle.primaryTextStyle}>{truncate(scanHistory[key].content)}</Text>
                                            <Text style={globalStyle.secondaryTextStyle}>{(new Date(scanHistory[key].time)).toLocaleDateString()}</Text>
                                        </View>
                                        <View>
                                            <Pressable
                                            onPress={async ()=>{
                                                confirmDelete(key)
                                            }} 
                                            >
                                                <Ionicons name="trash" size={24} color={colors.secondaryHeadingColor}/>
                                            </Pressable>
                                        </View>
                                    </View>
                                </Pressable>
                            )
                        })
                    ):(
                    <View 
                    style={{
                        height:400,...globalStyle.displayItemInCenter
                    }}
                    >
                        <Text style={globalStyle.primaryTextStyle}>Created QR history is empty</Text>
                    </View>
                    )
                )
            }
            <View style={{position:'absolute',bottom:0}}>
                <BannerAd
                  unitId={adUnitId}
                  size={BannerAdSize.FULL_BANNER }
                  requestOptions={{
                    requestNonPersonalizedAdsOnly: true,  
                  }}
                />
            </View>
        </ScrollView>
    )
}