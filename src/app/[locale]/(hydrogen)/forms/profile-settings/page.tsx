'use client';

import { routes } from '@/config/routes';
import PersonalInfoView from '@/app/shared/account-settings/personal-info';
import PageHeader from '@/app/shared/page-header';
import ProfileSettingsNav from '@/app/shared/account-settings/navigation';
import { metaObject } from '@/config/site.config';
import { useFetures } from '@/framework/features';
import Spinner from '@/components/ui/spinner';
import { useGeneralSettings } from '@/framework/generalsettings';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { useUserRole } from '@/framework/settings';

// export const metadata = {
//   ...metaObject('Profile Settings'),
// };

const pageHeader = {
  title: 'Account Settings',
  breadcrumb: [
    {
      href: routes.eCommerce.dashboard,
      name: 'E-Commerce',
    },
    {
      href: routes.forms.profileSettings,
      name: 'Form',
    },
    {
      name: 'Account Settings',
    },
  ],
};

export default function ProfileSettingsFormPage() {
const searchParams = useSearchParams()
const params = new URLSearchParams(searchParams)
//   const { data, isLoading } = useGeneralSettings(params.get("category")||"general");
//   const { data: userRole, isLoading: isLoadingRole } = useUserRole();
// // console.log(userRole);
// userRole?.data?.includes("all_settings")

  return<>
  </>
  
  
//   <>
  
//   {isLoading ? 
// <div className="m-auto">
//   <Spinner size="lg" />
// </div>

//   : 
//   <>
//   {userRole?.data?.includes("all_settings")?
  
//   <PersonalInfoView initialValues={data?.data}  createPermition={userRole?.data?.includes("update_settings")} />
//   :
//   <h1 className="flex  h-1/2 items-center justify-center ">
//   {' '}
//   You Don&apos;t Have Permission
// </h1> 
  
//   }
//   </>
 
//  }
  
  
//   </> 
}
