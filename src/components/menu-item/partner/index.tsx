import { Tabs } from 'antd';
import MasterDataTable from './table/master-table';
import RequestTable from './table/request-table';
import COLORS from '@/constant/color';
import { useQueryClient } from '@tanstack/react-query';
import { API_PARTNER } from '@/fetcherAxios/endpoint';
import { ROLE } from '@/constant/permission';
import { useContext } from 'react';
import { AppContext } from '@/app-context';
import CustomersDataTable from './table/customers-table';
import LinerDataTable from './table/liner-table';

export default function Partner() {
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
            label: 'Agent',
            key: 'Agent',
            children: <MasterDataTable />,
          },
          {
            label: 'Liner',
            key: 'Liner',
            children: <LinerDataTable />,
          },
          {
            label: 'Customers',
            key: 'Customers',
            children: <CustomersDataTable />,
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
            key: API_PARTNER.GET_REQUEST,
            children: <RequestTable />,
          },
        ]}
      />
      <div
        style={{ marginTop: 36, display: role !== ROLE.MANAGER ? '' : 'none' }}
      >
        <Tabs
          onChange={onChange}
          type="card"
          style={{
            marginTop: 10,
            display: role === ROLE.MANAGER ? '' : 'none',
          }}
          items={[
            {
              label: 'Agent',
              key: 'Agent',
              children: <MasterDataTable />,
            },
            {
              label: 'Liner',
              key: 'Liner',
              children: <LinerDataTable />,
            },
            {
              label: 'Customers',
              key: 'Customers',
              children: <CustomersDataTable />,
            },
          ]}
        />
      </div>
    </>
  );
}
