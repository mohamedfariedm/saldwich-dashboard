import { routes } from '@/config/routes';
import client from '@/framework/utils';
import { useQuery } from '@tanstack/react-query';

export function useNewsletterList() {
  return useQuery<any, Error>({
    queryKey: [routes.newsletterList.index],
    queryFn: () => client.newsletterList.all(),
  });
}
