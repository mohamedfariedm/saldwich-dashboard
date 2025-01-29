'use client';
import TableLayout from '@/app/[locale]/(hydrogen)/tables/table-layout';
import * as tr from '@/app/[locale]/dictionaries/index';
import FaqForm from '@/app/shared/faqs/faq-form';
import FaqsTable from '@/app/shared/faqs/table';
import Spinner from '@/components/ui/spinner';
import { useFaqs } from '@/framework/faqs';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function FaqsTablePage({
  params: { locale },
}: {
  params: { locale: any };
}) {

  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  if (!params.get('page')) params.set('page', '1');
  if (!params.get('limit')) params.set('limit', '10');

  const { data, isLoading } = useFaqs();

  const [selectedColumns, setSelectedColumns] = useState<any[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([]);

  const text = String(locale) == 'ar' ? tr['ar'] : tr['en'];

  const pageHeader = {
    title: `Faqs`,
    breadcrumb: [
      {
        href: '/',
        name: ` Home`,
      },
      {
        name: `Faqs`,
      },
    ],
  };

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
            fileName="Teams"
            header="User,Created At"
            createName={'Create Faq'}
            createElementButton={<FaqForm text={text} />}
          >
            {isLoading ? (
              <div className="m-auto">
                <Spinner size="lg" />
              </div>
            ) : (
              <FaqsTable
                text_tr={text}
                data={data?.data}
                getSelectedColumns={setSelectedColumns}
                getSelectedRowKeys={setSelectedRowKeys}
                totalItems={data?.data?.total}
                locale={locale}
              />
            )}
          </TableLayout>
        }
      </>
    </>
  );
}
