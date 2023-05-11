import { Breadcrumb, Card } from 'antd';

export default function DashboardPage() {
  return (
    <>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
      </Breadcrumb>

      <Card
        bordered={false}
        style={{
          width: 'fit-content',
          margin: '0 0 24px auto',
        }}
        bodyStyle={{
          padding: 12,
        }}
      >
        <h1>Dashboard</h1>
      </Card>
    </>
  );
}
