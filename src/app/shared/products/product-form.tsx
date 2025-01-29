'use client';

import { useEffect, useState } from 'react';
import { PiXBold } from 'react-icons/pi';
import { SubmitHandler, Controller } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import FormGroup from '@/app/shared/form-group';
import SelectBox from '@/components/ui/select';
import { ActionIcon } from '@/components/ui/action-icon';
import {
    ProductFormInput,
    ProductFormSchema,
} from '@/utils/validators/product-form.schema';
import cn from '@/utils/class-names';
import { RadioGroup } from '@/components/ui/radio-group';
import { Radio } from '@/components/ui/radio';
import { Title, Text } from '@/components/ui/text';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { useAllProductData, useUpdateProduct, useCreateProduct, useSpacificBU } from '@/framework/products';
import Spinner from '@/components/ui/spinner';
import Image from 'next/image';
import CreatableSelect from 'react-select'
import { AdvancedCheckbox, CheckboxGroup } from 'rizzui';
import { string } from 'zod';

let imageFile="";
let radioArray:any=[]


// main category form component for create and update category
export default function UpdateCreateProduct({text, initValues }: {text?:any,
    initValues?: any
}) {
let objVar:any={}


let obj:any={}
initValues?.features_categories.map(({name}:{name:string})=>{
let x=name
obj[x]=initValues?.product_features.map(String)
})
const [value, setValues] = useState("apple");



if(initValues){
    
    // initValues.features.map((feat:any)=>{
    //     objVar[`${feat.category?.name}`]=feat.id
    //       }
    //       )
}

    const [selectedFeatures, setSelectedFeatures] = useState(initValues?objVar:{})
    
              

    // initValues?.features.map((feat:any)=>{

    //     // setSelectedFeatures({...selectedFeatures,[feat?.category?.name]:feat.id})
    // })
    
  const { closeModal } = useModal();
  const [reset, setReset] = useState({});
  const [isLoading, setLoading] = useState(false);
  const { mutate: update } = useUpdateProduct();
  const { mutate: create, isPending } = useCreateProduct();
  const { data: allProdCreate, isLoading: isAllProdLoading } = useAllProductData();
  const [isActive, setIsActive] = useState<number>(initValues ? initValues?.is_active : 1)
  const [level_Id,setlevel_Id]=useState(1);  
  let arrValue=[]
useEffect(()=>{
    // initValues?.features.map((feat:any)=>{
    //     objVar[`${feat.category?.name}`]=feat.id
    //       }
    //       ) 

},[level_Id])
  const [lang, setLang] = useState('en')
  const [nameEn, setNameEn] = useState(initValues ? initValues?.en_model_name : '')
  const [nameAr, setNameAr] = useState(initValues ? initValues?.ar_model_name : '')
  const [discriptionEn, setdiscriptionEn] = useState(initValues ? initValues?.en_description : '')
  const [discriptionAr, setdiscriptionAr] = useState(initValues ? initValues?.ar_description : '')
  const [selectedImage, setSelectedImage] = useState(null);
  const [isCheck, setIsCheck] = useState([])

  const onSubmit: SubmitHandler<ProductFormInput> = (data) => {
      const formatedModelName = JSON.stringify({
              en: lang == 'en' ? data.model : nameEn,
              ar: lang == 'en' ? nameAr : data.model
      })
      const formatedDiscName = JSON.stringify({
        en: lang == 'en' ? data.description : discriptionEn,
        ar: lang == 'en' ? discriptionAr : data.description
      })
      let feturesArr:any=[]
      radioArray.map((select:string)=>{
        let x=select.split("/")
        feturesArr.push(x[1])
      })

    if(initValues) {
            update({
                ...data,
                product_id: initValues?.id,
                level_id: data?.level_id.value,
                category_id: data?.category_id.value,
                sub_category_id: data?.sub_category_id.value,
                sub_sub_category_id: data?.sub_sub_category_id.value,
                brand_id: data?.brand_id.value,
                is_active: isActive,
                image:imageFile,
                model: formatedModelName,
                description: formatedDiscName,
                features: feturesArr,
            })
    } else {
        create({
            ...data,
            model: formatedModelName,
            description: formatedDiscName,
            level_id: data?.level_id.value,
            category_id: data?.category_id.value,
            sub_category_id: data?.sub_category_id.value,
            sub_sub_category_id: data?.sub_sub_category_id.value,
            brand_id: data?.brand_id.value,
            features: Object.values(selectedFeatures),
            is_active: isActive,
            image:imageFile,
        })
    }
    setLoading(isPending);
    setReset({
      roleName: '',
    });
    imageFile=""

    // closeModal()
  };  
  return (
    <>
        {
            isAllProdLoading ? (
                <div className="m-auto">
                    <Spinner size="lg" />
                </div>
            ) : (
                <Form<ProductFormInput>
                    resetValues={reset}
                    onSubmit={onSubmit}
                    validationSchema={ProductFormSchema}
                    useFormProps={{
                        defaultValues: {
                            ...obj,
                        //@ts-ignore
                        modal: initValues?.modal || '',
                        barcode: initValues?.barcode,
                        sku_code: initValues?.sku_code,
                        description: initValues?.description || '',
                        is_active: isActive,
                        model: initValues?.model || '',
                        //@ts-ignore
                        category_id:initValues?{value:initValues?.category_id,label:initValues.category.name}:"",
                        //@ts-ignore
                        level_id:initValues?{value:initValues?.level_id,label:initValues?.level?.name}:"",
                        //@ts-ignore
                        sub_category_id:initValues?{value:initValues?.sub_category_id,label:initValues.sub_category.name}:"",
                        //@ts-ignore
                        sub_sub_category_id:initValues?{value:initValues?.sub_sub_category_id,label:initValues.sub_sub_category.name}:"",
                        //@ts-ignore
                        brand_id:initValues?{value:initValues?.brand_id,label:initValues?.brand?.name}:"",
                        }
                    }}
                    className="flex flex-grow flex-col gap-6 p-6 @container [&_.rizzui-input-label]:font-medium [&_.rizzui-input-label]:text-gray-900 overflow-y-auto"
                    >
                    {({ register, getValues, setValue, watch, control, formState: { errors } }) => {
                        let SelectedCategory:any = watch('category_id')
                        let SelectedSubCategory:any = watch('sub_category_id')
                        
                        return (
                        <>
                            <div className="flex items-center justify-between">
                                <Title as="h4" className="font-semibold">
                                    {initValues ? text.prod.upd_btn : text.prod.addnew}
                                </Title>
                                <ActionIcon size="sm" variant="text" onClick={closeModal}>
                                    <PiXBold className="h-auto w-5" />
                                </ActionIcon>
                            </div>
                            <div className='flex flex-wrap px-1 gap-3'>
                                <Checkbox
                                    key={0} 
                                    label={text.prod.english}
                                    checked={lang == 'en'}
                                    onChange={ function() {
                                        if(lang == 'en') return
                                        const currentModelName = getValues('model')
                                        const currentDiscName = getValues('description')
                                        setNameAr(currentModelName)
                                        setdiscriptionAr(currentDiscName)
                                        setValue('model', nameEn == '' ? '' : nameEn)
                                        setValue('description', discriptionEn == '' ? '' : discriptionEn)
                                        setLang(lang == 'en' ? 'ar' : 'en')
                                    } }
                                />
                                <Checkbox
                                    key={1} 
                                    label={text.prod.arabic}
                                    checked={lang == 'ar'}
                                    onChange={ function() {
                                        if(lang == 'ar') return
                                        const currentModelName = getValues('model')
                                        const currentDiscName = getValues('description')
                                        setNameEn(currentModelName)
                                        setdiscriptionEn(currentDiscName)
                                        setValue('model', nameAr == '' ? '' : nameAr)
                                        setValue('description', discriptionAr == '' ? '' : discriptionAr)
                                        setLang(lang == 'en' ? 'ar' : 'en')
                                    } }
                                />
                            </div>
                            <FormGroup
                        title={text.prod.level}
                        className="pt-2 w-1/2"
                        >
                        <Controller
                            control={control}
                            name="level_id"
                            render={({ field: { value, onChange } }) => (
                                <>
                                <CreatableSelect
                                styles={{
                                    control: (baseStyles, state) => ({
                                      ...baseStyles,
                                      boxShadow:"",
                                      borderColor:`${errors?.level_id?.message ?"red":"none"}`,
                                    }),
                                  }}
                                placeholder={text.prod.level}
                                className="pt-2 w-full"
                                closeMenuOnSelect={true}
                                options={  allProdCreate?.data?.levels?.map((cat: any) =>{ 
                                    return {label:cat.name, value: cat.id}})} 
                                    value={value}
                                onChange={onChange}
                                />
                                {
                                    setlevel_Id(value.value)
                                }
                                </>
                            )}
                        />
                                                <span className="text-red text-xs mt-0.5 rizzui-input-error-text">{errors?.level_id?.message ?"is Required":""}</span>

                        </FormGroup>

                            <div className='flex gap-14 '>
                            <FormGroup
                        title={text.prod.bg}
                        className="pt-2 w-1/2"
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
                                placeholder={text.prod.level}
                                className="pt-2 w-full"
                                closeMenuOnSelect={true}
                                options={  allProdCreate?.data?.categories?.map((cat: any) =>{ 
                                    return {...cat,label:cat.name, value: cat.id}})} 
                                    value={value}
                                onChange={onChange}
                                />

                            // <SelectBox
                            //     placeholder="Select BG"
                            //     options={ allProdCreate?.data?.categories?.map((cat: any) =>{ return {...cat, value: cat.name}})}
                            //     onChange={onChange}
                            //     value={value}
                            //     className="col-span-full truncate"
                            //     getOptionValue={(option) => option.id}
                            //     displayValue={(selected) =>
                            //         allProdCreate?.data?.categories?.find((r: any) => r.id === selected)?.name ?? selected
                            //     }
                            //     error={errors?.category_id?.message as string}
                            // />
                            )}
                        />
                         <span className="text-red text-xs mt-0.5 rizzui-input-error-text">{errors?.category_id?.message ?"is Required":""}</span>

                        </FormGroup>
                        
                        <FormGroup
                        title={text.prod.vcp}
                        className="pt-2 w-1/2"
                        >
                        <Controller
                            control={control}
                            name="sub_category_id"
                            render={({ field: { value, onChange } }) => (


                                <CreatableSelect
                                styles={{
                                    control: (baseStyles, state) => ({
                                      ...baseStyles,
                                      boxShadow:"",
                                      borderColor:`${errors?.sub_category_id?.message ?"red":"none"}`,

                                    }),
                                  }}
                                placeholder={text.prod.selectvcp}
                                className="pt-2 w-full"
                                closeMenuOnSelect={true}
                                options={allProdCreate?.data?.categories?.find((item: any) => item?.id == SelectedCategory?.value)?.children?.map((cat: any) =>{return {...cat,label:cat.name, value: cat.id}})
                            } 
                                    value={value}
                                onChange={onChange}
                                />
                            // <SelectBox
                            //     placeholder="Select VCP"
                            //     options={ allProdCreate?.data?.categories?.find((item: any) => item?.id == SelectedCategory)?.children?.map((cat: any) =>{return {...cat, value: cat.name}})}
                                    
                            //     onChange={onChange}
                            //     value={value}
                            //     className="col-span-full truncate"
                            //     getOptionValue={(option) => option.id}
                            //     displayValue={(selected) =>
                            //         allProdCreate?.data?.categories?.find((cat: any) => cat?.id == SelectedCategory)?.children?.find((r: any) => r.id == selected)?.name ?? selected
                            //     }
                            //     error={errors?.category_id?.message as string}
                            // />
                            )}
                        />
                                                 <span className="text-red text-xs mt-0.5 rizzui-input-error-text">{errors?.sub_category_id?.message ?"is Required":""}</span>
                        </FormGroup>
                            </div>
                            <div className='flex gap-14  '>

                            <FormGroup
                        title={text.prod.bu}
                        className="pt-2 w-1/2"
                        >
                        <Controller
                            control={control}
                            name="sub_sub_category_id"
                            render={({ field: { value, onChange } }) => (

                                <CreatableSelect
                                styles={{
                                    control: (baseStyles, state) => ({
                                      ...baseStyles,
                                      boxShadow:"",
                                      borderColor:`${errors?.sub_sub_category_id?.message ?"red":"none"}`,
                                    }),
                                  }}
                                  required
                                placeholder={text.prod.selectbu}
                                className="pt-2 w-full"
                                closeMenuOnSelect={true}
                                options={ allProdCreate?.data?.categories?.find((item: any) => item?.id == SelectedCategory?.value)?.children?.find((item: any) => item?.id == SelectedSubCategory?.value)?.children?.map((cat: any) =>{ return {...cat,label:cat.name, value: cat.id}})
                            } 
                                    value={value}
                                onChange={onChange}
                                />

                            )}
                        />
                    <span className="text-red text-xs mt-0.5 rizzui-input-error-text">{errors?.sub_sub_category_id?.message ?"is Required":""}</span>

                        </FormGroup>

                        <FormGroup
                        title={text.prod.brand}
                        className="pt-2 w-1/2"
                        
                        >
                        <Controller
                            control={control}
                            name="brand_id"
                            
                            render={({ field: { value, onChange } }) => (
                                <CreatableSelect
                                styles={{
                                    control: (baseStyles, state) => ({
                                      ...baseStyles,
                                      boxShadow:"",
                                      borderColor:`${errors?.brand_id?.message ?"red":"none"}`,
                                    }),
                                  }}
                                  required={true}
                                placeholder={text.prod.selectbrand}
                                options={ allProdCreate?.data?.brands?.map((brand: any) =>{ return {...brand,label:brand.name, value: brand.id}})}
                                onChange={onChange}
                                value={value}
                                className="col-span-full"
                                aria-errormessage={errors.model?.message}
                            />
                            )}
                        />
                        <span className="text-red text-xs mt-0.5 rizzui-input-error-text">{errors?.brand_id?.message ?"is Required":""}</span>
                        </FormGroup>

                            </div>
                            <div className='flex gap-14  '>
                            <Input
                            label={text.prod.model}
                            className="pt-2 w-1/2"
                            placeholder="Model"
                            {...register('model')}
                            error={errors.model?.message}
                            />

                            <Input
                            label={text.prod.skucode}
                            className="pt-2 w-1/2"
                            placeholder="sku_code"
                            {...register('sku_code')}
                            error={errors.sku_code?.message}
                            />
                            </div>
                            <div className='flex gap-14  '>
                            <Input
                            label={text.prod.desc}
                            className="pt-2 w-1/2"
                            placeholder={text.prod.desc}
                            {...register('description')}
                            error={errors.description?.message}
                            />

                            <Input
                            label={text.prod.barcode}
                            className="pt-2 w-1/2"
                            placeholder={text.prod.barcode}
                            {...register('barcode')}
                            error={errors.barcode?.message}
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
                                        imageFile=reader.result.split(",")[1] 
                                   })
                                    reader.readAsDataURL(file);
                                    }}
                                />
                                        <br />
                         </div>

{/* Update  */}
{initValues?
<>
{initValues.features_categories.map(({id, name,features }:{id:any,name:any,features:any}) => {
                return (
                    <div
                    key={name+"125347"}
                    className="flex flex-col gap-3 pb-4 md:flex-row md:items-center md:justify-between"
                  >
                    <Title
                      as="h6"
                      className="font-medium text-gray-700 2xl:text-sm"
                    >
                                              {name}
                    </Title>
                <RadioCheek latest={initValues.product_features} name={name} features={features}  />
                </div>
                )
}
            )}
</>
:""}

{/* {initValues?initValues.features_categories.map(({id, name,features }:{id:any,name:any,features:any}) => {
                return (
                  <div
                    key={name+"125347"}
                    className="flex flex-col gap-3 pb-4 md:flex-row md:items-center md:justify-between"
                  >
                    <Title
                      as="h6"
                      className="font-medium text-gray-700 2xl:text-sm"
                    >
                      {name}
                    </Title>
                    <Controller
                      name={name}
                      control={control}
                      render={({ field: {onChange, value} }) => {
                        return<CheckboxGroup
                          values={value}
                          setValues={onChange}
                        
                          className="grid grid-cols-3 gap-3"
                        >
                          {features.map(({ id, name }:{ id:string, name:string }) => {
                            let word=name.replace('_'," ")
                            return <AdvancedCheckbox
                            key={id+name}
                            name={name}
                            // onChange={(value)=>{console.log(value);
                            // }}
                            value={String(id)}
                            className={cn(
                              'flex-basis flex h-9 w-[70px] cursor-pointer items-center justify-center gap-1 rounded-md border border-gray-200 md:w-32 md:gap-2'
                            )}
                            inputClassName="[&:checked~span>.icon]:block [&:checked~span]:ring-1 dark:[&:checked~span]:ring-gray-300 [&:checked~span]:ring-offset-0 [&:checked~span]:bg-gray-800 dark:[&:checked~span]:bg-gray-300 [&:checked~span]:!border-gray-800 dark:[&:checked~span]:!border-gray-300 [&:checked~span]:text-white "
                        >
                            <span className="font-medium">{word}</span>
                          </AdvancedCheckbox>
                          }
                          )}
                        </CheckboxGroup>

                      }
                        
                      }
                    />
                  </div>
                );

              }):""} */}



{/* Create  */}
                        {initValues?"":allProdCreate?.data?.levels?.find((level:any)=>level.id==level_Id)?.features_categories && allProdCreate?.data?.levels?.find((level:any)=>level.id==level_Id)?.features_categories.length > 0 ? 
                        allProdCreate?.data?.levels?.find((level:any)=>level.id==level_Id)?.features_categories.map((featureCate: any) => (
                            <>
                            <FormGroup
                            key={featureCate?.id}
                            title={featureCate?.name}
                            className="pt-2 @2xl:pt-2 @3xl:grid-cols-12 @3xl:pt-11"
                            >
                            <RadioGroup
                            value={obj}
                            setValue={(val) =>{
                                return setSelectedFeatures({...selectedFeatures, [featureCate.name]: val})
                            }
                            }
                            className="justify-center space-x-4 space-y-4"
                        >
                            <div className="divide-slate-300 flex gap-3 w-full md:w-[500px]">
                                {featureCate?.features && featureCate?.features.length > 0 ? 
                                featureCate?.features?.map((fc: any) => (
                                <>
                                    <Radio
                                        key={fc?.id}
                                        name={featureCate?.name}
                                        label={fc?.name}
                                        value={String(fc?.id)}
                                        className="mb-5"
                                        labelClassName="pl-1 text-sm font-medium text-gray-900"
                                    />
                                </>
                                )) : null
                                }
                            </div>
                        </RadioGroup>
                            
                            </FormGroup>
                            
                            </>
                        )) : null
                        }
                                                    <div className='flex flex-wrap px-1 gap-3'>
                            <Checkbox
                                key={1} 
                                label={text.prod.active}
                                checked={isActive == 1}
                                // value={permission.id}
                                onChange={ () => setIsActive(isActive ? 0 : 1) }
                            />
                            <Checkbox
                                key={0} 
                                label={text.prod.Inactive}
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
                               {text.prod.cancel}
                            </Button>
                            <Button
                                type="submit"
                                isLoading={isLoading}
                                className="w-full @xl:w-auto"
                            >
                                {initValues ?  text.prod.upd_btn : text.prod.crt_btn}
                            </Button>
                            </div>
                        </>
                        );
                    }}
                </Form>
            )
        }
    </>   
  );
}



export function RadioCheek({latest,features,name}:{latest:[],features:any,name:string}) {
    var indexOfLatest=0
    if(latest.length>0&&features.length>0){        
        latest.map((last,index)=>{
            features.map((feature:any)=>{
                if(feature.id==last){
                    indexOfLatest=index
                }
            })
        })
    }

    const [value, setValue] = useState(String(latest[indexOfLatest])?name+"/"+String(latest[indexOfLatest]):"");
if(value&&!value.includes('undefined')){
    radioArray.map((select:string,index:number)=>{
        if(select.includes(name+"/")){
            radioArray.splice(index, 1)
        }
    })
    radioArray.push(value)
}

    return (
        <>
      <RadioGroup value={value} id={name} setValue={setValue} className="flex gap-4">
        {features.length>0?features.map((feture:any)=>{
            return<Radio key={feture.id} label={feture.name} value={name+"/"+String(feture.id)} />
        })        
:""}
      </RadioGroup>
        </>
    );
  }