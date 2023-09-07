import { ROUTERS } from '@/constant/router';
import useI18n from '@/i18n/useI18N';
import { useQuery } from '@tanstack/react-query';
import { Form, Input, Typography, Card, Row, Col, Select } from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FormValues, STATUS_MATER_LABELS } from '../interface';
import { API_CURRENCY } from '@/fetcherAxios/endpoint';
import { BottomCreateEdit } from '@/components/commons/bottom-edit-creat-manager';
import { getCurrencyDetail } from '../fetcher';
import DraftTable from '../table/draft-table';

const initialValue = {
  currencyName: '',
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

const CurrencyForm = ({
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
  const { translate: translateCurrency } = useI18n('currency');
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
    queryKey: [API_CURRENCY.GET_DETAIL, idQuery],
    queryFn: () => getCurrencyDetail(idQuery as string),
    enabled: idQuery !== undefined,
    onSuccess: (data) => {
      if (data.status) {
        form.setFieldsValue({
          currencyID: data.data.currencyID,
          currencyName: data.data.currencyName,
          exchangeRateToVND: data.data.exchangeRateToVND,
          exchangeRateToUSD: data.data.exchangeRateToUSD,
          statusCurrency: data.data.statusCurrency,
        });
      } else {
        router.push(ROUTERS.CURRENCY);
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
                  {create && translateCurrency('information_add_currency')}
                  {manager && 'Approval needed requests'}
                  {edit && translateCurrency('information_edit_currency')}
                </Title>
              </Col>
            </Row>
          }
          extra={
            create && useDraft && <DraftTable handleIdQuery={handleIdQuery} />
          }
        >
          <Row gutter={16}>
            <Col lg={!create && !manager ? 12 : 24} span={12}>
              <Form.Item
                label={translateCurrency('currency_form.title')}
                name="currencyName"
                rules={[
                  {
                    required: true,
                    message: translateCurrency('currency_form.error_required'),
                  },
                ]}
              >
                <Input
                  placeholder={translateCurrency('currency_form.placeholder')}
                  size="large"
                  disabled={checkRow && isCheckPermissionEdit}
                />
              </Form.Item>
            </Col>
            {!create && !manager ? (
              <Col lg={12} span={24}>
                <Form.Item
                  label={translateCurrency('status_form.title')}
                  name="statusCurrency"
                  rules={[
                    {
                      required: true,
                      message: translateCurrency('status_form.error_required'),
                    },
                  ]}
                >
                  <Select
                    size="large"
                    placeholder={translateCurrency('status_form.placeholder')}
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

            <Col lg={12} span={24}>
              <Form.Item
                label={translateCurrency('exchange_rate_to_VND_form.title')}
                name="exchangeRateToVND"
                rules={[
                  {
                    required: true,
                    message: translateCurrency(
                      'exchange_rate_to_VND_form.error_required'
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
                  placeholder={translateCurrency(
                    'exchange_rate_to_VND_form.placeholder'
                  )}
                  allowClear
                  disabled={checkRow && isCheckPermissionEdit}
                />
              </Form.Item>
            </Col>

            <Col lg={12} span={24}>
              <Form.Item
                label={translateCurrency('exchange_rate_to_USD_form.title')}
                name="exchangeRateToUSD"
                rules={[
                  {
                    required: true,
                    message: translateCurrency(
                      'exchange_rate_to_USD_form.error_required'
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
                  placeholder={translateCurrency(
                    'exchange_rate_to_USD_form.placeholder'
                  )}
                  allowClear
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

export default CurrencyForm;
