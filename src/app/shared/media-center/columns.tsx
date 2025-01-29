'use client';

import { Tooltip } from '@/components/ui/tooltip';
import { HeaderCell } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { ActionIcon } from '@/components/ui/action-icon';
import PencilIcon from '@/components/icons/pencil';
import AvatarCard from '@/components/ui/avatar-card';
import DateCell from '@/components/ui/date-cell';
import DeletePopover from '@/app/shared/delete-popover';
import MediaForm from './media-form';
import TrashIcon from '@/components/icons/trash';
import CreateButton from '../create-button';
import Image from 'next/image';
import ReactPlayer from 'react-player/lazy';
import { Button } from '@/components/ui/button';

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
  locale: string;
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
  locale,
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
            view={<MediaForm initValues={row} />}
            label=""
            className="m-0 bg-transparent p-0 text-gray-700"
          />
        </Tooltip>
        <DeletePopover
          title={`Delete Media`}
          description={`Are you sure you want to delete this #${row.id} Media?`}
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
    width: 300,
    hidden: 'name',

    render: (_: string, row: any) => (
      <div className="mx-auto  max-w-[400px] text-center">
        {row?.name?.[locale]}
      </div>
    ),
  },

  {
    title: <HeaderCell title="Date" align="center" />,
    dataIndex: 'date',
    key: 'date',
    width: 100,
    hidden: 'date',

    render: (_: string, row: any) => (
      <div className="mx-auto   text-center">{row?.date}</div>
    ),
  },

  {
    title: <HeaderCell title="Media" align="center" />,
    dataIndex: 'media',
    key: 'media',
    width: 100,
    hidden: 'media',

    render: (_: string, row: any) =>
      row?.type === 'brand_identity' ? (
        <a className='w-full text-center block'  target="_blank" href={row?.media?.original}>
          Download
        </a>
      ) : (
        <div className="flex-center w-full ">
          <Tooltip
            showArrow
            content={() => (
              <div className="  h-72 w-56 overflow-hidden rounded-md">
                {row?.type === 'image' ? (
                  <Image
                    className="trns  h-full w-full  object-cover"
                    src={row?.media?.original}
                    alt={row?.name?.[locale]}
                    width={150}
                    height={150}
                  />
                ) : (
                  <ReactPlayer
                    playing
                    //controls
                    loop
                    url={row?.media?.original}
                    width="100%"
                    height="100%"
                  />
                )}
              </div>
            )}
          >
            <div className=" h-[70px] w-14 cursor-pointer overflow-hidden rounded-md border p-1">
              {row?.type === 'image' ? (
                <Image
                  className="trns h-full w-full  rounded-md object-cover"
                  src={row?.media?.original}
                  alt={row?.name?.[locale]}
                  width={150}
                  height={150}
                />
              ) : (
                <ReactPlayer
                  url={row?.media?.original}
                  width="100%"
                  height="100%"
                />
              )}
            </div>
          </Tooltip>
        </div>
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
];
