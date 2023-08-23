import { ROUTERS } from '@/constant/router';
import useI18n from '@/i18n/useI18N';
import { useQuery } from '@tanstack/react-query';
import { Form, Input, Typography, Card, Row, Col, Select } from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getPortDetail } from '../fetcher';
import { FormValues, STATUS_LABELS } from '../interface';
import { API_MASTER_DATA, API_LOCATION } from '@/fetcherAxios/endpoint';
import { getListCountry, getListTypePort } from '@/layout/fetcher';
import { BottomCreateEdit } from '@/components/commons/bottom-edit-creatr';

const initialValue = {
  description: '',
};

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
  const { translate: translateLocation } = useI18n('location');
  const router = useRouter();
  const [form] = Form.useForm<FormValues>();
  const { id } = router.query;
  const [isCheckEdit, setCheckEdit] = useState<boolean>(true);
  const typePorts = useQuery([API_MASTER_DATA.GET_TYPE_PORT], getListTypePort);
  const countries = useQuery([API_MASTER_DATA.GET_COUNTRY], () =>
    getListCountry({
      currentPage: 1,
      pageSize: 500,
    })
  );

  useEffect(() => {
    if (!id) return;
  }, [router, form]);

  const onFinish = (formValues: FormValues) => {
    handleSubmit(formValues);
  };

  const portDetailQuery = useQuery({
    queryKey: [API_LOCATION.GET_PORT_DETAIL, id],
    queryFn: () => getPortDetail(id as string),
    enabled: id !== undefined,
    onError: () => {
      router.push(ROUTERS.LOCATION);
    },
    onSuccess: (data) => {
      if (data.status) {
        form.setFieldsValue({
          portName: data.data.portName,
          portCode: data.data.portCode,
          typePorts: data.data.typePorts.map((type) => type.typePortID),
          countryID: data.data.countryID,
          status: data.data.status,
          description: data.data.description,
        });
      } else {
        router.push(ROUTERS.LOCATION);
      }
    },
  });

  const handleCheckEdit = (data: boolean) => {
    setCheckEdit(data);
  };

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
                  ? translateLocation('information_add_port')
                  : translateLocation('information_edit_port')}
              </Title>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col lg={12} span={24}>
              <Form.Item
                label={translateLocation('port_code.title')}
                tooltip={translateLocation('code')}
                name="portCode"
                rules={[
                  {
                    required: true,
                    message: translateLocation('port_code.error_required'),
                  },
                ]}
              >
                <Input
                  placeholder={translateLocation('port_code.placeholder')}
                  size="large"
                  disabled={checkRow && isCheckEdit}
                />
              </Form.Item>
            </Col>
            <Col lg={12} span={24}>
              <Form.Item
                label={translateLocation('port_name.title')}
                name="portName"
                rules={[
                  {
                    required: true,
                    message: translateLocation('port_name.error_required'),
                  },
                ]}
              >
                <Input
                  placeholder={translateLocation('port_name.placeholder')}
                  size="large"
                  disabled={checkRow && isCheckEdit}
                />
              </Form.Item>
            </Col>

            <Col lg={12} span={24}>
              <Form.Item
                label={translateLocation('type_port.title')}
                name="typePorts"
                rules={[
                  {
                    required: true,
                    message: translateLocation('type_port.error_required'),
                  },
                ]}
              >
                <Select
                  placeholder={translateLocation('type_port.placeholder')}
                  mode="multiple"
                  size="large"
                  options={
                    typePorts.data?.data.map((type) => ({
                      label: type.typePortName,
                      value: type.typePortID,
                    })) || []
                  }
                  disabled={checkRow && isCheckEdit}
                />
              </Form.Item>
            </Col>
            <Col lg={!create ? 6 : 12} span={24}>
              <Form.Item
                label={translateLocation('country.title')}
                name="countryID"
                rules={[
                  {
                    required: true,
                    message: translateLocation('country.error_required'),
                  },
                ]}
              >
                <Select
                  placeholder={translateLocation('country.placeholder')}
                  showSearch
                  size="large"
                  options={
                    countries.data?.data.data.map((item) => ({
                      value: item.countryID,
                      label: item.countryName,
                    })) || []
                  }
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
                  label={translateLocation('status_port.title')}
                  name="status"
                  rules={[
                    {
                      required: true,
                      message: translateLocation('status_port.error_required'),
                    },
                  ]}
                >
                  <Select
                    size="large"
                    placeholder={translateLocation('status_port.placeholder')}
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

            <Col span={24}>
              <Form.Item
                label={translateLocation('description.title')}
                name="description"
              >
                <TextArea
                  size="large"
                  placeholder={translateLocation('description.placeholder')}
                  allowClear
                  disabled={checkRow && isCheckEdit}
                />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        <BottomCreateEdit
          checkRow={checkRow}
          isCheckEdit={isCheckEdit}
          create={create}
          loading={loading}
          insertedByUser={portDetailQuery.data?.data?.insertedByUser || ''}
          dateInserted={portDetailQuery.data?.data?.dateInserted || ''}
          updatedByUser={portDetailQuery.data?.data?.updatedByUser || ''}
          dateUpdated={portDetailQuery.data?.data?.dateUpdated || ''}
          handleCheckEdit={handleCheckEdit}
        />
      </Form>
    </div>
  );
};

export default PortForm;
