import { ROUTERS } from '@/constant/router';
import useI18n from '@/i18n/useI18N';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Form, Input, Typography, Card, Row, Col, Switch } from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FormValues, UpdateStatusFeeGroup } from '../interface';
import { API_FEE_GROUP } from '@/fetcherAxios/endpoint';
import { BottomCreateEdit } from '@/components/commons/bottom-edit-creat-manager';
import { getFeeGroupDetail, updateStatus } from '../fetcher';
import DraftTable from '../table/draft-table';
import { STATUS_ALL_LABELS, STATUS_MASTER_COLORS } from '@/constant/form';
import { UpdateStatusLocationType } from '@/components/type-of-location/interface';
import { errorToast, successToast } from '@/hook/toast';
import { API_MESSAGE } from '@/constant/message';

const initialValue = {
  description: '',
};

interface PortFormProps {
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

const FeeGroupForm = ({
  create,
  manager,
  edit,
  handleSubmit,
  handleSaveDraft,
  loadingSubmit,
  checkRow,
  useDraft,
}: PortFormProps) => {
  const { translate: translateFeeGroup } = useI18n('feeGroup');
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
    queryKey: [API_FEE_GROUP.GET_DETAIL, idQuery],
    queryFn: () => getFeeGroupDetail(idQuery as string),
    enabled: idQuery !== undefined,
    onSuccess: (data) => {
      if (data.status) {
        form.setFieldsValue({
          typeFeeGroupID: data.data.typeFeeGroupID,
          feeGroupNo: data.data.feeGroupNo,
          feeGroupNameEN: data.data.feeGroupNameEN,
          feeGroupNameVN: data.data.feeGroupNameVN,
          statusFeeGroup: data.data.statusFeeGroup,
        });
      } else {
        router.push(ROUTERS.FEE_GROUP);
      }
    },
  });

  const handleCheckEdit = (data: boolean) => {
    setCheckPermissionEdit(data);
  };

  const handleAR = (status: string) => {
    if (idQuery) {
      const _requestData: UpdateStatusLocationType = {
        id: idQuery,
        status,
      };
      updateStatusMutation.mutate(_requestData, {
        onSuccess: (data) => {
          data.status
            ? (successToast(data.message), router.push(ROUTERS.FEE_GROUP))
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

  const updateStatusMutation = useMutation({
    mutationFn: (body: UpdateStatusFeeGroup) => {
      return updateStatus(body);
    },
  });

  const handleCopyAndCreate = () => {
    const props = {
      checkCopyAndCreate: true,
      internationalCode: form.getFieldValue('internationalCode'),
      descriptionVN: form.getFieldValue('descriptionVN'),
      descriptionEN: form.getFieldValue('descriptionEN'),
    };
    router.push({
      pathname: ROUTERS.FEE_GROUP_CREATE,
      query: props,
    });
  };

  useEffect(() => {
    if (form.getFieldValue('statusFeeGroup')) {
      form.getFieldValue('statusFeeGroup') === STATUS_ALL_LABELS.ACTIVE
        ? setCheckStatus(true)
        : setCheckStatus(false);
    }
    if ((edit && checkRow) || manager) {
      setCheckPermissionEdit(true);
    }
    if (propCopyAndCreate.checkCopyAndCreate) {
      form.setFieldsValue({
        typeFeeGroupID: propCopyAndCreate.typeFeeGroupID as string,
        feeGroupNo: propCopyAndCreate.feeGroupNo as string,
        feeGroupNameEN: propCopyAndCreate.feeGroupNameEN as string,
        feeGroupNameVN: propCopyAndCreate.feeGroupNameVN as string,
      });
    }
  }, [
    form,
    edit,
    checkRow,
    manager,
    propCopyAndCreate,
    form.getFieldValue('statusFeeGroup'),
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
                  {create && translateFeeGroup('information_add_fee_group')}
                  {manager && 'Approval needed requests'}
                  {edit &&
                    (checkRow ? (
                      <>
                        {isCheckPermissionEdit && 'View'}
                        {!isCheckPermissionEdit &&
                          translateFeeGroup('information_edit_fee_group')}
                      </>
                    ) : (
                      translateFeeGroup('information_edit_fee_group')
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
                    const _requestData: UpdateStatusLocationType = {
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
                label={translateFeeGroup('fee_group_code_form.title')}
                name="feeGroupNo"
                rules={[
                  {
                    required: true,
                    message: translateFeeGroup(
                      'fee_group_code_form.error_required'
                    ),
                  },
                ]}
              >
                <Input
                  placeholder={translateFeeGroup(
                    'fee_group_code_form.placeholder'
                  )}
                  size="large"
                  disabled={checkRow && isCheckPermissionEdit}
                />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                label={translateFeeGroup('fee_group_name_form.titleEn')}
                name="feeGroupNameEN"
                rules={[
                  {
                    required: true,
                    message: translateFeeGroup(
                      'fee_group_name_form.error_required'
                    ),
                  },
                ]}
              >
                <Input
                  placeholder={translateFeeGroup(
                    'fee_group_name_form.placeholder'
                  )}
                  size="large"
                  disabled={checkRow && isCheckPermissionEdit}
                />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                label={translateFeeGroup('fee_group_name_form.titleVn')}
                name="feeGroupNameVN"
                rules={[
                  {
                    required: true,
                    message: translateFeeGroup(
                      'fee_group_name_form.error_required'
                    ),
                  },
                ]}
              >
                <Input
                  placeholder={translateFeeGroup(
                    'fee_group_name_form.placeholder'
                  )}
                  size="large"
                  disabled={checkRow && isCheckPermissionEdit}
                />
              </Form.Item>
            </Col>
            <Col span={0}>
              <Form.Item name="statusFeeGroup"></Form.Item>
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
          handleAR={handleAR}
          checkQuery={idQuery ? true : false}
          useDraft={useDraft}
          handleCopyAndCreate={handleCopyAndCreate}
        />
      </Form>
    </div>
  );
};

export default FeeGroupForm;
