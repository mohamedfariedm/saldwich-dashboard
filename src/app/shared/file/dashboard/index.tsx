'use client';

import StorageReport from '@/app/shared/file/dashboard/storage-report';
import FileStats from '@/app/shared/file/dashboard/file-stats';
import StorageSummary from '@/app/shared/file/dashboard/storage-summary';
import RecentFiles from '@/app/shared/file/dashboard/recent-files';
import QuickAccess from '@/app/shared/file/dashboard/quick-access';
import ActivityReport from '@/app/shared/file/dashboard/activity-report';
import Members from '@/app/shared/file/dashboard/members';
import FileListTable from '@/app/shared/file/dashboard/file-list/table';
import UpgradeStorage from '@/app/shared/file/dashboard/upgrade-storage';
import RecentActivities from '@/app/shared/file/dashboard/recent-activities';
import { allFilesData } from '@/data/all-files';
import MixBarChart from '../../chart-widgets/mix-bar-chart';
import CustomizedMixChart from '../../chart-widgets/customized-mix-chart';
import { useChartsReport, useOrdersValue } from '@/framework/allcharts';
import { usePathname, useSearchParams } from 'next/navigation';
import Spending from '@/components/charts/spending';
import RadialBarChart from '../../chart-widgets/radial-bar-chart';
import {
  useSalesTargetChartReport,
  useSalesTargetTableReport,
} from '@/framework/sales-target-chart';
import TicketActivity from '../../support/dashboard/ticket-activity';
import MapLocations, {
  locationAtom,
  type Location,
} from '@/components/google-map/mapLocations';
import { useEmployLocation } from '@/framework/settings';
import { useSetAtom } from 'jotai';
import WidgetCard from '@/components/cards/widget-card';
import cn from '@/utils/class-names';
import Link from 'next/link';
import { Button } from 'rizzui';
import { BiShow } from 'react-icons/bi';
import React, { useState } from 'react';
import { useTable } from '@/hooks/use-table';
import { useColumn } from '@/hooks/use-column';
import { getColumns } from '@/app/shared/sales-target-table/columns';
import ControlledTable from '@/components/controlled-table';
import TableFooter from '../../table-footer';
import SalesTargetTable from '../../sales-target-table/table';
import { useChartsReportRSP } from '@/framework/rsp-traker';
import { useChartsReportSalesTraker } from '@/framework/soldqty';
import Spinner from '@/components/ui/spinner';
import * as tr from '@/app/[locale]/dictionaries/index';

export default function FileDashboard({
  params: { locale },
}: {
  params: { locale: any };
}) {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const { data: details, isLoading: isLoadingDetailes } =
    useSalesTargetChartReport('yearly', '');
  const { data: ordersValue } = useOrdersValue();
  const { data: locationData, isLoading: isloadingLocation } =
    useEmployLocation('');
  const { data: retailers, isLoading: retailersIsLoading } = useChartsReport(
    params.get('group_by_Achived') || 'retailers',
    `chart_for=${params.get('chart_for_Achived') || 'stores'}`
  );
  const setLocation = useSetAtom(locationAtom);
  const handlePlaceSelect = (place: Location) => {
    if (locationData) {
      setLocation(place);
    }
  };
  const text = String(locale) == 'ar' ? tr['ar'] : tr['en'];

  const color = [
    {
      target_value_color: '#2563eb',
      actual_value_color: '#60a5fa',
      last_year_achieved_color: '#93c5fd',
    },
    {
      target_value_color: '#4D5656',
      actual_value_color: '#626567',
      last_year_achieved_color: 'B2BABB',
    },
    {
      target_value_color: '#D35400',
      actual_value_color: '#EB984E',
      last_year_achieved_color: '#F5B041',
    },
    {
      target_value_color: '#17202A',
      actual_value_color: '#5D6D7E',
      last_year_achieved_color: '#B2BABB',
    },
    {
      target_value_color: '#4D5656',
      actual_value_color: '#626567',
      last_year_achieved_color: '#626567',
    },
    {
      target_value_color: '#D35400',
      actual_value_color: '#EB984E',
      last_year_achieved_color: '#F5B041',
    },
  ];

  if (!params.get('page')) params.set('page', '1');
  if (!params.get('limit')) params.set('limit', '10');
  if (!params.get('chart_for')) params.set('chart_for', 'stores');
  if (!params.get('chart_for_RSP')) params.set('chart_for_RSP', 'stores');
  if (!params.get('chart_for_traker')) params.set('chart_for_traker', 'stores');
  const type = params.get('chart_type') || 'yearly';
  params.set('chart_type', type);
  const { data, isLoading } = useSalesTargetTableReport(
    type,
    params.toString()
  );
  const viewOptions = [
    {
      value: 'yearly',
      name: text.sales_target_chart.yearly,
    },
    {
      value: 'quarter',
      name: text.sales_target_chart.quarter,
    },
    {
      value: 'monthly',
      name: text.sales_target_chart.monthly,
    },
    {
      value: 'weekly',
      name: text.sales_target_chart.weekly,
    },
  ];

  const viewTypesOptions = [
    {
      value: 'stores',
      name: text.sales_target_chart.stores,
    },
    {
      value: 'promoters',
      name: text.sales_target_chart.promoters,
    },
  ];
  const typeFor = params.get('chart_for_RSP') || 'stores';
  const { data: RSPTracker, isLoading: isLoadingRSPTracker } =
    useChartsReportRSP(params.get('group_by') || 'stores', typeFor, '');
  const { data: salesTracker, isLoading: isloadingSalesTracker } =
    useChartsReportSalesTraker(
      params.get('chart_for_traker') || 'stores',
      params.get('group_by') || 'stores',
      ''
    );

  return (
    <>
      {isloadingSalesTracker &&
      isLoadingRSPTracker &&
      isLoading &&
      isLoadingDetailes &&
      isloadingLocation &&
      retailersIsLoading ? (
        <div className="m-auto">
          <Spinner size="lg" />
        </div>
      ) : (
        <div className="mt-2 @container">
          {/*Total*/}

          <FileStats
            text_tr={text}
            details={ordersValue?.data}
            className="mb-5 2xl:mb-8"
          />
          {/*Achived VS Target retailers */}
          <MixBarChart
            text={text}
            role={0}
            colorkey={color[0]}
            name={params.get('group_by_Achived') || 'retailers'}
            data={retailers?.data?.target_chart}
            className="@container @4xl:col-span-8 @[96.937rem]:col-span-9"
          />
          <div className="mb-6 grid grid-cols-1 gap-6 @4xl:grid-cols-12 2xl:mb-8 2xl:gap-8">
            {/* <StorageReport className="@container @4xl:col-span-8 @[96.937rem]:col-span-9" /> */}
          </div>
          <div className=" grid grid-cols-2 gap-6 @4xl:grid-cols-2 2xl:mb-2 2xl:gap-8">
            {(details?.data?.achieved_target ||
              details?.data?.remaining_target) && (
              <Spending
                role={1}
                achievedTarget={details?.data?.achieved_target}
                remainingTarget={details?.data?.remaining_target}
              />
            )}
            {details?.data?.target_category ? (
              <RadialBarChart
                role={1}
                targetPercent={details?.data?.target_category}
              />
            ) : null}
          </div>
          <div id="RSPChart" className="">
            <TicketActivity
              text={text}
              viewOption={viewTypesOptions}
              state={1}
              data={RSPTracker?.data?.target_chart}
              role={1}
              name={params.get('chart_for_RSP') || 'stores'}
            />
          </div>

          <div id="SalseChartTracker"></div>

          <TicketActivity
            text={text}
            viewOption={viewOptions}
            className="mt-5"
            data={salesTracker?.data?.target_chart}
            role={1}
            name={params.get('chart_for_traker') || 'stores'}
          />

          <div className="pt-5">
            <WidgetCard
              title={text.totalEmployee}
              className={cn('min-h-[28rem]')}
              action={
                <div className="flex items-center justify-between">
                  <Link href={`/employee-places`}>
                    <Button
                      variant="outline"
                      className={cn(
                        'w-full @lg:w-auto',
                        'mt-0 w-full text-xs capitalize @lg:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100 sm:text-sm lg:mt-0'
                      )}
                    >
                      <BiShow className="me-1.5 h-[17px] w-[17px]" />
                      {text.sales_target_chart.view}
                    </Button>
                  </Link>
                </div>
              }
            >
              <div>
                <div className="flex justify-between pt-5">
                  <div className="flex gap-3">
                    <div className="flex items-center gap-1">
                      <div
                        className="h-2 w-2 rounded"
                        style={{ backgroundColor: 'red' }}
                      >
                        {''}
                      </div>
                      <div>
                        {text.employee_places.Promoter}{' '}
                        <span>
                          ( Active :{' '}
                          {locationData?.data?.active_promoters_count} / All :{' '}
                          {locationData?.data?.promoters_count})
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <div
                        className="h-2 w-2 rounded"
                        style={{ backgroundColor: 'blue' }}
                      >
                        {''}
                      </div>
                      <div>
                        {text.employee_places.Marchindaizer}{' '}
                        <span>
                          ( Active :{' '}
                          {locationData?.data?.active_Marchindaizers_count} /
                          All : {locationData?.data?.Marchindaizers_count} )
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <div
                        className="h-2 w-2 rounded"
                        style={{ backgroundColor: 'yellow' }}
                      >
                        {''}
                      </div>
                      <div>
                        {text.employee_places.Supervisor}{' '}
                        <span>
                          ( Active :{' '}
                          {locationData?.data?.active_Supervisors_count} / All :{' '}
                          {locationData?.data?.Supervisors_count} )
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-3 @lg:mt-0"></div>
                </div>
                <MapLocations
                  apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY as string}
                  onPlaceSelect={handlePlaceSelect}
                  className="relative h-[500px] w-full flex-grow rounded-lg bg-gray-50 pt-5"
                  inputProps={{
                    size: 'lg',
                    type: 'text',
                    rounded: 'pill',
                    placeholder: 'Search for a location',
                    className:
                      'absolute z-10 flex-grow block right-7 left-7 top-7',
                    inputClassName: 'bg-white dark:bg-gray-100 border-0',
                  }}
                  mapClassName="rounded-lg"
                  empLocations={locationData?.data?.users || []}
                />
              </div>
            </WidgetCard>
          </div>

          <div className="pt-5">
            <WidgetCard
              title={text?.sales_target_table.title}
              action={
                <div className="flex items-center justify-between">
                  <Link href={`/sales_target_table`}>
                    <Button
                      variant="outline"
                      className={cn(
                        'w-full @lg:w-auto',
                        'mt-0 w-full text-xs capitalize @lg:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100 sm:text-sm lg:mt-0'
                      )}
                    >
                      <BiShow className="me-1.5 h-[17px] w-[17px]" />
                      {text.sales_target_chart.view}
                    </Button>
                  </Link>
                </div>
              }
            >
              <div className="pt-5" id="salesTarget">
                <SalesTargetTable
                  text_tr={text}
                  role={1}
                  data={data?.data?.targets}
                  achieved_target={data?.data?.achieved_target}
                  remaining_target={data?.data?.remaining_target}
                  target_category={data?.data?.target_category}
                  totalItems={data?.data?.total}
                />
              </div>
            </WidgetCard>
          </div>

          <div className="grid grid-cols-1 gap-6 @container lg:grid-cols-12 2xl:gap-8 ">
            <div className="col-span-full flex flex-col gap-6 @5xl:col-span-8 2xl:gap-8 3xl:col-span-9">
              {/* <QuickAccess /> */}
              {/* <RecentFiles /> */}
              {/* <ActivityReport /> */}
              {/* <FileListTable data={allFilesData} /> */}
            </div>

            <div className="col-span-full flex flex-col gap-6 @5xl:col-span-4 2xl:gap-8 3xl:col-span-3">
              {/* <RecentActivities /> */}
              {/* <Members /> */}
              {/* <UpgradeStorage /> */}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
