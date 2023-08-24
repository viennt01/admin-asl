import useI18n from '@/i18n/useI18N';
import { Card, Typography } from 'antd';
import UnitType from './components/unit-type/unit-type';
const { Title } = Typography;

export default function RequestForApprovalPage() {
  const { translate: translateRequestForApproval } =
    useI18n('requestForApproval');

  return (
    <Card
      style={{ marginTop: 8 }}
      title={
        <Title level={4} style={{ margin: '-4px 0' }}>
          {translateRequestForApproval('title')}
        </Title>
      }
    >
      <UnitType />
    </Card>
  );
}
