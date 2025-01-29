'use client';

import { HeaderCell } from '@/components/ui/table';
import AvatarCard from '@/components/ui/avatar-card';
import DateCell from '@/components/ui/date-cell';
import { Tooltip } from '@/components/ui/tooltip';
import CreateButton from '../create-button';
import EyeIcon from '@/components/icons/eye';
import { ActionIcon } from '@/components/ui/action-icon';
import ReportDetails from '@/app/shared/instore/report-modal'


type Columns = {
  data: any[];
  text_tr?:any,
  sortConfig?: any;
  handleSelectAll: any;
  checkedItems: string[];
  onHeaderCellClick: (value: string) => void;
  onChecked?: (id: string) => void;
};

export const getColumns = ({
  data,
  sortConfig,
  checkedItems,
  onHeaderCellClick,
  text_tr,
  handleSelectAll,
  onChecked,
}: Columns) => [
  {
    title: <></>,
    dataIndex: 'action',
    key: 'action',
    width: 20,
    render: (_: string, row: any) => (
      <div className="flex items-center gap-3">
        <Tooltip
        size="sm"
        content={() => 'View Report'}
        placement="top"
        color="invert"
      >
        <CreateButton
          icon={
          <ActionIcon size="sm" variant="outline" aria-label={'View Benchmark'}>
            <EyeIcon className="h-4 w-4" />
          </ActionIcon>
          }
          view={<ReportDetails id={row.id}/>}
          label=''
          className='p-0 m-0 bg-transparent text-gray-700'
        />
      </Tooltip>
      </div>
    ),
},
{
  title: <HeaderCell title={text_tr.InstorePromotion_report.username}/>,
  dataIndex: 'user.name',
  key: 'username',
  width: 100,
  hidden: 'username',

  render: (_: string, row: any) => (
    <AvatarCard
      src={""}
      name={row?.user?.name || ''}
      description={`ID-${row?.user?.id}`}
    />
  ),
},

    {
    title: <HeaderCell title={text_tr.InstorePromotion_report.region} />,
    dataIndex: 'store.region.name',
    key: 'region',
    width: 30,
    hidden: 'region',

    render: (_: string, row: any) => row?.store?.region?.name ,
  },
    {
    title: <HeaderCell title={text_tr.InstorePromotion_report.city} />,
    dataIndex: 'store.city',
    key: 'city',
    width: 30,
    hidden: 'city',

    render: (_: string, row: any) => row?.store?.city?.name ,
  },
    {
    title: <HeaderCell title={text_tr.InstorePromotion_report.retailer} />,
    dataIndex: 'store.retailer',
    key: 'retailer',
    width: 30,
    hidden: 'retailer',

    render: (_: string, row: any) => row?.store?.retailer?.name ,
  },
    {
    title: <HeaderCell title={text_tr.InstorePromotion_report.storename} />,
    dataIndex: 'store.name',
    key: 'store',
    width: 30,
    hidden: 'name',

    render: (_: string, row: any) => row?.store?.name ,
  },
  {
    title: <HeaderCell title={text_tr.InstorePromotion_report.brand} />,
    dataIndex: 'brand.name',
    key: 'brand',
    width: 30,
    hidden: 'brand',

    render: (_: string, row: any) => row?.brand?.name ,
  },
  {
    title: <HeaderCell title={text_tr.InstorePromotion_report.bg} />,
    dataIndex: 'category.name',
    key: 'BG',
    width: 30,
    hidden: 'category',

    render: (_: string, row: any) => row?.category?.name ,
  },
  {
    title: <HeaderCell title={text_tr.InstorePromotion_report.vcp} />,
    dataIndex: 'sub_category.name',
    key: 'VCP',
    width: 30,
    hidden: 'subCategory',

    render: (_: string, row: any) => row?.sub_category?.name ,
  },
  {
    title: <HeaderCell title={text_tr.InstorePromotion_report.bu} />,
    dataIndex: 'sub_sub_category.name',
    key: 'BU',
    width: 30,
    hidden: 'subSubCategory',

    render: (_: string, row: any) => row?.sub_sub_category?.name ,
  },
    {
    title: <HeaderCell title={text_tr.InstorePromotion_report.skucode} />,
    dataIndex: 'sku_code',
    key: 'SKU Code',
    width: 30,
    hidden: 'product',

    render: (_: string, row: any) => row?.sku_code ,
  },
  {
    title: <HeaderCell title={text_tr.InstorePromotion_report.regularprice} />,
    dataIndex: 'price',
    key: 'Regular Price',
    width: 30,
    hidden: 'price',
    render: (price: string) => price ,
  },
  {
    title: <HeaderCell title={text_tr.InstorePromotion_report.promotionprice} />,
    dataIndex: 'promotion_price',
    key: 'promotion price',
    width: 30,
    hidden: 'promotion_price',
    render: (_: string, row: any) => row?.promotion_price ,
  },
  {
    title: <HeaderCell title={text_tr.InstorePromotion_report.promotionamount} />,
    dataIndex: 'promotion_amount',
    key: 'promotion amount',
    width: 30,
    hidden: 'promotion_amount',
    render: (_: string, row: any) => row?.promotion_amount ,
  },
  {
    title: <HeaderCell title={text_tr.InstorePromotion_report.promotionper} />,
    dataIndex: 'promotion_percentage',
    key: 'promotion percentage',
    width: 30,
    hidden: 'promotion_percentage',
    render: (_: string, row: any) => row?.promotion_percentage+"%" ,
  },
  {
    title: (
      <HeaderCell
        title={text_tr.InstorePromotion_report.offerdatefrom} 
        
      />
    ),
    onHeaderCell: () => onHeaderCellClick('in_store_date_from'),
    dataIndex: 'in_store_date_from',
    key: 'Date From',
    width: 50,
    render: (value: Date) => <DateCell date={value} />,
  },
  {
    title: (
      <HeaderCell
        title={text_tr.InstorePromotion_report.offerdateto} 
      />
    ),
    onHeaderCell: () => onHeaderCellClick('in_store_date_to'),
    dataIndex: 'in_store_date_to',
    key: 'Date To',
    width: 50,
    render: (value: Date) => <DateCell date={value} />,
  },

  
];
