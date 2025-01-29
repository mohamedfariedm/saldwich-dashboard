'use client';
import ProductsTable from '@/app/shared/products/table';
import TableLayout from '@/app/[locale]/(hydrogen)/tables/table-layout';
import { useProducts } from '@/framework/products';
import Spinner from '@/components/ui/spinner';
import ProductForm from '@/app/shared/products/product-form';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import * as tr from '@/app/[locale]/dictionaries/index';
import axios from 'axios';
import { useUserRole } from '@/framework/settings';
// export const metadata = {
//   ...metaObject('Enhanced Table'),
// };

const pageHeader = {
  title: 'Products Management',
  breadcrumb: [
    {
      href: '/',
      name: 'Home',
    },
    {
      name: 'products',
    },
  ],
};

export default function ProductsTablePage({
  params: { locale },
}: {
  params: { locale: any };
}) {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  if (!params.get('page')) params.set('page', '1');
  if (!params.get('limit')) params.set('limit', '10');
  const { data, isLoading } = useProducts(params.toString());
  const { data: userRole, isLoading: isLoadingRole } = useUserRole();
  const [selectedColumns, setSelectedColumns] = useState<any[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([]);

  const text = String(locale) == 'ar' ? tr['ar'] : tr['en'];

  return (
    <TableLayout 
      title={text.productTitle}
      exelbtn_tr={text.exel_btn}
      pdfbtn_tr={text.pdf_btn}

      breadcrumb={text.productBreadcrumb}
      data={{
        columns: selectedColumns
          .filter((column) => column !== 'checked' && column !== 'action')
          .map((column: String) =>
            column.replace(/\./g, '_').replace(/\s/g, '_')
          ),
        rows: selectedRowKeys,
      }}
      fileName="products/index"
      header="User,Created At"
      createName={text.crt_btn_Prod}
      createElementButton={<ProductForm  text={text}/>}
      viewPermition={userRole?.data?.includes('view_product') == false}
      createPermition={userRole?.data?.includes('create_product') == false}
    >
      {isLoading ? (
        <div className="m-auto">
          <Spinner size="lg" />
        </div>
      ) : userRole?.data?.includes('view_product') ? (
        <>
          <ProductsTable
              text_tr={text}
            permitions={userRole?.data}
            data={data?.data?.products}
            getSelectedColumns={setSelectedColumns}
            getSelectedRowKeys={setSelectedRowKeys}
            totalItems={data?.data?.total}
          />
        </>
      ) : (
        <h1 className="flex  h-1/2 items-center justify-center ">
          {' '}
          You Don&apos;t Have Permission
        </h1>
      )}
    </TableLayout>
  );
}
