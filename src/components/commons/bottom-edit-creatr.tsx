import COLORS from '@/constant/color';
import useI18n from '@/i18n/useI18N';
import { formatDate } from '@/utils/format';
import { Button, Card, Col, Descriptions, Modal, Row } from 'antd';
import router from 'next/router';
import {
  CheckOutlined,
  CloseOutlined,
  ExclamationCircleFilled,
} from '@ant-design/icons';
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
  checkQuery?: boolean;
  useDraft?: boolean;
}
const { confirm } = Modal;
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
  checkQuery,
  useDraft,
}: Props) => {
  const { translate: translateCommon } = useI18n('common');
  const handleCancel = () => {
    const showPropsConfirmDelete = () => {
      confirm({
        icon: <ExclamationCircleFilled />,
        title: translateCommon('modal_close.title'),
        okText: translateCommon('modal_close.button_ok'),
        cancelText: translateCommon('modal_close.button_cancel'),
        okType: 'danger',
        onOk() {
          router.back();
        },
      });
    };

    return (
      <Button onClick={() => showPropsConfirmDelete()}>
        {translateCommon('button_bottom_form.close')}
      </Button>
    );
  };

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
              {handleCancel()}
              <Button
                style={{
                  marginLeft: '12px',
                  color: COLORS.WARNING,
                  borderColor: COLORS.WARNING,
                  display: useDraft ? 'initial' : 'none',
                }}
                onClick={handleSaveDraft}
                loading={loading}
              >
                {translateCommon('button_bottom_form.save_as_draft')}
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                style={{ marginLeft: '12px' }}
                loading={loading}
              >
                {checkQuery
                  ? translateCommon('button_bottom_form.send_request')
                  : translateCommon('button_bottom_form.create_request')}
              </Button>
            </>
          )}

          {manager && (
            <>
              {handleCancel()}
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
                {translateCommon('button_bottom_form.reject')}
              </Button>
              <Button
                icon={<CheckOutlined />}
                style={{
                  marginLeft: '12px',
                  color: COLORS.SUCCESS,
                  borderColor: COLORS.SUCCESS,
                }}
                onClick={() => {
                  return handleAJ(STATUS_ALL_LABELS.ACTIVE);
                }}
              >
                {translateCommon('button_bottom_form.approval')}
              </Button>
            </>
          )}

          {edit &&
            (checkRow && isCheckPermissionEdit ? (
              <>
                {handleCancel()}
                <Button
                  type="primary"
                  onClick={() => handleCheckEdit(false)}
                  style={{ marginLeft: '12px' }}
                >
                  {translateCommon('button_bottom_form.edit')}
                </Button>
              </>
            ) : (
              <>
                <Button onClick={() => handleCheckEdit(true)}>
                  {translateCommon('button_bottom_form.cancel')}
                </Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ marginLeft: '12px' }}
                  loading={loading}
                >
                  {translateCommon('button_bottom_form.save')}
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
