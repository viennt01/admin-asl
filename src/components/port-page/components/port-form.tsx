import { ROUTERS } from '@/constant/router';
import useI18n from '@/i18n/useI18N';
import { useQuery } from '@tanstack/react-query';
import {
  Button,
  Form,
  Input,
  Typography,
  Card,
  Row,
  Col,
  Select,
  Descriptions,
} from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getListCountry, getListTypePort, getPortDetail } from '../fetcher';
import { FormValues, STATUS_LABELS } from '../interface';
import { API_MASTER_DATA, API_PORT } from '@/fetcherAxios/endpoint';
import { formatDate } from '@/utils/format';

const initialValue = {
  address: '',
  description: '',
};

interface Option {
  value: string;
  label: string;
}

interface PortFormProps {
  create?: boolean;
  handleSubmit: (formValues: FormValues) => void;
  loading: boolean;
  checkRow: boolean;
}

const { Title } = Typography;
const { TextArea } = Input;

const PortForm = ({
  create,
  handleSubmit,
  loading,
  checkRow,
}: PortFormProps) => {
  const { translate: translatePort } = useI18n('port');
  const { translate: translateCommon } = useI18n('common');
  const router = useRouter();
  const [form] = Form.useForm<FormValues>();
  const { id } = router.query;
  const [options, setOptions] = useState<Option[]>([]);
  const [isCheckEdit, setCheckEdit] = useState<boolean>(true);

  useEffect(() => {
    if (!id) return;
  }, [router, form]);

  const onFinish = (formValues: FormValues) => {
    handleSubmit(formValues);
  };

  useQuery({
    queryKey: [API_MASTER_DATA.GET_COUNTRY],
    queryFn: () =>
      getListCountry({
        currentPage: 1,
        pageSize: 500,
      }),
    onSuccess(data) {
      if (data.status) {
        setOptions(
          data.data.data.map((item) => ({
            value: item.countryID,
            label: item.countryName,
          }))
        );
      }
    },
    onError: () => {
      router.push(ROUTERS.PORT);
    },
  });

  const portDetailQuery = useQuery({
    queryKey: [API_PORT.GET_PORT_DETAIL, id],
    queryFn: () => getPortDetail(id as string),
    enabled: id !== undefined,
    onError: () => {
      router.push(ROUTERS.PORT);
    },
  });

  const typePortQuery = useQuery({
    queryKey: [API_MASTER_DATA.GET_TYPE_PORT],
    queryFn: () => getListTypePort(),
    onError: () => {
      router.push(ROUTERS.PORT);
    },
  });

  useEffect(() => {
    if (portDetailQuery.data) {
      form.setFieldsValue({
        portName: portDetailQuery.data.data.portName,
        portCode: portDetailQuery.data.data.portCode,
        typePorts: portDetailQuery.data.data.typePorts.map(
          (type) => type.typePortID
        ),
        countryID: portDetailQuery.data.data.countryID,
        status: portDetailQuery.data.data.status,
        address: portDetailQuery.data.data.address,
        description: portDetailQuery.data.data.description,
      });
    }
  }, [portDetailQuery.data, form]);

  return (
    <div style={{ padding: '24px 0' }}>
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
                {create
                  ? translatePort('information_add_port')
                  : translatePort('information_edit_port')}
              </Title>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col lg={12} span={24}>
              <Form.Item
                label={translatePort('port_code.title')}
                tooltip={translatePort('code')}
                name="portCode"
                rules={[
                  {
                    required: true,
                    message: translatePort('port_code.error_required'),
                  },
                ]}
              >
                <Input
                  placeholder={translatePort('port_code.placeholder')}
                  size="large"
                  disabled={checkRow && isCheckEdit}
                />
              </Form.Item>
            </Col>
            <Col lg={12} span={24}>
              <Form.Item
                label={translatePort('port_name.title')}
                name="portName"
                rules={[
                  {
                    required: true,
                    message: translatePort('port_name.error_required'),
                  },
                ]}
              >
                <Input
                  placeholder={translatePort('port_name.placeholder')}
                  size="large"
                  disabled={checkRow && isCheckEdit}
                />
              </Form.Item>
            </Col>

            <Col lg={12} span={24}>
              <Form.Item
                label={translatePort('type_port.title')}
                name="typePorts"
                rules={[
                  {
                    required: true,
                    message: translatePort('type_port.error_required'),
                  },
                ]}
              >
                <Select
                  placeholder={translatePort('type_port.placeholder')}
                  mode="multiple"
                  size="large"
                  options={typePortQuery.data?.data.map((type) => ({
                    label: type.typePortName,
                    value: type.typePortID,
                  }))}
                  disabled={checkRow && isCheckEdit}
                />
              </Form.Item>
            </Col>
            <Col lg={!create ? 6 : 12} span={24}>
              <Form.Item
                label={translatePort('country.title')}
                name="countryID"
                rules={[
                  {
                    required: true,
                    message: translatePort('country.error_required'),
                  },
                ]}
              >
                <Select
                  placeholder={translatePort('country.placeholder')}
                  showSearch
                  size="large"
                  options={options}
                  filterOption={(input, option) =>
                    (option?.label ?? '')
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  disabled={checkRow && isCheckEdit}
                />
              </Form.Item>
            </Col>
            {!create ? (
              <Col lg={6} span={24}>
                <Form.Item
                  label={translatePort('status_port.title')}
                  name="status"
                  rules={[
                    {
                      required: true,
                      message: translatePort('status_port.error_required'),
                    },
                  ]}
                >
                  <Select
                    size="large"
                    placeholder={translatePort('status_port.placeholder')}
                    options={Object.values(STATUS_LABELS).map(
                      (type, index) => ({
                        label: type,
                        value: index + 1,
                      })
                    )}
                    disabled={checkRow && isCheckEdit}
                  />
                </Form.Item>
              </Col>
            ) : (
              <></>
            )}

            <Col lg={12} span={24}>
              <Form.Item
                label={translatePort('address_port.title')}
                name="address"
                rules={[
                  {
                    required: true,
                    message: translatePort('address_port.error_required'),
                  },
                ]}
              >
                <Input
                  placeholder={translatePort('address_port.placeholder')}
                  size="large"
                  disabled={checkRow && isCheckEdit}
                />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                label={translatePort('description.title')}
                name="description"
              >
                <TextArea
                  size="large"
                  placeholder={translatePort('description.placeholder')}
                  allowClear
                  disabled={checkRow && isCheckEdit}
                />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        <Card>
          <Row gutter={12}>
            <Col span={12}>
              {checkRow && isCheckEdit ? (
                <>
                  <Button onClick={() => router.push(ROUTERS.PORT)}>
                    {translateCommon('close')}
                  </Button>
                  <Button
                    type="primary"
                    onClick={() => setCheckEdit(false)}
                    style={{ marginLeft: '12px' }}
                  >
                    {translateCommon('edit')}
                  </Button>
                </>
              ) : (
                <>
                  <Button onClick={() => router.push(ROUTERS.PORT)}>
                    {translateCommon('cancel')}
                  </Button>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ marginLeft: '12px' }}
                    loading={loading}
                  >
                    {!create
                      ? translateCommon('save')
                      : translateCommon('create')}
                  </Button>
                </>
              )}
            </Col>
            {!create ? (
              <Col span={12}>
                <Descriptions column={2}>
                  <Descriptions.Item label={translateCommon('creator')}>
                    {portDetailQuery.data?.data.insertedByUser}
                  </Descriptions.Item>
                  <Descriptions.Item label={translateCommon('date_created')}>
                    {formatDate(
                      Number(portDetailQuery.data?.data.dateInserted)
                    )}
                  </Descriptions.Item>
                  <Descriptions.Item label={translateCommon('inserter')}>
                    {portDetailQuery.data?.data.updatedByUser}
                  </Descriptions.Item>
                  <Descriptions.Item label={translateCommon('date_inserted')}>
                    {formatDate(Number(portDetailQuery.data?.data.dateUpdated))}
                  </Descriptions.Item>
                </Descriptions>
              </Col>
            ) : (
              <></>
            )}
          </Row>
        </Card>
      </Form>
    </div>
  );
};

export default PortForm;
