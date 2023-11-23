import { ROUTERS } from '@/constant/router';
import useI18n from '@/i18n/useI18N';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Form, Input, Typography, Card, Row, Col, Switch, Tabs } from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { IFormValues, IUpdateStatusUnit } from '../interface';
import { API_TYPE_UNIT } from '@/fetcherAxios/endpoint';
import { BottomCreateEdit } from '@/components/commons/bottom-edit-creat-manager';
import { getUnitDetail, updateStatus } from '../fetcher';
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

const UnitForm = ({
  create,
  manager,
  edit,
  handleSubmit,
  handleSaveDraft,
  loadingSubmit,
  checkRow,
  useDraft,
}: PortFormProps) => {
  const { translate: translateTypeUnit } = useI18n('typeOfUnit');
  const router = useRouter();
  const [form] = Form.useForm<IFormValues>();
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
    queryKey: [API_TYPE_UNIT.GET_DETAIL, idQuery],
    queryFn: () => getUnitDetail(idQuery as string),
    enabled: idQuery !== undefined,
    onSuccess: (data) => {
      if (data.status) {
        form.setFieldsValue({
          typeUnitNameEN: data.data.typeUnitNameEN,
          typeUnitNameVN: data.data.typeUnitNameVN,
          descriptionVN: data.data.descriptionVN,
          descriptionEN: data.data.descriptionEN,
          statusTypeUnit: data.data.statusTypeUnit,
        });
      } else {
        router.push(ROUTERS.TYPE_UNIT);
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
            ? (successToast(data.message), router.push(ROUTERS.TYPE_UNIT))
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
    mutationFn: (body: IUpdateStatusUnit) => {
      return updateStatus(body);
    },
  });

  const handleCopyAndCreate = () => {
    const props = {
      checkCopyAndCreate: true,
      internationalCode: form.getFieldValue('internationalCode'),
      typeUnitID: form.getFieldValue('typeUnitID'),
      descriptionVN: form.getFieldValue('descriptionVN'),
      descriptionEN: form.getFieldValue('descriptionEN'),
    };
    router.push({
      pathname: ROUTERS.TYPE_UNIT_CREATE,
      query: props,
    });
  };

  useEffect(() => {
    if (form.getFieldValue('statusTypeUnit')) {
      form.getFieldValue('statusTypeUnit') === STATUS_ALL_LABELS.ACTIVE
        ? setCheckStatus(true)
        : setCheckStatus(false);
    }
    if ((edit && checkRow) || manager) {
      setCheckPermissionEdit(true);
    }
    if (propCopyAndCreate.checkCopyAndCreate) {
      form.setFieldsValue({
        typeUnitNameEN: propCopyAndCreate.typeUnitNameEN as string,
        typeUnitNameVN: propCopyAndCreate.typeUnitNameVN as string,
        descriptionVN: propCopyAndCreate.descriptionVN as string,
        descriptionEN: propCopyAndCreate.descriptionEN as string,
      });
    }
  }, [
    form,
    edit,
    checkRow,
    manager,
    propCopyAndCreate,
    form.getFieldValue('statusTypeUnit'),
  ]);

  const contentEN = () => {
    return (
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            label={translateTypeUnit('name_form.title_EN')}
            name="typeUnitNameEN"
            rules={[
              {
                required: true,
                message: translateTypeUnit('name_form.error_required'),
              },
            ]}
          >
            <Input
              placeholder={translateTypeUnit('name_form.placeholder')}
              size="large"
              disabled={checkRow && isCheckPermissionEdit}
            />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item
            label={translateTypeUnit('description_en_form.title')}
            name="descriptionEN"
          >
            <Input.TextArea
              size="large"
              placeholder={translateTypeUnit('description_en_form.placeholder')}
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
            label={translateTypeUnit('name_form.title_VN')}
            name="typeUnitNameVN"
          >
            <Input
              placeholder={translateTypeUnit(
                'name_type_location_form.placeholder'
              )}
              size="large"
              disabled={checkRow && isCheckPermissionEdit}
            />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item
            label={translateTypeUnit('description_vn_form.title')}
            name="descriptionVN"
          >
            <Input.TextArea
              size="large"
              placeholder={translateTypeUnit('description_vn_form.placeholder')}
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
                  {create && translateTypeUnit('information_add_unit')}
                  {manager && 'Approval needed requests'}
                  {edit &&
                    (checkRow ? (
                      <>
                        {isCheckPermissionEdit && 'View'}
                        {!isCheckPermissionEdit &&
                          translateTypeUnit('information_edit_unit')}
                      </>
                    ) : (
                      translateTypeUnit('information_edit_unit')
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
            <Col span={24}>
              <Tabs items={items} />
            </Col>
            <Col span={0}>
              <Form.Item name="statusTypeUnit"></Form.Item>
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

export default UnitForm;
