'use client';

import { useState } from 'react';
import { PiXBold } from 'react-icons/pi';
import { Controller, SubmitHandler } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { ActionIcon } from '@/components/ui/action-icon';
import { Title, Text } from '@/components/ui/text';
import { useModal } from '@/app/shared/modal-views/use-modal';
import {
  BrandFormInput,
  BrandFormSchema,
} from '@/utils/validators/team-form.schema';
import { useCreateBrand, useUpdateBrand } from '@/framework/brand';
import UploadAndDisplayImage from './UploadAndDisplayImage';
import Image from 'next/image';
import { Textarea } from 'rizzui';
import CreatableSelect from 'react-select';

import StatusField from '@/components/controlled-table/status-field';
import Cookies from 'js-cookie';
import axios from 'axios';
import toast from 'react-hot-toast';
import FormGroup from '../form-group';
import Spinner from '@/components/ui/spinner';
import Upload from '@/components/ui/upload';
import { useCreateReport, useUpdateReport } from '@/framework/reports';
import { useCreateTeam, useUpdateTeam } from '@/framework/teams';
// main category form component for create and update category
let imageFile: any = '';

export default function UpdateCreateBrand({
  text,
  initValues,
}: {
  text?: any;
  initValues?: any;
}) {
  const { closeModal } = useModal();
  const [reset, setReset] = useState({});
  const { mutate: update } = useUpdateTeam();
  const { mutate: create, isPending } = useCreateTeam();
  const [activation, setActivation] = useState<number>(
    initValues ? initValues?.active : 1
  );
  const [show, setshow] = useState<number>(
    initValues ? initValues?.futures : 1
  );

  const [lang, setLang] = useState('en');
  const [nameEn, setNameEn] = useState(initValues ? initValues?.en_name : '');
  const [nameAr, setNameAr] = useState(initValues ? initValues?.ar_name : '');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isoading, setLoading] = useState(false);
  const [isImageData, setImage] = useState();

  const handleFileUpload = (event: any) => {
    setLoading(true);
    // get the selected file from the input
    const file = event.target.files[0];
    // create a new FormData object and append the file to it
    const formData = new FormData();
    formData.append('attachment[]', file);
    // make a POST request to the File Upload API with the FormData object and Rapid API headers
    axios
      .post(process.env.NEXT_PUBLIC_ATTACHMENT_URL as string, formData, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${Cookies.get('auth_token')}`,
        },
      })
      .then((response) => {
        // handle the response
        console.log(response.data.data);
        setImage(response.data.data);
        setLoading(false);
        toast.success('Image Uploaded successfuly');
      })
      .catch((error) => {
        // handle errors
        console.log(error);
        setLoading(false);
        toast.error('Please Try Again');
      });
  };

  const [isLoadingFile, setLoadingFile] = useState(false);
  const [isFileData, setFile] = useState();
  const handleFileFileUpload = (event: any) => {
    setLoadingFile(true);
    // get the selected file from the input
    const file = event.target.files[0];
    // create a new FormData object and append the file to it
    const formData = new FormData();
    formData.append('attachment[]', file);
    // make a POST request to the File Upload API with the FormData object and Rapid API headers
    axios
      .post(process.env.NEXT_PUBLIC_ATTACHMENT_URL as string, formData, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${Cookies.get('auth_token')}`,
        },
      })
      .then((response) => {
        // handle the response
        console.log(response.data.data);
        setFile(response.data.data);
        setLoadingFile(false);
        toast.success('file Uploaded successfuly');
      })
      .catch((error) => {
        // handle errors
        console.log(error);
        setLoadingFile(false);
        toast.error('Please Try Again');
      });
  };

  const StoresTypeOptions = [
    {
      value: 'report',
      label: 'report',
    },
    {
      value: 'event',
      label: 'event',
    },
    {
      value: 'news',
      label: 'news',
    },
  ];

  console.log(initValues);

  const onSubmit: SubmitHandler<BrandFormInput> = (data) => {
    console.log(data);

    if (initValues) {
      // lang == 'en' ? setNameEn(data.name) : setNameAr(data.name)
      update({
        name: {
          en: data.nameEN,
          ar: data.nameAR,
        },
        description: {
          en: data.descriptionEN,
          ar: data.descriptionAR,
        },

        active: activation,
        attachment: isImageData,
        id: initValues.id,
      });
    } else {
      create({
        name: {
          en: data.nameEN,
          ar: data.nameAR,
        },
        description: {
          en: data.descriptionEN,
          ar: data.descriptionAR,
        },

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
            nameEN: initValues?.name.en || '',
            nameAR: initValues?.name.ar || '',
            descriptionEN: initValues?.description?.en || '',
            descriptionAR: initValues?.description?.ar || '',
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
                  {initValues ? 'Update Team' : 'Add a new Team'}
                </Title>
                <ActionIcon size="sm" variant="text" onClick={closeModal}>
                  <PiXBold className="h-auto w-5" />
                </ActionIcon>
              </div>
              {/* <div className='flex flex-wrap px-1 gap-3'>
                        <Checkbox
                            key={0} 
                            label={text.brands.english}
                            checked={lang == 'en'}
                            onChange={ function() {
                                if(lang == 'en') return
                                const currentName = getValues('name')
                                setNameAr(currentName)
                                setValue('name', nameEn == '' ? '' : nameEn)
                                setLang(lang == 'en' ? 'ar' : 'en')
                            } }
                        />
                        <Checkbox
                            key={1} 
                            label={text.brands.arabic}
                            checked={lang == 'ar'}
                            onChange={ function() {
                                if(lang == 'ar') return
                                const currentName = getValues('name')
                                setNameEn(currentName)
                                setValue('name', nameAr == '' ? '' : nameAr)
                                setLang(lang == 'en' ? 'ar' : 'en')
                            } }
                        />
                    </div> */}

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

              <Textarea
                label={'Description EN'}
                labelClassName="font-medium	 text-black"
                placeholder={'Description EN'}
                {...register('descriptionEN')}
                error={errors.descriptionEN?.message}
              />
              <Textarea
                label={'Description AR'}
                labelClassName="font-medium	 text-black"
                placeholder={'Description AR'}
                {...register('descriptionAR')}
                error={errors.descriptionAR?.message}
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

              {/* <div className='flex flex-wrap px-1 gap-3'>
                        <Checkbox
                            key={1} 
                            label={"Show In Home Page"}
                            checked={show == 1}
                            // value={permission.id}
                            onChange={ () => setshow(show ? 0 : 1) }
                        />
                        <Checkbox
                            key={0} 
                            label={"does't show on the home page"}
                            checked={show == 0}
                            // value={permission.id}
                            onChange={ () => setshow(show ? 0 : 1) }
                        />
                    </div> */}

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
                  {initValues ? 'Update Team' : 'Create Team'}
                </Button>
              </div>
            </>
          );
        }}
      </Form>
    </>
  );
}
