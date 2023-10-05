import { ROUTERS } from '@/constant/router';
import useI18n from '@/i18n/useI18N';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Form, Input, Typography, Card, Row, Col, Switch } from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  FormValues,
  STATUS_MASTER_COLORS,
  UpdateStatusBank,
} from '../interface';
import { API_BANK } from '@/fetcherAxios/endpoint';
import { BottomCreateEdit } from '@/components/commons/bottom-edit-creat-manager';
import { getBankDetail, updateStatus } from '../fetcher';
import DraftTable from '../table/draft-table';
import { errorToast, successToast } from '@/hook/toast';
import { API_MESSAGE } from '@/constant/message';
import { STATUS_ALL_LABELS } from '@/constant/form';

const initialValue = {
  bankName: '',
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

const BankForm = ({
  create,
  manager,
  edit,
  handleSubmit,
  handleSaveDraft,
  loadingSubmit,
  checkRow,
  useDraft,
}: FormProps) => {
  const { translate: translateBank } = useI18n('bank');
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
    queryKey: [API_BANK.GET_DETAIL, idQuery],
    queryFn: () => getBankDetail(idQuery as string),
    enabled: idQuery !== undefined,
    onSuccess: (data) => {
      if (data.status) {
        form.setFieldsValue({
          bankID: data.data.bankID,
          bankNo: data.data.bankNo,
          bankName: data.data.bankName,
          accountNumberVND: data.data.accountNumberVND,
          accountNumberUSD: data.data.accountNumberUSD,
          phoneNumber: data.data.phoneNumber,
          email: data.data.email,
          address: data.data.address,
          bankBranch: data.data.bankBranch,
          note: data.data.note,
          statusBank: data.data.statusBank,
        });
      } else {
        router.push(ROUTERS.BANK);
      }
    },
  });

  const handleCheckEdit = (data: boolean) => {
    setCheckPermissionEdit(data);
  };

  const updateStatusMutation = useMutation({
    mutationFn: (body: UpdateStatusBank) => {
      return updateStatus(body);
    },
  });

  const handleAR = (status: string) => {
    if (idQuery) {
      const _requestData: UpdateStatusBank = {
        id: idQuery,
        status,
      };
      updateStatusMutation.mutate(_requestData, {
        onSuccess: (data) => {
          data.status
            ? (successToast(data.message), router.push(ROUTERS.BANK))
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
      bankNo: form.getFieldValue('bankNo'),
      bankName: form.getFieldValue('bankName'),
      accountNumberVND: form.getFieldValue('accountNumberVND'),
      accountNumberUSD: form.getFieldValue('accountNumberUSD'),
      phoneNumber: form.getFieldValue('phoneNumber'),
      email: form.getFieldValue('email'),
      address: form.getFieldValue('address'),
      bankBranch: form.getFieldValue('bankBranch'),
      note: form.getFieldValue('note'),
    };
    router.push({
      pathname: ROUTERS.BANK_CREATE,
      query: props,
    });
  };

  useEffect(() => {
    if (form.getFieldValue('statusBank')) {
      form.getFieldValue('statusBank') === STATUS_ALL_LABELS.ACTIVE
        ? setCheckStatus(true)
        : setCheckStatus(false);
    }
    if ((edit && checkRow) || manager) {
      setCheckPermissionEdit(true);
    }
    if (propCopyAndCreate.checkCopyAndCreate) {
      form.setFieldsValue({
        bankNo: propCopyAndCreate.bankNo as string,
        bankName: propCopyAndCreate.bankName as string,
        accountNumberVND: propCopyAndCreate.accountNumberVND as string,
        accountNumberUSD: propCopyAndCreate.accountNumberUSD as string,
        phoneNumber: propCopyAndCreate.phoneNumber as string,
        email: propCopyAndCreate.email as string,
        address: propCopyAndCreate.address as string,
        bankBranch: propCopyAndCreate.bankBranch as string,
        note: propCopyAndCreate.note as string,
      });
    }
  }, [
    form,
    edit,
    checkRow,
    manager,
    propCopyAndCreate,
    form.getFieldValue('statusBank'),
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
                  {create && translateBank('information_add_bank')}
                  {manager && 'Approval needed requests'}
                  {edit &&
                    (checkRow ? (
                      <>
                        {isCheckPermissionEdit && 'View'}
                        {!isCheckPermissionEdit &&
                          translateBank('information_edit_bank')}
                      </>
                    ) : (
                      translateBank('information_edit_bank')
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
                    const _requestData: UpdateStatusBank = {
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
            <Col lg={12} span={24}>
              <Form.Item
                label={translateBank('bank_code_form.title')}
                name="bankNo"
                rules={[
                  {
                    required: true,
                    message: translateBank('bank_code_form.error_required'),
                  },
                ]}
              >
                <Input
                  placeholder={translateBank('bank_code_form.placeholder')}
                  size="large"
                  disabled={checkRow && isCheckPermissionEdit}
                />
              </Form.Item>
            </Col>

            <Col lg={12} span={24}>
              <Form.Item
                label={translateBank('bank_name_form.title')}
                name="bankName"
                rules={[
                  {
                    required: true,
                    message: translateBank('bank_name_form.error_required'),
                  },
                ]}
              >
                <Input
                  placeholder={translateBank('bank_name_form.placeholder')}
                  size="large"
                  disabled={checkRow && isCheckPermissionEdit}
                />
              </Form.Item>
            </Col>

            <Col lg={12} span={24}>
              <Form.Item
                label={translateBank('VND_account_number_form.title')}
                name="accountNumberVND"
                rules={[
                  {
                    required: true,
                    message: translateBank(
                      'VND_account_number_form.error_required'
                    ),
                  },
                ]}
              >
                <Input
                  type="number"
                  min={0}
                  prefix="₫"
                  suffix="VND"
                  size="large"
                  placeholder={translateBank(
                    'VND_account_number_form.placeholder'
                  )}
                  allowClear
                  disabled={checkRow && isCheckPermissionEdit}
                />
              </Form.Item>
            </Col>

            <Col lg={12} span={24}>
              <Form.Item
                label={translateBank('USD_account_number_form.title')}
                name="accountNumberUSD"
                rules={[
                  {
                    required: true,
                    message: translateBank(
                      'USD_account_number_form.error_required'
                    ),
                  },
                ]}
              >
                <Input
                  type="number"
                  min={0}
                  prefix="$"
                  suffix="USD"
                  size="large"
                  placeholder={translateBank(
                    'USD_account_number_form.placeholder'
                  )}
                  allowClear
                  disabled={checkRow && isCheckPermissionEdit}
                />
              </Form.Item>
            </Col>

            <Col lg={12} span={24}>
              <Form.Item
                label={translateBank('bank_address_form.title')}
                name="address"
                rules={[
                  {
                    required: true,
                    message: translateBank('bank_address_form.error_required'),
                  },
                ]}
              >
                <Input
                  placeholder={translateBank('bank_address_form.placeholder')}
                  size="large"
                  disabled={checkRow && isCheckPermissionEdit}
                />
              </Form.Item>
            </Col>

            <Col lg={12} span={24}>
              <Form.Item
                label={translateBank('bank_branch_form.title')}
                name="bankBranch"
                rules={[
                  {
                    required: true,
                    message: translateBank('bank_branch_form.error_required'),
                  },
                ]}
              >
                <Input
                  placeholder={translateBank('bank_branch_form.placeholder')}
                  size="large"
                  disabled={checkRow && isCheckPermissionEdit}
                />
              </Form.Item>
            </Col>

            <Col lg={12} span={24}>
              <Form.Item
                label={translateBank('bank_email_form.title')}
                name="email"
                rules={[
                  {
                    required: true,
                    message: translateBank('bank_email_form.error_required'),
                  },
                ]}
              >
                <Input
                  placeholder={translateBank('bank_email_form.placeholder')}
                  size="large"
                  disabled={checkRow && isCheckPermissionEdit}
                />
              </Form.Item>
            </Col>
            <Col lg={12} span={24}>
              <Form.Item
                label={translateBank('bank_phone_form.title')}
                name="phoneNumber"
                rules={[
                  {
                    pattern: /^[0-9]{7,15}$/,
                    message: translateBank('bank_phone_form.error_required'),
                  },
                ]}
              >
                <Input
                  placeholder={translateBank('bank_phone_form.placeholder')}
                  size="large"
                  disabled={checkRow && isCheckPermissionEdit}
                />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                label={translateBank('bank_note_form.title')}
                name="note"
              >
                <Input.TextArea
                  placeholder={translateBank('bank_note_form.placeholder')}
                  disabled={checkRow && isCheckPermissionEdit}
                />
              </Form.Item>
            </Col>
            <Col span={0}>
              <Form.Item name="statusBank"></Form.Item>
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

export default BankForm;
