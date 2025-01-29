import { useQuery, useQueryClient  } from '@tanstack/react-query';
import client from '@/framework/utils'
import toast from 'react-hot-toast';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { routes } from '@/config/routes';

export function useAllFilter() {
    return useQuery<any, Error>({queryKey: ['filter_request'], queryFn: () => client.setting.reportFilter()})
  }
export function useUserRole() {
    return useQuery<any, Error>({queryKey: ['role_request'], queryFn: () => client.setting.roleRequest()})
  }
export function useAllStores() {
    return useQuery<any, Error>({queryKey: ['stores_request'], queryFn: () => client.setting.allStores()})
  }
  
  export function useAllActiveUsers(role: string) {
    return useQuery<any, Error>({queryKey: ['get_active_users_with_role', role], queryFn: () => client.setting.allUsersActive(role)})
  }
  export function useUsersByRole(role:string []) {
    return useQuery<any, Error>({queryKey: ['get_users_with_role',role], queryFn: () => client.setting.allUsersByRole(role)})
  }
  export function useRole() {
    return useQuery<any, Error>({queryKey: ['get_role'], queryFn: () => client.setting.allRoles()})
  }

  export function useEmployLocation(params: string){
    return useQuery<any, Error>({queryKey: ['google_map_request',params], queryFn: () => client.setting.locations(params),refetchInterval: 300000})
  }
  export function useAttendesLocation(params: string,type:string){
    
    return useQuery<any, Error>({queryKey: ['google_attendans_request',params], queryFn: () => client.setting.attendansLocations(params,type),refetchInterval: 300000})
  }

