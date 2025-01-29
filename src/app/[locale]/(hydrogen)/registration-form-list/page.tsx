'use client';
import TableLayout from '@/app/[locale]/(hydrogen)/tables/table-layout';
import * as tr from '@/app/[locale]/dictionaries/index';
import ApplicationFormTable from '@/app/shared/registration-form-list/table';
import Spinner from '@/components/ui/spinner';
import { useRegistrationFormList } from '@/framework/registration-form-list';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function RegistrationFormTablePage({
  params: { locale },
}: {
  params: { locale: any };
}) {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  if (!params.get('page')) params.set('page', '1');
  if (!params.get('limit')) params.set('limit', '10');
  const { data, isLoading } = useRegistrationFormList();
  const [selectedColumns, setSelectedColumns] = useState<any[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([]);
  const text = String(locale) == 'ar' ? tr['ar'] : tr['en'];
  const pageHeader = {
    title: `Registration Form List`,
    breadcrumb: [
      {
        href: '/',
        name: ` Home`,
      },
      {
        name: `Registration Form List`,
      },
    ],
  };
  console.log(data);

  return (
    <>
      <>
        {
          <TableLayout
            title={pageHeader.title}
            exelbtn_tr={text.exel_btn}
            pdfbtn_tr={text.pdf_btn}
            breadcrumb={pageHeader.breadcrumb}
            data={{
              columns: selectedColumns
                .filter((column) => column !== 'checked' && column !== 'action')
                .map((column: String) =>
                  column.replace(/\./g, '_').replace(/\s/g, '_')
                ),
              rows: selectedRowKeys,
            }}
            fileName="Registration Form"
            apiUrl="/users"
            header="User,Created At"
          >
            {isLoading ? (
              <div className="m-auto">
                <Spinner size="lg" />
              </div>
            ) : (
              <ApplicationFormTable
                text_tr={text}
                data={data?.data}
                getSelectedColumns={setSelectedColumns}
                getSelectedRowKeys={setSelectedRowKeys}
                totalItems={data?.data?.total}
              />
            )}
          </TableLayout>
        }
      </>
    </>
  );
}
