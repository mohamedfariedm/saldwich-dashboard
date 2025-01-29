import { useQuery, useMutation, useQueryClient  } from '@tanstack/react-query';
import client from '@/framework/utils'
import toast from 'react-hot-toast';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { routes } from '@/config/routes';

export function useLevels(param:string) {

  return useQuery<any, Error>({queryKey: [routes.levels.index,param], queryFn: () => client.levels.all(param)});
};

export const useCreateLevel = () => {

    const queryClient = useQueryClient();
    const { closeModal } = useModal();
  
    const {mutate, isPending} = useMutation({
      mutationFn: client.levels.create,
      onSuccess() {
        queryClient.invalidateQueries({queryKey: [routes.levels.index]})
        toast.success('Level created successfully')
        closeModal()
      },
      onError: (error) => {
        toast.error(`Error ${error?.message}`)
      }
    })
  
    return { mutate, isPending}
  }

  export const useUpdateLevel= () => {
    const queryClient = useQueryClient();
    const { closeModal } = useModal();
  return useMutation({
      mutationFn: client.levels.update,
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey: [routes.levels.index]})
        toast.success('Level updated successfully')
        closeModal()
      },
      onError: (error) => {
        toast.error(`Error ${error?.message}`)
      }
    })
  }


  export const useDeleteLevel = () => {

    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: client.levels.delete,
      onSuccess: () => queryClient.invalidateQueries({queryKey: [routes.levels.index]}),
      onError: (error) => {
        toast.error(`Error ${error?.message}`)
      }
    })
  }