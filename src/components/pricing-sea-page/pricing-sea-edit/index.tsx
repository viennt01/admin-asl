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
} from 'antd';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useI18n from '@/i18n/useI18N';

export interface FormValues {
  type_of_container: string;
  detail_placeholder: string;
  number_container: string;
}

const { Title } = Typography;

export default function EditPricingSea() {
  const router = useRouter();
  const [form] = Form.useForm<FormValues>();
  const { id } = router.query;
  const { translate: translatePricingSea } = useI18n('pricingSea');
  const dateFormat = 'YYYY/MM/DD';

  useEffect(() => {
    if (!id) return;
  }, [router, form]);

  const onFinish = (formValues: FormValues) => {
    console.log(formValues);
  };

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
                  {translatePricingSea('information_edit_sea_pricing')}
                </Title>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col lg={12} span={24}>
                <Form.Item
                  label={translatePricingSea('POL')}
                  tooltip={translatePricingSea('POL')}
                  name="POL"
                  rules={[
                    {
                      required: true,
                      message: translatePricingSea('POL_placeholder'),
                    },
                  ]}
                >
                  <Input placeholder={translatePricingSea('POL_placeholder')} />
                </Form.Item>
              </Col>

              <Col lg={12} span={24}>
                <Form.Item
                  label={translatePricingSea('POD')}
                  tooltip={translatePricingSea('POD')}
                  name="POD"
                  rules={[
                    {
                      required: true,
                      message: translatePricingSea('POD_placeholder'),
                    },
                  ]}
                >
                  <Input placeholder={translatePricingSea('POD_placeholder')} />
                </Form.Item>
              </Col>

              <Col lg={12} span={24}>
                <Form.Item
                  label={translatePricingSea('destination')}
                  name="destination"
                  rules={[
                    {
                      required: true,
                      message: translatePricingSea('destination_placeholder'),
                    },
                  ]}
                >
                  <Input
                    placeholder={translatePricingSea('destination_placeholder')}
                  />
                </Form.Item>
              </Col>

              <Col lg={5} span={24}>
                <Form.Item
                  label={translatePricingSea('country')}
                  name="country"
                  rules={[
                    {
                      required: true,
                      message: translatePricingSea('country_placeholder'),
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
                  label={translatePricingSea('vendor')}
                  name="vendor"
                  rules={[
                    {
                      required: true,
                      message: translatePricingSea('vendor_placeholder'),
                    },
                  ]}
                >
                  <Input
                    placeholder={translatePricingSea('vendor_placeholder')}
                  />
                </Form.Item>
              </Col>

              <Col lg={8} span={24}>
                <Form.Item
                  label={translatePricingSea('carrier')}
                  name="carrier"
                  rules={[
                    {
                      required: true,
                      message: translatePricingSea('carrier_placeholder'),
                    },
                  ]}
                >
                  <Input
                    placeholder={translatePricingSea('carrier_placeholder')}
                  />
                </Form.Item>
              </Col>

              <Col lg={9} span={24}>
                <Form.Item
                  label={translatePricingSea('service')}
                  name="service"
                  rules={[
                    {
                      required: true,
                      message: translatePricingSea('service_placeholder'),
                    },
                  ]}
                >
                  <Input
                    placeholder={translatePricingSea('service_placeholder')}
                  />
                </Form.Item>
              </Col>

              <Col lg={7} span={24}>
                <Form.Item
                  label={translatePricingSea('commodity')}
                  name="commodity"
                  rules={[
                    {
                      required: true,
                      message: translatePricingSea('commodity_placeholder'),
                    },
                  ]}
                >
                  <Input
                    placeholder={translatePricingSea('commodity_placeholder')}
                  />
                </Form.Item>
              </Col>

              <Col lg={12} span={24}>
                <Form.Item
                  label={translatePricingSea('LCLMin')}
                  name="LCLMin"
                  rules={[
                    {
                      required: true,
                      message: translatePricingSea('LCLMin_placeholder'),
                    },
                  ]}
                >
                  <Input
                    placeholder={translatePricingSea('LCLMin_placeholder')}
                  />
                </Form.Item>
              </Col>

              <Col lg={12} span={24}>
                <Form.Item
                  label={translatePricingSea('LCL')}
                  name="LCL"
                  rules={[
                    {
                      required: true,
                      message: translatePricingSea('LCL_placeholder'),
                    },
                  ]}
                >
                  <Input placeholder={translatePricingSea('LCL_placeholder')} />
                </Form.Item>
              </Col>

              <Col lg={8} span={24}>
                <Form.Item
                  label={translatePricingSea('DC20')}
                  name="DC20"
                  rules={[
                    {
                      required: true,
                      message: translatePricingSea('DC20_placeholder'),
                    },
                  ]}
                >
                  <Input
                    placeholder={translatePricingSea('DC20_placeholder')}
                  />
                </Form.Item>
              </Col>

              <Col lg={8} span={24}>
                <Form.Item
                  label={translatePricingSea('DC40')}
                  name="DC40"
                  rules={[
                    {
                      required: true,
                      message: translatePricingSea('DC40_placeholder'),
                    },
                  ]}
                >
                  <Input
                    placeholder={translatePricingSea('DC40_placeholder')}
                  />
                </Form.Item>
              </Col>

              <Col lg={8} span={24}>
                <Form.Item
                  label={translatePricingSea('DB20')}
                  name="DB20"
                  rules={[
                    {
                      required: true,
                      message: translatePricingSea('DB20_placeholder'),
                    },
                  ]}
                >
                  <Input
                    placeholder={translatePricingSea('DB20_placeholder')}
                  />
                </Form.Item>
              </Col>

              <Col lg={8} span={24}>
                <Form.Item
                  label={translatePricingSea('RF20')}
                  name="RF20"
                  rules={[
                    {
                      required: true,
                      message: translatePricingSea('RF20_placeholder'),
                    },
                  ]}
                >
                  <Input
                    placeholder={translatePricingSea('RF20_placeholder')}
                  />
                </Form.Item>
              </Col>

              <Col lg={8} span={24}>
                <Form.Item
                  label={translatePricingSea('RF40')}
                  name="RF40"
                  rules={[
                    {
                      required: true,
                      message: translatePricingSea('RF40_placeholder'),
                    },
                  ]}
                >
                  <Input
                    placeholder={translatePricingSea('RF40_placeholder')}
                  />
                </Form.Item>
              </Col>

              <Col lg={8} span={24}>
                <Form.Item
                  label={translatePricingSea('HC40')}
                  name="HC40"
                  rules={[
                    {
                      required: true,
                      message: translatePricingSea('HC40_placeholder'),
                    },
                  ]}
                >
                  <Input
                    placeholder={translatePricingSea('HC40_placeholder')}
                  />
                </Form.Item>
              </Col>

              <Col lg={8} span={24}>
                <Form.Item
                  label={translatePricingSea('HC45')}
                  name="HC45"
                  rules={[
                    {
                      required: true,
                      message: translatePricingSea('HC45_placeholder'),
                    },
                  ]}
                >
                  <Input
                    placeholder={translatePricingSea('HC45_placeholder')}
                  />
                </Form.Item>
              </Col>

              <Col lg={16} span={24}>
                <Form.Item
                  label={translatePricingSea('others')}
                  name="others"
                  rules={[
                    {
                      required: true,
                      message: translatePricingSea('others_placeholder'),
                    },
                  ]}
                >
                  <Input
                    placeholder={translatePricingSea('others_placeholder')}
                  />
                </Form.Item>
              </Col>

              <Col lg={8} span={24}>
                <Form.Item
                  label={translatePricingSea('type')}
                  name="type"
                  rules={[
                    {
                      required: true,
                      message: translatePricingSea('type_placeholder'),
                    },
                  ]}
                >
                  <Input
                    placeholder={translatePricingSea('type_placeholder')}
                  />
                </Form.Item>
              </Col>

              <Col lg={4} span={24}>
                <Form.Item
                  label={translatePricingSea('currency')}
                  name="currency"
                  rules={[
                    {
                      required: true,
                      message: translatePricingSea('currency_placeholder'),
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
                  label={translatePricingSea('vat')}
                  name="vat"
                  rules={[
                    {
                      required: true,
                      message: translatePricingSea('vat_placeholder'),
                    },
                  ]}
                >
                  <Input placeholder={translatePricingSea('vat_placeholder')} />
                </Form.Item>
              </Col>

              <Col lg={4} span={24}>
                <Form.Item
                  label={translatePricingSea('effect_date')}
                  name="effect_date"
                  rules={[
                    {
                      required: true,
                      message: translatePricingSea('effect_date_placeholder'),
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
                  label={translatePricingSea('validity')}
                  name="validity"
                  rules={[
                    {
                      required: true,
                      message: translatePricingSea('validity_placeholder'),
                    },
                  ]}
                >
                  <Input
                    placeholder={translatePricingSea('validity_placeholder')}
                  />
                </Form.Item>
              </Col>

              <Col lg={8} span={24}>
                <Form.Item
                  label={translatePricingSea('freq')}
                  name="freq"
                  rules={[
                    {
                      required: true,
                      message: translatePricingSea('freq_placeholder'),
                    },
                  ]}
                >
                  <Input
                    placeholder={translatePricingSea('freq_placeholder')}
                  />
                </Form.Item>
              </Col>

              <Col lg={8} span={24}>
                <Form.Item
                  label={translatePricingSea('Cutoff')}
                  name="Cutoff"
                  rules={[
                    {
                      required: true,
                      message: translatePricingSea('Cutoff_placeholder'),
                    },
                  ]}
                >
                  <Input
                    placeholder={translatePricingSea('Cutoff_placeholder')}
                  />
                </Form.Item>
              </Col>

              <Col lg={8} span={24}>
                <Form.Item
                  label={translatePricingSea('TT')}
                  name="TT"
                  rules={[
                    {
                      required: true,
                      message: translatePricingSea('TT_placeholder'),
                    },
                  ]}
                >
                  <Input placeholder={translatePricingSea('TT_placeholder')} />
                </Form.Item>
              </Col>

              <Col lg={8} span={24}>
                <Form.Item
                  label={translatePricingSea('inl_addon')}
                  name="inl_addon"
                  rules={[
                    {
                      required: true,
                      message: translatePricingSea('inl_addon_placeholder'),
                    },
                  ]}
                >
                  <Input
                    placeholder={translatePricingSea('inl_addon_placeholder')}
                  />
                </Form.Item>
              </Col>

              <Col lg={8} span={24}>
                <Form.Item
                  label={translatePricingSea('empty_return')}
                  name="empty_return"
                  rules={[
                    {
                      required: true,
                      message: translatePricingSea('empty_return_placeholder'),
                    },
                  ]}
                >
                  <Input
                    placeholder={translatePricingSea(
                      'empty_return_placeholder'
                    )}
                  />
                </Form.Item>
              </Col>

              <Col lg={8} span={24}>
                <Form.Item
                  label={translatePricingSea('amend')}
                  name="amend"
                  rules={[
                    {
                      required: true,
                      message: translatePricingSea('amend_placeholder'),
                    },
                  ]}
                >
                  <Input
                    placeholder={translatePricingSea('amend_placeholder')}
                  />
                </Form.Item>
              </Col>

              <Col lg={8} span={24}>
                <Form.Item
                  label={translatePricingSea('DEM')}
                  name="DEM"
                  rules={[
                    {
                      required: true,
                      message: translatePricingSea('DEM_placeholder'),
                    },
                  ]}
                >
                  <Input placeholder={translatePricingSea('DEM_placeholder')} />
                </Form.Item>
              </Col>

              <Col lg={8} span={24}>
                <Form.Item
                  label={translatePricingSea('DET')}
                  name="DET"
                  rules={[
                    {
                      required: true,
                      message: translatePricingSea('DET_placeholder'),
                    },
                  ]}
                >
                  <Input placeholder={translatePricingSea('DET_placeholder')} />
                </Form.Item>
              </Col>

              <Col lg={8} span={24}>
                <Form.Item
                  label={translatePricingSea('STO')}
                  name="STO"
                  rules={[
                    {
                      required: true,
                      message: translatePricingSea('STO_placeholder'),
                    },
                  ]}
                >
                  <Input placeholder={translatePricingSea('STO_placeholder')} />
                </Form.Item>
              </Col>

              <Col lg={4} span={24}>
                <Form.Item
                  label={translatePricingSea('status')}
                  name="status"
                  rules={[
                    {
                      required: true,
                      message: 'Please input type of status',
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

              <Col lg={4} span={24}>
                <Form.Item
                  label={translatePricingSea('modify_date')}
                  name="modify_date"
                >
                  <Input
                    placeholder={translatePricingSea('modify_date_placeholder')}
                    disabled
                  />
                </Form.Item>
              </Col>

              <Col lg={4} span={24}>
                <Form.Item
                  label={translatePricingSea('date_created')}
                  name="date_created"
                >
                  <Input
                    placeholder={translatePricingSea(
                      'date_created_placeholder'
                    )}
                    disabled
                  />
                </Form.Item>
              </Col>

              <Col lg={4} span={24}>
                <Form.Item
                  label={translatePricingSea('creator')}
                  name="creator"
                >
                  <Input
                    placeholder={translatePricingSea('creator_placeholder')}
                    disabled
                  />
                </Form.Item>
              </Col>
            </Row>
          </Card>

          <Card>
            <Row gutter={12}>
              <Col>
                <Button onClick={() => router.push(ROUTERS.PORT)}>
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
