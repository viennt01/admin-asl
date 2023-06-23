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

  useEffect(() => {
    if (!id) return;
  }, [router, form]);

  const onFinish = (formValues: FormValues) => {
    console.log(formValues);
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
  const data = [
    {
      key: '1',
      containerNo: 'GMDU 307 307 9',
      typeContainer: '40DC',
      status: 'Đang cho thuê',
    },
  ];
  const columns: ColumnsType<DataType> = [
    {
      title: translateBooking('no_booking'),
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
              <Title level={2}>Edit Booking</Title>
            </Col>
          </Row>
          <Card style={{ marginBottom: 24 }}>
            <Row gutter={16}>
              <Col lg={12} span={24}>
                <Form.Item
                  label={translateBooking('code_booking')}
                  name="code_booking"
                >
                  <Input placeholder="10-48973-VNL/V26-A" disabled />
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

              <Col lg={12} span={24}>
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
                        label: 'GLSU4824373',
                      },
                      {
                        value: '2',
                        label: 'GLSU4824373',
                      },
                    ]}
                    placeholder={translateBooking('container_code_placeholder')}
                  />
                </Form.Item>
              </Col>

              <Col lg={12} span={24}>
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

              <Col lg={12} span={24}>
                <Form.Item
                  label={translateBooking('number_of_shipments')}
                  name="numberOfShipments"
                  rules={[
                    {
                      required: true,
                      message: 'Please input number of shipments',
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

              <Col lg={12} span={24}>
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

              <Col lg={12} span={24}>
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

              <Col lg={12} span={24}>
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

              <Col lg={6} span={24}>
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
                    placeholder={translateBooking('etd_placeholder')}
                  />
                </Form.Item>
              </Col>

              <Col lg={6} span={24}>
                <Form.Item
                  label={translateBooking('eta')}
                  name="eta"
                  rules={[{ required: true, message: 'Please input ETA' }]}
                >
                  <DatePicker
                    defaultValue={dayjs('2015/01/01', dateFormat)}
                    format={dateFormat}
                    placeholder={translateBooking('eta_placeholder')}
                  />
                </Form.Item>
              </Col>

              <Col lg={12} span={24}>
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

              <Col lg={12} span={24}>
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
            </Row>
          </Card>

          <CollapseCard title="Thông tin cảng" style={{ marginBottom: '24px' }}>
            <Row gutter={16}>
              <Col lg={12} span={24}>
                <Form.Item
                  label={translateBooking('no_booking')}
                  name="code_booking"
                  rules={[
                    {
                      required: true,
                      message: 'Please input type of mã booking',
                    },
                  ]}
                >
                  <Input placeholder="Nhập mã booking" />
                </Form.Item>
              </Col>
              <Col lg={12} span={24}>
                <Form.Item
                  label="Package"
                  name="package"
                  rules={[
                    {
                      required: true,
                      message: 'Please input package',
                    },
                  ]}
                >
                  <Input placeholder="Nhập package" />
                </Form.Item>
              </Col>
              <Col lg={12} span={24}>
                <Form.Item
                  label="Cảng chất hàng"
                  name="port_of_loading"
                  rules={[
                    {
                      required: true,
                      message: 'Please input type of container',
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
              <Col lg={12} span={24}>
                <Form.Item
                  label="Cảng dỡ hàng"
                  name="port_of_discharge"
                  rules={[
                    {
                      required: true,
                      message: 'Please input type of container',
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

              <Col lg={12} span={24}>
                <Form.Item
                  label="Địa điểm giao hàng"
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
                  label="Địa điểm giao hàng cụ thể"
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
                  label="ETD"
                  name="etd"
                  rules={[{ required: true, message: 'Please input ETD' }]}
                >
                  <DatePicker
                    defaultValue={dayjs('2015/01/01', dateFormat)}
                    format={dateFormat}
                  />
                </Form.Item>
              </Col>

              <Col lg={8} span={24}>
                <Form.Item
                  label="ETA"
                  name="eta"
                  rules={[{ required: true, message: 'Please input ETA' }]}
                >
                  <DatePicker
                    defaultValue={dayjs('2015/01/01', dateFormat)}
                    format={dateFormat}
                  />
                </Form.Item>
              </Col>

              <Col lg={8} span={24}>
                <Form.Item
                  label="Date created"
                  name="date_created"
                  rules={[
                    { required: true, message: 'Please input date created' },
                  ]}
                >
                  <DatePicker
                    defaultValue={dayjs('2015/01/01', dateFormat)}
                    format={dateFormat}
                  />
                </Form.Item>
              </Col>

              <Col lg={12} span={24}>
                <Form.Item
                  label="Creator"
                  name="creator"
                  rules={[
                    {
                      required: true,
                      message: 'Please input type of Creator',
                    },
                  ]}
                >
                  <Select
                    options={[
                      {
                        value: 'Ngân',
                        label: 'Ngân',
                      },
                      {
                        value: 'Khoa',
                        label: 'Khoa',
                      },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col lg={12} span={24}>
                <Form.Item
                  label="Status"
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
                  />
                </Form.Item>
              </Col>

              <Col lg={12} span={24}>
                <Form.Item
                  label="Note"
                  name="note"
                  rules={[
                    {
                      required: true,
                      message: 'Please input note',
                    },
                  ]}
                >
                  <Input.TextArea placeholder="Nhập ghi chú" />
                </Form.Item>
              </Col>
            </Row>
          </CollapseCard>

          <CollapseCard title="Thông hàng hoá" style={{ marginBottom: '24px' }}>
            <Row gutter={16}>
              <Col lg={12} span={24}>
                <Form.Item
                  label={translateBooking('no_booking')}
                  name="code_booking"
                  rules={[
                    {
                      required: true,
                      message: 'Please input type of mã booking',
                    },
                  ]}
                >
                  <Input placeholder="Nhập mã booking" />
                </Form.Item>
              </Col>
              <Col lg={12} span={24}>
                <Form.Item
                  label="Package"
                  name="package"
                  rules={[
                    {
                      required: true,
                      message: 'Please input package',
                    },
                  ]}
                >
                  <Input placeholder="Nhập package" />
                </Form.Item>
              </Col>
              <Col lg={12} span={24}>
                <Form.Item
                  label="Cảng chất hàng"
                  name="port_of_loading"
                  rules={[
                    {
                      required: true,
                      message: 'Please input type of container',
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
              <Col lg={12} span={24}>
                <Form.Item
                  label="Cảng dỡ hàng"
                  name="port_of_discharge"
                  rules={[
                    {
                      required: true,
                      message: 'Please input type of container',
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

              <Col lg={12} span={24}>
                <Form.Item
                  label="Địa điểm giao hàng"
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
                  label="Địa điểm giao hàng cụ thể"
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
                  label="ETD"
                  name="etd"
                  rules={[{ required: true, message: 'Please input ETD' }]}
                >
                  <DatePicker
                    defaultValue={dayjs('2015/01/01', dateFormat)}
                    format={dateFormat}
                  />
                </Form.Item>
              </Col>

              <Col lg={8} span={24}>
                <Form.Item
                  label="ETA"
                  name="eta"
                  rules={[{ required: true, message: 'Please input ETA' }]}
                >
                  <DatePicker
                    defaultValue={dayjs('2015/01/01', dateFormat)}
                    format={dateFormat}
                  />
                </Form.Item>
              </Col>

              <Col lg={8} span={24}>
                <Form.Item
                  label="Date created"
                  name="date_created"
                  rules={[
                    { required: true, message: 'Please input date created' },
                  ]}
                >
                  <DatePicker
                    defaultValue={dayjs('2015/01/01', dateFormat)}
                    format={dateFormat}
                  />
                </Form.Item>
              </Col>

              <Col lg={12} span={24}>
                <Form.Item
                  label="Creator"
                  name="creator"
                  rules={[
                    {
                      required: true,
                      message: 'Please input type of Creator',
                    },
                  ]}
                >
                  <Select
                    options={[
                      {
                        value: 'Ngân',
                        label: 'Ngân',
                      },
                      {
                        value: 'Khoa',
                        label: 'Khoa',
                      },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col lg={12} span={24}>
                <Form.Item
                  label="Status"
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
                  />
                </Form.Item>
              </Col>

              <Col lg={12} span={24}>
                <Form.Item
                  label="Note"
                  name="note"
                  rules={[
                    {
                      required: true,
                      message: 'Please input note',
                    },
                  ]}
                >
                  <Input.TextArea placeholder="Nhập ghi chú" />
                </Form.Item>
              </Col>
            </Row>
          </CollapseCard>

          <Card style={{ marginBottom: 24 }} title="Danh sách container">
            <Table columns={columns} dataSource={data} />
          </Card>

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
