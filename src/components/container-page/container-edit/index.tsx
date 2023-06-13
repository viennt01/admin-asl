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
} from 'antd';
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
  const { translate: translateAddContainer } = useI18n('container');

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
                <Title level={3}>Edit a container</Title>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col lg={12} span={24}>
                <Form.Item
                  label={translateAddContainer('code')}
                  name="code"
                  rules={[
                    {
                      required: true,
                      message: 'Please input type of container',
                    },
                  ]}
                >
                  <Input
                    placeholder={translateAddContainer('code_placeholder')}
                  />
                </Form.Item>
              </Col>
              <Col lg={12} span={24}>
                <Form.Item
                  label={translateAddContainer('type_of_container')}
                  name="type_of_container"
                  rules={[{ required: true, message: 'Please input email' }]}
                >
                  <Select
                    placeholder={translateAddContainer(
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
                  label={translateAddContainer('location')}
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
                  label={translateAddContainer('location')}
                  name="detail_location"
                  rules={[
                    { required: true, message: 'Please input last name' },
                  ]}
                >
                  <Input placeholder="Nhập vị trí cụ thể" />
                </Form.Item>
              </Col>
              <Col lg={12} span={24}>
                <Form.Item
                  label={translateAddContainer('rentCost')}
                  name="rentCost"
                  rules={[
                    { required: true, message: 'Please input last name' },
                  ]}
                >
                  <Input prefix="Đ" suffix="VNĐ" />
                </Form.Item>
              </Col>
              <Col lg={12} span={24}>
                <Form.Item
                  label={translateAddContainer('price')}
                  name="price"
                  rules={[
                    { required: true, message: 'Please input last name' },
                  ]}
                >
                  <Input prefix="Đ" suffix="VNĐ" />
                </Form.Item>
              </Col>
            </Row>
          </Card>
          <Card>
            <Row gutter={12}>
              <Col>
                <Button onClick={() => router.push(ROUTERS.TYPES_OF_CONTAINER)}>
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
