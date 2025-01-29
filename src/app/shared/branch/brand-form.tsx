'use client';

import { useModal } from '@/app/shared/modal-views/use-modal';
import { ActionIcon } from '@/components/ui/action-icon';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Title } from '@/components/ui/text';
import { useState } from 'react';
import { Controller, SubmitHandler } from 'react-hook-form';
import { PiXBold } from 'react-icons/pi';
import { useCreateBranch, useUpdateBranch } from '@/framework/branches';
import { BranchFormInput, BranchFormSchema } from '@/utils/validators/branch-form.schema';

export default function UpdateCreateBranch({
  text,
  initValues,
}: {
  text?: any;
  initValues?: any;
}) {
  const { closeModal } = useModal();
  const [reset, setReset] = useState({});
  const { mutate: update } = useUpdateBranch();
  const { mutate: create, isPending } = useCreateBranch();





  const onSubmit: SubmitHandler<BranchFormInput> = (data) => {


  if (initValues) {
    // lang == 'en' ? setNameEn(data.name) : setNameAr(data.name)
    update({
      name: {
        en: data.nameEN,
        ar: data.nameAR,
      },
      brand_id:initValues.id,
      address:data.address,
      latitude:Number(data.latitude),
      longitude:Number(data.longitude),
      phone:Number(data.phone),
    });
  } else {
    create({
      name: {
        en: data.nameEN,
        ar: data.nameAR,
      },
      address:data.address,
      latitude:Number(data.latitude),
      longitude:Number(data.longitude),
      phone:Number(data.phone),
    });
  }
  setReset({
    roleName: '',
  });
  
  closeModal();






  };

  return (
    <>
      <Form<BranchFormInput>
        resetValues={reset}
        onSubmit={onSubmit}
        validationSchema={BranchFormSchema}
        useFormProps={{
          defaultValues: {
            nameEN: initValues?.name?.en || '',
            nameAR: initValues?.name?.ar || '',
            address:initValues?.address,
            latitude:initValues?.latitude,
            longitude:initValues?.longitude,
            phone:initValues?.phone,
          },
        }}
        className="flex flex-grow flex-col gap-6 overflow-y-auto p-6 @container [&_.rizzui-input-label]:font-medium [&_.rizzui-input-label]:text-gray-900"
      >
        {({
          register,
          getValues,
          control,
          setValue,
          formState: { errors, isLoading },
        }) => {
          return (
            <>
              <div className="flex items-center justify-between">
                <Title as="h4" className="font-semibold">
                  {initValues ? 'Update Branch' : 'Add a new Branch'}
                </Title>
                <ActionIcon size="sm" variant="text" onClick={closeModal}>
                  <PiXBold className="h-auto w-5" />
                </ActionIcon>
              </div>
              <Input
                label={'Name EN'}
                placeholder={'Name EN'}
                {...register('nameEN')}
                error={errors.nameEN?.message}
              />
              <Input
                label={'Name AR'}
                placeholder={'Name AR'}
                {...register('nameAR')}
                error={errors.nameAR?.message}
              />
              <Input
                label={'Address'}
                placeholder={'Address'}
                {...register('address')}
                error={errors.address?.message}
              />
              <Input
                label={'Phone'}
                type='number'
                placeholder={'Phone'}
                {...register('phone')}
                error={errors.phone?.message}
              />
              <Input
                label={'latitude'}
                type='number'
                placeholder={'latitude'}
                {...register('latitude')}
                error={errors.latitude?.message}
              />
              <Input
                label={'longitude'}
                type='number'
                placeholder={'longitude'}
                {...register('longitude')}
                error={errors.longitude?.message}
              />





              <div className="flex items-center justify-end gap-4">
                <Button
                  variant="outline"
                  onClick={closeModal}
                  className="w-full @xl:w-auto"
                >
                  {'Cancel'}
                </Button>
                <Button
                  type="submit"
                  isLoading={isLoading}
                  className="w-full @xl:w-auto"
                >
                  {initValues ? 'Update Branch' : 'Create Branch'}
                </Button>
              </div>
            </>
          );
        }}
      </Form>
    </>
  );
}
