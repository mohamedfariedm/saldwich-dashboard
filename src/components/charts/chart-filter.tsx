'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { PiFunnel, PiXBold } from 'react-icons/pi';
import { Button } from '@/components/ui/button';
import { ActionIcon } from '@/components/ui/action-icon';
import { Input } from '@/components/ui/input';
import { Title } from '@/components/ui/text';
import cn from '@/utils/class-names';
import { useMedia } from '@/hooks/use-media';
const Drawer = dynamic(
  () => import('@/components/ui/drawer').then((module) => module.Drawer),
  { ssr: false }
);

function FilterDrawerView({
  isOpen,
  drawerTitle,
  hasSearched,
  setOpenDrawer,
  filters,
  children,
}: React.PropsWithChildren<{
  drawerTitle?: string;
  hasSearched?: boolean;
  setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen?: boolean;
  filters?: any;
}>) {
  const { push } = useRouter()
  const pathName = usePathname()
  const searchParams = useSearchParams()
  const handleShowResults = () => {
    const keys = Object.keys(filters)
    const params = new URLSearchParams(searchParams)
    Array.from(params.keys()).forEach(key => {
      if(key.includes('_from') || key.includes('_to')) params.delete(key)
    })
    keys.forEach(key => {
        params.set(key, filters[key])
    })
    push(`${pathName}?${params.toString()}`)
    setOpenDrawer(false)
  }
  return (
    <Drawer
      size="sm"
      isOpen={isOpen ?? false}
      onClose={() => setOpenDrawer(false)}
      overlayClassName="dark:bg-opacity-20 backdrop-blur-md"
      containerClassName="dark:bg-gray-100 overflow-y-scroll"
    >
      <div className="flex h-full flex-col p-5">
        <div className="-mx-5 mb-6 flex items-center justify-between border-b border-gray-200 px-5 pb-4">
          <Title as="h5">{drawerTitle}</Title>
          <ActionIcon
            size="sm"
            rounded="full"
            variant="text"
            title={'Close Filter'}
            onClick={() => setOpenDrawer(false)}
          >
            <PiXBold className="h-4 w-4" />
          </ActionIcon>
        </div>
        <div className="flex-grow">
          <div className="grid grid-cols-1 gap-6 [&_.price-field>span.mr-2]:mb-1.5 [&_.price-field]:flex-col [&_.price-field]:items-start [&_.react-datepicker-wrapper]:w-full [&_.react-datepicker-wrapper_.w-72]:w-full [&_.text-gray-500]:text-gray-700 [&_button.h-9]:h-10 sm:[&_button.h-9]:h-11 [&_label>.h-9]:h-10 sm:[&_label>.h-9]:h-11 [&_label>.w-24.h-9]:w-full">
            {children}
          </div>
        </div>
        <Button
          size="lg"
          onClick={handleShowResults}
          className="mt-5 h-11 w-full text-sm"
        >
          Show Results
        </Button>
      </div>
    </Drawer>
  );
}

export type TableFilterProps = {
  searchTerm: string;
  onSearchClear: () => void;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  columns: { [key: string]: any }[];
  checkedColumns: string[];
  setCheckedColumns: React.Dispatch<React.SetStateAction<string[]>>;
  hideIndex?: number;
  children?: React.ReactNode;
  drawerTitle?: string;
  hasSearched?: boolean;
  showSearchOnTheRight?: boolean;
  enableDrawerFilter?: boolean;
  menu?: React.ReactNode;
  filters?: any
};

export default function TableFilter({
  searchTerm,
  onSearchClear,
  onSearchChange,
  columns,
  checkedColumns,
  setCheckedColumns,
  hideIndex,
  drawerTitle = 'Table Filters',
  hasSearched,
  enableDrawerFilter = false,
  showSearchOnTheRight = true,
  menu,
  filters,
  children,
}: TableFilterProps) {
  const isMediumScreen = useMedia('(max-width: 1860px)', false);
  const [showFilters, setShowFilters] = useState(true);
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <div className="table-filter mb-4 flex items-center justify-between">
      <div className="flex flex-wrap items-center gap-4">

        {showSearchOnTheRight && enableDrawerFilter ? (
          <>{menu ? menu : null}</>
        ) : null}

        {children && (
          <>
            {isMediumScreen || enableDrawerFilter ? (
              <FilterDrawerView
                isOpen={openDrawer}
                setOpenDrawer={setOpenDrawer}
                drawerTitle={drawerTitle}
                hasSearched={hasSearched}
                filters={filters}
              >
                {children}
              </FilterDrawerView>
            ) : (
              <>{showFilters ? children : null}</>
            )}
          </>
        )}
      </div>

      <div className="ms-4 flex flex-shrink-0 items-center">

        {children ? (
          <Button
            {...(isMediumScreen || enableDrawerFilter
              ? {
                  onClick: () => {
                    setOpenDrawer(() => !openDrawer);
                  },
                }
              : { onClick: () => setShowFilters(() => !showFilters) })}
            variant={'outline'}
            className={cn(
              'me-2.5 h-9 pe-3 ps-2.5',
              !(isMediumScreen || enableDrawerFilter) &&
                showFilters &&
                'border-dashed border-gray-700'
            )}
          >
            <PiFunnel className="me-1.5 h-[18px] w-[18px]" strokeWidth={1.7} />
            {!(isMediumScreen || enableDrawerFilter) && showFilters
              ? 'Hide Filters'
              : 'Filters'}
          </Button>
        ) : null}
      </div>
    </div>
  );
}
