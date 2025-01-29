'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useTable } from '@/hooks/use-table';
import { useColumn } from '@/hooks/use-column';
import ControlledTable from '@/components/controlled-table';
import { useSearchParams } from 'next/navigation';
import { getColumns } from '@/app/shared/benchmark/columns';
import { useUsersByRole, useAllFilter } from '@/framework/settings';
const FilterElement = dynamic(
  () => import('@/app/shared/benchmark/filter-element'),
  { ssr: false }
);
const TableFooter = dynamic(() => import('@/app/shared/table-footer'), {
  ssr: false,
});



export default function BenchmarkTable({text_tr, data = [], setSelectedColumns, getSelectedRowKeys,totalItems }: {text_tr?:any ,data: any[], setSelectedColumns: React.Dispatch<React.SetStateAction<any[]>>, getSelectedRowKeys: React.Dispatch<React.SetStateAction<any[]>>, totalItems: number }) {
  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams)
  const [pageSize, setPageSize] = useState(Number(params.get('limit')));
  const { data: allUsers } = useUsersByRole(['Supervisor', 'Marchindaizer']);
  const { data: allFilters } = useAllFilter()
  const [userFilter, setUserFilter] = useState([])
//   const [storeFilter, setStoreFilter] = useState([])
  const [retailerFilter, setRetailerFilter] = useState([])
//   const [regionFilter, setRegionFilter] = useState([])
  const [productFilter, setProductFilter] = useState([])
  const [brandFilter, setBrandFilter] = useState([])
  const [categoriesFilter, setCategoriesFilter] = useState([])
  console.log(data);
  
  const filterState = {
    filter_user: params.get('filter_user') || '',
    search_model: params.get('search_model') || '',
    filter_store: params.get('filter_store') || '',
    // filter_city: params.get('filter_city') || '',
    filter_retailer: params.get('filter_retailer') || '',
    // filter_region: params.get('filter_region') || '',
    // date_to: params.get('date_to') || '',
    filter_brand: params.get('filter_brand') || '',
    filter_category: params.get('filter_category') || '',
    filter_sub_category: params.get('filter_sub_category') || '',
    filter_sub_sub_category: params.get('filter_sub_sub_category') || '',
    offerDateFrom_from: params.get('offerDateFrom_from') || '',
    offerDateFrom_to: params.get('offerDateFrom_to') || '',
    offerDateTo_from: params.get('offerDateTo_from') || '',
    offerDateTo_to: params.get('offerDateTo_to') || '',
  };
  useEffect(() => {
    setUserFilter(allUsers?.data?.map((user : any) => ({
        label: user?.name,
        value: String(user?.id)
    })))
    // setRegionFilter(allFilters?.data.regions?.map((region: any) => ({
    //   label: region?.name,
    //   value: String(region?.id),
    //   city: region?.cities
    // })))
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
    // setLevelsFilter(allFilters?.data.levels?.map((level: any) => ({
    //   label: level?.name,
    //   value: String(level?.id),
    //   ...level
    // })))
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
    // handleDelete,
    handleReset,
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
            // storeDetails={storeFilter}
            retailerDetails={retailerFilter}
            // regionDetails={regionFilter}
            productDetails={productFilter}
            brandDetails={brandFilter}
            categoriesDetails={categoriesFilter}
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
