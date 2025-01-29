'use client';

import React, { useEffect, useState } from 'react';
import { PiTrashDuotone } from 'react-icons/pi';
import DateFiled from '@/components/controlled-table/date-field';
import StatusField from '@/components/controlled-table/status-field';
import { Button } from '@/components/ui/button';
import dayjs from 'dayjs';
import { formatDate } from '@/utils/format-date';
import { useMedia } from '@/hooks/use-media';
import weekOfYear from 'dayjs/plugin/weekOfYear'
import quarterOfYear from 'dayjs/plugin/quarterOfYear'
import { usePathname, useSearchParams } from 'next/navigation';
import CreatableSelect from 'react-select'


const typeOptions = [
  // {
  //   value: 'daily',
  //   name: 'daily',
  //   label: "Day",
  //   filterFrom: 'date_from',
  //   filterTo: 'date_to',
  //   dateFormat: 'yyyy/MM/dd'
  // },
  {
    value: 'monthly',
    name: 'monthly',
    label: 'Month',
    filterFrom: 'month_from',
    filterTo: 'month_to',
    dateFormat: 'MM/yyyy'
  },
  {
    value: 'yearly',
    name: 'yearly',
    label: 'Year',
    filterFrom: 'year_from',
    filterTo: 'year_to',
    dateFormat: 'yyyy'
  },
  {
    value: 'quarter',
    name: 'quarter',
    label: 'Quarter',
    filterFrom: 'quarter_from',
    filterTo: 'quarter_to',
    dateFormat: 'yyyy, QQQ'
  },
  {
    value: 'weekly',
    name: 'weekly',
    label: 'Week',
    filterFrom: 'week_from',
    filterTo: 'week_to',
    dateFormat: 'I/R'
  },
];
const viewOptions = [
  {
    value: 'monthly ',
    name: 'Monthly ',
  },
  {
    value: 'yearly ',
    name: 'Yearly ',
  },
  {
    value: 'quarter ',
    name: 'Quarter ',
  },

  {
    value: 'weekly ',
    name: 'Weekly ',
  },
  {
    value: 'stores ',
    name: 'Stores ',
  },
  {
    value: 'retailers ',
    name: 'Retailers '
  },
  {
    value: 'regions ',
    name: 'Regions ',
  },
  {
    value: 'BG ',
    name: 'BG ',
  },
  {
    value: 'VCP ',
    name: 'VCP ',
  },
  {
    value: 'BU ',
    name: 'BU ',
  }, 
  //  {
  //   value: 'daily ',
  //   name: 'Daily ',
  // },
];
const StoresTypeOptions = [
  {
    value: '',
    label: 'All',
  },
  {
    value: 'stores_with_promotrs ',
    label: 'Stores With Promoters'
  },
  {
    value: 'stores_without_promotrs',
    label: 'Stores Whithout Promoters',
  },
];

type FilterElementProps = {
  isFiltered: boolean;
  filters: { [key: string]: any };
  updateFilter: (columnId: string, filterValue: string | any[]) => void;
  setDateFilter: (filterKeys: string[], filtersValue: any, type: string) => void;
  userDetails: {label: string, value: string}[] | [];
  retailerDetails: {label: string, value: string, stores: {name: string, id: number}[]}[] | [];
  regionDetails: {label: string, value: string, city: any}[] | [];
  productDetails: {label: string, value: string}[] | [];
  brandDetails: {label: string, value: string}[] | [];
  categoriesDetails: any;
  role: string;
};

export default function FilterElement({
  isFiltered,
  filters,
  updateFilter,
  userDetails,
  retailerDetails,
  regionDetails,
  productDetails,
  brandDetails,
  categoriesDetails,
  setDateFilter,
  role
}: FilterElementProps) {
  const isMediumScreen = useMedia('(max-width: 1860px)', false);
  const pathName = usePathname()
  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams)
  const [selectedRegion, setSelectedRegion] = useState<{label: string, value: string}[]>([])
  const [seletedSubCategory, setSelectedSubCategory] = useState<{id: number, name: string, children: any}[] | []>(categoriesDetails?.find(((cat: any) => cat?.id == filters['BG_id']))?.children||[])
  const [selectedSubSubCat, setSelecedSubSubCat] = useState<{name: string, id: string}[]>(seletedSubCategory?.find(((cat: any) => cat?.id == filters['VCP_id']))?.children||[])
  const [selectedRetailer, setSelectedRetailer] = useState<{label: string, value: string}[] | []>(filters['retailer_id']?retailerDetails?.find((retailer: any) => retailer?.value == filters['retailer_id'])?.stores?.map((store: any) => ({label: store?.name+" ( "+store?.store_code+" ) ", value: String(store?.id)})) || []:[])
  useEffect(() => {
    if(filters['region_id']){
      setSelectedRegion(regionDetails?.find((regions: any) => regions?.value == filters['region_id'])?.city?.map((city: any) => ({
        label: city?.name,
        value: String(city?.id)
      })) || [])
    }
  }, [])

  const handleReset = () => {
    Object.keys(filters).forEach((filter: string) => updateFilter(filter, ''))
  }
  dayjs.extend(weekOfYear)
  dayjs.extend(quarterOfYear)

  return (
    <>
<StatusField
        options={viewOptions}
        value={filters['group_by']}
        onChange={(value: string) => {
          updateFilter('group_by', value);
        }}
        getOptionValue={(option) => option.value}
        displayValue={(selected: string) =>
          viewOptions?.find((option) => option.value === selected)?.name ??
          selected
        }
        {...(isMediumScreen && {
          placeholder:"Type",
          label: 'Type',
          labelClassName: 'font-medium text-gray-700',
        })}
      />
      
<div className='flex gap-2 '>
        <DateFiled
            selected={filters['date_from'] ? new Date(filters['date_from']) : null}
            onChange={(date: any) => {
            updateFilter('date_from', formatDate(date, 'YYYY-MM-DD'));
            }}
            placeholderText="Select installation date from"
            {...(isMediumScreen && {
            inputProps: {
                label: 'Date From',
                labelClassName: 'font-medium text-gray-700',
            },
            })}
        />
        <DateFiled
            selected={filters['date_to'] ? new Date(filters['date_to']) : null}
            onChange={(date: any) => {
            updateFilter('date_to', formatDate(new Date(date), 'YYYY-MM-DD'));
            }}
            placeholderText="Select date to"
            {...(isMediumScreen && {
            inputProps: {
                label: 'Date to',
                labelClassName: 'font-medium text-gray-700',
            },
            })}
        />
      </div>

      <div className='flex gap-2'>
        <div className='w-full'>
          <label className='font-medium text-gray-700'> User</label>
        <CreatableSelect
        isDisabled
        className="pt-2 w-full"
        closeMenuOnSelect={true}
          options={userDetails}
          value={filters['user_id']?{label:userDetails?.find((option) => option.value === filters['user_id'])?.label,value:filters['user_id']}:""}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              boxShadow:"",
            
            }),
          }}
          placeholder='Select User'
          onChange={(value: any) => {
            updateFilter('user_id', value.value);
          }}
        />

        </div>
        <div className='w-full'>
          <label className='font-medium text-gray-700'>Product</label>
        <CreatableSelect
        className="pt-2 w-full"
        closeMenuOnSelect={true}
          options={productDetails}
          value={filters['product_id']?{label:productDetails?.find((option) => option.value === filters['product_id'])?.label,value:filters['product_id']}:""}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              boxShadow:"",
            
            }),
          }}
          placeholder='Select product'
          onChange={(value: any) => {
            updateFilter('product_id', value.value);
          }}
        />
        </div>
      </div>
      <div className='flex gap-2'>
        <div className='w-full'>
          <label className='font-medium text-gray-700'> Retailer</label>
        <CreatableSelect
        isDisabled
        className="pt-2 w-full"
        closeMenuOnSelect={true}
          options={retailerDetails}
          value={filters['retailer_id']?{label:retailerDetails?.find((option) => option.value === filters['retailer_id'])?.label,value:filters['retailer_id']}:""}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              boxShadow:"",
            
            }),
          }}
          placeholder='Select Retailer'
          onChange={(value: any) => {
            updateFilter('retailer_id', value.value);
            setSelectedRetailer(retailerDetails?.find((retailer: any) => retailer?.value == value.value)?.stores?.map((store: any) => ({label: store?.name+" ( "+store?.store_code+" ) ", value: String(store?.id)})) || [])
            updateFilter('store_id', "");
          }}
        />

        </div>
        <div className='w-full'>
          <label className='font-medium text-gray-700'> Store</label>
        <CreatableSelect
        isDisabled
        className="pt-2 w-full"
        closeMenuOnSelect={true}
          options={selectedRetailer}
          value={filters['store_id']?{label:selectedRetailer?.find((option) => option.value === filters['store_id'])?.label,value:filters['store_id']}:""}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              boxShadow:"",
            
            }),
          }}
          placeholder='Select Store'
          onChange={(value: any) => {
            updateFilter('store_id', value.value);
          }}
        />
        </div>
      </div>
      <div className='flex gap-2'>
        <div className='w-full'>
          <label className='font-medium text-gray-700'> BG</label>
        <CreatableSelect
        className="pt-2 w-full"
        closeMenuOnSelect={true}
          options={categoriesDetails}
          value={filters['BG_id']?{label:categoriesDetails?.find((option:any) => option.value === filters['BG_id'])?.label,value:filters['BG_id']}:""}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              boxShadow:"",
            
            }),
          }}
          placeholder='Select BG'
          onChange={(value: any) => {
            updateFilter('BG_id', value.value);
            updateFilter('VCP_id', "");
            updateFilter('BU_id', "");            
            setSelectedSubCategory(categoriesDetails?.find(((cat: any) => cat?.id == value.value))?.children)
          }}
        />

        </div>
        <div className='w-full'>
          <label className='font-medium text-gray-700'>VCP</label>
        <CreatableSelect
        className="pt-2 w-full"
        closeMenuOnSelect={true}
          options={seletedSubCategory?.map((cat:any) => ({label: cat?.name, value: cat?.id}))}
          value={filters['VCP_id']?{label:seletedSubCategory?.find((option) => option.id == filters['VCP_id'])?.name,value:filters['VCP_id']}:""}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              boxShadow:"",
            
            }),
          }}
          placeholder='Select VCP'
          onChange={(value: any) => {
            console.log(value);
            updateFilter('VCP_id', String(value.value));
            updateFilter('BU_id', "");
            setSelecedSubSubCat(seletedSubCategory?.find(((cat: any) => cat?.id == value.value))?.children)           
          }}
        />

        </div>


      </div>
      
      <div className='flex gap-2'>
      <div className='w-full'>
          <label className='font-medium text-gray-700'>BU</label>
        <CreatableSelect
        className="pt-2 w-full"
        closeMenuOnSelect={true}
          options={selectedSubSubCat?.map((cat:any) => ({label: cat?.name, value: cat?.id}))}
          value={filters['BU_id']?{label:selectedSubSubCat?.find((option) => option.id == filters['BU_id'])?.name,value:filters['BU_id']}:""}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              boxShadow:"",
            
            }),
          }}
          placeholder='Select BU'
          onChange={(value: any) => {
            updateFilter('BU_id', String(value.value));
          }}
        />

        </div>
        <div className='w-full'>
          <label className='font-medium text-gray-700'> Brand</label>
        <CreatableSelect
        className="pt-2 w-full"
        closeMenuOnSelect={true}
          options={brandDetails}
          value={filters['brand_id']?{label:brandDetails?.find((option) => option.value === filters['brand_id'])?.label,value:filters['brand_id']}:""}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              boxShadow:"",
            
            }),
          }}
          placeholder='Select Brand'
          onChange={(value: any) => {
            updateFilter('brand_id', value.value);
          }}
        />

        </div>
      </div>

      <div className='flex gap-2'>
        <div className='w-full'>
          <label className='font-medium text-gray-700'>Region</label>
        <CreatableSelect
        className="pt-2 w-full"
        closeMenuOnSelect={true}
          options={regionDetails}
          value={filters['region_id']?{label:regionDetails?.find((option:any) => option.value == filters['region_id'])?.label,value:filters['region_id']}:""}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              boxShadow:"",
            
            }),
          }}
          placeholder='Select Region'
          onChange={(value: any) => {
            updateFilter('region_id', value.value);
            updateFilter('city_id', "");
            setSelectedRegion(regionDetails?.find((regions: any) => regions?.value == value.value)?.city?.map((city: any) => ({
                label: city?.name,
                value: String(city?.id)
            })) || [])
          }}
        />

        </div>
        <div className='w-full'>
          <label className='font-medium text-gray-700'>City</label>
        <CreatableSelect
        className="pt-2 w-full"
        closeMenuOnSelect={true}
          options={selectedRegion}
          value={filters['city_id']?{label:selectedRegion?.find((option) => option.value == filters['city_id'])?.label,value:filters['city_id']}:""}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              boxShadow:"",
            
            }),
          }}
          placeholder='Select City'
          onChange={(value: any) => {
            console.log(value);
            updateFilter('city_id', String(value.value));
          }}
        />

        </div>


      </div>
      <div className='w-full'>
          <label className='font-medium text-gray-700'> Stores Type</label>
        <CreatableSelect
        isDisabled
        className="pt-2 w-full"
        closeMenuOnSelect={true}
          options={StoresTypeOptions}
          value={filters['stores_type']?{label:StoresTypeOptions?.find((option) => option.value === filters['stores_type'])?.label,value:filters['stores_type']}:""}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              boxShadow:"",
            
            }),
          }}
          placeholder='Select Type'
          onChange={(value: any) => {
            updateFilter('stores_type', value.value);
          }}
        />

        </div>

      {/* {isFiltered ? ( */}
        <Button
          size="sm"
          onClick={handleReset}
          className="h-8 bg-gray-200/70"
          variant="flat"
        >
          <PiTrashDuotone className="me-1.5 h-[17px] w-[17px]" /> Clear
        </Button>
      {/* ) : null} */}
    </>
  );
}
