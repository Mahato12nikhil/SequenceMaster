import axios, { AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig, AxiosHeaders } from 'axios';
import { store } from '../state/store';
import { version as appVersion } from '../package.json';

export default class RestService {
  client: AxiosInstance;

  constructor(config: AxiosRequestConfig) {
    this.client = axios.create(config);

    const reqHandler = (cfg: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
      const { token } = store.getState().token ||undefined;
      const phone = store.getState().user.userDetail?.phone;
      let url = cfg.url;
      // if (url) {
      //     if (url.includes('?')) {
      //       url = `${url}&code=${FUNCTION_APP_KEY}`;
      //     } else {
      //       url = `${url}?code=${FUNCTION_APP_KEY}`;
      //     }
      //     url = `${url}&appVersion=${appVersion}`;
      //     // if (phone) {
      //     //   url = `${url}&phone=${phone}`;
      //     // }
      //     cfg.url = url;
      //   }
      cfg.headers = new AxiosHeaders();
      
      
       if (token) {
          cfg.headers.Authorization = `Bearer ${token}`;
       }
      
      return cfg;
    };

    const errorHandler = (err: any) => {
      return Promise.reject(err);
    };
    

    this.client.interceptors.request.use(reqHandler, errorHandler);
  }

  get(endpoint: string) {
    return this.client.get<any>(endpoint);
  }

  post(endpoint: string, payload: any) {
    return this.client.post<any>(endpoint, payload);
  }
}
