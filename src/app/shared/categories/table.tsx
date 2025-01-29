// 'use client';

// import React, { useCallback, useState } from 'react';
// import dynamic from 'next/dynamic';
// import { useTable } from '@/hooks/use-table';
// import { useColumn } from '@/hooks/use-column';
// import { Button } from '@/components/ui/button';
// import ControlledTable from '@/components/controlled-table';
// import { getColumns } from '@/app/shared/categories/columns';
// import { PiCaretDownBold, PiCaretUpBold } from 'react-icons/pi';
// import { ActionIcon } from '@/components/ui/action-icon';
// import { useDeleteCategory } from '@/framework/categories';
// import ExpandedOrderRow from '@/app/shared/ecommerce/order/order-list/expanded-row';
// import { Text } from '@/components/ui/text';
// import toast from 'react-hot-toast';
// const FilterElement = dynamic(
//   () => import('@/app/shared/invoice/invoice-list/filter-element'),
//   { ssr: false }
// );
// const TableFooter = dynamic(() => import('@/app/shared/table-footer'), {
//   ssr: false,
// });

// function CustomExpandIcon(props: any) {
//   return (
//     <ActionIcon
//       size="sm"
//       variant="outline"
//       rounded="full"
//       className="expand-row-icon mx-2"
//       onClick={(e) => {
//         props.onExpand(props.record, e);
//       }}
//     >
//       {props.expanded ? (
//         <PiCaretUpBold className="h-3.5 w-3.5" />
//       ) : (
//         <PiCaretDownBold className="h-3.5 w-3.5" />
//       )}
//     </ActionIcon>
//   );
// }

// const filterState = {
//   amount: ['', ''],
//   createdAt: [null, null],
//   dueDate: [null, null],
//   status: '',
// };

// export default function CategoriesTable({ data = [] }: { data: any[] }) {
//   const [pageSize, setPageSize] = useState(10);
//   const { mutate: deleteCategory } = useDeleteCategory();
//   const onHeaderCellClick = (value: string) => ({
//     onClick: () => {
//       handleSort(value);
//     },
//   });

//   const handleDelete = (ids: string[]) => {
//     const data = ids?.map(id => Number(id))
//     deleteCategory({category_id: data}, {
//       onSuccess: () => {
//         toast.success(
//           <Text>
//             Category deleted successfully
//           </Text>
//         );
//       }
//     })
//   }
//   const onDeleteItem = useCallback((id: string[]) => {
//     handleDelete(id);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const {
//     isLoading,
//     isFiltered,
//     tableData,
//     currentPage,
//     totalItems,
//     handlePaginate,
//     filters,
//     updateFilter,
//     searchTerm,
//     handleSearch,
//     sortConfig,
//     handleSort,
//     selectedRowKeys,
//     setSelectedRowKeys,
//     handleRowSelect,
//     handleSelectAll,
//     // handleDelete,
//     handleReset,
//   } = useTable(data, pageSize, filterState);

//   const columns = React.useMemo(
//     () =>
//       getColumns({
//         data,
//         sortConfig,
//         checkedItems: selectedRowKeys,
//         onHeaderCellClick,
//         onDeleteItem,
//         onChecked: handleRowSelect,
//         handleSelectAll,
//       }),
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     [
//       selectedRowKeys,
//       onHeaderCellClick,
//       sortConfig.key,
//       sortConfig.direction,
//       onDeleteItem,
//       handleRowSelect,
//       handleSelectAll,
//     ]
//   );
//   const { visibleColumns, checkedColumns, setCheckedColumns } =
//     useColumn(columns);

//   return (
//     <>
//       <ControlledTable
//         variant="modern"
//         data={tableData}
//         isLoading={isLoading}
//         showLoadingText={true}
//         // @ts-ignore
//         columns={visibleColumns}
//         expandable={{
//           onExpand(expanded, record) {
//             // console.log('onExpand', expanded, record);
//           },
//           onExpandedRowsChange(expandedKeys) {
//             // console.log('Expanded Keys:', expandedKeys)
//           },
//           expandIcon: CustomExpandIcon
//         }}
//         paginatorOptions={{
//           pageSize,
//           setPageSize,
//           total: totalItems,
//           current: currentPage,
//           onChange: (page: number) => handlePaginate(page),
//         }}
//         filterOptions={{
//           searchTerm,
//           onSearchClear: () => {
//             handleSearch('');
//           },
//           onSearchChange: (event) => {
//             handleSearch(event.target.value);
//           },
//           hasSearched: isFiltered,
//           columns,
//           checkedColumns,
//           setCheckedColumns,
//         }}
//         filterElement={
//           <FilterElement
//             isFiltered={isFiltered}
//             filters={filters}
//             updateFilter={updateFilter}
//             handleReset={handleReset}
//           />
//         }
//         tableFooter={
//           <TableFooter
//             checkedItems={selectedRowKeys}
//             handleDelete={(ids: string[]) => {
//               setSelectedRowKeys([]);
//               handleDelete(ids);
//             }}
//           >
//             {/* <Button size="sm" className="dark:bg-gray-300 dark:text-gray-800">
//               Re-send {selectedRowKeys.length}{' '}
//               {selectedRowKeys.length > 1 ? 'Roles' : 'Role'}{' '}
//             </Button> */}
//           </TableFooter>
//         }
//         className="overflow-hidden rounded-md border border-gray-200 text-sm shadow-sm [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:h-60 [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:justify-center [&_.rc-table-row:last-child_td.rc-table-cell]:border-b-0 [&_thead.rc-table-thead]:border-t-0"
//       />
//     </>
//   );
// }
