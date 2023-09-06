import { ROUTERS } from '@/constant/router';
import useI18n from '@/i18n/useI18N';
import { useQuery } from '@tanstack/react-query';
import { Form, Input, Typography, Card, Row, Col, Select } from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FormValues, STATUS_MATER_LABELS } from '../interface';
import { API_CONTAINER_TYPE } from '@/fetcherAxios/endpoint';
import { BottomCreateEdit } from '@/components/commons/bottom-edit-creat-manager';
import { getContainerTypeDetail } from '../fetcher';
import DraftTable from '../table/draft-table';

const initialValue = {
  description: '',
};

interface PortFormProps {
  create?: boolean;
  manager?: boolean;
  edit?: boolean;
  handleSubmit?: (formValues: FormValues, id?: string) => void;
  handleSaveDraft?: (formValues: FormValues, id?: string) => void;
  handleApproveAndReject?: (id: string, status: string) => void;
  loadingSubmit: boolean;
  checkRow: boolean;
  useDraft?: boolean;
}

const { Title } = Typography;
const { TextArea } = Input;

const TypeOfContainerTypeForm = ({
  create,
  manager,
  edit,
  handleSubmit,
  handleSaveDraft,
  loadingSubmit: loading,
  checkRow,
  handleApproveAndReject,
  useDraft,
}: PortFormProps) => {
  const { translate: translateContainerType } = useI18n('typeOfContainer');
  const router = useRouter();
  const [form] = Form.useForm<FormValues>();
  const { id } = router.query;
  const [idQuery, setIdQuery] = useState<string>();
  const [isCheckPermissionEdit, setCheckPermissionEdit] =
    useState<boolean>(true);

  useEffect(() => {
    if (!id) return;
    setIdQuery(id as string);
  }, [router, form]);

  const handleIdQuery = (id: string) => {
    setIdQuery(id as string);
  };

  const onFinish = (formValues: FormValues) => {
    if (idQuery) {
      handleSubmit && handleSubmit(formValues, idQuery);
    } else {
      handleSubmit && handleSubmit(formValues);
    }
  };

  const onSaveDraft = () => {
    if (idQuery) {
      handleSaveDraft && handleSaveDraft(form.getFieldsValue(), idQuery);
    } else {
      handleSaveDraft && handleSaveDraft(form.getFieldsValue());
    }
  };

  const containerTypeDetailQuery = useQuery({
    queryKey: [API_CONTAINER_TYPE.GET_DETAIL, idQuery],
    queryFn: () => getContainerTypeDetail(idQuery as string),
    enabled: idQuery !== undefined,
    onSuccess: (data) => {
      if (data.status) {
        form.setFieldsValue({
          containerTypeCode: data.data.containerTypeCode,
          name: data.data.name,
          detailsEN: data.data.detailsEN,
          detailsVN: data.data.detailsVN,
          teus: data.data.teus,
          statusContainerType: data.data.statusContainerType,
        });
      } else {
        router.push(ROUTERS.LOCATION);
      }
    },
  });

  const handleCheckEdit = (data: boolean) => {
    setCheckPermissionEdit(data);
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
                  {create &&
                    translateContainerType('information_add_type_of_container')}
                  {manager && 'Approval needed requests'}
                  {edit &&
                    translateContainerType(
                      'information_edit_type_of_container'
                    )}
                </Title>
              </Col>
            </Row>
          }
          extra={
            create && useDraft && <DraftTable handleIdQuery={handleIdQuery} />
          }
        >
          <Row gutter={16}>
            <Col lg={!create && !manager ? 12 : 24} span={12}>
              <Form.Item
                label={translateContainerType('container_type_code_form.title')}
                name="containerTypeCode"
                rules={[
                  {
                    required: true,
                    message: translateContainerType(
                      'container_type_code_form.error_required'
                    ),
                  },
                ]}
              >
                <Input
                  placeholder={translateContainerType(
                    'container_type_code_form.placeholder'
                  )}
                  size="large"
                  disabled={checkRow && isCheckPermissionEdit}
                  allowClear
                />
              </Form.Item>
            </Col>

            {!create && !manager ? (
              <Col lg={12} span={24}>
                <Form.Item
                  label={translateContainerType('status_form.title')}
                  name="statusContainerType"
                  rules={[
                    {
                      required: true,
                      message: translateContainerType(
                        'status_form.error_required'
                      ),
                    },
                  ]}
                >
                  <Select
                    size="large"
                    placeholder={translateContainerType(
                      'status_form.placeholder'
                    )}
                    options={Object.keys(STATUS_MATER_LABELS).map((key) => ({
                      text: key,
                      value: key,
                    }))}
                    disabled={checkRow && isCheckPermissionEdit}
                    allowClear
                  />
                </Form.Item>
              </Col>
            ) : (
              <></>
            )}

            <Col lg={12} span={24}>
              <Form.Item
                label={translateContainerType('name_form.title')}
                name="name"
                rules={[
                  {
                    required: true,
                    message: translateContainerType('name_form.error_required'),
                  },
                ]}
              >
                <Input
                  placeholder={translateContainerType('name_form.placeholder')}
                  size="large"
                  disabled={checkRow && isCheckPermissionEdit}
                />
              </Form.Item>
            </Col>

            <Col lg={12} span={24}>
              <Form.Item
                label={translateContainerType('teus_form.title')}
                name="teus"
                rules={[
                  {
                    required: true,
                    message: translateContainerType('teus_form.error_required'),
                  },
                  {
                    max: 3,
                    message: 'Vui lòng nhập không nhiều hơn 3 số',
                  },
                ]}
              >
                <Input
                  type="number"
                  placeholder={translateContainerType('teus_form.placeholder')}
                  size="large"
                  disabled={checkRow && isCheckPermissionEdit}
                  allowClear
                />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                label={translateContainerType('details_en_form.title')}
                name="detailsEN"
                rules={[
                  {
                    required: true,
                    message: translateContainerType(
                      'details_en_form.error_required'
                    ),
                  },
                ]}
              >
                <TextArea
                  size="large"
                  placeholder={translateContainerType(
                    'details_en_form.placeholder'
                  )}
                  disabled={checkRow && isCheckPermissionEdit}
                  allowClear
                />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                label={translateContainerType('details_vn_form.title')}
                name="detailsVN"
                rules={[
                  {
                    required: true,
                    message: translateContainerType(
                      'details_vn_form.error_required'
                    ),
                  },
                ]}
              >
                <TextArea
                  size="large"
                  placeholder={translateContainerType(
                    'details_vn_form.placeholder'
                  )}
                  disabled={checkRow && isCheckPermissionEdit}
                  allowClear
                />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        <BottomCreateEdit
          create={create}
          checkRow={checkRow}
          edit={edit}
          loading={loading}
          isCheckPermissionEdit={isCheckPermissionEdit}
          insertedByUser={
            containerTypeDetailQuery.data?.data?.insertedByUser || ''
          }
          dateInserted={containerTypeDetailQuery.data?.data?.dateInserted || ''}
          updatedByUser={
            containerTypeDetailQuery.data?.data?.updatedByUser || ''
          }
          dateUpdated={containerTypeDetailQuery.data?.data?.dateUpdated || ''}
          handleCheckEdit={handleCheckEdit}
          handleSaveDraft={onSaveDraft}
          manager={manager}
          handleAJ={handleAJ}
          checkQuery={idQuery ? true : false}
          useDraft={useDraft}
        />
      </Form>
    </div>
  );
};

export default TypeOfContainerTypeForm;
