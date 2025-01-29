'use client';

import { useEffect, useState } from 'react';
import { PiXBold } from 'react-icons/pi';
import { SubmitHandler } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { ActionIcon } from '@/components/ui/action-icon';
import {
  CreateRoleInput,
  createRoleSchema,
} from '@/utils/validators/create-role.schema';
import { Title, Text } from '@/components/ui/text';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { useQueryClient  } from '@tanstack/react-query';
import { useCreateRoles, useGetRole, useUpdateRole, usePermissions } from '@/framework/roles'
import { IPermission } from '@/types'
import toast from 'react-hot-toast';
import Spinner from '@/components/ui/spinner';

// main category form component for create and update category
export default function CreateRole({text, initValues}: {text?:any,
    initValues?: any
}) {
  const { closeModal } = useModal();
  const [reset, setReset] = useState({});
  const [isLoading, setLoading] = useState(false);
  const { data: permissions, isLoading: isPermissionsLoading } = usePermissions();
  const { mutate, isPending } = useCreateRoles();
  const { mutate: update } = useUpdateRole();
  const { data: details } = useGetRole(Number(initValues?.id) || 0)
  const [checkedItems, setCheckedItems] = useState<number[]>([])
  const queryClient = useQueryClient();
  useEffect(() => {
    //@ts-ignore
    if(details?.data){
      //@ts-ignore
      setCheckedItems(details?.data.permissions?.map(item => item?.id))
    } else {
      setCheckedItems([])
    }
  }, [details])
  const onChecked = (id: number) => {
    checkedItems?.includes(id) ? setCheckedItems(checkedItems.filter(item => item !== id)) : setCheckedItems([...checkedItems, id]) 
  }

  const onSubmit: SubmitHandler<CreateRoleInput> = (data) => {
    if(initValues) {
      update({
        role_id: initValues?.id ,name: data.roleName, permission: checkedItems
      })
    } else {
      mutate({name: data.roleName, permission: checkedItems})
    }
    setLoading(isPending);
    setReset({
      roleName: '',
    });
    setCheckedItems([])
    // closeModal()
  };

  return (
    <>
    {isPermissionsLoading ? (
      <div className="m-auto">
          <Spinner size="lg" />
      </div>
    ) : (
    <Form<CreateRoleInput>
      resetValues={reset}
      onSubmit={onSubmit}
      validationSchema={createRoleSchema}
      useFormProps={{
        defaultValues: {
          //@ts-ignore
          roleName: initValues?.name || ''
        }
      }}
      className="flex flex-grow flex-col gap-6 p-6 @container [&_.rizzui-input-label]:font-medium [&_.rizzui-input-label]:text-gray-900 overflow-y-auto"
    >
      {({ register, formState: { errors } }) => {
        
        return (
          
          <>
            <div className="flex items-center justify-between">
              <Title as="h4" className="font-semibold">
                {initValues ? text.updaterole : text.addRole}
              </Title>
              <ActionIcon size="sm" variant="text" onClick={closeModal}>
                <PiXBold className="h-auto w-5" />
              </ActionIcon>
            </div>
            <Input
              label={text.namerole}
              placeholder={text.namerole}
              {...register('roleName')}
              error={errors.roleName?.message}
            />
            {/* <div className='flex flex-wrap px-1 gap-3'>
                {permissions && permissions?.data?.length > 0 ?
                    (  permissions?.data?.map((permission: IPermission) => 
                        <Checkbox
                            // {...register('permissions')}
                            key={permission.id} 
                            label={permission.name}
                            checked={checkedItems?.includes(permission?.id)}
                            // value={permission.id}
                            {...(onChecked && { onChange: () => onChecked(permission?.id) })}
                        />
                        )) : null
                }
            </div> */}
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
                {initValues ? text.updaterole :text.crt_btn_Role }
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
