import axios from "axios";
import { baseUrl } from "./urls";

export const AxiosService=axios.create({
    baseURL:baseUrl
})