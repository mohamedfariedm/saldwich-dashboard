'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useTable } from '@/hooks/use-table';
import { useColumn } from '@/hooks/use-column';
import { useSearchParams } from 'next/navigation';
import ControlledTable from '@/components/controlled-table';
import { getColumns } from '@/app/shared/Sampling_report/columns';
import { useAllActiveUsers, useAllFilter, useUsersByRole } from '@/framework/settings';
const FilterElement = dynamic(
  () => import('@/app/shared/Sampling_report/filter-element'),
  { ssr: false }
);
const TableFooter = dynamic(() => import('@/app/shared/table-footer'), {
  ssr: false,
});




export default function SamplingModelTable({text_tr, data = [],totalItems, setSelectedColumns, getSelectedRowKeys }: {text_tr?:any, data: any[],totalItems: number, setSelectedColumns: React.Dispatch<React.SetStateAction<any[]>>, getSelectedRowKeys: React.Dispatch<React.SetStateAction<any[]>> }) {
  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams)
  const [pageSize, setPageSize] = useState(Number(params.get('limit')));
  const { data: allUsers } = useUsersByRole(["Marchindaizer","Supervisor"]);
  const { data: allFilters } = useAllFilter()
  const [userFilter, setUserFilter] = useState([])
  const [retailerFilter, setRetailerFilter] = useState([])
  const [regionFilter, setRegionFilter] = useState([])
  const [storeFilter, setStoreFilter] = useState([])
  const [brandFilter, setBrandFilter] = useState([])
  const filterState = {
    filter_user: params.get('filter_user') || '',
    filter_store: params.get('filter_store') || '',
    filter_brand: params.get('filter_brand') || '',
    filter_city: params.get('filter_city') || '',
    filter_retailer: params.get('filter_retailer') || '',
    samplingDateFrom_from: params.get('samplingDateFrom_from') || '',
    samplingDateFrom_to: params.get('samplingDateFrom_to') || '',
    samplingDateTo_from: params.get('samplingDateTo_from') || '',
    samplingDateTo_to: params.get('samplingDateTo_to') || '',
    in_store_promotion_date_from: params.get('in_store_promotion_date_from') || '',
    in_store_promotion_date_to: params.get('in_store_promotion_date_to') || '',
    filter_region: params.get('filter_region') || '',
  };
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
    setBrandFilter(allFilters?.data.brands?.map((brand: any) => ({
        label: brand?.name,
        value: String(brand?.id)
    })))
  }, [allFilters, allUsers])


  const onHeaderCellClick = (value: string) => ({
    onClick: () => {
      handleSort(value);
    },
  });

  const handleDelete = (ids: string[]) => {}
  

  const {
    isLoading,
    isFiltered,
    tableData,
    currentPage,
    // totalItems,
    handlePaginate,
    filters,
    updateFilter,
    searchTerm,
    handleSearch,
    sortConfig,
    handleSort,
    selectedRowKeys,
    setSelectedRowKeys,
    handleRowSelect,
    handleSelectAll,
  } = useTable(data, pageSize, filterState);
  const columns = React.useMemo(
    () =>
      getColumns({
        data,
        text_tr,
        sortConfig,
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

  const { visibleColumns, checkedColumns, setCheckedColumns } =
    useColumn(columns);

  useEffect(() => {
    setSelectedColumns(checkedColumns)
    getSelectedRowKeys(selectedRowKeys)
  }, [checkedColumns, selectedRowKeys])

  return (
    <>
      <ControlledTable
        variant="modern"
        data={tableData}
        isLoading={isLoading}
        showLoadingText={true}
        // @ts-ignore
        columns={visibleColumns}
        paginatorOptions={{
          pageSize : pageSize || 10,
          setPageSize,
          total: totalItems,
          current: currentPage,
          onChange: (page: number) => handlePaginate(page),
        }}
        filterOptions={{
          searchTerm,
          text_tr,
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
          filters
        }}
        filterElement={
          <FilterElement
            isFiltered={isFiltered}
            filters={filters}
            updateFilter={updateFilter}
            userDetails={userFilter}
            retailerDetails={retailerFilter}
            regionDetails={regionFilter}
            brandDetails={brandFilter}
          />
        }
        tableFooter={
          <TableFooter
            checkedItems={selectedRowKeys}
            handleDelete={(ids: string[]) => {
              setSelectedRowKeys([]);
              handleDelete(ids);
            }}
          >
          </TableFooter>
        }
        className="overflow-hidden rounded-md border border-gray-200 text-sm shadow-sm [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:h-60 [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:justify-center [&_.rc-table-row:last-child_td.rc-table-cell]:border-b-0 [&_thead.rc-table-thead]:border-t-0"
      />
    </>
  );
}
