import { ROUTERS } from '@/constant/router';
import useI18n from '@/i18n/useI18N';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Form, Input, Typography, Card, Row, Col, Switch } from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FormValues, UpdateStatusTypeFee } from '../interface';
import { API_TYPE_FEE } from '@/fetcherAxios/endpoint';
import { BottomCreateEdit } from '@/components/commons/bottom-edit-creat-manager';
import { getTypeFeeDetail, updateStatus } from '../fetcher';
import DraftTable from '../table/draft-table';
import { errorToast, successToast } from '@/hook/toast';
import { API_MESSAGE } from '@/constant/message';
import { STATUS_ALL_LABELS, STATUS_MASTER_COLORS } from '@/constant/form';

const initialValue = {
  typeFeeName: '',
};

interface FormProps {
  create?: boolean;
  manager?: boolean;
  edit?: boolean;
  handleSubmit?: (formValues: FormValues, id?: string) => void;
  handleSaveDraft?: (formValues: FormValues, id?: string) => void;
  loadingSubmit?: boolean;
  checkRow: boolean;
  useDraft?: boolean;
}

const { Title } = Typography;

const TypeFeeForm = ({
  create,
  manager,
  edit,
  handleSubmit,
  handleSaveDraft,
  loadingSubmit,
  checkRow,
  useDraft,
}: FormProps) => {
  const { translate: translateTypeFee } = useI18n('type-fee');
  const router = useRouter();
  const [form] = Form.useForm<FormValues>();
  const { id } = router.query;
  const [idQuery, setIdQuery] = useState<string>();
  const [isCheckPermissionEdit, setCheckPermissionEdit] =
    useState<boolean>(false);
  const [checkStatus, setCheckStatus] = useState<boolean>(true);
  const propCopyAndCreate = router.query;

  useEffect(() => {
    if (!id) return;
    setIdQuery(id as string);
  }, [router, form]);

  const handleIdQuery = (id: string) => {
    setIdQuery(id as string);
  };

  const onFinish = (formValues: FormValues) => {
    if (idQuery) {
      handleSubmit && handleSubmit(formValues, idQuery);
    } else {
      handleSubmit && handleSubmit(formValues);
    }
  };

  const onSaveDraft = () => {
    if (idQuery) {
      handleSaveDraft && handleSaveDraft(form.getFieldsValue(), idQuery);
    } else {
      handleSaveDraft && handleSaveDraft(form.getFieldsValue());
    }
  };

  const detailQuery = useQuery({
    queryKey: [API_TYPE_FEE.GET_DETAIL, idQuery],
    queryFn: () => getTypeFeeDetail(idQuery as string),
    enabled: idQuery !== undefined,
    onSuccess: (data) => {
      if (data.status) {
        form.setFieldsValue({
          typeFeeID: data.data.typeFeeID,
          typeFeeNo: data.data.typeFeeNo,
          typeFeeNameEN: data.data.typeFeeNameEN,
          typeFeeNameVN: data.data.typeFeeNameVN,
          statusTypeFee: data.data.statusTypeFee,
        });
      } else {
        router.push(ROUTERS.TYPE_FEE);
      }
    },
  });

  const handleCheckEdit = (data: boolean) => {
    setCheckPermissionEdit(data);
  };

  const updateStatusMutation = useMutation({
    mutationFn: (body: UpdateStatusTypeFee) => {
      return updateStatus(body);
    },
  });

  const handleAJ = (status: string) => {
    if (idQuery) {
      const _requestData: UpdateStatusTypeFee = {
        id: idQuery,
        status,
      };
      updateStatusMutation.mutate(_requestData, {
        onSuccess: (data) => {
          data.status
            ? (successToast(data.message), router.push(ROUTERS.TYPE_FEE))
            : errorToast(data.message);
        },
        onError() {
          errorToast(API_MESSAGE.ERROR);
        },
      });
    } else {
      errorToast(API_MESSAGE.ERROR);
    }
  };

  const handleCopyAndCreate = () => {
    const props = {
      checkCopyAndCreate: true,
      feeNo: form.getFieldValue('feeNo'),
      feeName: form.getFieldValue('feeName'),
      vatFee: form.getFieldValue('vatFee'),
    };
    router.push({
      pathname: ROUTERS.TYPE_FEE_CREATE,
      query: props,
    });
  };

  useEffect(() => {
    if (form.getFieldValue('statusTypeFee')) {
      form.getFieldValue('statusTypeFee') === STATUS_ALL_LABELS.ACTIVE
        ? setCheckStatus(true)
        : setCheckStatus(false);
    }
    if ((edit && checkRow) || manager) {
      setCheckPermissionEdit(true);
    }
    if (propCopyAndCreate.checkCopyAndCreate) {
      form.setFieldsValue({
        typeFeeNo: propCopyAndCreate.typeFeeNo as string,
        typeFeeNameEN: propCopyAndCreate.typeFeeNameEN as string,
        typeFeeNameVN: propCopyAndCreate.typeFeeNameVN as string,
      });
    }
  }, [
    form,
    edit,
    checkRow,
    manager,
    propCopyAndCreate,
    form.getFieldValue('statusTypeFee'),
  ]);

  return (
    <div style={{ padding: '24px 0' }}>
      <Form
        form={form}
        initialValues={initialValue}
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
      >
        <Card
          style={{ marginBottom: 24 }}
          title={
            <Row justify={'center'}>
              <Col>
                <Title level={3} style={{ margin: '-4px 0' }}>
                  {create && translateTypeFee('information_add_type_fee')}
                  {manager && 'Approval needed requests'}
                  {edit &&
                    (checkRow ? (
                      <>
                        {isCheckPermissionEdit && 'View'}
                        {!isCheckPermissionEdit &&
                          translateTypeFee('information_edit_type_fee')}
                      </>
                    ) : (
                      translateTypeFee('information_edit_type_fee')
                    ))}
                </Title>
              </Col>
            </Row>
          }
          extra={
            <>
              {create && useDraft && (
                <DraftTable handleIdQuery={handleIdQuery} />
              )}
              {edit && idQuery && !isCheckPermissionEdit && (
                <Switch
                  checked={checkStatus}
                  checkedChildren="Active"
                  unCheckedChildren="Deactive"
                  style={{
                    backgroundColor: checkStatus
                      ? STATUS_MASTER_COLORS.ACTIVE
                      : STATUS_MASTER_COLORS.DEACTIVE,
                  }}
                  onChange={(value) => {
                    const _requestData: UpdateStatusTypeFee = {
                      id: idQuery,
                      status: value
                        ? STATUS_ALL_LABELS.ACTIVE
                        : STATUS_ALL_LABELS.DEACTIVE,
                    };

                    updateStatusMutation.mutate(_requestData, {
                      onSuccess: (data) => {
                        data.status
                          ? (successToast(data.message),
                            setCheckStatus(!checkStatus))
                          : errorToast(data.message);
                      },
                      onError() {
                        errorToast(API_MESSAGE.ERROR);
                      },
                    });
                  }}
                  loading={updateStatusMutation.isLoading}
                />
              )}
            </>
          }
        >
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                label={translateTypeFee('type_fee_code_form.title')}
                name="typeFeeNo"
                rules={[
                  {
                    required: true,
                    message: translateTypeFee(
                      'type_fee_code_form.error_required'
                    ),
                  },
                ]}
              >
                <Input
                  size="large"
                  placeholder={translateTypeFee(
                    'type_fee_code_form.placeholder'
                  )}
                  disabled={checkRow && isCheckPermissionEdit}
                />
              </Form.Item>
            </Col>

            <Col lg={12} span={24}>
              <Form.Item
                label={translateTypeFee('type_fee_name_form.title_EN')}
                name="typeFeeNameEN"
                rules={[
                  {
                    required: true,
                    message: translateTypeFee(
                      'type_fee_name_form.error_required'
                    ),
                  },
                ]}
              >
                <Input
                  size="large"
                  placeholder={translateTypeFee(
                    'type_fee_name_form.placeholder'
                  )}
                  allowClear
                  disabled={checkRow && isCheckPermissionEdit}
                />
              </Form.Item>
            </Col>

            <Col lg={12} span={24}>
              <Form.Item
                label={translateTypeFee('type_fee_name_form.title_VN')}
                name="typeFeeNameVN"
                rules={[
                  {
                    required: true,
                    message: translateTypeFee(
                      'type_fee_name_form.error_required'
                    ),
                  },
                ]}
              >
                <Input
                  placeholder={translateTypeFee(
                    'type_fee_name_form.placeholder'
                  )}
                  size="large"
                  disabled={checkRow && isCheckPermissionEdit}
                />
              </Form.Item>
            </Col>

            <Col span={0}>
              <Form.Item name="statusTypeFee"></Form.Item>
            </Col>
          </Row>
        </Card>

        <BottomCreateEdit
          create={create}
          checkRow={checkRow}
          edit={edit}
          loading={loadingSubmit || false}
          isCheckPermissionEdit={isCheckPermissionEdit}
          insertedByUser={detailQuery.data?.data?.insertedByUser || ''}
          dateInserted={detailQuery.data?.data?.dateInserted || ''}
          updatedByUser={detailQuery.data?.data?.updatedByUser || ''}
          dateUpdated={detailQuery.data?.data?.dateUpdated || ''}
          handleCheckEdit={handleCheckEdit}
          handleSaveDraft={onSaveDraft}
          manager={manager}
          handleAR={handleAJ}
          checkQuery={idQuery ? true : false}
          useDraft={useDraft}
          handleCopyAndCreate={handleCopyAndCreate}
        />
      </Form>
    </div>
  );
};

export default TypeFeeForm;
