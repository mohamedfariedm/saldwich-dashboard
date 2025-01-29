'use client';

import DateCell from '@/components/ui/date-cell';
import { HeaderCell } from '@/components/ui/table';
import Link from 'next/link';

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
    title: <HeaderCell title="Startup Name" align="center" />,
    dataIndex: 'startup_name',
    key: 'startup_name',
    width: 200,
    hidden: 'startup_name',
    render: (_: string, row: any) => (
      <div className="w-full  text-center">{row?.startup_name} </div>
    ),
  },
  {
    title: <HeaderCell title="First Name" align="center" />,
    dataIndex: 'f_name',
    key: 'f_name',
    width: 200,
    hidden: 'f_name',
    render: (_: string, row: any) => (
      <div className="w-full  text-center">{row?.f_name} </div>
    ),
  },
  {
    title: <HeaderCell title="Last Name" align="center" />,
    dataIndex: 'l_name',
    key: 'l_name',
    width: 200,
    hidden: 'l_name',
    render: (_: string, row: any) => (
      <div className="w-full  text-center">{row?.l_name} </div>
    ),
  },
  {
    title: <HeaderCell title="Mobile Number" align="center" />,
    dataIndex: 'mobile',
    key: 'mobile',
    width: 200,
    hidden: 'mobile',

    render: (_: string, row: any) => (
      <div className="w-full  text-center">{row?.mobile} </div>
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
  {
    title: <HeaderCell title="" align="center" />,
    dataIndex: 'id',
    key: 'id',
    width: 200,
    hidden: 'id',
    render: (_: string, row: any) => (
      <Link className="mx-auto block w-fit hover:underline" href={`/application-form/${row?.id}`}>
        View More
      </Link>
    ),
  },
];
