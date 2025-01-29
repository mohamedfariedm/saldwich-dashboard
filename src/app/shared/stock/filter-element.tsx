'use client';

import React, { useEffect, useState } from 'react';
import { PiTrashDuotone } from 'react-icons/pi';
import DateFiled from '@/components/controlled-table/date-field';
import StatusField from '@/components/controlled-table/status-field';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/utils/format-date';
import { useMedia } from '@/hooks/use-media';
import { Text } from '@/components/ui/text';
import CreatableSelect from 'react-select'

const statusOptions = [
  {
    value: 'available',
    name: 'available',
    label: (
      <div className="flex items-center">
        <Text className="ms-2 font-medium ">available</Text>
      </div>
    ),
  },
  {
    value: 'out_of_stock',
    name: 'out_of_stock',
    label: (
      <div className="flex items-center">
        <Text className="ms-2 font-medium ">Out Of Stock</Text>
      </div>
    ),
  },

];

type FilterElementProps = {
  isFiltered: boolean;
  filters: { [key: string]: any };
  updateFilter: (columnId: string, filterValue: string | any[]) => void;
  productDetails: {label: string, value: string}[] | [];
  storeDetails: {label: string, value: string}[] | [];
};

export default function FilterElement({
  isFiltered,
  filters,
  updateFilter,
  storeDetails,
  productDetails,

}: FilterElementProps) {
  const isMediumScreen = useMedia('(max-width: 1860px)', false);
  // useEffect(() => {
  //   if(filters['filter_region']){
  //       setSelectedRegion(regionDetails?.find((regions: any) => regions?.value == filters['filter_region'])?.city?.map((city: any) => ({
  //         name: city?.name,
  //         value: String(city?.id)
  //       })) || [])
  //     }
  //     if(filters['filter_retailer']){
  //       setSelectedRetailer(retailerDetails?.find((retailer: any) => retailer?.value == filters['filter_retailer'])?.stores?.map((store: any) => ({name: store?.name, value: String(store?.id)})) || [])
  //     }
  //     if(filters['filter_category']){
  //       setSelectedSubCategory(categoriesDetails?.find(((cat: any) => cat?.id == filters['filter_category']))?.children)
  //     }
  //     if(filters['filter_sub_category']){
  //       setSelecedSubSubCat(seletedSubCategory?.find(((cat: any) => cat?.id == filters['filter_sub_category']))?.children)
  //     }
  // }, [])
  const handleReset = () => {
    Object.keys(filters).forEach((filter: string) => updateFilter(filter, ''))
  }
  return (
    <>

      {/* <div className='flex gap-2'> */}
      <div className='w-full'>
          <label className='font-medium text-gray-700'>SKU Code</label>
        <CreatableSelect
        className="pt-2 w-full"
        closeMenuOnSelect={true}
          options={productDetails}
          value={filters['filter_product']?{label:productDetails?.find((option) => option.value === filters['filter_product'])?.label,value:filters['filter_product']}:""}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              boxShadow:"",
            
            }),
          }}
          placeholder='Select User'
          onChange={(value: any) => {
            updateFilter('filter_product', value.value);
          }}
        />
      </div>
      <div className='w-full'>
          <label className='font-medium text-gray-700'> Stores</label>
        <CreatableSelect
        className="pt-2 w-full"
        closeMenuOnSelect={true}
          options={storeDetails}
          value={filters['filter_store']?{label:storeDetails?.find((option) => option.value === filters['filter_store'])?.label,value:filters['filter_store']}:""}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              boxShadow:"",
            
            }),
          }}
          placeholder='Select Store'
          onChange={(value: any) => {
            updateFilter('filter_store', value.value);
          }}
        />
      </div>
      <div className='w-full'>
          <label className='font-medium text-gray-700'> Status</label>
        <CreatableSelect
        className="pt-2 w-full"
        closeMenuOnSelect={true}
          options={statusOptions}
          value={filters['status']?{label:statusOptions?.find((option) => option.value === filters['status'])?.label,value:filters['status']}:""}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              boxShadow:"",
            
            }),
          }}
          placeholder='Select status'
          onChange={(value: any) => {
            updateFilter('status', value.value);
          }}
        />
      </div>

        
      {/* </div> */}





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
