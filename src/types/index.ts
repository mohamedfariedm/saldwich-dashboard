import { CouponType } from '@/config/enums';
import { string } from 'zod';

export interface Coupon {
  id: string;
  name: string;
  type: CouponType;
  slug: string;
  amount?: string;
  code?: string;
}

export interface Address {
  customerName?: string;
  phoneNumber?: string;
  country?: string;
  state?: string;
  city?: string;
  zip?: string;
  street?: string;
}

export interface GoogleMapLocation {
  lat?: number;
  lng?: number;
  street_number?: string;
  route?: string;
  street_address?: string;
  city?: string;
  state?: string;
  country?: string;
  zip?: string;
  formattedAddress?: string;
}

export type ProductColor = {
  name?: string;
  code?: string;
};

export interface CartItem {
  id: number;
  name: string;
  slug?: string;
  description?: string;
  image: string;
  color?: ProductColor | null;
  price: number;
  salePrice?: number;
  quantity: number;
  size: number;
  stock?: number;
  discount?: number;
}

export type Product = {
  id: number;
  slug?: string;
  title: string;
  description?: string;
  price: number;
  sale_price?: number;
  thumbnail: string;
  colors?: ProductColor[];
  sizes?: number[];
  base64?: string;
};

export type PosProduct = {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  salePrice: number;
  quantity: number;
  size: number;
  discount: number;
  base64?: string;
};
export interface CalendarEvent {
  id?: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  title: string;
  description?: string;
  location?: string;
}

export interface SearchParamOptions {
  type: string;
  name: string;
  categories: string;
  tags: string;
  author: string;
  price: string;
  manufacturer: string;
  status: string;
  is_active: string;
  shop_id: string;
  min_price: string;
  max_price: string;
  rating: string;
  question: string;
  notice: string;
}

export interface CreateRuleInput {
  name: string;
  permission?: number[]
}
export interface CreateBrandInput {
  name: string;
  permission?: number[]
}

export interface IPermission {
  id: number;
  name: string;
}

export interface Role {
  id: number;
  name: string;
  created_at?: Date,
}
export interface UserInput {
  user_id?: number;
  name: string;
  phone: string;
  gendor: number;
  activation?: number;
  vacation?: number;
  mac_id?: string;
  email: string;
  address: string;
  birth_date: string;
  image?:any;
  store_id?:string;
  password?:any;
  role?:any;
  Store?: any[];
  City?: any[];
  Region?: any[];
  Retailer?: any[];
}

export interface Region {
  region_id?: number;
  id?: number;
  name: string;
  en_name?: string;
  ar_name?: string;
  is_active: number;
  created_at?: Date,
}
export interface Level {
  level_id?: number;
  id?: number;
  name: string;
  en_name?: string;
  ar_name?: string;
  is_active: number;
  created_at?: Date,
}

export interface City {
  id?: number;
  city_id?: number;
  name: string;
  region_id?: number;
  is_active: number;
  created_at?: Date;
}

export interface Retailer {
  id?: number;
  retailer_id?: number;
  name: string;
  is_active: number;
  created_at?: Date;
  title?:string;
}

export interface Store {
  id?: number;
  store_id?: number;
  store_code:string;
  image?:any;
  name: string;
  is_active: number;
  region_id?: number;
  city_id: number;
  retailer_id: number;
  // channel_code: string;
  type: string;
  contact_number: string;
  address: string;
  contact_email: string;
  created_at?: Date;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface AuthResponse {
  data: {
    token: string;
    permissions: string[];
    role: string;
    id:string;
  }
}

export interface Category {
  id?: string;
  name: string;
  is_active: number;
  priority: string;
  category_id?: string | null;
  created_at?: Date;
  en_name?: string;
  ar_name?: string;
  parent_category?: string | null;
  type?:string;
  grand_parent_category?:any;
}

export interface Journey {
  id?: string;
  store_id?: Number;
  user_id?: number;
  priority?: string;
  shifts_count?: string;
  date?: string;
  date_from?: string;
  date_to?: string;
  journey_id?: string;
  retailer_id?: number;
  check_out?: number;
  parent_category?: string;
}
export interface Inquerie {
  inquiry_id:string,
  response:string,
  seen:string
}
export interface features_categories {
  name: string;
  is_active: number;
  category_id?: string | null;
}

export interface Products {
  id?: number;
  product_id?: number;
  level_id?: number;
  category_id: number;
  sub_category_id?: number;
  sub_sub_category_id?: number;
  brand_id: number;
  barcode: string;
  model: string;
  sku_code:string;
  description: string;
  features?: number[];
  image?:any;
  is_active:number;
}
export interface stock {
  product_id?: number;
  store_id:number;
  price:any;
  quentity:any;
  discount:any;
  stock_id?:number;
}

export interface Target {
  target_id?: number;
  store_id: number;
  product_id: number;
  tgt_quentity: string;
  tgt_value: string;
  last_year_achived_quantity:string;
  last_year_achived_value:string;
  week:string;
  year:string;
}
export interface notifications {
  users_type:string,
  title:string,
  body:string,
  image?:string,
  users?:any,
}