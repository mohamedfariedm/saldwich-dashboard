'use client';

import { Tooltip } from '@/components/ui/tooltip';
import { HeaderCell } from '@/components/ui/table';
import { ActionIcon } from '@/components/ui/action-icon';
import AvatarCard from '@/components/ui/avatar-card';
import DateCell from '@/components/ui/date-cell';
import EyeIcon from '@/components/icons/eye';
import CreateButton from '../create-button';
import ReportDetails from '@/app/shared/new-installed-soft-POSM/report-modal'
import { log } from 'console';


type Columns = {
  data: any[];
  text_tr?:any;
  sortConfig?: any;
  handleSelectAll: any;
  checkedItems: string[];
  onHeaderCellClick: (value: string) => void;
  onChecked?: (id: string) => void;
};

export const getColumns = ({
  data,
  sortConfig,
  text_tr,
  checkedItems,
  onHeaderCellClick,
  handleSelectAll,
  onChecked,
}: Columns) => {

  return[
    {
        title: <></>,
        dataIndex: 'action',
        key: 'action',
        width: 20,
        render: (_: string, row: any) => (
          <div className="flex items-center gap-3">
            <Tooltip
            size="sm"
            content={() => 'View Report'}
            placement="top"
            color="invert"
          >
            <CreateButton
              icon={
              <ActionIcon size="sm" variant="outline" aria-label={'View Benchmark'}>
                <EyeIcon className="h-4 w-4" />
              </ActionIcon>
              }
              view={<ReportDetails id={row.id}/>}
              label=''
              className='p-0 m-0 bg-transparent text-gray-700'
            />
          </Tooltip>
          </div>
        ),
    },
    {
      title: <HeaderCell title={text_tr.NewInstalledSoftPOSM_report.username}/>,
      dataIndex: 'user.name',
      key: 'username',
      width: 100,
      hidden: 'username',
  
      render: (_: string, row: any) => (
        <AvatarCard
          src={""}
          name={row?.user?.name || ''}
          description={`ID-${row?.user?.id}`}
        />
      ),
    },
    {
      title: <HeaderCell title={text_tr.NewInstalledSoftPOSM_report.region} />,
      dataIndex: 'store.region.name',
      key: 'region',
      width: 30,
      hidden: 'region',
      render: (_: string, row: any) => row?.store?.region?.name ,
    },
    {
      title: <HeaderCell title={text_tr.NewInstalledSoftPOSM_report.city}/>,
      dataIndex: 'store.city.name',
      key: 'city',
      width: 30,
      hidden: 'city',
      render: (_: string, row: any) => row?.store?.city?.name ,
    },
    {
      title: <HeaderCell title={text_tr.NewInstalledSoftPOSM_report.retailer} />,
      dataIndex: 'store.retailer.name',
      key: 'retailer',
      width: 30,
      hidden: 'retailer',
      render: (_: string, row: any) => row?.store?.retailer?.name ,
    },  
    {
      title: <HeaderCell title={text_tr.NewInstalledSoftPOSM_report.posm} />,
      dataIndex: 'posm_types',
      key: 'POSM Types',
      width: 30,
      hidden: 'posm_types',
      render: (_: string, row: any) => row?.posm_types.join('\n') ,
    },
    {
      title: <HeaderCell title={text_tr.NewInstalledSoftPOSM_report.storename} />,
      dataIndex: 'store.name',
      key: 'store',
      width: 30,
      hidden: 'store',
      render: (_: string, row: any) => row?.store?.name ,
    },
    {
      title: <HeaderCell title={text_tr.NewInstalledSoftPOSM_report.brand} />,
      dataIndex: 'brand.name',
      key: 'brand',
      width: 30,
      hidden: 'brand',
      render: (_: string, row: any) => row?.brand?.name ,
    },
    {
      title: <HeaderCell title={text_tr.NewInstalledSoftPOSM_report.bg} />,
      dataIndex: 'category.name',
      key: 'BG',
      width: 30,
      hidden: 'category',
      render: (_: string, row: any) => row?.category?.name ,
    },
    {
      title: <HeaderCell title={text_tr.NewInstalledSoftPOSM_report.vcp} />,
      dataIndex: 'sub_category.name',
      key: 'VCP',
      width: 30,
      hidden: 'subCategory',
      render: (_: string, row: any) => row?.sub_category?.name ,
    },
    {
      title: <HeaderCell title={text_tr.NewInstalledSoftPOSM_report.bu}/>,
      dataIndex: 'sub_sub_category.name',
      key: 'BU',
      width: 30,
      hidden: 'subSubCategory',
      render: (_: string, row: any) => row?.sub_sub_category?.name ,
    },
    {
      title: (
        <HeaderCell
          title={text_tr.NewInstalledSoftPOSM_report.installationfrom}
          sortable
          ascending={
            sortConfig?.direction === 'asc' && sortConfig?.key === 'installation_date'
          }
        />
      ),
      onHeaderCell: () => onHeaderCellClick('installation_date_from'),
      dataIndex: 'installation_date_from',
      key: 'Installation Date from',
      width: 50,
      render: (value: Date) => <DateCell date={new Date(value)} />,
    },
    {
      title: (
        <HeaderCell
          title={text_tr.NewInstalledSoftPOSM_report.installationto}
          sortable
          ascending={
            sortConfig?.direction === 'afc' && sortConfig?.key === 'remove_date'
          }
        />
      ),
      onHeaderCell: () => onHeaderCellClick('installation_date_to'),
      dataIndex: 'installation_date_to',
      key: 'Installation Date To',
      width: 50,
      render: (value: Date) => <DateCell date={new Date(value)} />,
    },
  ];
}




