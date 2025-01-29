'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Password } from '@/components/ui/password';
import { SubmitHandler } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Text } from '@/components/ui/text';
import { routes } from '@/config/routes';
import { useRouter } from 'next/navigation'
import { forgetPasswordSchema, ForgetPasswordSchema } from '@/utils/validators/forget-password-by-confirmation';
import { useMedia } from 'react-use';
import toast from 'react-hot-toast';
import { useGetCode, useGetConfirmation } from '@/framework/auth';

const initialValues = {
  phone: '',
};
export default function ForgetPasswordForm() {
  const router = useRouter()

  const[phoneNumber,setPhonenumber]=useState("")
  const isMedium = useMedia('(max-width: 1200px)', false);
  const [reset, setReset] = useState({});
  const { mutate: code,isPending } = useGetConfirmation();

  const onSubmit: SubmitHandler<ForgetPasswordSchema> = (data) => {
    code({
      phone:data.phone,
      password:data.password,
    })
    setReset(initialValues);
  };
  return (
    <>
      <Form<ForgetPasswordSchema>
        validationSchema={forgetPasswordSchema}
        resetValues={reset}
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues: initialValues,
        }}
      >
        {({ register, formState: { errors } }) => (
          <div className="space-y-5">
            <Input
              type="number"
              size={isMedium ? 'lg' : 'xl'}
              label="Phone Number "
              placeholder="Enter your Phone Number"
              rounded="pill"
              color="info"
              className="[&>label>span]:font-medium"
              {...register('phone')}
              error={errors.phone?.message as string}
            />
            <Password
              size={isMedium ? 'lg' : 'xl'}
              label="New Password"
              placeholder="Enter your new Password"
              rounded="pill"
              color="info"
              className="[&>label>span]:font-medium"
              {...register('password')}
              error={errors.password?.message as string}
            />
             <Password
                   size={isMedium ? 'lg' : 'xl'}
                   label="Confirm New Password "
                   placeholder="Enter confirm Password "
                   rounded="pill"
                   color="info"
                   className="[&>label>span]:font-medium"
                    {...register('confirmPassword')}
                    error={errors.confirmPassword?.message}
                    />
            <Button
              className="w-full border-2 border-primary-light text-base font-medium"
              type="submit"
              isLoading={isPending}
              size={isMedium ? 'lg' : 'xl'}
              color="info"
              rounded="pill"
            >
              Reset Password
            </Button>
          </div>
        )}
      </Form>
      <Text className="mt-6 text-center text-[15px] leading-loose text-gray-500 lg:mt-8 lg:text-start xl:text-base">
        Don’t want to reset your password?{' '}
        <Link
          href={routes.auth.signIn1}
          className="font-bold text-gray-700 transition-colors hover:text-blue"
        >
          Sign In
        </Link>
      </Text>
    </>
  );
}































































// 'use client';

// import Link from 'next/link';
// import { useState } from 'react';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import { Password } from '@/components/ui/password';
// import { SubmitHandler } from 'react-hook-form';
// import { Form } from '@/components/ui/form';
// import { Text } from '@/components/ui/text';
// import { routes } from '@/config/routes';
// import {
//   resetPasswordSchema,
//   ResetPasswordSchema,
// } from '@/utils/validators/reset-password.schema';

// const initialValues = {
//   email: '',
//   password: '',
//   confirmPassword: '',
// };

// export default function ForgetPasswordForm() {
//   const [reset, setReset] = useState({});

//   const onSubmit: SubmitHandler<ResetPasswordSchema> = (data) => {
//     console.log(data);
//     setReset(initialValues);
//   };

//   return (
//     <>
//       <Form<ResetPasswordSchema>
//         validationSchema={resetPasswordSchema}
//         resetValues={reset}
//         onSubmit={onSubmit}
//         useFormProps={{
//           mode: 'onChange',
//           defaultValues: initialValues,
//         }}
//         className="pt-1.5"
//       >
//         {({ register, formState: { errors } }) => (
//           <div className="space-y-6">
//             <Input
//               type="email"
//               size="lg"
//               label="Email"
//               placeholder="Enter your email"
//               className="[&>label>span]:font-medium"
//               color="info"
//               inputClassName="text-sm"
//               {...register('email')}
//               error={errors.email?.message}
//             />
//             <Password
//               label="Password"
//               placeholder="Enter your password"
//               size="lg"
//               className="[&>label>span]:font-medium"
//               color="info"
//               inputClassName="text-sm"
//               {...register('password')}
//               error={errors.password?.message}
//             />
//             <Password
//               label="Confirm Password"
//               placeholder="Enter confirm password"
//               size="lg"
//               className="[&>label>span]:font-medium"
//               color="info"
//               inputClassName="text-sm"
//               {...register('confirmPassword')}
//               error={errors.confirmPassword?.message}
//             />
//             <Button
//               className="mt-2 w-full"
//               type="submit"
//               size="lg"
//               color="info"
//             >
//               Reset Password
//             </Button>
//           </div>
//         )}
//       </Form>
//       <Text className="mt-6 text-center text-[15px] leading-loose text-gray-500 lg:mt-8 lg:text-start xl:text-base">
//         Don’t want to reset your password?{' '}
//         <Link
//           href={routes.auth.signIn1}
//           className="font-bold text-gray-700 transition-colors hover:text-blue"
//         >
//           Sign In
//         </Link>
//       </Text>
//     </>
//   );
// }
