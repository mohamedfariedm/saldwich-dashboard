import { useQuery, useMutation, useQueryClient  } from '@tanstack/react-query';
import client from '@/framework/utils'
import toast from 'react-hot-toast';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { routes } from '@/config/routes';

// export function useCategories() {

//   return useQuery<any, Error>({queryKey: [routes.categories.index], queryFn: () => client.categories.all()});
// };

// export const useParentCategories = () => {

//     return useQuery<any, Error>({
//         queryKey: [routes.categories.index, 'parent'],
//         queryFn: () => client.categories.allParent()
//     })
// }

// export const useCreateCategory = () => {

//     const queryClient = useQueryClient();
//     const { closeModal } = useModal();
  
//     const {mutate, isPending} = useMutation({
//       mutationFn: client.categories.create,
//       onSettled(data, error, variables, context) {
//         queryClient.invalidateQueries({queryKey: [routes.categories.index]})
//         toast.success('Category created successfully')
//         closeModal()
//       },
//       onError: (error) => {
//         toast.error(`Error ${error?.message}`)
//       }
//     })
  
//     return { mutate, isPending}
//   }

//   export const useUpdateCategory = () => {
//     const queryClient = useQueryClient();
//     const { closeModal } = useModal();
//   return useMutation({
//       mutationFn: client.categories.update,
//       onSuccess: () => {
//         queryClient.invalidateQueries({queryKey: [routes.categories.index]})
//         toast.success('Category updated successfully')
//         closeModal()
//       },
//       onError: (error) => {
//         toast.error(`Error ${error?.message}`)
//       }
//     })
//   }


//   export const useDeleteCategory = () => {

//     const queryClient = useQueryClient();
//     return useMutation({
//       mutationFn: client.categories.delete,
//       onSuccess: () => queryClient.invalidateQueries({queryKey: [routes.categories.index]}),
//       onError: (error) => {
//         toast.error(`Error ${error?.message}`)
//       }
//     })
//   }