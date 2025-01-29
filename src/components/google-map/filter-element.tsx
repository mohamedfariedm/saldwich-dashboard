'use client';

import React, { useEffect, useState } from 'react';
import { PiTrashDuotone } from 'react-icons/pi';
import StatusField from '@/components/controlled-table/status-field';
import { Button } from '@/components/ui/button';
import { useMedia } from '@/hooks/use-media';
import CreatableSelect from 'react-select'

type FilterElementProps = {
  isFiltered: boolean;
  filters: { [key: string]: any };
  updateFilter: (columnId: string, filterValue: string | any[]) => void;
  roleDetails: {label: string, value: string}[] | [];
  userDetails: {label: string, value: string}[] | [];
  retailerDetails: {label: string, value: string, stores: {name: string, id: number}[]}[] | [];
  regionDetails: {label: string, value: string, city: any}[] | [];
};

export default function FilterElement({
  filters,
  updateFilter,
  roleDetails,
  userDetails,
  regionDetails,
  retailerDetails,
}: FilterElementProps) {
  const isMediumScreen = useMedia('(max-width: 1860px)', false);
  const [selectedRegion, setSelectedRegion] = useState<{label: string, value: string}[]>([])
  const [selectedRetailer, setSelectedRetailer] = useState<{label: string, value: string}[] | []>(filters['retailer_filter']?retailerDetails?.find((retailer: any) => retailer?.value == filters['retailer_filter'])?.stores?.map((store: any) => ({label: store?.name+" ( "+store?.store_code+" ) ", value: String(store?.id)})) || []:[])
  useEffect(() => {
    if(filters['region_filter']){
      setSelectedRegion(regionDetails?.find((regions: any) => regions?.value == filters['region_filter'])?.city?.map((city: any) => ({
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
        <div className='w-full'>
          <label className='font-medium text-gray-700'> User</label>
        <CreatableSelect
        className="pt-2 w-full"
        closeMenuOnSelect={true}
          options={userDetails}
          value={filters['filter_user']?{label:userDetails?.find((option) => option.value === filters['filter_user'])?.label,value:filters['filter_user']}:""}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              boxShadow:"",
            
            }),
          }}
          placeholder='Select User'
          onChange={(value: any) => {
            updateFilter('filter_user', value.value);
          }}
        />

        </div>
        <div className='w-full'>
          <label className='font-medium text-gray-700'>Role</label>
        <CreatableSelect
        className="pt-2 w-full"
        closeMenuOnSelect={true}
          options={roleDetails}
          value={filters['role_filter']?{label:roleDetails?.find((option) => option.value === filters['role_filter'])?.label,value:filters['role_filter']}:""}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              boxShadow:"",
            
            }),
          }}
          placeholder='Select User'
          onChange={(value: any) => {
            updateFilter('role_filter', value.value);
          }}
        />

        </div>
            <div className='flex gap-2'>
        <div className='w-full'>
          <label className='font-medium text-gray-700'> Retailer</label>
        <CreatableSelect
        className="pt-2 w-full"
        closeMenuOnSelect={true}
          options={retailerDetails}
          value={filters['retailer_filter']?{label:retailerDetails?.find((option) => option.value === filters['retailer_filter'])?.label,value:filters['retailer_filter']}:""}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              boxShadow:"",
            
            }),
          }}
          placeholder='Select Retailer'
          onChange={(value: any) => {
            updateFilter('retailer_filter', value.value);
            setSelectedRetailer(retailerDetails?.find((retailer: any) => retailer?.value == value.value)?.stores?.map((store: any) => ({label: store?.name+" ( "+store?.store_code+" ) ", value: String(store?.id)})) || [])
            updateFilter('store_filter', "");
          }}
        />

        </div>
        <div className='w-full'>
          <label className='font-medium text-gray-700'> Store</label>
        <CreatableSelect
        className="pt-2 w-full"
        closeMenuOnSelect={true}
          options={selectedRetailer}
          value={filters['store_filter']?{label:selectedRetailer?.find((option) => option.value === filters['store_filter'])?.label,value:filters['store_filter']}:""}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              boxShadow:"",
            
            }),
          }}
          placeholder='Select Store'
          onChange={(value: any) => {
            updateFilter('store_filter', value.value);
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
          value={filters['region_filter']?{label:regionDetails?.find((option:any) => option.value == filters['region_filter'])?.label,value:filters['region_filter']}:""}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              boxShadow:"",
            
            }),
          }}
          placeholder='Select Region'
          onChange={(value: any) => {
            updateFilter('region_filter', value.value);
            updateFilter('city_filter', "");
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
          value={filters['city_filter']?{label:selectedRegion?.find((option) => option.value == filters['city_filter'])?.label,value:filters['city_filter']}:""}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              boxShadow:"",
            
            }),
          }}
          placeholder='Select City'
          onChange={(value: any) => {
            console.log(value);
            updateFilter('city_filter', String(value.value));
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
