import { Tabs } from 'antd';
import MasterDataTable from './table/master-table';
import RequestTable from './table/request-table';
import COLORS from '@/constant/color';
import { useQueryClient } from '@tanstack/react-query';
import { API_TYPE_UNIT } from '@/fetcherAxios/endpoint';
import { ROLE } from '@/constant/permission';
import { useContext } from 'react';
import { AppContext } from '@/app-context';

export default function CalculationTypeUnit() {
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
        style={{ marginTop: 10, display: role === ROLE.MANAGER ? '' : 'none' }}
        items={[
          {
            label: 'Master Data',
            key: API_TYPE_UNIT.GET_SEARCH,
            children: <MasterDataTable />,
          },
          {
            label: (
              // <Badge
              //   count={2}
              //   style={{
              //     marginRight: '-10px',
              //   }}
              // >
              //   <div
              //     style={{
              //       color: COLORS.GREEN,
              //     }}
              //   >
              //     Request
              //   </div>
              // </Badge>
              <div
                style={{
                  color: COLORS.GREEN,
                }}
              >
                Request
              </div>
            ),
            key: API_TYPE_UNIT.GET_REQUEST,
            children: <RequestTable />,
          },
        ]}
      />{' '}
      <div
        style={{ marginTop: 36, display: role !== ROLE.MANAGER ? '' : 'none' }}
      >
        <MasterDataTable />
      </div>
    </>
  );
}
