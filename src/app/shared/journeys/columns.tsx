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
import JourneyForm from './journeys-form';
import TrashIcon from '@/components/icons/trash';

type Columns = {
  data: any[];
  permitions?: string[];
  text_tr:any;
  sortConfig?: any;
  handleSelectAll: any;
  checkedItems: string[];
  onDeleteItem: (id: string[]) => void;
  onHeaderCellClick: (value: string) => void;
  onChecked?: (id: string) => void;
};

export const getColumns = ({
  data,text_tr,
  sortConfig,
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
          {permitions?.includes("edit_journey")?  
          ( <Tooltip
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
            view={<JourneyForm initValues={row} />}
            label=''
            className='p-0 m-0 bg-transparent text-gray-700'
          />
        </Tooltip>)
          :""}

        {permitions?.includes("delete_journey")?  <DeletePopover
            title={`Delete journey`}
            description={`Are you sure you want to delete this #${row.id} journey?`}
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
    title: <HeaderCell title={text_tr.journeys.username} />,
    dataIndex: 'user.name',
    key: 'useName',
    width: 100,
    hidden: 'user name',

    render: (_: string, row: any) => (
      <AvatarCard
        src={row?.user?.avatar}
        name={row?.user?.name || ''}
        description={`ID-${row.user_id}`}
      />
    ),
  },
  {
    title: <HeaderCell title={text_tr.journeys.userstore} />,
    dataIndex: 'store.name',
    key: 'storeName',
    width: 100,
    hidden: 'store name',
    render: (_: string,row: any) => row?.store?.name,
  },
  {
    title: <HeaderCell title={text_tr.journeys.status} />,
    dataIndex: 'status',
    key: 'status',
    width: 30,
    hidden: 'status',

    render: (status: string) => status ,
  },
  {
    title: <HeaderCell title={text_tr.journeys.priority}/>,
    dataIndex: 'priority',
    key: 'priority',
    width: 30,
    hidden: 'priority',

    render: (priority: string) => priority ,
  },
  {
    title: (
      <HeaderCell
        title={text_tr.journeys.date}
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'date'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('date'),
    dataIndex: 'date',
    key: 'date',
    width: 50,
    render: (value: Date) => <DateCell date={value} />,
  },
  {
    title: (
      <HeaderCell
        title={text_tr.journeys.created}
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
