'use client';

import DeletePopover from '@/app/shared/delete-popover';
import PencilIcon from '@/components/icons/pencil';
import TrashIcon from '@/components/icons/trash';
import { ActionIcon } from '@/components/ui/action-icon';
import { Checkbox } from '@/components/ui/checkbox';
import DateCell from '@/components/ui/date-cell';
import { HeaderCell } from '@/components/ui/table';
import { Tooltip } from '@/components/ui/tooltip';
import CreateButton from '../create-button';
import CategoryForm from './category-form';

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
            view={<CategoryForm initValues={row} />}
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
    title: <HeaderCell title="Name" align="center" />,
    dataIndex: 'name',
    key: 'name',
    width: 200,
    hidden: 'name',
    render: (_: string, row: any) => (
      <div className="w-full text-center">{row?.name}</div>
    ),
  },
  {
    title: <HeaderCell title="Description" align="center" />,
    dataIndex: 'description',
    key: 'description',
    width: 200,
    hidden: 'description',
    render: (_: string, row: any) => (
      <Tooltip
        showArrow
        className=" "
        content={() => (
          <div className="  max-w-[400px] ">{row?.description}</div>
        )}
      >
        <div className="mx-auto line-clamp-2 max-w-[400px] text-center">
          {row?.description}
        </div>
      </Tooltip>
    ),
  },
  {
    title: <HeaderCell title="Status" align="center" />,
    dataIndex: 'status',
    key: 'status',
    width: 200,
    hidden: 'status',
    render: (_: string, row: any) => (
      <div className="w-full text-center">{row?.status}</div>
    ),
  },
  {
    title: <HeaderCell title="Start Date" align="center" />,
    dataIndex: 'start_date',
    key: 'start_date',
    width: 200,
    hidden: 'start_date',
    render: (_: string, row: any) => (
      <div className="w-full text-center">{row?.start_date}</div>
    ),
  },
  {
    title: <HeaderCell title="End_date" align="center" />,
    dataIndex: 'end_date',
    key: 'end_date',
    width: 200,
    hidden: 'end_date',
    render: (_: string, row: any) => (
      <div className="w-full text-center">{row?.end_date}</div>
    ),
  },
  {
    title: (
      <HeaderCell
        title={text_tr.brands.created}
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
  {
    title: (
      <HeaderCell
        title="Updated At"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'updated_at'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('updated_at'),
    dataIndex: 'updated_at',
    key: 'updated_at',
    width: 50,
    render: (value: Date) => <DateCell date={value} />,
  },
];
