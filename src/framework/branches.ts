import { useQuery, useMutation, useQueryClient  } from '@tanstack/react-query';
import client from '@/framework/utils';
import toast from 'react-hot-toast';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { routes } from '@/config/routes';

export function useBranch() {

  return useQuery<any, Error>({queryKey: [routes.branches.index], queryFn: () => client.branche.all()});
};
// export function useBranches(param:string) {

//   return useQuery<any, Error>({queryKey: [routes.branches.index,param], queryFn: () => client.branche.allAgin(param)});
// };

export const useCreateBranch = () => {

  const queryClient = useQueryClient();
  const { closeModal } = useModal();

  const {mutate, isPending} = useMutation({
    mutationFn: client.branche.create,
    onSuccess() {
      queryClient.invalidateQueries({queryKey: [routes.branches.index]})
      toast.success('Brand created successfully')
      closeModal()
    },
    onError: (error) => {
      toast.error(`Error ${error?.message}`)
    }
  })

  return { mutate, isPending}
}

export const useUpdateBranch = () => {
  const queryClient = useQueryClient();
  const { closeModal } = useModal();
  return useMutation({
    mutationFn: client.branche.update,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [routes.branches.index]})
      toast.success('Brand updated successfully')
      closeModal()
    },
    onError: (error) => {
      toast.error(`Error ${error?.message}`)
    }
  })
}

export const useDeleteBranch = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: client.branche.delete,
      onSuccess: () => queryClient.invalidateQueries({queryKey: [routes.branches.index]}),
      onError: (error) => {
        toast.error(`Error ${error?.message}`)
      }
    })
}