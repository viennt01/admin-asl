import { Badge, Tabs } from 'antd';
import RequestTable from './table/request-table';
import COLORS from '@/constant/color';
import { useQueryClient } from '@tanstack/react-query';
import MasterDataTable from './table/master-table';
import { useContext, useState } from 'react';
import { AppContext } from '@/app-context';
import { GetTitleNotificationTab } from '@/utils/common';
import { TYPE_TABS } from './interface';

export default function SeaQuotationPage() {
  const [keyActive, setKeyActive] = useState<TYPE_TABS>(
    TYPE_TABS.GET_SEA_QUOTATION_BY_MASTER_DATA
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
            key: TYPE_TABS.GET_SEA_QUOTATION_BY_MASTER_DATA,
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
                    color:
                      keyActive === TYPE_TABS.GET_SEA_QUOTATION_BY_REQUEST_DATA
                        ? COLORS.GREEN
                        : COLORS.BLACK_BLUR,
                  }}
                >
                  Request
                </div>
              </Badge>
            ),
            key: TYPE_TABS.GET_SEA_QUOTATION_BY_REQUEST_DATA,
            children: <RequestTable />,
          },
        ]}
      />
    </>
  );
}
