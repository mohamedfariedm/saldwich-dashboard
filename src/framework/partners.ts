import { useQuery, useMutation, useQueryClient  } from '@tanstack/react-query';
import client from '@/framework/utils';
import toast from 'react-hot-toast';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { routes } from '@/config/routes';

export function usePartners() {

  return useQuery<any, Error>({queryKey: [routes.partners.index], queryFn: () => client.partners.all()});
};
// export function useBrands(param:string) {

//   return useQuery<any, Error>({queryKey: [routes.brands.index,param], queryFn: () => client.brands.allAgin(param)});
// };

export const useCreatepartners = () => {

  const queryClient = useQueryClient();
  const { closeModal } = useModal();

  const {mutate, isPending} = useMutation({
    mutationFn: client.partners.create,
    onSuccess() {
      queryClient.invalidateQueries({queryKey: [routes.partners.index]})
      toast.success('Partner created successfully')
      closeModal()
    },
    onError: (error) => {
      toast.error(`Error ${error?.message}`)
    }
  })

  return { mutate, isPending}
}

export const useUpdatepartners = () => {
  const queryClient = useQueryClient();
  const { closeModal } = useModal();
  return useMutation({
    mutationFn: client.partners.update,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [routes.partners.index]})
      toast.success('Partner updated successfully')
      closeModal()
    },
    onError: (error) => {
      toast.error(`Error ${error?.message}`)
    }
  })
}

export const useDeletepartners = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: client.partners.delete,
      onSuccess: () => queryClient.invalidateQueries({queryKey: [routes.partners.index]}),
      onError: (error) => {
        toast.error(`Error ${error?.message}`)
      }
    })
}