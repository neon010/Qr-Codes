import {ToastAndroid} from "react-native";

export const showToastWithGravity = (msg:string) => {
    ToastAndroid.showWithGravity(
      msg,
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM
    );
};