import { useQuery, useMutation, useQueryClient  } from '@tanstack/react-query';
import client from '@/framework/utils'
import { useRouter } from 'next/navigation';
import { routes } from '@/config/routes';
import { setAuthCredentials } from '@/utils/auth-utils';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';

export function useLogin() {
  const router= useRouter()
    return useMutation({
        mutationFn: client.auth.login,
        onSuccess: ({data}) => {
            if(data?.token){
              localStorage.setItem("userId",data?.id)              
                // if(data?.role == 'Admin') {
                  setAuthCredentials(data?.token);
                  router.push('/en')
                  // window.location.href = "https://dashboard.energizeplus.app/";
                  return;
                // }
              }
        },
        onError: (error) => {
            toast.error("User doesn't existed, Verify your email and password")
            setAuthCredentials('')
        }
    });
  }
  
  export function useLogout() {
    return useMutation({
        mutationFn: client.auth.logout,
        onSuccess: (data) => {
            setAuthCredentials('')
        }
    })
  }
  export const useGetPhone = () => {
    const router = useRouter()
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: client.auth.phonePost,
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ["phone confirmation"]})
        toast.success(`verification code sent to your phone`)
         router.push('/auth/verification')
      },
      onError: (error) => {
        toast.error(`User doesn't existed, Verify your phone number`)
      }
    })
}
  export const useGetCode = () => {
    const router = useRouter()
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: client.auth.verificationPost,
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ["code validation"]})
        toast.success(`verification code sent to your phone`)
        router.push('/auth/confirmation')
      },
      onError: (error) => {
        toast.error(`${error?.message}`)
      }
    })
}
  export const useGetConfirmation = () => {
    const router = useRouter()
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: client.auth.changePassword,
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ["confirmation"]})
        toast.success(`your password changed success`)
        router.push('/signin')
      },
      onError: (error) => {
        toast.error(`${error?.message}`)
      }
    })
}