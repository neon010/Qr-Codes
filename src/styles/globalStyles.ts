import {StyleSheet} from "react-native";
import { fontFamily } from "../styles/fonts";
import { colors } from "../styles/colors";

export const globalStyle = StyleSheet.create({
    displayItemInRow:{
        display:'flex', 
        flexDirection: 'row',
        alignItems:'center'
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
        borderWidth:StyleSheet.hairlineWidth,
        borderRadius:10
    },
    textArea:{
        height: 100,
        textAlignVertical: 'top',
        padding: 10,
        borderWidth:StyleSheet.hairlineWidth
    },
    marginContainer:{
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10
    },
    tabNavigationTextFocused:{
        fontFamily:fontFamily.regular,
        fontSize: 12, 
        color:colors.primaryColor
    },
    tabNavigationText:{
        fontFamily:fontFamily.regular,
        fontSize: 12, 
        color:colors.secondaryHeadingColor
    },
    primaryTextStyle:{
        color:colors.primaryheadingColor,
        fontFamily: fontFamily.bold,
        fontSize:16
    },
    secondaryTextStyle:{
        color:colors.secondaryHeadingColor,
        fontFamily: fontFamily.regular,
        fontSize:12
    },
    pilledShapeButton:{
        width:100,
        height:40,
        marginRight:10,
        borderRadius:25,
        alignItems:'center',
        justifyContent:'center'
    },
    pilledShapeButtonSave:{
        width:80, 
        height:35,
        marginRight:15, 
        backgroundColor:colors.primaryColor, 
        borderRadius:25, 
        justifyContent:"center", alignItems:"center"
    }
})