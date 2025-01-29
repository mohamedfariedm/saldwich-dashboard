'use client';
import TableLayout from '@/app/[locale]/(hydrogen)/tables/table-layout';
import * as tr from '@/app/[locale]/dictionaries/index';
import StoreForm from '@/app/shared/incubators/brand-form';
import BrandTable from '@/app/shared/incubators/table';
import Spinner from '@/components/ui/spinner';
import { useIncubators } from '@/framework/incubators';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function BrandTablePage({
  params: { locale },
}: {
  params: { locale: any };
}) {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  if (!params.get('page')) params.set('page', '1');
  if (!params.get('limit')) params.set('limit', '10');
  const { data, isLoading } = useIncubators();
  const [selectedColumns, setSelectedColumns] = useState<any[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([]);
  const text = String(locale) == 'ar' ? tr['ar'] : tr['en'];
  const pageHeader = {
    title: `Incubators`,
    breadcrumb: [
      {
        href: '/',
        name: ` Home`,
      },
      {
        name: `Incubators`,
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
                  .filter(
                    (column) => column !== 'checked' && column !== 'action'
                  )
                  .map((column: String) =>
                    column.replace(/\./g, '_').replace(/\s/g, '_')
                  ),
                rows: selectedRowKeys,
              }}
              fileName="reports"
              header="User,Created At"
              createName={"Create Incubator"}
              createElementButton={<StoreForm text={text} />}
              //permitions
              // createPermition={
              //   userRole?.data?.includes('create_brand') == false
              // }
              // viewPermition={userRole?.data?.includes('view_brand') == false}
              // editPermition={userRole?.data?.includes("edit_brand")}
              // deletePermition={userRole?.data?.includes("delete_brand")}
            >
              {isLoading ? 
                <div className="m-auto">
                  <Spinner size="lg" />
                </div>:
                <BrandTable
                  text_tr={text}
                  // permitions={userRole?.data}
                  data={data?.data}
                  getSelectedColumns={setSelectedColumns}
                  getSelectedRowKeys={setSelectedRowKeys}
                  totalItems={data?.data?.total}
                />
}
            </TableLayout>
          }
        </>
    </>
  );
}
