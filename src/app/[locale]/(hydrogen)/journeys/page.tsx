'use client';
import JourneysTable from '@/app/shared/journeys/table';
import TableLayout from '@/app/[locale]/(hydrogen)/tables/table-layout';
import { useJourneys } from '@/framework/journeys';
import Spinner from '@/components/ui/spinner';
import JourneysForm from '@/app/shared/journeys/journeys-form';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useUserRole } from '@/framework/settings';

import * as tr from '@/app/[locale]/dictionaries/index';

// export const metadata = {
//   ...metaObject('Enhanced Table'),
// };



export default function JourneysTablePage({
  params: { locale },
}: {
  params: { locale: any };
}) {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  if (!params.get('page')) params.set('page', '1');
  if (!params.get('limit')) params.set('limit', '10');
  const { data, isLoading } = useJourneys(params.toString());
  const { data: userRole, isLoading: isLoadingRole } = useUserRole();

  const [selectedColumns, setSelectedColumns] = useState<any[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([]);
  const text = String(locale) == 'ar' ? tr['ar'] : tr['en'];

  const pageHeader = {
    title: `${text?.journeys.title}  `,
    breadcrumb: [
      {
        href: '/',
        name: `${text?.journeys.home}  `,
      },
      {
        name: `${text?.journeys.name}  `,
      },
    ],
  };
  return (
    <TableLayout
      title={pageHeader.title}
import_btn={text?.journeys.import_btn}
      exelbtn_tr={text.exel_btn}
      pdfbtn_tr={text.pdf_btn}
      createPermition={userRole?.data?.includes('create_journey') == false}
      viewPermition={userRole?.data?.includes("view_journey") ==false}
      importPermition={userRole?.data?.includes("import_journeys") ==false}

      breadcrumb={pageHeader.breadcrumb}
      data={{
        columns: selectedColumns
          .filter((column) => column !== 'checked' && column !== 'action')
          .map((column: String) =>
            column.replace(/\./g, '_').replace(/\s/g, '_')
          ),
        rows: selectedRowKeys,
      }}
      fileName="journeys/index"
      header="User,Created At"
      createName={text.journeys.crt_btn}
      createElementButton={<JourneysForm />}
      importButton="/import_journeys"
    >
      {isLoading ? (
        <div className="m-auto">
          <Spinner size="lg" />
        </div>
      ) : userRole?.data?.includes('view_journey') ? (
        <JourneysTable
        permitions={userRole?.data} 
        text_tr={text}
          data={data?.data?.journeys}
          getSelectedColumns={setSelectedColumns}
          getSelectedRowKeys={setSelectedRowKeys}
          totalItems={data?.data?.total}
        />
      ) : (
        <h1 className="flex  h-1/2 items-center justify-center ">
          {' '}
          You Don&apos;t Have Permission
        </h1>
      )}
    </TableLayout>
  );
}
