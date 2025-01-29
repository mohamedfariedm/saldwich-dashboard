'use client';

import WidgetCard from '@/components/cards/widget-card';
import { CustomTooltip } from '@/components/charts/custom-tooltip';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  // BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ComposedChart,
  // Legend,
  ResponsiveContainer,
} from 'recharts';
import dynamic from 'next/dynamic';
import { useMedia } from '@/hooks/use-media';
import { useEffect, useState } from 'react';
import { useUsersByRole, useAllFilter } from '@/framework/settings';
import SimpleBar from '@/components/ui/simplebar';
import { CustomYAxisTick } from '@/components/charts/custom-yaxis-tick';
import cn from '@/utils/class-names';
import DropdownAction from '@/components/charts/dropdown-action';
import { formatNumber } from '@/utils/format-number';
import isString from 'lodash/isString';
import MixBarChart from '../chart-widgets/mix-bar-chart';
const TableFilter = dynamic(
  () => import('@/components/charts/chart-filter'),
  { ssr: false }
);
const FilterElement = dynamic(
  () => import('@/app/shared/target-chart-dashboard-attendans/filter-element'),
  { ssr: false }
);

const viewOptions = [
  // {
  //   value: 'daily',
  //   name: 'Daily',
  // },
  {
    value: 'yearly',
    name: 'Yearly',
  },
  {
    value: 'quarter',
    name: 'Quarter',
  },
  {
    value: 'monthly',
    name: 'Monthly',
  },
  {
    value: 'weekly',
    name: 'Weekly'
  },
];

const color=[
  {
    target_value_color:"#2563eb",
    actual_value_color:"#60a5fa",
    last_year_achieved_color:"#93c5fd",
  },
  {
    target_value_color:"#2563eb",
    actual_value_color:"#60a5fa",
    last_year_achieved_color:"#93c5fd",
  },
  {
  target_value_color:"#D35400",
  actual_value_color:"#EB984E",
  last_year_achieved_color:"#F5B041",
},
  {
  target_value_color:"#17202A",
  actual_value_color:"#5D6D7E",
  last_year_achieved_color:"#B2BABB",
},
  {
  target_value_color:"#4D5656",
  actual_value_color:"#626567",
  last_year_achieved_color:"#626567",
},
  {
  target_value_color:"#D35400",
  actual_value_color:"#EB984E",
  last_year_achieved_color:"#F5B041",
},
]

export default function SimpleBarChart({text_tr, className, details }: {text_tr?:any, className?: string; details: any }) {
  const isTablet = useMedia('(max-width: 820px)', false);
  const [data, setData] = useState([]);
  const { push } = useRouter()
  const pathName = usePathname()
  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams)
  const { data: allUsers } = useUsersByRole(['Supervisor', 'Promoter']);
  const { data: allFilters } = useAllFilter()
  const [userFilter, setUserFilter] = useState([])
  const [retailerFilter, setRetailerFilter] = useState([])
  const [regionFilter, setRegionFilter] = useState([])
  const [productFilter, setProductFilter] = useState([])
  const [brandFilter, setBrandFilter] = useState([])
  const [categoriesFilter, setCategoriesFilter] = useState([])
  const viewOptions = [
    {
      value: 'yearly',
      name: text_tr.sold_qty.yearly,
    },
    {
      value: 'quarter',
      name: text_tr.sold_qty.quarter,
    },
    {
      value: 'monthly',
      name: text_tr.sold_qty.monthly,
    },
    {
      value: 'weekly',
      name: text_tr.sold_qty.weekly
    },
  ];
  
 
  const filterState = {
    user_id: params.get('user_id') || '',
    store_id: params.get('store_id') || '',
    product_id: params.get('product_id') || '',
    city_id: params.get('city_id') || '',
    retailer_id: params.get('retailer_id') || '',
    region_id: params.get('region_id') || '',
    brand_id: params.get('brand_id') || '',
    BG_id: params.get('BG_id') || '',
    VCP_id: params.get('VCP_id') || '',
    BU_id: params.get('BU_id') || '',
    stores_type: params.get('stores_type') || '',
  };
  const [filters, setFilters] = useState<Record<string, any>>(
    filterState ?? {}
  );
  useEffect(() => {
    setUserFilter(allUsers?.data?.map((user : any) => ({
        label: user?.name,
        value: String(user?.id)
    })))
    setRegionFilter(allFilters?.data.regions?.map((region: any) => ({
      label: region?.name,
      value: String(region?.id),
      city: region?.cities
    })))
    setRetailerFilter(allFilters?.data.retailers?.map((retailer: any) => ({
      label: retailer?.name,
      value: String(retailer?.id),
      ...retailer
    })))
    setProductFilter(allFilters?.data.products?.map((product: any) => ({
      label: product?.sku_code,
        value: String(product?.id)
    })))
    setBrandFilter(allFilters?.data.brands?.map((brand: any) => ({
        label: brand?.name,
        value: String(brand?.id)
    })))
    setCategoriesFilter(allFilters?.data?.categories?.map((category: any) => ({
      label: category?.name,
      value: String(category?.id),
      ...category
    })))
  }, [allFilters, allUsers])



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

  function setDateFilter(filterKeys: string[], filtersValue: any, type: string) {
    setFilters((prevFilters) => {
      const filtersWithoutDate = Object.keys(prevFilters)
      filtersWithoutDate.forEach(key => {
        if((key.includes(type) && !filterKeys.includes(key)) ) delete prevFilters[key]
      })
      return {
        ...prevFilters,
        ...filtersValue
      }
    })
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
    <div
    className="overflow-hidden rounded-md text-sm shadow-sm"
    >
      <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          
          <TableFilter {...filterOptions}>
  
            <FilterElement
                isFiltered={false}
                filters={filters}
                updateFilter={updateFilter}
                setDateFilter={setDateFilter}
                userDetails={userFilter}
                retailerDetails={retailerFilter}
                regionDetails={regionFilter}
                productDetails={productFilter}
                brandDetails={brandFilter}
                categoriesDetails={categoriesFilter}
                role={Array.from(params.keys()).find(key => key.includes('_from')) || ''}
              />
          </TableFilter>
          </div>
          <MixBarChart text={text_tr} colorkey={color[1]} name={params.get('group_by') || 'monthly'} data={details} role={1} dim={5}  />

    </div>
  );
}
