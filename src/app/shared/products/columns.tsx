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
import ProductForm from './product-form';
import { Region } from '@/types';
import TrashIcon from '@/components/icons/trash';




type Columns = {
  data: any[];
  sortConfig?: any;
  permitions?:string[],
  text_tr?:any;
  handleSelectAll: any;
  checkedItems: string[];
  onDeleteItem: (id: string[]) => void;
  onHeaderCellClick: (value: string) => void;
  onChecked?: (id: string) => void;
};

export const getColumns = ({
  data,
  sortConfig,
  permitions,
  text_tr,
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
         {permitions?.includes('edit_product')? <Tooltip
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
              view={<ProductForm initValues={row} text={text_tr} />}
              label=''
              className='p-0 m-0 bg-transparent text-gray-700'
              
            />
          </Tooltip>:''}
          {permitions?.includes("delete_product") ?<DeletePopover
            title={`Delete product`}
            description={`Are you sure you want to delete this #${row.id} product?`}
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
    title: <HeaderCell title={text_tr.userName} />,
    dataIndex: 'user.name',
    key: text_tr.userName,
    width: 100,
    hidden: 'name',

    render: (_: string, row: any) => (
      <AvatarCard
        src={row?.image}
        name={row?.user?.name || ''}
        description={`ID-${row?.user?.id}`}
      />
    ),
  },
  {
    title: <HeaderCell title={text_tr.cat} />,
    dataIndex: 'category.name',
    key: text_tr.cat,
    width: 100,
    hidden: 'category name',

    render: (_: string, row: any) => row?.category?.name,
  },
  {
    title: <HeaderCell title={text_tr.level} />,
    dataIndex: 'level.name',
    key: text_tr.level,
    width: 100,
    hidden: 'level name',

    render: (_: string, row: any) => row?.level?.name,
  },
  {
    title: <HeaderCell title="VCP" />,
    dataIndex: 'sub_category.name',
    key: 'SubCategory name',
    width: 100,
    hidden: 'sub_category name',

    render: (_: string, row: any) => row?.sub_category?.name,
  },
  {
    title: <HeaderCell title="BU" />,
    dataIndex: 'sub_sub_category.name',
    key: 'BU',
    width: 100,
    hidden: 'sub_sub_category name',

    render: (_: string, row: any) => row?.sub_sub_category?.name,
  },
  {
    title: <HeaderCell title={text_tr.brand_Name} />,
    dataIndex: 'brand.name',
    key: text_tr.brand_Name,
    width: 100,
    hidden: 'brand name',

    render: (_: string, row: any) => row?.brand?.name,
  },
  {
    title: <HeaderCell title={text_tr.model} />,
    dataIndex: 'model',
    key: text_tr.model,
    width: 100,
    hidden: 'model',

    render: (model: string) => model,
  },
  {
    title: <HeaderCell title="sku_code" />,
    dataIndex: 'sku_code',
    key: 'sku_code',
    width: 100,
    hidden: 'sku_code',

    render: (sku_code: string) => sku_code,
  },
  {
    title: <HeaderCell title={text_tr.desc} />,
    dataIndex: 'description',
    key: text_tr.desc,
    width: 100,
    hidden: 'description',

    render: (description: string) => description,
  },
//   {
//     title: <HeaderCell title="Active" />,
//     dataIndex: 'is_active',
//     key: 'is_active',
//     width: 30,
//     hidden: 'is_active',

//     render: (is_active: number) => is_active ? "Active" : "Inactive" ,
//   },
  {
    title: (
      <HeaderCell
        title={text_tr.created}
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'created_at'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('created_at'),
    dataIndex: 'created_at',
    key: text_tr.created,
    width: 50,
    render: (value: Date) => <DateCell date={value} />,
  },
  
];
