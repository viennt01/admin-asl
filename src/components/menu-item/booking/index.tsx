import { Badge, Tabs } from 'antd';
import MasterDataTable from './table/master-table';
import { useQueryClient } from '@tanstack/react-query';
import PendingTable from './table/pending-table';
import ProcessingTable from './table/processing-table';
import CancelledTable from './table/cancelled-table';
import COLORS from '@/constant/color';
import { GetTitleNotificationTab } from '@/utils/common';
import { useContext } from 'react';
import { AppContext } from '@/app-context';

export default function Booking() {
  const queryClient = useQueryClient();
  const { userInfo } = useContext(AppContext);
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
                    color: COLORS.GREEN,
                  }}
                >
                  Pending confirmation
                </div>
              </Badge>
            ),
            key: 'API_BOOKING.GET_HISTORY_BOOKING_BY_ASL_P',
            children: <PendingTable />,
          },
          {
            label: 'Processing',
            key: 'API_BOOKING.GET_HISTORY_BOOKING_BY_ASL_Pr',
            children: <ProcessingTable />,
          },
          {
            label: 'Completed',
            key: 'API_BOOKING.GET_HISTORY_BOOKING_BY_ASL_C',
            children: <MasterDataTable />,
          },
          {
            label: 'Cancelled',
            key: 'API_BOOKING.GET_HISTORY_BOOKING_BY_ASL_Ca',
            children: <CancelledTable />,
          },
        ]}
      />
    </>
  );
}
