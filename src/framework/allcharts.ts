import { useQuery  } from '@tanstack/react-query';
import client from '@/framework/utils'
import { routes } from '@/config/routes';

export function useChartsReport(type: string, params: string) {
  return useQuery<any, Error>({queryKey: [routes.allChart.index, type, params], queryFn: () => client.allChart.all(type,params)});
};
export function useOrdersValue() {
  return useQuery<any, Error>({queryKey: ["sales_and_orders_values"], queryFn: () => client.allChart.orderValue()});
};