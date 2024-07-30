import { Alert, Platform, ToastAndroid } from "react-native"
import Toast from "react-native-toast-message"

export const showMessage=(tag:string,messsage:string)=>{
    console.log(tag+': '+messsage)
}

export const showToast = (message: string,type:string) => {
      Toast.show({
        type: type, // or 'error', 'info'
        position: 'bottom', // or 'bottom'
        text1: message,
        
      });
}