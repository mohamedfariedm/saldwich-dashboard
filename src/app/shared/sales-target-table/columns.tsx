'use client';

import { HeaderCell } from '@/components/ui/table';

type Columns = {
  data: any[];
  text_tr:any;
  sortConfig?: any;
  handleSelectAll: any;
  checkedItems: string[];
  onHeaderCellClick: (value: string) => void;
  onChecked?: (id: string) => void;
};

export const getColumns = ({
  data,
  sortConfig,
  text_tr,
  checkedItems,
  onHeaderCellClick,
  handleSelectAll,
  onChecked,
}: Columns) => [
    {
        title: <HeaderCell title="" />,
        children: [
            {
              title: <HeaderCell title={text_tr?.sales_target_table.bg} />,
              dataIndex: 'BG',
              key: 'BG',
              width: 30,
              hidden: 'BG',
              render: (_: string, row: any) => row?.BG ,
            },
            {
              title: <HeaderCell title={text_tr?.sales_target_table.bu} />,
              dataIndex: 'BU',
              key: 'BU',
              width: 30,
              hidden: 'BU',
              render: (_: string, row: any) => row?.BU ,
            },
            {
              title: <HeaderCell title={text_tr?.sales_target_table.vcp} />,
              dataIndex: 'VCP',
              key: 'VCP',
              width: 30,
              hidden: 'VCP',
              render: (_: string, row: any) => row?.VCP ,
            },
            {
              title: <HeaderCell title={text_tr?.sales_target_table.skucode}/>,
              dataIndex: 'sku_code',
              key: 'sku code',
              width: 30,
              hidden: 'sku_code',
              render: (_: string, row: any) => row?.sku_code ,
            },
            {
              title: <HeaderCell title={text_tr?.sales_target_table.per} />,
              dataIndex: 'period',
              key: 'period',
              width: 100,
              hidden: 'period',
              render: (_: string, row: any) => row?.period ,
            },
        ]
    },
    {
        title: <HeaderCell title={text_tr?.sales_target_table.qty} className='justify-center' />,
        children: [
            {
              title: <HeaderCell title={text_tr?.sales_target_table.tgt} />,
              dataIndex: 'tgt_quentity',
              key: 'TGT',
              width: 30,
              hidden: 'TGT',
              render: (_: string, row: any) => row?.tgt_quentity ,
            },
            {
              title: <HeaderCell title={text_tr?.sales_target_table.cy} />,
              dataIndex: 'achived_quentity',
              key: 'CY',
              width: 30,
              hidden: 'CY',
              render: (_: string, row: any) => row?.achived_quentity ,
            },
            {
              title: <HeaderCell title={text_tr?.sales_target_table.remain} />,
              dataIndex: 'remaining_quentity',
              key: 'Remaining',
              width: 30,
              hidden: 'Remaining',
              render: (_: string, row: any) => row?.remaining_quentity ,
            },
            {
              title: <HeaderCell title={text_tr?.sales_target_table.ach} />,
              dataIndex: 'ACH_quentity',
              key: 'ACH',
              width: 30,
              hidden: 'ACH',
              render: (_: string, row: any) => row?.ACH_quentity+"%" ,
            },
            {
              title: <HeaderCell title={text_tr?.sales_target_table.ach_remin} />,
              dataIndex: 'ACH_remaining_quentity',
              key: 'ACH Remaining',
              width: 150,
              hidden: 'ACH_remaining',
              render: (_: string, row: any) => row?.ACH_remaining_quentity+"%" ,
            },
        ]
    },
    {
        title: <HeaderCell title={text_tr?.sales_target_table.val} className='justify-center' />,
        children: [
            {
              title: <HeaderCell title={text_tr?.sales_target_table.tgt} />,
              dataIndex: 'tgt_value',
              key: 'TGT Value',
              width: 30,
              hidden: 'TGT_value',
              render: (_: string, row: any) => row?.tgt_value,
            },
            {
                title: <HeaderCell title={text_tr?.sales_target_table.cy} />,
                dataIndex: 'achived_value',
                key: 'CY Value',
                width: 30,
                hidden: 'CY_value',
                render: (_: string, row: any) => row?.achived_value ,
              },
              {
                title: <HeaderCell title={text_tr?.sales_target_table.remain} />,
                dataIndex: 'remaining_value',
                key: 'Remaining Value',
                width: 30,
                hidden: 'remaining_value',
                render: (_: string, row: any) => row?.remaining_value ,
              },
              {
                title: <HeaderCell title={text_tr?.sales_target_table.ach} />,
                dataIndex: 'achived_value',
                key: 'ACH Value',
                width: 30,
                hidden: 'ACH_value',
                render: (_: string, row: any) => row?.achived_value+"%",
              },
              {
                title: <HeaderCell title={text_tr?.sales_target_table.ach_remin} />,
                dataIndex: 'ACH_remaining_value',
                key: 'ACH Remaining Value',
                width: 150,
                hidden: 'ACH_remaining_value',
                render: (_: string, row: any) => row?.ACH_remaining_value+"%",
              },
        ]
    },
];
