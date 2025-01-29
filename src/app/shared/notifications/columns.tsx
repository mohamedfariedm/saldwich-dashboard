'use client';

import { Tooltip } from '@/components/ui/tooltip';
import { HeaderCell } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { ActionIcon } from '@/components/ui/action-icon';
import PencilIcon from '@/components/icons/pencil';
import AvatarCard from '@/components/ui/avatar-card';
import DateCell from '@/components/ui/date-cell';
import CreateButton from '../create-button';
import ProductForm from './product-form';
import { Region } from '@/types';
import TrashIcon from '@/components/icons/trash';

type Columns = {
  data: any[];
  text_tr:any,
  sortConfig?: any;
  handleSelectAll: any;
  checkedItems: string[];
  onDeleteItem: (id: string[]) => void;
  onHeaderCellClick: (value: string) => void;
  onChecked?: (id: string) => void;
};

export const getColumns = ({
  data,
  sortConfig,
  checkedItems,
  onDeleteItem,
  text_tr,

  onHeaderCellClick,
  handleSelectAll,
  onChecked,
}: Columns) => [
  {
    title: <HeaderCell title={text_tr.notifications.notifcation} />,
    dataIndex: 'user_type',
    key: text_tr.notifications.notifcation,
    width: 100,
    hidden: 'user_type',

    render: (_: string, row: any) => (
      <AvatarCard
        src={row?.image}
        name={row?.user_type || ''}
        description={`ID-${row?.id}`}
      />
    ),
  },
  {
    title: <HeaderCell title={text_tr.notifications.type}/>,
    dataIndex: 'type',
    key:text_tr.notifications.type,
    width: 100,
    hidden: 'type',

    render: (_: string, row: any) => row?.type,
  },
  {
    title: <HeaderCell title={text_tr.notifications.title}/>,
    dataIndex: 'title',
    key: text_tr.notifications.title,
    width: 100,
    hidden: 'title',

    render: (_: string, row: any) => row?.title,
  },
  {
    title: <HeaderCell title={text_tr.notifications.body} />,
    dataIndex: 'body',
    key: text_tr.notifications.body,
    width: 100,
    hidden: 'body',

    render: (_: string, row: any) => row?.body,
  },
  {
    title: (
      <HeaderCell
        title={text_tr.notifications.created}
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
