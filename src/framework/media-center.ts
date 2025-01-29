import { useModal } from '@/app/shared/modal-views/use-modal';
import { routes } from '@/config/routes';
import client from '@/framework/utils';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export function useMediaCenter(type:string) {
  return useQuery<any, Error>({
    queryKey: [routes.MediaCenter.index],
    queryFn: () => client.MediaCenter.all(type),
  });
}

export const useCreateMedia = () => {
  const queryClient = useQueryClient();
  const { closeModal } = useModal();

  const { mutate, isPending } = useMutation({
    mutationFn: client.MediaCenter.create,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [routes.MediaCenter.index] });
      toast.success('Media created successfully');
      closeModal();
    },
    onError: (error) => {
      toast.error(`Error ${error?.message}`);
    },
  });

  return { mutate, isPending };
};

export const useUpdateMedia = () => {
  const queryClient = useQueryClient();
  const { closeModal } = useModal();
  return useMutation({
    mutationFn: client.MediaCenter.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [routes.MediaCenter.index] });
      toast.success('Media updated successfully');
      closeModal();
    },
    onError: (error) => {
      toast.error(`Error ${error?.message}`);
    },
  });
};

export const useDeleteMedia = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: client.MediaCenter.delete,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [routes.MediaCenter.index] }),
    onError: (error) => {
      toast.error(`Error ${error?.message}`);
    },
  });
};
