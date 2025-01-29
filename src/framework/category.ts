import { useQuery, useMutation, useQueryClient  } from '@tanstack/react-query';
import client from '@/framework/utils';
import toast from 'react-hot-toast';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { routes } from '@/config/routes';

export function useCategory() {

  return useQuery<any, Error>({queryKey: [routes.categorie.index], queryFn: () => client.categorie.all()});
};


export const useCreateCategory = () => {

  const queryClient = useQueryClient();
  const { closeModal } = useModal();

  const {mutate, isPending} = useMutation({
    mutationFn: client.categorie.create,
    onSuccess() {
      queryClient.invalidateQueries({queryKey: [routes.categorie.index]})
      toast.success('category created successfully')
      closeModal()
    },
    onError: (error) => {
      toast.error(`Error ${error?.message}`)
    }
  })

  return { mutate, isPending}
}

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  const { closeModal } = useModal();
  return useMutation({
    mutationFn: client.categorie.update,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [routes.categorie.index]})
      toast.success('category updated successfully')
      closeModal()
    },
    onError: (error) => {
      toast.error(`Error ${error?.message}`)
    }
  })
}

export const useDeleteCategory = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: client.categorie.delete,
      onSuccess: () => queryClient.invalidateQueries({queryKey: [routes.categorie.index]}),
      onError: (error) => {
        toast.error(`Error ${error?.message}`)
      }
    })
}