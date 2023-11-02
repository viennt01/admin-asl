import { Badge, Tabs } from 'antd';
import RequestTable from './table/request-table';
import COLORS from '@/constant/color';
import { useQueryClient } from '@tanstack/react-query';
import MasterDataTable from './table/master-table';

export default function SeaQuotationPage() {
  const queryClient = useQueryClient();

  const onChange = (key: string) => {
    queryClient.invalidateQueries({
      queryKey: [key],
    });
  };
  return (
    <Tabs
      onChange={onChange}
      type="card"
      style={{ marginTop: 10 }}
      items={[
        {
          label: 'Master Data',
          key: 'API_SEA_QUOTATION.GET_SEARCH',
          children: <MasterDataTable />,
        },
        {
          label: (
            <Badge
              count={2}
              style={{
                marginRight: '-10px',
              }}
            >
              <div
                style={{
                  color: COLORS.GREEN,
                }}
              >
                Request
              </div>
            </Badge>
          ),
          key: 'API_SEA_QUOTATION.GET_REQUEST',
          children: <RequestTable />,
        },
      ]}
    />
  );
}
