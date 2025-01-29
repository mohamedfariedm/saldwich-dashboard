'use client';

import React, { useState } from 'react';
import { PiTrashDuotone } from 'react-icons/pi';
import DateFiled from '@/components/controlled-table/date-field';
import StatusField from '@/components/controlled-table/status-field';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/utils/format-date';
import { useMedia } from '@/hooks/use-media';
import { Title, Text } from '@/components/ui/text';
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
  handleReset: () => void;
  categoriesName: {label: string, value: string}[] | [];
};

export default function FilterElement({
  isFiltered,
  filters,
  updateFilter,
  categoriesName,
}: FilterElementProps) {
  const isMediumScreen = useMedia('(max-width: 1860px)', false);
  const handleReset = () => {
    Object.keys(filters).forEach((filter: string) => updateFilter(filter, ''))
  }
  return (
    <>
          <div className='w-full'>
          <label className='font-medium text-gray-700'> BG Categories</label>
        <CreatableSelect
        className="pt-2 w-full"
        closeMenuOnSelect={true}
          options={categoriesName}
          value={filters['search_word']?{label:categoriesName?.find((option) => option.value === filters['search_word'])?.label,value:filters['search_word']}:""}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              boxShadow:"",
            
            }),
          }}
          placeholder='Select Categorie'
          onChange={(value: any) => {
            updateFilter('search_word', value.value);
          }}
        />
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
     
    </>
  );
}
