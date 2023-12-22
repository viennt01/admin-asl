import { Badge, Tabs } from 'antd';
import CompletedDataTable from './table/completed-table';
import { useQueryClient } from '@tanstack/react-query';
import PendingTable from './table/pending-table';
import ProcessingTable from './table/processing-table';
import CancelledTable from './table/cancelled-table';
import COLORS from '@/constant/color';
import { GetTitleNotificationTab } from '@/utils/common';
import { useContext, useState } from 'react';
import { AppContext } from '@/app-context';
import { TYPE_TABS } from './interface';

export default function Booking() {
  const [keyActive, setKeyActive] = useState<TYPE_TABS>(
    TYPE_TABS.GET_HISTORY_BOOKING_BY_ASL_PENDING
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
        style={{ marginTop: 10 }}
        items={[
          {
            label: (
              <Badge
                count={GetTitleNotificationTab(userInfo?.totalBookingPending)}
                style={{
                  marginRight: '-4px',
                  marginTop: '-2px',
                }}
              >
                <div
                  style={{
                    color:
                      keyActive === TYPE_TABS.GET_HISTORY_BOOKING_BY_ASL_PENDING
                        ? COLORS.GREEN
                        : COLORS.BLACK_BLUR,
                  }}
                >
                  Pending confirmation
                </div>
              </Badge>
            ),
            key: TYPE_TABS.GET_HISTORY_BOOKING_BY_ASL_PENDING,
            children: <PendingTable />,
          },
          {
            label: 'Processing',
            key: TYPE_TABS.GET_HISTORY_BOOKING_BY_ASL_PROCESSING,
            children: <ProcessingTable />,
          },
          {
            label: 'Completed',
            key: TYPE_TABS.GET_HISTORY_BOOKING_BY_ASL_COMPLETED,
            children: <CompletedDataTable />,
          },
          {
            label: 'Cancelled',
            key: TYPE_TABS.GET_HISTORY_BOOKING_BY_ASL_CANCELLED,
            children: <CancelledTable />,
          },
        ]}
      />
    </>
  );
}
