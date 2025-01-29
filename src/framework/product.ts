import { useQuery, useMutation, useQueryClient  } from '@tanstack/react-query';
import client from '@/framework/utils';
import toast from 'react-hot-toast';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { routes } from '@/config/routes';

export function useProduct() {

  return useQuery<any, Error>({queryKey: [routes.product.index], queryFn: () => client.product.all()});
};


export const useCreateProduct = () => {

  const queryClient = useQueryClient();
  const { closeModal } = useModal();

  const {mutate, isPending} = useMutation({
    mutationFn: client.product.create,
    onSuccess() {
      queryClient.invalidateQueries({queryKey: [routes.product.index]})
      toast.success('Product created successfully')
      closeModal()
    },
    onError: (error) => {
      toast.error(`Error ${error?.message}`)
    }
  })

  return { mutate, isPending}
}

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  const { closeModal } = useModal();
  return useMutation({
    mutationFn: client.product.update,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [routes.product.index]})
      toast.success('Product updated successfully')
      closeModal()
    },
    onError: (error) => {
      toast.error(`Error ${error?.message}`)
    }
  })
}

export const useDeleteProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: client.product.delete,
      onSuccess: () => queryClient.invalidateQueries({queryKey: [routes.product.index]}),
      onError: (error) => {
        toast.error(`Error ${error?.message}`)
      }
    })
}