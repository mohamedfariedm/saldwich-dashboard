import axios from 'axios';
import { getToken, getLocale } from './get-token';
import pickBy from 'lodash/pickBy';
import { SearchParamOptions } from '@/types/index'
import toast from 'react-hot-toast';
import { error } from 'console';
import Link from 'next/link';
import { navigate } from '@/app/shared/event-calendar/constants';





const request = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT, // TODO: take this api URL from env
  timeout: 300000000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

// Change request data/error here
request.interceptors.request.use(
  (config) => {
    const token = getToken();
    const locale = getLocale()
    //@ts-ignore
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token ? token : ''}`,
      'Accept-Language': `${locale ? locale : 'en'}`
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

function deleteCookie(param:string) {
  document.cookie = param + '=;expires=' + new Date(1970, 0, 1).toUTCString() + ';path=/'
}

export class HttpClient {
  static async get<T>(url: string, params?: unknown) {    
    const response:any = await request.get<T>(url, { params }).catch((error)=>{
      if(error.response.status==401){      
      deleteCookie("auth_token")
      // window.location.href = "https://dashboard.energizeplus.app/en/auth/login";
      // window.location.href = "https://dev-dashboard.energizeplus.app/en/auth/login";
    }
  })
  return response.data;
  }

  static async post<T>(url: string, data: unknown, options?: any) {

    const response = await request.post<T>(url, data, options);
    return response.data;
  }

  static async put<T>(url: string, data: unknown) {
    const response = await request.put<T>(url, data);
    return response.data;
  }

  static async delete<T>(url: string) {
    const response = await request.delete<T>(url);
    return response.data;
  }

  static stringifySearchQuery(values: any) {
    const parsedValues = pickBy(values);
    return Object.keys(parsedValues)
      .map((k) => {
        if (k === 'type') {
          return `${k}.slug:${parsedValues[k]};`;
        }
        if (k === 'category') {
          return `categories.slug:${parsedValues[k]};`;
        }
        if (k === 'tags') {
          return `tags.slug:${parsedValues[k]};`;
        }
        if (k === 'variations') {
          return `variations.value:${parsedValues[k]};`;
        }
        return `${k}:${parsedValues[k]};`;
      })
      .join('')
      .slice(0, -1);
  }

  static formatSearchParams(params: Partial<SearchParamOptions>) {
    return Object.entries(params)
      .filter(([, value]) => Boolean(value))
      .map(([k, v]) =>
        ['type', 'categories', 'tags', 'author', 'manufacturer'].includes(k)
          ? `${k}.slug:${v}`
          : `${k}:${v}`
      )
      .join(';');
  }
}


export default request;
