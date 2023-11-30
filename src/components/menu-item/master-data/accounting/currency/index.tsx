import { Badge, Tabs } from 'antd';
import MasterDataTable from './table/master-table';
import RequestTable from './table/request-table';
import COLORS from '@/constant/color';
import { useQueryClient } from '@tanstack/react-query';
import { API_CURRENCY } from '@/fetcherAxios/endpoint';
import { useContext } from 'react';
import { AppContext } from '@/app-context';
import { GetTitleNotificationTab } from '@/utils/common';
import { ROLE } from '@/constant/permission';

export default function CurrencyPage() {
  const queryClient = useQueryClient();
  const { userInfo, role } = useContext(AppContext);

  const onChange = (key: string) => {
    queryClient.invalidateQueries({
      queryKey: [key],
    });
  };

  return (
    <>
      <Tabs
        onChange={onChange}
        type="card"
        style={{ marginTop: 10, display: role === ROLE.MANAGER ? '' : 'none' }}
        items={[
          {
            label: 'Master Data',
            key: API_CURRENCY.GET_SEARCH,
            children: <MasterDataTable />,
          },
          {
            label: (
              <Badge
                count={GetTitleNotificationTab(userInfo?.totalCurrency)}
                style={{
                  marginRight: '-10px',
                }}
              >
                <div
                  style={{
                    color: COLORS.GREEN,
                  }}
                >
                  Request
                </div>
              </Badge>
            ),
            key: API_CURRENCY.GET_REQUEST,
            children: <RequestTable />,
          },
        ]}
      />
      <div
        style={{ marginTop: 36, display: role !== ROLE.MANAGER ? '' : 'none' }}
      >
        <MasterDataTable />
      </div>
    </>
  );
}
