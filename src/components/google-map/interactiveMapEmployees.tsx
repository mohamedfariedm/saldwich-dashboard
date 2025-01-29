import MapLocations, {
    locationAtom,
    type Location,
  } from '@/components/google-map/mapLocationsattendans';
  import { useSetAtom } from 'jotai';
import { useSearchParams } from 'next/navigation';
import { useAllFilter, useUsersByRole } from '@/framework/settings';
import { useRoles } from '@/framework/roles';
import { useEffect, useState } from 'react';
import Spinner from '../ui/spinner';
import dynamic from 'next/dynamic';
import isString from 'lodash/isString';
const TableFilter = dynamic(
    () => import('@/components/charts/chart-filter'),
    { ssr: false }
  );
  const FilterElement = dynamic(
    () => import('@/components/google-map/filter-element-attendans'),
    { ssr: false }
  );
  export default function GoogleMap({text_tr, data ,role,local}: {local:string,role:string,text_tr?:any,data:any|null}) {
    const setLocation = useSetAtom(locationAtom);
    const handlePlaceSelect = (place: Location) => {
        if(data){
            setLocation(place);
        }
    };
    console.log("data",data);
    
  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams)
  // const { data: allRoles } = useRoles('');
  // const { data: allFilters } = useAllFilter()
  // const [roleFilter, setRoleFilter] = useState([])
  // const [regionFilter, setRegionFilter] = useState([])
  // const [retailerFilter, setRetailerFilter] = useState([])
  const [userFilter, setUserFilter] = useState([])

  const { data: allUsers,isLoading } = useUsersByRole([role]);
  // const { data: allUsers,isLoading } = useUsersByRole(['Supervisor', 'Promoter',"Marchindaizer"]);

  const filterState = {
        id: params.get('id') || '',
        date: params.get('date') || '',
        // role_filter: params.get('role_filter') || '',
        // store_filter: params.get('store_filter') || '',
        // region_filter: params.get('region_filter') || '',
        // city_filter: params.get('city_filter') || '',
        // retailer_filter: params.get('retailer_filter') || ''
        };
    const [filters, setFilters] = useState<Record<string, any>>(
    filterState ?? {}
    );
    useEffect(() => {
      // setRoleFilter(allRoles?.data?.roles?.map((role : any) => ({
      //       label: role?.name,
      //       value: String(role?.id)
      //   })))
        setUserFilter(allUsers?.data?.map((user : any) => ({
          label: user?.name,
          value: String(user?.id)
      })))
      // setRegionFilter(allFilters?.data.regions?.map((region: any) => ({
      //   label: region?.name,
      //   value: String(region?.id),
      //   city: region?.cities
      // })))
      // setRetailerFilter(allFilters?.data.retailers?.map((retailer: any) => ({
      //   label: retailer?.name,
      //   value: String(retailer?.id),
      //   ...retailer
      // })))
        
      }, [allUsers])

      function updateFilter(columnId: string, filterValue: string | any[]) {
        if (!Array.isArray(filterValue) && !isString(filterValue)) {
          throw new Error('filterValue data type should be string or array of any');
        }
    
        if (Array.isArray(filterValue) && filterValue.length !== 2) {
          throw new Error('filterValue data must be an array of length 2');
        }
    
        setFilters((prevFilters) => ({
          ...prevFilters,
          [columnId]: filterValue,
        }));
      }

      const filterOptions={
        searchTerm: '',
        onSearchClear: () => {
          // handleSearch('');
        },
        onSearchChange: (event: any) => {
          // handleSearch(event.target.value);
        },
        hasSearched: false,
        columns: [],
        checkedColumns: [],
        setCheckedColumns: () => {},
        filters: filters
      }
    return (
      <div className='flex flex-col gap-3'>
          <div className='flex justify-between'>
          <div className='flex gap-5'>
              <div className='flex gap-1 items-center'>
                  <div className='w-2 h-2 rounded' style={{backgroundColor: 'red'}}>{''}</div>
                  <div><span>In Progress</span></div>
              </div>
              <div className='flex gap-1 items-center'>
                  <div className='w-2 h-2 rounded' style={{backgroundColor: 'blue'}}>{''}</div>
                  <div><span>Absence</span></div>
              </div>
              <div className='flex gap-1 items-center'>
                  <div className='w-2 h-2 rounded' style={{backgroundColor: 'gray'}}>{''}</div>
                  <div><span>Coming / Pending</span></div>
              </div>
              <div className='flex gap-1 items-center'>
                  <div className='w-2 h-2 rounded' style={{backgroundColor: 'green'}}>{''}</div>
                  <div><span>completed</span></div>
              </div>
          </div>
          <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          {isLoading ? 
<div className="m-auto">
  <Spinner size="lg" />
</div>:
          <TableFilter {...filterOptions}>
  
              <FilterElement
                  isFiltered={false}
                  filters={filters}
                  updateFilter={updateFilter}
                  // roleDetails={roleFilter}
                  // regionDetails={regionFilter}
                  // retailerDetails={retailerFilter}
                  userDetails={userFilter}
              />
          </TableFilter>
  }
          </div>
          </div>
          
          <MapLocations
            apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY as string}
            onPlaceSelect={handlePlaceSelect}
            className="relative h-[500px] w-full flex-grow rounded-lg bg-gray-50"
            inputProps={{
              size: 'lg',
              type: 'text',
              rounded: 'pill',
              placeholder: 'Search for a location',
              className: 'absolute z-10 flex-grow block right-7 left-7 top-7',
              inputClassName: 'bg-white dark:bg-gray-100 border-0',
            }}
            mapClassName="rounded-lg"
            empLocations={data|| []}
            role={role}
            local={local}
          />
      </div>
    );
  }
  