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

export default function EditSeaQuotation() {
  const router = useRouter();
  const [form] = Form.useForm<FormValues>();
  const { id } = router.query;
  const { translate: translateSeaQuotation } = useI18n('seaQuotation');
  const dateFormat = 'YYYY/MM/DD';

  useEffect(() => {
    if (!id) return;
  }, [router, form]);

  const onFinish = (formValues: FormValues) => {
    return formValues;
  };

  const data: readonly any[] | undefined = [];

  const columnsSeaFreight: ColumnsType<DataType> = [
    {
      title: translateSeaQuotation('LCLMin'),
      width: 200,
      dataIndex: 'LCLMin',
      key: 'LCLMin',
      align: 'center',
    },
    {
      title: translateSeaQuotation('LCL'),
      width: 200,
      dataIndex: 'LCL',
      key: 'LCL',
      align: 'center',
    },
    {
      title: translateSeaQuotation('DC20'),
      width: 200,
      dataIndex: 'DC20',
      key: 'DC20',
      align: 'center',
    },
    {
      title: translateSeaQuotation('DC40'),
      width: 200,
      dataIndex: 'DC40',
      key: 'DC40',
      align: 'center',
    },
    {
      title: translateSeaQuotation('HC40'),
      width: 200,
      dataIndex: 'HC40',
      key: 'HC40',
      align: 'center',
    },
    {
      title: translateSeaQuotation('HC45'),
      width: 200,
      dataIndex: 'HC45',
      key: 'HC45',
      align: 'center',
    },
    {
      title: translateSeaQuotation('RF20'),
      width: 200,
      dataIndex: 'RF20',
      key: 'RF20',
      align: 'center',
    },
    {
      title: translateSeaQuotation('RF40'),
      width: 200,
      dataIndex: 'RF40',
      key: 'RF40',
      align: 'center',
    },
    {
      title: translateSeaQuotation('DB20'),
      width: 200,
      dataIndex: 'DB20',
      key: 'DB20',
      align: 'center',
    },
    {
      title: translateSeaQuotation('others'),
      width: 200,
      dataIndex: 'others',
      key: 'others',
      align: 'center',
    },
    {
      title: translateSeaQuotation('type'),
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
                  {translateSeaQuotation('information_edit_sea_pricing')}
                </Title>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col lg={12} span={24}>
                <Form.Item
                  label={translateSeaQuotation('POL')}
                  tooltip={translateSeaQuotation('POL')}
                  name="POL"
                  rules={[
                    {
                      required: true,
                      message: translateSeaQuotation('POL_placeholder'),
                    },
                  ]}
                >
                  <Input
                    placeholder={translateSeaQuotation('POL_placeholder')}
                  />
                </Form.Item>
              </Col>

              <Col lg={12} span={24}>
                <Form.Item
                  label={translateSeaQuotation('POD')}
                  tooltip={translateSeaQuotation('POD')}
                  name="POD"
                  rules={[
                    {
                      required: true,
                      message: translateSeaQuotation('POD_placeholder'),
                    },
                  ]}
                >
                  <Input
                    placeholder={translateSeaQuotation('POD_placeholder')}
                  />
                </Form.Item>
              </Col>

              <Col lg={12} span={24}>
                <Form.Item
                  label={translateSeaQuotation('destination')}
                  name="destination"
                  rules={[
                    {
                      required: true,
                      message: translateSeaQuotation('destination_placeholder'),
                    },
                  ]}
                >
                  <Input
                    placeholder={translateSeaQuotation(
                      'destination_placeholder'
                    )}
                  />
                </Form.Item>
              </Col>

              <Col lg={5} span={24}>
                <Form.Item
                  label={translateSeaQuotation('country')}
                  name="country"
                  rules={[
                    {
                      required: true,
                      message: translateSeaQuotation('country_placeholder'),
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
                  label={translateSeaQuotation('customerID')}
                  name="customerID"
                  rules={[
                    {
                      required: true,
                      message: translateSeaQuotation('customerID_placeholder'),
                    },
                  ]}
                >
                  <Input
                    placeholder={translateSeaQuotation(
                      'customerID_placeholder'
                    )}
                  />
                </Form.Item>
              </Col>

              <Col lg={8} span={24}>
                <Form.Item
                  label={translateSeaQuotation('carrier')}
                  name="carrier"
                  rules={[
                    {
                      required: true,
                      message: translateSeaQuotation('carrier_placeholder'),
                    },
                  ]}
                >
                  <Input
                    placeholder={translateSeaQuotation('carrier_placeholder')}
                  />
                </Form.Item>
              </Col>

              <Col lg={9} span={24}>
                <Form.Item
                  label={translateSeaQuotation('service')}
                  name="service"
                  rules={[
                    {
                      required: true,
                      message: translateSeaQuotation('service_placeholder'),
                    },
                  ]}
                >
                  <Input
                    placeholder={translateSeaQuotation('service_placeholder')}
                  />
                </Form.Item>
              </Col>

              <Col lg={7} span={24}>
                <Form.Item
                  label={translateSeaQuotation('commodity')}
                  name="commodity"
                  rules={[
                    {
                      required: true,
                      message: translateSeaQuotation('commodity_placeholder'),
                    },
                  ]}
                >
                  <Input
                    placeholder={translateSeaQuotation('commodity_placeholder')}
                  />
                </Form.Item>
              </Col>

              <Col lg={4} span={24}>
                <Form.Item
                  label={translateSeaQuotation('currency')}
                  name="currency"
                  rules={[
                    {
                      required: true,
                      message: translateSeaQuotation('currency_placeholder'),
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
                  label={translateSeaQuotation('vat')}
                  name="vat"
                  rules={[
                    {
                      required: true,
                      message: translateSeaQuotation('vat_placeholder'),
                    },
                  ]}
                >
                  <Input
                    placeholder={translateSeaQuotation('vat_placeholder')}
                  />
                </Form.Item>
              </Col>

              <Col lg={4} span={24}>
                <Form.Item
                  label={translateSeaQuotation('effect_date')}
                  name="effect_date"
                  rules={[
                    {
                      required: true,
                      message: translateSeaQuotation('effect_date_placeholder'),
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
                  label={translateSeaQuotation('validity')}
                  name="validity"
                  rules={[
                    {
                      required: true,
                      message: translateSeaQuotation('validity_placeholder'),
                    },
                  ]}
                >
                  <Input
                    placeholder={translateSeaQuotation('validity_placeholder')}
                  />
                </Form.Item>
              </Col>

              <Col lg={8} span={24}>
                <Form.Item
                  label={translateSeaQuotation('freq')}
                  name="freq"
                  rules={[
                    {
                      required: true,
                      message: translateSeaQuotation('freq_placeholder'),
                    },
                  ]}
                >
                  <Input
                    placeholder={translateSeaQuotation('freq_placeholder')}
                  />
                </Form.Item>
              </Col>

              <Col lg={8} span={24}>
                <Form.Item
                  label={translateSeaQuotation('Cutoff')}
                  name="Cutoff"
                  rules={[
                    {
                      required: true,
                      message: translateSeaQuotation('Cutoff_placeholder'),
                    },
                  ]}
                >
                  <Input
                    placeholder={translateSeaQuotation('Cutoff_placeholder')}
                  />
                </Form.Item>
              </Col>

              <Col lg={8} span={24}>
                <Form.Item
                  label={translateSeaQuotation('TT')}
                  name="TT"
                  rules={[
                    {
                      required: true,
                      message: translateSeaQuotation('TT_placeholder'),
                    },
                  ]}
                >
                  <Input
                    placeholder={translateSeaQuotation('TT_placeholder')}
                  />
                </Form.Item>
              </Col>

              <Col lg={8} span={24}>
                <Form.Item
                  label={translateSeaQuotation('inl_addon')}
                  name="inl_addon"
                  rules={[
                    {
                      required: true,
                      message: translateSeaQuotation('inl_addon_placeholder'),
                    },
                  ]}
                >
                  <Input
                    placeholder={translateSeaQuotation('inl_addon_placeholder')}
                  />
                </Form.Item>
              </Col>

              <Col lg={8} span={24}>
                <Form.Item
                  label={translateSeaQuotation('empty_return')}
                  name="empty_return"
                  rules={[
                    {
                      required: true,
                      message: translateSeaQuotation(
                        'empty_return_placeholder'
                      ),
                    },
                  ]}
                >
                  <Input
                    placeholder={translateSeaQuotation(
                      'empty_return_placeholder'
                    )}
                  />
                </Form.Item>
              </Col>

              <Col lg={8} span={24}>
                <Form.Item
                  label={translateSeaQuotation('amend')}
                  name="amend"
                  rules={[
                    {
                      required: true,
                      message: translateSeaQuotation('amend_placeholder'),
                    },
                  ]}
                >
                  <Input
                    placeholder={translateSeaQuotation('amend_placeholder')}
                  />
                </Form.Item>
              </Col>

              <Col lg={8} span={24}>
                <Form.Item
                  label={translateSeaQuotation('DEM')}
                  name="DEM"
                  rules={[
                    {
                      required: true,
                      message: translateSeaQuotation('DEM_placeholder'),
                    },
                  ]}
                >
                  <Input
                    placeholder={translateSeaQuotation('DEM_placeholder')}
                  />
                </Form.Item>
              </Col>

              <Col lg={8} span={24}>
                <Form.Item
                  label={translateSeaQuotation('DET')}
                  name="DET"
                  rules={[
                    {
                      required: true,
                      message: translateSeaQuotation('DET_placeholder'),
                    },
                  ]}
                >
                  <Input
                    placeholder={translateSeaQuotation('DET_placeholder')}
                  />
                </Form.Item>
              </Col>

              <Col lg={8} span={24}>
                <Form.Item
                  label={translateSeaQuotation('STO')}
                  name="STO"
                  rules={[
                    {
                      required: true,
                      message: translateSeaQuotation('STO_placeholder'),
                    },
                  ]}
                >
                  <Input
                    placeholder={translateSeaQuotation('STO_placeholder')}
                  />
                </Form.Item>
              </Col>

              <Col lg={6} span={24}>
                <Form.Item
                  label={translateSeaQuotation('status')}
                  name="status"
                  rules={[
                    {
                      required: true,
                      message: translateSeaQuotation('status_placeholder'),
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
                  label={translateSeaQuotation('modify_date')}
                  name="modify_date"
                >
                  <Input
                    placeholder={translateSeaQuotation(
                      'modify_date_placeholder'
                    )}
                    disabled
                  />
                </Form.Item>
              </Col>

              <Col lg={5} span={24}>
                <Form.Item
                  label={translateSeaQuotation('date_created')}
                  name="date_created"
                >
                  <Input
                    placeholder={translateSeaQuotation(
                      'date_created_placeholder'
                    )}
                    disabled
                  />
                </Form.Item>
              </Col>

              <Col lg={8} span={24}>
                <Form.Item
                  label={translateSeaQuotation('creator')}
                  name="creator"
                >
                  <Input
                    placeholder={translateSeaQuotation('creator_placeholder')}
                    disabled
                  />
                </Form.Item>
              </Col>
            </Row>
          </Card>

          <CollapseCard
            title={translateSeaQuotation('title_sea_freight')}
            style={{ marginBottom: '24px' }}
            defaultActive={true}
          >
            <Row gutter={16}>
              <Col lg={24} span={24}>
                <Card style={{ marginBottom: 24 }}>
                  <Table columns={columnsSeaFreight} dataSource={data} />
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
