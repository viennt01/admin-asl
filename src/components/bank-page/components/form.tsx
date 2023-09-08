import { ROUTERS } from '@/constant/router';
import useI18n from '@/i18n/useI18N';
import { useQuery } from '@tanstack/react-query';
import { Form, Input, Typography, Card, Row, Col, Select } from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FormValues, STATUS_MATER_LABELS } from '../interface';
import { API_BANK } from '@/fetcherAxios/endpoint';
import { BottomCreateEdit } from '@/components/commons/bottom-edit-creat-manager';
import { getBankDetail } from '../fetcher';
import DraftTable from '../table/draft-table';

const initialValue = {
  bankName: '',
};

interface FormProps {
  create?: boolean;
  manager?: boolean;
  edit?: boolean;
  handleSubmit?: (formValues: FormValues, id?: string) => void;
  handleSaveDraft?: (formValues: FormValues, id?: string) => void;
  handleApproveAndReject?: (id: string, status: string) => void;
  loadingSubmit: boolean;
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
  loadingSubmit: loading,
  checkRow,
  handleApproveAndReject,
  useDraft,
}: FormProps) => {
  const { translate: translateBank } = useI18n('bank');
  const router = useRouter();
  const [form] = Form.useForm<FormValues>();
  const { id } = router.query;
  const [idQuery, setIdQuery] = useState<string>();
  const [isCheckPermissionEdit, setCheckPermissionEdit] =
    useState<boolean>(true);

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

  const handleAJ = (status: string) => {
    handleApproveAndReject && handleApproveAndReject(id as string, status);
  };

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
            create && useDraft && <DraftTable handleIdQuery={handleIdQuery} />
          }
        >
          <Row gutter={16}>
            <Col lg={6} span={24}>
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

            <Col lg={18} span={24}>
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

            <Col lg={!create && !manager ? 6 : 12} span={12}>
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

            {!create && !manager ? (
              <Col lg={6} span={12}>
                <Form.Item
                  label={translateBank('bank_status_form.title')}
                  name="statusBank"
                  rules={[
                    {
                      required: true,
                      message: translateBank('bank_status_form.error_required'),
                    },
                  ]}
                >
                  <Select
                    size="large"
                    placeholder={translateBank('bank_status_form.placeholder')}
                    options={Object.keys(STATUS_MATER_LABELS).map((key) => ({
                      text: key,
                      value: key,
                    }))}
                    disabled={checkRow && isCheckPermissionEdit}
                  />
                </Form.Item>
              </Col>
            ) : (
              <></>
            )}

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
          </Row>
        </Card>

        <BottomCreateEdit
          create={create}
          checkRow={checkRow}
          edit={edit}
          loading={loading}
          isCheckPermissionEdit={isCheckPermissionEdit}
          insertedByUser={detailQuery.data?.data?.insertedByUser || ''}
          dateInserted={detailQuery.data?.data?.dateInserted || ''}
          updatedByUser={detailQuery.data?.data?.updatedByUser || ''}
          dateUpdated={detailQuery.data?.data?.dateUpdated || ''}
          handleCheckEdit={handleCheckEdit}
          handleSaveDraft={onSaveDraft}
          manager={manager}
          handleAJ={handleAJ}
          checkQuery={idQuery ? true : false}
          useDraft={useDraft}
        />
      </Form>
    </div>
  );
};

export default BankForm;
