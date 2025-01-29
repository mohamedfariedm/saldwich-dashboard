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
    value: 'active',
    label: 'ACTIVE',

  },
  {
    value: 'inactive',
    label: 'IN ACTIVE',

  },

];


type FilterElementProps = {
  isFiltered: boolean;
  filters: { [key: string]: any };
  updateFilter: (columnId: string, filterValue: string | any[]) => void;
  retailerDetails: {label: string, value: string, stores: {name: string, id: number}[]}[] | [];
  regionDetails: {label: string, value: string, city: any}[] | [];
  typeDetails: {label: string, value: string}[] | [];
};

export default function FilterElement({
  isFiltered,
  filters,
  updateFilter,
  retailerDetails,
  regionDetails,
  typeDetails,
  // storeDetails,

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

                <div className='w-full'>
          <label className='font-medium text-gray-700'> Retailers</label>
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
          placeholder='Select Retailers'
          onChange={(value: any) => {
            updateFilter('retailer_id', value.value);
          }}
        />
      </div>
       <div className='flex gap-2'>


<div className='w-full'>
          <label className='font-medium text-gray-700'> Activation</label>
        <CreatableSelect
        className="pt-2 w-full"
        closeMenuOnSelect={true}
          options={statusOptions}
          value={filters['activation']?{label:statusOptions?.find((option) => option.value === filters['activation'])?.label,value:filters['activation']}:""}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              boxShadow:"",
            
            }),
          }}
          placeholder='Activation'
          onChange={(value: any) => {
            updateFilter('activation', value.value);
          }}
        />
      </div>
<div className='w-full'>
          <label className='font-medium text-gray-700'> Type</label>
        <CreatableSelect
        className="pt-2 w-full"
        closeMenuOnSelect={true}
          options={typeDetails}
          value={filters['type']?{label:typeDetails?.find((option) => option.value === filters['type'])?.label,value:filters['type']}:""}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              boxShadow:"",
            
            }),
          }}
          placeholder='Select type'
          onChange={(value: any) => {
            updateFilter('type', value.value);
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
