'use client';
import PageHeader from '@/app/shared/page-header';
import Spinner from '@/components/ui/spinner';
import { routes } from '@/config/routes';
import { useSingleRegistrationForm } from '@/framework/registration-form-list';
import DataView from './DataView';
import { useParams } from 'next/navigation';

export default function RegistrationFormPage() {
  const { id } = useParams();

  const { data, isLoading } = useSingleRegistrationForm(Number(id));
  console.log(data);

  const pageHeader = {
    title: 'Registrations - ' + data?.data?.name,
    breadcrumb: [
      {
        href: routes.pages.index,
        name: 'Home',
      },
      {
        name: 'Registrations - ' + data?.data?.name,
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
          <DataView data={data?.data} />
        </>
      )}
    </>
  );
}
