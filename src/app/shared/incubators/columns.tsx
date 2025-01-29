'use client';

import DeletePopover from '@/app/shared/delete-popover';
import PencilIcon from '@/components/icons/pencil';
import { ActionIcon } from '@/components/ui/action-icon';
import AvatarCard from '@/components/ui/avatar-card';
import { Checkbox } from '@/components/ui/checkbox';
import DateCell from '@/components/ui/date-cell';
import { HeaderCell } from '@/components/ui/table';
import { Tooltip } from '@/components/ui/tooltip';
import TrashIcon from '@/components/icons/trash';
import CreateButton from '../create-button';
import BrandForm from './brand-form';

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
  PreviousIncubators?: boolean;
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
  PreviousIncubators,
}: Columns) => {
  const columns = [
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
              view={
                <BrandForm
                  initValues={row}
                  PreviousIncubators={PreviousIncubators}
                />
              }
              label=""
              className="m-0 bg-transparent p-0 text-gray-700"
            />
          </Tooltip>
          <DeletePopover
            title={`Delete Incubator`}
            description={`Are you sure you want to delete this #${row.id} Incubator?`}
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
      title: <HeaderCell title="Name" />,
      dataIndex: 'name',
      key: 'name',
      width: 300,
      hidden: 'name',

      render: (_: string, row: any) => (
        <AvatarCard
          //@ts-ignore
          src={row?.attachment[0].original || ''}
          name={row?.name[`${text_tr.ar}`] || ''}
          description={`ID-${row.id}`}
        />
      ),
    },

    {
      title: <HeaderCell title="Website Link" />,
      dataIndex: 'social?.link',
      key: 'web link',
      width: 300,
      hidden: 'social?.link',

      render: (_: string, row: any) => (
        <a href={row?.social?.link} target="_blank">
          {row?.social?.link ? 'Website Link' : ''}
        </a>
      ),
    },
    {
      title: <HeaderCell title="LinkedIn" />,
      dataIndex: 'social?.linkedin',
      key: 'linkedin',
      width: 300,
      hidden: 'social?.linkedin',

      render: (_: string, row: any) => (
        <a href={row?.social?.linkedin} target="_blank">
          {row?.social?.linkedin ? 'LinkedIn Link' : ''}
        </a>
      ),
    },
    {
      title: <HeaderCell title="Face Book Link" />,
      dataIndex: 'social?.facebook',
      key: 'face book',
      width: 300,
      hidden: 'social?.facebook',

      render: (_: string, row: any) => (
        <a href={row?.social?.facebook} target="_blank">
          {row?.social?.facebook ? 'Face Book' : ''}
        </a>
      ),
    },
    {
      title: <HeaderCell title="twetter Link" />,
      dataIndex: 'social?.twetter',
      key: 'twetter',
      width: 300,
      hidden: 'social?.twetter',

      render: (_: string, row: any) => (
        <a href={row?.social?.twetter} target="_blank">
          {row?.social?.twetter ? 'Twitter' : ''}
        </a>
      ),
    },
    {
      title: <HeaderCell title="instgram Link" />,
      dataIndex: 'social?.instgram',
      key: 'instgram',
      width: 300,
      hidden: 'social?.instgram',

      render: (_: string, row: any) => (
        <a href={row?.social?.instgram} target="_blank">
          {row?.social?.instgram ? 'Instagram' : ''}
        </a>
      ),
    },
    {
      title: <HeaderCell title="Activation" />,
      dataIndex: 'active',
      key: 'activation',
      width: 300,
      hidden: 'active',

      render: (_: string, row: any) => (row?.active ? 'Active' : 'Not Active'),
    },
    {
      title: <HeaderCell title="Description" />,
      dataIndex: 'description',
      key: 'description',
      width: 300,
      hidden: 'description',

      render: (_: string, row: any) => row?.description[`${text_tr.ar}`],
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
  ];
  const yearColumn = {
    title: <HeaderCell title="Year" />,
    dataIndex: 'year',
    key: 'year',
    width: 80,
    hidden: 'year',
    render: (_: string, row: any) => <div>{row?.year}</div>,
  };
  if (PreviousIncubators) {
    columns.splice(3, 0, yearColumn);
  }
  return columns;
};
