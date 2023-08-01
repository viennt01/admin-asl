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

export default function EditPricingTrucking() {
  const router = useRouter();
  const [form] = Form.useForm<FormValues>();
  const { id } = router.query;
  const { translate: translatePricingTrucking } = useI18n('pricingTrucking');
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
                  {translatePricingTrucking(
                    'information_edit_trucking_pricing'
                  )}
                </Title>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col lg={12} span={24}>
                <Form.Item
                  label={translatePricingTrucking('POL')}
                  tooltip={translatePricingTrucking('POL')}
                  name="POL"
                  rules={[
                    {
                      required: true,
                      message: translatePricingTrucking('POL_placeholder'),
                    },
                  ]}
                >
                  <Input
                    placeholder={translatePricingTrucking('POL_placeholder')}
                  />
                </Form.Item>
              </Col>

              <Col lg={12} span={24}>
                <Form.Item
                  label={translatePricingTrucking('POD')}
                  tooltip={translatePricingTrucking('POD')}
                  name="POD"
                  rules={[
                    {
                      required: true,
                      message: translatePricingTrucking('POD_placeholder'),
                    },
                  ]}
                >
                  <Input
                    placeholder={translatePricingTrucking('POD_placeholder')}
                  />
                </Form.Item>
              </Col>

              <Col lg={12} span={24}>
                <Form.Item
                  label={translatePricingTrucking('destination')}
                  name="destination"
                  rules={[
                    {
                      required: true,
                      message: translatePricingTrucking(
                        'destination_placeholder'
                      ),
                    },
                  ]}
                >
                  <Input
                    placeholder={translatePricingTrucking(
                      'destination_placeholder'
                    )}
                  />
                </Form.Item>
              </Col>

              <Col lg={5} span={24}>
                <Form.Item
                  label={translatePricingTrucking('country')}
                  name="country"
                  rules={[
                    {
                      required: true,
                      message: translatePricingTrucking('country_placeholder'),
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
                  label={translatePricingTrucking('vendor')}
                  name="vendor"
                  rules={[
                    {
                      required: true,
                      message: translatePricingTrucking('vendor_placeholder'),
                    },
                  ]}
                >
                  <Input
                    placeholder={translatePricingTrucking('vendor_placeholder')}
                  />
                </Form.Item>
              </Col>

              <Col lg={8} span={24}>
                <Form.Item
                  label={translatePricingTrucking('carrier')}
                  name="carrier"
                  rules={[
                    {
                      required: true,
                      message: translatePricingTrucking('carrier_placeholder'),
                    },
                  ]}
                >
                  <Input
                    placeholder={translatePricingTrucking(
                      'carrier_placeholder'
                    )}
                  />
                </Form.Item>
              </Col>

              <Col lg={9} span={24}>
                <Form.Item
                  label={translatePricingTrucking('service')}
                  name="service"
                  rules={[
                    {
                      required: true,
                      message: translatePricingTrucking('service_placeholder'),
                    },
                  ]}
                >
                  <Input
                    placeholder={translatePricingTrucking(
                      'service_placeholder'
                    )}
                  />
                </Form.Item>
              </Col>

              <Col lg={7} span={24}>
                <Form.Item
                  label={translatePricingTrucking('commodity')}
                  name="commodity"
                  rules={[
                    {
                      required: true,
                      message: translatePricingTrucking(
                        'commodity_placeholder'
                      ),
                    },
                  ]}
                >
                  <Input
                    placeholder={translatePricingTrucking(
                      'commodity_placeholder'
                    )}
                  />
                </Form.Item>
              </Col>

              <Col lg={12} span={24}>
                <Form.Item
                  label={translatePricingTrucking('LCLMin')}
                  name="LCLMin"
                  rules={[
                    {
                      required: true,
                      message: translatePricingTrucking('LCLMin_placeholder'),
                    },
                  ]}
                >
                  <Input
                    placeholder={translatePricingTrucking('LCLMin_placeholder')}
                  />
                </Form.Item>
              </Col>

              <Col lg={12} span={24}>
                <Form.Item
                  label={translatePricingTrucking('LCL')}
                  name="LCL"
                  rules={[
                    {
                      required: true,
                      message: translatePricingTrucking('LCL_placeholder'),
                    },
                  ]}
                >
                  <Input
                    placeholder={translatePricingTrucking('LCL_placeholder')}
                  />
                </Form.Item>
              </Col>

              <Col lg={8} span={24}>
                <Form.Item
                  label={translatePricingTrucking('DC20')}
                  name="DC20"
                  rules={[
                    {
                      required: true,
                      message: translatePricingTrucking('DC20_placeholder'),
                    },
                  ]}
                >
                  <Input
                    placeholder={translatePricingTrucking('DC20_placeholder')}
                  />
                </Form.Item>
              </Col>

              <Col lg={8} span={24}>
                <Form.Item
                  label={translatePricingTrucking('DC40')}
                  name="DC40"
                  rules={[
                    {
                      required: true,
                      message: translatePricingTrucking('DC40_placeholder'),
                    },
                  ]}
                >
                  <Input
                    placeholder={translatePricingTrucking('DC40_placeholder')}
                  />
                </Form.Item>
              </Col>

              <Col lg={8} span={24}>
                <Form.Item
                  label={translatePricingTrucking('DB20')}
                  name="DB20"
                  rules={[
                    {
                      required: true,
                      message: translatePricingTrucking('DB20_placeholder'),
                    },
                  ]}
                >
                  <Input
                    placeholder={translatePricingTrucking('DB20_placeholder')}
                  />
                </Form.Item>
              </Col>

              <Col lg={8} span={24}>
                <Form.Item
                  label={translatePricingTrucking('RF20')}
                  name="RF20"
                  rules={[
                    {
                      required: true,
                      message: translatePricingTrucking('RF20_placeholder'),
                    },
                  ]}
                >
                  <Input
                    placeholder={translatePricingTrucking('RF20_placeholder')}
                  />
                </Form.Item>
              </Col>

              <Col lg={8} span={24}>
                <Form.Item
                  label={translatePricingTrucking('RF40')}
                  name="RF40"
                  rules={[
                    {
                      required: true,
                      message: translatePricingTrucking('RF40_placeholder'),
                    },
                  ]}
                >
                  <Input
                    placeholder={translatePricingTrucking('RF40_placeholder')}
                  />
                </Form.Item>
              </Col>

              <Col lg={8} span={24}>
                <Form.Item
                  label={translatePricingTrucking('HC40')}
                  name="HC40"
                  rules={[
                    {
                      required: true,
                      message: translatePricingTrucking('HC40_placeholder'),
                    },
                  ]}
                >
                  <Input
                    placeholder={translatePricingTrucking('HC40_placeholder')}
                  />
                </Form.Item>
              </Col>

              <Col lg={8} span={24}>
                <Form.Item
                  label={translatePricingTrucking('HC45')}
                  name="HC45"
                  rules={[
                    {
                      required: true,
                      message: translatePricingTrucking('HC45_placeholder'),
                    },
                  ]}
                >
                  <Input
                    placeholder={translatePricingTrucking('HC45_placeholder')}
                  />
                </Form.Item>
              </Col>

              <Col lg={16} span={24}>
                <Form.Item
                  label={translatePricingTrucking('others')}
                  name="others"
                  rules={[
                    {
                      required: true,
                      message: translatePricingTrucking('others_placeholder'),
                    },
                  ]}
                >
                  <Input
                    placeholder={translatePricingTrucking('others_placeholder')}
                  />
                </Form.Item>
              </Col>

              <Col lg={8} span={24}>
                <Form.Item
                  label={translatePricingTrucking('type')}
                  name="type"
                  rules={[
                    {
                      required: true,
                      message: translatePricingTrucking('type_placeholder'),
                    },
                  ]}
                >
                  <Input
                    placeholder={translatePricingTrucking('type_placeholder')}
                  />
                </Form.Item>
              </Col>

              <Col lg={4} span={24}>
                <Form.Item
                  label={translatePricingTrucking('currency')}
                  name="currency"
                  rules={[
                    {
                      required: true,
                      message: translatePricingTrucking('currency_placeholder'),
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
                  label={translatePricingTrucking('vat')}
                  name="vat"
                  rules={[
                    {
                      required: true,
                      message: translatePricingTrucking('vat_placeholder'),
                    },
                  ]}
                >
                  <Input
                    placeholder={translatePricingTrucking('vat_placeholder')}
                  />
                </Form.Item>
              </Col>

              <Col lg={4} span={24}>
                <Form.Item
                  label={translatePricingTrucking('effect_date')}
                  name="effect_date"
                  rules={[
                    {
                      required: true,
                      message: translatePricingTrucking(
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
                  label={translatePricingTrucking('validity')}
                  name="validity"
                  rules={[
                    {
                      required: true,
                      message: translatePricingTrucking('validity_placeholder'),
                    },
                  ]}
                >
                  <Input
                    placeholder={translatePricingTrucking(
                      'validity_placeholder'
                    )}
                  />
                </Form.Item>
              </Col>

              <Col lg={8} span={24}>
                <Form.Item
                  label={translatePricingTrucking('freq')}
                  name="freq"
                  rules={[
                    {
                      required: true,
                      message: translatePricingTrucking('freq_placeholder'),
                    },
                  ]}
                >
                  <Input
                    placeholder={translatePricingTrucking('freq_placeholder')}
                  />
                </Form.Item>
              </Col>

              <Col lg={8} span={24}>
                <Form.Item
                  label={translatePricingTrucking('Cutoff')}
                  name="Cutoff"
                  rules={[
                    {
                      required: true,
                      message: translatePricingTrucking('Cutoff_placeholder'),
                    },
                  ]}
                >
                  <Input
                    placeholder={translatePricingTrucking('Cutoff_placeholder')}
                  />
                </Form.Item>
              </Col>

              <Col lg={8} span={24}>
                <Form.Item
                  label={translatePricingTrucking('TT')}
                  name="TT"
                  rules={[
                    {
                      required: true,
                      message: translatePricingTrucking('TT_placeholder'),
                    },
                  ]}
                >
                  <Input
                    placeholder={translatePricingTrucking('TT_placeholder')}
                  />
                </Form.Item>
              </Col>

              <Col lg={8} span={24}>
                <Form.Item
                  label={translatePricingTrucking('inl_addon')}
                  name="inl_addon"
                  rules={[
                    {
                      required: true,
                      message: translatePricingTrucking(
                        'inl_addon_placeholder'
                      ),
                    },
                  ]}
                >
                  <Input
                    placeholder={translatePricingTrucking(
                      'inl_addon_placeholder'
                    )}
                  />
                </Form.Item>
              </Col>

              <Col lg={8} span={24}>
                <Form.Item
                  label={translatePricingTrucking('empty_return')}
                  name="empty_return"
                  rules={[
                    {
                      required: true,
                      message: translatePricingTrucking(
                        'empty_return_placeholder'
                      ),
                    },
                  ]}
                >
                  <Input
                    placeholder={translatePricingTrucking(
                      'empty_return_placeholder'
                    )}
                  />
                </Form.Item>
              </Col>

              <Col lg={8} span={24}>
                <Form.Item
                  label={translatePricingTrucking('amend')}
                  name="amend"
                  rules={[
                    {
                      required: true,
                      message: translatePricingTrucking('amend_placeholder'),
                    },
                  ]}
                >
                  <Input
                    placeholder={translatePricingTrucking('amend_placeholder')}
                  />
                </Form.Item>
              </Col>

              <Col lg={8} span={24}>
                <Form.Item
                  label={translatePricingTrucking('DEM')}
                  name="DEM"
                  rules={[
                    {
                      required: true,
                      message: translatePricingTrucking('DEM_placeholder'),
                    },
                  ]}
                >
                  <Input
                    placeholder={translatePricingTrucking('DEM_placeholder')}
                  />
                </Form.Item>
              </Col>

              <Col lg={8} span={24}>
                <Form.Item
                  label={translatePricingTrucking('DET')}
                  name="DET"
                  rules={[
                    {
                      required: true,
                      message: translatePricingTrucking('DET_placeholder'),
                    },
                  ]}
                >
                  <Input
                    placeholder={translatePricingTrucking('DET_placeholder')}
                  />
                </Form.Item>
              </Col>

              <Col lg={8} span={24}>
                <Form.Item
                  label={translatePricingTrucking('STO')}
                  name="STO"
                  rules={[
                    {
                      required: true,
                      message: translatePricingTrucking('STO_placeholder'),
                    },
                  ]}
                >
                  <Input
                    placeholder={translatePricingTrucking('STO_placeholder')}
                  />
                </Form.Item>
              </Col>

              <Col lg={4} span={24}>
                <Form.Item
                  label={translatePricingTrucking('status')}
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
                  label={translatePricingTrucking('modify_date')}
                  name="modify_date"
                >
                  <Input
                    placeholder={translatePricingTrucking(
                      'modify_date_placeholder'
                    )}
                    disabled
                  />
                </Form.Item>
              </Col>

              <Col lg={4} span={24}>
                <Form.Item
                  label={translatePricingTrucking('date_created')}
                  name="date_created"
                >
                  <Input
                    placeholder={translatePricingTrucking(
                      'date_created_placeholder'
                    )}
                    disabled
                  />
                </Form.Item>
              </Col>

              <Col lg={4} span={24}>
                <Form.Item
                  label={translatePricingTrucking('creator')}
                  name="creator"
                >
                  <Input
                    placeholder={translatePricingTrucking(
                      'creator_placeholder'
                    )}
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
