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
    CityFormInput,
    CityFormSchema,
} from '@/utils/validators/city-form.schema';
import { Title, Text } from '@/components/ui/text';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { useRegions } from '@/framework/regions';
import { useCreateCity, useUpdateCity } from '@/framework/cities';
import toast from 'react-hot-toast';
import Spinner from '@/components/ui/spinner';
import CreatableSelect from 'react-select'
import { useAllFilter } from '@/framework/settings';

// main category form component for create and update category
export default function UpdateCreateCity({ initValues }: {
    initValues?: any
}) {
  const { closeModal } = useModal();
  const [reset, setReset] = useState({});
  const [isLoading, setLoading] = useState(false);
  const { data: regions, isLoading: isRegionsLoading } = useRegions('')
  const { mutate: update } = useUpdateCity();
  const { mutate: create, isPending } = useCreateCity();
  const [isActive, setIsActive] = useState<number>(initValues ? initValues?.is_active : 1)
  const [lang, setLang] = useState('en')
  const [nameEn, setNameEn] = useState(initValues ? initValues?.en_name : '')
  const [nameAr, setNameAr] = useState(initValues ? initValues?.ar_name : '')
  const { data: allFilters } = useAllFilter()
  const [regionFilter, setRegonFilter] = useState(allFilters?.data.regions?.map((regon: any) => ({
    name: regon?.name,
    id: regon?.id,
    ...regon
  })))

useEffect(()=>{
    setRegonFilter(allFilters?.data.regions?.map((regon: any) => ({
        name: regon?.name,
        id:regon?.id,
        ...regon
      })))
},[allFilters])
  const onSubmit: SubmitHandler<CityFormInput> = (data) => {
        
    const formatedName = JSON.stringify({
            en: lang == 'en' ? data.name : nameEn,
            ar: lang == 'en' ? nameAr : data.name
    })
    if(initValues) {
            // lang == 'en' ? setNameEn(data.name) : setNameAr(data.name)
            update({
                city_id: initValues?.id,
                region_id:data?.region_id.value ,
                is_active: isActive,
                name: formatedName
            })
    } else {
        create({
            name: formatedName,
            is_active: isActive,
            region_id:data?.region_id.value ,
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
    {isRegionsLoading ? (
        <div className="m-auto">
            <Spinner size="lg" />
        </div>
    ) : (
        <Form<CityFormInput>
            resetValues={reset}
            onSubmit={onSubmit}
            validationSchema={CityFormSchema}
            useFormProps={{
                defaultValues: {
                //@ts-ignore
                name: initValues?.name || '',
                //@ts-ignore
                region_id:initValues?{value:initValues?.region_id,label:regionFilter?.find((r: any) => r.id == initValues?.region_id)?.name}:"" ,
                }
            }}
            className="flex flex-grow flex-col gap-6 p-6 @container [&_.rizzui-input-label]:font-medium [&_.rizzui-input-label]:text-gray-900 overflow-y-auto"
            >
            {({ register, control, getValues, setValue , formState: { errors } }) => {
                return (
                <>
                    <div className="flex items-center justify-between">
                        <Title as="h4" className="font-semibold">
                            {initValues ? 'Update City' : 'Add a new City'}
                        </Title>
                        <ActionIcon size="sm" variant="text" onClick={closeModal}>
                            <PiXBold className="h-auto w-5" />
                        </ActionIcon>
                    </div>
                    <div className='flex flex-wrap px-1 gap-3'>
                        <Checkbox
                            key={0} 
                            label={'English'}
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
                            label={'Arabic'}
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
                    label="City Name"
                    placeholder="City name"
                    {...register('name')}
                    error={errors.name?.message}
                    />
                    <FormGroup
                        title="Region"
                        className="pt-7 @2xl:pt-7 @3xl:grid-cols-12 @3xl:pt-11"
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
                                      borderColor:`${errors?.region_id?.message ?"red":"none"}`,
                                    }),
                                  }}
                                placeholder="Select Region"
                                className="pt-2 w-full"
                                closeMenuOnSelect={true}
                                options={  regionFilter?.map((cat: any) =>{ 
                                    return {...cat,label:cat.name, value: cat.id}})} 
                                    value={value}
                                onChange={onChange}
                                />
                            // <SelectBox
                            //     placeholder="Select Region"
                            //     options={ regions?.data?.regions?.map((role: any) =>{ return {...role, value: role.name}})}
                            //     onChange={onChange}
                            //     value={value}
                            //     className="col-span-full"
                            //     getOptionValue={(option) => option.id}
                            //     displayValue={(selected) =>
                            //     regions?.data?.regions?.find((r: any) => r.id === selected)?.name ?? ''
                            //     }
                            //     error={errors?.region?.message as string}
                            // />
                            )}
                        />
                        <span className="text-red text-xs mt-0.5 rizzui-input-error-text">{errors?.region_id?.message ?"is Required":""}</span>
                    </FormGroup>
                    <div className='flex flex-wrap px-1 gap-3'>
                        <Checkbox
                            key={1} 
                            label={'Active'}
                            checked={isActive == 1}
                            // value={permission.id}
                            onChange={ () => setIsActive(isActive ? 0 : 1) }
                        />
                        <Checkbox
                            key={0} 
                            label={'Inactive'}
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
                        {initValues ? 'Update City' : 'Create City'}
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
