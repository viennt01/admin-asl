import { Badge, Tabs } from 'antd';
import MasterDataTable from './table/master-table';
import RequestTable from './table/request-table';
import COLORS from '@/constant/color';
import { useQueryClient } from '@tanstack/react-query';
import { API_SEA_PRICING } from '@/fetcherAxios/endpoint';
import { useContext } from 'react';
import { AppContext } from '@/app-context';
import { ROLE } from '@/constant/permission';
import { GetTitleNotificationTab } from '@/utils/common';

export default function SeaPricingPage() {
  const queryClient = useQueryClient();
  const { role, userInfo } = useContext(AppContext);

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
        style={{
          marginTop: 10,
          display: role === ROLE.MANAGER || role === ROLE.SALE ? '' : 'none',
        }}
        items={[
          {
            label: 'Master Data',
            key: API_SEA_PRICING.GET_SEARCH,
            children: <MasterDataTable />,
          },
          {
            label: (
              <Badge
                count={GetTitleNotificationTab(userInfo?.totalSeaPricing)}
                style={{
                  marginRight: '-4px',
                  marginTop: '-2px',
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
            key: API_SEA_PRICING.GET_REQUEST,
            children: <RequestTable />,
          },
        ]}
      />
      <div
        style={{
          marginTop: 36,
          display: role === ROLE.MANAGER || role === ROLE.SALE ? 'none' : '',
        }}
      >
        <MasterDataTable />
      </div>
    </>
  );
}
