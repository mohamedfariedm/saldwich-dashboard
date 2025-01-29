'use client';
import PageHeader from '@/app/shared/page-header';
import Spinner from '@/components/ui/spinner';
import { routes } from '@/config/routes';
import { useSettings } from '@/framework/site-settings';
import SettingsForm from './SettingsForm';

export default function SettingsPage() {
  const { data, isLoading } = useSettings();
  console.log(data);

  const pageHeader = {
    title: `Settings`,
    breadcrumb: [
      {
        href: routes.pages.index,
        name: 'Home',
      },
      {
        name: `Settings`,
      },
    ],
  };
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
          <SettingsForm settings={data?.data?.setting} />
        </>
      )}
    </>
  );
}
