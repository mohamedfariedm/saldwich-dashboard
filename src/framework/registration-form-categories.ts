import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import client from '@/framework/utils';
import toast from 'react-hot-toast';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { routes } from '@/config/routes';

export function useCategories() {
  return useQuery<any, Error>({
    queryKey: [routes.registrationFormCategories.index],
    queryFn: () => client.registrationFormCategories.all(),
  });
}

export const useCreateRegistrationFormCategory = () => {
  const queryClient = useQueryClient();
  const { closeModal } = useModal();

  const { mutate, isPending } = useMutation({
    mutationFn: client.registrationFormCategories.create,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [routes.registrationFormCategories.index],
      });
      toast.success('Category created successfully');
      closeModal();
    },
    onError: (error) => {
      toast.error(`Error ${error?.message}`);
    },
  });

  return { mutate, isPending };
};

export const useUpdateRegistrationFormCategory = () => {
  const queryClient = useQueryClient();
  const { closeModal } = useModal();
  return useMutation({
    mutationFn: client.registrationFormCategories.update,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [routes.registrationFormCategories.index],
      });
      toast.success('Category updated successfully');
      closeModal();
    },
    onError: (error) => {
      toast.error(`Error ${error?.message}`);
    },
  });
};

export const useDeleteRegistrationFormCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: client.registrationFormCategories.delete,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [routes.registrationFormCategories.index],
      }),
    onError: (error) => {
      toast.error(`Error ${error?.message}`);
    },
  });
};
