'use client';

import { Tooltip } from '@/components/ui/tooltip';
import { HeaderCell } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { ActionIcon } from '@/components/ui/action-icon';
import PencilIcon from '@/components/icons/pencil';
import AvatarCard from '@/components/ui/avatar-card';
import DateCell from '@/components/ui/date-cell';
import DeletePopover from '@/app/shared/delete-popover';
// import CreateButton from '../../create-button';
import BrandForm from './brand-form';
import { Retailer } from '@/types';
import TrashIcon from '@/components/icons/trash';
import CreateButton from '../create-button';

type Columns = {
  data: any[];
  permitions?: string[];
  sortConfig?: any;
  text_tr?: any;
  handleSelectAll: any;
  checkedItems: string[];
  onDeleteItem: (id: string[]) => void;
  onHeaderCellClick: (value: string) => void;
  onChecked?: (id: string) => void;
};

export const getColumns = ({
  data,
  permitions,
  sortConfig,
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
        <Tooltip
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
                className="hover:!border-gray-900 hover:text-gray-700 "
              >
                <PencilIcon className="h-4 w-4" />
              </ActionIcon>
            }
            view={<BrandForm initValues={row} />}
            label=""
            className="m-0 bg-transparent p-0 text-gray-700"
          />
        </Tooltip>
        <DeletePopover
          title={`Delete Report`}
          description={`Are you sure you want to delete this #${row.id} `}
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
        </DeletePopover>
      </div>
    ),
  },
  {
    title: <HeaderCell title="Branch Name" />,
    dataIndex: 'name',
    key: 'name',
    width: 150,
    hidden: 'name',

    render: (_: string, row: any) => (
      <AvatarCard
        //@ts-ignore
        src={''}
        name={row?.name?.[`${text_tr.ar}`] || ''}
        description={`ID-${row.id}`}
      />
    ),
  },
  {
    title: <HeaderCell title={'Address'} />,
    dataIndex: 'address',
    key: 'address',
    width: 30,
    hidden: 'address',

    render: (_: string, row: any) => row?.address,
  },
  {
    title: <HeaderCell title={'phone'} />,
    dataIndex: 'phone',
    key: 'phone',
    width: 30,
    hidden: 'phone',

    render: (_: string, row: any) => row?.phone,
  },
  {
    title: <HeaderCell title={'latitude'} />,
    dataIndex: 'latitude',
    key: 'latitude',
    width: 30,
    hidden: 'latitude',

    render: (_: string, row: any) => row?.latitude,
  },
  {
    title: <HeaderCell title={'longitude'} />,
    dataIndex: 'longitude',
    key: 'longitude',
    width: 30,
    hidden: 'longitude',

    render: (_: string, row: any) => row?.longitude,
  },

  // {
  //   title: (
  //     <HeaderCell
  //       title={text_tr.brands.created}
  //       sortable
  //       ascending={
  //         sortConfig?.direction === 'asc' && sortConfig?.key === 'created_at'
  //       }
  //     />
  //   ),
  //   onHeaderCell: () => onHeaderCellClick('created_at'),
  //   dataIndex: 'created_at',
  //   key: 'created_at',
  //   width: 50,
  //   render: (value: Date) => <DateCell date={value} />,
  // },
];
