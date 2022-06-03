import {StyleSheet} from "react-native";

export const globalStyle = StyleSheet.create({
    displayItemInRow:{
        display:'flex', 
        flexDirection: 'row',
    },
    displayItemInSpaceBetween:{
        display:'flex', 
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center'
    },
    displayItemInCenter:{
        display:'flex', 
        justifyContent: 'center',
        alignItems:'center'
    },
    displayItemInFlexEnd:{
        justifyContent:"flex-end",
        alignItems:"center",
        flexDirection:"row",
    },
    textInput:{
        padding: 10,
        borderWidth:1
    },
    textArea:{
        height: 100,
        textAlignVertical: 'top',
        padding: 10,
        borderWidth:1
    },
    marginContainer:{
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10
    }
})