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
import { useAllNotifications } from '@/framework/notifications';
let usersarray:any=[]


const statusOptions = [
  {
    value: 'custom',
    name: 'Custom',
    label: (
      <div className="flex items-center">
        <Text className="ms-2 font-medium ">Custom</Text>
      </div>
    ),
  },
  {
    value: 'all',
    name: 'All',
    label: (
      <div className="flex items-center">
        <Text className="ms-2 font-medium ">All</Text>
      </div>
    ),
  },
  {
    value: 'marchindaizers',
    name: 'Marchindaizers',
    label: (
      <div className="flex items-center">
        <Text className="ms-2 font-medium ">Marchindaizers</Text>
      </div>
    ),
  },
  {
    value: 'promoters',
    name: 'Promoters',
    label: (
      <div className="flex items-center">
        <Text className="ms-2 font-medium ">Promoters</Text>
      </div>
    ),
  },
  {
    value: 'supervisors',
    name: 'Supervisors',
    label: (
      <div className="flex items-center">
        <Text className="ms-2 font-medium ">Supervisors</Text>
      </div>
    ),
  },

];

type FilterElementProps = {
  isFiltered: boolean;
  filters: { [key: string]: any };
  updateFilter: (columnId: string, filterValue: string | any[]) => void;
  userDetails: {label: string, value: string}[] | [];
};

export default function FilterElement({
  isFiltered,
  filters,
  updateFilter,
  userDetails,

//   brandFilter,
}: FilterElementProps) {
  const isMediumScreen = useMedia('(max-width: 1860px)', false);
  const [selectedUserType, setSelectedUserType] = useState(filters['users_type']?{label:statusOptions?.find((option) => option.value === filters['users_type'])?.name,value:filters['users_type']}:{label:"users",value:""});

  // const { data: allNotifications, isLoading: isAllProdLoading } = useAllNotifications();

  const handleReset = () => {
    Object.keys(filters).forEach((filter: string) => updateFilter(filter, ''))
    setSelectedUserType({label:"users",value:""})
  }



  return (
    <>
      {/* <StatusField
        options={statusOptions}
        value={filters['users_type']}
        onChange={(value: string) => {
          console.log(value);
          updateFilter('users_type', value);
          setSelectedUserType(value)
          if(selectedUserType!=="custom"){
            updateFilter('user_id', "");
          }
        }}
        getOptionValue={(option) => option.value}
        displayValue={(selected: string) =>
          statusOptions.find((option) => option.value === selected)?.label ??
          selected
        }
        {...(isMediumScreen && {
          label: 'User Type',
          placeholder:"User Type",
          labelClassName: 'font-medium text-gray-700',
        })}
      /> */}
                                <CreatableSelect
                                value={selectedUserType}
                                styles={{
                                    control: (baseStyles, state) => ({
                                      ...baseStyles,
                                      boxShadow:"",
                                      borderColor:"black",
                                    }),
                                  }}
                                placeholder="Users"
                                className="pt-2 w-full"
                                closeMenuOnSelect={true}
                                options={ statusOptions.map((cat: any) =>{ 
                                    return {label:cat.name, value: cat.value}})} 
                                    onChange={(value: any) => {
                                      console.log(value);
                                      updateFilter('users_type', value.value);
                                      setSelectedUserType(value)
                                      if(selectedUserType.value!=="custom"){
                                        updateFilter('user_id', "");
                                      }
                                    }}
                                />

{selectedUserType.value==="custom"||filters['users_type']==="custom"? 
<>
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

{/* <StatusField
options={userDetails}
placeholder='Select user'
value={filters['user_id']}
onChange={(value: string) => {
  updateFilter('user_id', value);
  if(selectedUserType.value!=="custom"){
    updateFilter('user_id', "");
  }
}}
getOptionValue={(option) => option.value}
displayValue={(selected: string) =>
    userDetails?.find((option) => option.value === selected)?.name ??
  selected
}
{...(isMediumScreen && {
  label: 'Users',
  labelClassName: 'font-medium text-gray-700',
})}
/> */}
</>
                                // <CreatableSelect
                                // styles={{
                                //     control: (baseStyles, state) => ({
                                //       ...baseStyles,
                                //       boxShadow:"",
                                //       borderColor:"black",
                                //     }),
                                //   }}
                                // placeholder="Users"
                                // className="pt-2 w-full"
                                // closeMenuOnSelect={false}
                                // options={ allNotifications?.data?.users.map((cat: any) =>{ 
                                //     return {label:cat.name, value: cat.id}})} 
                                //     isMulti
                                // onChange={(value:any)=>{
                                //   console.log(value);
                                //     let far=[...value]
                                //     let catc:any=[]
                                //     far.map((fa)=>catc.push(fa.value))
                                //     usersarray=[...catc]
                                // }}
                                // />
                                
                                
                                :""}



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
