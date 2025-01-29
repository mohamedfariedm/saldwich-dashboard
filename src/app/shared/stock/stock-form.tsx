'use client';

import { useState } from 'react';
import { PiXBold } from 'react-icons/pi';
import { SubmitHandler, Controller } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import FormGroup from '@/app/shared/form-group';
import SelectBox from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { ActionIcon } from '@/components/ui/action-icon';
import {
    StockFormInput,
    StockFormSchema,
} from '@/utils/validators/stock-form.schema';
import { Title, Text } from '@/components/ui/text';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { useCreateStock, useUpdateStock, useCreateAllStock } from '@/framework/stock';
import Spinner from '@/components/ui/spinner';
import { number } from 'zod';
import CreatableSelect from 'react-select'

// main category form component for create and update category
export default function UpdateCreateStock({ initValues }: {
    initValues?: any
}) {
    console.log(initValues);
    
  const { closeModal } = useModal();
  const [reset, setReset] = useState({});
  const [isLoading, setLoading] = useState(false);
  const { data: allData, isLoading: isAllStockLoading } = useCreateAllStock()
  const { mutate: update } = useUpdateStock();
  const { mutate: create, isPending } = useCreateStock();

  const onSubmit: SubmitHandler<StockFormInput> = (data) => {
      
        if(initValues) {
            update({
                store_id:data?.store_id.value,
                product_id:data?.product_id.value,
                price:Number(data?.price)||Number(initValues?.price),
                quentity:Number(data?.quentity)||Number(initValues?.quentity), 
                discount: Number(data?.discount)||Number(initValues?.discount),
                stock_id:Number(initValues?.id),
            })
    } else {
        create({
            product_id:data?.product_id.value,
            store_id:data?.store_id.value,
            price:Number(data?.price)||Number(initValues?.price),
            quentity:Number(data?.quentity)||Number(initValues?.quentity), 
            discount:Number(data?.discount)||Number(initValues?.discount),
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
        {isAllStockLoading ? (
            <div className="m-auto">
                <Spinner size="lg" />
            </div>
        ) : (
        <Form<StockFormInput>
            resetValues={reset}
            onSubmit={onSubmit}
            validationSchema={StockFormSchema}
            useFormProps={{
                defaultValues: {
                                        //@ts-ignore

                    product_id:initValues?{value:initValues?.product_id,label:"faried"}:"",
                                        //@ts-ignore

                    store_id:initValues?{value:initValues?.store_id,label:initValues.store.name}:"",
                    price:Number(initValues?.price),
                    quentity:Number(initValues?.quentity), 
                    discount:Number(initValues?.discount),   
                                }
            }}
            className="flex flex-grow flex-col gap-6 p-6 @container [&_.rizzui-input-label]:font-medium [&_.rizzui-input-label]:text-gray-900 overflow-y-auto"
            >
            {({ register, control, getValues , formState: { errors } }) => {
                console.log(errors);
                
                return (
                <>
                    <div className="flex items-center justify-between">
                        <Title as="h4" className="font-semibold">
                            {initValues ? 'Update Stock' : 'Add a new Stock'}
                        </Title>
                        <ActionIcon size="sm" variant="text" onClick={closeModal}>
                            <PiXBold className="h-auto w-5" />
                        </ActionIcon>
                    </div>
                    <FormGroup
                        title="Stores"
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
                                placeholder="Select Store"
                                className="pt-2 w-full"
                                closeMenuOnSelect={true}
                                options={ allData?.data?.stores?.map((cat: any) =>{ 
                                    return {label:cat.name, value: cat.id}})} 
                                    value={value}
                                onChange={onChange}
                                />
                            // <SelectBox
                            //     placeholder="Select Store"
                            //     options={ allData?.data?.stores?.map((store: any) =>{ return {name: store?.name, value: store?.id}})}
                            //     onChange={onChange}
                            //     value={value}
                            //     className="col-span-full"
                            //     getOptionValue={(option) => option.value}
                            //     displayValue={(selected) =>
                            //         allData?.data?.stores?.find((r: any) => r.id === selected)?.name ?? "Select Store"
                            //     }
                            //     error={errors?.store_id?.message as string}
                            // />
                            )}
                        />
                                                <span className="text-red text-xs mt-0.5 rizzui-input-error-text">{errors?.store_id?.message ?"is Required":""}</span>

                    </FormGroup>


                    {initValues?.product_id?                
                            "" :     
                     <FormGroup
                        title="Products"
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
                                placeholder="Select Product"
                                className="pt-2 w-full"
                                closeMenuOnSelect={true}
                                options={ allData?.data?.products?.map((cat: any) =>{ 
                                    return {label:cat.sku_code, value: cat.id}})} 
                                    value={value}
                                onChange={onChange}
                                />
                            // <SelectBox
                            //     placeholder="Select Product"
                            //     options={ allData?.data?.products?.map((prod: any) =>{ return {name: prod?.sku_code, value: prod.id}})}
                            //     onChange={onChange}
                            //     value={value}
                            //     className="col-span-full"
                            //     getOptionValue={(option) => option.value}
                            //     displayValue={(selected) =>
                            //         allData?.data?.products?.find((r: any) => r.id == selected)?.sku_code ?? 'test'
                            //     }
                            //     error={errors?.product_id?.message as string}
                            // />
                            )}
                        />
                    <span className="text-red text-xs mt-0.5 rizzui-input-error-text">{errors?.product_id?.message ?"is Required":""}</span>

                    </FormGroup> }
                    <Input
                    label="Price"
                    type="number"
                    placeholder="price"
                    {...register('price',{valueAsNumber: true})}
                    error={errors.price?.message}
                    />

                    <Input
                    label="Quantity"
                    type="number"
                    placeholder="Quantity"
                    {...register('quentity',{valueAsNumber: true})}
                    error={errors.quentity?.message}
                    />

                    <Input
                    label="Discount"
                    type="number"
                    placeholder="discount"
                    {...register('discount',{valueAsNumber: true})}
                    error={errors.discount?.message}
                    />







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
                        {initValues ? 'Update Stock' : 'Create Stock'}
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
