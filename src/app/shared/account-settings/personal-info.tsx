'use client';

import dynamic from 'next/dynamic';
import toast from 'react-hot-toast';
import { SubmitHandler, Controller } from 'react-hook-form';
import { PiClock, PiEnvelopeSimple } from 'react-icons/pi';
import { Form } from '@/components/ui/form';
import { Text } from '@/components/ui/text';
import { Input } from '@/components/ui/input';
import Spinner from '@/components/ui/spinner';
import FormGroup from '@/app/shared/form-group';
import FormFooter from '@/components/form-footer';
import {
  personalInfoFormSchema,
  PersonalInfoFormTypes,
} from '@/utils/validators/personal-info.schema';
import UploadZone from '@/components/ui/file-upload/upload-zone';
import { countries, roles, timezones } from '@/data/forms/my-details';
import AvatarUpload from '@/components/ui/file-upload/avatar-upload';
import { Checkbox } from 'rizzui';
import { useState } from 'react';
import { array } from 'zod';
import { useUpdateGeneralSettings } from '@/framework/generalsettings';
import { isatty } from 'tty';


const SelectBox = dynamic(() => import('@/components/ui/select'), {
  ssr: false,
  loading: () => (
    <div className="grid h-10 place-content-center">
      <Spinner />
    </div>
  ),
});
const QuillEditor = dynamic(() => import('@/components/ui/quill-editor'), {
  ssr: false,
});

export default function PersonalInfoView({initialValues,createPermition}:{initialValues?:any,createPermition:boolean}) {
  let x=initialValues?.find((value:any)=>value.type=="boolean")?.value;
  const [isActive, setIsActive] = useState<string>(x)
  //  initialValues?.find((value:any)=>value.type=="boolean").value
  // console.log(initialValues);
  console.log(isActive);


  const { mutate: update } = useUpdateGeneralSettings();


  const onSubmit: SubmitHandler<PersonalInfoFormTypes> = (data) => {
    console.log("data",data);
    
    const entries = Object.entries(data);
    console.log("entries : ",entries);
    
    let dataIndex=[]
    let fathy=[]
    for (let index = 0; index < entries.length; index+=1) {


      
      if(entries[index][0].includes(" ")&&entries[index][0].includes("en")||entries[index][0].includes("ar")){
        let x=entries[index][0].indexOf(" ")
        let y=entries[index][0].length
        console.log(y);
        
           
        let arrindex=[]
        for (let x = index; x <index+2 ; x++) {
          arrindex.push(entries[x][1])
        }        
        dataIndex.push([entries[index][0].slice(0,x),`{\"en\":\"${arrindex[0]}\",\"ar\":\"${arrindex[1]}\"}`])
        index++
      }else if(entries[index][0].includes(" ")&&entries[index][0].includes("from")||entries[index][0].includes("to")){
        let x=entries[index][0].indexOf(" ")
        let y=entries[index][0].length
        console.log(y);
        
           
        let arrindex=[]
        for (let x = index; x <index+2 ; x++) {
          arrindex.push(entries[x][1])
        }        
        dataIndex.push([entries[index][0].slice(0,x),`{\"from\":\"${arrindex[0]}\",\"to\":\"${arrindex[1]}\"}`])
        index++
      }else if(entries[index][0].includes(" ")&&entries[index][0].includes("android")||entries[index][0].includes("ios")){
        let x=entries[index][0].indexOf(" ")
        let y=entries[index][0].length
        console.log(y);
        
           
        let arrindex=[]
        for (let x = index; x <index+2 ; x++) {
          arrindex.push(entries[x][1])
        }        
        dataIndex.push([entries[index][0].slice(0,x),`{\"android\":\"${arrindex[0]}\",\"ios\":\"${arrindex[1]}\"}`])
        index++
      }
      else{
        dataIndex.push([entries[index][0],entries[index][1]]); 
      }
       
    }
    for(let i=0;i<dataIndex.length;i++){
      fathy.push(JSON.stringify({key:dataIndex[i][0],value:dataIndex[i][1]}))
    }
    let obj = {values:fathy}
    
    update({...obj
  })

  };

  return (
    <Form<any>
      // validationSchema={personalInfoFormSchema}
      // resetValues={reset}
      onSubmit={onSubmit}
      className='@container'
      useFormProps={{
        mode: 'onChange',
        // defaultValues:{
        //   first_name: '',
        //   last_name: undefined,
        //   email: '',
        //   avatar: undefined,
        //   role: undefined,
        //   country: undefined,
        //   timezone: undefined,
        //   bio: undefined,
        //   portfolios: undefined,
        // },
      }}
    >
      {({ register, control, setValue, getValues, formState: { errors } }) => {
        return (
        <>
            <FormGroup
              title=""
              className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
            />

            <div className="mb-10 grid gap-7  @2xl:gap-9 @3xl:gap-11">
              {

initialValues?.map((obj:any)=>{
  if(obj.type=="select"){

    return <div key={obj.id} className=''>

    <h4 className=" ">{obj.label}</h4>

    {obj.value.map((obj:any,index:number)=>{
    return<FormGroup
    key={obj.id+obj.key}
    title={obj.key}
    className="my-3"
  >
    <Input
      placeholder={obj.value}
      defaultValue={obj.value}
      {...register(String(obj.id+" "+obj.key))}
      className="flex-grow "
    />
  </FormGroup>
    })}
<hr />
    </div>
    
  }
  else if(obj.type=="boolean"){

    return <div key={obj.id+obj.type}>

    <h4 className=" ">{obj.label}</h4>

    <div className='flex flex-wrap px-1 gap-3 my-3'>
    <label htmlFor="field-true" className="font-medium text-gray-700 dark:text-gray-600 mb-1.5 px-5">
                    <input
                    className="font-medium text-gray-700 dark:text-gray-600 mb-1.5 "
                        {...register(String(obj.id))}
                        type="radio"
                        name={String(obj.id)}
                        value="true"
                        onClick={()=>{
                          setIsActive("true")
                        }}
                        checked={isActive=="true"}
                        id="field-true"
                    />
                    <h5>

                    true
                    </h5>
                </label>
    <label htmlFor="field-false" className="font-medium text-gray-700 dark:text-gray-600 mb-1.5">
                    <input
                    className="font-medium text-gray-700 dark:text-gray-600 mb-1.5 "
                        {...register(String(obj.id))}
                        type="radio"
                        name={String(obj.id)}
                        onClick={()=>{
                          setIsActive("false")
                        }}
                        value="false"
                        checked={isActive=="false"}
                        id="field-false"
                    />
                    <h5>

                    false
                    </h5>
                </label>

                    </div>
<hr />
    </div>
  }
  else if(obj.type=="textarea"){

    return <div key={obj.id+obj.type} >

    <h4 >{obj.label}</h4>

    <FormGroup
                title=""
                className="h4 my-3"
              >
                <Controller
                  control={control}
                  name={String(obj.id)}
                  defaultValue={obj.value}
                  render={({ field: { onChange, value } }) => (
                    <QuillEditor
                      value={value}
                      onChange={onChange}
                      className="@3xl:col-span-full [&>.ql-container_.ql-editor]:min-h-[100px]"
                      labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
                    />
                  )}
                />
              </FormGroup>
<hr />
    </div>
  }
  else if(obj.type=="number"){

    return<div key={obj.id+obj.type}>
    <h4 >{obj.label}</h4>
    <FormGroup
    title=""
    className="my-3 "
  >
    <Input
    defaultValue={obj.value}
      placeholder={obj.value}
      {...register(String(obj.id))}
      className="flex-grow"
    />
  </FormGroup>

<hr />
    </div>
  }


  })
 }


               {/* <FormGroup
//                 title="Email Address"
//                 className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
//               >
//                 <Input
//                   className="col-span-full"
//                   prefix={
//                     <PiEnvelopeSimple className="h-6 w-6 text-gray-500" />
//                   }
//                   type="email"
//                   placeholder="georgia.young@example.com"
//                   {...register('email')}
//                   error={errors.email?.message}
//                 />
//               </FormGroup>

//               <FormGroup
//                 title="Your Photo"
//                 description="This will be displayed on your profile."
//                 className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
//               >
//                 <div className="flex flex-col gap-6 @container @3xl:col-span-2">
//                   <AvatarUpload
//                     name="avatar"
//                     setValue={setValue}
//                     getValues={getValues}
//                     error={errors?.avatar?.message as string}
//                   />
//                 </div>
//               </FormGroup>

//               <FormGroup
//                 title="Role"
//                 className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
//               >
//                 <Controller
//                   control={control}
//                   name="role"
//                   render={({ field: { value, onChange } }) => (
//                     <SelectBox
//                       placeholder="Select Role"
//                       options={roles}
//                       onChange={onChange}
//                       value={value}
//                       className="col-span-full"
//                       getOptionValue={(option) => option.value}
//                       displayValue={(selected) =>
//                         roles?.find((r) => r.value === selected)?.name ?? ''
//                       }
//                       error={errors?.role?.message as string}
//                     />
//                   )}
//                 />
//               </FormGroup>

//               <FormGroup
//                 title="Country"
//                 className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
//               >
//                 <Controller
//                   control={control}
//                   name="country"
//                   render={({ field: { onChange, value } }) => (
//                     <SelectBox
//                       placeholder="Select Country"
//                       options={countries}
//                       onChange={onChange}
//                       value={value}
//                       className="col-span-full"
//                       getOptionValue={(option) => option.value}
//                       displayValue={(selected) =>
//                         countries?.find((con) => con.value === selected)
//                           ?.name ?? ''
//                       }
//                       error={errors?.country?.message as string}
//                     />
//                   )}
//                 />
//               </FormGroup>

              
//               <FormGroup
//               title="Bio"
//               className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
//               >
//               <Controller
//               control={control}
//               name="bio"
//               render={({ field: { onChange, value } }) => (
//                 <QuillEditor
//                 value={value}
//                 onChange={onChange}
//                 className="@3xl:col-span-2 [&>.ql-container_.ql-editor]:min-h-[100px]"
//                 labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
//                 />
//                 )}
//                 />
//                 </FormGroup>
                
//               <FormGroup
//                 title="Portfolio Projects"
//                 description="Share a few snippets of your work"
//                 className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
//               >
//                 <div className="mb-5 @3xl:col-span-2">
//                 <UploadZone
//                     name="portfolios"
//                     getValues={getValues}
//                     setValue={setValue}
//                     error={errors?.portfolios?.message as string}
//                   />
//                   </div>
//               </FormGroup> */}
                   {/* <FormGroup
//                     title="Timezone"
//                     className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
//                   >
//                     <Controller
//                       control={control}
//                       name="timezone"
//                       render={({ field: { onChange, value } }) => (
//                         <SelectBox
//                           prefix={<PiClock className="h-6 w-6 text-gray-500" />}
//                           placeholder="Select Timezone"
//                           options={timezones}
//                           onChange={onChange}
//                           value={value}
//                           className="col-span-full"
//                           getOptionValue={(option) => option.value}
//                           displayValue={(selected) =>
//                             timezones?.find((tmz) => tmz.value === selected)
//                               ?.name ?? ''
//                           }
//                           error={errors?.timezone?.message as string}
//                         />
//                       )}
//                     />
//                   </FormGroup> */}
            </div>
{
  createPermition?   
  <FormFooter
  // isLoading={isLoading}
 altBtnText="Cancel"
 submitBtnText="Save"
/>:""
}

         </>
        );
      }}

      
    </Form>
  );
}
