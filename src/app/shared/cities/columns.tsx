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
import CityForm from '@/app/shared/cities/city-form';
import { Region, City } from '@/types';
import TrashIcon from '@/components/icons/trash';

type Columns = {
  data: any[];
  permitions?: string[];
  text_tr:any,
  sortConfig?: any;
  handleSelectAll: any;
  checkedItems: string[];
  onDeleteItem: (id: string[]) => void;
  onHeaderCellClick: (value: string) => void;
  onChecked?: (id: string) => void;
  regions: Region[];
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
  regions,
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
        {permitions?.includes('edit_city') ? (
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
                  className="hover:!border-gray-900 hover:text-gray-700"
                >
                  <PencilIcon className="h-4 w-4" />
                </ActionIcon>
              }
              view={<CityForm initValues={row} />}
              label=""
              className="m-0 bg-transparent p-0 text-gray-700"
            />
          </Tooltip>
        ) : (
          ''
        )}
        {permitions?.includes('delete_city') ? (
          <DeletePopover
            title={`Delete city`}
            description={`Are you sure you want to delete this #${row.id} city?`}
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
        ) : (
          ''
        )}
      </div>
    ),
  },

  {
    title: <HeaderCell title={text_tr.cities.cityname}/>,
    dataIndex: 'name',
    key: 'name',
    width: 300,
    hidden: 'name',

    render: (_: string, row: Region) => (
      <AvatarCard
        src={'row.avatar'}
        name={row?.name || ''}
        description={`ID-${row.id}`}
      />
    ),
  },
  {
    title: <HeaderCell title={text_tr.cities.regionname}/>,
    dataIndex: 'regions',
    key: 'regions',
    width: 300,
    hidden: 'regions',

    render: (_: string, row: City) => (
      <AvatarCard
        src={'row.avatar'}
        name={
          regions?.find((region) => region?.id == row.region_id)?.name || ''
        }
        description={`ID-${row.region_id}`}
      />
    ),
  },
  {
    title: <HeaderCell title={text_tr.cities.active} />,
    dataIndex: 'is_active',
    key: 'is_active',
    width: 30,
    hidden: 'is_active',

    render: (is_active: number) => (is_active ? 'Active' : 'Inactive'),
  },
  {
    title: (
      <HeaderCell
        title={text_tr.cities.created}
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
