import { Badge, Tabs } from 'antd';
import MasterDataTable from './table/master-table';
import RequestTable from './table/request-table';
import COLORS from '@/constant/color';
import { useQueryClient } from '@tanstack/react-query';
import { useContext, useState } from 'react';
import { AppContext } from '@/app-context';
import CustomersDataTable from './table/customers-table';
import LinerDataTable from './table/liner-table';
import { GetTitleNotificationTab } from '@/utils/common';
import { TYPE_TABS } from './interface';

export default function Partner() {
  const [keyActive, setKeyActive] = useState<TYPE_TABS>(
    TYPE_TABS.GET_PARTNER_BY_AGENT
  );
  const queryClient = useQueryClient();
  const { userInfo } = useContext(AppContext);

  const onChange = (key: TYPE_TABS) => {
    setKeyActive(key);
    queryClient.invalidateQueries({
      queryKey: [key],
    });
  };

  return (
    <>
      <Tabs
        onChange={(key: string) => onChange(key as TYPE_TABS)}
        type="card"
        style={{ marginTop: '10px' }}
        items={[
          {
            label: 'Agent',
            key: TYPE_TABS.GET_PARTNER_BY_AGENT,
            children: <MasterDataTable />,
          },
          {
            label: 'Carrier',
            key: TYPE_TABS.GET_PARTNER_BY_LINER,
            children: <LinerDataTable />,
          },
          {
            label: 'Customers',
            key: TYPE_TABS.GET_PARTNER_BY_CUSTOMER,
            children: <CustomersDataTable />,
          },
          {
            label: (
              <Badge
                count={GetTitleNotificationTab(userInfo?.totalPartner)}
                style={{
                  marginRight: '-4px',
                  marginTop: '-2px',
                }}
              >
                <div
                  style={{
                    color:
                      keyActive === TYPE_TABS.GET_PARTNER_BY_REQUEST
                        ? COLORS.GREEN
                        : COLORS.BLACK_BLUR,
                  }}
                >
                  Request
                </div>
              </Badge>
            ),
            key: TYPE_TABS.GET_PARTNER_BY_REQUEST,
            children: <RequestTable />,
          },
        ]}
      />
    </>
  );
}
