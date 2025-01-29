'use client';

import { Tooltip } from '@/components/ui/tooltip';
import { HeaderCell } from '@/components/ui/table';
import { ActionIcon } from '@/components/ui/action-icon';
import AvatarCard from '@/components/ui/avatar-card';
import DateCell from '@/components/ui/date-cell';
import EyeIcon from '@/components/icons/eye';
import CreateButton from '../create-button';
import ReportDetails from '@/app/shared/benchmark/report-modal'
import { useState } from 'react';
import { Button, Modal } from 'rizzui';
import { PiXBold } from 'react-icons/pi';
import Image from 'next/image';


type Columns = {
  data: any[];
  text_tr?:any;
  sortConfig?: any;
  handleSelectAll: any;
  checkedItems: string[];
  onHeaderCellClick: (value: string) => void;
  onChecked?: (id: string) => void;
  handleTabClick:(src: string)=>any;
  open:any;
  setOpen:any;
  modalData:any;
   setModalData:any;
};

export const getColumns = ({
  data,
  sortConfig,
  text_tr,
  checkedItems,
  onHeaderCellClick,
  handleSelectAll,
  onChecked,
  handleTabClick,
  open,
  setOpen,
  modalData, setModalData
}: Columns) => {
 return [
    // {
    //     title: <></>,
    //     dataIndex: 'action',
    //     key: 'action',
    //     width: 20,
    //     render: (_: string, row: any) => (
    //       <div className="flex items-center gap-3">
    //         <Tooltip
    //         size="sm"
    //         content={() => 'View Report'}
    //         placement="top"
    //         color="invert"
    //       >
    //         <CreateButton
    //           icon={
    //           <ActionIcon size="sm" variant="outline" aria-label={'View Level Benchmark'}>
    //             <EyeIcon className="h-4 w-4" />
    //           </ActionIcon>
    //           }
    //           view={<ReportDetails id={row.id}/>}
    //           label=''
    //           className='p-0 m-0 bg-transparent text-gray-700'
    //         />
    //       </Tooltip>
    //       </div>
    //     ),
    // },
    {
      title: <HeaderCell title={text_tr.level_benchmark_report.brandname} />,
      dataIndex: 'Brand_Name',
      key: 'Brand_Name',
      width: 100,
      hidden: 'Brand_Name',
  
      render: (_: string, row: any) => (<>
      {row?.image?<>
        <button onClick={() => handleTabClick(row?.image)}>

<AvatarCard
 src={row?.image}
 name={row?.Brand_Name || ''}
 description={`SKU-${row?.SKU_Code}`}
/>
</button>
<Modal
 isOpen={open}
 onClose={() => {
 setOpen(false);
 //   setActive(() => 'posts');
 }}
 overlayClassName="dark:bg-opacity-40 dark:backdrop-blur-lg"
 containerClassName="dark:bg-gray-100 max-w-[460px] rounded-md p-5 lg:p-6"
>
 <div className="flex items-center justify-between pb-2 lg:pb-3">
 <Button
     variant="text"
     onClick={() => {
     setOpen(false);
     //   setActive(() => 'posts');
     }}
     className="h-auto px-1 py-1"
 >
     <PiXBold className="h-5 w-5 text-base" />
 </Button>
 </div>
 {modalData && 
 <div className='flex w-full justify-around'>
     <Image src={modalData} width={300} height={400} alt={'test'} />
 </div>}
 </Modal>
      
      </>:<AvatarCard
 src={""}
 name={row?.Brand_Name || ''}
 description={`SKU-${row?.SKU_Code}`}
/> }   
        </>
  
        ),
    },
    // {
    //   title: (
    //     <HeaderCell
    //       title="date"
    //       sortable
    //       ascending={
    //         sortConfig?.direction === 'asc' && sortConfig?.key === 'created_at'
    //       }
    //     />
    //   ),
    //   onHeaderCell: () => onHeaderCellClick('created_at'),
    //   dataIndex: 'created_at',
    //   key: 'created_at',
    //   width: 50,
    //   render: (value: Date) => <DateCell date={value} />,
    // },
    {
      title: <HeaderCell title={text_tr.level_benchmark_report.retailer}/>,
      dataIndex: 'Retailer_Name',
      key: 'Retailer_Name',
      width: 30,
      hidden: 'Retailer_Name',
  
      render: (_: string, row: any) => row?.Retailer_Name ,
    },
    {
      title: <HeaderCell title={text_tr.level_benchmark_report.level} />,
      dataIndex: 'level',
      key: 'level',
      width: 30,
      hidden: 'level',
  
      render: (_: string, row: any) => row?.level ,
    },
    // {
    //   title: <HeaderCell title="Brand" />,
    //   dataIndex: 'brand.name',
    //   key: 'brand',
    //   width: 30,
    //   hidden: 'brand',
  
    //   render: (_: string, row: any) => row?.brand?.name ,
    // },
    // {
    //   title: <HeaderCell title="BG" />,
    //   dataIndex: 'category.name',
    //   key: 'BG',
    //   width: 30,
    //   hidden: 'category',
  
    //   render: (_: string, row: any) => row?.category?.name ,
    // },
    // {
    //   title: <HeaderCell title="VCP" />,
    //   dataIndex: 'sub_category.name',
    //   key: 'VCP',
    //   width: 30,
    //   hidden: 'subCategory',
  
    //   render: (_: string, row: any) => row?.sub_category?.name ,
    // },
    // {
    //   title: <HeaderCell title="BU" />,
    //   dataIndex: 'sub_sub_category.name',
    //   key: 'BU',
    //   width: 30,
    //   hidden: 'subSubCategory',
  
    //   render: (_: string, row: any) => row?.sub_sub_category?.name ,
    // },
    // {
    //   title: <HeaderCell title="SKU Code" />,
    //   dataIndex: 'sku_code',
    //   key: 'SKU Code',
    //   width: 30,
    //   hidden: 'product',
  
    //   render: (_: string, row: any) => row?.sku_code ,
    // },
    // {
    //   title: (
    //     <HeaderCell
    //       title="Offer Date From"
    //       sortable
    //       ascending={
    //         sortConfig?.direction === 'asc' && sortConfig?.key === 'offer_date_from'
    //       }
    //     />
    //   ),
    //   onHeaderCell: () => onHeaderCellClick('offer_date_from'),
    //   dataIndex: 'offer_date_from',
    //   key: 'offer date from',
    //   width: 50,
    //   render: (value: Date) => <DateCell date={new Date(value)} />,
    // },
    // {
    //   title: (
    //     <HeaderCell
    //       title="Offer Date To"
    //       sortable
    //       ascending={
    //         sortConfig?.direction === 'asc' && sortConfig?.key === 'offer_date_to'
    //       }
    //     />
    //   ),
    //   onHeaderCell: () => onHeaderCellClick('offer_date_to'),
    //   dataIndex: 'offer_date_to',
    //   key: 'offer date to',
    //   width: 50,
    //   render: (value: Date) => <DateCell date={new Date(value)} />,
    // },
    {
      title: <HeaderCell title={text_tr.level_benchmark_report.prodprice} />,
      dataIndex: 'price',
      key: 'Product Price',
      width: 30,
      hidden: 'price',
      render: (price: string) => price ,
    },
    {
      title: <HeaderCell title={text_tr.level_benchmark_report.promotionprice} />,
      dataIndex: 'promotion_price',
      key: 'promotion price',
      width: 30,
      hidden: 'promotion_price',
      render: (_: string, row: any) => row?.promotion_price ,
    },
    {
      title: <HeaderCell title="Discount" />,
      dataIndex: 'discount',
      key: 'Discount',
      width: 30,
      hidden: 'discount',
      render: (_: string, row: any) => row?.Discount+"%" ,
    },
    {
      title: <HeaderCell title={text_tr.level_benchmark_report.dsicount} />,
      dataIndex: 'Discount_Amount',
      key: 'Discount_Amount',
      width: 30,
      hidden: 'Discount_Amount',
      render: (_: string, row: any) => row?.Discount_Amount+"%" ,
    },
  ];
  
}


