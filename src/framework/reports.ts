import { useQuery, useMutation, useQueryClient  } from '@tanstack/react-query';
import client from '@/framework/utils';
import toast from 'react-hot-toast';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { routes } from '@/config/routes';

export function useBrand() {

  return useQuery<any, Error>({queryKey: [routes.brands.index], queryFn: () => client.brands.all()});
};
// export function useBrands(param:string) {

//   return useQuery<any, Error>({queryKey: [routes.brands.index,param], queryFn: () => client.brands.allAgin(param)});
// };

export const useCreateReport = () => {

  const queryClient = useQueryClient();
  const { closeModal } = useModal();

  const {mutate, isPending} = useMutation({
    mutationFn: client.reports.create,
    onSuccess() {
      queryClient.invalidateQueries({queryKey: [routes.reports.index]})
      toast.success('Report created successfully')
      closeModal()
    },
    onError: (error) => {
      toast.error(`Error ${error?.message}`)
    }
  })

  return { mutate, isPending}
}

export const useUpdateReport = () => {
  const queryClient = useQueryClient();
  const { closeModal } = useModal();
  return useMutation({
    mutationFn: client.reports.update,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [routes.reports.index]})
      toast.success('Report updated successfully')
      closeModal()
    },
    onError: (error) => {
      toast.error(`Error ${error?.message}`)
    }
  })
}

export const useDeleteReport = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: client.reports.delete,
      onSuccess: () => queryClient.invalidateQueries({queryKey: [routes.reports.index]}),
      onError: (error) => {
        toast.error(`Error ${error?.message}`)
      }
    })
}