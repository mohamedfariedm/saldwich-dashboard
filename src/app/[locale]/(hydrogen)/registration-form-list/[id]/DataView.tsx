'use client';

import FormGroup from '@/app/shared/form-group';
import { Form } from '@/components/ui/form';
import { SubmitHandler } from 'react-hook-form';
import { Input } from 'rizzui';

interface user {
  id: number;
  name: string;
  email: string;
  mobile_number: string;
  type: string;
  username: string;
  name_destination: number | null;
  commercial_register: string | null;
  national_id_number: string | null;
  nationality: string | null;
  gender: string | null;
  created_at: string;
  updated_at: string;
}

export default function DataView({ data }: { data?: user }) {
  console.log('datadd', data);
  const onSubmit: SubmitHandler<user> = (data) => {};

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short',
  };
  const readableDate = (date: string) =>
    new Date(date).toLocaleString('en-US', options);

  return (
    <>
      <Form<user>
        onSubmit={onSubmit}
        className="@container"
        useFormProps={{
          mode: 'onChange',
          defaultValues: data,
          values: data,
        }}
      >
        {({ register, control, formState: { errors }, watch }) => {
          return (
            <div className="mx-auto w-full max-w-screen-2xl">
              <FormGroup
                title="Name"
                className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
              >
                <Input
                  disabled
                  type="text"
                  className="pointer-events-none col-span-full"
                  placeholder="Name"
                  {...register('name')}
                />
              </FormGroup>
              <FormGroup
                title="Email"
                className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
              >
                <Input
                  disabled
                  type="text"
                  className="pointer-events-none col-span-full"
                  placeholder="Email"
                  {...register('email')}
                />
              </FormGroup>
              <FormGroup
                title="Mobile Number"
                className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
              >
                <Input
                  disabled
                  type="text"
                  className="pointer-events-none col-span-full"
                  placeholder="Mobile Number"
                  {...register('mobile_number')}
                />
              </FormGroup>
              <FormGroup
                title="Type"
                className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
              >
                <Input
                  disabled
                  type="text"
                  className="pointer-events-none col-span-full"
                  placeholder="Type"
                  {...register('type')}
                />
              </FormGroup>
              <FormGroup
                title="Username"
                className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
              >
                <Input
                  disabled
                  type="text"
                  className="pointer-events-none col-span-full"
                  placeholder="Username"
                  {...register('username')}
                />
              </FormGroup>
              {data?.name_destination && (
                <FormGroup
                  title="Organization Name"
                  className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
                >
                  <Input
                    disabled
                    type="text"
                    className="pointer-events-none col-span-full"
                    placeholder="Organization Name"
                    {...register('name_destination')}
                  />
                </FormGroup>
              )}
              {data?.commercial_register && (
                <FormGroup
                  title="Commercial Register"
                  className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
                >
                  <Input
                    disabled
                    type="text"
                    className="pointer-events-none col-span-full"
                    placeholder="Commercial Register"
                    {...register('commercial_register')}
                  />
                </FormGroup>
              )}
              {data?.national_id_number && (
                <FormGroup
                  title="National ID Number"
                  className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
                >
                  <Input
                    disabled
                    type="text"
                    className="pointer-events-none col-span-full"
                    placeholder="National ID Number"
                    {...register('national_id_number')}
                  />
                </FormGroup>
              )}
              {data?.nationality && (
                <FormGroup
                  title="Nationality"
                  className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
                >
                  <Input
                    disabled
                    type="text"
                    className="pointer-events-none col-span-full"
                    placeholder="Nationality"
                    {...register('nationality')}
                  />
                </FormGroup>
              )}
              {data?.gender && (
                <FormGroup
                  title="Gender"
                  className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
                >
                  <Input
                    disabled
                    type="text"
                    className="pointer-events-none col-span-full"
                    placeholder="Gender"
                    {...register('gender')}
                  />
                </FormGroup>
              )}

              <FormGroup
                title="Created At"
                className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
              >
                <Input
                  disabled
                  type="text"
                  className="pointer-events-none col-span-full"
                  placeholder="Created At"
                  value={readableDate(data?.created_at || '')}
                />
              </FormGroup>
              <FormGroup
                title="Updated At"
                className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
              >
                <Input
                  disabled
                  type="text"
                  className="pointer-events-none col-span-full"
                  placeholder="Updated At"
                  value={readableDate(data?.updated_at || '')}
                />
              </FormGroup>
            </div>
          );
        }}
      </Form>
    </>
  );
}
