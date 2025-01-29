'use client';

import { useEffect, useState } from 'react';
import { PiXBold } from 'react-icons/pi';
import { SubmitHandler, Controller } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import FormGroup from '@/app/shared/form-group';
import { Input } from '@/components/ui/input';
import SelectBox from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { ActionIcon } from '@/components/ui/action-icon';
import {
    StoreFormInput,
    StoreFormSchema,
} from '@/utils/validators/store-form.schema';
import { Title, Text } from '@/components/ui/text';
import { useModal } from '@/app/shared/modal-views/use-modal';
import {  useCities } from '@/framework/cities';
import { useRetailers } from '@/framework/retailers';
import { useCreateStore, useUpdateStore } from '@/framework/stores';
import toast from 'react-hot-toast';
import Spinner from '@/components/ui/spinner';
import { PhoneNumber } from '@/components/ui/phone-input';
import { City } from '@/types';
import Image from 'next/image';
import { useAllFilter } from '@/framework/settings';
import CreatableSelect from 'react-select'

let imageFile:any="";

// main category form component for create and update category
export default function UpdateCreateStore({text, initValues }: {text?:any,
    initValues?: any
}) {
    
  const { closeModal } = useModal();
  const [reset, setReset] = useState({});
  const [isLoading, setLoading] = useState(false);
  const { data: cities, isLoading: isCitiesLoading } = useCities('')
  const { data: retailers, isLoading: isRetailersLoading } = useRetailers('')
  const { mutate: update } = useUpdateStore();
  const { mutate: create, isPending } = useCreateStore();
  const [isActive, setIsActive] = useState<number>(initValues ? initValues?.is_active : 1)
  const [lang, setLang] = useState('en')
  const [nameEn, setNameEn] = useState(initValues ? initValues?.en_name : '')
  const [nameAr, setNameAr] = useState(initValues ? initValues?.ar_name : '')
  const [selectedImage, setSelectedImage] = useState(null);
  const { data: allFilters } = useAllFilter()
  const [regionFilter, setRegonFilter] = useState(allFilters?.data.regions?.map((regon: any) => ({
    name: String(regon?.name),
    id: String(regon?.id),
    ...regon
  })))

useEffect(()=>{
    setRegonFilter(allFilters?.data.regions?.map((regon: any) => ({
        name: String(regon?.name),
        id: regon?.id,
        ...regon
      })))
},[allFilters])

  const onSubmit: SubmitHandler<StoreFormInput> = (data) => {
        
    const formatedName = JSON.stringify({
            en: lang == 'en' ? data.name : nameEn,
            ar: lang == 'en' ? nameAr : data.name
    })
    if(initValues) {
            // lang == 'en' ? setNameEn(data.name) : setNameAr(data.name)
            update({
                ...data,
                city_id:data?.city_id.value,
                retailer_id:data?.retailer_id.value ,
                region_id:data?.region_id.value ,
                store_id: initValues?.id,
                is_active: isActive,
                store_code:data?.store_code,
                image:imageFile,
                name: formatedName
            })
    } else {
        create({
            ...data,
            name: formatedName,
            is_active: isActive,
            city_id:data?.city_id.value,
            retailer_id:data?.retailer_id.value ,
            region_id:data?.region_id.value ,
            store_code:data?.store_code,
            image:imageFile,
        })
    }
    setLoading(isPending);
    setReset({
      roleName: '',
    });
    // closeModal()
    imageFile=""
  };

  return (
    <>
    {isCitiesLoading || isRetailersLoading ? (
        <div className="m-auto min-h-24">
            <Spinner size="lg" />
        </div>
    ) : (
        <Form<StoreFormInput>
            resetValues={reset}
            onSubmit={onSubmit}
            validationSchema={StoreFormSchema}
            useFormProps={{
                defaultValues: {
                name: initValues?.name || '',
                contact_number: initValues?.contact_number || '',
                contact_email: initValues?.contact_email || '',
                type: initValues?.type || '',
                store_code: initValues?.store_code || '',
                address: initValues?.address || '',
                //@ts-ignore
                region_id:initValues?{value:initValues?.region_id,label:String(regionFilter?.find((r: any) => r.id == initValues?.region_id)?.name)}:"" ,
                //@ts-ignore
                city_id: initValues?{value:initValues?.city_id,label:String(regionFilter?.find((cat: any) => cat?.id == initValues?.region_id)?.cities?.find((r: any) => r.id == initValues?.city_id)?.name)}:"",
                //@ts-ignore
                retailer_id:initValues?{value:initValues?.retailer_id,label:String(retailers?.data?.retailers?.find((r: any) => r.id === initValues?.retailer_id)?.name)}:"",
                lat: initValues?.lat || '',
                lng: initValues?.lng || ''
                }
            }}
            className="flex flex-grow flex-col gap-3 p-6 @container [&_.rizzui-input-label]:font-medium [&_.rizzui-input-label]:text-gray-900"
            >
            {({ register, control,watch, getValues, setValue , formState: { errors } }) => {

                
                                let regionWatcher:any=watch("region_id")

                return (
                <>
                    <div className="flex items-center justify-between">
                        <Title as="h4" className="font-semibold">
                            {initValues ? text.store.updatestore:text.store.addnew}
                        </Title>
                        <ActionIcon size="sm" variant="text" onClick={closeModal}>
                            <PiXBold className="h-auto w-5" />
                        </ActionIcon>
                    </div>
                    <div className='flex flex-wrap px-1 gap-3'>
                        <Checkbox
                            key={0} 
                            label={text.store.english}
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
                            label={text.store.arabic}
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
                    label={text.store.storeName}
                    placeholder={text.store.storeName}
                    {...register('name')}
                    error={errors.name?.message}
                    />
                    <div className='flex gap-3 flex-1 justify-between w-full'>

                        {/* <FormGroup
                            title="City"
                            className="w-full pt-1 @2xl:pt-1 @3xl:grid-cols-12 @3xl:pt-11"
                            >
                            <Controller
                                control={control}
                                name="city_id"
                                render={({ field: { value, onChange } }) => (
                                <SelectBox
                                    placeholder="Select City"
                                    options={ cities?.data?.cities?.map((city: any) =>{ return {...city, value: city.name}})}
                                    onChange={onChange}
                                    value={value}
                                    className="col-span-full"
                                    getOptionValue={(option) => option.id}
                                    displayValue={(selected) =>
                                    cities?.data?.cities?.find((r: any) => r.id === selected)?.name ?? ''
                                    }
                                    error={errors?.city_id?.message as string}
                                />
                                )}
                            />
                        </FormGroup> */}

<FormGroup
                        title={text.store.region}
                        className="w-full pt-1 @2xl:pt-1 @3xl:grid-cols-12 @3xl:pt-11 gap-0"
                        >
                        <Controller
                            control={control}
                            name="region_id"
                            render={({ field: { value, onChange } }) => (


                                <CreatableSelect
                                styles={{
                                    control: (baseStyles, state) => ({
                                      ...baseStyles,
                                      boxShadow:"",
                                      borderColor:`${errors?.region_id?.message ?"red":"none"}`
                                    }),
                                  }}
                                placeholder={text.store.selectreg}
                                className=" w-full "
                                closeMenuOnSelect={true}
                                options={  regionFilter?.map((cat: any) =>{ 
                                    return {...cat,label:String(cat.name), value: cat.id}})} 
                                    value={value}
                                onChange={onChange}
                                />
                            // <SelectBox
                            //     placeholder="Select Region"
                            //     options={ regionFilter?.map((store: any) =>{ return {...store, value: store.name}})}
                            //     onChange={onChange}
                            //     value={value}
                            //     className="col-span-full"
                            //     getOptionValue={(option) => String(option.id)}
                            //     displayValue={(selected) =>
                            //         // @ts-ignore
                            //         regionFilter?.find((r: any) => r.id == selected)?.name ?? 'Select Store'
                            //     }
                            //     error={errors?.region_id?.message as string}
                            // />
                            )}
                        />
                        <span className="text-red text-xs mt-0.5 rizzui-input-error-text">{errors?.region_id?.message ?"required":""}</span>
                    </FormGroup>
                    <FormGroup
                        title={text.store.city}
                        className="w-full pt-1 @2xl:pt-1 @3xl:grid-cols-12 @3xl:pt-11 gap-0"
                        >
                        <Controller
                            control={control}
                            name="city_id"
                            render={({ field: { value, onChange } }) => (
                                <CreatableSelect
                                styles={{
                                    control: (baseStyles, state) => ({
                                      ...baseStyles,
                                      boxShadow:"",
                                      borderColor:`${errors?.city_id?.message ?"red":"none"}`
                                    }),
                                  }}
                                placeholder={text.store.selectcity}
                                className=" w-full"
                                closeMenuOnSelect={true}
                                options={regionFilter?.find((item: any) => item?.id == regionWatcher?.value)?.cities?.map((cat: any) =>{return {...cat,label:String(cat.name),value: cat.id}})
                            } 
                                    value={value}
                                onChange={onChange}
                                />
                            // <SelectBox
                            //     placeholder="Select Store"
                            //     // @ts-ignore
                            //     options={ regionFilter?.find((item: any) => item?.id == regionWatcher)?.cities?.map((cat: any) =>{return {...cat, value: cat.name}})}
                            //     onChange={onChange}
                            //     value={value}
                            //     className="col-span-full"
                            //     getOptionValue={(option) => String(option.id)}
                            //     displayValue={(selected) =>
                            //         // @ts-ignore
                            //         regionFilter?.find((cat: any) => cat?.id == regionWatcher)?.cities?.find((r: any) => r.id == selected)?.name ?? "Select Store"
                            //     }
                            //     error={errors?.city_id?.message as string}
                            // />
                            )}
                        />
                        <span className="text-red text-xs mt-0.5 rizzui-input-error-text">{errors?.city_id?.message ?"required":""}</span>
                    </FormGroup>




                    </div>
                        <FormGroup
                            title={text.store.retailer}
                            className="w-full pt-1 @2xl:pt-1 @3xl:grid-cols-12 @3xl:pt-11 gap-0"
                            >
                            <Controller
                                control={control}
                                name="retailer_id"
                                render={({ field: { value, onChange } }) => (

                                    <CreatableSelect
                                    styles={{
                                        control: (baseStyles, state) => ({
                                          ...baseStyles,
                                          boxShadow:"",
                                          borderColor:`${errors?.retailer_id?.message ?"red":"none"}`
                                        }),
                                      }}
                                    placeholder={text.store.selectretailer}
                                    className=" w-full"
                                    closeMenuOnSelect={true}
                                    options={retailers?.data?.retailers?.map((cat: any) =>{ 
                                        return {label:cat.name, value: cat.id}})} 
                                        value={value}
                                    onChange={onChange}
                                    />
                                // <SelectBox
                                //     placeholder="Select Retailer"
                                //     options={ retailers?.data?.retailers?.map((retailer: any) =>{ return {...retailer, value: retailer.name}})}
                                //     onChange={onChange}
                                //     value={value}
                                //     className="col-span-full"
                                //     getOptionValue={(option) => option.id}
                                //     displayValue={(selected) =>
                                //     retailers?.data?.retailers?.find((r: any) => r.id === selected)?.name ?? ''
                                //     }
                                //     error={errors?.retailer_id?.message as string}
                                // />
                                )}
                            />
                            <span className="text-red text-xs mt-0.5 rizzui-input-error-text">{errors?.retailer_id?.message ?"required":""}</span>
                        </FormGroup>
                    <div className='flex gap-3 justify-between w-full'>
                        <Input
                        className='w-full'
                        label={text.store.storeCode}
                        placeholder={text.store.storeCode}
                        {...register('store_code')}
                        error={errors.store_code?.message}
                        />
                        <Input
                        className='w-full'
                        label={text.store.type}
                        placeholder={text.store.type}
                        {...register('type')}
                        error={errors.type?.message}
                        />
                    </div>
                    <div className='flex justify-between w-full gap-3'>
                    <Input
                    type="tel"
                    label={text.store.phone}
                    placeholder="05xxxxxxxx"
                    className='w-full'
                    {...register('contact_number')}
                    error={errors.contact_number?.message}
                    />
                        <Input
                        className='w-full'
                        label={text.store.contact}
                        placeholder={text.store.contact}
                        {...register('contact_email')}
                        error={errors.contact_email?.message}
                        />
                    </div>
                        {/* <Input
                        className='w-full'
                        label="Store Code"
                        placeholder="Store Code"
                        {...register('store_code')}
                        error={errors.contact_email?.message}
                        /> */}
                        <Input
                        className='w-full'
                        label={text.store.address}
                        placeholder={text.store.address}
                        {...register('address')}
                        error={errors.address?.message}
                        />
                    
                    <div className='flex justify-between w-full gap-3'>
                        <Input
                        className='w-full'
                        label="lat"
                        placeholder="lat"
                        {...register('lat')}
                        error={errors.lat?.message}
                        />
                        <Input
                        className='w-full'
                        label="lng"
                        placeholder="lng"
                        {...register('lng')}
                        error={errors.lng?.message}
                        />
                    </div>

                    <div>
                    {selectedImage? 
                                    <div>
                                    <Image
                                        alt="not found"
                                        width={250}
                                        height={250}
                                        src={URL.createObjectURL(selectedImage)||`${initValues?.image}`}
                                    />
                                    <br />
                                    </div>
                                :initValues?.image?<div>
                                <Image
                                    alt="not found"
                                    width={250}
                                    height={250}
                                    src={`${initValues?.image}`}
                                />
                                <br />
                                </div>:""}      
      
                                <input
                                    type="file"
                                    name="myImage"
                                    onChange={(event) => {
                                    const reader:any=new FileReader();
                                    //@ts-ignore
                                    const file:any=event.target.files[0];
                                    setSelectedImage(file);
                                    reader.addEventListener("load",()=>{
                                        imageFile=reader.result.split(",")[1]                                    })
                                    reader.readAsDataURL(file);
                                    }}
                                />
                                        <br />

                         </div>
                    <div className='flex flex-wrap px-1 gap-3'>
                        <Checkbox
                            key={1} 
                            label={text.store.active}
                            checked={isActive == 1}
                            // value={permission.id}
                            onChange={ () => setIsActive(isActive ? 0 : 1) }
                        />
                        <Checkbox
                            key={0} 
                            label={text.store.Inactive}
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
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        isLoading={isLoading}
                        className="w-full @xl:w-auto"
                    >
                        {initValues ? text.store.updatestore: text.store.crt_btn}
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
