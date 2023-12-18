import { Badge, Tabs } from 'antd';
import RequestTable from './table/request-table';
import COLORS from '@/constant/color';
import { useQueryClient } from '@tanstack/react-query';
import MasterDataTable from './table/master-table';
import { API_SEA_QUOTATION } from '@/fetcherAxios/endpoint';
import { useContext } from 'react';
import { AppContext } from '@/app-context';
import { ROLE } from '@/constant/permission';
import { GetTitleNotificationTab } from '@/utils/common';

export default function SeaQuotationPage() {
  const queryClient = useQueryClient();
  const { role, userInfo } = useContext(AppContext);

  const onChange = (key: string) => {
    if (key === 'API_SEA_QUOTATION.GET_SEARCH') {
      queryClient.invalidateQueries({
        queryKey: [API_SEA_QUOTATION.GET_SEARCH],
      });
    }
    if (key === 'API_SEA_QUOTATION.GET_REQUEST') {
      queryClient.invalidateQueries({
        queryKey: [API_SEA_QUOTATION.GET_REQUEST],
      });
    }
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
            key: 'API_SEA_QUOTATION.GET_SEARCH',
            children: <MasterDataTable />,
          },
          {
            label: (
              <Badge
                count={GetTitleNotificationTab(userInfo?.totalSeaQuotation)}
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
            key: 'API_SEA_QUOTATION.GET_REQUEST',
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
