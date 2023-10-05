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
  DatePicker,
  Table,
} from 'antd';
import { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
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

export default function EditTruckingQuotation() {
  const router = useRouter();
  const [form] = Form.useForm<FormValues>();
  const { id } = router.query;
  const { translate: translateTruckingQuotation } =
    useI18n('truckingQuotation');
  const dateFormat = 'YYYY/MM/DD';

  useEffect(() => {
    if (!id) return;
  }, [router, form]);

  const onFinish = (formValues: FormValues) => {
    return formValues;
  };

  const data: readonly any[] | undefined = [];

  const columnstruckingFreight: ColumnsType<DataType> = [
    {
      title: translateTruckingQuotation('LCLMin'),
      width: 200,
      dataIndex: 'LCLMin',
      key: 'LCLMin',
      align: 'center',
    },
    {
      title: translateTruckingQuotation('LCL'),
      width: 200,
      dataIndex: 'LCL',
      key: 'LCL',
      align: 'center',
    },
    {
      title: translateTruckingQuotation('DC20'),
      width: 200,
      dataIndex: 'DC20',
      key: 'DC20',
      align: 'center',
    },
    {
      title: translateTruckingQuotation('DC40'),
      width: 200,
      dataIndex: 'DC40',
      key: 'DC40',
      align: 'center',
    },
    {
      title: translateTruckingQuotation('HC40'),
      width: 200,
      dataIndex: 'HC40',
      key: 'HC40',
      align: 'center',
    },
    {
      title: translateTruckingQuotation('HC45'),
      width: 200,
      dataIndex: 'HC45',
      key: 'HC45',
      align: 'center',
    },
    {
      title: translateTruckingQuotation('RF20'),
      width: 200,
      dataIndex: 'RF20',
      key: 'RF20',
      align: 'center',
    },
    {
      title: translateTruckingQuotation('RF40'),
      width: 200,
      dataIndex: 'RF40',
      key: 'RF40',
      align: 'center',
    },
    {
      title: translateTruckingQuotation('DB20'),
      width: 200,
      dataIndex: 'DB20',
      key: 'DB20',
      align: 'center',
    },
    {
      title: translateTruckingQuotation('others'),
      width: 200,
      dataIndex: 'others',
      key: 'others',
      align: 'center',
    },
    {
      title: translateTruckingQuotation('type'),
      width: 300,
      dataIndex: 'type',
      key: 'type',
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
                  {translateTruckingQuotation(
                    'information_edit_trucking_pricing'
                  )}
                </Title>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col lg={12} span={24}>
                <Form.Item
                  label={translateTruckingQuotation('POL')}
                  tooltip={translateTruckingQuotation('POL')}
                  name="POL"
                  rules={[
                    {
                      required: true,
                      message: translateTruckingQuotation('POL_placeholder'),
                    },
                  ]}
                >
                  <Input
                    placeholder={translateTruckingQuotation('POL_placeholder')}
                  />
                </Form.Item>
              </Col>

              <Col lg={12} span={24}>
                <Form.Item
                  label={translateTruckingQuotation('POD')}
                  tooltip={translateTruckingQuotation('POD')}
                  name="POD"
                  rules={[
                    {
                      required: true,
                      message: translateTruckingQuotation('POD_placeholder'),
                    },
                  ]}
                >
                  <Input
                    placeholder={translateTruckingQuotation('POD_placeholder')}
                  />
                </Form.Item>
              </Col>

              <Col lg={12} span={24}>
                <Form.Item
                  label={translateTruckingQuotation('destination')}
                  name="destination"
                  rules={[
                    {
                      required: true,
                      message: translateTruckingQuotation(
                        'destination_placeholder'
                      ),
                    },
                  ]}
                >
                  <Input
                    placeholder={translateTruckingQuotation(
                      'destination_placeholder'
                    )}
                  />
                </Form.Item>
              </Col>

              <Col lg={5} span={24}>
                <Form.Item
                  label={translateTruckingQuotation('country')}
                  name="country"
                  rules={[
                    {
                      required: true,
                      message: translateTruckingQuotation(
                        'country_placeholder'
                      ),
                    },
                  ]}
                >
                  <Select
                    options={[
                      {
                        value: 'Hải Phòng',
                        label: 'Hải Phòng',
                      },
                      {
                        value: 'Hồ Chí Minh',
                        label: 'Hồ Chí Minh',
                      },
                    ]}
                  />
                </Form.Item>
              </Col>

              <Col lg={7} span={24}>
                <Form.Item
                  label={translateTruckingQuotation('customerID')}
                  name="customerID"
                  rules={[
                    {
                      required: true,
                      message: translateTruckingQuotation(
                        'customerID_placeholder'
                      ),
                    },
                  ]}
                >
                  <Input
                    placeholder={translateTruckingQuotation(
                      'customerID_placeholder'
                    )}
                  />
                </Form.Item>
              </Col>

              <Col lg={8} span={24}>
                <Form.Item
                  label={translateTruckingQuotation('carrier')}
                  name="carrier"
                  rules={[
                    {
                      required: true,
                      message: translateTruckingQuotation(
                        'carrier_placeholder'
                      ),
                    },
                  ]}
                >
                  <Input
                    placeholder={translateTruckingQuotation(
                      'carrier_placeholder'
                    )}
                  />
                </Form.Item>
              </Col>

              <Col lg={9} span={24}>
                <Form.Item
                  label={translateTruckingQuotation('service')}
                  name="service"
                  rules={[
                    {
                      required: true,
                      message: translateTruckingQuotation(
                        'service_placeholder'
                      ),
                    },
                  ]}
                >
                  <Input
                    placeholder={translateTruckingQuotation(
                      'service_placeholder'
                    )}
                  />
                </Form.Item>
              </Col>

              <Col lg={7} span={24}>
                <Form.Item
                  label={translateTruckingQuotation('commodity')}
                  name="commodity"
                  rules={[
                    {
                      required: true,
                      message: translateTruckingQuotation(
                        'commodity_placeholder'
                      ),
                    },
                  ]}
                >
                  <Input
                    placeholder={translateTruckingQuotation(
                      'commodity_placeholder'
                    )}
                  />
                </Form.Item>
              </Col>

              <Col lg={4} span={24}>
                <Form.Item
                  label={translateTruckingQuotation('currency')}
                  name="currency"
                  rules={[
                    {
                      required: true,
                      message: translateTruckingQuotation(
                        'currency_placeholder'
                      ),
                    },
                  ]}
                >
                  <Select
                    options={[
                      {
                        value: 'USD',
                        label: 'USD',
                      },
                      {
                        value: 'VND',
                        label: 'VND',
                      },
                    ]}
                  />
                </Form.Item>
              </Col>

              <Col lg={8} span={24}>
                <Form.Item
                  label={translateTruckingQuotation('vat')}
                  name="vat"
                  rules={[
                    {
                      required: true,
                      message: translateTruckingQuotation('vat_placeholder'),
                    },
                  ]}
                >
                  <Input
                    placeholder={translateTruckingQuotation('vat_placeholder')}
                  />
                </Form.Item>
              </Col>

              <Col lg={4} span={24}>
                <Form.Item
                  label={translateTruckingQuotation('effect_date')}
                  name="effect_date"
                  rules={[
                    {
                      required: true,
                      message: translateTruckingQuotation(
                        'effect_date_placeholder'
                      ),
                    },
                  ]}
                >
                  <DatePicker
                    defaultValue={dayjs('2015/01/01', dateFormat)}
                    format={dateFormat}
                    style={{ width: '100%' }}
                  />
                </Form.Item>
              </Col>

              <Col lg={8} span={24}>
                <Form.Item
                  label={translateTruckingQuotation('validity')}
                  name="validity"
                  rules={[
                    {
                      required: true,
                      message: translateTruckingQuotation(
                        'validity_placeholder'
                      ),
                    },
                  ]}
                >
                  <Input
                    placeholder={translateTruckingQuotation(
                      'validity_placeholder'
                    )}
                  />
                </Form.Item>
              </Col>

              <Col lg={8} span={24}>
                <Form.Item
                  label={translateTruckingQuotation('freq')}
                  name="freq"
                  rules={[
                    {
                      required: true,
                      message: translateTruckingQuotation('freq_placeholder'),
                    },
                  ]}
                >
                  <Input
                    placeholder={translateTruckingQuotation('freq_placeholder')}
                  />
                </Form.Item>
              </Col>

              <Col lg={8} span={24}>
                <Form.Item
                  label={translateTruckingQuotation('Cutoff')}
                  name="Cutoff"
                  rules={[
                    {
                      required: true,
                      message: translateTruckingQuotation('Cutoff_placeholder'),
                    },
                  ]}
                >
                  <Input
                    placeholder={translateTruckingQuotation(
                      'Cutoff_placeholder'
                    )}
                  />
                </Form.Item>
              </Col>

              <Col lg={8} span={24}>
                <Form.Item
                  label={translateTruckingQuotation('TT')}
                  name="TT"
                  rules={[
                    {
                      required: true,
                      message: translateTruckingQuotation('TT_placeholder'),
                    },
                  ]}
                >
                  <Input
                    placeholder={translateTruckingQuotation('TT_placeholder')}
                  />
                </Form.Item>
              </Col>

              <Col lg={8} span={24}>
                <Form.Item
                  label={translateTruckingQuotation('inl_addon')}
                  name="inl_addon"
                  rules={[
                    {
                      required: true,
                      message: translateTruckingQuotation(
                        'inl_addon_placeholder'
                      ),
                    },
                  ]}
                >
                  <Input
                    placeholder={translateTruckingQuotation(
                      'inl_addon_placeholder'
                    )}
                  />
                </Form.Item>
              </Col>

              <Col lg={8} span={24}>
                <Form.Item
                  label={translateTruckingQuotation('empty_return')}
                  name="empty_return"
                  rules={[
                    {
                      required: true,
                      message: translateTruckingQuotation(
                        'empty_return_placeholder'
                      ),
                    },
                  ]}
                >
                  <Input
                    placeholder={translateTruckingQuotation(
                      'empty_return_placeholder'
                    )}
                  />
                </Form.Item>
              </Col>

              <Col lg={8} span={24}>
                <Form.Item
                  label={translateTruckingQuotation('amend')}
                  name="amend"
                  rules={[
                    {
                      required: true,
                      message: translateTruckingQuotation('amend_placeholder'),
                    },
                  ]}
                >
                  <Input
                    placeholder={translateTruckingQuotation(
                      'amend_placeholder'
                    )}
                  />
                </Form.Item>
              </Col>

              <Col lg={8} span={24}>
                <Form.Item
                  label={translateTruckingQuotation('DEM')}
                  name="DEM"
                  rules={[
                    {
                      required: true,
                      message: translateTruckingQuotation('DEM_placeholder'),
                    },
                  ]}
                >
                  <Input
                    placeholder={translateTruckingQuotation('DEM_placeholder')}
                  />
                </Form.Item>
              </Col>

              <Col lg={8} span={24}>
                <Form.Item
                  label={translateTruckingQuotation('DET')}
                  name="DET"
                  rules={[
                    {
                      required: true,
                      message: translateTruckingQuotation('DET_placeholder'),
                    },
                  ]}
                >
                  <Input
                    placeholder={translateTruckingQuotation('DET_placeholder')}
                  />
                </Form.Item>
              </Col>

              <Col lg={8} span={24}>
                <Form.Item
                  label={translateTruckingQuotation('STO')}
                  name="STO"
                  rules={[
                    {
                      required: true,
                      message: translateTruckingQuotation('STO_placeholder'),
                    },
                  ]}
                >
                  <Input
                    placeholder={translateTruckingQuotation('STO_placeholder')}
                  />
                </Form.Item>
              </Col>

              <Col lg={6} span={24}>
                <Form.Item
                  label={translateTruckingQuotation('status')}
                  name="status"
                  rules={[
                    {
                      required: true,
                      message: translateTruckingQuotation('status_placeholder'),
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

              <Col lg={5} span={24}>
                <Form.Item
                  label={translateTruckingQuotation('modify_date')}
                  name="modify_date"
                >
                  <Input
                    placeholder={translateTruckingQuotation(
                      'modify_date_placeholder'
                    )}
                    disabled
                  />
                </Form.Item>
              </Col>

              <Col lg={5} span={24}>
                <Form.Item
                  label={translateTruckingQuotation('date_created')}
                  name="date_created"
                >
                  <Input
                    placeholder={translateTruckingQuotation(
                      'date_created_placeholder'
                    )}
                    disabled
                  />
                </Form.Item>
              </Col>

              <Col lg={8} span={24}>
                <Form.Item
                  label={translateTruckingQuotation('creator')}
                  name="creator"
                >
                  <Input
                    placeholder={translateTruckingQuotation(
                      'creator_placeholder'
                    )}
                    disabled
                  />
                </Form.Item>
              </Col>
            </Row>
          </Card>

          <CollapseCard
            title={translateTruckingQuotation('title_trucking_freight')}
            style={{ marginBottom: '24px' }}
            defaultActive={true}
          >
            <Row gutter={16}>
              <Col lg={24} span={24}>
                <Card style={{ marginBottom: 24 }}>
                  <Table columns={columnstruckingFreight} dataSource={data} />
                </Card>
              </Col>
            </Row>
          </CollapseCard>

          <Card>
            <Row gutter={12}>
              <Col>
                <Button onClick={() => router.push(ROUTERS.TRUCKING_QUOTATION)}>
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
