import { Badge, Tabs } from 'antd';
import MasterDataTable from './table/master-table';
import RequestTable from './table/request-table';
import COLORS from '@/constant/color';
import { useQueryClient } from '@tanstack/react-query';
import { API_BANK } from '@/fetcherAxios/endpoint';
import { useContext } from 'react';
import { AppContext } from '@/app-context';
import { GetTitleNotificationTab } from '@/utils/common';

export default function BankPage() {
  const queryClient = useQueryClient();
  const { userInfo } = useContext(AppContext);

  const onChange = (key: string) => {
    queryClient.invalidateQueries({
      queryKey: [key],
    });
  };

  return (
    <Tabs
      onChange={onChange}
      type="card"
      style={{ marginTop: 10 }}
      items={[
        {
          label: 'Master Data',
          key: API_BANK.GET_SEARCH,
          children: <MasterDataTable />,
        },
        {
          label: (
            <Badge
              count={GetTitleNotificationTab(userInfo?.totalBank)}
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
          key: API_BANK.GET_REQUEST,
          children: <RequestTable />,
        },
      ]}
    />
  );
}
