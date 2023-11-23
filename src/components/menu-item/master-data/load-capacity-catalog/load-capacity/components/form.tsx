import { ROUTERS } from '@/constant/router';
import useI18n from '@/i18n/useI18N';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  Form,
  Input,
  Typography,
  Card,
  Row,
  Col,
  Select,
  Switch,
  Tabs,
} from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  API_LOAD_CAPACITY,
  API_LOAD_CAPACITY_TYPE,
} from '@/fetcherAxios/endpoint';
import { BottomCreateEdit } from '@/components/commons/bottom-edit-creat-manager';
import {
  getListTypeLoadCapacityID,
  getLoadCapacityDetail,
  updateStatus,
} from '../fetcher';
import DraftTable from '../table/draft-table';
import { IFormValues, IUpdateStatusLoadCapacity } from '../interface';
import { STATUS_ALL_LABELS, STATUS_MASTER_COLORS } from '@/constant/form';
import { errorToast, successToast } from '@/hook/toast';
import { API_MESSAGE } from '@/constant/message';

const initialValue = {
  name: '',
  code: '',
  description: '',
};

interface FormProps {
  create?: boolean;
  manager?: boolean;
  edit?: boolean;
  handleSubmit?: (formValues: IFormValues, id?: string) => void;
  handleSaveDraft?: (formValues: IFormValues, id?: string) => void;
  loadingSubmit?: boolean;
  checkRow: boolean;
  useDraft?: boolean;
}

const { Title } = Typography;

const LoadCapacityForm = ({
  create,
  manager,
  edit,
  handleSubmit,
  handleSaveDraft,
  loadingSubmit,
  checkRow,
  useDraft,
}: FormProps) => {
  const { translate: translateLoadCapacity } = useI18n('loadCapacity');
  const router = useRouter();
  const [form] = Form.useForm<IFormValues>();
  const { id } = router.query;
  const [idQuery, setIdQuery] = useState<string>();
  const [isCheckPermissionEdit, setCheckPermissionEdit] =
    useState<boolean>(false);
  const [checkStatus, setCheckStatus] = useState<boolean>(true);
  const propCopyAndCreate = router.query;

  const typeLoadCapacity = useQuery(
    [API_LOAD_CAPACITY_TYPE.GET_ALL],
    getListTypeLoadCapacityID
  );

  useEffect(() => {
    if (!id) return;
    setIdQuery(id as string);
  }, [router, form]);

  const handleIdQuery = (id: string) => {
    setIdQuery(id as string);
  };

  const onFinish = (formValues: IFormValues) => {
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
    queryKey: [API_LOAD_CAPACITY.GET_DETAIL, idQuery],
    queryFn: () => getLoadCapacityDetail(idQuery as string),
    enabled: idQuery !== undefined,
    onSuccess: (data) => {
      if (data.status) {
        form.setFieldsValue({
          loadCapacityID: data.data.loadCapacityID,
          code: data.data.code,
          name: data.data.name,
          typeLoadCapacityID: data.data.typeLoadCapacityID,
          descriptionEN: data.data.descriptionEN,
          descriptionVN: data.data.descriptionVN,
          statusLoadCapacity: data.data.statusLoadCapacity,
        });
      } else {
        router.push(ROUTERS.LOAD_CAPACITY);
      }
    },
  });

  const handleCheckEdit = (data: boolean) => {
    setCheckPermissionEdit(data);
  };

  const updateStatusMutation = useMutation({
    mutationFn: (body: IUpdateStatusLoadCapacity) => {
      return updateStatus(body);
    },
  });

  const handleAR = (status: string) => {
    if (idQuery) {
      const _requestData: IUpdateStatusLoadCapacity = {
        id: [idQuery],
        status,
      };
      updateStatusMutation.mutate(_requestData, {
        onSuccess: (data) => {
          data.status
            ? (successToast(data.message), router.push(ROUTERS.LOAD_CAPACITY))
            : errorToast(data.message);
        },
        onError() {
          errorToast(API_MESSAGE.ERROR);
        },
      });
    }
  };

  const handleCopyAndCreate = () => {
    const props = {
      checkCopyAndCreate: true,
      code: form.getFieldValue('code'),
      name: form.getFieldValue('name'),
      typeLoadCapacityID: form.getFieldValue('typeLoadCapacityID'),
      descriptionEN: form.getFieldValue('descriptionEN'),
      descriptionVN: form.getFieldValue('descriptionVN'),
    };
    router.push({
      pathname: ROUTERS.LOAD_CAPACITY_CREATE,
      query: props,
    });
  };

  useEffect(() => {
    if (form.getFieldValue('statusLoadCapacity')) {
      form.getFieldValue('statusLoadCapacity') === STATUS_ALL_LABELS.ACTIVE
        ? setCheckStatus(true)
        : setCheckStatus(false);
    }
    if ((edit && checkRow) || manager) {
      setCheckPermissionEdit(true);
    }
    if (propCopyAndCreate.checkCopyAndCreate) {
      form.setFieldsValue({
        code: propCopyAndCreate.code as string,
        name: propCopyAndCreate.name as string,
        typeLoadCapacityID: propCopyAndCreate.typeLoadCapacityID as string,
        descriptionEN: propCopyAndCreate.descriptionEN as string,
        descriptionVN: propCopyAndCreate.descriptionVN as string,
      });
    }
  }, [
    form,
    edit,
    checkRow,
    manager,
    propCopyAndCreate,
    form.getFieldValue('statusLoadCapacity'),
  ]);

  const contentEN = () => {
    return (
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            label={translateLoadCapacity(
              'description_load_capacity_form.titleEn'
            )}
            name="descriptionEN"
          >
            <Input.TextArea
              size="large"
              placeholder={translateLoadCapacity(
                'description_load_capacity_form.placeholder'
              )}
              allowClear
              disabled={checkRow && isCheckPermissionEdit}
            />
          </Form.Item>
        </Col>
      </Row>
    );
  };

  const contentVN = () => {
    return (
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            label={translateLoadCapacity(
              'description_load_capacity_form.titleVn'
            )}
            name="descriptionVN"
          >
            <Input.TextArea
              size="large"
              placeholder={translateLoadCapacity(
                'description_load_capacity_form.placeholder'
              )}
              allowClear
              disabled={checkRow && isCheckPermissionEdit}
            />
          </Form.Item>
        </Col>
      </Row>
    );
  };

  const items = [
    {
      key: 'EN',
      label: 'EN',
      children: contentEN(),
      forceRender: true,
    },
    {
      key: 'VN',
      label: 'VN',
      children: contentVN(),
      forceRender: true,
    },
  ];

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
                    translateLoadCapacity('information_add_of_load_capacity')}
                  {manager && 'Approval needed requests'}
                  {edit &&
                    (checkRow ? (
                      <>
                        {isCheckPermissionEdit && 'View'}
                        {!isCheckPermissionEdit &&
                          translateLoadCapacity(
                            'information_edit_of_load_capacity'
                          )}
                      </>
                    ) : (
                      translateLoadCapacity('information_edit_of_load_capacity')
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
                    const _requestData: IUpdateStatusLoadCapacity = {
                      id: [idQuery],
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
                label={translateLoadCapacity('code_load_capacity_form.title')}
                name="code"
                rules={[
                  {
                    required: true,
                    message: translateLoadCapacity(
                      'code_load_capacity_form.error_required'
                    ),
                  },
                ]}
              >
                <Input
                  placeholder={translateLoadCapacity(
                    'code_load_capacity_form.placeholder'
                  )}
                  size="large"
                  disabled={checkRow && isCheckPermissionEdit}
                />
              </Form.Item>
            </Col>

            <Col lg={12} span={24}>
              <Form.Item
                label={translateLoadCapacity('name_load_capacity_form.title')}
                name="name"
                rules={[
                  {
                    required: true,
                    message: translateLoadCapacity(
                      'name_load_capacity_form.error_required'
                    ),
                  },
                ]}
              >
                <Input
                  placeholder={translateLoadCapacity(
                    'name_load_capacity_form.placeholder'
                  )}
                  size="large"
                  disabled={checkRow && isCheckPermissionEdit}
                />
              </Form.Item>
            </Col>

            <Col lg={12} span={24}>
              <Form.Item
                label={translateLoadCapacity('type_load_capacity_form.title')}
                name="typeLoadCapacityID"
                rules={[
                  {
                    required: true,
                    message: translateLoadCapacity(
                      'type_load_capacity_form.error_required'
                    ),
                  },
                ]}
              >
                <Select
                  placeholder={translateLoadCapacity(
                    'type_load_capacity_form.placeholder'
                  )}
                  size="large"
                  options={
                    typeLoadCapacity.data?.data.map((type) => ({
                      label: type.typeLoadCapacityName,
                      value: type.typeLoadCapacityID,
                    })) || []
                  }
                  disabled={checkRow && isCheckPermissionEdit}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Tabs items={items} />
            </Col>

            <Col span={0}>
              <Form.Item name="statusLoadCapacity"></Form.Item>
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

export default LoadCapacityForm;
