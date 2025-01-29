'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
// import { useTranslation } from 'react-i18next';
import i18nConfig from '@/i18nConfig';
// import { Popover } from '@/components/ui/popover';
import { useEffect, useState } from 'react';
// import cn from '@/utils/class-names';
// import Link from "next/link";
import  SelectBox from '@/components/ui/select';

// function DropdownMenu() {
//   const searchParams = useSearchParams()
//   const params = new URLSearchParams(searchParams)
//   const currentPathname = usePathname();
//   const redirectedPathName = (locale: string) => {
//     if (!currentPathname) return "/";
//     const segments = currentPathname.split("/");
//     segments[1] = locale;
//     return segments.join("/").concat('?',params.toString());
//   };
//   return (
//     <div className="w-full text-left rtl:text-right">
      
//       <div className="grid px-3.5 py-3.5 font-medium text-gray-700">
       
//           <Link
            
//             href={redirectedPathName('en')}
//             className="group my-0.5 flex items-center rounded-md px-2.5 py-2 hover:bg-gray-100 focus:outline-none hover:dark:bg-gray-50/50"
//           >
//             En
//           </Link>
//           <Link
            
//             href={redirectedPathName('ar')}
//             className="group my-0.5 flex items-center rounded-md px-2.5 py-2 hover:bg-gray-100 focus:outline-none hover:dark:bg-gray-50/50"
//           >
//             Ar
//           </Link>
       
//       </div>
//     </div>
//   );
// }

export default function LanguageChanger({
  buttonClassName,
}: {
  buttonClassName?: string;
}) {
  // const { i18n } = useTranslation();
  const router = useRouter();
  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams)
  const currentPathname = usePathname();
  const segments = currentPathname.split('/')
  const currentLocale = segments[1];
  
  // const [isOpen, setIsOpen] = useState(false);
  const [selectdLang, setSelectedLang] = useState(currentLocale)
  // const pathname = usePathname();
  const options = [
    {name: 'En', value: 'en'},
    {name: 'Ar', value: 'ar'}
  ]
  const handleChange = (value: any) => {
    const newLocale = value;
    setSelectedLang(newLocale)
    // set cookie for next-i18n-router
    const days = 30;
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = '; expires=' + date.toUTCString();
    document.cookie = `NEXT_LOCALE=${newLocale};expires=${expires};path=/`;
    const segments = currentPathname.split("/");
    segments[1] = newLocale;
    segments.join("/").concat('?',params.toString());
    // redirect to the new locale path
    if (
      currentLocale == i18nConfig.defaultLocale
    ) {
      router.push(
        segments.join("/").concat('?',params.toString())
        // currentPathname.replace(`/ar`, `/${newLocale}`)

      );
    } else {
      router.push(
        segments.join("/").concat('?',params.toString())
        // currentPathname.replace(`/en`, `/${newLocale}`)
      );
    }

    router.refresh();
  };
  

  return (
    <SelectBox
      suffix={false}
      variant='text'
      size='sm'
      placeholder="Select Region"
      options={options}
      onChange={handleChange}
      value={selectdLang}
      className="h-[34px] w-[34px] shadow backdrop-blur-md dark:bg-gray-100 "
      dropdownClassName="p-0 m-1" 
      getOptionValue={(option) => option.value}
      displayValue={(selected) =>
        options?.find((r: any) => r.value === selected)?.name ?? ''
      }
  />
    // <select onChange={handleChange} value={currentLocale} className='relative h-[34px] w-[34px] shadow backdrop-blur-md dark:bg-gray-100 md:h-9 md:w-9'>
    //   <option value="en">En</option>
    //   <option value="ar">Ar</option>
    // </select>
    // <Popover
    //   isOpen={isOpen}
    //   setIsOpen={setIsOpen}
    //   content={() => <DropdownMenu />}
    //   shadow="sm"
    //   placement="bottom-end"
    //   className="z-50 px-0 pb-4 pe-6 pt-5 dark:bg-gray-100 [&>svg]:hidden [&>svg]:dark:fill-gray-100 sm:[&>svg]:inline-flex"
    // >
    //   <button
    //     className={cn(
    //       'relative h-[34px] w-[34px] shadow backdrop-blur-md dark:bg-gray-100 md:h-9 md:w-9',
    //       buttonClassName
    //     )}
    //   >
    //     {currentLocale.toUpperCase()}
    //   </button>
    // </Popover>
  );
}