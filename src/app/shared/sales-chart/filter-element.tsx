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
import { useSearchParams } from 'next/navigation';
import CreatableSelect from 'react-select'

const typeOptions = [
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
    value: 'monthly',
    name: 'monthly',
    label: 'Month',
    filterFrom: 'month_from',
    filterTo: 'month_to',
    dateFormat: 'MM/yyyy'
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
  brandDetails: {name: string, value: string}[] | [];
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
  const [selectedRegion, setSelectedRegion] = useState<{label: string, value: string}[]>([])
  const [seletedSubCategory, setSelectedSubCategory] = useState<{id: number, name: string, children: any}[] | []>(categoriesDetails?.find(((cat: any) => cat?.id == filters['BG_id']))?.children||[])
  const [selectedSubSubCat, setSelecedSubSubCat] = useState<{name: string, id: string}[]>(seletedSubCategory?.find(((cat: any) => cat?.id == filters['VCP_id']))?.children||[])
  const [selectedRetailer, setSelectedRetailer] = useState<{label: string, value: string}[] | []>(filters['retailer_id']?retailerDetails?.find((retailer: any) => retailer?.value == filters['retailer_id'])?.stores?.map((store: any) => ({label: store?.name+" ( "+store?.store_code+" ) ", value: String(store?.id)})) || []:[])
  const [selectedType, setSelectedType] = useState(typeOptions[0])
  useEffect(() => {
    if(filters['region_id']){
      setSelectedRegion(regionDetails?.find((regions: any) => regions?.value == filters['region_id'])?.city?.map((city: any) => ({
        label: city?.name,
        value: String(city?.id)
      })) || [])
    }
    // if(filters['retailer_id']){
    //   setSelectedRetailer(retailerDetails?.find((retailer: any) => retailer?.value == filters['retailer_id'])?.stores?.map((store: any) => ({name:  store?.name+" ( "+store?.store_code+" ) ", value: String(store?.id)})) || [])
    // }
    // if(filters['BG_id']){
    //   setSelectedSubCategory(categoriesDetails?.find(((cat: any) => cat?.id == filters['BG_id']))?.children)
    //   setSelecedSubSubCat(seletedSubCategory?.find(((cat: any) => cat?.id == filters['VCP_id']))?.children)  
    // }
    // if(filters['VCP_id']){
    //   setSelecedSubSubCat(seletedSubCategory?.find(((cat: any) => cat?.id == filters['VCP_id']))?.children)
    // }
    // if(role !== '') {
    //   setSelectedType(typeOptions?.find((option) => option?.value == role || '') || typeOptions[0])
    // }
  }, [])
  const handleReset = () => {
    Object.keys(filters).forEach((filter: string) => updateFilter(filter, ''))
  }
  dayjs.extend(weekOfYear)
  dayjs.extend(quarterOfYear)


  useEffect(()=>{
    
  },[selectedType])

  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams)
  params.get("week_from")
  params.get("year_from")
let[newStartDate,setNewStartDate]=useState(`${params.get("year_from")}-W${params.get("week_from")}`||"")
let[newEndDate,setNewEndDate]=useState(`${params.get("year_to")}-W${params.get("week_to")}`||"")
  return (
    <>
      <StatusField
          options={typeOptions}
          placeholder='Select Type'
          value={filters['type']||selectedType.value}
          onChange={(value: string) => {
            updateFilter('type', String(value));
            setSelectedType(typeOptions.find((option: any) => option.value == value) || typeOptions[0]);
          }}
          getOptionValue={(option) => option.value}
          displayValue={(selected: string) =>
            typeOptions?.find((option) => option.value === selected)?.value ??
            selected
          }
          {...(isMediumScreen && {
            label: 'Type',
            labelClassName: 'font-medium text-gray-700',
          })}
        />
        {selectedType.label == 'Day' ? 
        <>
          <DateFiled
              selected={filters['date_from'] ? new Date(filters['date_from']) : null}
              onChange={(date: any) => {
              // updateFilter(selectedType.filterFrom, String(date));
              setDateFilter([selectedType.filterFrom], {[selectedType.filterFrom]: String(formatDate(date, 'YYYY-MM-DD'))}, '_from')
              }}
              placeholderText="Select start date"
              dateFormat={selectedType.dateFormat}
              {...(isMediumScreen && {
              inputProps: {
                  label: ` From ${selectedType.label}`,
                  labelClassName: 'font-medium text-gray-700',
              },
              })}
          />
          <DateFiled
              selected={filters['date_to'] ? new Date(filters['date_to']) : null}
              onChange={(date: any) => {
              // updateFilter(selectedType.filterTo, String(date));
              setDateFilter([selectedType.filterTo], {[selectedType.filterTo]: String(formatDate(new Date(date), 'YYYY-MM-DD'))}, '_to')

              }}
              placeholderText="Select to date"
              dateFormat={selectedType.dateFormat}
              {...(isMediumScreen && {
              inputProps: {
                  label: `To ${selectedType.label} `,
                  labelClassName: 'font-medium text-gray-700',
              },
              })}
          />
        </>
         : null}
         {selectedType.label == 'Week' ? 
        <>
          {/* <DateFiled
              selected={filters['week_from'] ? new Date(filters['year_from'], 0, 1 + (filters['week_from'] - 1) * 7) : null}
              onChange={(date: any) => {
              // updateFilter(selectedType.filterFrom, String(date));
              setDateFilter([selectedType.filterFrom, 'year_from'], {[selectedType.filterFrom]: String(dayjs(date).week() - 1), 'year_from': dayjs(date).get('year')}, '_from')
              }}
              placeholderText="Select start date"
              showWeekNumbers={selectedType.value == 'weekly'}
              //@ts-ignore
              showWeekPicker={selectedType.value == 'weekly'}
              dateFormat={selectedType.dateFormat}
              {...(isMediumScreen && {
              inputProps: {
                  label: ` From ${selectedType.label}`,
                  labelClassName: 'font-medium text-gray-700',
              },
              })}
          />
          <DateFiled
              selected={filters['week_to'] && filters['year_to'] ? new Date(filters['year_to'], 0, 1 + (filters['week_to'] - 1) * 7) : null}
              onChange={(date: any) => {
              // updateFilter(selectedType.filterTo, String(date));
              setDateFilter([selectedType.filterTo, 'year_to'], {[selectedType.filterTo]: String(dayjs(date)?.week() - 1), 'year_to': dayjs(date)?.get('year')}, '_to')

              }}
              placeholderText="Select to date"
              showWeekNumbers={selectedType.value == 'weekly'}
              //@ts-ignore
              showWeekPicker={selectedType.value == 'weekly'}
              dateFormat={selectedType.dateFormat}
              {...(isMediumScreen && {
              inputProps: {
                  label: ` To ${selectedType.label}`,
                  labelClassName: 'font-medium text-gray-700',
              },
              })}
          /> */}
                    <div className=''>

<label htmlFor="weekFor" className='font-medium text-gray-700 w-full'>{`From ${selectedType.label} `}</label>
<input
 id='weekFor' 
 style={{boxShadow:"none"}} 
 value={newStartDate}
 onChange={(event)=>{
    setNewStartDate(event.target.value) 
    setDateFilter([selectedType.filterFrom, 'year_from'], {[selectedType.filterFrom]: String(event.target.value.slice(6,8)), 'year_from': event.target.value.slice(0,4)}, '_from')
  }} type="week" className='w-full h-11 [&_input]:text-ellipsis rounded-md border-color: rgb(203 213 225) border-gray-300  focus:border-black hover:border-black cursor-pointer text-sm mt-1'              
  />
</div>
<div>
<label htmlFor="weekto" className='font-medium text-gray-700'>{`To ${selectedType.label} `}</label>
<input
 id='weekto' 
 style={{boxShadow:"none"}} 

 value={newEndDate}
 onChange={(event)=>{
    setNewEndDate(event.target.value) 
    setDateFilter([selectedType.filterTo, 'year_to'], {[selectedType.filterTo]: String(event.target.value.slice(6,8)), 'year_to': event.target.value.slice(0,4)}, '_to')
  }} type="week" className='w-full h-11 [&_input]:text-ellipsis rounded-md border-color: rgb(203 213 225) border-gray-300  focus:border-black hover:border-black cursor-pointer text-sm mt-1'              
  />
</div>
        </>
         : null}
         {selectedType.label == 'Month' ? 
        <>
          <DateFiled
              selected={filters['month_from'] && filters['year_from'] ? new Date(filters['year_from'], filters['month_from'] - 1, 1) : null}
              onChange={(date: any) => {
              // updateFilter(selectedType.filterFrom, String(date));
              setDateFilter([selectedType.filterFrom, 'year_from'], {[selectedType.filterFrom]: String(dayjs(date).month() + 1), 'year_from': dayjs(date).get('year')}, '_from')
              }}
              placeholderText="Select start date"
              showMonthYearPicker={selectedType.value == 'monthly'}
              dateFormat={selectedType.dateFormat}
              {...(isMediumScreen && {
              inputProps: {
                  label: `From ${selectedType.label} `,
                  labelClassName: 'font-medium text-gray-700',
              },
              })}
          />
          <DateFiled
              selected={filters['month_to'] && filters['year_to'] ? new Date(filters['year_to'], filters['month_to'] - 1, 1) : null}
              onChange={(date: any) => {
              // updateFilter(selectedType.filterTo, String(date));
              setDateFilter([selectedType.filterTo, 'year_to'], {[selectedType.filterTo]: String(dayjs(date).month() + 1), 'year_to': dayjs(date).get('year')}, '_to')

              }}
              placeholderText="Select to date"
              showMonthYearPicker={selectedType.value == 'monthly'}
              dateFormat={selectedType.dateFormat}
              {...(isMediumScreen && {
              inputProps: {
                  label: ` To ${selectedType.label}`,
                  labelClassName: 'font-medium text-gray-700',
              },
              })}
          />
        </>
         : null}
         {selectedType.label == 'Quarter' ? 
        <>
          <DateFiled
              selected={filters['quarter_from'] ? new Date(filters['year_from'], filters['quarter_from'] * 3, 1) : null}
              onChange={(date: any) => {
              // updateFilter(selectedType.filterFrom, String(date));
              setDateFilter([selectedType.filterFrom, 'year_from'], {[selectedType.filterFrom]: String(dayjs(date).quarter()), 'year_from': dayjs(date).get('year')}, '_from')
              }}
              placeholderText="Select start date"
              showQuarterYearPicker={selectedType.value == 'quarter'}
              dateFormat={selectedType.dateFormat}
              {...(isMediumScreen && {
              inputProps: {
                  label: `From ${selectedType.label} `,
                  labelClassName: 'font-medium text-gray-700',
              },
              })}
          />
          <DateFiled
              selected={filters['quarter_to'] ? new Date(filters['year_to'], filters['quarter_to'] * 3, 0 ) : null}
              onChange={(date: any) => {
              // updateFilter(selectedType.filterTo, String(date));
              setDateFilter([selectedType.filterTo, 'year_to'], {[selectedType.filterTo]: String(dayjs(date).quarter()), 'year_to': dayjs(date).get('year')}, '_to')

              }}
              placeholderText="Select to date"
              showQuarterYearPicker={selectedType.value == 'quarter'}
              dateFormat={selectedType.dateFormat}
              {...(isMediumScreen && {
              inputProps: {
                  label: `To ${selectedType.label} `,
                  labelClassName: 'font-medium text-gray-700',
              },
              })}
          />
        </>
         : null}
         {selectedType.label == 'Year' ? 
        <>
          <DateFiled
              selected={filters['year_from'] ? new Date(filters['year_from'], 0, 1) : null}
              onChange={(date: any) => {
              // updateFilter(selectedType.filterFrom, String(date));
              setDateFilter([selectedType.filterFrom], {[selectedType.filterFrom]: String(dayjs(date).get('year'))}, '_from')
              }}
              placeholderText="Select start date"
              showYearPicker={selectedType.value == 'yearly'}
              dateFormat={selectedType.dateFormat}
              {...(isMediumScreen && {
              inputProps: {
                  label: `From ${selectedType.label} `,
                  labelClassName: 'font-medium text-gray-700',
              },
              })}
          />
          <DateFiled
              selected={filters['year_to'] ? new Date(filters['year_to'], 0, 1) : null}
              onChange={(date: any) => {
              // updateFilter(selectedType.filterTo, String(date));
              setDateFilter([selectedType.filterTo], {[selectedType.filterTo]: String(dayjs(date).get('year'))}, '_to')

              }}
              placeholderText="Select to date"
              showYearPicker={selectedType.value == 'yearly'}
              dateFormat={selectedType.dateFormat}
              {...(isMediumScreen && {
              inputProps: {
                  label: `To ${selectedType.label} `,
                  labelClassName: 'font-medium text-gray-700',
              },
              })}
          />
        </>
      : null}

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
      
      <div className='flex gap-2 w-full'>
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
