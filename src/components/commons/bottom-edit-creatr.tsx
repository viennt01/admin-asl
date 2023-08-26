import COLORS from '@/constant/color';
import useI18n from '@/i18n/useI18N';
import { formatDate } from '@/utils/format';
import { Button, Card, Col, Descriptions, Row } from 'antd';
import router from 'next/router';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { STATUS_ALL_LABELS } from '@/constant/form';

interface Props {
  create?: boolean;
  manager?: boolean;
  edit?: boolean;
  checkRow: boolean;
  isCheckPermissionEdit: boolean;
  loading: boolean;
  insertedByUser: string;
  dateInserted: string;
  updatedByUser: string;
  dateUpdated: string;
  handleCheckEdit: (data: boolean) => void;
  handleSaveDraft?: () => void;
  handleAJ: (status: string) => void;
}

export const BottomCreateEdit = ({
  create,
  manager,
  edit,
  checkRow,
  isCheckPermissionEdit,
  loading,
  insertedByUser,
  dateInserted,
  updatedByUser,
  dateUpdated,
  handleCheckEdit,
  handleSaveDraft,
  handleAJ,
}: Props) => {
  const { translate: translateCommon } = useI18n('common');

  return (
    <Card
      style={{
        position: 'sticky',
        bottom: 0,
        zIndex: 11,
      }}
    >
      <Row gutter={12}>
        <Col span={12}>
          {create && (
            <>
              <Button onClick={() => router.back()}>
                {translateCommon('cancel')}
              </Button>
              <Button
                style={{
                  marginLeft: '12px',
                  color: COLORS.WARNING,
                  borderColor: COLORS.WARNING,
                }}
                onClick={handleSaveDraft}
                loading={loading}
              >
                Save as draft
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                style={{ marginLeft: '12px' }}
                loading={loading}
              >
                Sent request
              </Button>
            </>
          )}

          {manager && (
            <>
              <Button onClick={() => router.back()}>
                {translateCommon('cancel')}
              </Button>
              <Button
                icon={<CloseOutlined />}
                style={{
                  marginLeft: '12px',
                  color: COLORS.ERROR,
                  borderColor: COLORS.ERROR,
                }}
                onClick={() => {
                  return handleAJ(STATUS_ALL_LABELS.REJECT);
                }}
              >
                Reject
              </Button>
              <Button
                icon={<CheckOutlined />}
                style={{
                  marginLeft: '12px',
                  color: COLORS.SUCCESS,
                  borderColor: COLORS.SUCCESS,
                }}
                onClick={() => {
                  return handleAJ(STATUS_ALL_LABELS.APPROVE);
                }}
              >
                Approve
              </Button>
            </>
          )}

          {edit &&
            (checkRow && isCheckPermissionEdit ? (
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
                <Button onClick={() => handleCheckEdit(true)}>
                  {translateCommon('cancel')}
                </Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ marginLeft: '12px' }}
                  loading={loading}
                >
                  {translateCommon('save')}
                </Button>
              </>
            ))}
        </Col>

        {!create && (
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
        )}
      </Row>
    </Card>
  );
};
