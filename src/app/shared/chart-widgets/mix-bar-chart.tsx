'use client';

import WidgetCard from '@/components/cards/widget-card';
import { CustomTooltip } from '@/components/charts/custom-tooltip';
import { RoundedTopBarFill } from '@/components/charts/rounded-topbar';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  // Legend,
  ResponsiveContainer,
} from 'recharts';
import cn from '@/utils/class-names';
import { useCallback } from 'react';
import { useMedia } from '@/hooks/use-media';
import DropdownAction from '@/components/charts/dropdown-action';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from 'rizzui';
import { BiShow } from "react-icons/bi";
import { useCurrentPng } from "recharts-to-png";
import FileSaver from 'file-saver';
import { BsArrowDownCircle } from 'react-icons/bs';
import Spinner from '@/components/ui/spinner';





// yearly - weekly - monthly - quarter - daily
export default function MixBarChart({text, className,data,name,colorkey,role,dim }: {dim?:number,text:any, className?: string,data:any,name:string,colorkey:any,role:number }) {
  const isMediumScreen = useMedia('(max-width: 1200px)', false);
  const { push } = useRouter()
  const pathName = usePathname()
  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams)



  function handleChange(viewType: string) {
    params.set('group_by',viewType)
    push(`${pathName}?${params.toString()}`)
  }
  function handleChangeType(viewType: string) {
    params.set('chart_for',viewType)
    push(`${pathName}?${params.toString()}`)
  }
  function handleChangeForDashbord(viewType: string) {
    params.set('group_by_Achived',viewType)
    push(`${pathName}?${params.toString()}`)
  }
  function handleChangeTypeForDashbord(viewType: string) {
    params.set('chart_for_Achived',viewType)
    push(`${pathName}?${params.toString()}`)
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
    name: text.sales_target_chart.weekly
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
  return<>
    <WidgetCard
    
    action={
      <div className="flex items-center justify-between gap-5">

{role?

dim==5?
<>
                <DropdownAction dim={dim} options={viewTypesOptions} defaultOption={viewTypesOptions.find((option: any) => option?.value == params.get('chart_for')) || viewTypesOptions[1]} onChange={handleChangeType} />
                <DropdownAction options={viewOptions} defaultOption={viewOptions.find((option: any) => option?.value == params.get('group_by')) || viewOptions[2]} onChange={handleChange} />
                </>:
                <>
                <DropdownAction options={viewTypesOptions} defaultOption={viewTypesOptions.find((option: any) => option?.value == params.get('chart_for')) || viewTypesOptions[0]} onChange={handleChangeType} />
                <DropdownAction options={viewOptions} defaultOption={viewOptions.find((option: any) => option?.value == params.get('group_by')) || viewOptions[0]} onChange={handleChange} />
                </>

:     <>    
       <DropdownAction options={viewTypesOptions} defaultOption={viewTypesOptions.find((option: any) => option?.value == params.get('chart_for_Achived')) || viewTypesOptions[0]} onChange={handleChangeTypeForDashbord} />
      <DropdownAction options={viewOptions} defaultOption={viewOptions.find((option: any) => option?.value == params.get('group_by_Achived')) || viewOptions[0]} onChange={handleChangeForDashbord} />
      </>
}


        {role?  "":      <div className='flex items-center justify-between'>
            <Link href={`/target_chart_dashboard?group_by=${params.get("group_by")||"retailers"}`}>
            <Button
      variant="outline"
      className={cn('w-full @lg:w-auto', "mt-0 w-full text-xs capitalize @lg:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100 sm:text-sm lg:mt-0")}
    >
      <BiShow className="me-1.5 h-[17px] w-[17px]" />
      {text?.target_chart_dashboard?.view}
    </Button>
              </Link>

        </div>}
        <Button
              onClick={handleDownload}
      variant="outline"
      className={cn('w-full @lg:w-auto', "mt-0 w-full text-xs capitalize @lg:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100 sm:text-sm lg:mt-0")}
    >
      <BsArrowDownCircle className="me-1.5 h-[17px] w-[17px]" />
      {text?.target_chart_dashboard?.downloadbtn}
    </Button>

</div>
}
    title={`${ text?.target_chart_dashboard?.subtitle}`} className={className}
    
    
    >
<Legend text_tran={text} className="mt-2 flex @2xl:hidden @3xl:flex @5xl:hidden" />


      <div className="h-96 w-full pt-9">
        <ResponsiveContainer width="100%" >
          <BarChart
            id="currentChart"
            ref={ref}
            // ref={(chart:any) => (this.currentChart = chart)}
            // width={this.state.width}
            // height={this.state.height}
            data={data}
            barSize={isMediumScreen ? 18 : 24}
            margin={{
              left: -10,
              right:10,
            }}
            
            className="[&_.recharts-cartesian-grid-vertical]:opacity-0 "
          >

            <CartesianGrid strokeDasharray="3 3" />
            <XAxis tickLine={false} dataKey="label" />
            <YAxis tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="target_value"   fill={`${colorkey.target_value_color}`} shape={<RoundedTopBarFill />} />
            <Bar dataKey="actual_value" fill={`${colorkey.actual_value_color}`} shape={<RoundedTopBarFill />} />
            <Bar dataKey="last_year_achieved" fill={`${colorkey.last_year_achieved_color}`} shape={<RoundedTopBarFill />}  />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </WidgetCard>
  
  
  </> 

  ;
}



function Legend({text_tran, className }: {text_tran:any, className?: string }) {
  return (
    <div className={cn('flex-wrap items-start gap-3 lg:gap-4', className)}>
      <span className="flex items-center gap-1.5">
        <span
          className="h-2.5 w-2.5 rounded-full"
          style={{
            background: `linear-gradient(180deg, #A5BDEC 0%, #477DFF 53.65%)`,
          }}
        />
        <span>{text_tran?.target_chart_dashboard?.sales}</span>
      </span>
      {/* <span className="flex items-center gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#F5A623]" />
        <span>Expense</span>
      </span> */}
    </div>
  );
}
