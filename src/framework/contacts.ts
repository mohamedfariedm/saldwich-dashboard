import { routes } from '@/config/routes';
import client from '@/framework/utils';
import { useQuery } from '@tanstack/react-query';

export function useContacts() {
  return useQuery<any, Error>({
    queryKey: [routes.contacts.index],
    queryFn: () => client.contacts.all(),
  });
};
