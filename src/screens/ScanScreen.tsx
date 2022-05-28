import React,{useState} from "react";
import {Text,TouchableOpacity,StyleSheet, Pressable} from "react-native";
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import { StackParamList } from "../navigation/StackNavigation";
import {launchImageLibrary} from 'react-native-image-picker';
import RNQRGenerator from 'rn-qr-generator';

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
        setDetectImageUri({uri: response.uri});
        RNQRGenerator.detect({uri: response.uri})
          .then((res) => {
            console.log('Detected', res);
            if (res.values.length === 0) {
              setDetectedValues(['Code not found']);
            } else {
              setDetectedValues(res.values);
            }
          })
          .catch((err) => {
            console.log('Cannot detect', err);
          });
      });
    };

    console.log(detectedValues)

    return (
      <>
        <QRCodeScanner
          onRead={onSuccess}
          flashMode={RNCamera.Constants.FlashMode.torch}

          bottomContent={
            <TouchableOpacity style={styles.buttonTouchable} onPress={onPick}>
              <Text style={styles.buttonText}>Gallery</Text>
            </TouchableOpacity>
          }
        />
        <Text style={{position:"absolute",padding:20, color:"#fff"}}>{detectedValues}</Text>
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
      padding: 16
    }
  });
  