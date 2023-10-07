import COLORS from '@/constant/color';
import { ROUTERS } from '@/constant/router';
import {
  Button,
  Form,
  Input,
  Typography,
  Card,
  Row,
  Col,
  ConfigProvider,
  Select,
  Table,
} from 'antd';
// import dayjs from 'dayjs';
import { ColumnsType } from 'antd/es/table';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useI18n from '@/i18n/useI18N';
import CollapseCard from '@/components/commons/collapse-card';

export interface FormValues {
  type_of_container: string;
  detail_placeholder: string;
  number_container: string;
}

interface DataType {
  key: React.Key;
  containerNo: string;
  typeContainer: string;
  status: string;
}

const { Title } = Typography;

export default function EditCustomsPricing() {
  const router = useRouter();
  const [form] = Form.useForm<FormValues>();
  const { id } = router.query;
  const { translate: translateCustomsPricing } = useI18n('pricingCustoms');
  // const dateFormat = 'YYYY/MM/DD';

  useEffect(() => {
    if (!id) return;
  }, [router, form]);

  const onFinish = (formValues: FormValues) => {
    return formValues;
  };

  const data: readonly any[] | undefined = [];

  const columnsCustomOtherFee: ColumnsType<DataType> = [
    {
      title: translateCustomsPricing('no'),
      width: 80,
      dataIndex: 'no',
      key: 'no',
      fixed: 'left',
      align: 'center',
    },
    {
      title: translateCustomsPricing('commodity'),
      width: 200,
      dataIndex: 'commodity',
      key: 'commodity',
      fixed: 'left',
      align: 'center',
    },
    {
      title: translateCustomsPricing('customs_type'),
      width: 200,
      dataIndex: 'customsOffice',
      key: 'customsOffice',
      fixed: 'left',
      align: 'center',
    },
    {
      title: translateCustomsPricing('router'),
      width: 300,
      dataIndex: 'router',
      key: 'router',
      align: 'center',
    },
    {
      title: translateCustomsPricing('customs_type'),
      width: 200,
      dataIndex: 'customsType',
      key: 'customsType',
      align: 'center',
    },
    {
      title: translateCustomsPricing('quantity'),
      width: 200,
      dataIndex: 'quantity',
      key: 'quantity',
      align: 'center',
    },
    {
      title: translateCustomsPricing('service_type'),
      width: 150,
      dataIndex: 'serviceType',
      key: 'serviceType',
      align: 'center',
    },
    {
      title: translateCustomsPricing('modify_date'),
      width: 200,
      dataIndex: 'modifyDate',
      key: 'modifyDate',
      align: 'center',
    },
    {
      title: translateCustomsPricing('note'),
      width: 200,
      dataIndex: 'note',
      key: 'note',
      align: 'center',
    },
  ];

  return (
    <div style={{ padding: '24px 0' }}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: COLORS.GREEN,
          },
        }}
      >
        <Form
          form={form}
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
        >
          <Card style={{ marginBottom: 24 }}>
            <Row justify={'center'}>
              <Col>
                <Title level={3}>
                  {translateCustomsPricing('information_edit_customs_pricing')}
                </Title>
              </Col>
            </Row>

            {/* <Row gutter={16}>
              <Col lg={12} span={24}>
                <Form.Item
                  label={translateCustomsPricing('customs_office_form.title')}
                  tooltip={translateCustomsPricing('customs_office_form.title')}
                  name="customsOffice"
                  rules={[
                    {
                      required: true,
                      message: translateCustomsPricing(
                        'customs_office_form.error_required'
                      ),
                    },
                  ]}
                >
                  <Input
                    placeholder={translateCustomsPricing(
                      'customs_office_form.placeholder'
                    )}
                  />
                </Form.Item>
              </Col>

              <Col lg={12} span={24}>
                <Form.Item
                  label={translateCustomsPricing('commodity_form.title')}
                  name="commodity"
                  rules={[
                    {
                      required: true,
                      message: translateCustomsPricing(
                        'commodity_form.error_required'
                      ),
                    },
                  ]}
                >
                  <Select
                    options={[
                      {
                        value: 'Commodity 1',
                        label: 'Commodity 1',
                      },
                      {
                        value: 'Commodity 2',
                        label: 'Commodity 2',
                      },
                    ]}
                  />
                </Form.Item>
              </Col>

              <Col lg={12} span={24}>
                <Form.Item
                  label={translateCustomsPricing('quantity_form.title')}
                  name="quantity"
                  rules={[
                    {
                      required: true,
                      message: translateCustomsPricing(
                        'quantity_form.error_required'
                      ),
                    },
                  ]}
                >
                  <Input
                    placeholder={translateCustomsPricing(
                      'quantity_form.placeholder'
                    )}
                  />
                </Form.Item>
              </Col>

              <Col lg={7} span={24}>
                <Form.Item
                  label={translateCustomsPricing('service_type_form.title')}
                  name="serviceType"
                  rules={[
                    {
                      required: true,
                      message: translateCustomsPricing(
                        'service_type_form.error_required'
                      ),
                    },
                  ]}
                >
                  <Select
                    options={[
                      {
                        value: 'Fee group 1',
                        label: 'Fee group 1',
                      },
                      {
                        value: 'Fee group 2',
                        label: 'Fee group 2',
                      },
                    ]}
                  />
                </Form.Item>
              </Col>

              <Col lg={5} span={24}>
                <Form.Item
                  label={translateCustomsPricing('status')}
                  name="status"
                  rules={[
                    {
                      required: true,
                      message: translateCustomsPricing('status_placeholder'),
                    },
                  ]}
                >
                  <Select
                    options={[
                      {
                        value: 'Active',
                        label: 'Active',
                      },
                      {
                        value: 'Deactivate',
                        label: 'Deactivate',
                      },
                    ]}
                  />
                </Form.Item>
              </Col>

              <Col lg={7} span={24}>
                <Form.Item
                  label={translateCustomsPricing('updater')}
                  name="updater"
                >
                  <Input
                    placeholder={translateCustomsPricing('updater_placeholder')}
                    disabled
                  />
                </Form.Item>
              </Col>

              <Col lg={5} span={24}>
                <Form.Item
                  label={translateCustomsPricing('modify_date')}
                  name="modify_date"
                >
                  <Input
                    placeholder={translateCustomsPricing(
                      'modify_date_placeholder'
                    )}
                    disabled
                  />
                </Form.Item>
              </Col>

              <Col lg={7} span={24}>
                <Form.Item
                  label={translateCustomsPricing('creator')}
                  name="creator"
                >
                  <Input
                    placeholder={translateCustomsPricing('creator_placeholder')}
                    disabled
                  />
                </Form.Item>
              </Col>

              <Col lg={5} span={24}>
                <Form.Item
                  label={translateCustomsPricing('date_created')}
                  name="date_created"
                >
                  <Input
                    placeholder={translateCustomsPricing(
                      'date_created_placeholder'
                    )}
                    disabled
                  />
                </Form.Item>
              </Col>
            </Row> */}

            <CollapseCard
              title={translateCustomsPricing('title_customs_service')}
              style={{ marginBottom: '24px' }}
              defaultActive={true}
            >
              <Row gutter={16}>
                <Col lg={12} span={24}>
                  <Form.Item
                    label={translateCustomsPricing('customs_office_form.title')}
                    tooltip={translateCustomsPricing(
                      'customs_office_form.title'
                    )}
                    name="customsOffice"
                    rules={[
                      {
                        required: true,
                        message: translateCustomsPricing(
                          'customs_office_form.error_required'
                        ),
                      },
                    ]}
                  >
                    <Input
                      placeholder={translateCustomsPricing(
                        'customs_office_form.placeholder'
                      )}
                    />
                  </Form.Item>
                </Col>

                <Col lg={12} span={24}>
                  <Form.Item
                    label={translateCustomsPricing('commodity_form.title')}
                    name="commodity"
                    rules={[
                      {
                        required: true,
                        message: translateCustomsPricing(
                          'commodity_form.error_required'
                        ),
                      },
                    ]}
                  >
                    <Select
                      options={[
                        {
                          value: 'Commodity 1',
                          label: 'Commodity 1',
                        },
                        {
                          value: 'Commodity 2',
                          label: 'Commodity 2',
                        },
                      ]}
                    />
                  </Form.Item>
                </Col>

                <Col lg={12} span={24}>
                  <Form.Item
                    label={translateCustomsPricing('router_form.title')}
                    name="routerForm"
                    rules={[
                      {
                        required: true,
                        message: translateCustomsPricing(
                          'router_form.error_required'
                        ),
                      },
                    ]}
                  >
                    <Select
                      options={[
                        {
                          value: 'Router 1',
                          label: 'Router 1',
                        },
                        {
                          value: 'Router 2',
                          label: 'Router 2',
                        },
                      ]}
                    />
                  </Form.Item>
                </Col>

                <Col lg={12} span={24}>
                  <Form.Item
                    label={translateCustomsPricing('customs_type_form.title')}
                    name="customsType"
                    rules={[
                      {
                        required: true,
                        message: translateCustomsPricing(
                          'customs_type_form.error_required'
                        ),
                      },
                    ]}
                  >
                    <Select
                      options={[
                        {
                          value: 'Customs Type 1',
                          label: 'Customs Type 1',
                        },
                        {
                          value: 'Customs Type 2',
                          label: 'Customs Type 2',
                        },
                      ]}
                    />
                  </Form.Item>
                </Col>

                <Col lg={12} span={24}>
                  <Form.Item
                    label={translateCustomsPricing('quantity_form.title')}
                    name="quantity"
                    rules={[
                      {
                        required: true,
                        message: translateCustomsPricing(
                          'quantity_form.error_required'
                        ),
                      },
                    ]}
                  >
                    <Input
                      placeholder={translateCustomsPricing(
                        'quantity_form.placeholder'
                      )}
                    />
                  </Form.Item>
                </Col>

                <Col lg={5} span={24}>
                  <Form.Item
                    label={translateCustomsPricing('status')}
                    name="status"
                    rules={[
                      {
                        required: true,
                        message: translateCustomsPricing('status_placeholder'),
                      },
                    ]}
                  >
                    <Select
                      options={[
                        {
                          value: 'Active',
                          label: 'Active',
                        },
                        {
                          value: 'Deactivate',
                          label: 'Deactivate',
                        },
                      ]}
                    />
                  </Form.Item>
                </Col>

                <Col lg={7} span={24}>
                  <Form.Item
                    label={translateCustomsPricing('updater')}
                    name="updater"
                  >
                    <Input
                      placeholder={translateCustomsPricing(
                        'updater_placeholder'
                      )}
                      disabled
                    />
                  </Form.Item>
                </Col>

                <Col lg={5} span={24}>
                  <Form.Item
                    label={translateCustomsPricing('modify_date')}
                    name="modify_date"
                  >
                    <Input
                      placeholder={translateCustomsPricing(
                        'modify_date_placeholder'
                      )}
                      disabled
                    />
                  </Form.Item>
                </Col>

                <Col lg={7} span={24}>
                  <Form.Item
                    label={translateCustomsPricing('creator')}
                    name="creator"
                  >
                    <Input
                      placeholder={translateCustomsPricing(
                        'creator_placeholder'
                      )}
                      disabled
                    />
                  </Form.Item>
                </Col>

                <Col lg={5} span={24}>
                  <Form.Item
                    label={translateCustomsPricing('date_created')}
                    name="date_created"
                  >
                    <Input
                      placeholder={translateCustomsPricing(
                        'date_created_placeholder'
                      )}
                      disabled
                    />
                  </Form.Item>
                </Col>
              </Row>
            </CollapseCard>
          </Card>

          <CollapseCard
            title={translateCustomsPricing('title_customs_other_fee')}
            style={{ marginBottom: '24px' }}
            defaultActive={true}
          >
            <Row gutter={16}>
              <Col lg={12} span={24}>
                <Form.Item
                  label={translateCustomsPricing('customs_office_form.title')}
                  tooltip={translateCustomsPricing('customs_office_form.title')}
                  name="customsOffice"
                  rules={[
                    {
                      required: true,
                      message: translateCustomsPricing(
                        'customs_office_form.error_required'
                      ),
                    },
                  ]}
                >
                  <Input
                    placeholder={translateCustomsPricing(
                      'customs_office_form.placeholder'
                    )}
                  />
                </Form.Item>
              </Col>

              <Col lg={12} span={24}>
                <Form.Item
                  label={translateCustomsPricing('commodity_form.title')}
                  name="commodity"
                  rules={[
                    {
                      required: true,
                      message: translateCustomsPricing(
                        'commodity_form.error_required'
                      ),
                    },
                  ]}
                >
                  <Select
                    options={[
                      {
                        value: 'Commodity 1',
                        label: 'Commodity 1',
                      },
                      {
                        value: 'Commodity 2',
                        label: 'Commodity 2',
                      },
                    ]}
                  />
                </Form.Item>
              </Col>

              <Col lg={12} span={24}>
                <Form.Item
                  label={translateCustomsPricing('router_form.title')}
                  name="routerForm"
                  rules={[
                    {
                      required: true,
                      message: translateCustomsPricing(
                        'router_form.error_required'
                      ),
                    },
                  ]}
                >
                  <Select
                    options={[
                      {
                        value: 'Router 1',
                        label: 'Router 1',
                      },
                      {
                        value: 'Router 2',
                        label: 'Router 2',
                      },
                    ]}
                  />
                </Form.Item>
              </Col>

              <Col lg={12} span={24}>
                <Form.Item
                  label={translateCustomsPricing('customs_type_form.title')}
                  name="customsType"
                  rules={[
                    {
                      required: true,
                      message: translateCustomsPricing(
                        'customs_type_form.error_required'
                      ),
                    },
                  ]}
                >
                  <Select
                    options={[
                      {
                        value: 'Customs Type 1',
                        label: 'Customs Type 1',
                      },
                      {
                        value: 'Customs Type 2',
                        label: 'Customs Type 2',
                      },
                    ]}
                  />
                </Form.Item>
              </Col>

              <Col lg={12} span={24}>
                <Form.Item
                  label={translateCustomsPricing('quantity_form.title')}
                  name="quantity"
                  rules={[
                    {
                      required: true,
                      message: translateCustomsPricing(
                        'quantity_form.error_required'
                      ),
                    },
                  ]}
                >
                  <Input
                    placeholder={translateCustomsPricing(
                      'quantity_form.placeholder'
                    )}
                  />
                </Form.Item>
              </Col>

              <Col lg={7} span={24}>
                <Form.Item
                  label={translateCustomsPricing('service_type_form.title')}
                  name="serviceType"
                  rules={[
                    {
                      required: true,
                      message: translateCustomsPricing(
                        'service_type_form.error_required'
                      ),
                    },
                  ]}
                >
                  <Select
                    options={[
                      {
                        value: 'Fee group 1',
                        label: 'Fee group 1',
                      },
                      {
                        value: 'Fee group 2',
                        label: 'Fee group 2',
                      },
                    ]}
                  />
                </Form.Item>
              </Col>

              <Col lg={5} span={24}>
                <Form.Item
                  label={translateCustomsPricing('status')}
                  name="status"
                  rules={[
                    {
                      required: true,
                      message: translateCustomsPricing('status_placeholder'),
                    },
                  ]}
                >
                  <Select
                    options={[
                      {
                        value: 'Active',
                        label: 'Active',
                      },
                      {
                        value: 'Deactivate',
                        label: 'Deactivate',
                      },
                    ]}
                  />
                </Form.Item>
              </Col>

              <Col lg={7} span={24}>
                <Form.Item
                  label={translateCustomsPricing('updater')}
                  name="updater"
                >
                  <Input
                    placeholder={translateCustomsPricing('updater_placeholder')}
                    disabled
                  />
                </Form.Item>
              </Col>

              <Col lg={5} span={24}>
                <Form.Item
                  label={translateCustomsPricing('modify_date')}
                  name="modify_date"
                >
                  <Input
                    placeholder={translateCustomsPricing(
                      'modify_date_placeholder'
                    )}
                    disabled
                  />
                </Form.Item>
              </Col>

              <Col lg={7} span={24}>
                <Form.Item
                  label={translateCustomsPricing('creator')}
                  name="creator"
                >
                  <Input
                    placeholder={translateCustomsPricing('creator_placeholder')}
                    disabled
                  />
                </Form.Item>
              </Col>

              <Col lg={5} span={24}>
                <Form.Item
                  label={translateCustomsPricing('date_created')}
                  name="date_created"
                >
                  <Input
                    placeholder={translateCustomsPricing(
                      'date_created_placeholder'
                    )}
                    disabled
                  />
                </Form.Item>
              </Col>
            </Row>
          </CollapseCard>

          <CollapseCard
            title={translateCustomsPricing('title_customs_other_fee')}
            style={{ marginBottom: '24px' }}
            defaultActive={true}
          >
            <Row gutter={16}>
              <Col lg={24} span={24}>
                <Card style={{ marginBottom: 24 }}>
                  <Table columns={columnsCustomOtherFee} dataSource={data} />
                </Card>
              </Col>
            </Row>
          </CollapseCard>

          <Card>
            <Row gutter={12}>
              <Col>
                <Button onClick={() => router.push(ROUTERS.SEA_QUOTATION)}>
                  Cancel
                </Button>
              </Col>
              <Col>
                <Button type="primary" htmlType="submit">
                  Save
                </Button>
              </Col>
            </Row>
          </Card>
        </Form>
      </ConfigProvider>
    </div>
  );
}
