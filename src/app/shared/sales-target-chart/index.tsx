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
import { useCallback, useEffect, useState } from 'react';
import { useUsersByRole, useAllFilter } from '@/framework/settings';
import SimpleBar from '@/components/ui/simplebar';
import { CustomYAxisTick } from '@/components/charts/custom-yaxis-tick';
import cn from '@/utils/class-names';
import DropdownAction from '@/components/charts/dropdown-action';
import { formatNumber } from '@/utils/format-number';
import isString from 'lodash/isString';
import Spending from '@/components/charts/spending';
import RadialBarChart from '@/app/shared/chart-widgets/radial-bar-chart';
import { BsArrowDownCircle } from 'react-icons/bs';
import { useCurrentPng } from "recharts-to-png";
import FileSaver from 'file-saver';
import { Button } from 'rizzui';
const TableFilter = dynamic(
  () => import('@/components/charts/chart-filter'),
  { ssr: false }
);
const FilterElement = dynamic(
  () => import('@/app/shared/sales-target-chart/filter-element'),
  { ssr: false }
);



const colors = ['#FF0000', '#E1306C', '#1DA1F2', '#4267B2']

export default function SimpleBarChart({text_tr , className, details }: {text_tr?:any,  className?: string; details: any }) {
  const isTablet = useMedia('(max-width: 820px)', false);
  const [data, setData] = useState([]);
  const { push } = useRouter()
  const pathName = usePathname()
  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams)
  const { data: allUsers } = useUsersByRole(['Promoter']);
  const { data: allFilters } = useAllFilter()
  const [userFilter, setUserFilter] = useState([])
  const [retailerFilter, setRetailerFilter] = useState([])
  const [regionFilter, setRegionFilter] = useState([])
  const [productFilter, setProductFilter] = useState([])
  const [brandFilter, setBrandFilter] = useState([])
  const [categoriesFilter, setCategoriesFilter] = useState([])
  const filterState = {
    promoter_id: params.get('promoter_id') || '',
    store_id: params.get('store_id') || '',
    sku_code: params.get('sku_code') || '',
    // city_id: params.get('city_id') || '',
    retailer_id: params.get('retailer_id') || '',
    // region_id: params.get('region_id') || '',
    brand_id: params.get('brand_id') || '',
    BG_id: params.get('BG_id') || '',
    VCP_id: params.get('VCP_id') || '',
    BU_id: params.get('BU_id') || '',
    week_from:params.get("week_from")||"",
    week_to:params.get("week_to")||"",
    month_from:params.get("month_to")||"",
    quarter_from:params.get("quarter_from")||"",
    quarter_to:params.get("quarter_to")||"",
    year_from:params.get("year_from")||"",
    year_to:params.get("year_to")||"",
    date_to:params.get("date_to")||"",
    date_from:params.get("date_from")||"",
    type:params.get("type")||"",
    stores_type:params.get("stores_type")||"",
  };
  const viewOptions = [
    {
      value: 'yearly',
      name: text_tr.sales_target_chart.yearly,
    },
    {
      value: 'quarter',
      name: text_tr.sales_target_chart.quarter,
    },
    {
      value: 'monthly',
      name: text_tr.sales_target_chart.monthly,
    },
    {
      value: 'weekly',
      name: text_tr.sales_target_chart.weekly
    },
  ];
  
  const viewTypesOptions = [
  
    {
      value: 'stores',
      name: text_tr.sales_target_chart.stores,
    },
    {
      value: 'promoters',
      name: text_tr.sales_target_chart.promoters,
    },
  
  ];
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

  function handleChange(viewType: string) {
    params.set('chart_type', viewType)
    push(`${pathName}?${params.toString()}`)
  }

  function handleChangeType(viewType: string) {
    params.set('chart_for',viewType)
    push(`${pathName}?${params.toString()}`)
  }


  useEffect(() => {
    if(details?.target_chart){
      setData(details?.target_chart?.map((item: any) => ({
            key: item?.label,
            target: item?.target_value,
            actual: item?.actual_value
        })))
    }
  }, [details])
  const [getPng, { ref, isLoading }] = useCurrentPng();

  const handleDownload = useCallback(async () => {
    const png = await getPng();
  
    // Verify that png is not undefined
    if (png) {
      // Download with FileSaver
      FileSaver.saveAs(png, 'myChart.png');
    }
  }, [getPng]);
  return (
    <div
    className="flex flex-col gap-3 overflow-hidden rounded-md text-sm shadow-sm"
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
                role={params.get('type')||"yearly"}
              />
          </TableFilter>
          </div>
      <WidgetCard
        title={text_tr?.sales_target_chart?.title}
        titleClassName="font-normal sm:text-sm text-gray-500 mb-2.5 font-inter"
        // headerClassName="flex-col @2xl:flex-row @4xl:flex-col @6xl:flex-row gap-3"
        // description={
        //   <div className="flex items-center justify-start">
        //     <Title as="h2" className="me-2 font-semibold">
        //       $83.45k
        //     </Title>
        //     <Text className="flex items-center leading-none text-gray-500">
        //       <Text
        //         as="span"
        //         className={cn(
        //           'me-2 inline-flex items-center font-medium text-green'
        //         )}
        //       >
        //         <TrendingUpIcon className="me-1 h-4 w-4" />
        //         32.40%
        //       </Text>
        //     </Text>
        //   </div>
        // }
        descriptionClassName="text-gray-500 mt-1.5"
        // actionClassName="w-full @2xl:w-auto @4xl:w-full @6xl:w-auto ps-0 @5xl:ps-2"
        action={
          <div className="flex items-center justify-between gap-5">
            <Legend  text={text_tr}   className="hidden @2xl:flex @3xl:hidden @5xl:flex" />
            <DropdownAction options={viewTypesOptions} defaultOption={viewTypesOptions.find((option: any) => option?.value == params.get('chart_for')) || viewTypesOptions[0]} onChange={handleChangeType} />
            <DropdownAction options={viewOptions} defaultOption={viewOptions.find((option: any) => option?.value == params.get('chart_type')) || viewOptions[0]} onChange={handleChange} />
            <Button
                  onClick={handleDownload}
          variant="outline"
          className={cn('w-full @lg:w-auto', "mt-0 w-full text-xs capitalize @lg:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100 sm:text-sm lg:mt-0")}
        >
          <BsArrowDownCircle className="me-1.5 h-[17px] w-[17px]" />
          {text_tr.sales_target_chart.downloadbtn}
        </Button>
          </div>
        }
        className={className}
      >
        <Legend text={text_tr}   className="mt-2 flex @2xl:hidden @3xl:flex @5xl:hidden" />
        <SimpleBar>
          <div className="h-96 w-full pt-9">
            <ResponsiveContainer
              width="100%"
              height="100%"
              {...(isTablet && { minWidth: '700px' })}
            >
              <ComposedChart
              ref={ref}
                data={data}
                barSize={isTablet ? 20 : 24}
                className="[&_.recharts-tooltip-cursor]:fill-opacity-20 dark:[&_.recharts-tooltip-cursor]:fill-opacity-10 [&_.recharts-cartesian-axis-tick-value]:fill-gray-500 [&_.recharts-cartesian-axis.yAxis]:-translate-y-3 rtl:[&_.recharts-cartesian-axis.yAxis]:-translate-x-12 [&_.recharts-cartesian-grid-vertical]:opacity-0"
              >
                <defs>
                  <linearGradient id="salesReport" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="#F0F1FF"
                      className=" [stop-opacity:0.1]"
                    />
                    <stop offset="95%" stopColor="#8200E9" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <defs>
                  <linearGradient
                    id="colorUv"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="100%"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0" stopColor="#A5BDEC" />
                    <stop offset="0.8" stopColor="#477DFF" />
                    <stop offset="1" stopColor="#477DFF" />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="8 10" strokeOpacity={0.435} />
                <XAxis dataKey="key" axisLine={false} tickLine={false} />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={({ payload, ...rest }) => {
                    const pl = {
                      ...payload,
                      value: formatNumber(Number(payload.value)),
                    };
                    return (
                      <CustomYAxisTick prefix={''} payload={pl} {...rest} />
                    );
                  }}
                />
                <Tooltip content={<CustomTooltip formattedNumber prefix="" />} />

                <Bar
                  dataKey='target'
                  stackId="a"
                  barSize={40}
                  fill="#96C0FF"
                  // stroke="#477DFF"
                  // strokeOpacity={0.3}
                  // radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey='actual'
                  stackId="a"
                  barSize={40}
                  fill="#DEEAFC"
                  // stroke="#477DFF"
                  // strokeOpacity={0.3}
                  // radius={[4, 4, 0, 0]}
                />
                {/* <Line
                  type="bump"
                  dataKey="expense"
                  stroke="#FCB03D"
                  strokeWidth={4}
                  dot
                /> */}
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </SimpleBar>
      </WidgetCard>



      {(details?.achieved_target || details?.remaining_target) && <Spending className="col-span-full @[59rem]:col-span-3 @[90rem]:col-span-2" achievedTarget={details?.achieved_target} remainingTarget={details?.remaining_target} />}
      {details?.target_category ? 
      <RadialBarChart text_translate={text_tr} targetPercent={details?.target_category}/> : null}
      <WidgetCard title={text_tr?.sales_target_chart?.suptitle}>
        <div className='flex gap-3 mt-3 justify-center'>
          {details?.target_category?.map((cat: any, index: number) => 
          <div className='flex flex-col' key={index}>
            <span className='flex align-middle items-center gap-1'>
              <div className='w-2 h-2 rounded' style={{backgroundColor: colors[index % 4]}}>{''}</div>
              <div>{cat?.name}</div>
            </span>
            <span>{cat?.achived_percent}%</span>
          </div>
          )}
        </div>
      </WidgetCard>
      
    </div>
  );
}

function Legend({ className ,text}: { className?: string,text?:any }) {
  return (
    <div className={cn('flex-wrap items-start gap-3 lg:gap-4', className)}>
      <span className="flex items-center gap-1.5">
        <span
          className="h-2.5 w-2.5 rounded-full"
          style={{
            background: `linear-gradient(180deg, #A5BDEC 0%, #477DFF 53.65%)`,
          }}
        />
        <span>{text.sales_chart.sales}</span>
      </span>
      {/* <span className="flex items-center gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#F5A623]" />
        <span>Expense</span>
      </span> */}
    </div>
  );
}