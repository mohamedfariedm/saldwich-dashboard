import { useQuery  } from '@tanstack/react-query';
import client from '@/framework/utils'
import { routes } from '@/config/routes';

export function useChartsReportSalesTraker(type: string,typeFor:string, params: string) {
  return useQuery<any, Error>({queryKey: [routes.sold.index, type,typeFor, params], queryFn: () => client.soldChart.all(type,typeFor,params)});
};
// export function useOrdersValue() {
//   return useQuery<any, Error>({queryKey: ["sold"], queryFn: () => client.soldChart.orderValue()});
// };