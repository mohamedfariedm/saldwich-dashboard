'use client';

import cn from '@/utils/class-names';
import { Button } from '@/components/ui/button';
import { Title, Text } from '@/components/ui/text';
import { useScrollableSlider } from '@/hooks/use-scrollable-slider';
import { PiCaretLeftBold, PiCaretRightBold, PiUserGearDuotone } from 'react-icons/pi';
import MetricCard from '@/components/cards/metric-card';
import CircleProgressBar from '@/components/charts/circle-progressbar';
import TrendingUpIcon from '@/components/icons/trending-up';
import TrendingDownIcon from '@/components/icons/trending-down';
import TagIcon from '@/components/icons/tag';
import TagIcon2 from '@/components/icons/tag-2';
import TagIcon3 from '@/components/icons/tag-3';
import { FaUserShield } from "react-icons/fa";
import { FaUserSecret } from "react-icons/fa";
import { TbUserShield } from 'react-icons/tb';
import { RiUserStarLine } from 'react-icons/ri';

type FileStatsType = {
  className?: string;
  details?:any;
  text_tr?:any
};



export function FileStatGrid({ className,details,text }: {text?:any, className?: string,details?:any }) {

console.log(details);



  let arr1= [
    {
      id: 1,
      title: text.total,
      metric: `${(details?.achived_value||"0")} SAR`,
      fill: '#3872FA',
      percentage: `${(((100*Number(details?.achived_value))/Number(details?.tgt_value||0)).toFixed(2))||0}`,

    },
    {
      id: 2,
      title: text.totalsales,
      metric: `${(details?.achived_quentity||"0")}`,
      fill: '#3872FA',
      percentage: `${((100*Number(details?.achived_quentity||0))/Number(details?.tgt_quentity||0)).toFixed(2)||0}`,
    },
    {
      id: 3,
      icon: <TagIcon className="h-full w-full" />,
      title:text.totalstock,
      metric: `${details?.total_SOH||"0"}`,
    },
    {
      id: 4,
      icon: <FaUserShield className="h-full w-full" />,
      title: text.totaladmin,
      metric: `${details?.total_admins||"0"}`,
    },
    {
      id: 5,
      icon: <PiUserGearDuotone className="h-full w-full" />,
      title: text.totalmarch,
      metric: `${details?.total_marchindaizers||"0"}`,
    },
    {
      id: 6,
      icon: <TbUserShield className="h-full w-full" />,
      title: text.totalpro,
      metric: `${details?.total_promoters||"0"}`,
    },
    {
      id: 7,
      icon: <RiUserStarLine className="h-full w-full" />,
      title: text.totalsup,
      metric: `${details?.total_supervisors||"0"}`,
    },
  ];
  let arr2= [
    {
      id: 1,
      title: text.total,
      metric: `${(details?.achived_value||"0")} SAR`,
      fill: '#3872FA',
      percentage: `${0}`,

    },
    {
      id: 2,
      title: text.totalsales,
      metric: `${(details?.achived_quentity||"0")}`,
      fill: '#3872FA',
      percentage: `${0}`,
    },
    {
      id: 3,
      icon: <TagIcon className="h-full w-full" />,
      title:text.totalstock,
      metric: `${details?.total_SOH||"0"}`,
    },
    {
      id: 4,
      icon: <FaUserShield className="h-full w-full" />,
      title: text.totaladmin,
      metric: `${details?.total_admins||"0"}`,
    },
    {
      id: 5,
      icon: <PiUserGearDuotone className="h-full w-full" />,
      title: text.totalmarch,
      metric: `${details?.total_marchindaizers||"0"}`,
    },
    {
      id: 6,
      icon: <TbUserShield className="h-full w-full" />,
      title: text.totalpro,
      metric: `${details?.total_promoters||"0"}`,
    },
    {
      id: 7,
      icon: <RiUserStarLine className="h-full w-full" />,
      title: text.totalsup,
      metric: `${details?.total_supervisors||"0"}`,
    },
  ];

  let filesStatData=[] 
  if (details?.achived_quentity) {
    filesStatData=arr1
  }else{
    filesStatData=arr2
  }

  return (
    <>
      {filesStatData.map((stat: any) => {
        return (
          <MetricCard
            key={stat.id}
            title={stat.title}
            metric={stat.metric}
            icon={stat.icon}
            metricClassName="3xl:text-[22px]"
            className={cn('w-full max-w-full justify-between mb-3', className)}
            chart={stat.percentage?
              <CircleProgressBar
                percentage={stat.percentage}
                size={80}
                stroke="#D7E3FE"
                strokeWidth={7}
                progressColor={stat.fill}
                useParentResponsive={true}
                label={
                  <Text
                    as="span"
                    className="font-lexend text-base font-medium text-gray-700"
                  >
                    {stat.percentage}%
                  </Text>
                }
                strokeClassName="dark:stroke-gray-300"
              />
            :""}
          >
            <Text className="mt-3 flex items-center leading-none text-gray-500">
              <Text
                as="span"
                className={cn(
                  'me-2 inline-flex items-center font-medium',
                  stat.increased ? 'text-green' : 'text-red'
                )}
              >
            
              </Text>
            </Text>
          </MetricCard>
        );
      })}
    </>
  );
}

export default function FileStats({text_tr, className,details }: FileStatsType) {
  
  const {
    sliderEl,
    sliderPrevBtn,
    sliderNextBtn,
    scrollToTheRight,
    scrollToTheLeft,
  } = useScrollableSlider();
  

  return (
    <div
      className={cn(
        'relative flex w-auto items-center overflow-hidden',
        className
      )}
    >
      <Button
        title="Prev"
        variant="text"
        ref={sliderPrevBtn}
        onClick={() => scrollToTheLeft()}
        className="!absolute left-0 top-0 z-10 !h-full w-8 !justify-start rounded-none bg-gradient-to-r from-white via-white to-transparent px-0 text-gray-500 hover:text-black dark:from-gray-50/80 dark:via-gray-50/80 3xl:hidden"
      >
        <PiCaretLeftBold className="h-5 w-5" />
      </Button>
      <div className="w-full overflow-hidden">
        <div
          ref={sliderEl}
          className="custom-scrollbar-x grid grid-flow-col gap-5 overflow-x-auto scroll-smooth 2xl:gap-6 3xl:gap-8"
        >
          <FileStatGrid text={text_tr} details={details} className="min-w-[292px]" />
        </div>
      </div>
      <Button
        title="Next"
        variant="text"
        ref={sliderNextBtn}
        onClick={() => scrollToTheRight()}
        className="!absolute right-0 top-0 z-10 !h-full w-8 !justify-end rounded-none bg-gradient-to-l from-white via-white to-transparent px-0 text-gray-500 hover:text-black dark:from-gray-50/80 dark:via-gray-50/80 3xl:hidden"
      >
        <PiCaretRightBold className="h-5 w-5" />
      </Button>
    </div>
  );
}
