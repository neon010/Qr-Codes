import React,{useState} from "react";
import {View,TouchableOpacity,StyleSheet} from "react-native";
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StackParamList } from "../navigation/StackNavigation";
import {launchImageLibrary} from 'react-native-image-picker';
import RNQRGenerator from 'rn-qr-generator';
import MaterialIcons  from 'react-native-vector-icons/MaterialIcons';
import Ionicons  from 'react-native-vector-icons/Ionicons';

import { LogBox } from 'react-native'



LogBox.ignoreLogs(['ViewPropTypes','SafeAreaProviderCompat','EnsureSingleNavigator','NavigationContainerInner']); // Ignore log notification by message
// LogBox.ignoreAllLogs(); //Ignore all log notifications

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
  const [detectImageUri, setDetectImageUri] = useState<any>(null);
  const [detectedValues, setDetectedValues] = useState<any>([]);
  const [FlashMode, setFlashMode] = useState(false)

    const onSuccess = (e:any) => {
        console.log(e.data)
        const scanData = e.data;
        navigation.navigate("SaveQrCodeData", {
          scanData
        })
    };

    const onPick = () => {
      //@ts-expect-error
      launchImageLibrary(options, (response:any) => {
        const uriPath=response.assets[0].uri;
        setDetectImageUri({uri: uriPath});
        RNQRGenerator.detect({uri: uriPath})
          .then((res) => {
            console.log('Detected', res);
            if (res.values.length === 0) {
              setDetectedValues(['Code not found']);
            } else {
              const data = res.values[0];
              setDetectedValues(data);

              navigation.navigate("SaveQrCodeData", {
                scanData:data
              })
            }
          })
          .catch((err) => {
            console.log('Cannot detect', err);
          });
      });
    };

 

    return (
      <>
        <QRCodeScanner
          onRead={onSuccess}
          reactivate={true}
          reactivateTimeout={10}
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
          flashMode={FlashMode ? RNCamera.Constants.FlashMode.on : RNCamera.Constants.FlashMode.off}
          bottomContent={
            <View style={{position:'absolute',right:70,bottom:200}}>
                <TouchableOpacity style={styles.buttonTouchable} onPress={()=> setFlashMode(!FlashMode)}>
                  <Ionicons name="md-flashlight" size={32} color="#fff"/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonTouchable} onPress={onPick}>
                  <MaterialIcons name="insert-photo" size={32} color="#fff"/>  
                </TouchableOpacity>
            </View>
          }
        />
      </>
    )
}


const styles = StyleSheet.create({
    centerText: {
      flex: 1,
      fontSize: 18,
      padding: 32,
      color: '#777'
    },
    textBold: {
      fontWeight: '500',
      color: '#000'
    },
    buttonText: {
      fontSize: 21,
      color: 'rgb(0,122,255)'
    },
    buttonTouchable: {
      padding: 16,
      borderWidth:2,
      borderColor:"green",
      backgroundColor:"green",
      borderRadius:50,
      marginBottom:15
    }
  });
  