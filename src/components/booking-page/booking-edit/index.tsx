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
  Cascader,
  CascaderProps,
  DatePicker,
  Table,
} from 'antd';
import { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useI18n from '@/i18n/useI18N';
import CollapseCard from '@/components/commons/collapse-card';

interface DataNodeType {
  value: string;
  label: string;
  children?: DataNodeType[];
}
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

const initialValue = {
  type_of_container: '',
  detail_placeholder: '',
  number_container: '',
};

const { Title } = Typography;

export default function EditBooking() {
  const router = useRouter();
  const [form] = Form.useForm<FormValues>();
  const { id } = router.query;
  const dateFormat = 'YYYY/MM/DD';
  const { translate: translateBooking } = useI18n('booking');
  const { translate: translateContainer } = useI18n('container');
  const { translate: translateLocation } = useI18n('location');
  const { translate: translateGoods } = useI18n('goods');

  useEffect(() => {
    if (!id) return;
  }, [router, form]);

  const onFinish = (formValues: FormValues) => {
    return formValues;
  };
  const residences: CascaderProps<DataNodeType>['options'] = [
    {
      value: 'Thành phố Hồ Chí Minh',
      label: 'Thành phố Hồ Chí Minh',
      children: [
        {
          value: 'Gò Vấp',
          label: 'Gò Vấp',
          children: [
            {
              value: 'Phường 1',
              label: 'Phường 1',
            },
          ],
        },
      ],
    },
    {
      value: 'Hà Nội',
      label: 'Hà Nội',
      children: [
        {
          value: 'Huyện Ba Vì',
          label: 'Huyện Ba Vì',
          children: [
            {
              value: 'Xã Ba Trại',
              label: 'Xã Ba Trại',
            },
          ],
        },
      ],
    },
  ];

  const data: readonly any[] | undefined = [];

  const columnsPort: ColumnsType<DataType> = [
    {
      title: translateLocation('code'),
      dataIndex: 'containerCode',
      align: 'center',
    },
    {
      title: translateLocation('name'),
      dataIndex: 'typeOfContainer',
      align: 'center',
    },
    {
      title: translateLocation('quantity_container'),
      dataIndex: 'address',
      align: 'center',
    },
    {
      title: translateLocation('status_capacity'),
      dataIndex: 'containerStatus',
      align: 'center',
    },
    {
      title: translateLocation('country_name'),
      dataIndex: 'rentCost',
      align: 'center',
    },
    {
      title: translateLocation('address'),
      dataIndex: 'price',
      align: 'center',
    },
    {
      title: translateLocation('company'),
      dataIndex: 'supplier',
      align: 'center',
    },
    {
      title: translateLocation('status'),
      dataIndex: 'status',
      align: 'center',
    },
  ];

  const columnsGoods: ColumnsType<DataType> = [
    {
      title: translateGoods('goods_no'),
      dataIndex: 'goodsNo',
      align: 'center',
    },
    {
      title: translateGoods('goods_name'),
      dataIndex: 'goodsName',
      align: 'center',
    },
    {
      title: translateGoods('type_of_goods'),
      dataIndex: 'typeOfGoods',
      align: 'center',
    },
    {
      title: translateGoods('quantity'),
      dataIndex: 'quantity',
      align: 'center',
    },
    {
      title: translateGoods('note'),
      dataIndex: 'note',
      align: 'center',
    },
  ];

  const columnsContainer: ColumnsType<DataType> = [
    {
      title: translateContainer('code'),
      dataIndex: 'containerCode',
      align: 'center',
    },
    {
      title: translateContainer('type_of_container'),
      dataIndex: 'typeOfContainer',
      align: 'center',
    },
    {
      title: translateContainer('location'),
      dataIndex: 'address',
      align: 'center',
    },
    {
      title: translateContainer('containerStatus'),
      dataIndex: 'containerStatus',
      align: 'center',
    },
    {
      title: translateContainer('rentCost'),
      dataIndex: 'rentCost',
      align: 'center',
    },
    {
      title: translateContainer('price'),
      dataIndex: 'price',
      align: 'center',
    },
    {
      title: translateContainer('supplier'),
      dataIndex: 'supplier',
      align: 'center',
    },
    {
      title: translateContainer('status'),
      dataIndex: 'status',
      align: 'center',
    },
  ];
  return (
    <div style={{ padding: '24px 0' }}>
      {/* <Card style={{ marginBottom: 24 }}> */}
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: COLORS.GREEN,
          },
        }}
      >
        <Form
          form={form}
          initialValues={initialValue}
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
        >
          <Row justify={'center'}>
            <Col>
              <Title level={2}>
                {translateBooking('information_edit_booking')}
              </Title>
            </Col>
          </Row>

          <Card style={{ marginBottom: 24 }}>
            <Row gutter={16}>
              <Col lg={5} span={24}>
                <Form.Item
                  label={translateBooking('code_booking')}
                  name="code_booking"
                >
                  <Input placeholder="10-48973-VNL/V26-A" disabled />
                </Form.Item>
              </Col>

              <Col lg={14} span={24}>
                <Form.Item
                  label={translateBooking('package')}
                  name="package"
                  rules={[
                    {
                      required: true,
                      message: 'Please input package',
                    },
                  ]}
                >
                  <Input
                    placeholder={translateBooking('package_placeholder')}
                  />
                </Form.Item>
              </Col>

              <Col lg={5} span={24}>
                <Form.Item
                  label={translateBooking('container_code')}
                  name="containerCode"
                  rules={[
                    {
                      required: true,
                      message: 'Please choose container code',
                    },
                  ]}
                >
                  <Select
                    options={[
                      {
                        value: '1',
                        label: 'ASLU4824373',
                      },
                      {
                        value: '2',
                        label: 'ASLU4824373',
                      },
                    ]}
                    placeholder={translateBooking('container_code_placeholder')}
                  />
                </Form.Item>
              </Col>

              <Col lg={12} span={24}>
                <Form.Item
                  label={translateBooking('port_of_loading')}
                  name="portOfLoading"
                  rules={[
                    {
                      required: true,
                      message: 'Please input port of loading',
                    },
                  ]}
                >
                  <Input
                    placeholder={translateBooking(
                      'port_of_loading_placeholder'
                    )}
                  />
                </Form.Item>
              </Col>

              <Col lg={12} span={24}>
                <Form.Item
                  label={translateBooking('port_of_discharge')}
                  name="portOfDischarge"
                  rules={[
                    {
                      required: true,
                      message: 'Please input port of discharge',
                    },
                  ]}
                >
                  <Input
                    placeholder={translateBooking(
                      'port_of_discharge_placeholder'
                    )}
                  />
                </Form.Item>
              </Col>

              <Col lg={3} span={24}>
                <Form.Item
                  label={translateBooking('etd')}
                  name="etd"
                  rules={[
                    {
                      required: true,
                      message: 'Please input ETD',
                    },
                  ]}
                >
                  <DatePicker
                    defaultValue={dayjs('2015/01/01', dateFormat)}
                    format={dateFormat}
                    style={{ width: '100%' }}
                    placeholder={translateBooking('etd_placeholder')}
                  />
                </Form.Item>
              </Col>

              <Col lg={9} span={24}>
                <Form.Item
                  label={translateBooking('place_of_pickup')}
                  name="placeOfPickup"
                  rules={[
                    {
                      required: true,
                      message: 'Please input place of delivery',
                    },
                  ]}
                >
                  <Cascader
                    options={residences}
                    placeholder={translateBooking(
                      'place_of_pickup_placeholder'
                    )}
                  />
                </Form.Item>
              </Col>

              <Col lg={3} span={24}>
                <Form.Item
                  label={translateBooking('eta')}
                  name="eta"
                  rules={[{ required: true, message: 'Please input ETA' }]}
                >
                  <DatePicker
                    defaultValue={dayjs('2015/01/01', dateFormat)}
                    format={dateFormat}
                    style={{ width: '100%' }}
                    placeholder={translateBooking('eta_placeholder')}
                  />
                </Form.Item>
              </Col>

              <Col lg={9} span={24}>
                <Form.Item
                  label={translateBooking('place_of_delivery')}
                  name="placeOfDelivery"
                  rules={[
                    {
                      required: true,
                      message: 'Please input place of delivery',
                    },
                  ]}
                >
                  <Cascader
                    options={residences}
                    placeholder={translateBooking(
                      'place_of_delivery_placeholder'
                    )}
                  />
                </Form.Item>
              </Col>

              <Col lg={7} span={24}>
                <Form.Item
                  label={translateBooking('number_of_shipments')}
                  name="numberOfShipments"
                  rules={[
                    {
                      required: true,
                      message: 'Please input quantity',
                    },
                  ]}
                >
                  <Input
                    placeholder={translateBooking(
                      'number_of_shipments_placeholder'
                    )}
                  />
                </Form.Item>
              </Col>

              <Col lg={7} span={24}>
                <Form.Item
                  label={translateBooking('weight')}
                  name="weight"
                  rules={[
                    {
                      required: true,
                      message: 'Please input weight',
                    },
                  ]}
                >
                  <Input placeholder={translateBooking('weight_placeholder')} />
                </Form.Item>
              </Col>

              <Col lg={7} span={24}>
                <Form.Item
                  label={translateBooking('volume')}
                  name="volume"
                  rules={[
                    {
                      required: true,
                      message: 'Please input volume',
                    },
                  ]}
                >
                  <Input placeholder={translateBooking('volume_placeholder')} />
                </Form.Item>
              </Col>

              <Col lg={3} span={24}>
                <Form.Item
                  label={translateBooking('status')}
                  name="status"
                  rules={[
                    {
                      required: true,
                      message: 'Please input status',
                    },
                  ]}
                >
                  <Select
                    options={[
                      {
                        value: 'Save As Draft',
                        label: 'Save As Draft',
                      },
                      {
                        value: 'Pending',
                        label: 'Pending',
                      },
                      {
                        value: 'Approved',
                        label: 'Approved',
                      },
                      {
                        value: 'Processing',
                        label: 'Processing',
                      },
                      {
                        value: 'Completed',
                        label: 'Completed',
                      },
                      {
                        value: 'Cancel',
                        label: 'Cancel',
                      },
                    ]}
                    placeholder={translateBooking('status_placeholder')}
                  />
                </Form.Item>
              </Col>

              <Col lg={24} span={24}>
                <Form.Item
                  label={translateBooking('note')}
                  name="note"
                  rules={[
                    {
                      required: true,
                      message: 'Please input note',
                    },
                  ]}
                >
                  <Input.TextArea
                    placeholder={translateBooking('note_placeholder')}
                    rows={1}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Card>

          <CollapseCard
            title={translateLocation('title_information_port')}
            style={{ marginBottom: '24px' }}
            defaultActive={true}
          >
            <Row gutter={16}>
              <Col lg={24} span={24}>
                <Card
                  style={{ marginBottom: 24 }}
                  title={translateBooking('port_of_loading')}
                >
                  <Table columns={columnsPort} dataSource={data} />
                </Card>
              </Col>

              <Col lg={24} span={24}>
                <Card
                  style={{ marginBottom: 24 }}
                  title={translateBooking('port_of_discharge')}
                >
                  <Table columns={columnsPort} dataSource={data} />
                </Card>
              </Col>
            </Row>
          </CollapseCard>

          <CollapseCard
            title={translateGoods('title_information_goods')}
            style={{ marginBottom: '24px' }}
            defaultActive={true}
          >
            <Row gutter={16}>
              <Col lg={24} span={24}>
                <Card style={{ marginBottom: 24 }}>
                  <Table columns={columnsGoods} dataSource={data} />
                </Card>
              </Col>
            </Row>
          </CollapseCard>

          <CollapseCard
            title={translateContainer('title_information_container')}
            style={{ marginBottom: '24px' }}
            defaultActive={true}
          >
            <Row gutter={16}>
              <Col lg={24} span={24}>
                <Card style={{ marginBottom: 24 }}>
                  <Table columns={columnsContainer} dataSource={data} />
                </Card>
              </Col>
            </Row>
          </CollapseCard>

          <Card
            style={{
              position: 'sticky',
              bottom: 0,
              zIndex: 11,
            }}
          >
            <Row gutter={12}>
              <Col>
                <Button onClick={() => router.push(ROUTERS.BOOKING)}>
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
      {/* </Card> */}
    </div>
  );
}
