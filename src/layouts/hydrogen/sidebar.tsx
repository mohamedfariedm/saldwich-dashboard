'use client';

import Link from 'next/link';
import { Fragment } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { Title } from '@/components/ui/text';
// import { Collapse } from '@/components/ui/collapse';
import cn from '@/utils/class-names';
// import { PiCaretDownBold } from 'react-icons/pi';
import SimpleBar from '@/components/ui/simplebar';
import { menuItemsHaydrogen } from './menu-items';
import Logo from '@/components/logo';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import * as tr from '@/app/[locale]/dictionaries/index';

import { useUserRole } from '@/framework/settings';

export default function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const currentPathname = usePathname();
  // const { data: userRole, isLoading: isLoadingRole } = useUserRole();
  // console.log('====================================');
  // console.log('menuItemsHaydrogen', menuItemsHaydrogen);
  // console.log('userRole', userRole);

  console.log('====================================');
  const { t } = useTranslation();
  const locale = Cookies.get('NEXT_LOCALE');
  const pathName = (selectedPath: string) => {
    if (!currentPathname) return '/';
    const segments = currentPathname.split('/');
    segments[1] = Cookies.get('NEXT_LOCALE') || 'en';
    return segments[0].concat('/', segments[1], selectedPath);
  };
  const text = String(locale) == 'ar' ? tr['ar'] : tr['en'];

  return (
    <aside
      className={cn(
        'fixed bottom-0 start-0 z-50 h-full w-[270px] border-e-2 border-gray-100 bg-white dark:bg-gray-100/50 2xl:w-72',
        className
      )}
    >
      <div className="sticky top-0 z-40 bg-gray-0/10 px-6 pb-5 pt-8 dark:bg-gray-100/5 2xl:px-8 2xl:pt-6">
        <Link href={'/'} aria-label="Site Logo" style={{display:"flex",justifyContent:"center"}}>
          <Logo className="max-w-[155px]" />
        </Link>
      </div>

      <SimpleBar className="h-[calc(100%-80px)]">
        <div className="mt-4 pb-3 3xl:mt-6">
          {menuItemsHaydrogen.map((item, index) => {
            const isActive = pathname === (item?.href as string);

            // const pathnameExistInDropdowns: any = item?.dropdownItems?.filter(
            //   (dropdownItem) => dropdownItem.href === pathname
            // );
            // const isDropdownOpen = Boolean(pathnameExistInDropdowns?.length);

            return (
              <>{
                <Fragment key={item.name + '-' + index}>
                  {item?.href ?
                  
                  (
                    <>
                      <Link
                        href={pathName(item?.href)}
                        className={cn(
                          'group relative mx-3 my-0.5 flex items-center rounded-md px-3 py-2 font-medium capitalize lg:my-1 2xl:mx-5 2xl:my-2',
                          isActive
                            ? 'before:top-2/5 text-primary before:absolute before:-start-3 before:block before:h-4/5 before:w-1 before:rounded-ee-md before:rounded-se-md before:bg-primary 2xl:before:-start-5'
                            : 'text-gray-700 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-700/90'
                        )}
                      >
                        {item?.icon && (
                          <span
                            className={cn(
                              'me-2 inline-flex h-5 w-5 items-center justify-center rounded-md [&>svg]:h-[19px] [&>svg]:w-[19px]',
                              isActive
                                ? 'text-primary'
                                : 'text-gray-800 dark:text-gray-500 dark:group-hover:text-gray-700'
                            )}
                          >
                            {item?.icon}
                          </span>
                        )}
                      {text==tr['ar']?item.nameAr:item.name}
                      </Link>
                    </>
                  ) 
                  
                  
                  :
                  
                  
                  (
                    <Title
                      as="h6"
                      className={cn(
                        'mb-2 truncate px-6 text-[11px] font-medium uppercase tracking-widest text-gray-500 dark:text-gray-500 2xl:px-8',
                        index !== 0 && 'mt-6 3xl:mt-7'
                      )}
                    >
                      {t(text==tr['ar']?item.nameAr:item.name)}
                    </Title>
                  )
                  
                  
                  }
                </Fragment>


              }
              </>
            );
          })}
        </div>
      </SimpleBar>
    </aside>
  );
}
