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
  userDetails: {label: string, value: string}[] | [];
  // retailerDetails: {label: string, value: string, stores: {name: string, id: number}[]}[] | [];
  // regionDetails: {label: string, value: string, city: any}[] | [];
  // productDetails: {label: string, value: string}[] | [];
  brandDetails: {label: string, value: string}[] | [];
  categoriesDetails: any;
  levelsDetails: any;
};

export default function FilterElement({
  isFiltered,
  filters,
  updateFilter,
  userDetails,
  // retailerDetails,
  // regionDetails,
  // productDetails,
  brandDetails,
  categoriesDetails,
  levelsDetails,
//   brandFilter,
}: FilterElementProps) {
  const isMediumScreen = useMedia('(max-width: 1860px)', false);
  const [seletedSubCategory, setSelectedSubCategory] = useState<{id: number, name: string, children: any}[] | []>(categoriesDetails?.find(((cat: any) => cat?.id == filters['BG']))?.children||[])
  const [selectedSubSubCat, setSelecedSubSubCat] = useState<{name: string, id: string}[]>(seletedSubCategory?.find(((cat: any) => cat?.id == filters['VCP']))?.children||[])

  const handleReset = () => {
    Object.keys(filters).forEach((filter: string) => updateFilter(filter, ''))
  }
  return (
    <>
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
      <div className='w-full'>
          <label className='font-medium text-gray-700'> Level</label>
        <CreatableSelect
        className="pt-2 w-full"
        closeMenuOnSelect={true}
          options={levelsDetails}
          value={filters['level_id']?{label:levelsDetails?.find((option:any) => option.value === filters['level_id'])?.label,value:filters['level_id']}:""}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              boxShadow:"",
            
            }),
          }}
          placeholder='Select Level'
          onChange={(value: any) => {
            updateFilter('level_id', value.value);
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
          value={filters['BG']?{label:categoriesDetails?.find((option:any) => option.value === filters['BG'])?.label,value:filters['BG']}:""}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              boxShadow:"",
            
            }),
          }}
          placeholder='Select BG'
          onChange={(value: any) => {
            updateFilter('BG', value.value);
            updateFilter('VCP', "");
            updateFilter('BU', "");            
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
          value={filters['VCP']?{label:seletedSubCategory?.find((option) => option.id == filters['VCP'])?.name,value:filters['VCP']}:""}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              boxShadow:"",
            
            }),
          }}
          placeholder='Select VCP'
          onChange={(value: any) => {
            console.log(value);
            updateFilter('VCP', String(value.value));
            updateFilter('BU', "");
            setSelecedSubSubCat(seletedSubCategory?.find(((cat: any) => cat?.id == value.value))?.children)           
          }}
        />

        </div>
      </div>
      <div className='flex gap-2 w-full'>
      <div className='w-full'>
          <label className='font-medium text-gray-700'>BU</label>
        <CreatableSelect
        className="pt-2 w-full"
        closeMenuOnSelect={true}
          options={selectedSubSubCat?.map((cat:any) => ({label: cat?.name, value: cat?.id}))}
          value={filters['BU']?{label:selectedSubSubCat?.find((option) => option.id == filters['BU'])?.name,value:filters['BU']}:""}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              boxShadow:"",
            
            }),
          }}
          placeholder='Select BU'
          onChange={(value: any) => {
            updateFilter('BU', String(value.value));
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
