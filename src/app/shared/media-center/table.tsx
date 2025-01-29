'use client';

import { getColumns } from '@/app/shared/media-center/columns';
import ControlledTable from '@/components/controlled-table';
import { Text } from '@/components/ui/text';
import { useDeleteMedia } from '@/framework/media-center';
import { useColumn } from '@/hooks/use-column';
import { useTable } from '@/hooks/use-table';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const TableFooter = dynamic(() => import('@/app/shared/table-footer'), {
  ssr: false,
});

export default function BrandTable({
  text_tr,
  data = [],
  getSelectedColumns,
  getSelectedRowKeys,
  totalItems,
  permitions,
  locale,
}: {
  text_tr?: any;
  permitions?: string[];
  data: any[];
  getSelectedColumns: React.Dispatch<React.SetStateAction<any[]>>;
  getSelectedRowKeys: React.Dispatch<React.SetStateAction<any[]>>;
  totalItems: number;
  locale: string;
}) {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const [pageSize, setPageSize] = useState(Number(params.get('limit')));
  const { mutate: deleteBrand } = useDeleteMedia();
  const onHeaderCellClick = (value: string) => ({
    onClick: () => {
      handleSort(value);
    },
  });
  console.log(data);

  const handleDelete = (ids: string[]) => {
    const data = ids?.map((id) => Number(id));
    deleteBrand(
      { brand_id: data },
      {
        onSuccess: () => {
          toast.success(
            <Text>
              Partner deleted successfully
              <Text as="b" className="font-semibold">
                Success
              </Text>
            </Text>
          );
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
  } = useTable(data, pageSize);

  const columns = React.useMemo(
    () =>
      getColumns({
        data,
        text_tr,
        permitions,
        sortConfig,
        checkedItems: selectedRowKeys,
        onHeaderCellClick,
        onDeleteItem,
        onChecked: handleRowSelect,
        handleSelectAll,
        locale,
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
        }}
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
    </>
  );
}
