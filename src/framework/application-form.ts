import { routes } from '@/config/routes';
import client from '@/framework/utils';
import { useQuery } from '@tanstack/react-query';

export function useApplicationForm() {
  return useQuery<any, Error>({
    queryKey: [routes.ApplicationForm.index],
    queryFn: () => client.ApplicationForm.all(),
  });
};
export function useSingleApplicationForm(id:number) {
  return useQuery<any, Error>({
    queryKey: [routes.ApplicationForm.index],
    queryFn: () => client.ApplicationForm.single(id),
  });
};
