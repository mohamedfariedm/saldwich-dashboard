'use client';

import DateCell from '@/components/ui/date-cell';
import { HeaderCell } from '@/components/ui/table';
import { Tooltip } from 'rizzui';

type Columns = {
  data: any[];
  permitions?: string[];
  sortConfig?: any;
  text_tr?: any;
  handleSelectAll: any;
  checkedItems: string[];
  onHeaderCellClick: (value: string) => void;
  onChecked?: (id: string) => void;
};

export const getColumns = ({
  data,
  permitions,
  sortConfig,
  text_tr,
  checkedItems,
  onHeaderCellClick,
  handleSelectAll,
  onChecked,
}: Columns) => [
  {
    title: <HeaderCell title="Name" align="center" />,
    dataIndex: 'full_name',
    key: 'full_name',
    width: 200,
    hidden: 'full_name',
    render: (_: string, row: any) => (
      <div className="w-full  text-center">{row?.full_name} </div>
    ),
  },
  {
    title: <HeaderCell title="Email" align="center" />,
    dataIndex: 'email',
    key: 'email',
    width: 200,
    hidden: 'email',

    render: (_: string, row: any) => (
      <div className="w-full  text-center">{row?.email} </div>
    ),
  },
  {
    title: <HeaderCell title="Phone" align="center" />,
    dataIndex: 'phone',
    key: 'phone',
    width: 200,
    hidden: 'phone',

    render: (_: string, row: any) => (
      <div className="w-full  text-center">{row?.phone} </div>
    ),
  },
  {
    title: <HeaderCell title="Message" align="center" />,
    dataIndex: 'message',
    key: 'message',
    width: 200,
    hidden: 'message',
    render: (_: string, row: any) => (
      <Tooltip
        showArrow
        className=" "
        content={() => <div className="  max-w-[400px] ">{row?.message}</div>}
      >
        <div className="mx-auto line-clamp-2 max-w-[400px] text-center">
          {row?.message}
        </div>
      </Tooltip>
    ),
  },
  {
    title: (
      <HeaderCell
        title={text_tr.brands.created}
        sortable
        align="center"
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'created_at'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('created_at'),
    dataIndex: 'created_at',
    key: 'created_at',
    width: 80,
    render: (value: Date) => <DateCell date={value} />,
  },
];
