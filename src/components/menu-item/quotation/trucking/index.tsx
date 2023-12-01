import { Tabs } from 'antd';
import COLORS from '@/constant/color';
import { useQueryClient } from '@tanstack/react-query';
import { API_TRUCKING_QUOTATION } from '@/fetcherAxios/endpoint';
import MasterDataTable from './table/master-table';
import RequestTable from './table/request-table';
import { ROLE } from '@/constant/permission';
import { useContext } from 'react';
import { AppContext } from '@/app-context';

export default function TruckingQuotation() {
  const queryClient = useQueryClient();
  const { role } = useContext(AppContext);

  const onChange = (key: string) => {
    if (key === 'API_SEA_QUOTATION.GET_SEARCH') {
      queryClient.invalidateQueries({
        queryKey: [API_TRUCKING_QUOTATION.GET_SEARCH],
      });
    }
    if (key === 'API_SEA_QUOTATION.GET_REQUEST') {
      queryClient.invalidateQueries({
        queryKey: [API_TRUCKING_QUOTATION.GET_REQUEST],
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
            key: 'API_TRUCKING_QUOTATION.GET_SEARCH',
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
            key: 'API_TRUCKING_QUOTATION.GET_REQUEST',
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
