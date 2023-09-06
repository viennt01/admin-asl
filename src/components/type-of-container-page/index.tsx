import COLORS from '@/constant/color';
import { Tabs, Badge } from 'antd';
import MasterDataTable from './table/master-table';
import RequestTable from './table/request-table';
import { useQueryClient } from '@tanstack/react-query';
import { API_CONTAINER_TYPE } from '@/fetcherAxios/endpoint';

export default function TypeOfContainerPage() {
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
          key: API_CONTAINER_TYPE.GET_SEARCH,
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
          key: API_CONTAINER_TYPE.GET_REQUEST,
          children: <RequestTable />,
        },
      ]}
    />
  );
}
