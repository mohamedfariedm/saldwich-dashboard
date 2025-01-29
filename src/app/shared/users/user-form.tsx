'use client';

import { useEffect, useState } from 'react';
import { PiXBold } from 'react-icons/pi';
import { SubmitHandler, Controller } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { PhoneNumber } from '@/components/ui/phone-input';
import { Button } from '@/components/ui/button';
import FormGroup from '@/app/shared/form-group';
import { ActionIcon } from '@/components/ui/action-icon';
import {
  UserFormInput,
  userFormSchema,
} from '@/utils/validators/user-form.schema';
import { Title, Text } from '@/components/ui/text';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { useUpdateUser, useCreateUser } from '@/framework/users';
import { useRoles } from '@/framework/roles';
import toast from 'react-hot-toast';
import { DatePicker } from '@/components/ui/datepicker';
import SelectBox from '@/components/ui/select';
import Spinner from '@/components/ui/spinner';
import Image from 'next/image';
import { string } from 'zod';
import { useSearchParams } from 'next/navigation';
import { Password } from '@/components/ui/password';
import { useAllFilter, useAllStores } from '@/framework/settings';
import CreatableSelect from 'react-select'

let imageFile:any="";
let usersarray:any=[]

// main category form component for create and update category
export default function UpdateCreateUser({ initValues ,text}: {text?:any,
    initValues?: any
}) {
    const searchParams = useSearchParams()
    const params = new URLSearchParams(searchParams)
console.log(initValues?.attributes);

  const { closeModal } = useModal();
  const [reset, setReset] = useState({});
  const [isLoading, setLoading] = useState(false);
  const { data, isLoading: isRolesLOading} = useRoles('')
  const { mutate: update, isPending } = useUpdateUser();
  const { mutate: create } = useCreateUser();
  const [gender, setGender] = useState<number>(initValues?initValues?.gendor:1)
  const [activation, setActivation] = useState<number>(initValues?initValues?.activation:1)
  const [vacition, setVacition] = useState<number>(initValues?initValues?.vacation:0)
  const [selectedImage, setSelectedImage] = useState(null);
  const { data: allStores, isLoading: isCategoriesLoading} = useAllStores()

  const { data: allFilters,isLoading:isLoadingFilter } = useAllFilter()
  const [retailerFilter, setRetailerFilter] = useState(allFilters?.data.retailers?.map((retailer: any) => ({
    name: retailer?.name,
    id: retailer?.id,
    ...retailer
  })))
  const [regionFilter, setRegionFilter] = useState(allFilters?.data.regions?.map((region: any) => ({
    name: region?.name,
    id: region?.id,
    ...region
  })))
  const [cityFilter, setCityFilter] = useState(allFilters?.data.cities?.map((region: any) => ({
    name: region?.name,
    id: region?.id,
  })))
  const [storesFilter, setStoresFilter] = useState(allFilters?.data.stores?.map((region: any) => ({
    name: region?.name,
    id: region?.id,
  })))


  let roles:any=[]
  const [roleFilter, setRoleFilter] = useState(allFilters?.data.roles?.map((role: any) =>{
    if(role.id!=2&&role.id!=3&&role.id!=4){
        roles.push(role)
        return role
    }
  })) 

  

  console.log(allFilters);
useEffect(()=>{
    setRetailerFilter(allFilters?.data.retailers?.map((retailer: any) => ({
        name: retailer?.name,
        id: String(retailer?.id),
        ...retailer

      })))
    setRegionFilter(allFilters?.data.regions?.map((region: any) => ({
        name: region?.name,
        id: String(region?.id),
        ...region

      })))
    setCityFilter(allFilters?.data.cities?.map((region: any) => ({
        name: region?.name,
        id: String(region?.id),
      })))
    setStoresFilter(allFilters?.data.stores?.map((region: any) => ({
        name: region?.name,
        id: String(region?.id),
      })))

},[allFilters])


  const onSubmit: SubmitHandler<UserFormInput> = (data) => {
    console.log( "Form Submition :",data);
    // "Store": [1, 2, 3, 4],
    // "City": [10, 11],
    // "Region": [20],
    // "Retailer": [100, 101, 102, 103]
    // let stores :[]=[...(data?.Region?.map((store:any)=>store.id))]
    // console.log(stores);

    
    const Month = data?.birth_date?.getMonth() + 1 <10 ? `0${data?.birth_date?.getMonth() + 1}` : `${data?.birth_date?.getMonth() + 1}`
    const Day = data?.birth_date?.getDate() < 10 ? `0${data?.birth_date?.getDate()}` : `${data?.birth_date?.getDate()}`
    const formatedDate = `${data?.birth_date?.getFullYear()}-${Month}-${Day}`
    setActivation(initValues?.activation)
    setVacition(initValues?.vacation)
        if(initValues) {
            
            if(params.get('role')=="1"){
                if(data?.role?.value==3){
                    update({
                        name:data?.name,
                        email:data?.email,
                        store_id:data?.store_id.value,
                        address:data?.address,
                        user_id: initValues?.id,
                        gendor: gender,
                        activation:activation,
                        vacation:vacition,
                        birth_date: data?.birth_date ? formatedDate : initValues?.birth_date,
                        image:imageFile,
                        phone: data?.phone,
                        mac_id:data?.mac_id||"",
                        role:data?.role.value,
                        password:data.password,
                      })
                    }else{
                        update({
                            name:data?.name,
                            email:data?.email,
                            address:data?.address,
                            user_id: initValues?.id,
                            Store: [...(data?.Store?.map((store:any)=>store.value))],
                            City: [...(data?.City?.map((store:any)=>store.value))],
                            Region:[...(data?.Region?.map((store:any)=>store.value))],
                            Retailer:[...(data?.Retailer?.map((store:any)=>store.value))],
                            gendor: gender,
                            activation:activation,
                            vacation:vacition,
                            birth_date: data?.birth_date ? formatedDate : initValues?.birth_date,
                            image:imageFile,
                            phone: data?.phone,
                            mac_id:data?.mac_id||"",
                            role:data?.role.value,
                            password:data.password,
                          })
                    }
            }else{
                if(data?.role?.value==3){
                    update({
                    name:data?.name,
                    email:data?.email,
                    store_id:data?.store_id.value,
                    address:data?.address,
                    user_id: initValues?.id,
                    gendor: gender,
                    activation:activation,
                    vacation:vacition,
                    birth_date: data?.birth_date ? formatedDate : initValues?.birth_date,
                    image:imageFile,
                    phone: data?.phone,
                    mac_id:data?.mac_id||"",
                    role:String(params.get('role'))
                    })
                }else{
                    update({
                        name:data?.name,
                        email:data?.email,
                        address:data?.address,
                        user_id: initValues?.id,
                        gendor: gender,
                        activation:activation,
                        vacation:vacition,
                        birth_date: data?.birth_date ? formatedDate : initValues?.birth_date,
                        image:imageFile,
                        phone: data?.phone,
                        mac_id:data?.mac_id||"",
                        role:String(params.get('role'))
                        })
                }
            }
    } else {
        if(params.get('role')=="1"){
            if(data?.role?.value==3){
                create({
                    name:data?.name,
                    store_id:data?.store_id.value,
                    email:data?.email,
                    address:data?.address, 
                    gendor: gender,
                    activation:activation,
                    vacation:vacition,
                    birth_date: formatedDate,
                    image:imageFile,
                    phone:data?.phone,
                    mac_id:data?.mac_id||initValues?.mac_id,
                    role:data?.role.value,
                    password:data.password,
                })
            }else{
                create({
                    name:data?.name,
                    email:data?.email,
                    address:data?.address, 
                    gendor: gender,
                    Store:[...(data?.Store?.map((store:any)=>store.id))],
                    City: [...(data?.City?.map((store:any)=>store.id))],
                    Region:[...(data?.Region?.map((store:any)=>store.id))],
                    Retailer:[...(data?.Retailer?.map((store:any)=>store.id))],
                    activation:activation,
                    vacation:vacition,
                    birth_date: formatedDate,
                    image:imageFile,
                    phone:data?.phone,
                    mac_id:data?.mac_id||initValues?.mac_id,
                    role:data?.role.value,
                    password:data.password,
                })
            }

        }else{
            if(data?.role?.value==3){
                create({
                    name:data?.name,
                    store_id:data?.store_id.value,
                    email:data?.email,
                    address:data?.address,
                    gendor: gender,
                    activation:activation,
                    vacation:vacition,
                    birth_date: formatedDate,
                    image:imageFile,
                    phone:data?.phone,
                    mac_id:data?.mac_id||initValues?.mac_id,
                    role:String(params.get('role'))
                })
            }else{
                create({
                    name:data?.name,
                    email:data?.email,
                    address:data?.address,
                    gendor: gender,
                    activation:activation,
                    vacation:vacition,
                    birth_date: formatedDate,
                    image:imageFile,
                    phone:data?.phone,
                    mac_id:data?.mac_id||initValues?.mac_id,
                    role:String(params.get('role'))
                })
            }
        }
    }

    setLoading(isPending);
    setReset({
      roleName: '',
    });
    // closeModal()
    imageFile=""
};

var today = new Date(),
date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
console.log(initValues);


  return (
    <>
    {
        isRolesLOading&&isLoadingFilter ? (
            <div className="m-auto">
                <Spinner size="lg" />
            </div>
        ) : (
         <Form<UserFormInput>
            resetValues={reset}
            onSubmit={onSubmit}
            validationSchema={userFormSchema}
            useFormProps=
            {params.get('role')=="1"? {
                defaultValues: {
                name: initValues?.name || '',
                phone: initValues?.phone || "",
                email: initValues?.email || '',
                address: initValues?.address || '',
                mac_id:initValues?.mac_id  || '',
                image:imageFile,
                Store:initValues?.attributes?.Store?.map((store:any)=>{return{label:store.name,value:Number(store.id)}}),
                City:initValues?.attributes?.City?.map((store:any)=>{return{label:store.name,value:Number(store.id)}}),
                Retailer:initValues?.attributes?.Retailer?.map((store:any)=>{return{label:store.name,value:Number(store.id)}}),     
                Region:initValues?.attributes?.Region?.map((store:any)=>{return{label:store.name,value:Number(store.id)}}),
                retailer_id:{value:retailerFilter[0]?.id,label:retailerFilter[0]?.name},
                store_id:{value:retailerFilter[0]?.stores[0].id,label:retailerFilter[0]?.stores[0].name},
                role:{value:1,label:"Admin"},
                birth_date:new Date(initValues?.birth_date||date)
                }
            }:{
                defaultValues: {
                name: initValues?.name || '',
                phone: initValues?.phone || "",
                email: initValues?.email || '',
                address: initValues?.address || '',
                mac_id:initValues?.mac_id  || '',
                image:imageFile,
                role:{value:Number(params.get('role')),label:""},
                store_id:initValues?{value:initValues?.store?.id,label:initValues?.store?.name}:"",
                retailer_id:initValues?{value:initValues?.store?.retailer_id,label:initValues?.store?.retailer_name}:"",
                birth_date:new Date(initValues?.birth_date||date)
                }
            }}

            className="flex flex-grow flex-col gap-6 p-6 @container [&_.rizzui-input-label]:font-medium [&_.rizzui-input-label]:text-gray-900 overflow-y-auto"
            >
            {({ register,watch, control, formState: { errors } }) => {
                console.log(errors);                
                let retailerWatcher:any=watch("retailer_id")
                // console.log(initValues);
                
                return (
                <>
                    <div className="flex items-center justify-between">
                        <Title as="h4" className="font-semibold">
                            {initValues ? text.user.updateuser: text.user.addnewuser}
                        </Title>
                        <ActionIcon size="sm" variant="text" onClick={closeModal}>
                            <PiXBold className="h-auto w-5" />
                        </ActionIcon>
                    </div>
                    <div className="flex items-center justify-between">

                    <Input
                    label={text.user.username}
                    placeholder={text.user.username}
                    {...register('name')}
                    error={errors.name?.message}
                    />
                    <Input
                    type="tel"
                    label={text.user.phoneform}
                    placeholder="05xxxxxxxx"
                    {...register('phone')}
                    error={errors.phone?.message}
                    />
                    </div>
                    {params.get('role')=="1"?
                    <>

                                    <FormGroup
                title={text.user.retailer}
                className=" @2xl:pt-7 @3xl:grid-cols-12 @3xl:pt-11"
                >
                <Controller
                    control={control}
                    name="Retailer"
                    render={({ field: { value, onChange } }) => (

                        <CreatableSelect
                        styles={{
                            control: (baseStyles, state) => ({
                              ...baseStyles,
                              boxShadow:"",
                            }),
                          }}
                          isMulti
                        placeholder={text.user.selectretailer}
                        className="pt-2 w-full"
                        closeMenuOnSelect={true}
                        options={ retailerFilter?.map((cat: any) =>{ 
                            return {...cat,label:cat.name, value:Number( cat.id)}})} 
                            value={value}
                        onChange={onChange}
                        />
                    )}
                />
            </FormGroup>
                <FormGroup
                title={text.user.stores}
                className="@2xl:pt-7 @3xl:grid-cols-12 @3xl:pt-11"
                >
                <Controller
                    control={control}
                    name="Store"
                    render={({ field: { value, onChange } }) => (
                        <>

<CreatableSelect
                    styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          boxShadow:"",
                        }),
                      }}
                      isMulti
                    placeholder={text.user.selectuser}
                    className="pt-2 w-full"
                    closeMenuOnSelect={true}
                    options={ storesFilter?.map((cat: any) =>{ 
                        return {...cat,label:cat.name, value:Number( cat.id)}})} 
                         value={value}
                    onChange={onChange}
                    />
                        </>
                    )}
                />
            </FormGroup>

                                    <FormGroup
                title={"Region"}
                className=" @2xl:pt-7 @3xl:grid-cols-12 @3xl:pt-11"
                >
                <Controller
                    control={control}
                    name="Region"
                    render={({ field: { value, onChange } }) => (

                        <CreatableSelect
                        styles={{
                            control: (baseStyles, state) => ({
                              ...baseStyles,
                              boxShadow:"",
                              borderColor:`${errors?.retailer_id?.message?"red":"none"}`
                            }),
                          }}
                        placeholder={text.user.selectretailer}
                        className="pt-2 w-full"
                        closeMenuOnSelect={true}
                        isMulti

                        options={ regionFilter?.map((cat: any) =>{ 
                            return {...cat,label:cat.name, value: Number( cat.id)}})} 
                            value={value}
                        onChange={onChange}
                        />
                    )}
                />
            </FormGroup>
                <FormGroup
                title={"City"}
                className="@2xl:pt-7 @3xl:grid-cols-12 @3xl:pt-11"
                >
                <Controller
                    control={control}
                    name="City"
                    render={({ field: { value, onChange } }) => (
                        <>

<CreatableSelect
                    styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          boxShadow:"",
                          borderColor:"none",
                        }),
                      }}
                      isMulti
                    placeholder={text.user.selectuser}
                    className="pt-2 w-full"
                    closeMenuOnSelect={true}
                    options={ cityFilter?.map((cat: any) =>{ 
                        return {...cat,label:cat.name, value: Number( cat.id)}})}       
                    value={value}
                    onChange={onChange}
                    />
                        </>
                    )}
                />
            </FormGroup>

                    <FormGroup
                    title={text.user.role}
                    className="pt-7 @2xl:pt-7 @3xl:grid-cols-12 @3xl:pt-11"
                    >
                    <Controller
                        control={control}
                        name="role"
                        render={({ field: { value, onChange } }) => (
                            <>

                <CreatableSelect
                        styles={{
                            control: (baseStyles, state) => ({
                              ...baseStyles,
                              boxShadow:"",
                              borderColor:"none",
                            }),
                          }}
                        placeholder={text.user.selectuser}
                        className="pt-2 w-full"
                        closeMenuOnSelect={true}
                        options={ roles?.map((cat: any) =>{ 
                                return {label:cat.name, value: cat.id}
                            })} 
                            value={value}
                        onChange={onChange}
                        />
                            </>
                        )}
                    />
                </FormGroup>
                {watch("role")?.value==3?
                <>
                
                <FormGroup
                title={text.user.retailer}
                className=" @2xl:pt-7 @3xl:grid-cols-12 @3xl:pt-11"
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
                              borderColor:`${errors?.retailer_id?.message?"red":"none"}`
                            }),
                          }}
                        placeholder={text.user.selectretailer}
                        className="pt-2 w-full"
                        closeMenuOnSelect={true}
                        options={ retailerFilter?.map((cat: any) =>{ 
                            return {...cat,label:cat.name, value: cat.id}})} 
                            value={value}
                        onChange={onChange}
                        />
                    )}
                />
            </FormGroup>
                <FormGroup
                title={text.user.stores}
                className="@2xl:pt-7 @3xl:grid-cols-12 @3xl:pt-11"
                >
                <Controller
                    control={control}
                    name="store_id"
                    render={({ field: { value, onChange } }) => (
                        <>

<CreatableSelect
                    styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          boxShadow:"",
                          borderColor:"none",
                        }),
                      }}
                    placeholder={text.user.selectuser}
                    className="pt-2 w-full"
                    closeMenuOnSelect={true}
                    options={retailerFilter?.find((item: any) => item?.id == retailerWatcher?.value)?.stores?.map((cat: any) =>{return {...cat,label:cat.name, value: cat.id}})} 
                        value={value}
                    onChange={onChange}
                    />
                        </>
                    )}
                />
            </FormGroup>
                
                </>
                
                
                :""}
                    
                    
                    
                    </>
                    
                    
                    
                    :
                    
                    
                    
                    ""}
                    {params.get('role')=="3"?  
                    <>
                                    <FormGroup
                title={text.user.retailer}
                className=" @2xl:pt-7 @3xl:grid-cols-12 @3xl:pt-11"
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
                              borderColor:`${errors?.retailer_id?.message?"red":"none"}`
                            }),
                          }}
                        placeholder={text.user.selectretailer}
                        className="pt-2 w-full"
                        closeMenuOnSelect={true}
                        options={ retailerFilter?.map((cat: any) =>{ 
                            return {...cat,label:cat.name, value: cat.id}})} 
                            value={value}
                        onChange={onChange}
                        />
                    )}
                />
            </FormGroup>
                <FormGroup
                title={text.user.stores}
                className="@2xl:pt-7 @3xl:grid-cols-12 @3xl:pt-11"
                >
                <Controller
                    control={control}
                    name="store_id"
                    render={({ field: { value, onChange } }) => (
                        <>

<CreatableSelect
                    styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          boxShadow:"",
                          borderColor:"none",
                        }),
                      }}
                    placeholder={text.user.selectuser}
                    className="pt-2 w-full"
                    closeMenuOnSelect={true}
                    options={retailerFilter?.find((item: any) => item?.id == retailerWatcher?.value)?.stores?.map((cat: any) =>{return {...cat,label:cat.name, value: cat.id}})} 
                        value={value}
                    onChange={onChange}
                    />
                        </>
                    )}
                />
            </FormGroup>
                    
                    </>                 
:""

                    }

                    {/* <Controller
                        name="phone"
                        control={control}
                        render={({ field: { value, onChange } }) => (
                            <PhoneNumber
                            label="Phone Number"
                            value={value}
                            onChange={onChange}
                            className="rtl:[&>.selected-flag]:right-0"
                            inputClassName="rtl:pr-12"
                            />
                        )}
                    /> */}


                 <Input
                    type="email"
                    className="col-span-full"
                    label={text.user.email}
                    placeholder={text.user.enteremail}
                    {...register('email')}
                    error={errors.email?.message}
                    />

                    <Input
                    label={text.user.address}
                    placeholder="address..."
                    {...register('address')}
                    error={errors.address?.message}
                    />
                       
                       {params.get('role')=="1"? 
                    <>
                    <Password
                  // type='password'
                    className="col-span-full"
                    placeholder={text.user.newpassword}
                    {...register('password')}
                    error={errors.password?.message}
                  />
                  <Password
                  // type='password'
                    className="col-span-full"
                    placeholder={text.user.confirmpass}
                    {...register('confirmPassword')}
                    error={errors.confirmPassword?.message}
                    />
                    </>:<Input
                    label="mac_id"
                    placeholder="Mac Id"
                    {...register('mac_id')}
                    error={errors.mac_id?.message}
                    />}
                    <div className="[&>.react-datepicker-wrapper]:w-full">
                        <Controller
                            name={text.user.birth}
                            control={control}
                            render={({ field: { value, onChange } }) => (
                            <DatePicker
                                inputProps={{ label: 'Birth Date' }}
                                placeholderText="Select Date"
                                dateFormat="yyyy MM dd"
                                selected={value}
                                isClearable
                                onChange={onChange}
                            />
                            )}
                        />
                        {errors.birth_date && (
                            <p className="text-red-600 text-xs cursor-default">
                            {errors.birth_date.message as string}
                          </p>
                        )}
                    </div>
                    {/* <Input
                    label="Date of birth"
                    placeholder="data of birth"
                    {...register('birth_date')}
                    error={errors.birth_date?.message}
                    /> */}


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
                      //@ts-ignore
                    imageFile=reader.result.split(",")[1]
                    
                       
                                                           
                  })
                  reader.readAsDataURL(file);
                  }}
              />
  </div>
  <div className="flex items-center justify-between">


                    <div className='flex flex-wrap px-1 gap-3'>
                        <Checkbox
                            key={1} 
                            label={text.user.male}
                            checked={gender == 1}
                            // value={permission.id}
                            onChange={ () => setGender(gender ? 0 : 1) }
                        />
                        <Checkbox
                            key={0} 
                            label={text.user.female}
                            checked={gender == 0}
                            // value={permission.id}
                            onChange={ () => setGender(gender ? 0 : 1) }
                        />
                    </div>
                    <div className='flex flex-wrap px-1 gap-3'>
                        <Checkbox
                            key={1} 
                            label={text.user.active}
                            checked={activation == 1}
                            // value={permission.id}
                            onChange={ () => setActivation(activation ? 0 : 1) }
                        />
                        <Checkbox
                            key={0} 
                            label={text.user.noactive}
                            checked={activation == 0}
                            // value={permission.id}
                            onChange={ () => setActivation(activation ? 0 : 1) }
                        />
                    </div>
</div>
                    <div className='flex flex-wrap px-1 gap-3'>
                        <Checkbox
                            key={1} 
                            label={text.user.invacaton}
                            checked={vacition == 1}
                            // value={permission.id}
                            onChange={ () => setVacition(vacition ? 0 : 1) }
                        />
                        <Checkbox
                            key={0} 
                            label={text.user.working}
                            checked={vacition == 0}
                            // value={permission.id}
                            onChange={ () => setVacition(vacition ? 0 : 1) }
                        />
                    </div>
                    <div className="flex items-center justify-end gap-4">
                    <Button
                        variant="outline"
                        onClick={closeModal}
                        className="w-full @xl:w-auto"
                    >
                        {text.user.cancel}
                    </Button>
                    <Button
                        type="submit"
                        isLoading={isLoading}
                        className="w-full @xl:w-auto"
                    >
                        {initValues ? text.user.updateuser : text.user.crt_btnform}
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
