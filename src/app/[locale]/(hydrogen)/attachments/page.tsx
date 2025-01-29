'use client';
import PasswordSettingsView from '@/app/shared/attachments/password-settings';
import PageHeader from '@/app/shared/page-header';
import ToggleSection from '@/app/shared/ToggleSection';
import Spinner from '@/components/ui/spinner';
import { routes } from '@/config/routes';
import { usePosts } from '@/framework/attachments';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ProfileSettingsFormPage() {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  if (!params.get('section_id')) params.set('section_id', '1');
  const { data, isLoading } = usePosts(params.get('section_id') || '1');
  console.log('section data', data);
  let [key,setKey]=useState(0)

  const pageHeader = {
    title: `${data?.section?.title?.en||"Download Apps"}`,
    breadcrumb: [
      {
        href: routes.pages.index,
        name: 'Home',
      },
      {
        name: `${data?.section?.title?.en||"Download Apps"}`,
      },
    ],
  };

  useEffect(()=>{
    setKey(key+1)
  },[params.get('section_id')])

  return (
    <>
      {isLoading ? (
        <div className="m-auto">
          <Spinner size="lg" />
        </div>
      ) : (
        <>
          <PageHeader
            title={pageHeader.title}
            breadcrumb={pageHeader.breadcrumb}
          ></PageHeader>

          <ToggleSection
          key={key}
            page_id={data?.section?.page_id}
            section_id={params.get('section_id') || '1'}
            active={data?.section?.active ?? 1}
            priority={data?.section?.priority ?? 1}
          />

          {data?.data.map((form: any) => (
            <div key={form.id}>
              <PasswordSettingsView
                settings={{
                  title: form?.title?form?.title:{en:"",ar:""},
                  description: form.description? form.description : {en:"",ar:""},
                  sliders: form.attachment ? form.attachment[0] : null,
                }}
                formData={form}
              />
              <br />
              <hr />
              <br />
            </div>
          ))}
        </>
      )}
    </>
  );
}
