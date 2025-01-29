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
import { FeaturesFormInput, FeaturesFormSchema } from '@/utils/validators/features-form.schema';
import FormGroup from '../form-group';
import SelectBox from '@/components/ui/select';
import { useCreateFeature, useUpdateFeature, useCategories } from '@/framework/features';
import Spinner from '@/components/ui/spinner';
import CreatableSelect from 'react-select'

// main category form component for create and update category
export default function UpdateCreateCategory({text, initValues }: {text?:any,
    initValues?: any
}) {
    
    
  const { closeModal } = useModal();
  const [reset, setReset] = useState({});
  const [isLoading, setLoading] = useState(false);
  const { mutate: update } = useUpdateFeature();
  const { mutate: create, isPending } = useCreateFeature();
  const { data: categories, isLoading: isCategoriesLoading } = useCategories();
  const [isActive, setIsActive] = useState<number>(initValues ? initValues?.is_active : 1)
  const [lang, setLang] = useState('en')
  const [nameEn, setNameEn] = useState(initValues ? initValues?.en_name : '')
  const [nameAr, setNameAr] = useState(initValues ? initValues?.ar_name : '')


  const onSubmit: SubmitHandler<FeaturesFormInput> = (data) => {
      const formatedName = JSON.stringify({
              en: lang == 'en' ? data.name : nameEn,
              ar: lang == 'en' ? nameAr : data.name
      })
      

        if(initValues) {
            update({
                //@ts-ignore
                feature_id: initValues?.id,
                is_active: isActive,
                name: formatedName,
                category_id: data?.category_id.value,
            })
    } else {
        create({
            name: formatedName,
            is_active: isActive,
            //@ts-ignore
            category_id: data?.category_id.value,
        })
    }

    setLoading(isPending);
    setReset({
      roleName: '',
    });

    // closeModal()
  };

  return (
  
  <>
  {isCategoriesLoading ? (
      <div className="m-auto">
          <Spinner size="lg" />
      </div>
  ) : (
    <Form<FeaturesFormInput>
    resetValues={reset}
    onSubmit={onSubmit}
    validationSchema={FeaturesFormSchema}
    useFormProps={{
        defaultValues: {
        //@ts-ignore
        name: initValues?.name || '',
        //@ts-ignore
        category_id:initValues? {value:initValues?.category_id,label:initValues?.category?.name}:"",
        }
    }}
    className="flex flex-grow flex-col gap-6 p-6 @container [&_.rizzui-input-label]:font-medium [&_.rizzui-input-label]:text-gray-900 overflow-y-auto"
    >
    {({ register, getValues,control, setValue , formState: { errors } }) => {
        return (
        <>
            <div className="flex items-center justify-between">
                <Title as="h4" className="font-semibold">
                    {initValues ? text.features.update: text.features.addnew}
                </Title>
                <ActionIcon size="sm" variant="text" onClick={closeModal}>
                    <PiXBold className="h-auto w-5" />
                </ActionIcon>
            </div>
            <div className='flex flex-wrap px-1 gap-3 overflow-y-auto'>
                <Checkbox
                    key={0} 
                    label={text.features.english}
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
                    label={text.features.arabic}
                    checked={lang == 'ar'}
                    onChange={ function() {
                        if(lang == 'ar') return
                        const currentName = getValues('name')
                        setNameEn(currentName)
                        setValue('name', nameAr == '' ? '' : nameAr)
                        setLang(lang == 'en' ? 'ar' : 'en')
                    } }
                />
            </div>
            <Input
            label={text.features.featurename}
            placeholder={text.features.featurename}
            {...register('name')}
            error={errors.name?.message}
            />



        <FormGroup
                title={text.features.cat}
                className="pt-7 @2xl:pt-7 @3xl:grid-cols-12 @3xl:pt-11"
                >
                <Controller
                    control={control}
                    name="category_id"
                    render={({ field: { value, onChange } }) => (
                        <CreatableSelect
                        styles={{
                            control: (baseStyles, state) => ({
                              ...baseStyles,
                              boxShadow:"",
                              borderColor:`${errors?.category_id?.message ?"red":"none"}`,
                            }),
                          }}
                        placeholder={text.features.select}
                        className="pt-2 w-full"
                        closeMenuOnSelect={true}
                        options={categories?.data?.map((cat: any) =>{ 
                            return {...cat,label:cat.name, value: cat.id}})} 
                            value={value}
                        onChange={onChange}
                        />
                    // <SelectBox
                    //     placeholder="Select Category"
                    //     options={ categories?.data?.map((role: any) =>{ return {...role, value: role.name}})}
                    //     onChange={onChange}
                    //     value={value}
                    //     className="col-span-full"
                    //     getOptionValue={(option) => option.id}
                    //     displayValue={(selected) =>
                    //         categories?.data?.find((r: any) => r.id === selected)?.name ?? ''
                    //     }
                    //     // error={errors?.categories?.message as string}
                    // />
                    )}
                />
                                        <span className="text-red text-xs mt-0.5 rizzui-input-error-text">{errors?.category_id?.message ?"is Required":""}</span>

            </FormGroup>





            <div className='flex flex-wrap px-1 gap-3'>
                <Checkbox
                    key={1} 
                    label={text.features.active}
                    checked={isActive == 1}
                    // value={permission.id}
                    onChange={ () => setIsActive(isActive ? 0 : 1) }
                />
                <Checkbox
                    key={0} 
                    label={text.features.Inactive}
                    checked={isActive == 0}
                    // value={permission.id}
                    onChange={ () => setIsActive(isActive ? 0 : 1) }
                />
            </div>
            <div className="flex items-center justify-end gap-4">
            <Button
                variant="outline"
                onClick={closeModal}
                className="w-full @xl:w-auto"
            >
                {text.features.cancel}
            </Button>
            <Button
                type="submit"
                isLoading={isLoading}
                className="w-full @xl:w-auto"
            >
                {initValues ? 'Update Feature' : 'Create Feature'}
            </Button>
            </div>
        </>
        );
    }}
    </Form> 
  )}
  </>   
);
}
