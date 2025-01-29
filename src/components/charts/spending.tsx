'use client';

import WidgetCard from '@/components/cards/widget-card';
// import TrendingUpIcon from '@/components/icons/trending-up';
// import { DatePicker } from '@/components/ui/datepicker';
// import { Title } from '@/components/ui/text';
import cn from '@/utils/class-names';
import Link from 'next/link';
import { useCallback, useState } from 'react';
import { BiShow } from 'react-icons/bi';
import { PieChart, Pie, Cell, ResponsiveContainer, Sector } from 'recharts';
import { Button } from 'rizzui';

// const data = [
//   { name: 'Total used storage', value: 27 },
//   { name: 'Available storage', value: 23 },
//   { name: 'Total used storage', value: 30 },
//   { name: 'Total used storage', value: 20 },
// ];
const COLORS = ['#6741D9', '#E0C6FD', '#FFBC75', '#FF7272'];

const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, midAngle } =
    props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius - 100) * cos;
  const sy = cy + (outerRadius - 100) * sin;
  return (
    <Sector
      cx={sx}
      cy={sy}
      cornerRadius={5}
      innerRadius={50}
      outerRadius={120}
      startAngle={startAngle}
      endAngle={endAngle}
      fill={props.fill}
    />
  );
};

export default function Spending({role, className, achievedTarget, remainingTarget }: {role?:number, className?: string, achievedTarget: number, remainingTarget: number }) {
  const [activeIndex, setActiveIndex] = useState(1);
//   const [startDate, setStartDate] = useState<Date>(new Date());
const data = [
    {
    name: 'Remaining Target',
    value: remainingTarget
    },
    {
    name: 'Achieved Target',
    value: achievedTarget
    }]
  const [chartData] = useState(data);

  const onMouseOver = useCallback((_: any, index: number) => {
    setActiveIndex(index);
  }, []);
  const onMouseLeave = useCallback(() => {
    setActiveIndex(0);
  }, []);

  return (
    <WidgetCard
      title="Target Statics"
      titleClassName="text-base font-semibold sm:text-lg"
      headerClassName="items-center"
      className={cn('@container', className)}
      action={
        <div className="flex items-center justify-between gap-5">
          {role?     <div className='flex items-center justify-between'>
              <Link href={`/sales_target_chart`}>
              <Button
        variant="outline"
        className={cn('w-full @lg:w-auto', "mt-0 w-full text-xs capitalize @lg:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100 sm:text-sm lg:mt-0")}
      >
        <BiShow className="me-1.5 h-[17px] w-[17px]" />
        View Details
      </Button>
                </Link>
          </div>:  ""}
  
  </div>
  }
    >
     
      <div className="flex flex-col gap-6">
        <div className="relative h-[300px] w-full after:absolute after:inset-1/2 after:h-24 after:w-24 after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-full after:border after:border-dashed after:border-gray-300 @sm:py-3">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart className="[&_.recharts-layer:focus]:outline-none [&_.recharts-sector:focus]:outline-none dark:[&_.recharts-text.recharts-label]:first-of-type:fill-white">
              <Pie
                activeIndex={activeIndex}
                data={chartData}
                cornerRadius={5}
                innerRadius={70}
                outerRadius={120}
                paddingAngle={6}
                stroke="rgba(0,0,0,0)"
                dataKey="value"
                activeShape={renderActiveShape}
                onMouseOver={onMouseOver}
                onMouseLeave={onMouseLeave}
              >
                {data.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className=" flex-col content-center items-center">
          <Detail color={COLORS[0]} value={remainingTarget} text="Remaining Target" />
          <br/>
          <Detail color={COLORS[1]} value={achievedTarget} text="Achieved Target" />

        </div>
      </div>
    </WidgetCard>
  );
}

function Detail({
  color,
  value,
  text,
}: {
  color: string;
  value: number;
  text: string;
}) {
  return (
    <div className="flex justify-between gap-2">
      <div className=" col-span-3 flex items-center justify-start gap-1.5">
        <span
          style={{ background: color }}
          className="block h-2.5 w-2.5 rounded"
        />
        <p className="text-gray-500">{text}</p>
      </div>
      <span
        style={{ borderColor: color }}
        className="rounded-full border-2 px-2 py-0.5 font-bold text-gray-700"
      >
        {value}%
      </span>
    </div>
  );
}
