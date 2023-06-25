import COLORS from '@/constant/color';
import { ROUTERS } from '@/constant/router';
import useI18n from '@/i18n/useI18N';
import {
  Button,
  Form,
  Input,
  Typography,
  Card,
  Row,
  Col,
  ConfigProvider,
  Cascader,
  CascaderProps,
  Select,
  Table,
  DatePicker,
} from 'antd';
import dayjs from 'dayjs';
import { ColumnsType } from 'antd/es/table';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export interface FormValues {
  code: string;
  type_of_container: string;
  location: string;
  detail_location: string;
  rentCost: string;
  price: string;
}

const initialValue = {
  code: '',
  type_of_container: '',
  location: '',
  detail_location: '',
  rentCost: '',
  price: '',
};

const { Title } = Typography;

export default function EditContainer() {
  const router = useRouter();
  const [form] = Form.useForm<FormValues>();
  const { id } = router.query;
  const { translate: translateContainer } = useI18n('container');
  const dateFormat = 'YYYY/MM/DD';

  useEffect(() => {
    if (!id) return;
  }, [router, form]);

  const onFinish = (formValues: FormValues) => {
    console.log(formValues);
  };
  interface DataNodeType {
    value: string;
    label: string;
    children?: DataNodeType[];
  }

  interface DataType {
    key: React.Key;
    containerNo: string;
    typeContainer: string;
    status: string;

    full_name: string;
    gender: string;
    dob: string;
    phone: string;
    address: string;
    email: string;
    nationality: string;
    position: string;

    bookingCode: string;
    portOfLoading: string;
    portOfDischarge: string;
    containerCode: string;
    package: string;
    numberOfShipments: string;
    weight: string;
    volume: string;
    placeOfDelivery: string;
    etd: string;
    eta: string;
    nameCustomer: string;
    nameSupplier: string;
    nameCnee: string;
    note: string;
    saleman: string;
    dateCreate: string;
    creator: string;
  }

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
  const columnsHis: ColumnsType<DataType> = [
    {
      title: 'Booking No',
      dataIndex: 'bookingCode',
      align: 'center',
    },
    {
      title: 'Port of Loading',
      dataIndex: 'portOfLoading',
      align: 'center',
    },
    {
      title: 'Port of Discharge',
      dataIndex: 'portOfDischarge',
      align: 'center',
    },
    {
      title: 'Container No',
      dataIndex: 'containerCode',
      align: 'center',
    },
    {
      title: 'Package',
      dataIndex: 'package',
      align: 'center',
    },
    {
      title: 'Number of shipments',
      dataIndex: 'numberOfShipments',
      align: 'center',
    },
    {
      title: 'Weight',
      dataIndex: 'weight',
      align: 'center',
    },
    {
      title: 'Volume',
      dataIndex: 'volume',
      align: 'center',
    },
    {
      title: 'Place of Delivery',
      dataIndex: 'placeOfDelivery',
      align: 'center',
    },
    {
      title: 'ETD',
      dataIndex: 'etd',
      align: 'center',
    },
    {
      title: 'ETA',
      dataIndex: 'eta',
      align: 'center',
    },
    {
      title: 'Shipper',
      dataIndex: 'nameCustomer',
      align: 'center',
    },
    {
      title: 'Supplier',
      dataIndex: 'nameSupplier',
      align: 'center',
    },
    {
      title: 'Consignee (Cnee)',
      dataIndex: 'nameCnee',
      align: 'center',
    },
    {
      title: 'Note',
      dataIndex: 'note',
      align: 'center',
    },
    {
      title: 'Saleman',
      dataIndex: 'saleman',
      align: 'center',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      align: 'center',
    },
    {
      title: 'Date created',
      dataIndex: 'dateCreate',
      align: 'center',
    },
    {
      title: 'Creator',
      dataIndex: 'creator',
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
          initialValues={initialValue}
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
        >
          <Card style={{ marginBottom: 24 }}>
            <Row justify={'center'}>
              <Col>
                <Title level={3}>
                  {translateContainer('information_edit_container')}
                </Title>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col lg={5} span={24}>
                <Form.Item
                  label={translateContainer('code')}
                  name="code"
                  rules={[
                    {
                      required: true,
                      message: 'Please input type of container',
                    },
                  ]}
                >
                  <Input placeholder={translateContainer('code_placeholder')} />
                </Form.Item>
              </Col>

              <Col lg={7} span={24}>
                <Form.Item
                  label={translateContainer('type_of_container')}
                  name="type_of_container"
                  rules={[{ required: true, message: 'Please input email' }]}
                >
                  <Select
                    placeholder={translateContainer(
                      'type_of_container_placeholder'
                    )}
                    options={[
                      {
                        value: '40DC',
                        label: '40DC',
                      },
                      {
                        value: '40HC',
                        label: '40HC',
                      },
                    ]}
                  />
                </Form.Item>
              </Col>

              <Col lg={12} span={24}>
                <Form.Item
                  label={translateContainer('location')}
                  name="location"
                  rules={[
                    { required: true, message: 'Please input last name' },
                  ]}
                >
                  <Cascader options={residences} />
                </Form.Item>
              </Col>

              <Col lg={12} span={24}>
                <Form.Item
                  label={translateContainer('containerStatus')}
                  name="containerStatus"
                  rules={[
                    { required: true, message: 'Please input last name' },
                  ]}
                >
                  <Input placeholder="Nhập vị trí cụ thể" />
                </Form.Item>
              </Col>

              <Col lg={6} span={24}>
                <Form.Item
                  label={translateContainer('rentCost')}
                  name="rentCost"
                  rules={[
                    { required: true, message: 'Please input last name' },
                  ]}
                >
                  <Input prefix="Đ" suffix="VNĐ" />
                </Form.Item>
              </Col>

              <Col lg={6} span={24}>
                <Form.Item
                  label={translateContainer('price')}
                  name="price"
                  rules={[
                    { required: true, message: 'Please input last name' },
                  ]}
                >
                  <Input prefix="Đ" suffix="VNĐ" />
                </Form.Item>
              </Col>

              <Col lg={12} span={24}>
                <Form.Item
                  label={translateContainer('supplier')}
                  name="supplier"
                  rules={[{ required: true, message: 'Please input supplier' }]}
                >
                  <Input placeholder="Nhập vị trí cụ thể" />
                </Form.Item>
              </Col>

              <Col lg={3} span={24}>
                <Form.Item
                  label={translateContainer('date_created')}
                  name="dateCreated"
                  rules={[
                    { required: true, message: 'Please input date created' },
                  ]}
                >
                  <DatePicker
                    defaultValue={dayjs('2015/01/01', dateFormat)}
                    format={dateFormat}
                    style={{ width: '100%' }}
                  />
                </Form.Item>
              </Col>

              <Col lg={6} span={24}>
                <Form.Item
                  label={translateContainer('creator')}
                  name="creator"
                  rules={[
                    {
                      required: true,
                      message: 'Please input creator',
                    },
                  ]}
                >
                  <Input placeholder="Nhập Creator" />
                </Form.Item>
              </Col>

              <Col lg={3} span={24}>
                <Form.Item
                  label={translateContainer('status')}
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
            </Row>
          </Card>

          <Card
            style={{ marginBottom: 24 }}
            title={
              <Title
                level={3}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingTop: '10px',
                }}
              >
                History of Container Usage
              </Title>
            }
          >
            <Table columns={columnsHis} dataSource={data} />
          </Card>

          <Card>
            <Row gutter={12}>
              <Col>
                <Button onClick={() => router.push(ROUTERS.CONTAINER)}>
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
