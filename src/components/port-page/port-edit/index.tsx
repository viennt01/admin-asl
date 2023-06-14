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
  InputNumber,
  Table,
} from 'antd';
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

export default function EditPort() {
  const { translate: translateAddPort } = useI18n('port');
  const router = useRouter();
  const [form] = Form.useForm<FormValues>();
  const { id } = router.query;

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
  const data = [
    {
      key: '1',
      containerNo: 'GMDU 307 307 9',
      typeContainer: '40DC',
      status: 'Đang cho thuê',
    },
    {
      key: '2',
      containerNo: 'GMDU 307 307 9',
      typeContainer: '40HC',
      status: 'Yêu cầu vệ sinh',
    },
    {
      key: '3',
      containerNo: 'GMDU 307 307 9',
      typeContainer: '40DC',
      status: 'Đang cho thuê',
    },
    {
      key: '4',
      containerNo: 'GMDU 307 307 9',
      typeContainer: '40HC',
      status: 'Yêu cầu vệ sinh',
    },
  ];
  interface DataType {
    key: React.Key;
    containerNo: string;
    typeContainer: string;
    status: string;
  }

  const columns: ColumnsType<DataType> = [
    {
      title: 'Mã số container',
      dataIndex: 'containerNo',
      align: 'center',
    },
    {
      title: 'Loại container',
      dataIndex: 'typeContainer',
      align: 'center',
    },
    {
      title: 'Tình trạng container',
      dataIndex: 'status',
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
                <Title level={3}>Edit a port</Title>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col lg={12} span={24}>
                <Form.Item
                  label={translateAddPort('new_port_title')}
                  tooltip={translateAddPort('new_port_tooltip')}
                  name="code"
                  rules={[
                    {
                      required: true,
                      message: 'Please input type of container',
                    },
                  ]}
                >
                  <Input
                    placeholder={translateAddPort('new_port_placeholder')}
                  />
                </Form.Item>
              </Col>
              <Col lg={12} span={24}>
                <Form.Item
                  label={translateAddPort('company')}
                  name="company"
                  rules={[
                    {
                      required: true,
                      message: 'Please input type of container',
                    },
                  ]}
                >
                  <Input
                    placeholder={translateAddPort('company_placeholder')}
                  />
                </Form.Item>
              </Col>
              <Col lg={12} span={24}>
                <Form.Item
                  label={translateAddPort('address')}
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
                  label={translateAddPort('address')}
                  name="detail_location"
                  rules={[
                    { required: true, message: 'Please input last name' },
                  ]}
                >
                  <Input placeholder="Nhập vị trí cụ thể" />
                </Form.Item>
              </Col>
              <Col lg={8} span={24}>
                <Form.Item
                  label={translateAddPort('quantity_container')}
                  name="quantity_container"
                  rules={[
                    { required: true, message: 'Please input last name' },
                  ]}
                >
                  <InputNumber
                    style={{ width: '100%' }}
                    min={1}
                    max={100000}
                    defaultValue={3}
                    placeholder={translateAddPort(
                      'quantity_container_placeholder'
                    )}
                  />
                </Form.Item>
              </Col>
              <Col lg={8} span={24}>
                <Form.Item
                  label={translateAddPort('capacity')}
                  name="capacity"
                  rules={[
                    { required: true, message: 'Please input last name' },
                  ]}
                >
                  <InputNumber
                    style={{ width: '100%' }}
                    min={1}
                    max={100000}
                    defaultValue={3}
                    placeholder={translateAddPort('capacity_placeholder')}
                  />
                </Form.Item>
              </Col>
              <Col lg={8} span={24}>
                <Form.Item
                  label={translateAddPort('status_capacity')}
                  name="status_capacity"
                  rules={[
                    { required: true, message: 'Please input last name' },
                  ]}
                >
                  <Select
                    options={[
                      {
                        value: 'Đầy',
                        label: 'Đầy',
                      },
                      {
                        value: 'Nửa đầy',
                        label: 'Nửa đầy',
                      },
                    ]}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Card>
          <Card style={{ marginBottom: 24 }} title="Danh sách container">
            <Table columns={columns} dataSource={data} />
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
