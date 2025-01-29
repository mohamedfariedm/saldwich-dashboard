'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useTable } from '@/hooks/use-table';
import { useColumn } from '@/hooks/use-column';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import ControlledTable from '@/components/controlled-table';
import { getColumns } from '@/app/shared/sales-target-table/columns';
import { useUsersByRole, useAllFilter } from '@/framework/settings';
import Spending from '@/components/charts/spending';
import RadialBarChart from '@/app/shared/chart-widgets/radial-bar-chart';
import isString from 'lodash/isString';
import WidgetCard from '@/components/cards/widget-card';
const FilterElement = dynamic(
  () => import('@/app/shared/sales-target-chart/filter-element'),
  { ssr: false }
);
const TableFooter = dynamic(() => import('@/app/shared/table-footer'), {
  ssr: false,
});

const colors = ['#FF0000', '#E1306C', '#1DA1F2', '#4267B2'];

export default function SalesTargetTable({
  text_tr,
  role,
  data = [],
  achieved_target,
  remaining_target,
  target_category,
  totalItems,
}: {
  text_tr?: any;
  data: any[];
  achieved_target: number;
  remaining_target: number;
  target_category: any[];
  totalItems: number;
  role?: number;
}) {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const [pageSize, setPageSize] = useState(Number(params.get('limit')));
  const { data: allUsers } = useUsersByRole(['Promoter']);
  const { data: allFilters } = useAllFilter();
  const [userFilter, setUserFilter] = useState([]);
  const [retailerFilter, setRetailerFilter] = useState([]);
  const [regionFilter, setRegionFilter] = useState([]);
  const [productFilter, setProductFilter] = useState([]);
  const { push } = useRouter();
  const pathName = usePathname();
  const [brandFilter, setBrandFilter] = useState([]);
  const [categoriesFilter, setCategoriesFilter] = useState([]);
  console.log(allUsers);

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
    week_from: params.get('week_from') || '',
    week_to: params.get('week_to') || '',
    month_from: params.get('month_to') || '',
    quarter_from: params.get('quarter_from') || '',
    quarter_to: params.get('quarter_to') || '',
    year_from: params.get('year_from') || '',
    year_to: params.get('year_to') || '',
    date_to: params.get('date_to') || '',
    date_from: params.get('date_from') || '',
    type: params.get('type') || '',
    chart_for: params.get('chart_for') || 'promoters ',
    stores_type: params.get('stores_type') || '',
  };

  const [filters, setFilters] = useState<Record<string, any>>(
    filterState ?? {}
  );
  useEffect(() => {
    if (allUsers?.success) {
      setUserFilter(
        allUsers?.data?.map((user: any) => ({
          label: user?.name,
          value: String(user?.id),
        }))
      );
    }
    setRegionFilter(
      allFilters?.data.regions?.map((region: any) => ({
        label: region?.name,
        value: String(region?.id),
        city: region?.cities,
      }))
    );
    setRetailerFilter(
      allFilters?.data.retailers?.map((retailer: any) => ({
        label: retailer?.name,
        value: String(retailer?.id),
        ...retailer,
      }))
    );
    setProductFilter(
      allFilters?.data.products?.map((product: any) => ({
        label: product?.sku_code,
        value: String(product?.id),
      }))
    );
    setBrandFilter(
      allFilters?.data.brands?.map((brand: any) => ({
        label: brand?.name,
        value: String(brand?.id),
      }))
    );
    setCategoriesFilter(
      allFilters?.data?.categories?.map((category: any) => ({
        label: category?.name,
        value: String(category?.id),
        ...category,
      }))
    );
  }, [allFilters, allUsers]);

  const onHeaderCellClick = (value: string) => ({
    onClick: () => {
      handleSort(value);
    },
  });

  const handleDelete = (ids: string[]) => {};

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
  const {
    isLoading,
    isFiltered,
    tableData,
    currentPage,
    // totalItems,
    handlePaginate,
    // filters,
    // updateFilter,
    searchTerm,
    handleSearch,
    sortConfig,
    handleSort,
    selectedRowKeys,
    setSelectedRowKeys,
    handleRowSelect,
    handleSelectAll,
  } = useTable(data, pageSize, filterState, role);
  const columns = React.useMemo(
    () =>
      getColumns({
        data,
        sortConfig,
        text_tr,
        checkedItems: selectedRowKeys,
        onHeaderCellClick,
        onChecked: handleRowSelect,
        handleSelectAll,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      selectedRowKeys,
      onHeaderCellClick,
      sortConfig.key,
      sortConfig.direction,
      handleRowSelect,
      handleSelectAll,
    ]
  );

  function setDateFilter(
    filterKeys: string[],
    filtersValue: any,
    type: string
  ) {
    setFilters((prevFilters) => {
      const filtersWithoutDate = Object.keys(prevFilters);
      filtersWithoutDate.forEach((key) => {
        if (key.includes(type) && !filterKeys.includes(key))
          delete prevFilters[key];
      });
      return {
        ...prevFilters,
        ...filtersValue,
      };
    });
  }

  const { visibleColumns, checkedColumns, setCheckedColumns } =
    useColumn(columns);

  return (
    <div className="flex flex-col gap-3 overflow-hidden rounded-md text-sm shadow-sm">
      <ControlledTable
      text_tr={text_tr}
        variant="modern"
        data={tableData}
        isLoading={isLoading}
        showLoadingText={true}
        place={role}
        // @ts-ignore
        columns={columns}
        paginatorOptions={{
          pageSize: pageSize || 10,
          setPageSize,
          total: totalItems,
          current: currentPage,
          onChange: (page: number) => handlePaginate(page),
        }}
        filterOptions={{
          text_tr:text_tr,
          searchTerm,
          onSearchClear: () => {
            handleSearch('');
          },
          onSearchChange: (event) => {
            handleSearch(event.target.value);
          },
          hasSearched: isFiltered,
          columns,
          checkedColumns,
          setCheckedColumns,
          filters,
          showToggleColumns: false,
          showToggleType: true,
        }}
        filterElement={
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
            role={params.get('type') || 'yearly'}
          />
        }
        tableFooter={
          <TableFooter
            checkedItems={selectedRowKeys}
            handleDelete={(ids: string[]) => {
              setSelectedRowKeys([]);
              handleDelete(ids);
            }}
          ></TableFooter>
        }
        className="overflow-hidden rounded-md border border-gray-200 text-sm shadow-sm [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:h-60 [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:justify-center [&_.rc-table-row:last-child_td.rc-table-cell]:border-b-0 [&_thead.rc-table-thead]:border-t-0"
      />

      {!role
        ? (achieved_target || remaining_target) && (
            <Spending
              className="col-span-full @[59rem]:col-span-3 @[90rem]:col-span-2"
              achievedTarget={achieved_target}
              remainingTarget={remaining_target}
            />
          )
        : ''}
      {!role ? (
        <>
          <RadialBarChart
            text_translate={text_tr}
            targetPercent={target_category}
          />
          <WidgetCard title={text_tr?.sales_target_table?.catTA}>
            <div className="mt-3 flex justify-center gap-3">
              {target_category?.map((cat: any, index: number) => (
                <div className="flex flex-col" key={index}>
                  <span className="flex items-center gap-1 align-middle">
                    <div
                      className="h-2 w-2 rounded"
                      style={{ backgroundColor: colors[index % 4] }}
                    >
                      {''}
                    </div>
                    <div>{cat?.name}</div>
                  </span>
                  <span>{cat?.achived_percent}%</span>
                </div>
              ))}
            </div>
          </WidgetCard>
        </>
      ) : (
        ''
      )}
    </div>
  );
}
