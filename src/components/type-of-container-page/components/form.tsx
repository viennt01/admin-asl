import { ROUTERS } from '@/constant/router';
import useI18n from '@/i18n/useI18N';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Form, Input, Typography, Card, Row, Col, Switch } from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FormValues, UpdateStatusContainerType } from '../interface';
import { API_CONTAINER_TYPE } from '@/fetcherAxios/endpoint';
import { BottomCreateEdit } from '@/components/commons/bottom-edit-creat-manager';
import { getContainerTypeDetail, updateStatus } from '../fetcher';
import DraftTable from '../table/draft-table';
import { errorToast, successToast } from '@/hook/toast';
import { API_MESSAGE } from '@/constant/message';
import { STATUS_ALL_LABELS, STATUS_MASTER_COLORS } from '@/constant/form';

const initialValue = {
  name: '',
};

interface FormProps {
  create?: boolean;
  manager?: boolean;
  edit?: boolean;
  handleSubmit?: (formValues: FormValues, id?: string) => void;
  handleSaveDraft?: (formValues: FormValues, id?: string) => void;
  loadingSubmit?: boolean;
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
  loadingSubmit,
  checkRow,
  useDraft,
}: FormProps) => {
  const { translate: translateContainerType } = useI18n('typeOfContainer');
  const router = useRouter();
  const [form] = Form.useForm<FormValues>();
  const { id } = router.query;
  const [idQuery, setIdQuery] = useState<string>();
  const [isCheckPermissionEdit, setCheckPermissionEdit] =
    useState<boolean>(false);
  const [checkStatus, setCheckStatus] = useState<boolean>(true);
  const propCopyAndCreate = router.query;

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

  const detailQuery = useQuery({
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

  const updateStatusMutation = useMutation({
    mutationFn: (body: UpdateStatusContainerType) => {
      return updateStatus(body);
    },
  });

  const handleAR = (status: string) => {
    if (idQuery) {
      const _requestData: UpdateStatusContainerType = {
        id: idQuery,
        status,
      };
      updateStatusMutation.mutate(_requestData, {
        onSuccess: (data) => {
          data.status
            ? (successToast(data.message),
              router.push(ROUTERS.TYPES_OF_CONTAINER))
            : errorToast(data.message);
        },
        onError() {
          errorToast(API_MESSAGE.ERROR);
        },
      });
    } else {
      errorToast(API_MESSAGE.ERROR);
    }
  };

  const handleCopyAndCreate = () => {
    const props = {
      checkCopyAndCreate: true,
      containerTypeCode: form.getFieldValue('containerTypeCode'),
      name: form.getFieldValue('name'),
      detailsEN: form.getFieldValue('detailsEN'),
      detailsVN: form.getFieldValue('detailsVN'),
      teus: form.getFieldValue('teus'),
    };
    router.push({
      pathname: ROUTERS.TYPES_OF_CONTAINER_CREATE,
      query: props,
    });
  };

  useEffect(() => {
    console.log(form.getFieldValue('statusContainerType'));

    if (form.getFieldValue('statusContainerType')) {
      form.getFieldValue('statusContainerType') === STATUS_ALL_LABELS.ACTIVE
        ? setCheckStatus(true)
        : setCheckStatus(false);
    }
    if ((edit && checkRow) || manager) {
      setCheckPermissionEdit(true);
    }
    if (propCopyAndCreate.checkCopyAndCreate) {
      form.setFieldsValue({
        containerTypeCode: propCopyAndCreate.containerTypeCode as string,
        name: propCopyAndCreate.name as string,
        detailsEN: propCopyAndCreate.detailsEN as string,
        detailsVN: propCopyAndCreate.detailsVN as string,
        teus: propCopyAndCreate.teus as string,
      });
    }
  }, [
    form,
    edit,
    checkRow,
    manager,
    propCopyAndCreate,
    form.getFieldValue('statusContainerType'),
  ]);

  console.log('formall', form.getFieldsValue());

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
                    (checkRow ? (
                      <>
                        {isCheckPermissionEdit && 'View'}
                        {!isCheckPermissionEdit &&
                          translateContainerType(
                            'information_edit_type_of_container'
                          )}
                      </>
                    ) : (
                      translateContainerType(
                        'information_edit_type_of_container'
                      )
                    ))}
                </Title>
              </Col>
            </Row>
          }
          extra={
            <>
              {create && useDraft && (
                <DraftTable handleIdQuery={handleIdQuery} />
              )}
              {edit && idQuery && !isCheckPermissionEdit && (
                <Switch
                  checked={checkStatus}
                  checkedChildren="Active"
                  unCheckedChildren="Deactive"
                  style={{
                    backgroundColor: checkStatus
                      ? STATUS_MASTER_COLORS.ACTIVE
                      : STATUS_MASTER_COLORS.DEACTIVE,
                  }}
                  onChange={(value) => {
                    const _requestData: UpdateStatusContainerType = {
                      id: idQuery,
                      status: value
                        ? STATUS_ALL_LABELS.ACTIVE
                        : STATUS_ALL_LABELS.DEACTIVE,
                    };

                    updateStatusMutation.mutate(_requestData, {
                      onSuccess: (data) => {
                        data.status
                          ? (successToast(data.message),
                            setCheckStatus(!checkStatus))
                          : errorToast(data.message);
                      },
                      onError() {
                        errorToast(API_MESSAGE.ERROR);
                      },
                    });
                  }}
                  loading={updateStatusMutation.isLoading}
                />
              )}
            </>
          }
        >
          <Row gutter={16}>
            <Col lg={12} span={24}>
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
            <Col span={0}>
              <Form.Item name="statusContainerType"></Form.Item>
            </Col>
          </Row>
        </Card>

        <BottomCreateEdit
          create={create}
          checkRow={checkRow}
          edit={edit}
          loading={loadingSubmit || false}
          isCheckPermissionEdit={isCheckPermissionEdit}
          insertedByUser={detailQuery.data?.data?.insertedByUser || ''}
          dateInserted={detailQuery.data?.data?.dateInserted || ''}
          updatedByUser={detailQuery.data?.data?.updatedByUser || ''}
          dateUpdated={detailQuery.data?.data?.dateUpdated || ''}
          handleCheckEdit={handleCheckEdit}
          handleSaveDraft={onSaveDraft}
          manager={manager}
          handleAR={handleAR}
          checkQuery={idQuery ? true : false}
          useDraft={useDraft}
          handleCopyAndCreate={handleCopyAndCreate}
        />
      </Form>
    </div>
  );
};

export default TypeOfContainerTypeForm;
