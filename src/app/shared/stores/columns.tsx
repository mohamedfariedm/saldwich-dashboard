'use client';

import { Tooltip } from '@/components/ui/tooltip';
import { HeaderCell } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { ActionIcon } from '@/components/ui/action-icon';
import PencilIcon from '@/components/icons/pencil';
import AvatarCard from '@/components/ui/avatar-card';
import DateCell from '@/components/ui/date-cell';
import DeletePopover from '@/app/shared/delete-popover';
import CreateButton from '../create-button';
import StoreForm from './store-form';
import { Retailer } from '@/types';
import TrashIcon from '@/components/icons/trash';

type Columns = {
  data: any[];
  permitions?: string[];
  sortConfig?: any;
  text_tr:any;
  handleSelectAll: any;
  checkedItems: string[];
  onDeleteItem: (id: string[]) => void;
  onHeaderCellClick: (value: string) => void;
  onChecked?: (id: string) => void;
};

export const getColumns = ({
  data,
  sortConfig,
  text_tr,
  permitions,
  checkedItems,
  onDeleteItem,
  onHeaderCellClick,
  handleSelectAll,
  onChecked,
}: Columns) => [
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
        {permitions?.includes("edit_store")?  <Tooltip
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
              view={<StoreForm initValues={row}  text={text_tr}/>}
              label=''
              className='p-0 m-0 bg-transparent text-gray-700'
            />
          </Tooltip>:''}
          {permitions?.includes("delete_store")?<DeletePopover
            title={`Delete store`}
            description={`Are you sure you want to delete this #${row.id} store?`}
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
    title: <HeaderCell title={text_tr.store.storeName} />,
    dataIndex: 'name',
    key: 'name',
    width: 300,
    hidden: 'name',

    render: (_: string, row: any) => (
      <AvatarCard
        src={row?.image}
        name={row?.name || ''}
        description={`ID-${row.id}`}
      />
    ),
  },
  {
    title: <HeaderCell title={text_tr.store.storeCode}  />,
    dataIndex: 'store_code',
    key: 'store_code',
    width: 50,
    hidden: 'store_code',

    render: (store_code: string) => store_code,
  },
  {
    title: <HeaderCell title={text_tr.store.type}  />,
    dataIndex: 'type',
    key: 'type',
    width: 50,
    hidden: 'type',

    render: (type: string) => type,
  },
  {
    title: <HeaderCell title={text_tr.store.contactEmail} />,
    dataIndex: 'contact_email',
    key: 'contact_email',
    width: 50,
    hidden: 'contact_email',

    render: (contact_email: string) => contact_email?.toLowerCase(),
  },
  {
    title: <HeaderCell title={text_tr.store.number} />,
    dataIndex: 'contact_number',
    key: 'contact_number',
    width: 50,
    hidden: 'contact_number',

    render: (contact_number: string) => contact_number,
  },
  {
    title: <HeaderCell title={text_tr.store.address} />,
    dataIndex: 'address',
    key: 'address',
    width: 50,
    hidden: 'address',

    render: (address: string) => address,
  },
  {
    title: <HeaderCell title={text_tr.store.active} />,
    dataIndex: 'is_active',
    key: 'is_active',
    width: 30,
    hidden: 'is_active',

    render: (is_active: number) => is_active ? "Active" : "Inactive" ,
  },
  {
    title: (
      <HeaderCell
        title={text_tr.store.created} 
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'created_at'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('created_at'),
    dataIndex: 'created_at',
    key: 'created_at',
    width: 50,
    render: (value: Date) => <DateCell date={value} />,
  },
  
];
