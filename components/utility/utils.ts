import AsyncStorage from "@react-native-async-storage/async-storage";
import { showToast } from "../../utils/logger";


export async function setAsyncData(key:string, value: string){
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    showToast('error in updating','error')
  }
}
export const getAsyncData = async (key:string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
  } catch (e) {
      showToast(`error in getting ${key} data`,'error')
  }
};