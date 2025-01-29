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


type FilterElementProps = {
  isFiltered: boolean;
  filters: { [key: string]: any };
  updateFilter: (columnId: string, filterValue: string | any[]) => void;
  userDetails: {label: string, value: string}[] | [];
  retailerDetails: {label: string, value: string, stores: {name: string, id: number}[]}[] | [];
};
const statusOptions = [
  {
    value: 'out_of_location',
    label: 'Out Of location',
 
  },
  {
    value: 'fack_location',
    label: 'Fack Location',

  },
  {
    value: 'wrong_mac_id',
    label: 'Wrong MAC ID',

  },
];

export default function FilterElement({
  isFiltered,
  filters,
  updateFilter,
  userDetails,
  retailerDetails,
}: FilterElementProps) {
  const isMediumScreen = useMedia('(max-width: 1860px)', false);
  const [selectedRetailer, setSelectedRetailer] = useState<{label: string, value: string}[] | []>(filters['retailer_id']?retailerDetails?.find((retailer: any) => retailer?.value == filters['retailer_id'])?.stores?.map((store: any) => ({label: store?.name+" ( "+store?.store_code+" ) ", value: String(store?.id)})) || []:[])

  const handleReset = () => {
    Object.keys(filters).forEach((filter: string) => updateFilter(filter, ''))
  }
  return (
    <>



<div className='flex gap-2'>
        <DateFiled
            selected={filters['date_from'] ? new Date(filters['date_from']) : null}
            onChange={(date: any) => {
            updateFilter('date_from', formatDate(new Date(date), 'YYYY-MM-DD'));
            }}
            placeholderText=" Log Date From"
            {...(isMediumScreen && {
            inputProps: {
                label: ' Log Date From',
                labelClassName: 'font-medium text-gray-700',
            },
            })}
        />
        <DateFiled
            selected={filters['date_to'] ? new Date(filters['date_to']) : null}
            onChange={(date: any) => {
            updateFilter('date_to', formatDate(new Date(date), 'YYYY-MM-DD'));
            }}
            placeholderText="Log Date To"
            {...(isMediumScreen && {
            inputProps: {
                label: 'Log Date To',
                labelClassName: 'font-medium text-gray-700',
            },
            })}
        />
      </div>



<div className='flex gap-2'>
        <div className='w-full'>
          <label className='font-medium text-gray-700'> User</label>
        <CreatableSelect
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
        </div>


              <div className='flex gap-2'>
        <div className='w-full'>
          <label className='font-medium text-gray-700'> Retailer</label>
        <CreatableSelect
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

      <div className='w-full'>
          <label className='font-medium text-gray-700'> Type</label>
        <CreatableSelect
        className="pt-2 w-full"
        closeMenuOnSelect={true}
          options={statusOptions}
          value={filters['type']?{label:statusOptions?.find((option) => option.value === filters['type'])?.label,value:filters['type']}:""}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              boxShadow:"",
            
            }),
          }}
          placeholder='Select Type'
          onChange={(value: any) => {
            updateFilter('type', value.value);
          }}
        />
      </div>


        <Button
          size="sm"
          onClick={handleReset}
          className="h-8 bg-gray-200/70"
          variant="flat"
        >
          <PiTrashDuotone className="me-1.5 h-[17px] w-[17px]" /> Clear
        </Button>
    </>
  );
}
