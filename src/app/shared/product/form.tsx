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
} from '@/utils/validators/reports-form.schema';
import { useState } from 'react';
import { Controller, SubmitHandler } from 'react-hook-form';
import { PiXBold } from 'react-icons/pi';
import CreatableSelect from 'react-select';
import { Textarea } from 'rizzui';

import { DatePicker } from '@/components/ui/datepicker';
import Spinner from '@/components/ui/spinner';
import Upload from '@/components/ui/upload';
import { useCreateReport, useUpdateReport } from '@/framework/reports';
import { formatDate } from '@/utils/format-date';
import axios from 'axios';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import FormGroup from '../form-group';
import { useCreateProduct, useUpdateProduct } from '@/framework/product';
import {
  ProductFormInput,
  ProductFormSchema,
} from '@/utils/validators/produc-form.schema';
import { useBrand, useCategory } from '@/framework/brand';

export default function UpdateCreateBrand({
  text,
  initValues,
}: {
  text?: any;
  initValues?: any;
}) {
  const { closeModal } = useModal();
  const [reset, setReset] = useState({});
  const { mutate: update } = useUpdateProduct();
  const { mutate: create, isPending } = useCreateProduct();
  const { data, isLoading: loading } = useCategory();
  const [isoading, setLoading] = useState(false);
  const [isImageData, setImage] = useState(initValues ? initValues?.image : null);
  let [imageError, setImageError] = useState(0);
  const handleFileUpload = (event: any, type: 'Image' | 'File') => {
    setLoading(true);
    const file = event.target.files?.[0];
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
        if (type === 'Image') {
          setImage(response.data.data);
        }
        console.log(response);

        toast.success(`${type} Uploaded successfully`);
      })
      .catch((error) => {
        console.log(error);
        toast.error('Please Try Again');
      })
      .finally(() => {
        setLoading(false);
      });
  };
  console.log(initValues);
  console.log(isImageData);

  const onSubmit: SubmitHandler<ProductFormInput> = (data) => {

    console.log(data);
    if (!isImageData) {
      setImageError(1);
    } else {
      if (initValues) {
        console.log(isImageData);
        
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
          categories: data.categories.map((brand) => brand.value),
          image: isImageData || initValues.image,
          brand_id: initValues.id,
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
          categories: data.categories.map((brand) => brand.value),
          image: isImageData,
        });
      }
      setReset({
        roleName: '',
      });

      closeModal();
    }
  };

  return (
    <>
      <Form<ProductFormInput>
        resetValues={reset}
        onSubmit={onSubmit}
        validationSchema={ProductFormSchema}
        useFormProps={{
          defaultValues: {
            nameEN: initValues?.name?.en || '',
            nameAR: initValues?.name?.ar || '',
            descriptionEN: initValues?.description?.en || '',
            descriptionAR: initValues?.description?.ar || '',
            categories: initValues
              ? initValues?.categories?.map((brand: any) => {
                  return { label: brand.name.en, value: brand.id };
                })
              : [],
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
                  {initValues ? 'Update Product' : 'Add a new Product'}
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
              <Textarea
                label={'Description EN'}
                placeholder={'Description EN'}
                {...register('descriptionEN')}
                error={errors.descriptionEN?.message}
              />
              <Textarea
                label={'Description AR'}
                placeholder={'Description AR'}
                {...register('descriptionAR')}
                error={errors.descriptionAR?.message}
              />
              <FormGroup
                title="Categories"
                className="pt-2 @2xl:pt-2 @3xl:grid-cols-12 @3xl:pt-11"
              >
                <Controller
                  control={control}
                  name="categories"
                  render={({ field: { value, onChange } }) => (
                    <CreatableSelect
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          boxShadow: '',
                          borderColor: `${
                            errors?.categories?.message ? 'red' : 'none'
                          }`,
                        }),
                      }}
                      placeholder="Select Store"
                      isMulti
                      isLoading={loading}
                      className="w-full pt-2"
                      closeMenuOnSelect={true}
                      options={data?.data?.map((cat: any) => {
                        return { label: cat.name.en, value: cat.id };
                      })}
                      value={value}
                      onChange={onChange}
                    />
                  )}
                />
                <span className="rizzui-input-error-text mt-0.5 text-xs text-red">
                  {errors?.categories?.message ? 'is Required' : ''}
                </span>
              </FormGroup>

              <FormGroup
                title="Image"
                className="relative pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
              >
                {isoading && (
                  <div className="absolute z-10 m-auto flex h-[100%] w-[100%] items-center justify-center ">
                    <Spinner size="xl" />
                  </div>
                )}
                <Upload
                  title="image"
                  accept="img"
                  onChange={(e) => {
                    setImageError(0);
                    handleFileUpload(e, 'Image');
                  }}
                />
                {imageError ? (
                  // "faried Error"
                  <p className="rizzui-input-error-text mt-0.5 text-xs text-red">
                    Image Requerd
                  </p>
                ) : (
                  ''
                )}
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
                  isLoading={isLoading}
                  className="w-full @xl:w-auto"
                >
                  {initValues ? 'Update Product' : 'Create Product'}
                </Button>
              </div>
            </>
          );
        }}
      </Form>
    </>
  );
}
