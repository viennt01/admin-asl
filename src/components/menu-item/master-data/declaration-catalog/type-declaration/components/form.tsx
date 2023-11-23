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
  Switch,
  Tabs,
  Select,
} from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { IFormValues, IUpdateStatusDeclaration } from '../interface';
import {
  API_TRANSACTION_TYPE,
  API_TYPE_DECLARATION,
} from '@/fetcherAxios/endpoint';
import { BottomCreateEdit } from '@/components/commons/bottom-edit-creat-manager';
import {
  getDeclarationDetail,
  getListTypeTransaction,
  updateStatus,
} from '../fetcher';
import DraftTable from '../table/draft-table';
import { STATUS_ALL_LABELS, STATUS_MASTER_COLORS } from '@/constant/form';
import { UpdateStatusLocationType } from '@/components/menu-item/master-data/location-catalog/type-of-location/interface';
import { errorToast, successToast } from '@/hook/toast';
import { API_MESSAGE } from '@/constant/message';

const initialValue = {
  description: '',
};

interface PortFormProps {
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

const TypeDeclarationForm = ({
  create,
  manager,
  edit,
  handleSubmit,
  handleSaveDraft,
  loadingSubmit,
  checkRow,
  useDraft,
}: PortFormProps) => {
  const { translate: translateDeclaration } = useI18n('typeOfDeclaration');
  const router = useRouter();
  const [form] = Form.useForm<IFormValues>();
  const { id } = router.query;
  const [idQuery, setIdQuery] = useState<string>();
  const [isCheckPermissionEdit, setCheckPermissionEdit] =
    useState<boolean>(false);
  const [checkStatus, setCheckStatus] = useState<boolean>(true);
  const propCopyAndCreate = router.query;
  const typeTransaction = useQuery(
    [API_TRANSACTION_TYPE.GET_ALL],
    getListTypeTransaction
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
    queryKey: [API_TYPE_DECLARATION.GET_DETAIL, idQuery],
    queryFn: () => getDeclarationDetail(idQuery as string),
    enabled: idQuery !== undefined,
    onSuccess: (data) => {
      if (data.status) {
        form.setFieldsValue({
          transactionTypeID: data.data.transactionTypeID,
          typeDelaracrionCode: data.data.typeDelaracrionCode,
          typeDelaracrionNameEN: data.data.typeDelaracrionNameEN,
          typeDelaracrionNameVN: data.data.typeDelaracrionNameVN,
          descriptionVN: data.data.descriptionVN,
          descriptionEN: data.data.descriptionEN,
          statusTypeDelaracrion: data.data.statusTypeDelaracrion,
        });
      } else {
        router.push(ROUTERS.TYPE_DECLARATION);
      }
    },
  });

  const handleCheckEdit = (data: boolean) => {
    setCheckPermissionEdit(data);
  };

  const handleAR = (status: string) => {
    if (idQuery) {
      const _requestData: UpdateStatusLocationType = {
        id: [idQuery],
        status,
      };
      updateStatusMutation.mutate(_requestData, {
        onSuccess: (data) => {
          data.status
            ? (successToast(data.message),
              router.push(ROUTERS.TYPE_DECLARATION))
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

  const updateStatusMutation = useMutation({
    mutationFn: (body: IUpdateStatusDeclaration) => {
      return updateStatus(body);
    },
  });

  const handleCopyAndCreate = () => {
    const props = {
      checkCopyAndCreate: true,
      transactionTypeID: form.getFieldValue('transactionTypeID'),
      typeDelaracrionCode: form.getFieldValue('typeDelaracrionCode'),
      typeDelaracrionNameEN: form.getFieldValue('typeDelaracrionNameEN'),
      typeDelaracrionNameVN: form.getFieldValue('typeDelaracrionNameVN'),
      descriptionVN: form.getFieldValue('descriptionVN'),
      descriptionEN: form.getFieldValue('descriptionEN'),
    };
    router.push({
      pathname: ROUTERS.TYPE_DECLARATION_CREATE,
      query: props,
    });
  };
  useEffect(() => {
    if (form.getFieldValue('statusTypeDelaracrion')) {
      form.getFieldValue('statusTypeDelaracrion') === STATUS_ALL_LABELS.ACTIVE
        ? setCheckStatus(true)
        : setCheckStatus(false);
    }
    if ((edit && checkRow) || manager) {
      setCheckPermissionEdit(true);
    }
    if (propCopyAndCreate.checkCopyAndCreate) {
      form.setFieldsValue({
        transactionTypeID: propCopyAndCreate.transactionTypeID as string,
        typeDelaracrionCode: propCopyAndCreate.typeDelaracrionCode as string,
        typeDelaracrionNameEN:
          propCopyAndCreate.typeDelaracrionNameEN as string,
        typeDelaracrionNameVN:
          propCopyAndCreate.typeDelaracrionNameVN as string,
        descriptionVN: propCopyAndCreate.descriptionVN as string,
        descriptionEN: propCopyAndCreate.descriptionEN as string,
        statusTypeDelaracrion:
          propCopyAndCreate.statusTypeDelaracrion as string,
      });
    }
  }, [
    form,
    edit,
    checkRow,
    manager,
    propCopyAndCreate,
    form.getFieldValue('statusTypeDelaracrion'),
  ]);

  const contentEN = () => {
    return (
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            label={translateDeclaration('name_type_declaration_form.titleEn')}
            name="typeDelaracrionNameEN"
            rules={[
              {
                required: true,
                message: translateDeclaration(
                  'name_type_declaration_form.error_required'
                ),
              },
            ]}
          >
            <Input
              placeholder={translateDeclaration(
                'name_type_declaration_form.placeholder'
              )}
              size="large"
              disabled={checkRow && isCheckPermissionEdit}
            />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item
            label={translateDeclaration(
              'description_type_declaration_form.titleEn'
            )}
            name="descriptionEN"
          >
            <Input.TextArea
              size="large"
              placeholder={translateDeclaration(
                'description_type_declaration_form.placeholder'
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
            label={translateDeclaration('name_type_declaration_form.titleVn')}
            name="typeDelaracrionNameVN"
          >
            <Input
              placeholder={translateDeclaration(
                'name_type_declaration_form.placeholder'
              )}
              size="large"
              disabled={checkRow && isCheckPermissionEdit}
            />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item
            label={translateDeclaration(
              'description_type_declaration_form.title'
            )}
            name="descriptionVN"
          >
            <Input.TextArea
              size="large"
              placeholder={translateDeclaration(
                'description_type_declaration_form.placeholder'
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
                    translateDeclaration('information_add_type_of_declaration')}
                  {manager && 'Approval needed requests'}
                  {edit &&
                    (checkRow ? (
                      <>
                        {isCheckPermissionEdit && 'View'}
                        {!isCheckPermissionEdit &&
                          translateDeclaration(
                            'information_edit_type_of_declaration"'
                          )}
                      </>
                    ) : (
                      translateDeclaration(
                        'information_edit_type_of_declaration"'
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
                    const _requestData: UpdateStatusLocationType = {
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
                label={translateDeclaration('code_declaration_form.title')}
                name="typeDelaracrionCode"
                rules={[
                  {
                    required: true,
                    message: translateDeclaration(
                      'code_declaration_form.error_required'
                    ),
                  },
                ]}
              >
                <Input
                  size="large"
                  placeholder={translateDeclaration(
                    'code_declaration_form.placeholder'
                  )}
                  allowClear
                  disabled={checkRow && isCheckPermissionEdit}
                />
              </Form.Item>
            </Col>
            <Col lg={12} span={24}>
              <Form.Item
                label={translateDeclaration(
                  'transaction_name_declaration_form.title'
                )}
                name="transactionTypeID"
                rules={[
                  {
                    required: true,
                    message: translateDeclaration(
                      'transaction_name_declaration_form.error_required'
                    ),
                  },
                ]}
              >
                <Select
                  placeholder={translateDeclaration(
                    'transaction_name_declaration_form.placeholder'
                  )}
                  size="large"
                  options={
                    typeTransaction.data?.data.map((type) => ({
                      label: type.transactionTypeName,
                      value: type.transactionTypeID,
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
              <Form.Item name="statusTypeDelaracrion"></Form.Item>
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

export default TypeDeclarationForm;
