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
import CollapseCard from '@/components/commons/collapse-card';

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

const initialValue = {
  type_of_container: '',
  detail_placeholder: '',
  number_container: '',
};

const { Title } = Typography;

export default function EditLCustomer() {
  const router = useRouter();
  const [form] = Form.useForm<FormValues>();
  const { id } = router.query;
  const { translate: translatePotentialCustomer } =
    useI18n('potentialCustomer');
  const { translate: translateContactInfo } = useI18n('contactInfo');
  const { translate: translateBooking } = useI18n('booking');
  const { translate: translateInvoice } = useI18n('invoice');
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
      title: translateContactInfo('full_name'),
      dataIndex: 'full_name',
      align: 'center',
    },
    {
      title: translateContactInfo('gender'),
      dataIndex: 'gender',
      align: 'center',
    },
    {
      title: translateContactInfo('dob'),
      dataIndex: 'dob',
      align: 'center',
    },
    {
      title: translateContactInfo('phone'),
      dataIndex: 'phone',
      align: 'center',
    },
    {
      title: translateContactInfo('address'),
      dataIndex: 'address',
      align: 'center',
    },
    {
      title: translateContactInfo('email'),
      dataIndex: 'email',
      align: 'center',
    },
    {
      title: translateContactInfo('nationality'),
      dataIndex: 'nationality',
      align: 'center',
    },
    {
      title: translateContactInfo('position'),
      dataIndex: 'position',
      align: 'center',
    },
  ];

  const columnsTransHis: ColumnsType<DataType> = [
    {
      title: translateBooking('code_booking'),
      dataIndex: 'bookingCode',
      align: 'center',
    },
    {
      title: translateBooking('port_of_loading'),
      dataIndex: 'portOfLoading',
      align: 'center',
    },
    {
      title: translateBooking('port_of_discharge'),
      dataIndex: 'portOfDischarge',
      align: 'center',
    },
    {
      title: translateBooking('container_code'),
      dataIndex: 'containerCode',
      align: 'center',
    },
    {
      title: translateBooking('package'),
      dataIndex: 'package',
      align: 'center',
    },
    {
      title: translateBooking('number_of_shipments'),
      dataIndex: 'numberOfShipments',
      align: 'center',
    },
    {
      title: translateBooking('weight'),
      dataIndex: 'weight',
      align: 'center',
    },
    {
      title: translateBooking('volume'),
      dataIndex: 'volume',
      align: 'center',
    },
    {
      title: translateBooking('place_of_delivery'),
      dataIndex: 'placeOfDelivery',
      align: 'center',
    },
    {
      title: translateBooking('etd'),
      dataIndex: 'etd',
      align: 'center',
    },
    {
      title: translateBooking('eta'),
      dataIndex: 'eta',
      align: 'center',
    },
    {
      title: translateBooking('name_customer'),
      dataIndex: 'nameCustomer',
      align: 'center',
    },
    {
      title: translateBooking('name_supplier'),
      dataIndex: 'nameSupplier',
      align: 'center',
    },
    {
      title: translateBooking('name_cnee'),
      dataIndex: 'nameCnee',
      align: 'center',
    },
    {
      title: translateBooking('note'),
      dataIndex: 'note',
      align: 'center',
    },
    {
      title: translateBooking('saleman'),
      dataIndex: 'saleman',
      align: 'center',
    },
    {
      title: translateBooking('status'),
      dataIndex: 'status',
      align: 'center',
    },
    {
      title: translateBooking('date_create'),
      dataIndex: 'dateCreate',
      align: 'center',
    },
    {
      title: translateBooking('creator'),
      dataIndex: 'creator',
      align: 'center',
    },
  ];

  const columnsReceivable: ColumnsType<DataType> = [
    {
      title: translateInvoice('invoice_date'),
      dataIndex: 'invoiceDate',
      align: 'center',
    },
    {
      title: translateInvoice('invoice_no'),
      dataIndex: 'invoiceNo',
      align: 'center',
    },
    {
      title: translateInvoice('invoice_series'),
      dataIndex: 'invoiceSeries',
      align: 'center',
    },
    {
      title: translateInvoice('amount_exclude_tax'),
      dataIndex: 'amountExcludeTax',
      align: 'center',
    },
    {
      title: translateInvoice('tax'),
      dataIndex: 'tax',
      align: 'center',
    },
    {
      title: translateInvoice('tax_amount'),
      dataIndex: 'taxAmount',
      align: 'center',
    },
    {
      title: translateInvoice('total_amount'),
      dataIndex: 'totalAmount',
      align: 'center',
    },
    {
      title: translateInvoice('issue_by'),
      dataIndex: 'issueBy',
      align: 'center',
    },
    {
      title: translateInvoice('status'),
      dataIndex: 'status',
      align: 'center',
    },
  ];
  const columnsPayable: ColumnsType<DataType> = [
    {
      title: translateInvoice('invoice_date'),
      dataIndex: 'invoiceDate',
      align: 'center',
    },
    {
      title: translateInvoice('invoice_no'),
      dataIndex: 'invoiceNo',
      align: 'center',
    },
    {
      title: translateInvoice('invoice_series'),
      dataIndex: 'invoiceSeries',
      align: 'center',
    },
    {
      title: translateInvoice('amount_exclude_tax'),
      dataIndex: 'amountExcludeTax',
      align: 'center',
    },
    {
      title: translateInvoice('tax'),
      dataIndex: 'tax',
      align: 'center',
    },
    {
      title: translateInvoice('tax_amount'),
      dataIndex: 'taxAmount',
      align: 'center',
    },
    {
      title: translateInvoice('total_amount'),
      dataIndex: 'totalAmount',
      align: 'center',
    },
    {
      title: translateInvoice('status'),
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
                <Title level={3}>
                  {translatePotentialCustomer('information_edit_customer')}
                </Title>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col lg={5} span={24}>
                <Form.Item
                  label={translatePotentialCustomer('code')}
                  name="code_customer"
                  rules={[
                    {
                      required: true,
                      message: 'Please input type of code customer',
                    },
                  ]}
                >
                  <Input placeholder="Nhập mã customer" />
                </Form.Item>
              </Col>

              <Col lg={12} span={24}>
                <Form.Item
                  label={translatePotentialCustomer('name')}
                  name="name_customer"
                  rules={[
                    {
                      required: true,
                      message: 'Please input customer Name',
                    },
                  ]}
                >
                  <Input placeholder="Nhập tên customer" />
                </Form.Item>
              </Col>

              <Col lg={7} span={24}>
                <Form.Item
                  label={translatePotentialCustomer('abbreviation')}
                  name="abbreviation_customer"
                  rules={[
                    {
                      required: true,
                      message: 'Please input Abbreviation of customer',
                    },
                  ]}
                >
                  <Input placeholder="Please input Abbreviation of customer" />
                </Form.Item>
              </Col>

              <Col lg={5} span={24}>
                <Form.Item
                  label={translatePotentialCustomer('country')}
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

              <Col lg={12} span={24}>
                <Form.Item
                  label={translatePotentialCustomer('address')}
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

              <Col lg={7} span={24}>
                <Form.Item
                  label={translatePotentialCustomer('phone')}
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

              <Col lg={5} span={24}>
                <Form.Item
                  label={translatePotentialCustomer('email')}
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

              <Col lg={6} span={24}>
                <Form.Item
                  label={translatePotentialCustomer('saleman')}
                  name="saleman"
                  rules={[
                    {
                      required: true,
                      message: 'Please input saleman',
                    },
                  ]}
                >
                  <Input placeholder="Nhập Saleman" />
                </Form.Item>
              </Col>

              <Col lg={3} span={24}>
                <Form.Item
                  label={translatePotentialCustomer('date_created')}
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
                  label={translatePotentialCustomer('creator')}
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
                  label={translatePotentialCustomer('status')}
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

          <CollapseCard
            title={translateContactInfo('title_information_contact')}
            style={{ marginBottom: '24px' }}
          >
            <Row gutter={16}>
              <Col lg={24} span={24}>
                <Card style={{ marginBottom: 24 }}>
                  <Table
                    columns={columnsContactInfo}
                    dataSource={dataTransHis}
                  />
                </Card>
              </Col>
            </Row>
          </CollapseCard>

          <CollapseCard
            title={translateBooking('transaction_history')}
            style={{ marginBottom: '24px' }}
          >
            <Row gutter={16}>
              <Col lg={24} span={24}>
                <Card style={{ marginBottom: 24 }}>
                  <Table columns={columnsTransHis} dataSource={dataTransHis} />
                </Card>
              </Col>
            </Row>
          </CollapseCard>

          <CollapseCard
            title={translateInvoice('debt_history')}
            style={{ marginBottom: '24px' }}
          >
            <Row gutter={16}>
              <Col lg={24} span={24}>
                <Card style={{ marginBottom: 24 }}>
                  <Card
                    style={{ marginBottom: 24 }}
                    title={translateInvoice('accounts_receivable')}
                  >
                    <Table
                      columns={columnsReceivable}
                      dataSource={dataTransHis}
                    />
                  </Card>
                  <Card
                    style={{ marginBottom: 24 }}
                    title={translateInvoice('accounts_payable')}
                  >
                    <Table columns={columnsPayable} dataSource={dataTransHis} />
                  </Card>
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
                <Button onClick={() => router.push(ROUTERS.POTENTIAL_CUSTOMER)}>
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
