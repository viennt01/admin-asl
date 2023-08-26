import { Tabs } from 'antd';
import MasterDataTable from './table/master-table';
import RequestTable from './table/request-table';

export default function CalculationUnitPage() {
  const onChange = (key: string) => {
    console.log(key);
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
          label: 'Request',
          key: 'request',
          children: <RequestTable />,
        },
      ]}
    />
  );
}
