import { ACTION_TYPES } from "../utils/constants";
import RestService from "./rest";
import { baseURL } from "./urls";

export const serviceClient = new RestService({baseURL: baseURL});
const getClient = () => serviceClient.client;

export const GetAppConfigAction=()=>{
    const url = `${baseURL}?actionType=${ACTION_TYPES.APP_CONFIG}`;
    return getClient().get(url) ;

}