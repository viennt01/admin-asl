import { Badge, Tabs } from 'antd';
import MasterDataTable from './table/master-table';
import RequestTable from './table/request-table';
import COLORS from '@/constant/color';
import { useQueryClient } from '@tanstack/react-query';
import { useContext, useState } from 'react';
import { AppContext } from '@/app-context';
import { GetTitleNotificationTab } from '@/utils/common';
import { TYPE_TABS } from './interface';

export default function TypeSaleActivity() {
  const [keyActive, setKeyActive] = useState<TYPE_TABS>(
    TYPE_TABS.GET_TYPE_SALE_ACTIVITY_BY_MASTER_DATA
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
        style={{
          marginTop: 10,
        }}
        items={[
          {
            label: 'Master Data',
            key: TYPE_TABS.GET_TYPE_SALE_ACTIVITY_BY_MASTER_DATA,
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
                    color:
                      keyActive ===
                      TYPE_TABS.GET_TYPE_SALE_ACTIVITY_BY_REQUEST_DATA
                        ? COLORS.GREEN
                        : COLORS.BLACK_BLUR,
                  }}
                >
                  Request
                </div>
              </Badge>
            ),
            key: TYPE_TABS.GET_TYPE_SALE_ACTIVITY_BY_REQUEST_DATA,
            children: <RequestTable />,
          },
        ]}
      />
    </>
  );
}
