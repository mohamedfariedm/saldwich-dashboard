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
import BrandForm from './review-bussnes-form';
// import { Retailer } from '@/types';
import TrashIcon from '@/components/icons/trash';
import CreateButton from '../create-button';
import { useRouter } from 'next/router';

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
}: Columns) => {
  return [
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
      width: 1,

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
      width: 1,
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
      title: <HeaderCell align="center" title="Name" />,
      dataIndex: 'name',
      key: 'name',
      width: 100,
      hidden: 'name',

      render: (_: string, row: any) => (
        <div className="flex w-full justify-center  text-center">
          {
            <AvatarCard
              //@ts-ignore
              // src={row?.image[0]?.thumbnail || ''}
              name={row?.name[`${text_tr.ar}`] || ''}
              description={`ID-${row.id}`}
            />
          }
        </div>
      ),
    },
    {
      title: <HeaderCell align="center" title={'Activation'} />,
      dataIndex: 'active',
      key: 'active',
      width: 30,
      hidden: 'active',

      render: (_: string, row: any) => (
        <div className="w-full  text-center">
          {row?.active == 1 ? 'Active' : 'Not Active'}
        </div>
      ),
    },
    {
      title: <HeaderCell align="center" title={'title'} />,
      dataIndex: 'title',
      key: 'title',
      width: 30,
      hidden: 'title',

      render: (_: string, row: any) => (
        <div className="w-full  text-center">{row?.title[`${text_tr.ar}`]}</div>
      ),
    },
    {
      title: <HeaderCell align="center" title={'brands'} />,
      dataIndex: 'brands',
      key: 'brands',
      width: 80,
      hidden: 'brands',

      render: (_: string, row: any) => (
        <div className="flex w-full flex-col gap-1  text-center">
          {row?.brands?.map((brand: any) => (
            <span key={brand.name[`${text_tr.ar}`]}>{brand.name[`${text_tr.ar}`]}</span>
          ))}
        </div>
      ),
    },
    {
      title: <HeaderCell title="description" align="center" />,
      dataIndex: 'description',
      key: 'description',
      width: 200,
      hidden: 'description',
      render: (_: string, row: any) => (
        <Tooltip
          showArrow
          className=" "
          content={() => (
            <div className="  max-w-[400px] ">
              {row?.description[`${text_tr.ar}`]}
            </div>
          )}
        >
          <div className="mx-auto line-clamp-2 max-w-[400px] text-center">
            {row?.description[`${text_tr.ar}`]}
          </div>
        </Tooltip>
      ),
    },

    {
      title: (
        <HeaderCell
          align="center"
          title={'Updated'}
          sortable
          ascending={
            sortConfig?.direction === 'asc' && sortConfig?.key === 'updated_at'
          }
        />
      ),
      onHeaderCell: () => onHeaderCellClick('updated_at'),
      dataIndex: 'updated_at',
      key: 'updated_at',
      width: 100,
      render: (value: Date) => <DateCell date={value} />,
    },
    {
      title: (
        <HeaderCell
          align="center"
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
      width: 100,
      render: (value: Date) => <DateCell date={value} />,
    },
  ];
};
