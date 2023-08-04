import { ROUTERS } from '@/constant/router';
import useI18n from '@/i18n/useI18N';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  Button,
  Form,
  Input,
  Typography,
  Card,
  Row,
  Col,
  Cascader,
  Select,
} from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getListCity, getListCountry, getPortDetail } from '../fetcher';
import type { DefaultOptionType } from 'antd/es/cascader';
import { FormValues, STATUS_LABELS } from '../interface';

const initialValue = {
  portCode: '',
  portName: '',
  countryID: '',
  address: '',
  company: '',
};

interface Option {
  value?: string | number | null;
  label: React.ReactNode;
  children?: Option[];
  isLeaf?: boolean;
}

interface PortFormProps {
  create?: boolean;
  handleSubmit: (formValues: FormValues) => void;
}

const { Title } = Typography;

const PortForm = ({ create, handleSubmit }: PortFormProps) => {
  const { translate: translatePort } = useI18n('port');
  const router = useRouter();
  const [form] = Form.useForm<FormValues>();
  const { id } = router.query;
  const [options, setOptions] = useState<Option[]>([]);
  useEffect(() => {
    if (!id) return;
  }, [router, form]);

  const onFinish = (formValues: FormValues) => {
    handleSubmit(formValues);
  };

  useQuery({
    queryKey: ['countries'],
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
            isLeaf: false,
          }))
        );
      }
    },
  });

  const cityMutation = useMutation({
    mutationFn: (id: string) => getListCity({ id }),
  });

  const onChange = (value: (string | number)[]) => {
    if (value.length === 2) {
      console.log(1);
    }
  };
  const loadData = (selectedOptions: Option[]) => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    cityMutation.mutate(selectedOptions[0].value as string, {
      onSuccess: (data) => {
        targetOption.children = data.data.map((item) => ({
          value: item.cityID,
          label: item.cityName,
        }));
      },
    });
    setTimeout(() => {
      cityMutation.mutate(selectedOptions[0].value as string, {
        onSuccess: (data) => {
          targetOption.children = data.data.map((item) => ({
            value: item.cityID,
            label: item.cityName,
          }));
        },
      });
      setOptions([...options]);
    }, 1000);
  };
  const filter = (inputValue: string, path: DefaultOptionType[]) =>
    path.some(
      (option) =>
        (option.label as string)
          .toLowerCase()
          .indexOf(inputValue.toLowerCase()) > -1
    );

  const portDetailQuery = useQuery({
    queryKey: ['portDetail', id],
    queryFn: () => getPortDetail(id as string),
    enabled: id !== undefined,
  });

  useEffect(() => {
    if (portDetailQuery.data) {
      form.setFieldsValue({
        portName: portDetailQuery.data.data.portName,
        portCode: portDetailQuery.data.data.portCode,
        countryID: portDetailQuery.data.data.countryID,
        // address: portDetailQuery.data.data.address,
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
                  ? 'Thêm cảng mới'
                  : translatePort('information_edit_port')}
              </Title>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col lg={12} span={24}>
              <Form.Item
                label={translatePort('code')}
                tooltip={translatePort('code')}
                name="portCode"
                rules={[
                  {
                    required: true,
                    message: 'Please input Port Code',
                  },
                ]}
              >
                <Input placeholder={translatePort('new_port_placeholder')} />
              </Form.Item>
            </Col>
            <Col lg={12} span={24}>
              <Form.Item
                label={translatePort('name')}
                name="portName"
                rules={[
                  {
                    required: true,
                    message: 'Please input Port Name',
                  },
                ]}
              >
                <Input placeholder={translatePort('new_port_title')} />
              </Form.Item>
            </Col>

            <Col lg={12} span={24}>
              <Form.Item
                label={translatePort('type_of_port')}
                name="portCode"
                rules={[
                  { required: true, message: 'Please input type of port' },
                ]}
              >
                <Input placeholder="Please input type of port" />
              </Form.Item>
            </Col>
            <Col lg={!create ? 6 : 12} span={24}>
              <Form.Item
                label={translatePort('country_name')}
                name="countryID"
                rules={[
                  {
                    required: true,
                    message: 'Please select Country!',
                  },
                ]}
              >
                <Cascader
                  options={options}
                  loadData={loadData}
                  onChange={onChange}
                  changeOnSelect
                  placeholder="Please select city"
                  //   size="large"
                  showSearch={{ filter }}
                />
              </Form.Item>
            </Col>
            {!create ? (
              <Col lg={6} span={24}>
                <Form.Item
                  label={translatePort('status')}
                  name="status"
                  rules={[
                    {
                      required: true,
                      message: 'Please input type of status',
                    },
                  ]}
                >
                  <Select
                    placeholder="Please select status"
                    options={Object.values(STATUS_LABELS).map(
                      (type, index) => ({
                        label: type,
                        value: index + 1,
                      })
                    )}
                  />
                </Form.Item>
              </Col>
            ) : (
              <></>
            )}

            <Col lg={12} span={24}>
              <Form.Item
                label={translatePort('address')}
                name="address"
                rules={[{ required: true, message: 'Please input Address' }]}
              >
                <Input placeholder="Please input Address" />
              </Form.Item>
            </Col>
            <Col lg={12} span={24}>
              <Form.Item
                label={translatePort('company')}
                name="company"
                rules={[{ required: true, message: 'Please input company' }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        <Card>
          <Row gutter={12}>
            <Col>
              <Button onClick={() => router.push(ROUTERS.PORT)}>Cancel</Button>
            </Col>
            <Col>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </Col>
          </Row>
        </Card>
      </Form>
    </div>
  );
};

export default PortForm;
