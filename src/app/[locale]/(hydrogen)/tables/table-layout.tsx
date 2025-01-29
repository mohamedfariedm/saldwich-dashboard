'use client';

import PageHeader, { PageHeaderTypes } from '@/app/shared/page-header';
import CreateButton from '@/app/shared/create-button';
import ExportBtn from '@/components/ui/ExportBtn';

type TableLayoutProps = {
  data?: { columns: unknown[]; rows: unknown[] };
  header: string;
  fileName?: string;
  text_tr?: any;
  createName?: string;
  // translate
  exelbtn_tr?: string;
  pdfbtn_tr?: string;
  createElementButton?: React.ReactNode;
  importButton?: string;
  import_btn?: string;
  importSecButton?: string;
  isLoading?: boolean;
  role?: string;
  type?: string;
  apiUrl?: string;
  // permitions
  createPermition?: boolean;
  importPermition?: boolean;
  viewPermition?: boolean;
  editPermition?: boolean;
  deletePermition?: boolean;
} & PageHeaderTypes;

export default function TableLayout({
  data,
  header,
  fileName,
  text_tr,
  exelbtn_tr,
  import_btn,
  pdfbtn_tr,
  children,
  createElementButton,
  importButton,
  importSecButton,
  createName,
  isLoading,
  role,
  type,
  createPermition,
  viewPermition,
  importPermition,
  apiUrl,
  ...props
}: React.PropsWithChildren<TableLayoutProps>) {
  return (
    <>
      <PageHeader {...props}>
        <div className="m-0 mt-4 flex items-center gap-1 p-0 @lg:mt-0">
          {apiUrl && fileName && (
            <ExportBtn apiUrl={apiUrl} fileName={fileName} />
          )}

          {createName && (
            <CreateButton
              label={createName}
              view={createElementButton}
              className={
                importSecButton
                  ? ' mt-0 w-1/5 text-xs capitalize @lg:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100 sm:text-sm  lg:mt-0'
                  : 'mt-0 w-full text-xs capitalize @lg:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100 sm:text-sm lg:mt-0'
              }
              disabled={createPermition || viewPermition}
            />
          )}
        </div>
      </PageHeader>

      {children}
    </>
  );
}
