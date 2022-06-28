import React,{useEffect, useState} from "react";
import {View,TouchableOpacity,StyleSheet,Dimensions} from "react-native";
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StackParamList } from "../navigation/StackNavigation";
import {launchImageLibrary} from 'react-native-image-picker';
import RNQRGenerator from 'rn-qr-generator';
import MaterialIcons  from 'react-native-vector-icons/MaterialIcons';
import Ionicons  from 'react-native-vector-icons/Ionicons';
import { LogBox } from 'react-native'
import { addScanHistory } from "../writingFile/scanQRHistory";
import { Box } from "../components/Box";
import { colors } from "../styles/colors";
import { showToastWithGravity } from "../utils/toastAndroid";
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';


LogBox.ignoreLogs(['ViewPropTypes','SafeAreaProviderCompat','EnsureSingleNavigator','NavigationContainerInner']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

const options = {
  title: 'photoUpload',
  takePhotoButtonTitle: 'photoTake',
  chooseFromLibraryButtonTitle: 'photoLibrary',
  cancelButtonTitle: 'cancel',
  quality: 0.7,
  base64: true,
  maxWidth: 728,
  mediaType: 'photo'
};

type Props = NativeStackScreenProps<StackParamList>;

export const ScanScreen = ({navigation}:Props) =>{
  const [FlashMode, setFlashMode] = useState(false);
  const [errMsg, setErrMsg] = useState("");


    const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-3106903641712143/9234091024';



    useEffect(()=>{
      if(errMsg){
        showToastWithGravity(errMsg)
      }
    },[errMsg])



    const onSuccess = (e:any) => {
      try {
        const scanData = e.data;
        addScanHistory({scantime:new Date(),content:scanData})
        navigation.navigate("SaveQrCodeData", {
          scanData
        })
      } catch (error) {
        setErrMsg("Cannot detect value")
      }
    };

    const onPick = () => {
      try {
        //@ts-expect-error
        launchImageLibrary(options, (response:any) => {

          if(response.assets){
            const uriPath=response.assets[0].uri;

            RNQRGenerator.detect({uri: uriPath})
            .then((res) => {
              if (res.values.length === 0) {
                setErrMsg("scan value is empty")
              } else {
                const data = res.values[0];

                addScanHistory({content:data})

                navigation.navigate("SaveQrCodeData", {
                  scanData:data
                })
              }
            })
            .catch((err) => {
              setErrMsg("Cannot detect value")
            });
          }
        });
      } catch (error) {
        setErrMsg("Scanable File not found")
      }

    };


    return (
      <View style={{flex:1}}>
        <QRCodeScanner
          onRead={onSuccess}
          reactivate={true}
          reactivateTimeout={100}
          vibrate={true} 
          containerStyle={{
            margin:0,
            padding:0,
            height:"100%",
            width:"100%"
          }}
          cameraStyle={{
            margin:0,
            padding:0,
            height:"100%",
            width:"100%"
          }}
          cameraContainerStyle={{
            margin:0,
            padding:0,
            height:"100%",
            width:"100%"
          }}
          flashMode={FlashMode ? RNCamera.Constants.FlashMode.torch : RNCamera.Constants.FlashMode.off}
          bottomContent={
            <>
              <View style={{position:'absolute',bottom:80}}>
                <BannerAd
                  unitId={adUnitId}
                  size={BannerAdSize.FULL_BANNER }
                  requestOptions={{
                    requestNonPersonalizedAdsOnly: true,  
                  }}
                />
              </View>
              <View style={{position:'absolute',bottom:140}}>
                  <View style={{flexDirection:"row"}}>
                    <TouchableOpacity style={{...styles.buttonTouchable, marginRight:15}} onPress={()=> setFlashMode(!FlashMode)}>
                        <Ionicons name="md-flashlight" size={20} color={colors.whiteColor}/>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.buttonTouchable} onPress={onPick}>
                        <MaterialIcons name="insert-photo" size={20} color={colors.whiteColor}/>  
                      </TouchableOpacity>
                  </View>
              </View>
              <View style={{position:'absolute',bottom:((Dimensions.get("screen").height/2)-80)}}>
                <Box/>
              </View>
            </>
          }
        />
      </View>
    )
}


const styles = StyleSheet.create({
    buttonTouchable: {
      padding: 16,
      borderWidth:2,
      borderColor:colors.primaryColor,
      backgroundColor:colors.primaryColor,
      borderRadius:50,
      marginBottom:15
    }
  });
  