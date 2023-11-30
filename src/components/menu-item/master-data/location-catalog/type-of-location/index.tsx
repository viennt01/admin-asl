import { Badge, Tabs } from 'antd';
import MasterDataTable from './table/master-table';
import RequestTable from './table/request-table';
import COLORS from '@/constant/color';
import { useQueryClient } from '@tanstack/react-query';
import { API_LOCATION_TYPE } from '@/fetcherAxios/endpoint';
import { useContext } from 'react';
import { AppContext } from '@/app-context';
import { GetTitleNotificationTab } from '@/utils/common';
import { ROLE } from '@/constant/permission';

export default function TypeOfLocationPage() {
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
            key: API_LOCATION_TYPE.GET_SEARCH,
            children: <MasterDataTable />,
          },
          {
            label: (
              <Badge
                count={GetTitleNotificationTab(userInfo?.totalTypeLocation)}
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
            key: API_LOCATION_TYPE.GET_REQUEST,
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
