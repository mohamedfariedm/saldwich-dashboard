'use client';

import { useModal } from '@/app/shared/modal-views/use-modal';
import { ActionIcon } from '@/components/ui/action-icon';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Title } from '@/components/ui/text';
import {
  BrandFormInput,
  BrandFormSchema,
} from '@/utils/validators/incuabators-form.schema';
import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { PiXBold } from 'react-icons/pi';
import { Textarea } from 'rizzui';

import Spinner from '@/components/ui/spinner';
import Upload from '@/components/ui/upload';
import {
  useCreateIncubators,
  useUpdateIncubators,
} from '@/framework/incubators';
import axios from 'axios';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import FormGroup from '../form-group';

export default function UpdateCreateBrand({
  text,
  initValues,
  PreviousIncubators,
}: {
  text?: any;
  initValues?: any;
  PreviousIncubators?: boolean;
}) {
  const { closeModal } = useModal();
  const [reset, setReset] = useState({});
  const { mutate: update } = useUpdateIncubators(PreviousIncubators);
  const { mutate: create, isPending } = useCreateIncubators(PreviousIncubators);
  const [activation, setActivation] = useState<number>(
    initValues ? initValues?.active : 1
  );
  const [isoading, setLoading] = useState(false);
  const [isImageData, setImage] = useState();

  const handleFileUpload = (event: any) => {
    setLoading(true);
    const file = event.target.files[0];
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
        setImage(response.data.data);
        setLoading(false);
        toast.success('Image Uploaded successfully');
      })
      .catch((error) => {
        setLoading(false);
        toast.error('Please Try Again');
      });
  };

  const onSubmit: SubmitHandler<BrandFormInput> = (data) => {
    console.log(data);

    if (initValues) {
      update({
        ...data,
        active: activation,
        attachment: isImageData || initValues.attachment,
        id: initValues.id,
      });
    } else {
      create({
        ...data,
        active: activation,
        attachment: isImageData,
      });
    }
    setReset({
      roleName: '',
    });

    closeModal();
  };

  return (
    <>
      <Form<BrandFormInput>
        resetValues={reset}
        onSubmit={onSubmit}
        validationSchema={BrandFormSchema}
        useFormProps={{
          defaultValues: {
            name: { ar: '', en: '' },
            description: { ar: '', en: '' },
            country: { ar: '', en: '' },
            sector: { ar: '', en: '' },
            social: {
              facebook: '',
              twetter: '',
              linkedin: '',
              instgram: '',
              link: '',
            },
            ...initValues,
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
                  {initValues ? 'Update Incubator' : 'Add a new Incubator'}
                </Title>
                <ActionIcon size="sm" variant="text" onClick={closeModal}>
                  <PiXBold className="h-auto w-5" />
                </ActionIcon>
              </div>

              <Input
                label={'Name EN'}
                placeholder={'Name EN'}
                {...register('name.en')}
                error={errors.name?.en?.message}
              />
              <Input
                label={'Name AR'}
                placeholder={'Name AR'}
                {...register('name.ar')}
                error={errors.name?.ar?.message}
              />
              <Textarea
                label={'Description EN'}
                labelClassName="font-medium	 text-black"
                placeholder={'Description EN'}
                {...register('description.en')}
                error={errors.description?.en?.message}
              />
              <Textarea
                label={'Description AR'}
                labelClassName="font-medium	 text-black"
                placeholder={'Description AR'}
                {...register('description.ar')}
                error={errors.description?.ar?.message}
              />
              {PreviousIncubators && (
                <Input
                  type="number"
                  label={'Year'}
                  placeholder={'Year'}
                  {...register('year')}
                  error={errors.year?.message}
                />
              )}
              <Input
                label={'Country EN'}
                placeholder={'Country EN'}
                {...register('country.en')}
                error={errors.country?.en?.message}
              />
              <Input
                label={'Country AR'}
                placeholder={'Country AR'}
                {...register('country.ar')}
                error={errors.country?.ar?.message}
              />
              <Input
                label={'Sector EN'}
                placeholder={'Sector EN'}
                {...register('sector.en')}
                error={errors.sector?.en?.message}
              />
              <Input
                label={'Sector AR'}
                placeholder={'Sector AR'}
                {...register('sector.ar')}
                error={errors.sector?.ar?.message}
              />
              <Input
                label={'Face Book Link'}
                placeholder={'Face Book Link'}
                {...register('social.facebook')}
              />
              <Input
                label={'Twitter Link'}
                placeholder={'Twitter Link'}
                {...register('social.twetter')}
              />
              <Input
                label={'Instagram Link'}
                placeholder={'Instagram Link'}
                {...register('social.instgram')}
              />
              <Input
                label={'LinkedIn Link'}
                placeholder={'LinkedIn Link'}
                {...register('social.linkedin')}
              />
              <Input
                label={'WebSite Link'}
                placeholder={'WebSite Link'}
                {...register('social.link')}
              />

              <FormGroup
                title="Image"
                className="relative pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
              >
                {isoading ? (
                  <div className="absolute z-10 m-auto flex h-[100%] w-[100%] items-center justify-center ">
                    <Spinner size="xl" />
                  </div>
                ) : (
                  ''
                )}
                <Upload
                  title="image"
                  accept="img"
                  {...register('image')}
                  onChange={handleFileUpload}
                />
              </FormGroup>

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
                  {initValues ? 'Update Incubator' : 'Create Incubator'}
                </Button>
              </div>
            </>
          );
        }}
      </Form>
    </>
  );
}
