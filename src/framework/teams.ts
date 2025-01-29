import { useQuery, useMutation, useQueryClient  } from '@tanstack/react-query';
import client from '@/framework/utils';
import toast from 'react-hot-toast';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { routes } from '@/config/routes';

export function useTeams() {

  return useQuery<any, Error>({queryKey: [routes.teams.index], queryFn: () => client.teams.all()});
};
// export function useBrands(param:string) {

//   return useQuery<any, Error>({queryKey: [routes.brands.index,param], queryFn: () => client.brands.allAgin(param)});
// };

export const useCreateTeam = () => {

  const queryClient = useQueryClient();
  const { closeModal } = useModal();

  const {mutate, isPending} = useMutation({
    mutationFn: client.teams.create,
    onSuccess() {
      queryClient.invalidateQueries({queryKey: [routes.teams.index]})
      toast.success('Team Member created successfully')
      closeModal()
    },
    onError: (error) => {
      toast.error(`Error ${error?.message}`)
    }
  })

  return { mutate, isPending}
}

export const useUpdateTeam = () => {
  const queryClient = useQueryClient();
  const { closeModal } = useModal();
  return useMutation({
    mutationFn: client.teams.update,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [routes.teams.index]})
      toast.success('Team Member updated successfully')
      closeModal()
    },
    onError: (error) => {
      toast.error(`Error ${error?.message}`)
    }
  })
}

export const useDeleteTeam = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: client.teams.delete,
      onSuccess: () => queryClient.invalidateQueries({queryKey: [routes.teams.index]}),
      onError: (error) => {
        toast.error(`Error ${error?.message}`)
      }
    })
}