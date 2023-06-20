import COLORS from '@/constant/color';
import { COUNTRY_CODES } from '@/constant/form';
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
  Table,
  DatePicker,
} from 'antd';
import dayjs from 'dayjs';
import { ColumnsType } from 'antd/es/table';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useI18n from '@/i18n/useI18N';

// interface DataNodeType {
//   value: string;
//   label: string;
//   children?: DataNodeType[];
// }
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

  full_name: string;
  sex: string;
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

const initialValue = {
  type_of_container: '',
  detail_placeholder: '',
  number_container: '',
};

const { Title } = Typography;

export default function EditSupplier() {
  const router = useRouter();
  const [form] = Form.useForm<FormValues>();
  const { id } = router.query;
  const { translate: translateSupplier } = useI18n('supplier');
  const dateFormat = 'YYYY/MM/DD';

  useEffect(() => {
    if (!id) return;
  }, [router, form]);

  const onFinish = (formValues: FormValues) => {
    console.log(formValues);
  };

  // const residences: CascaderProps<DataNodeType>['options'] = [
  //   {
  //     value: 'Thành phố Hồ Chí Minh',
  //     label: 'Thành phố Hồ Chí Minh',
  //     children: [
  //       {
  //         value: 'Gò Vấp',
  //         label: 'Gò Vấp',
  //         children: [
  //           {
  //             value: 'Phường 1',
  //             label: 'Phường 1',
  //           },
  //         ],
  //       },
  //     ],
  //   },
  //   {
  //     value: 'Hà Nội',
  //     label: 'Hà Nội',
  //     children: [
  //       {
  //         value: 'Huyện Ba Vì',
  //         label: 'Huyện Ba Vì',
  //         children: [
  //           {
  //             value: 'Xã Ba Trại',
  //             label: 'Xã Ba Trại',
  //           },
  //         ],
  //       },
  //     ],
  //   },
  // ];

  const dataTransHis: readonly any[] | undefined = [];

  const columnsContactInfo: ColumnsType<DataType> = [
    {
      title: 'Full name',
      dataIndex: 'full_name',
      align: 'center',
    },
    {
      title: 'Sex',
      dataIndex: 'sex',
      align: 'center',
    },
    {
      title: 'Date of birth',
      dataIndex: 'dob',
      align: 'center',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phone',
      align: 'center',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      align: 'center',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      align: 'center',
    },
    {
      title: 'Nationality',
      dataIndex: 'nationality',
      align: 'center',
    },
    {
      title: 'Position',
      dataIndex: 'position',
      align: 'center',
    },
  ];

  const columnsTransHis: ColumnsType<DataType> = [
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

  const columnsReceivable: ColumnsType<DataType> = [
    {
      title: 'Invoice date',
      dataIndex: 'status',
      align: 'center',
    },
    {
      title: 'Invoice No',
      dataIndex: 'containerNo',
      align: 'center',
    },
    {
      title: 'Invoice series',
      dataIndex: 'typeContainer',
      align: 'center',
    },
    {
      title: 'Amount exclude tax',
      dataIndex: 'status',
      align: 'center',
    },
    {
      title: 'Tax (%)',
      dataIndex: 'status',
      align: 'center',
    },
    {
      title: 'Tax Amount',
      dataIndex: 'status',
      align: 'center',
    },
    {
      title: 'Total amount',
      dataIndex: 'status',
      align: 'center',
    },
    {
      title: 'Issue by',
      dataIndex: 'status',
      align: 'center',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      align: 'center',
    },
  ];
  const columnsPayable: ColumnsType<DataType> = [
    {
      title: 'Invoice date',
      dataIndex: 'status',
      align: 'center',
    },
    {
      title: 'Invoice No',
      dataIndex: 'containerNo',
      align: 'center',
    },
    {
      title: 'Invoice series',
      dataIndex: 'typeContainer',
      align: 'center',
    },
    {
      title: 'Amount exclude tax',
      dataIndex: 'status',
      align: 'center',
    },
    {
      title: 'Tax (%)',
      dataIndex: 'status',
      align: 'center',
    },
    {
      title: 'Tax Amount',
      dataIndex: 'status',
      align: 'center',
    },
    {
      title: 'Total amount',
      dataIndex: 'status',
      align: 'center',
    },
    {
      title: 'Status',
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
                <Title level={3}>Edit Supplier</Title>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col lg={4} span={24}>
                <Form.Item
                  label={translateSupplier('code')}
                  name="code_supplier"
                  rules={[
                    {
                      required: true,
                      message: 'Please input type of code supplier',
                    },
                  ]}
                >
                  <Input placeholder="Nhập mã supplier" />
                </Form.Item>
              </Col>

              <Col lg={12} span={24}>
                <Form.Item
                  label={translateSupplier('name')}
                  name="name_supplier"
                  rules={[
                    {
                      required: true,
                      message: 'Please input supplier Name',
                    },
                  ]}
                >
                  <Input placeholder="Nhập tên supplier" />
                </Form.Item>
              </Col>

              <Col lg={8} span={24}>
                <Form.Item
                  label={translateSupplier('abbreviation')}
                  name="abbreviation_supplier"
                  rules={[
                    {
                      required: true,
                      message: 'Please input Abbreviation of supplier',
                    },
                  ]}
                >
                  <Input placeholder="Please input Abbreviation of supplier" />
                </Form.Item>
              </Col>

              <Col lg={16} span={24}>
                <Form.Item
                  label={translateSupplier('service')}
                  name="name_supplier"
                  rules={[
                    {
                      required: true,
                      message: 'Please input Service provided',
                    },
                  ]}
                >
                  <Input placeholder="Nhập Service provided" />
                </Form.Item>
              </Col>

              <Col lg={8} span={24}>
                <Form.Item
                  label={translateSupplier('phone')}
                  style={{ marginBottom: 0 }}
                >
                  <Form.Item
                    name="phone_code"
                    style={{ display: 'inline-block', width: 104 }}
                  >
                    <Select
                      options={COUNTRY_CODES.map(({ dial_code, code }) => ({
                        value: `${code}_${dial_code}`,
                        label: dial_code,
                      }))}
                      showSearch
                    />
                  </Form.Item>
                  <Form.Item
                    name="Phone Number"
                    style={{
                      display: 'inline-block',
                      width: 'calc(100% - 104px - 16px)',
                      marginLeft: 16,
                    }}
                    rules={[
                      {
                        pattern: /^[0-9]{7,15}$/,
                        message: 'Sai định dạng',
                      },
                    ]}
                  >
                    <Input
                      placeholder="Nhập số điện thoại"
                      style={{
                        width: '100%',
                      }}
                    />
                  </Form.Item>
                </Form.Item>
              </Col>

              <Col lg={19} span={24}>
                <Form.Item
                  label={translateSupplier('address')}
                  name="address"
                  rules={[
                    {
                      required: true,
                      message: 'Please input address',
                    },
                  ]}
                >
                  <Input placeholder="Nhập Address" />
                </Form.Item>
              </Col>

              <Col lg={5} span={24}>
                <Form.Item
                  label={translateSupplier('country')}
                  name="Country"
                  rules={[
                    {
                      required: true,
                      message: 'Please input Country',
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
                  label={translateSupplier('email')}
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: 'Please input email',
                    },
                  ]}
                >
                  <Input placeholder="Nhập Email" />
                </Form.Item>
              </Col>

              <Col lg={4} span={24}>
                <Form.Item
                  label={translateSupplier('date_created')}
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

              <Col lg={9} span={24}>
                <Form.Item
                  label={translateSupplier('creator')}
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

              <Col lg={4} span={24}>
                <Form.Item
                  label={translateSupplier('status')}
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

              <Col lg={24} span={24}>
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
                }}
              >
                Contact Information
              </Title>
            }
          >
            <Table columns={columnsContactInfo} dataSource={dataTransHis} />
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
                }}
              >
                Transaction history
              </Title>
            }
          >
            <Table columns={columnsTransHis} dataSource={dataTransHis} />
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
                }}
              >
                Debt history
              </Title>
            }
          >
            <Card style={{ marginBottom: 24 }} title="Công nợ thu">
              <Table columns={columnsReceivable} dataSource={dataTransHis} />
            </Card>
            <Card style={{ marginBottom: 24 }} title="Công nợ chi">
              <Table columns={columnsPayable} dataSource={dataTransHis} />
            </Card>
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
                <Button onClick={() => router.push(ROUTERS.SUPPLIER)}>
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
