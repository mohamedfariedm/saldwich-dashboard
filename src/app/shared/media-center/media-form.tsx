'use client';

import { useModal } from '@/app/shared/modal-views/use-modal';
import { ActionIcon } from '@/components/ui/action-icon';
import { Button } from '@/components/ui/button';
import { DatePicker } from '@/components/ui/datepicker';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Title } from '@/components/ui/text';
import { formatDate } from '@/utils/format-date';
import {
  MediaInput,
  MediaSchema,
} from '@/utils/validators/media-center-form.schema';
import { useState } from 'react';
import { Controller, SubmitHandler } from 'react-hook-form';
import { PiXBold } from 'react-icons/pi';

import Spinner from '@/components/ui/spinner';
import Upload from '@/components/ui/upload';
import { useCreateMedia, useUpdateMedia } from '@/framework/media-center';
import axios from 'axios';
import Cookies from 'js-cookie';
import { usePathname } from 'next/navigation';
import toast from 'react-hot-toast';
import FormGroup from '../form-group';

export default function UpdateCreateMedia({
  text,
  initValues,
}: {
  text?: any;
  initValues?: any;
}) {
  const { closeModal } = useModal();
  const [reset, setReset] = useState({});
  const { mutate: update } = useUpdateMedia();
  const { mutate: create, isPending } = useCreateMedia();
  const pathname = usePathname();
  const type = pathname?.includes('files')
    ? 'brand_identity'
    : pathname?.includes('images')
    ? 'image'
    : 'video';

  const [isLoading, setLoading] = useState(false);
  const [isImageData, setImage] = useState();
  var today = new Date(),
    date =
      today.getFullYear() +
      '-' +
      (today.getMonth() + 1) +
      '-' +
      today.getDate();

  const handleFileUpload = (event: any) => {
    setLoading(true);
    const file = event?.target?.files?.[0];
    const formData = new FormData();
    formData.append('attachment[]', file);
    axios
      .post(process.env.NEXT_PUBLIC_ATTACHMENT_URL as string, formData, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${Cookies.get('auth_token')}`,
        },
      })
      .then((response) => {
        console.log(response.data.data);
        setImage(response.data.data);
        toast.success('File Uploaded successfully');
      })
      .catch((error) => {
        console.log(error);
        toast.error('Please Try Again');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  //console.log(initValues);

  const onSubmit: SubmitHandler<MediaInput> = (data) => {
    console.log(data);
    const formattedDate = formatDate(data?.date, 'YYYY-MM-DD');
    console.log(formattedDate);
    if (initValues) {
      update({
        ...data,
        date: formattedDate,
        media: isImageData?.[0] || initValues.media,
        id: initValues.id,
      });
    } else {
      create({
        ...data,
        date: formattedDate,
        // "active":activation,
        media: isImageData?.[0],
      });
    }
    setReset({
      roleName: '',
    });

    closeModal();
  };

  return (
    <>
      <Form<MediaInput>
        resetValues={reset}
        onSubmit={onSubmit}
        validationSchema={MediaSchema}
        useFormProps={{
          defaultValues: {
            ...initValues,
            date: new Date(initValues?.date || date),
            type,
          },
        }}
        className="flex flex-grow flex-col gap-6 overflow-y-auto p-6 @container [&_.rizzui-input-label]:font-medium [&_.rizzui-input-label]:text-gray-900"
      >
        {({
          register,
          getValues,
          control,
          setValue,
          watch,
          formState: { errors, isSubmitting },
        }) => {
          console.log('errors', errors);
          console.log('watch', watch());
          return (
            <>
              <div className="flex items-center justify-between">
                <Title as="h4" className="font-semibold">
                  {initValues ? 'Update Media' : 'Add a new Media'}
                </Title>
                <ActionIcon size="sm" variant="text" onClick={closeModal}>
                  <PiXBold className="h-auto w-5" />
                </ActionIcon>
              </div>
              <Input
                label={'Name EN'}
                placeholder={'Name EN'}
                {...register('name.en')}
                error={errors?.name?.en?.message}
              />
              <Input
                label={'Name AR'}
                placeholder={'Name AR'}
                {...register('name.ar')}
                error={errors?.name?.ar?.message}
              />
              {/*  <Textarea
                label={'Description EN'}
                labelClassName="font-medium	 text-black"
                placeholder={'Description EN'}
                {...register('description.en')}
                error={errors?.description?.en?.message}
              />
              <Textarea
                label={'Description AR'}
                labelClassName="font-medium	 text-black"
                placeholder={'Description AR'}
                {...register('description.ar')}
                error={errors?.description?.ar?.message}
              /> */}
              <div className="[&>.react-datepicker-wrapper]:w-full">
                <Controller
                  name="date"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <DatePicker
                      inputProps={{ label: 'Date' }}
                      placeholderText="Select Date"
                      dateFormat="yyyy MM dd"
                      selected={value}
                      // minDate={new Date()}
                      onChange={onChange}
                      showDisabledMonthNavigation
                    />
                  )}
                />
                {errors.date && (
                  <p className="cursor-default text-xs text-red-600">
                    {errors.date.message as string}
                  </p>
                )}
              </div>

              <FormGroup
                title={
                  type === 'brand_identity'
                    ? 'File'
                    : type === 'image'
                    ? 'Image'
                    : 'Video'
                }
                className="relative pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
              >
                {isLoading ? (
                  <div className="absolute z-10 m-auto flex h-[100%] w-[100%] items-center justify-center ">
                    <Spinner size="xl" />
                  </div>
                ) : (
                  ''
                )}
                <Upload
                  title={
                    type === 'brand_identity'
                      ? 'File'
                      : type === 'image'
                      ? 'Image'
                      : 'Video'
                  }
                  accept={
                    type === 'brand_identity'
                      ? 'all'
                      : type === 'image'
                      ? 'img'
                      : 'video'
                  }
                  {...register('media')}
                  onChange={handleFileUpload}
                />
              </FormGroup>
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
                  disabled={isLoading || isSubmitting}
                  isLoading={isSubmitting}
                  className="w-full @xl:w-auto"
                >
                  {initValues ? 'Update Media' : 'Create Media'}
                </Button>
              </div>
            </>
          );
        }}
      </Form>
    </>
  );
}
