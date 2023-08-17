import useI18n from '@/i18n/useI18N';
import { formatDate } from '@/utils/format';
import { Button, Card, Col, Descriptions, Row } from 'antd';
import router from 'next/router';

interface Props {
  checkRow: boolean;
  isCheckEdit: boolean;
  create?: boolean;
  loading: boolean;
  insertedByUser: string;
  dateInserted: string;
  updatedByUser: string;
  dateUpdated: string;
  handleCheckEdit: (data: boolean) => void;
}

export const BottomCreateEdit = ({
  checkRow,
  isCheckEdit,
  create,
  loading,
  insertedByUser,
  dateInserted,
  updatedByUser,
  dateUpdated,
  handleCheckEdit,
}: Props) => {
  const { translate: translateCommon } = useI18n('common');

  return (
    <Card>
      <Row gutter={12}>
        <Col span={12}>
          {checkRow && isCheckEdit ? (
            <>
              <Button onClick={() => router.back()}>
                {translateCommon('close')}
              </Button>
              <Button
                type="primary"
                onClick={() => handleCheckEdit(false)}
                style={{ marginLeft: '12px' }}
              >
                {translateCommon('edit')}
              </Button>
            </>
          ) : (
            <>
              {checkRow ? (
                <Button onClick={() => handleCheckEdit(true)}>
                  {translateCommon('cancel')}
                </Button>
              ) : (
                <Button onClick={() => router.back()}>
                  {translateCommon('cancel')}
                </Button>
              )}
              <Button
                type="primary"
                htmlType="submit"
                style={{ marginLeft: '12px' }}
                loading={loading}
              >
                {!create ? translateCommon('save') : translateCommon('create')}
              </Button>
            </>
          )}
        </Col>
        {!create ? (
          <Col span={12}>
            <Descriptions column={2}>
              <Descriptions.Item label={translateCommon('creator')}>
                {insertedByUser}
              </Descriptions.Item>
              <Descriptions.Item label={translateCommon('date_created')}>
                {formatDate(Number(dateInserted))}
              </Descriptions.Item>
              <Descriptions.Item label={translateCommon('inserter')}>
                {updatedByUser}
              </Descriptions.Item>
              <Descriptions.Item label={translateCommon('date_inserted')}>
                {formatDate(Number(dateUpdated))}
              </Descriptions.Item>
            </Descriptions>
          </Col>
        ) : (
          <></>
        )}
      </Row>
    </Card>
  );
};
