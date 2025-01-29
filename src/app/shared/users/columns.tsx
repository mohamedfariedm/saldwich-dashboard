'use client';

import Link from 'next/link';
import { type Invoice } from '@/data/invoice-data';
import { routes } from '@/config/routes';
// import { Title, Text } from '@/components/ui/text';
// import { Badge } from '@/components/ui/badge';
import { Tooltip } from '@/components/ui/tooltip';
import { HeaderCell } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { ActionIcon } from '@/components/ui/action-icon';
// import EyeIcon from '@/components/icons/eye';
import PencilIcon from '@/components/icons/pencil';
import AvatarCard from '@/components/ui/avatar-card';
import DateCell from '@/components/ui/date-cell';
import DeletePopover from '@/app/shared/delete-popover';
import CreateButton from '../create-button';
import UserForm from './user-form';
import { IPermission, Role } from '@/types';
import TrashIcon from '@/components/icons/trash';

// function getStatusBadge(status: string) {
//   switch (status?.toLowerCase()) {
//     case 'pending':
//       return (
//         <div className="flex items-center">
//           <Badge color="warning" renderAsDot />
//           <Text className="ms-2 font-medium text-orange-dark">{status}</Text>
//         </div>
//       );
//     case 'paid':
//       return (
//         <div className="flex items-center">
//           <Badge color="success" renderAsDot />
//           <Text className="ms-2 font-medium text-green-dark">{status}</Text>
//         </div>
//       );
//     case 'overdue':
//       return (
//         <div className="flex items-center">
//           <Badge color="danger" renderAsDot />
//           <Text className="ms-2 font-medium text-red-dark">{status}</Text>
//         </div>
//       );
//     default:
//       return (
//         <div className="flex items-center">
//           <Badge renderAsDot className="bg-gray-400" />
//           <Text className="ms-2 font-medium text-gray-600">{status}</Text>
//         </div>
//       );
//   }
// }

type Columns = {
  data: any[];
  sortConfig?: any;
  text_tr?:any; 
  handleSelectAll: any;
  permitions?:any;
  checkedItems: string[];
  onDeleteItem: (id: string[]) => void;
  onHeaderCellClick: (value: string) => void;
  onChecked?: (id: string) => void;
  roles?: Role[]
};

export const getColumns = ({
  data,
  sortConfig,
  text_tr, 
  checkedItems,
  onDeleteItem,
  permitions,
  onHeaderCellClick,
  handleSelectAll,
  onChecked,
  roles
}: Columns) => {
  console.log(permitions);
  
if(data[0]?.store){
  return[
    {
      title: (
        <div className="ps-2">
          <Checkbox
            title={'Select All'}
            onChange={handleSelectAll}
            checked={checkedItems.length === data.length}
            className="cursor-pointer"
          />
        </div>
      ),
      dataIndex: 'checked',
      key: 'checked',
      width: 20,
      render: (_: any, row: any) => (
        <div className="inline-flex">
          <Checkbox
            className="cursor-pointer"
            checked={checkedItems.includes(row.id)}
            {...(onChecked && { onChange: () => onChecked(row.id) })}
          />
        </div>
      ),
    },
    {
        title: <></>,
        dataIndex: 'action',
        key: 'action',
        width: 20,
        render: (_: string, row: any) => (
          <div className="flex items-center gap-3">
           {permitions?.includes("edit_user")? <Tooltip
              size="sm"
              content={() => 'Edit Invoice'}
              placement="top"
              color="invert"
            >
              <CreateButton
                icon={
                  <ActionIcon
                    tag="span"
                    size="sm"
                    variant="outline"
                    className="hover:!border-gray-900 hover:text-gray-700"
                  >
                    <PencilIcon className="h-4 w-4" />
                  </ActionIcon>
                }
                view={<UserForm initValues={row} text={text_tr} />}
                label=''
                className='p-0 m-0 bg-transparent text-gray-700'
              />
            </Tooltip>:''}
            {permitions?.includes("delete_user")?<DeletePopover
              title={`Delete user`}
              description={`Are you sure you want to delete this #${row.id} user?`}
              onDelete={() => onDeleteItem([row.id])}
            >
              <ActionIcon
                size="sm"
                variant="outline"
                aria-label={'Delete Item'}
                className="cursor-pointer hover:!border-gray-900 hover:text-gray-700"
              >
                <TrashIcon className="h-4 w-4" />
              </ActionIcon>
            </DeletePopover>:''}
          </div>
        ),
      },
  
    {
      title: <HeaderCell title={text_tr.user.userName} />,
      dataIndex: 'name',
      key: text_tr.user.userName,
      hidden: 'name',
      width: 100,

      render: (_: string, row: any) => (
        <AvatarCard
          src={row?.image}
          name={row.name}
          description={`ID-${row.id}`}
          className='w-3/4'
        />
      ),
    },
    {
      title: <HeaderCell title={text_tr.user.roles} />,
      dataIndex: 'roles',
      key:text_tr.user.roles,
      hidden: 'roles',
      width: 100,
      render: (roles: Role[]) => roles && roles?.length > 0 ? roles?.reduce((acc, role) => {
        acc = {
          ...acc,
          name: acc.name.concat(' ,' ,role.name)
        }
        return acc
      })?.name : '',
    },
    {
      title: <HeaderCell title={text_tr.user.store_Name} />,
      dataIndex: 'store.name',
      key: text_tr.user.store_Name,
      width: 100,
      hidden: 'store name',
      render:(_: string, row: any) => row?.store?.name,
    },
    {
      title: <HeaderCell title="Mac Id" />,
      dataIndex: 'mac_id',
      key: 'mac_id',
      width: 100,
      hidden: 'mac_id',
      render: (mac_id: string) => mac_id,
    },
    {
      title: <HeaderCell title={ text_tr.user.email} />,
      dataIndex: 'email',
      key: text_tr.user.email,
      width: 100,
      hidden: 'email',
  
      render: (email: string) => email.toLowerCase(),
    },
    {
      title: <HeaderCell title={text_tr.user.phone} />,
      dataIndex: 'phone',
      key: text_tr.user.phone,
      width: 100,
      hidden: 'phone',
  
      render: (phone: string) => phone,
    },
    {
      title: <HeaderCell title={ text_tr.user.address} />,
      dataIndex: 'address',
      key: text_tr.user.address,
      width: 200,
      hidden: 'address',
  
      render: (address: string) => address,
    },
    {
      title: <HeaderCell title={ text_tr.user.birth_date} />,
      dataIndex: 'birth_date',
      key: text_tr.user.birth_date,
      width: 50,
      hidden: 'birth_date',
  
      render: (value: Date) => <DateCell date={value} />,
    },
    {
      title: <HeaderCell title={ text_tr.user.gender} />,
      dataIndex: 'gendor',
      key: text_tr.user.gender,
      width: 30,
      hidden: 'gendor',
  
      render: (gendor: number) => gendor ? "Male" : "Female" ,
    },
    {
      title: <HeaderCell title={text_tr.user.activation} />,
      dataIndex: 'activation',
      key: text_tr.user.activation,
      width: 30,
      hidden: 'activation',
  
      render: (activation: number) => activation ? "Active" : "Not Active" ,
    },
    {
      title: <HeaderCell title={ text_tr.user.vacation} />,
      dataIndex: 'vacation',
      key: text_tr.user.vacation,
      width: 30,
      hidden: 'vacation',
  
      render: (vacation: number) => vacation ? "In Vacation" : "Working" ,
    },
    {
      title: (
        <HeaderCell
          title={text_tr.user.created}
          sortable
          ascending={
            sortConfig?.direction === 'asc' && sortConfig?.key === 'created_at'
          }
        />
      ),
      onHeaderCell: () => onHeaderCellClick('created_at'),
      dataIndex: 'created_at',
      key:text_tr.user.created,
      width: 50,
      render: (value: Date) => <DateCell date={value} />,
    },
    
  ];
}else{
  return[
    {
      title: (
        <div className="ps-2">
          <Checkbox
            title={'Select All'}
            onChange={handleSelectAll}
            checked={checkedItems.length === data.length}
            className="cursor-pointer"
          />
        </div>
      ),
      dataIndex: 'checked',
      key: 'checked',
      width: 20,
      render: (_: any, row: any) => (
        <div className="inline-flex">
          <Checkbox
            className="cursor-pointer"
            checked={checkedItems.includes(row.id)}
            {...(onChecked && { onChange: () => onChecked(row.id) })}
          />
        </div>
      ),
    },
    {
        title: <></>,
        dataIndex: 'action',
        key: 'action',
        width: 20,
        render: (_: string, row: any) => (
          <div className="flex items-center gap-3">
          {permitions?.includes("edit_user")?  <Tooltip
              size="sm"
              content={() => 'Edit Invoice'}
              placement="top"
              color="invert"
            >
              <CreateButton
                icon={
                  <ActionIcon
                    tag="span"
                    size="sm"
                    variant="outline"
                    className="hover:!border-gray-900 hover:text-gray-700"
                  >
                    <PencilIcon className="h-4 w-4" />
                  </ActionIcon>
                }
                view={<UserForm initValues={row} text={text_tr} />}
                label=''
                className='p-0 m-0 bg-transparent text-gray-700'
              />
            </Tooltip>:''}
         {permitions?.includes("delete_user")?   <DeletePopover
              title={`Delete user`}
              description={`Are you sure you want to delete this #${row.id} user?`}
              onDelete={() => onDeleteItem([row.id])}
            >
              <ActionIcon
                size="sm"
                variant="outline"
                aria-label={'Delete Item'}
                className="cursor-pointer hover:!border-gray-900 hover:text-gray-700"
              >
                <TrashIcon className="h-4 w-4" />
              </ActionIcon>
            </DeletePopover>:''}
          </div>
        ),
      },
  
    {
      title: <HeaderCell title={text_tr.user.userName} className='w-32'/>,
      dataIndex: 'name',
      key: text_tr.user.userName,
      hidden: 'name',
      width: 450,
      render: (_: string, row: any) => (
        <AvatarCard
          src={row?.image}
          name={row.name}
          description={`ID-${row.id}`}
        />
      ),
    },
    {
      title: <HeaderCell title={text_tr.user.role} />,
      dataIndex: 'roles',
      key: text_tr.user.role,
      width: 450,
      hidden: 'roles',
  
      render: (roles: Role[]) => roles && roles?.length > 0 ? roles?.reduce((acc, role) => {
        acc = {
          ...acc,
          name: acc.name.concat(' ,' ,role.name)
        }
        return acc
      })?.name : '',
    },
    {
      title: <HeaderCell title="Mac Id" />,
      dataIndex: 'mac_id',
      key: 'mac_id',
      width: 100,
      hidden: 'mac_id',
      render: (mac_id: string) => mac_id,
    },
    {
      title: <HeaderCell title={text_tr.user.email} />,
      dataIndex: 'email',
      key:text_tr.user.email,
      width: 100,
      hidden: 'email',
  
      render: (email: string) => email.toLowerCase(),
    },
    {
      title: <HeaderCell title={text_tr.user.phone} />,
      dataIndex: 'phone',
      key: text_tr.user.phone,
      width: 100,
      hidden: 'phone',
  
      render: (phone: string) => phone,
    },
    {
      title: <HeaderCell title={text_tr.user.address} />,
      dataIndex: 'address',
      key: text_tr.user.address,
      width: 200,
      hidden: 'address',
  
      render: (address: string) => address,
    },
    {
      title: <HeaderCell title={text_tr.user.birth_date} />,
      dataIndex: 'birth_date',
      key:text_tr.user.birth_date,
      width: 50,
      hidden: 'birth_date',
  
      render: (value: Date) => <DateCell date={value} />,
    },
    {
      title: <HeaderCell title={text_tr.user.gender} />,
      dataIndex: 'gendor',
      key:text_tr.user.gender,
      width: 30,
      hidden: 'gendor',
  
      render: (gendor: number) => gendor ? "Male" : "Female" ,
    },
    {
      title: <HeaderCell title={text_tr.user.activation} />,
      dataIndex: 'activation',
      key:text_tr.user.activation,
      width: 30,
      hidden: 'activation',
  
      render: (activation: number) => activation ? "Active" : "Not Active" ,
    },
    {
      title: <HeaderCell title={text_tr.user.vacation} />,
      dataIndex: 'vacation',
      key:text_tr.user.vacation,
      width: 30,
      hidden: 'vacation',
  
      render: (vacation: number) => vacation ? "In Vacation" : "Working" ,
    },
    {
      title: (
        <HeaderCell
          title={text_tr.user.created}
          sortable
          ascending={
            sortConfig?.direction === 'asc' && sortConfig?.key === 'created_at'
          }
        />
      ),
      onHeaderCell: () => onHeaderCellClick('created_at'),
      dataIndex: 'created_at',
      key: text_tr.user.created,
      width: 50,
      render: (value: Date) => <DateCell date={value} />,
    },
    
  ];
}



}



