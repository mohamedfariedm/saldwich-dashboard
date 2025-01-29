import { useState, useEffect } from 'react';
import isString from 'lodash/isString';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

interface AnyObject {
  [key: string]: any;
}

export function useTable<T extends AnyObject>(
  initialData: T[],
  countPerPage: number,
  initialFilterState?: Partial<Record<string, any>>,
  role?: number
) {
  const [data, setData] = useState(initialData);
  /*
   * Dummy loading state.
   */
  const [isLoading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathName = usePathname();
  const { push } = useRouter();
  const [currentPage, setCurrentPage] = useState(
    Number(params.get('page')) || 1
  );

  useEffect(() => {
    setLoading(false);
  }, []);

  /*
   * Handle row selection
   */
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const handleRowSelect = (recordKey: string) => {
    const selectedKeys = [...selectedRowKeys];
    if (selectedKeys.includes(recordKey)) {
      setSelectedRowKeys(selectedKeys.filter((key) => key !== recordKey));
    } else {
      setSelectedRowKeys([...selectedKeys, recordKey]);
    }
  };
  const handleSelectAll = () => {
    if (selectedRowKeys.length === initialData.length) {
      setSelectedRowKeys([]);
    } else {
      setSelectedRowKeys(initialData.map((record) => record.id));
    }
  };

  useEffect(() => {
    if (Number(params.get('limit')) !== countPerPage && countPerPage > 0) {
      params.set('limit', String(countPerPage));
      console.log(params.get('limit'));

      // setSelectedRowKeys([]);

      if (role) {
        push(`${pathName}?${params.toString()}#salesTarget`);
      } else {
        push(`${pathName}?${params.toString()}`);
      }
    }
  }, [params, initialData]);

  /*
   * Handle sorting
   */
  const [sortConfig, setSortConfig] = useState<AnyObject>({
    key: null,
    direction: null,
  });

  function sortData(data: T[], sortKey: string, sortDirection: string) {
    return [...data].sort((a, b) => {
      const aValue = a[sortKey];
      const bValue = b[sortKey];

      if (aValue < bValue) {
        return sortDirection === 'asc' ? -1 : 1;
      } else if (aValue > bValue) {
        return sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }

  // const sortedData = useMemo(() => {
  //   let newData = data;
  //   if (!sortConfig.key) {
  //     return newData;
  //   }
  //   return sortData(newData, sortConfig.key, sortConfig.direction);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [sortConfig, data]);
  const sortedData = !sortConfig.key
    ? initialData
    : sortData(initialData, sortConfig.key, sortConfig.direction);

  function handleSort(key: string) {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  }

  /*
   * Handle pagination
   */
  // function paginatedData(data: T[] = sortedData) {
  //   const start = (currentPage - 1) * countPerPage;
  //   const end = start + countPerPage;

  //   if (data?.length > start) return data.slice(start, end);
  //   return data;
  // }

  function handlePaginate(pageNumber: number) {
    setCurrentPage(pageNumber);
    params.set('page', String(pageNumber));
    setSelectedRowKeys([]);
    if (role) {
      push(`${pathName}?${params.toString()}#salesTarget`);
    } else {
      push(`${pathName}?${params.toString()}`);
    }
  }

  /*
   * Handle delete
   */
  function handleDelete(id: string | string[]) {
    const updatedData = Array.isArray(id)
      ? data.filter((item) => !id.includes(item.id))
      : data.filter((item) => item.id !== id);

    setData(updatedData);
  }

  /*
   * Handle Filters and searching
   */
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<Record<string, any>>(
    initialFilterState ?? {}
  );

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

  function applyFilters() {
    const searchTermLower = searchTerm.toLowerCase();

    return sortedData?.length
      ? sortedData?.filter((item) =>
          Object.values(item).some((value) =>
            typeof value === 'object'
              ? value &&
                Object.values(value).some(
                  (nestedItem) =>
                    nestedItem &&
                    String(nestedItem).toLowerCase().includes(searchTermLower)
                )
              : value && String(value).toLowerCase().includes(searchTermLower)
          )
        )
      : [];
  }

  /*
   * Handle searching
   */
  function handleSearch(searchValue: string) {
    setSearchTerm(searchValue);
  }

  function searchedData() {
    if (!searchTerm) return sortedData;

    const searchTermLower = searchTerm.toLowerCase();

    return sortedData.filter((item) =>
      Object.values(item).some((value) =>
        typeof value === 'object'
          ? value &&
            Object.values(value).some(
              (nestedItem) =>
                nestedItem &&
                String(nestedItem).toLowerCase().includes(searchTermLower)
            )
          : value && String(value).toLowerCase().includes(searchTermLower)
      )
    );
  }

  /*
   * Reset search and filters
   */
  function handleReset() {
    setData(() => initialData);
    handleSearch('');
    if (initialFilterState) return setFilters(initialFilterState);
  }

  /*
   * Set isFiltered and final filtered data
   */
  const isFiltered = applyFilters().length > 0;
  function calculateTotalItems() {
    if (isFiltered) {
      params.set('page', '1');
      return applyFilters().length;
    }
    if (searchTerm) {
      return searchedData().length;
    }
    return sortedData?.length;
  }
  const filteredAndSearchedData = isFiltered ? applyFilters() : searchedData();
  // const tableData = paginatedData(filteredAndSearchedData);
  const tableData = filteredAndSearchedData;

  /*
   * Go to first page when data is filtered and searched
   */
  // useEffect(() => {
  //   handlePaginate(1);
  // }, [isFiltered, searchTerm]);

  // useTable returns
  return {
    isLoading,
    isFiltered,
    tableData,
    // pagination
    currentPage,
    handlePaginate,
    totalItems: calculateTotalItems(),
    // sorting
    sortConfig,
    handleSort,
    // row selection
    selectedRowKeys,
    setSelectedRowKeys,
    handleRowSelect,
    handleSelectAll,
    // searching
    searchTerm,
    handleSearch,
    // filters
    filters,
    updateFilter,
    applyFilters,
    handleDelete,
    handleReset,
  };
}
