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
    value: 'pending',
    name: 'pending',
    label: (
      <div className="flex items-center">
        <Text className="ms-2 font-medium ">Pending</Text>
      </div>
    ),
  },
  {
    value: 'in_progress',
    name: 'in_progress',
    label: (
      <div className="flex items-center">
        <Text className="ms-2 font-medium ">Inprogress</Text>
      </div>
    ),
  },
  {
    value: 'completed',
    name: 'completed',
    label: (
      <div className="flex items-center">
        <Text className="ms-2 font-medium ">Completed</Text>
      </div>
    ),
  },
  {
    value: 'absence',
    name: 'absence',
    label: (
      <div className="flex items-center">
        <Text className="ms-2 font-medium ">Absence</Text>
      </div>
    ),
  },

];

type FilterElementProps = {
  isFiltered: boolean;
  filters: { [key: string]: any };
  updateFilter: (columnId: string, filterValue: string | any[]) => void;
  userDetails: {label: string, value: string}[] | [];
  retailerDetails: {label: string, value: string, stores: {name: string, id: number}[]}[] | [];
  regionDetails: {label: string, value: string, city: any}[] | [];
  storeDetails: {label: string, value: string}[] | [];
};

export default function FilterElement({
  isFiltered,
  filters,
  updateFilter,
  userDetails,
  retailerDetails,
  regionDetails,
  storeDetails,

//   brandFilter,
}: FilterElementProps) {
  const isMediumScreen = useMedia('(max-width: 1860px)', false);
  const [selectedRegion, setSelectedRegion] = useState<{label: string, value: string}[]>([])
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
  return (
    <>
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
       <div className='flex gap-2'> 


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
          placeholder='Select Status'
          onChange={(value: any) => {
            updateFilter('status', value.value);
          }}
        />
      </div>

        
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
