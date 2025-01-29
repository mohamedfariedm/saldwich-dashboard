import { HttpClient } from './request';
import {
  CreateRuleInput,
  UserInput,
  Region,
  City,
  Retailer,
  Store,
  LoginInput,
  AuthResponse,
  Category,
  Journey,
  Products,
  stock,
  Target,
  Inquerie,
  notifications,
  Level,
} from '@/types';
import { routes } from '@/config/routes';
import { CreateBrandInput } from '@/utils/validators/create-brand.schema ';
import { CreateToDoInput } from '@/utils/validators/create-todo.schema';
import { BrandFormInput } from '@/utils/validators/Brand-form.schema copy';
import { BranchFormInput } from '@/utils/validators/branch-form.schema';

///////////////////////////////////////////////////////////
//            ?? all HTTpClient in Project
///////////////////////////////////////////////////////////

class Client {
  auth = {
    login: (variables: LoginInput) => {
      return HttpClient.post<AuthResponse>(`/login`, variables);
    },
    logout: () => {
      return HttpClient.post<any>('/logout', {});
    },
    phonePost: (input: { phone: string }) =>
      HttpClient.post(`forget_password_request`, input),
    verificationPost: (input: { phone: string; verification_code: string }) =>
      HttpClient.post(`verify_account`, input),
    changePassword: (input: { phone: string; password: string }) =>
      HttpClient.post(`change_password`, input),
  };

  roles = {
    all: (param: string) =>
      HttpClient.get(`${routes.roles.index}/index?${param}`),
    create: (input: CreateRuleInput) =>
      HttpClient.post(`${routes.roles.index}/store`, input),
    permissions: () => HttpClient.get('/roles/create'),
    delete: (input: { role_id: number[] }) =>
      HttpClient.post(`${routes.roles.index}/delete`, input),
    findOne: (id: number) => HttpClient.get('/roles/edit', { role_id: id }),
    update: (input: { role_id: string; name: string; permission: number[] }) =>
      HttpClient.post(`${routes.roles.index}/update`, input),
  };
  brands = {
    all: () => HttpClient.get('/Brand'),
    allAgin: (param: string) => HttpClient.get(`/brands/index?${param}`),
    create: (input: BrandFormInput) => HttpClient.post('/Brand', input),
    delete: (input: { brand_id: number[] }) =>
      HttpClient.delete(`/Brand/${input.brand_id}`),
    findOne: (id: number) => HttpClient.get('/brands/edit', { brand_id: id }),
    update: (input: { brand_id: string; name: any; image: any }) =>
      HttpClient.put(`/Brand/${input.brand_id}`, input),
  };
  categorie = {
    all: () => HttpClient.get('/Category/getAll'),
    create: (input: any) => HttpClient.post('/Category', input),
    delete: (input: { brand_id: number[] }) =>
      HttpClient.delete(`/Category/${input.brand_id}`),
    update: (input:any) =>
      HttpClient.put(`/Category/${input.brand_id}`, input),
  };
  clientReview = {
    all: () => HttpClient.get('/ClientReview'),
    create: (input: {name: string; image: any;position:string;test:string }) => HttpClient.post('/ClientReview', input),
    delete: (input: { brand_id: number[] }) =>
      HttpClient.delete(`/ClientReview/${input.brand_id}`),
    update: (input: { brand_id: string; name: string; image: any;position:string;test:string }) =>
      HttpClient.put(`/ClientReview/${input.brand_id}`, input),
  };
  services = {
    all: (param:string) => HttpClient.get(`/Service?type=${param}`),
    create: (input: any) => HttpClient.post('/Service', input),
    delete: (input: { brand_id: number[] }) =>
      HttpClient.delete(`/Service/${input.brand_id}`),
    update: (input:any) =>
      HttpClient.put(`/Service/${input.brand_id}`, input),
  };
  product = {
    all: () => HttpClient.get(`/Product`),
    create: (input: any) => HttpClient.post('/Product', input),
    delete: (input: { brand_id: number[] }) =>
      HttpClient.delete(`/Product/${input.brand_id}`),
    update: (input:any) =>
      HttpClient.put(`/Product/${input.brand_id}`, input),
  };
  branche = {
    all: () => HttpClient.get('/Branch'),
    create: (input: {name: any; phone:number;address:string;longitude:number;latitude:number}) => HttpClient.post('/Branch', input),
    delete: (input: { brand_id: number[] }) =>
      HttpClient.delete(`/Branch/${input.brand_id}`),
    // findOne: (id: number) => HttpClient.get('/Branch/edit', { brand_id: id }),
    update: (input: { brand_id: string; name: any; phone:number;address:string;longitude:number;latitude:number}) =>
      HttpClient.put(`/Branch/${input.brand_id}`, input),
  };
  reports = {
    all: () => HttpClient.get('/reports'),
    create: (input: any) => HttpClient.post('/reports', input),
    delete: (input: { brand_id: number[] }) =>
      HttpClient.delete(`/reports/${input.brand_id}`),
    update: (input: any) => HttpClient.put(`/reports/${input.id}`, input),
  };
  registrationFormCategories = {
    all: () => HttpClient.get('/RegistrationForm'),
    create: (input: any) => HttpClient.post('/RegistrationForm', input),
    delete: (input: { brand_id: number[] }) =>
      HttpClient.delete(`/RegistrationForm/${input.brand_id}`),
    update: (input: any) =>
      HttpClient.put(`/RegistrationForm/${input.id}`, input),
  };
  incubators = {
    all: () => HttpClient.get('/incubators'),
    create: (input: any) => HttpClient.post('/incubators', input),
    delete: (input: { brand_id: number[] }) =>
      HttpClient.delete(`/incubators/${input.brand_id}`),
    update: (input: any) => HttpClient.put(`/incubators/${input.id}`, input),
  };
  PreviousIncubators = {
    all: () => HttpClient.get('/previous-incubators'),
    create: (input: any) => HttpClient.post('/previous-incubators', input),
    delete: (input: { brand_id: number[] }) =>
      HttpClient.delete(`/previous-incubators/${input.brand_id}`),
    update: (input: any) =>
      HttpClient.put(`/previous-incubators/${input.id}`, input),
  };
  teams = {
    all: () => HttpClient.get('/teams'),
    create: (input: any) => HttpClient.post('/teams', input),
    delete: (input: { brand_id: number[] }) =>
      HttpClient.delete(`/teams/${input.brand_id}`),
    update: (input: any) => HttpClient.put(`/teams/${input.id}`, input),
  };

  partners = {
    all: () => HttpClient.get('/partners'),
    create: (input: any) => HttpClient.post('/partners', input),
    delete: (input: { brand_id: number[] }) =>
      HttpClient.delete(`/partners/${input.brand_id}`),
    update: (input: any) => HttpClient.put(`/partners/${input.id}`, input),
  };
  MediaCenter = {
    all: (type: string) => HttpClient.get('/media?type=' + type),
    create: (input: any) => HttpClient.post('/media', input),
    delete: (input: { brand_id: number[] }) =>
      HttpClient.delete(`/media/${input.brand_id}`),
    update: (input: any) => HttpClient.put(`/media/${input.id}`, input),
  };
  faqs = {
    all: () => HttpClient.get('/faqs'),
    create: (input: any) => HttpClient.post('/faqs', input),
    delete: (input: { brand_id: number[] }) =>
      HttpClient.delete(`/faqs/${input.brand_id}`),
    update: (input: any) => HttpClient.put(`/faqs/${input.id}`, input),
  };
  contacts = {
    all: () => HttpClient.get('/contacts'),
  };
  newsletterList = {
    all: () => HttpClient.get('/newsletter'),
  };
  ApplicationForm = {
    all: () => HttpClient.get('/Service'),
    single: (id: number) => HttpClient.get(`/Service/${id}`),
  };
  RegistrationFormList = {
    all: () => HttpClient.get('/users'),
    single: (id: number) => HttpClient.get(`/users/${id}`),
  };
  SiteSettings = {
    all: () => HttpClient.get('/setting'),
    update: (input: any) => HttpClient.put(`/setting`, input),
  };
  pages = {
    all: (param: string) => HttpClient.get(`${routes.pages.index}/${param}`),
    sections: (param: string) =>
      HttpClient.get(`${routes.sections.index}/${param}`),
    postes: (param: string) =>
      HttpClient.get(`${routes.posts.index}?section_id=${param}`),
    spacificPage: (param: string) =>
      HttpClient.get(`${routes.pages.index}/${param}`),
    update: (input: {
      title: {};
      description?: {};
      attachment: any;
      section_id: string;
      id: number;
      additional?: {};
      children?:any;
    }) => HttpClient.put(`/posts/${input.id}`, input),
    updatePage: (input: {
      title: {};
      description?: {};
      attachment: any;
      section_id: string;
      id: number;
      additional?: {};
      children?:any;
    }) => HttpClient.put(`/pages/${input.id}`, input),
    edit: (input: { section_id: string; page_id: number; active: number;priority:number }) =>
      HttpClient.put(`/sections/${input.section_id}`, input),

    // allAgin: (param:string) => HttpClient.get(`/brands/index?${param}`),
    // create: (input: BrandFormInput) => HttpClient.post('/brands/store', input),
    // delete: (input: {brand_id: number[]}) => HttpClient.post('/brands/delete', input),
    // findOne: (id: number) => HttpClient.get('/brands/edit', {brand_id: id}),
    // update: (input: {brand_id: string ,name: string,image:any}) => HttpClient.post('/brands/update', input)
  };

  toDoList = {
    all: (param: string) => HttpClient.get(`review_points/index?${param}`),
    create: (input: CreateToDoInput) =>
      HttpClient.post('/review_points/store', input),
    delete: (input: { point_id: number[] }) =>
      HttpClient.post('/review_points/delete', input),
    findOne: (id: number) =>
      HttpClient.get('/review_points/edit', { point_id: id }),
    update: (input: { title: string; description: string; point_id: string }) =>
      HttpClient.post('/review_points/update', input),
  };

  users = {
    all: (param: string) =>
      HttpClient.get(`${routes.users.index}`),
    findeOne: (id: string) =>
      HttpClient.get(`${routes.users.index}/edit?user_id=${id}`),
    update: (input: UserInput) =>
      HttpClient.post(`${routes.users.index}/update`, input),
    create: (input: UserInput) =>
      HttpClient.post(`${routes.users.index}/store`, input),
    delete: (input: { user_id: number[] }) =>
      HttpClient.post(`${routes.users.index}/delete`, input),
  };

  regions = {
    all: (param: string) =>
      HttpClient.get(`${routes.regions.index}/index?${param}`),
    create: (input: Region) =>
      HttpClient.post(`${routes.regions.index}/store`, input),
    update: (input: Region) =>
      HttpClient.post(`${routes.regions.index}/update`, input),
    delete: (input: { region_id: number[] }) =>
      HttpClient.post(`${routes.regions.index}/delete`, input),
  };
  levels = {
    all: (param: string) =>
      HttpClient.get(`${routes.levels.index}/index?${param}`),
    create: (input: Level) =>
      HttpClient.post(`${routes.levels.index}/store`, input),
    update: (input: Level) =>
      HttpClient.post(`${routes.levels.index}/update`, input),
    delete: (input: { level_id: number[] }) =>
      HttpClient.post(`${routes.levels.index}/delete`, input),
  };

  cities = {
    all: (param: string) =>
      HttpClient.get(`${routes.cities.index}/index?${param}`),
    create: (input: City) =>
      HttpClient.post(`${routes.cities.index}/store`, input),
    update: (input: City) =>
      HttpClient.post(`${routes.cities.index}/update`, input),
    delete: (input: { city_id: number[] }) =>
      HttpClient.post(`${routes.cities.index}/delete`, input),
  };

  retailers = {
    all: (param: string) =>
      HttpClient.get(`${routes.retailers.index}/index?${param}`),
    create: (input: Retailer) =>
      HttpClient.post(`${routes.retailers.index}/store`, input),
    update: (input: Retailer) =>
      HttpClient.post(`${routes.retailers.index}/update`, input),
    delete: (input: { retailer_id: number[] }) =>
      HttpClient.post(`${routes.retailers.index}/delete`, input),
  };
  generalcrud = {
    all: (param: string) => HttpClient.get(`/all_settings?category=${param}`),
    update: (input: any) => HttpClient.post(`/update_settings`, input),
    // create: (input: Retailer) => HttpClient.post(`${routes.retailers.index}/store`, input),
    // delete: (input: {retailer_id: number[]}) => HttpClient.post(`${routes.retailers.index}/delete`, input)
  };

  stores = {
    all: (param: string) =>
      HttpClient.get(`${routes.stores.index}/index?${param}`),
    create: (input: Store) =>
      HttpClient.post(`${routes.stores.index}/store`, input),
    update: (input: Store) =>
      HttpClient.post(`${routes.stores.index}/update`, input),
    delete: (input: { store_id: number[] }) =>
      HttpClient.post(`${routes.stores.index}/delete`, input),
  };
  features_categories = {
    all: (param: string) =>
      HttpClient.get(`${routes.features_categories.index}/index?${param}`),
    create: (input: { name: string; is_active: number; level_id: number }) =>
      HttpClient.post(`${routes.features_categories.index}/store`, input),
    update: (input: {
      name: string;
      is_active: number;
      category_id: any;
      level_id: number;
    }) => HttpClient.post(`${routes.features_categories.index}/update`, input),
    delete: (input: { category_id: number[] }) =>
      HttpClient.post(`${routes.features_categories.index}/delete`, input),
  };
  features = {
    all: (param: string) =>
      HttpClient.get(`${routes.features.index}/index?${param}`),
    getCategories: () => HttpClient.get(`${routes.features.index}/create`),
    create: (input: {
      name: string;
      is_active: number;
      category_id: number[];
    }) => HttpClient.post(`${routes.features.index}/store`, input),
    update: (input: {
      name: string;
      is_active: number;
      category_id: any;
      feature_id: number;
    }) => HttpClient.post(`${routes.features.index}/update`, input),
    delete: (input: { feature_id: number[] }) =>
      HttpClient.post(`${routes.features.index}/delete`, input),
  };
  // categories = {
  //     all: () => HttpClient.get(`${routes.categories.index}/index`),
  //     allParent: () => HttpClient.get(`${routes.categories.index}/create`),
  //     create: (input: Category) => HttpClient.post(`${routes.categories.index}/store`, input),
  //     update: (input : Category) => HttpClient.post(`${routes.categories.index}/update`, input) ,
  //     delete: (input: {category_id: number[]}) => HttpClient.post(`${routes.categories.index}/delete`, input)
  // }

  mainCategories = {
    all: (type: string, params: string) =>
      HttpClient.get(
        `${routes.mainCategories.index}/new_index_categories?type=${type}&${params}`
      ),
    allParent: (type: any) =>
      HttpClient.get(`/sub_categories_of_category?category=${Number(type)}`),
    create: (input: Category) =>
      HttpClient.post(`${routes.mainCategories.index}/store_category`, input),
    update: (input: Category) =>
      HttpClient.post(`${routes.mainCategories.index}/update`, input),
    delete: (input: { category_id: number[] }) =>
      HttpClient.post(`${routes.mainCategories.index}/delete`, input),
    filterAll: () => HttpClient.get('/all_categories'),
  };
  journeys = {
    all: (param: string) =>
      HttpClient.get(`${routes.journeys.index}/index?${param}`),
    findAllData: () => HttpClient.get(`${routes.journeys.index}/create`),
    findOne: (id: string) =>
      HttpClient.get(`${routes.journeys.index}/edit?journey_id=${id}`),
    create: (input: Journey) =>
      HttpClient.post(`${routes.journeys.index}/store`, input),
    update: (input: Journey) =>
      HttpClient.post(`${routes.journeys.index}/update`, input),
    delete: (input: { journey_id: number[] }) =>
      HttpClient.post(`${routes.journeys.index}/delete`, input),
  };
  inquerie = {
    all: (param: string) =>
      HttpClient.get(`${routes.inquiries.index}/index?${param}`),
    update: (input: Inquerie) =>
      HttpClient.post(`${routes.inquiries.index}/update`, input),
    findOne: (id: number) =>
      HttpClient.get(`${routes.inquiries.index}/edit?inquiry_id=${id}`),
    // findAllData: () => HttpClient.get(`${routes.journeys.index}/create`),
    // create: (input: Journey) => HttpClient.post(`${routes.journeys.index}/store`, input),
    // delete: (input: {journey_id: number[]}) => HttpClient.post(`${routes.journeys.index}/delete`, input)
  };

  products = {
    all: (param: string) =>
      HttpClient.get(`${routes.products.index}/index?${param}`),
    findAllData: () => HttpClient.get(`${routes.products.index}/create`),
    findSpacifcData: (id: number) => HttpClient.get(`/features?BU_id=${id}`),
    create: (input: Products) =>
      HttpClient.post(`${routes.products.index}/store`, input),
    update: (input: Products) =>
      HttpClient.post(`${routes.products.index}/update`, input),
    delete: (input: { product_id: number[] }) =>
      HttpClient.post(`${routes.products.index}/delete`, input),
  };
  notifications = {
    all: (param: string) =>
      HttpClient.get(`${routes.notifications.index}/index?${param}`),
    findAllData: () => HttpClient.get(`${routes.notifications.index}/create`),
    create: (input: notifications) =>
      HttpClient.post(`${routes.notifications.index}/store`, input),
    // update: (input : Products) => HttpClient.post(`${routes.products.index}/update`, input) ,
    // delete: (input: {product_id: number[]}) => HttpClient.post(`${routes.products.index}/delete`, input)
  };

  checkin = {
    all: (options: any) => HttpClient.get(`${routes.chickIn.index}?${options}`),
    findOne: (id: number) => HttpClient.get(`specific_check_in_out?id=${id}`),
  };

  stock = {
    all: (params: string) =>
      HttpClient.get(`${routes.stock.index}/index?${params}`),
    findAll: () => HttpClient.get(`${routes.stock.index}/create`),
    create: (input: stock) =>
      HttpClient.post(`${routes.stock.index}/store`, input),
    update: (input: stock) =>
      HttpClient.post(`${routes.stock.index}/update`, input),
  };

  setting = {
    reportFilter: () => HttpClient.get('/filter_request'),
    roleRequest: () => HttpClient.get('/user_permissions'),
    allStores: () => HttpClient.get('/users/create'),
    allUsersActive: (role: string) =>
      HttpClient.get(`/get_users_with_role?role=${role}`),
    allUsersByRole: (role: string[]) =>
      HttpClient.post(`/get_users_with_role`, { role: role }),
    allRoles: () => HttpClient.get(`/roles/index`),
    locations: (params: string) =>
      HttpClient.get(`/google_map_request?${params}`),
    attendansLocations: (params: string, type: string) => {
      return HttpClient.get(`/day_visit?type=${type}&${params}`);
    },
  };

  stockPrcess = {
    all: (params: string) =>
      HttpClient.get(`${routes.stockPrcess.index}/index?${params}`),
    findOne: (id: number) =>
      HttpClient.get(`${routes.stockPrcess.index}/view?process_id=${id}`),
  };

  sales = {
    all: (params: string) =>
      HttpClient.get(`${routes.sales.index}/index?${params}`),
  };

  benchmark = {
    all: (params: string) =>
      HttpClient.get(`${routes.benchmark.index}?${params}`),
    findOne: (id: number) =>
      HttpClient.get(`/specific_benchmark_report?id=${id}`),
  };
  level_benchmark = {
    all: (params: string) =>
      HttpClient.get(`${routes.level_benchmark.index}?${params}`),
    findOne: (id: number) =>
      HttpClient.get(`/specific_benchmark_report?id=${id}`),
  };

  launchedModel = {
    all: (params: string) =>
      HttpClient.get(`${routes.launchedModel.index}?${params}`),
    findOne: (id: number) =>
      HttpClient.get(`/specific_launched_models_report?id=${id}`),
  };

  instore = {
    all: (params: string) =>
      HttpClient.get(`/InstorePromotion_report?${params}`),
    findOne: (id: number) =>
      HttpClient.get(`/specific_InstorePromotion_report?id=${id}`),
  };
  logRequest = {
    all: (params: string) =>
      HttpClient.get(`${routes.logRequest.index}/index?${params}`),
    findOne: (id: number) => HttpClient.get(`/log_requests/view?log_id=${id}`),
  };
  sampling = {
    all: (params: string) => HttpClient.get(`/Sampling_report?${params}`),
    findOne: (id: number) =>
      HttpClient.get(`/specific_Sampling_report?id=${id}`),
  };

  salesChart = {
    all: (type: string, params: string) =>
      HttpClient.get(`${routes.salesChart.index}?chart_type=${type}&${params}`),
  };
  allChart = {
    all: (type: string, params: string) =>
      HttpClient.get(`${routes.allChart.index}?group_by=${type}&${params}`),
    orderValue: () => HttpClient.get(`/sales_and_orders_values`),
  };
  soldChart = {
    all: (type: string, typeFor: string, params: string) =>
      HttpClient.get(
        `${routes.sold.index}?group_by=${type}&chart_for=${typeFor}&${params}`
      ),
    // orderValue: () => HttpClient.get(`/sales_and_orders_values`)
  };
  rspTraker = {
    all: (type: string, typeFor: string, params: string) =>
      HttpClient.get(
        `${routes.rspTraker.index}?group_by=${type}&chart_for=${typeFor}&${params}`
      ),
    // orderValue: () => HttpClient.get(`/sales_and_orders_values`)
  };

  newInstalledPOSM = {
    all: (params: string) =>
      HttpClient.get(`${routes.newInstalledPOSM.index}?${params}`),
    findOne: (id: number) =>
      HttpClient.get(`/specific_NewInstalledPOSM_report?id=${id}`),
  };
  newInstalledSoftPOSM = {
    all: (params: string) =>
      HttpClient.get(`${routes.newInstalledSoftPOSM.index}?${params}`),
    findOne: (id: number) =>
      HttpClient.get(`/specific_NewInstalledSoftPOSM_report?id=${id}`),
  };

  targets = {
    all: (param: string) =>
      HttpClient.get(`${routes.targets.index}/index?${param}`),
    findAll: () => HttpClient.get(`${routes.targets.index}/create`),
    create: (input: Target) =>
      HttpClient.post(`${routes.targets.index}/store`, input),
    update: (input: Target) =>
      HttpClient.post(`${routes.targets.index}/update`, input),
    delete: (input: { target_id: number[] }) =>
      HttpClient.post(`${routes.targets.index}/delete`, input),
  };

  salesTargetChart = {
    all: (type: string, params: string) =>
      HttpClient.get(
        `${routes.salesTargetChart.index}?chart_type=${type}&${params}`
      ),
  };

  salesTargetTable = {
    all: (type: string, params: string) =>
      HttpClient.get(`${routes.salesTargetTable.index}?${params}`),
  };
}

export default new Client();
