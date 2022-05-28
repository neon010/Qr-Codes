import React, { useState } from "react";
import {View, Text,Pressable, TextInput,TouchableOpacity,Image,StyleSheet} from "react-native";
import { StackParamList } from "../navigation/StackNavigation";
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Ionicons  from 'react-native-vector-icons/Ionicons';
import RNQRGenerator from 'rn-qr-generator';



type Props = NativeStackScreenProps<StackParamList>;

export const GenQrCodeScreen = ({navigation,route}:Props) =>{
    const [text, setText] = useState("")
    const [qrCodeText, setQrCodeText] = useState("");
    const [imageUri, setImageUri] = useState<any>(null);
    const [error, setError] = useState('');

    console.log(text);

    const generate = () => {
        if (!text.trim()) {
          setError('value cannot be empty');
          setText('');
          return;
        }
        RNQRGenerator.generate({
          // value: 'otpauth://totp/Example:alice@google.com?secret=JBSWY3DPEHPK3PXP&issuer=Example', // required
          value: text,
          height: 300,
          width: 300,
          base64: true,
          backgroundColor: 'white',
          color: 'black',
          correctionLevel: 'M',
          // padding: {
          //   top: 0,
          //   left: 0,
          //   bottom: 0,
          //   right: 0,
          // }
        })
          .then((response) => {
            console.log('Response:', response);
            setImageUri({uri: response.uri});
          })
          .catch((err) => console.log('Cannot create QR code', err));
      };

    return (
        <View>
            <View>
                <Pressable onPress={()=>navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24}/>
                </Pressable>
            </View>
            <TextInput
                value={text}
                placeholder="useless placeholder"
                onChangeText={(text)=>setText(text)} 
            />
            <TouchableOpacity
            onPress={generate}
            >
                <Text>Genrate</Text>
            </TouchableOpacity>
            {/* <QRCode
                value="http://awesome.link.qr"
                // size={250}
                // color="black"
                // backgroundColor="white"
                onError={(error:any) => console.log(error)}
            /> */}
            <Image style={styles.image} source={imageUri} />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
    },
    error: {
      color: 'red',
    },
    button: {
      maxWidth: 100,
      backgroundColor: '#2ea3f2',
      padding: 4,
      borderRadius: 4,
      marginLeft: 8,
    },
    buttonText: {
      color: 'white',
      padding: 2,
    },
    image: {
      backgroundColor: '#F3F3F3',
      width: 250,
      height: 250,
      borderWidth: StyleSheet.hairlineWidth,
      marginBottom: 16,
    },
    title: {
      fontSize: 18,
      paddingBottom: 10,
      textAlign: 'center',
    },
    inputContainer: {
      flexDirection: 'row',
      paddingHorizontal: 8,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 8,
    },
    input: {
      flex: 1,
      borderWidth: StyleSheet.hairlineWidth,
      padding: 4,
      borderRadius: 4,
      height: 30,
    },
    detectedValues: {
      marginBottom: 4,
    },
  });