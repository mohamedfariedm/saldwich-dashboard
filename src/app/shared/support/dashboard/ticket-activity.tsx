'use client';

import { useCallback, useState } from 'react';
import WidgetCard from '@/components/cards/widget-card';
import { CustomTooltip } from '@/components/charts/custom-tooltip';
import { CustomYAxisTick } from '@/components/charts/custom-yaxis-tick';
import {
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ComposedChart,
  ResponsiveContainer,
  Line,
  LineChart,
} from 'recharts';
import { RoundedTopBarFill } from '@/components/charts/rounded-topbar';
import { useMedia } from '@/hooks/use-media';
import SimpleBar from '@/components/ui/simplebar';
import DropdownAction from '@/components/charts/dropdown-action';
import cn from '@/utils/class-names';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from 'rizzui';
import { BiShow } from 'react-icons/bi';
import { useCurrentPng } from 'recharts-to-png';
import FileSaver from 'file-saver';
import { BsArrowDownCircle } from 'react-icons/bs';




const COLORS = ['#7928ca', '#10b981', '#eab308'];

export default function TicketActivity({
  text,
  viewOption,
  className,
  role,
  name,
  data,
  state,
}: {
  text?: any;
  viewOption: any;
  className?: string;
  role?: number;
  name?: string;
  data: any;
  state?: number;
}) {
  const isTablet = useMedia('(max-width: 1200px)', false);
  const { push } = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  let fathy: any = [];
  const viewOptions = viewOption

  if (!state) {
    data?.map((dist: any, index: number) => {
      fathy.push({
        label: dist.label,
        achived_quentity: Number(dist.achived_quentity),
      });
    });
  } else {
    fathy = data;
  }

  function handleChange(viewType: string) {
    params.set('chart_for', viewType);
    if (role) {
      if (state) {
        push(`${pathName}?${params.toString()}#RSPChart`);
      } else {
        push(`${pathName}?${params.toString()}#SalseChartTracker`);
      }
    } else {
      push(`${pathName}?${params.toString()}`);
    }
  }
  function handleChangeRSP(viewType: string) {
    console.log(viewType);
    
    if (role) {
      if (state) {
        params.set('chart_for_RSP', viewType);
        push(`${pathName}?${params.toString()}#RSPChart`);
      } else {
        params.set('chart_for_traker', viewType);
        push(`${pathName}?${params.toString()}#SalseChartTracker`);
      }
    } else {
      push(`${pathName}?${params.toString()}`);
    }
  }

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
    <WidgetCard
      action={
        <div className="flex items-center justify-between gap-5">
          {role ? (
            <>
              {state ? (
                <DropdownAction
                  options={viewOptions}
                  defaultOption={
                    viewOptions.find(
                      (option: any) =>
                        option?.value == params.get('chart_for_RSP')
                    ) || viewOptions[0]
                  }
                  onChange={handleChangeRSP}
                />
              ) : (
                <DropdownAction
                  options={viewOptions}
                  defaultOption={
                    viewOptions.find(
                      (option: any) =>
                        option?.value == params.get('chart_for_traker')
                    ) || viewOptions[0]
                  }
                  onChange={handleChangeRSP}
                />
              )}

              <div className="flex items-center justify-between">
                <Link
                  href={
                    state
                      ? `/avarage_RSP_chart?chart_for=${
                          params.get('chart_for_RSP') || 'stores'
                        }`
                      : `/sold_qty?chart_for=${
                          params.get('chart_for_traker') || 'stores'
                        }`
                  }
                >
                  <Button
                    variant="outline"
                    className={cn(
                      'w-full @lg:w-auto',
                      'mt-0 w-full text-xs capitalize @lg:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100 sm:text-sm lg:mt-0'
                    )}
                  >
                    <BiShow className="me-1.5 h-[17px] w-[17px]" />
                    {text?.sales_target_chart.view}{' '}
                  </Button>
                </Link>
              </div>
            </>
          ) : (
            <DropdownAction
              options={viewOptions}
              defaultOption={
                viewOptions.find(
                  (option: any) => option?.value == params.get('chart_for')
                ) || viewOptions[0]
              }
              onChange={handleChange}
            />
          )}
          <Button
            onClick={handleDownload}
            variant="outline"
            className={cn(
              'w-full @lg:w-auto',
              'mt-5 w-full text-xs capitalize @lg:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100 sm:text-sm lg:mt-0'
            )}
          >
            <BsArrowDownCircle className="me-1.5 h-[17px] w-[17px]" />
            {text?.sales_target_chart.downloadbtn}
          </Button>
        </div>
      }
      title={
        state
          ? text?.sales_target_chart.titlePage
          :text?.sales_target_chart.titlePage2
      }
      className={`${className}`}
    >
      {/* <div className="mt-1.5 flex flex-wrap items-start gap-3 lg:gap-7">
        {ticketStatus.map((item, index) => (
          <div key={item.name} className="flex items-center gap-1.5">
            <span
              className="h-4 w-4 rounded-[2px]"
              style={{ backgroundColor: COLORS[index] }}
            />
            <span>{item.name}</span>
          </div>
        ))}
      </div> */}
      <SimpleBar>
        <div className="h-96 w-full pt-9">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              ref={ref}
              data={fathy}
              barSize={isTablet ? 18 : 24}
              width={500}
              height={300}
              margin={{
                left: -10,
                right: 10,
              }}
              className="[&_.recharts-tooltip-cursor]:fill-opacity-20 dark:[&_.recharts-tooltip-cursor]:fill-opacity-10 [&_.recharts-cartesian-axis-tick-value]:fill-gray-500 [&_.recharts-cartesian-axis.yAxis]:-translate-y-3 rtl:[&_.recharts-cartesian-axis.yAxis]:-translate-x-12"
            >
              <CartesianGrid
                vertical={false}
                strokeOpacity={0.435}
                strokeDasharray="3 3"
              />
              <XAxis
                dataKey="label"
                axisLine={false}
                tickLine={false}
                padding={{ left: 30, right: 30 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={<CustomYAxisTick />}
              />
              <Tooltip content={<CustomTooltip />} cursor={false} />
              {/* <Bar
                dataKey=""RSP Tracker""
                fill={COLORS[0]}
                barSize={28}
                shape={<RoundedTopBarFill />}
              /> */}
              {/* <Bar
                type="natural"
                dataKey="solved"
                fill={COLORS[1]}
                barSize={28}
                shape={<RoundedTopBarFill />}
              /> */}
              {state ? (
                <Line
                  type="monotone"
                  dataKey="average"
                  stroke={COLORS[2]}
                  dot={false}
                  strokeWidth={2}
                />
              ) : (
                <Line
                  type="monotone"
                  dataKey="achived_quentity"
                  stroke={COLORS[1]}
                  dot={false}
                  strokeWidth={2}
                />
              )}

              {/* <Line
                type="natural"
                dataKey="Stock Tracker"
                stroke={COLORS[2]}
                dot={false}
                strokeWidth={2}
              /> */}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </SimpleBar>
    </WidgetCard>
  );
}
