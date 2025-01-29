'use client';
import TableLayout from '@/app/[locale]/(hydrogen)/tables/table-layout';
import * as tr from '@/app/[locale]/dictionaries/index';
import ServicesForm from '@/app/shared/services/review-form';
import ServiceTable from '@/app/shared/services/table';
import Spinner from '@/components/ui/spinner';
import { useServices } from '@/framework/services';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function ClientReviewPage({
  params: { locale },
}: {
  params: { locale: any };
}) {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  if (!params.get('page')) params.set('page', '1');
  if (!params.get('limit')) params.set('limit', '10');
  const { data, isLoading } = useServices("Individual");
  const [selectedColumns, setSelectedColumns] = useState<any[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([]);
  const text = String(locale) == 'ar' ? tr['ar'] : tr['en'];
  const pageHeader = {
    title: `Services Individual`,
    breadcrumb: [
      {
        href: '/',
        name: ` Home`,
      },
      {
        name: `Services Individual`,
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
            fileName="reports"
            header="User,Created At"
            createName={'Create Service'}
            createElementButton={<ServicesForm text={text} />}
          >
            {isLoading ? (
              <div className="m-auto">
                <Spinner size="lg" />
              </div>
            ) : (
              <ServiceTable
                text_tr={text}
                // permitions={userRole?.data}
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
