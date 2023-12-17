import { Tabs } from 'antd';
import MasterDataTable from './table/master-table';
import { useQueryClient } from '@tanstack/react-query';
import PendingTable from './table/pending-table';
import ProcessingTable from './table/processing-table';
import CancelledTable from './table/cancelled-table';

export default function Booking() {
  const queryClient = useQueryClient();

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
            label: 'Pending confirmation',
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
