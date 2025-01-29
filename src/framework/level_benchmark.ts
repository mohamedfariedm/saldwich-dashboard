import { useQuery, useQueryClient  } from '@tanstack/react-query';
import client from '@/framework/utils'
import { routes } from '@/config/routes';

export function useLevelBenchmarkReport(params: string) {
  return useQuery<any, Error>({queryKey: [routes.level_benchmark.index, params], queryFn: () => client.level_benchmark.all(params)});
};

export function useGetLevelBenchmarkReport(id: number) {

  return useQuery<any, Error>({queryKey: [routes.level_benchmark.index, id], queryFn: () => client.level_benchmark.findOne(id)})
}