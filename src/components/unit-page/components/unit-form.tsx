import { ROUTERS } from '@/constant/router';
import useI18n from '@/i18n/useI18N';
import { useQuery } from '@tanstack/react-query';
import { Form, Input, Typography, Card, Row, Col, Select } from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FormValues, STATUS_COLORS, STATUS_LABELS } from '../interface';
import { API_PORT } from '@/fetcherAxios/endpoint';
import { BottomCreateEdit } from '@/components/commons/bottom-edit-creatr';
import { getUnitDetail } from '../fetcher';

const initialValue = {
  description: '',
};

interface PortFormProps {
  create?: boolean;
  handleSubmit: (formValues: FormValues) => void;
  loading: boolean;
  checkRow: boolean;
}

const { Title } = Typography;
const { TextArea } = Input;

const options = Object.keys(STATUS_COLORS).map((value) => ({
  label: STATUS_LABELS[parseInt(value) as keyof typeof STATUS_LABELS],
  value: parseInt(value),
}));

const UnitForm = ({
  create,
  handleSubmit,
  loading,
  checkRow,
}: PortFormProps) => {
  const { translate: translateUnit } = useI18n('unit');
  const router = useRouter();
  const [form] = Form.useForm<FormValues>();
  const { id } = router.query;
  const [isCheckEdit, setCheckEdit] = useState<boolean>(true);

  useEffect(() => {
    if (!id) return;
  }, [router, form]);

  const onFinish = (formValues: FormValues) => {
    handleSubmit(formValues);
  };

  const portDetailQuery = useQuery({
    queryKey: [API_PORT.GET_PORT_DETAIL, id],
    queryFn: () => getUnitDetail(id as string),
    enabled: id !== undefined,
    onError: () => {
      router.push(ROUTERS.LOCATION);
    },
    onSuccess: (data) => {
      if (data.status) {
        form.setFieldsValue({
          internationalCode: data.data.internationalCode,
          descriptionVN: data.data.descriptionVN,
          descriptionEN: data.data.descriptionEN,
          status: data.data.status,
        });
      } else {
        router.push(ROUTERS.LOCATION);
      }
    },
  });

  const handleCheckEdit = (data: boolean) => {
    setCheckEdit(data);
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
        <Card style={{ marginBottom: 24 }}>
          <Row justify={'center'}>
            <Col>
              <Title level={3}>
                {create
                  ? translateUnit('information_add_unit')
                  : translateUnit('information_edit_unit')}
              </Title>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col lg={!create ? 12 : 24} span={12}>
              <Form.Item
                label={translateUnit('international_code_form.title')}
                name="internationalCode"
                rules={[
                  {
                    required: true,
                    message: translateUnit(
                      'international_code_form.error_required'
                    ),
                  },
                ]}
              >
                <Input
                  placeholder={translateUnit(
                    'international_code_form.placeholder'
                  )}
                  size="large"
                  disabled={checkRow && isCheckEdit}
                />
              </Form.Item>
            </Col>
            {!create ? (
              <Col lg={12} span={24}>
                <Form.Item
                  label={translateUnit('status_form.title')}
                  name="status"
                  rules={[
                    {
                      required: true,
                      message: translateUnit('status_form.error_required'),
                    },
                  ]}
                >
                  <Select
                    size="large"
                    placeholder={translateUnit('status_form.placeholder')}
                    options={options}
                    disabled={checkRow && isCheckEdit}
                  />
                </Form.Item>
              </Col>
            ) : (
              <></>
            )}

            <Col span={24}>
              <Form.Item
                label={translateUnit('description_vn_form.title')}
                name="descriptionVN"
                rules={[
                  {
                    required: true,
                    message: translateUnit(
                      'description_vn_form.error_required'
                    ),
                  },
                ]}
              >
                <TextArea
                  size="large"
                  placeholder={translateUnit('description_vn_form.placeholder')}
                  allowClear
                  disabled={checkRow && isCheckEdit}
                />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                label={translateUnit('description_en_form.title')}
                name="descriptionEN"
                rules={[
                  {
                    required: true,
                    message: translateUnit(
                      'description_en_form.error_required'
                    ),
                  },
                ]}
              >
                <TextArea
                  size="large"
                  placeholder={translateUnit('description_en_form.placeholder')}
                  allowClear
                  disabled={checkRow && isCheckEdit}
                />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        <BottomCreateEdit
          checkRow={checkRow}
          isCheckEdit={isCheckEdit}
          create={create}
          loading={loading}
          insertedByUser={portDetailQuery.data?.data?.insertedByUser || ''}
          dateInserted={portDetailQuery.data?.data?.dateInserted || ''}
          updatedByUser={portDetailQuery.data?.data?.updatedByUser || ''}
          dateUpdated={portDetailQuery.data?.data?.dateUpdated || ''}
          handleCheckEdit={handleCheckEdit}
        />
      </Form>
    </div>
  );
};

export default UnitForm;
