'use client';

import { useState } from 'react';
import { PiCheckBold, PiXBold } from 'react-icons/pi';
import { Controller, SubmitHandler } from 'react-hook-form';
import { permissions, roles } from '@/app/shared/roles-permissions/utils';
import { AdvancedCheckbox } from '@/components/ui/advanced-checkbox';
import { CheckboxGroup } from '@/components/ui/checkbox-group';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { ActionIcon } from '@/components/ui/action-icon';
import { Button } from '@/components/ui/button';
import { PERMISSIONS } from '@/data/users-data';
import { Title } from '@/components/ui/text';
import { Form } from '@/components/ui/form';
import cn from '@/utils/class-names';
import { Input } from '@/components/ui/input';

import {
  RolePermissionInput,
  rolePermissionSchema,
} from '@/utils/validators/edit-role.schema';
import { log } from 'console';
import { useUpdateRole } from '@/framework/roles';

export default function EditRole({data}:{data:any}) {
  const { closeModal } = useModal();
  const [isLoading, setLoading] = useState(false);
  const { mutate: update } = useUpdateRole();

  let obj:any={}
data?.role_permissions.map(({category,selected_array}:{category:string,selected_array:[]})=>{
let x=category
obj[x]=selected_array.map(String)
})



  const onSubmit: SubmitHandler<RolePermissionInput> = (data:any) => {
    // set timeout ony required to display loading state of the create category button
    console.log(data.name,data.role_id);
      let dataInfo={name:data.name,role_id:data.role_id}
      let dataPermisions:any=[]
    data.name=[]
    data.role_id=[]
    Object.entries(data).map((role:any)=>{
      dataPermisions.push(...role[1])
    })
    update({...dataInfo,permission:dataPermisions})

      // role_id: initValues?.id ,name: data.roleName, permission: checkedItems
    // setLoading(true);
    // setTimeout(() => {
    //   console.log('data', data);
    //   setLoading(false);
    //   closeModal();
    // }, 600);
  };

  return (
    <Form<any>
      onSubmit={onSubmit}
      // validationSchema={rolePermissionSchema}
      useFormProps={{
        mode: 'onChange',
        defaultValues:{
          ...obj,
          name:data.name,
          role_id:data.id,
        } 
      }}
      className="grid grid-cols-1 gap-6 p-6  @container [&_.rizzui-input-label]:font-medium [&_.rizzui-input-label]:text-gray-900"
    >
      {({ register, control, watch, formState: { errors } }) => {
        // console.log('errors', errors);
        // console.log('data', data);

        return (
          <>
            <div className="col-span-full flex items-center justify-between">
              <Title as="h4" className="font-semibold">
                Edit Role
              </Title>
              <ActionIcon size="sm" variant="text" onClick={closeModal}>
                <PiXBold className="h-auto w-5" />
              </ActionIcon>
            </div>
            {/* <Input
              label="Full Name"
              placeholder="Enter user's full name"
              {...register('fullName')}
              className="col-span-full"
              error={errors.fullName?.message}
            /> */}
            <div className="grid gap-4 divide-y divide-y-reverse divide-gray-200">
              <Title as="h5" className="mb-2 text-base font-semibold">
                Role Access
              </Title>
              {/* {roles.map(({ name, value }) => {
                const parent = value.toLowerCase();
                return (
                  <div
                    key={value}
                    className="flex flex-col gap-3 pb-4 md:flex-row md:items-center md:justify-between"
                  >
                    <Title
                      as="h6"
                      className="font-medium text-gray-700 2xl:text-sm"
                    >
                      {name}
                    </Title>
                    <Controller
                      // @ts-ignore
                      name={value.toLowerCase()}
                      control={control}
                      render={({ field: { name, onChange, value } }) => (
                        <CheckboxGroup
                          values={value as string[]}
                          setValues={onChange}
                          className="grid grid-cols-3 gap-4 md:flex"
                        >
                          {permissions.map(({ value, name }) => (
                            <AdvancedCheckbox
                              key={value}
                              name={`${parent}.${value.toLowerCase()}`}
                              value={value}
                              className={cn(
                                'flex h-9 w-[70px] cursor-pointer items-center justify-center gap-1 rounded-md border border-gray-200 md:w-32 md:gap-2'
                              )}
                              inputClassName="[&:checked~span>.icon]:block [&:checked~span]:ring-1 dark:[&:checked~span]:ring-gray-300 [&:checked~span]:ring-offset-0 [&:checked~span]:bg-gray-800 dark:[&:checked~span]:bg-gray-300 [&:checked~span]:!border-gray-800 dark:[&:checked~span]:!border-gray-300 [&:checked~span]:text-white "
                            >
                              <PiCheckBold className="icon hidden h-[14px] w-[14px] md:h-4 md:w-4" />
                              <span className="font-medium">{name}</span>
                            </AdvancedCheckbox>
                          ))}
                        </CheckboxGroup>
                      )}
                    />
                  </div>
                );
              })} */}

<div>
            <Input
              label="Role Name"
              placeholder="Role name"
              {...register('name')}
              // error={errors.name?.message}
            />
            <br />
</div>
            {/* <hr /> */}









{data?.role_permissions.map(({ category,permissions }:{category:any,permissions:any}) => {
                //  const parent = category.toLowerCase();  
                // console.log(permissions);
                              
                return (
                  <div
                    key={category+"125347"}
                    className="flex flex-col gap-3 pb-4 md:flex-row md:items-center md:justify-between"
                  >
                    <Title
                      as="h6"
                      className="font-medium text-gray-700 2xl:text-sm"
                    >
                      {category}
                    </Title>
                    <Controller
                      // @ts-ignore
                      name={category}
                      control={control}
                      render={({ field: { name, onChange, value } }) => (
                        <CheckboxGroup
                          values={value}
                          setValues={onChange}
                          className="grid grid-cols-3 gap-3"
                        >
                          {permissions.map(({ id, name }:{ id:string, name:string }) => {
                            // console.log(id,name);
                            let word=name.replaceAll('_'," ")
                            return <AdvancedCheckbox
                            key={id+category}
                            name={name}
                            value={String(id)}
                            className={cn(
                              'flex-basis flex h-9 w-[70px] cursor-pointer items-center justify-center gap-1 rounded-md border border-gray-200 md:w-32 md:h-16 md:gap-2'
                            )}
                            inputClassName="[&:checked~span>.icon]:block [&:checked~span]:ring-1 dark:[&:checked~span]:ring-gray-300 [&:checked~span]:ring-offset-0 [&:checked~span]:bg-gray-800 dark:[&:checked~span]:bg-gray-300 [&:checked~span]:!border-gray-800 dark:[&:checked~span]:!border-gray-300 [&:checked~span]:text-white "
                          >
                            <span className="text-sm text-center py-10">{word}</span>
                          </AdvancedCheckbox>
                          }


                          
                          
                          )}
                          
                        </CheckboxGroup>
                      )}
                    />
                  </div>
                );
              })}


            </div>

            <div className="col-span-full flex items-center justify-end gap-4">
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
                className="w-full @xl:w-auto dark:bg-gray-200 dark:text-white dark:active:enabled:bg-gray-300"
              >
                Save
              </Button>
            </div>
          </>
        );
      }}
    </Form>
  );
}
