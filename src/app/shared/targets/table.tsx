'use client';

import React, { useCallback, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useTable } from '@/hooks/use-table';
import { useColumn } from '@/hooks/use-column';
import ControlledTable from '@/components/controlled-table';
import { getColumns } from '@/app/shared/targets/columns';
import { useDeleteTarget } from '@/framework/targets';
import { Text } from '@/components/ui/text';
import toast from 'react-hot-toast';
import { useSearchParams } from 'next/navigation';
import { useAllFilter, useUsersByRole } from '@/framework/settings';
const FilterElement = dynamic(
  () => import('@/app/shared/targets/filter-element'),
  { ssr: false }
);
const TableFooter = dynamic(() => import('@/app/shared/table-footer'), {
  ssr: false,
});

export default function TargetsTable({
  permitions,
  text_tr,
  data = [],
  getSelectedColumns,
  getSelectedRowKeys,
  totalItems,
}: {
  permitions?: string[];
  text_tr?:any;
  data: any[];
  getSelectedColumns: React.Dispatch<React.SetStateAction<any[]>>;
  getSelectedRowKeys: React.Dispatch<React.SetStateAction<any[]>>;
  totalItems: number;
}) {
  const { mutate: deleteTarget } = useDeleteTarget();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const [pageSize, setPageSize] = useState(Number(params.get('limit')));
  const { data: allFilters } = useAllFilter();
  const [retailerFilter, setRetailerFilter] = useState([]);
  const [regionFilter, setRegionFilter] = useState([]);
  const [productFilter, setProductFilter] = useState([]);
  const [categoriesFilter, setCategoriesFilter] = useState([]);
  const [brandFilter, setBrandFilter] = useState([]);
  const filterState = {
    store_id: params.get('store_id') || '',
    product_id: params.get('product_id') || '',
    city_id: params.get('city_id') || '',
    retailer_id: params.get('retailer_id') || '',
    date_from: params.get('date_from') || '',
    region: params.get('region') || '',
    date_to: params.get('date_to') || '',
    BG_id: params.get('BG_id') || '',
    VCP_id: params.get('VCP_id') || '',
    BU_id: params.get('BU_id') || '',
    region_id: params.get('region_id') || '',
  };
  useEffect(() => {
    // setUserFilter(allUsers?.data?.map((user : any) => ({
    //     label: user?.name,
    //     value: String(user?.id)
    // })))
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
    // setLevelsFilter(allFilters?.data.levels?.map((level: any) => ({
    //   label: level?.name,
    //   value: String(level?.id),
    //   ...level
    // })))
  }, [allFilters]);
  const onHeaderCellClick = (value: string) => ({
    onClick: () => {
      handleSort(value);
    },
  });

  const handleDelete = (ids: string[]) => {
    const data = ids?.map((id) => Number(id));
    deleteTarget(
      { target_id: data },
      {
        onSuccess: () => {
          toast.success(<Text>Target deleted successfully</Text>);
        },
      }
    );
  };
  const onDeleteItem = useCallback((id: string[]) => {
    handleDelete(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        sortConfig,  permitions,
        checkedItems: selectedRowKeys,
        onHeaderCellClick,
        onDeleteItem,
        onChecked: handleRowSelect,
        handleSelectAll,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      selectedRowKeys,
      onHeaderCellClick,
      sortConfig.key,
      sortConfig.direction,
      onDeleteItem,
      handleRowSelect,
      handleSelectAll,
    ]
  );

  const { visibleColumns, checkedColumns, setCheckedColumns } =
    useColumn(columns);
  useEffect(() => {
    getSelectedColumns(checkedColumns);
    getSelectedRowKeys(selectedRowKeys);
  }, [checkedColumns, selectedRowKeys]);
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
          pageSize: pageSize || 10,
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
          filters,
        }}
        filterElement={
          <FilterElement
            isFiltered={isFiltered}
            filters={filters}
            updateFilter={updateFilter}
            retailerDetails={retailerFilter}
            regionDetails={regionFilter}
            productDetails={productFilter}
            categoriesDetails={categoriesFilter}
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
            {/* <Button size="sm" className="dark:bg-gray-300 dark:text-gray-800">
              Re-send {selectedRowKeys.length}{' '}
              {selectedRowKeys.length > 1 ? 'Roles' : 'Role'}{' '}
            </Button> */}
          </TableFooter>
        }
        className="overflow-hidden rounded-md border border-gray-200 text-sm shadow-sm [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:h-60 [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:justify-center [&_.rc-table-row:last-child_td.rc-table-cell]:border-b-0 [&_thead.rc-table-thead]:border-t-0"
      />
    </>
  );
}
