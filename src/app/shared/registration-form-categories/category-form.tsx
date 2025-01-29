'use client';

import { useModal } from '@/app/shared/modal-views/use-modal';
import { ActionIcon } from '@/components/ui/action-icon';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Title } from '@/components/ui/text';
import {
  RegistrationFormCategoryInput,
  RegistrationFormCategorySchema,
} from '@/utils/validators/registration-form-categories.schema';
import { useState } from 'react';
import { Controller, SubmitHandler } from 'react-hook-form';
import { PiXBold } from 'react-icons/pi';
import { Textarea } from 'rizzui';

import { DatePicker } from '@/components/ui/datepicker';
import {
  useCreateRegistrationFormCategory,
  useUpdateRegistrationFormCategory,
} from '@/framework/registration-form-categories';
import { formatDate } from '@/utils/format-date';

export default function UpdateCreateBrand({
  text,
  initValues,
}: {
  text?: any;
  initValues?: any;
}) {
  const { closeModal } = useModal();
  const [reset, setReset] = useState({});
  const { mutate: update } = useUpdateRegistrationFormCategory();
  const { mutate: create, isPending } = useCreateRegistrationFormCategory();
  const [activation, setActivation] = useState<number>(
    !initValues ? 1 : initValues?.status === 'active' ? 1 : 0
  );

  var today = new Date(),
    date =
      today.getFullYear() +
      '-' +
      (today.getMonth() + 1) +
      '-' +
      today.getDate();

  console.log(initValues);

  const onSubmit: SubmitHandler<RegistrationFormCategoryInput> = (data) => {
    console.log(data);
    const start_date = formatDate(data?.start_date, 'YYYY-MM-DD');
    const end_date = formatDate(data?.end_date, 'YYYY-MM-DD');

    if (initValues) {
      update({
        ...data,
        start_date,
        end_date,
        status: activation ? 'active' : 'not active',
        id: initValues.id,
      });
    } else {
      create({
        ...data,
        start_date,
        end_date,
        status: activation ? 'active' : 'not active',
      });
    }

    closeModal();
  };

  return (
    <>
      <Form<RegistrationFormCategoryInput>
        resetValues={reset}
        onSubmit={onSubmit}
        validationSchema={RegistrationFormCategorySchema}
        useFormProps={{
          defaultValues: {
            ...initValues,
            description: initValues?.description || '',
            start_date: new Date(initValues?.start_date || date),
            end_date: new Date(initValues?.end_date || date),
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
                  {initValues ? 'Update category' : 'Add a new category'}
                </Title>
                <ActionIcon size="sm" variant="text" onClick={closeModal}>
                  <PiXBold className="h-auto w-5" />
                </ActionIcon>
              </div>
              <Input
                label={'Name'}
                placeholder={'Name'}
                {...register('name')}
                error={errors.name?.message}
              />

              <Textarea
                label={'Description'}
                labelClassName="font-medium	 text-black"
                placeholder={'Description '}
                {...register('description')}
                error={errors.description?.message}
              />
              <div className="[&>.react-datepicker-wrapper]:w-full">
                <Controller
                  name="start_date"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <DatePicker
                      inputProps={{ label: 'Start Date' }}
                      placeholderText="Select Date"
                      dateFormat="yyyy MM dd"
                      selected={value}
                      // minDate={new Date()}
                      onChange={onChange}
                      showDisabledMonthNavigation
                    />
                  )}
                />
                {errors.start_date && (
                  <p className="cursor-default text-xs text-red-600">
                    {errors.start_date.message as string}
                  </p>
                )}
              </div>
              <div className="[&>.react-datepicker-wrapper]:w-full">
                <Controller
                  name="end_date"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <DatePicker
                      inputProps={{ label: 'End Date' }}
                      placeholderText="Select Date"
                      dateFormat="yyyy MM dd"
                      selected={value}
                      // minDate={new Date()}
                      onChange={onChange}
                      showDisabledMonthNavigation
                    />
                  )}
                />
                {errors.end_date && (
                  <p className="cursor-default text-xs text-red-600">
                    {errors.end_date.message as string}
                  </p>
                )}
              </div>

              <div className="flex flex-wrap gap-3 px-1">
                <Checkbox
                  key={1}
                  label={'Active'}
                  checked={activation == 1}
                  // value={permission.id}
                  onChange={() => setActivation(activation ? 0 : 1)}
                />
                <Checkbox
                  key={0}
                  label={'Not Active'}
                  checked={activation == 0}
                  // value={permission.id}
                  onChange={() => setActivation(activation ? 0 : 1)}
                />
              </div>

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
                  {initValues ? 'Update category' : 'Create category'}
                </Button>
              </div>
            </>
          );
        }}
      </Form>
    </>
  );
}
