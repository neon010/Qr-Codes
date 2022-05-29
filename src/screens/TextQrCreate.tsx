import React,{useState} from "react";
import {View, Text, Pressable, TextInput} from "react-native";
import Ionicons  from 'react-native-vector-icons/Ionicons';
import { StackParamList } from "../navigation/StackNavigation";
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {generateQr} from "../utils/generateQr"

type Props = NativeStackScreenProps<StackParamList>;

export const TextQrCreate = ({navigation}:Props) =>{
    const [text, setText] = useState("");
    const [error,setError] = useState<any>("");
    const [imageUri, setImageUri] = useState<any>(null);


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
                    <Ionicons name="arrow-back" size={24}/>
                </Pressable>
                <Pressable onPress={async()=>{
                    const response = await generateQr(text);
                    if(response?.error){
                        //@ts-ignore
                        setError(response?.error)
                        return;
                    }

                    setImageUri(response);

                    navigation.navigate("SaveQrCodeSvg",{
                        //@ts-ignore
                        uri:response
                    })
                }}>
                    <Ionicons name="checkmark-sharp" size={24}/>
                </Pressable>
            </View>
            <View style={{justifyContent:'center', alignItems:'center'}}>
                <View style={{padding:25, borderRadius:10, marginTop:35, backgroundColor:"#ccc"}}>
                    <Text style={{color:'#fff'}}>Text</Text>
                </View>
            </View>
            <View style={{marginTop:30, marginLeft:15, marginRight:15}}>
                <TextInput
                    placeholder="Enter some text"
                    multiline={true}
                    numberOfLines={5}
                    placeholderTextColor="grey"
                    value={text}
                    onChangeText={(text)=> setText(text)}
                    style={{
                        height: 100,
                        textAlignVertical: 'top',
                        
                        padding: 10,
                        borderWidth:1
                    }}
                />
            </View>
        </View>
    )
}