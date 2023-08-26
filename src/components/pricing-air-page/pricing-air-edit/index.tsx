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

export default function EditPricingAir() {
  const router = useRouter();
  const [form] = Form.useForm<FormValues>();
  const { id } = router.query;
  const { translate: translatePricingAir } = useI18n('pricingAir');
  const dateFormat = 'YYYY/MM/DD';

  useEffect(() => {
    if (!id) return;
  }, [router, form]);

  const onFinish = (formValues: FormValues) => {
    return formValues;
  };

  const data: readonly any[] | undefined = [];

  const columnsAirFreight: ColumnsType<DataType> = [
    {
      title: translatePricingAir('min_qty'),
      width: 150,
      dataIndex: 'minQty',
      key: 'minQty',
      align: 'center',
    },
    {
      title: translatePricingAir('min_less10'),
      width: 150,
      dataIndex: 'minLess10',
      key: 'minLess10',
      align: 'center',
    },
    {
      title: translatePricingAir('less45'),
      width: 150,
      dataIndex: 'less45',
      key: 'less45',
      align: 'center',
    },
    {
      title: translatePricingAir('more45'),
      width: 150,
      dataIndex: 'more45',
      key: 'more45',
      align: 'center',
    },
    {
      title: translatePricingAir('more100'),
      width: 150,
      dataIndex: 'more100',
      key: 'more100',
      align: 'center',
    },
    {
      title: translatePricingAir('FSC'),
      width: 150,
      dataIndex: 'FSC',
      key: 'FSC',
      align: 'center',
    },
    {
      title: translatePricingAir('SSC'),
      width: 150,
      dataIndex: 'SSC',
      key: 'SSC',
      align: 'center',
    },
    {
      title: translatePricingAir('GW'),
      width: 150,
      dataIndex: 'GW',
      key: 'GW',
      align: 'center',
    },
  ];

  const columnsLocalChart: ColumnsType<DataType> = [
    {
      title: translatePricingAir('LCLMin'),
      width: 200,
      dataIndex: 'LCLMin',
      key: 'LCLMin',
      align: 'center',
    },
    {
      title: translatePricingAir('LCL'),
      width: 200,
      dataIndex: 'LCL',
      key: 'LCL',
      align: 'center',
    },
    {
      title: translatePricingAir('DC20'),
      width: 200,
      dataIndex: 'DC20',
      key: 'DC20',
      align: 'center',
    },
    {
      title: translatePricingAir('DC40'),
      width: 200,
      dataIndex: 'DC40',
      key: 'DC40',
      align: 'center',
    },
    {
      title: translatePricingAir('HC40'),
      width: 200,
      dataIndex: 'HC40',
      key: 'HC40',
      align: 'center',
    },
    {
      title: translatePricingAir('HC45'),
      width: 200,
      dataIndex: 'HC45',
      key: 'HC45',
      align: 'center',
    },
    {
      title: translatePricingAir('RF20'),
      width: 200,
      dataIndex: 'RF20',
      key: 'RF20',
      align: 'center',
    },
    {
      title: translatePricingAir('RF40'),
      width: 200,
      dataIndex: 'RF40',
      key: 'RF40',
      align: 'center',
    },
    {
      title: translatePricingAir('DB20'),
      width: 200,
      dataIndex: 'DB20',
      key: 'DB20',
      align: 'center',
    },
    {
      title: translatePricingAir('others'),
      width: 200,
      dataIndex: 'others',
      key: 'others',
      align: 'center',
    },
    {
      title: translatePricingAir('type'),
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
                  {translatePricingAir('information_edit_air_pricing')}
                </Title>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col lg={4} span={24}>
                <Form.Item
                  label={translatePricingAir('code')}
                  tooltip={translatePricingAir('code')}
                  name="code"
                  rules={[
                    {
                      required: true,
                      message: translatePricingAir('code_placeholder'),
                    },
                  ]}
                >
                  <Input
                    disabled
                    placeholder={translatePricingAir('code_placeholder')}
                  />
                </Form.Item>
              </Col>

              <Col lg={11} span={24}>
                <Form.Item
                  label={translatePricingAir('origin')}
                  tooltip={translatePricingAir('origin')}
                  name="origin"
                  rules={[
                    {
                      required: true,
                      message: translatePricingAir('origin_placeholder'),
                    },
                  ]}
                >
                  <Input
                    placeholder={translatePricingAir('origin_placeholder')}
                  />
                </Form.Item>
              </Col>

              <Col lg={9} span={24}>
                <Form.Item
                  label={translatePricingAir('destination')}
                  name="destination"
                  rules={[
                    {
                      required: true,
                      message: translatePricingAir('destination_placeholder'),
                    },
                  ]}
                >
                  <Input
                    placeholder={translatePricingAir('destination_placeholder')}
                  />
                </Form.Item>
              </Col>

              <Col lg={8} span={24}>
                <Form.Item
                  label={translatePricingAir('vendor')}
                  name="vendor"
                  rules={[
                    {
                      required: true,
                      message: translatePricingAir('vendor_placeholder'),
                    },
                  ]}
                >
                  <Input
                    placeholder={translatePricingAir('vendor_placeholder')}
                  />
                </Form.Item>
              </Col>

              <Col lg={7} span={24}>
                <Form.Item
                  label={translatePricingAir('carrier')}
                  name="carrier"
                  rules={[
                    {
                      required: true,
                      message: translatePricingAir('carrier_placeholder'),
                    },
                  ]}
                >
                  <Input
                    placeholder={translatePricingAir('carrier_placeholder')}
                  />
                </Form.Item>
              </Col>

              <Col lg={9} span={24}>
                <Form.Item
                  label={translatePricingAir('curr')}
                  name="curr"
                  rules={[
                    {
                      required: true,
                      message: translatePricingAir('curr_placeholder'),
                    },
                  ]}
                >
                  <Input
                    placeholder={translatePricingAir('curr_placeholder')}
                  />
                </Form.Item>
              </Col>

              <Col lg={4} span={24}>
                <Form.Item
                  label={translatePricingAir('date_update')}
                  name="date_update"
                  rules={[
                    {
                      required: true,
                      message: translatePricingAir('date_update_placeholder'),
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

              <Col lg={4} span={24}>
                <Form.Item
                  label={translatePricingAir('validity')}
                  name="validity"
                  rules={[
                    {
                      required: true,
                      message: translatePricingAir('validity_placeholder'),
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

              <Col lg={16} span={24}>
                <Form.Item
                  label={translatePricingAir('tt')}
                  name="tt"
                  rules={[
                    {
                      required: true,
                      message: translatePricingAir('tt_placeholder'),
                    },
                  ]}
                >
                  <Input placeholder={translatePricingAir('tt_placeholder')} />
                </Form.Item>
              </Col>

              <Col lg={8} span={24}>
                <Form.Item
                  label={translatePricingAir('freq')}
                  name="freq"
                  rules={[
                    {
                      required: true,
                      message: translatePricingAir('freq_placeholder'),
                    },
                  ]}
                >
                  <Input
                    placeholder={translatePricingAir('freq_placeholder')}
                  />
                </Form.Item>
              </Col>

              <Col lg={7} span={24}>
                <Form.Item
                  label={translatePricingAir('cut_off')}
                  name="cut_off"
                  rules={[
                    {
                      required: true,
                      message: translatePricingAir('cut_off_placeholder'),
                    },
                  ]}
                >
                  <Input
                    placeholder={translatePricingAir('cut_off_placeholder')}
                  />
                </Form.Item>
              </Col>

              <Col lg={9} span={24}>
                <Form.Item
                  label={translatePricingAir('modify')}
                  name="modify"
                  rules={[
                    {
                      required: true,
                      message: translatePricingAir('modify_placeholder'),
                    },
                  ]}
                >
                  <Input
                    placeholder={translatePricingAir('modify_placeholder')}
                  />
                </Form.Item>
              </Col>

              <Col lg={8} span={24}>
                <Form.Item
                  label={translatePricingAir('status')}
                  name="status"
                  rules={[
                    {
                      required: true,
                      message: translatePricingAir('status_placeholder'),
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
                        value: 'Draft',
                        label: 'Draft',
                      },
                    ]}
                  />
                </Form.Item>
              </Col>

              <Col lg={5} span={24}>
                <Form.Item
                  label={translatePricingAir('date_created')}
                  name="date_created"
                >
                  <Input
                    placeholder={translatePricingAir(
                      'date_created_placeholder'
                    )}
                    disabled
                  />
                </Form.Item>
              </Col>

              <Col lg={11} span={24}>
                <Form.Item
                  label={translatePricingAir('creator')}
                  name="creator"
                >
                  <Input
                    placeholder={translatePricingAir('creator_placeholder')}
                    disabled
                  />
                </Form.Item>
              </Col>
            </Row>
          </Card>

          <CollapseCard
            title={translatePricingAir('title_air_freight')}
            style={{ marginBottom: '24px' }}
            defaultActive={true}
          >
            <Row gutter={16}>
              <Col lg={24} span={24}>
                <Card style={{ marginBottom: 24 }}>
                  <Table columns={columnsAirFreight} dataSource={data} />
                </Card>
              </Col>
            </Row>
          </CollapseCard>

          <CollapseCard
            title={translatePricingAir('title_local_chart')}
            style={{ marginBottom: '24px' }}
            defaultActive={true}
          >
            <Row gutter={16}>
              <Col lg={24} span={24}>
                <Card style={{ marginBottom: 24 }}>
                  <Table columns={columnsLocalChart} dataSource={data} />
                </Card>
              </Col>
            </Row>
          </CollapseCard>

          <Card>
            <Row gutter={12}>
              <Col>
                <Button onClick={() => router.push(ROUTERS.AIR_PRICING)}>
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
