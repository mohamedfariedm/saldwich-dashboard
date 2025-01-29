'use client';

import { useState } from 'react';
import { PiXBold } from 'react-icons/pi';
import { SubmitHandler, Controller } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import FormGroup from '@/app/shared/form-group';
import { Input } from '@/components/ui/input';
import SelectBox from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { ActionIcon } from '@/components/ui/action-icon';
import {
    TargetFormInput,
    TargetFormSchema,
} from '@/utils/validators/targets-form.schema';
import { Title, Text } from '@/components/ui/text';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { useAllTargets, useCreateTarget, useUpdateTarget } from '@/framework/targets';
import { DatePicker } from '@/components/ui/datepicker';
import { formatDate } from '@/utils/format-date';
import Spinner from '@/components/ui/spinner';
import { year } from 'date-arithmetic';
import { number } from 'zod';
import CreatableSelect from 'react-select'

// main category form component for create and update category
export default function UpdateCreateTarget({ initValues }: {
    initValues?: any
}) {
    console.log(initValues);
    let[newEndDate,setNewEndDate]=useState(
       initValues? initValues?.week<=9?`${initValues?.year}-W0${initValues?.week}`:`${initValues?.year}-W${initValues?.week}`:"2024-W01"
        )
console.log(newEndDate?.split("-W"));

  const { closeModal } = useModal();
  const [reset, setReset] = useState({});
  const [isLoading, setLoading] = useState(false);
  const { data: AllTargets, isLoading: isDataLoading } = useAllTargets()
  const { mutate: update } = useUpdateTarget();
  const { mutate: create, isPending } = useCreateTarget();
  const onSubmit: SubmitHandler<TargetFormInput> = (data) => {
    if(initValues) {
            update({
                ...data,
                target_id: initValues?.id,
                store_id: data?.store_id.value,
                product_id: data?.product_id.value,
                week:newEndDate?.split("-W")[1]||initValues?.week,
                year:newEndDate?.split("-W")[0]||initValues?.year,
            })
    } else {
        create({
            ...data,
            store_id: data?.store_id.value,
            product_id: data?.product_id.value,
            week:newEndDate?.split("-W")[1],
            year:newEndDate?.split("-W")[0],
        })
    }
    setLoading(isPending);
    setReset({
      roleName: '',
    });
  };

  return (
    <>
    {isDataLoading ? (
        <div className="m-auto">
            <Spinner size="lg" />
        </div>
    ) : (
        <Form<TargetFormInput>
            resetValues={reset}
            onSubmit={onSubmit}
            validationSchema={TargetFormSchema}
            useFormProps={{
                defaultValues: {
                    // user_id: initValues?.user_id || '',
                //@ts-ignore
                store_id:initValues?{value:initValues?.store_id,label:AllTargets?.data?.stores?.find((r: any) => r.id == initValues?.store_id)?.name}:"",
                //@ts-ignore
                product_id: initValues?{value:initValues?.product_id,label:AllTargets?.data?.products?.find((r: any) => r.id == initValues?.product_id)?.sku_code}:"",
                tgt_quentity:initValues?String(initValues?.tgt_quentity):"",
                tgt_value:initValues?String(initValues?.tgt_value):"",
                last_year_achived_quantity:initValues?String(initValues?.last_year_achived_quantity):"",
                last_year_achived_value:initValues?String(initValues?.last_year_achived_value):"",
                }
            }}
            className="flex flex-grow flex-col gap-6 p-6 @container [&_.rizzui-input-label]:font-medium [&_.rizzui-input-label]:text-gray-900 overflow-y-auto"
            >
            {({ register, control , formState: { errors } }) => {
                return (
                <>
                    <div className="flex items-center justify-between">
                        <Title as="h4" className="font-semibold">
                            {initValues ? 'Update Target' : 'Add a new Target'}
                        </Title>
                        <ActionIcon size="sm" variant="text" onClick={closeModal}>
                            <PiXBold className="h-auto w-5" />
                        </ActionIcon>
                    </div>
                    {/* <FormGroup
                        title="User"
                        className="pt-2 @2xl:pt-2 @3xl:grid-cols-12 @3xl:pt-11"
                        >
                        <Controller
                            control={control}
                            name="user_id"
                            render={({ field: { value, onChange } }) => (
                            <SelectBox
                                placeholder="Select User"
                                options={ AllTargets?.data?.users?.map((user: any) =>{ return {...user, value: user.name}})}
                                onChange={onChange}
                                value={value}
                                className="col-span-full"
                                getOptionValue={(option) => option.id}
                                displayValue={(selected) =>
                                    AllTargets?.data?.users?.find((r: any) => r.id == selected)?.name ?? ''
                                }
                                error={errors?.user_id?.message as string}
                            />
                            )}
                        />
                    </FormGroup> */}
                    <FormGroup
                        title="Store"
                        className="pt-2 @2xl:pt-2 @3xl:grid-cols-12 @3xl:pt-11"
                        >
                        <Controller
                            control={control}
                            name="store_id"
                            render={({ field: { value, onChange } }) => (
                                <CreatableSelect
                                styles={{
                                    control: (baseStyles, state) => ({
                                      ...baseStyles,
                                      boxShadow:"",
                                      borderColor:`${errors?.store_id?.message ?"red":"none"}`,
                                    }),
                                  }}
                                placeholder="Select Region"
                                className="pt-2 w-full"
                                closeMenuOnSelect={true}
                                options={ AllTargets?.data?.stores?.map((cat: any) =>{ 
                                    return {...cat,label:cat.name, value: cat.id}})} 
                                    value={value}
                                onChange={onChange}
                                />

                            // <SelectBox
                            //     placeholder="Select Store"
                            //     options={ AllTargets?.data?.stores?.map((store: any) =>{ return {...store, value: store.name}})}
                            //     onChange={onChange}
                            //     value={value}
                            //     className="col-span-full"
                            //     getOptionValue={(option) => option.id}
                            //     displayValue={(selected) =>
                            //         AllTargets?.data?.stores?.find((r: any) => r.id == selected)?.name ?? ''
                            //     }
                            //     error={errors?.store_id?.message as string}
                            // />
                            )}
                        />
                        <span className="text-red text-xs mt-0.5 rizzui-input-error-text">{errors?.store_id?.message ?"required":""}</span>

                    </FormGroup>
                    <FormGroup
                        title="Product"
                        className="pt-2 @2xl:pt-2 @3xl:grid-cols-12 @3xl:pt-11"
                        >
                        <Controller
                            control={control}
                            name="product_id"
                            render={({ field: { value, onChange } }) => (



                                <CreatableSelect
                                styles={{
                                    control: (baseStyles, state) => ({
                                      ...baseStyles,
                                      boxShadow:"",
                                      borderColor:`${errors?.product_id?.message ?"red":"none"}`,
                                    }),
                                  }}
                                placeholder="Select Region"
                                className="pt-2 w-full"
                                closeMenuOnSelect={true}
                                options={AllTargets?.data?.products?.map((cat: any) =>{ 
                                    return {...cat,label:cat.sku_code, value:cat.id}})} 
                                    value={value}
                                onChange={onChange}
                                />
                            // <SelectBox
                            //     placeholder="Select Product"
                            //     options={ AllTargets?.data?.products?.map((product: any) =>{ return {name: product.sku_code, value: product.id}})}
                            //     onChange={onChange}
                            //     value={value}
                            //     className="col-span-full"
                            //     getOptionValue={(option) => option.value}
                            //     displayValue={(selected) =>
                            //         AllTargets?.data?.products?.find((r: any) => r.id == selected)?.sku_code ?? ''
                            //     }
                            //     error={errors?.product_id?.message as string }
                            // />
                            )}
                        />
                                                <span className="text-red text-xs mt-0.5 rizzui-input-error-text">{errors?.product_id?.message ?"required":""}</span>

                    </FormGroup>
                    <Input
                    label="Target Quantity"
                    placeholder="Target Quantity"
                    {...register('tgt_quentity')}
                    error={errors.tgt_quentity?.message}
                    />
                    <Input
                    label="Target Value"
                    placeholder="Target Value"
                    {...register('tgt_value')}
                    error={errors.tgt_value?.message}
                    />
                    <Input
                    label="Last Year Achived Quantity"
                    placeholder="Last Year Achived Quantity"
                    {...register('last_year_achived_quantity')}
                    error={errors.tgt_value?.message}
                    />
                    <Input
                    label="Last Year Achived Value"
                    placeholder="Last Year Achived Value"
                    {...register('last_year_achived_value')}
                    error={errors.tgt_value?.message}
                    />
             <div className=''>

                <label htmlFor="weekFor" className='font-medium text-gray-700 w-full'>{`Target By Week `}</label>
                <input
                id='weekFor'
                style={{boxShadow:"none"}} 
                value={newEndDate}
                onChange={(event)=>{
                    setNewEndDate(event.target.value)
                }} type="week" className='w-full h-11 [&_input]:text-ellipsis rounded-md border-color: rgb(203 213 225) border-gray-300  focus:border-black hover:border-black cursor-pointer text-sm mt-1'              
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
                        {initValues ? 'Update Target' : 'Create Target'}
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
