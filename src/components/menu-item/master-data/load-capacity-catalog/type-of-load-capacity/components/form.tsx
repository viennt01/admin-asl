import { ROUTERS } from '@/constant/router';
import useI18n from '@/i18n/useI18N';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Form, Input, Typography, Card, Row, Col, Tabs, Switch } from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { API_LOAD_CAPACITY_TYPE } from '@/fetcherAxios/endpoint';
import { BottomCreateEdit } from '@/components/commons/bottom-edit-creat-manager';
import { geLoadCapacityTypeDetail, updateStatus } from '../fetcher';
import DraftTable from '../table/draft-table';
import { FormValues, IUpdateStatusLoadCapacityType } from '../interface';
import { STATUS_ALL_LABELS, STATUS_MASTER_COLORS } from '@/constant/form';
import { errorToast, successToast } from '@/hook/toast';
import { API_MESSAGE } from '@/constant/message';

const initialValue = {
  typeLocationNameEN: '',
  descriptionEN: '',
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

const LoadCapacityTypeForm = ({
  create,
  manager,
  edit,
  handleSubmit,
  handleSaveDraft,
  loadingSubmit,
  checkRow,
  useDraft,
}: FormProps) => {
  const { translate: translateLoadCapacityType } =
    useI18n('typeOfLoadCapacity');
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
    queryKey: [API_LOAD_CAPACITY_TYPE.GET_DETAIL, idQuery],
    queryFn: () => geLoadCapacityTypeDetail(idQuery as string),
    enabled: idQuery !== undefined,
    onSuccess: (data) => {
      if (data.status) {
        form.setFieldsValue({
          typeLoadCapacityID: data.data.typeLoadCapacityID,
          typeLoadCapacityCode: data.data.typeLoadCapacityCode,
          typeLoadCapacityNameEN: data.data.typeLoadCapacityNameEN,
          typeLoadCapacityNameVN: data.data.typeLoadCapacityNameVN,
          descriptionEN: data.data.descriptionEN,
          descriptionVN: data.data.descriptionVN,
          statusTypeLoadCapacity: data.data.statusTypeLoadCapacity,
          public: data.data.public,
        });
      } else {
        router.push(ROUTERS.TYPE_OF_LOAD_CAPACITY);
      }
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: (body: IUpdateStatusLoadCapacityType) => {
      return updateStatus(body);
    },
  });

  const handleCheckEdit = (data: boolean) => {
    setCheckPermissionEdit(data);
  };

  const handleAR = (status: string) => {
    if (idQuery) {
      const _requestData: IUpdateStatusLoadCapacityType = {
        id: [idQuery],
        status,
      };
      updateStatusMutation.mutate(_requestData, {
        onSuccess: (data) => {
          data.status
            ? (successToast(data.message),
              router.push(ROUTERS.TYPE_OF_LOAD_CAPACITY))
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

  const contentEN = () => {
    return (
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            label={translateLoadCapacityType(
              'name_type_load_capacity_form.titleEn'
            )}
            name="typeLoadCapacityNameEN"
            rules={[
              {
                required: true,
                message: translateLoadCapacityType(
                  'name_type_load_capacity_form.error_required'
                ),
              },
            ]}
          >
            <Input
              placeholder={translateLoadCapacityType(
                'name_type_load_capacity_form.placeholder'
              )}
              size="large"
              disabled={checkRow && isCheckPermissionEdit}
            />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item
            label={translateLoadCapacityType(
              'description_type_load_capacity_form.titleEn'
            )}
            name="descriptionEN"
            rules={[
              {
                required: true,
                message: translateLoadCapacityType(
                  'description_type_load_capacity_form.error_required'
                ),
              },
            ]}
          >
            <Input.TextArea
              size="large"
              placeholder={translateLoadCapacityType(
                'description_type_load_capacity_form.placeholder'
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
            label={translateLoadCapacityType(
              'name_type_load_capacity_form.titleVn'
            )}
            name="typeLoadCapacityNameVN"
          >
            <Input
              placeholder={translateLoadCapacityType(
                'name_type_load_capacity_form.placeholder'
              )}
              size="large"
              disabled={checkRow && isCheckPermissionEdit}
            />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item
            label={translateLoadCapacityType(
              'description_type_load_capacity_form.titleVn'
            )}
            name="descriptionVN"
          >
            <Input.TextArea
              size="large"
              placeholder={translateLoadCapacityType(
                'description_type_load_capacity_form.placeholder'
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

  const handleCopyAndCreate = () => {
    const props = {
      checkCopyAndCreate: true,
      typeLoadCapacityID: form.getFieldValue('typeLoadCapacityID'),
      typeLoadCapacityCode: form.getFieldValue('typeLoadCapacityCode'),
      typeLoadCapacityNameEN: form.getFieldValue('typeLoadCapacityNameEN'),
      typeLoadCapacityNameVN: form.getFieldValue('typeLoadCapacityNameVN'),
      descriptionEN: form.getFieldValue('descriptionEN'),
      descriptionVN: form.getFieldValue('descriptionVN'),
    };
    router.push({
      pathname: ROUTERS.TYPE_OF_LOAD_CAPACITY_CREATE,
      query: props,
    });
  };

  useEffect(() => {
    if (form.getFieldValue('statusTypeLoadCapacity')) {
      form.getFieldValue('statusTypeLoadCapacity') === STATUS_ALL_LABELS.ACTIVE
        ? setCheckStatus(true)
        : setCheckStatus(false);
    }
    if ((edit && checkRow) || manager) {
      setCheckPermissionEdit(true);
    }
    if (propCopyAndCreate.checkCopyAndCreate) {
      form.setFieldsValue({
        typeLoadCapacityID: propCopyAndCreate.typeLoadCapacityID as string,
        typeLoadCapacityCode: propCopyAndCreate.typeLoadCapacityCode as string,
        typeLoadCapacityNameEN:
          propCopyAndCreate.typeLoadCapacityNameEN as string,
        typeLoadCapacityNameVN:
          propCopyAndCreate.typeLoadCapacityNameVN as string,
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
    form.getFieldValue('statusTypeLoadCapacity'),
  ]);

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
                    translateLoadCapacityType(
                      'information_add_type_of_load_capacity'
                    )}
                  {manager && 'Approval needed requests'}
                  {edit &&
                    (checkRow ? (
                      <>
                        {isCheckPermissionEdit && 'View'}
                        {!isCheckPermissionEdit &&
                          translateLoadCapacityType(
                            'information_edit_type_of_load_capacity'
                          )}
                      </>
                    ) : (
                      translateLoadCapacityType(
                        'information_edit_type_of_load_capacity'
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
                    const _requestData: IUpdateStatusLoadCapacityType = {
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
          <Col span={24}>
            <Form.Item
              label={translateLoadCapacityType(
                'code_type_load_capacity_form.title'
              )}
              name="typeLoadCapacityCode"
              rules={[
                {
                  required: true,
                  message: translateLoadCapacityType(
                    'code_type_load_capacity_form.error_required'
                  ),
                },
              ]}
            >
              <Input
                size="large"
                placeholder={translateLoadCapacityType(
                  'code_type_load_capacity_form.placeholder'
                )}
                allowClear
                disabled={checkRow && isCheckPermissionEdit}
              />
            </Form.Item>
          </Col>
          <Tabs items={items} />
          <Col span={0}>
            <Form.Item name="statusTypeLoadCapacity"></Form.Item>
          </Col>
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

export default LoadCapacityTypeForm;
