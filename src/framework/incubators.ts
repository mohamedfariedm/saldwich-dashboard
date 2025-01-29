import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import client from '@/framework/utils';
import toast from 'react-hot-toast';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { routes } from '@/config/routes';

export function useIncubators(PreviousIncubators?: boolean) {
  return useQuery<any, Error>({
    queryKey: [
      PreviousIncubators
        ? routes.PreviousIncubators.index
        : routes.incubators.index,
    ],
    queryFn: () =>
      PreviousIncubators
        ? client.PreviousIncubators.all()
        : client.incubators.all(),
  });
}

export const useCreateIncubators = (PreviousIncubators?: boolean) => {
  const queryClient = useQueryClient();
  const { closeModal } = useModal();

  const { mutate, isPending } = useMutation({
    mutationFn: PreviousIncubators
      ? client.PreviousIncubators.create
      : client.incubators.create,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [
          PreviousIncubators
            ? routes.PreviousIncubators.index
            : routes.incubators.index,
        ],
      });
      toast.success('Incubator created successfully');
      closeModal();
    },
    onError: (error) => {
      toast.error(`Error ${error?.message}`);
    },
  });

  return { mutate, isPending };
};

export const useUpdateIncubators = (PreviousIncubators?: boolean) => {
  const queryClient = useQueryClient();
  const { closeModal } = useModal();
  return useMutation({
    mutationFn: PreviousIncubators
      ? client.PreviousIncubators.update
      : client.incubators.update,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          PreviousIncubators
            ? routes.PreviousIncubators.index
            : routes.incubators.index,
        ],
      });
      toast.success('Incubator updated successfully');
      closeModal();
    },
    onError: (error) => {
      toast.error(`Error ${error?.message}`);
    },
  });
};

export const useDeleteIncubators = (PreviousIncubators?: boolean) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: PreviousIncubators
      ? client.PreviousIncubators.delete
      : client.incubators.delete,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [
          PreviousIncubators
            ? routes.PreviousIncubators.index
            : routes.incubators.index,
        ],
      }),
    onError: (error) => {
      toast.error(`Error ${error?.message}`);
    },
  });
};
