import { useQuery  } from '@tanstack/react-query';
import client from '@/framework/utils'
import { routes } from '@/config/routes';

export function useChartsReportRSP(type: string,typeFor:string, params: string) {
  return useQuery<any, Error>({queryKey: [routes.rspTraker.index, type,typeFor, params], queryFn: () => client.rspTraker.all(type,typeFor,params)});
};
// export function useOrdersValue() {
//   return useQuery<any, Error>({queryKey: ["sold"], queryFn: () => client.soldChart.orderValue()});
// };