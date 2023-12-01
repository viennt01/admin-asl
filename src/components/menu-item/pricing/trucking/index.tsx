import { Tabs } from 'antd';
import MasterDataTable from './table/master-table';
import RequestTable from './table/request-table';
import COLORS from '@/constant/color';
import { useQueryClient } from '@tanstack/react-query';
import { API_TRUCKING_PRICING } from '@/fetcherAxios/endpoint';
import { ROLE } from '@/constant/permission';
import { AppContext } from '@/app-context';
import { useContext } from 'react';

export default function SeaTrucking() {
  const queryClient = useQueryClient();
  const { role } = useContext(AppContext);

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
        style={{ marginTop: 10 }}
        items={[
          {
            label: 'Master Data',
            key: API_TRUCKING_PRICING.GET_SEARCH,
            children: <MasterDataTable />,
          },
          {
            label: (
              <div
                style={{
                  color: COLORS.GREEN,
                }}
              >
                Request
              </div>
            ),
            key: API_TRUCKING_PRICING.GET_REQUEST,
            children: <RequestTable />,
          },
        ]}
      />
      <div
        style={{
          marginTop: 36,
          display: role === ROLE.MANAGER || ROLE.SALE ? 'none' : '',
        }}
      >
        <MasterDataTable />
      </div>
    </>
  );
}
