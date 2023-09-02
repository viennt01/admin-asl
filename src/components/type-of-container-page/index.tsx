import COLORS from '@/constant/color';
import { Tabs, Badge } from 'antd';
import MasterDataTable from './table/master-table';
import RequestTable from './table/request-table';

export default function TypeOfContainerPage() {
  const onChange = (key: string) => {
    return key;
  };

  return (
    <Tabs
      onChange={onChange}
      type="card"
      style={{ marginTop: 10 }}
      items={[
        {
          label: 'Master Data',
          key: 'masterData',
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
          key: 'request',
          children: <RequestTable />,
        },
      ]}
    />
  );
}
