import { ROUTERS } from '@/constant/router';
import useI18n from '@/i18n/useI18N';
import { useQuery } from '@tanstack/react-query';
import { Form, Input, Typography, Card, Row, Col, Select } from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FormValues, STATUS_MATER_LABELS } from '../interface';
import { API_UNIT } from '@/fetcherAxios/endpoint';
import { BottomCreateEdit } from '@/components/commons/bottom-edit-creatr';
import { getUnitDetail } from '../fetcher';
import DraftTable from './draft-table';

const initialValue = {
  description: '',
};

interface PortFormProps {
  create?: boolean;
  handleSubmit?: (formValues: FormValues) => void;
  handleSaveDraft?: (formValues: FormValues) => void;
  handleApproveAndReject?: (id: string, status: string) => void;
  loadingSubmit: boolean;
  checkRow: boolean;
  manager?: boolean;
}

const { Title } = Typography;
const { TextArea } = Input;

const UnitForm = ({
  create,
  handleSubmit,
  handleSaveDraft,
  loadingSubmit: loading,
  checkRow,
  manager,
  handleApproveAndReject,
}: PortFormProps) => {
  const { translate: translateUnit } = useI18n('unit');
  const router = useRouter();
  const [form] = Form.useForm<FormValues>();
  const { id } = router.query;
  const [isCheckEdit, setCheckEdit] = useState<boolean>(true);
  console.log(manager);

  useEffect(() => {
    if (!id) return;
  }, [router, form]);

  const onFinish = (formValues: FormValues) => {
    handleSubmit && handleSubmit(formValues);
  };

  const onSaveDraft = () => {
    handleSaveDraft && handleSaveDraft(form.getFieldsValue());
  };

  const unitDetailQuery = useQuery({
    queryKey: [API_UNIT.GET_UNIT_DETAIL, id],
    queryFn: () => getUnitDetail(id as string),
    enabled: id !== undefined,
    onSuccess: (data) => {
      if (data.status) {
        form.setFieldsValue({
          internationalCode: data.data.internationalCode,
          descriptionVN: data.data.descriptionVN,
          descriptionEN: data.data.descriptionEN,
          statusUnit: data.data.statusUnit,
        });
      } else {
        router.push(ROUTERS.LOCATION);
      }
    },
  });

  const handleCheckEdit = (data: boolean) => {
    setCheckEdit(data);
  };

  const handleAJ = (status: string) => {
    handleApproveAndReject && handleApproveAndReject(id as string, status);
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
        <Card
          style={{ marginBottom: 24 }}
          title={
            <Row justify={'center'}>
              <Col>
                <Title level={3} style={{ margin: '-4px 0' }}>
                  {create
                    ? translateUnit('information_add_unit')
                    : translateUnit('information_edit_unit')}
                </Title>
              </Col>
            </Row>
          }
          extra={<DraftTable />}
        >
          <Row gutter={16}>
            <Col lg={!create && !manager ? 12 : 24} span={12}>
              <Form.Item
                label={translateUnit('international_code_form.title')}
                name="internationalCode"
                rules={[
                  {
                    required: true,
                    message: translateUnit(
                      'international_code_form.error_required'
                    ),
                  },
                ]}
              >
                <Input
                  placeholder={translateUnit(
                    'international_code_form.placeholder'
                  )}
                  size="large"
                  disabled={checkRow && isCheckEdit}
                />
              </Form.Item>
            </Col>
            {!create && !manager ? (
              <Col lg={12} span={24}>
                <Form.Item
                  label={translateUnit('status_form.title')}
                  name="statusUnit"
                  rules={[
                    {
                      required: true,
                      message: translateUnit('status_form.error_required'),
                    },
                  ]}
                >
                  <Select
                    size="large"
                    placeholder={translateUnit('status_form.placeholder')}
                    options={Object.keys(STATUS_MATER_LABELS).map((key) => ({
                      text: key,
                      value: key,
                    }))}
                    disabled={checkRow && isCheckEdit}
                  />
                </Form.Item>
              </Col>
            ) : (
              <></>
            )}

            <Col span={24}>
              <Form.Item
                label={translateUnit('description_vn_form.title')}
                name="descriptionVN"
                rules={[
                  {
                    required: true,
                    message: translateUnit(
                      'description_vn_form.error_required'
                    ),
                  },
                ]}
              >
                <TextArea
                  size="large"
                  placeholder={translateUnit('description_vn_form.placeholder')}
                  allowClear
                  disabled={checkRow && isCheckEdit}
                />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                label={translateUnit('description_en_form.title')}
                name="descriptionEN"
                rules={[
                  {
                    required: true,
                    message: translateUnit(
                      'description_en_form.error_required'
                    ),
                  },
                ]}
              >
                <TextArea
                  size="large"
                  placeholder={translateUnit('description_en_form.placeholder')}
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
          insertedByUser={unitDetailQuery.data?.data?.insertedByUser || ''}
          dateInserted={unitDetailQuery.data?.data?.dateInserted || ''}
          updatedByUser={unitDetailQuery.data?.data?.updatedByUser || ''}
          dateUpdated={unitDetailQuery.data?.data?.dateUpdated || ''}
          handleCheckEdit={handleCheckEdit}
          handleSaveDraft={onSaveDraft}
          manager={manager}
          handleAJ={handleAJ}
        />
      </Form>
    </div>
  );
};

export default UnitForm;
