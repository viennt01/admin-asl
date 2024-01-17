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
  Select,
  DatePicker,
  Tabs,
} from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { IFormValues, UpdateStatusUnit } from '../interface';
import { API_PARTNER, API_TYPE_SALE_ACTIVITY } from '@/fetcherAxios/endpoint';
import { BottomCreateEdit } from '@/components/commons/bottom-edit-creat-manager';
import { getUnitDetail, updateStatus } from '../fetcher';
import {
  STATUS_ALL_LABELS,
  STATUS_MASTER_COLORS,
  STATUS_MATER_LABELS,
} from '@/constant/form';
import { UpdateStatusLocationType } from '@/components/menu-item/master-data/location-catalog/type-of-location/interface';
import { errorToast, successToast } from '@/hook/toast';
import { API_MESSAGE } from '@/constant/message';
import { getDeclarationSearch } from '../../master-data/sale-activity/type-sale-activity/fetcher';
import dayjs from 'dayjs';
import { getAllPartner, getUserPartnerId } from '../../pricing/sea/fetcher';
import { PartnerData } from '../../pricing/sea/interface';

const initialValue = {
  address: '',
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

const dateFormat = 'YYYY-MM-DD';
const { Title } = Typography;

const SaleActivityForm = ({
  create,
  manager,
  edit,
  handleSubmit,
  handleSaveDraft,
  loadingSubmit,
  checkRow,
  useDraft,
}: PortFormProps) => {
  const { translate: translatePartner } = useI18n('saleActivity');
  const router = useRouter();
  const [form] = Form.useForm<IFormValues>();
  const { id } = router.query;
  const [idQuery, setIdQuery] = useState<string>();
  const [isCheckPermissionEdit, setCheckPermissionEdit] =
    useState<boolean>(false);
  const [checkStatus, setCheckStatus] = useState<boolean>(true);
  const propCopyAndCreate = router.query;
  const [typeSaleActivity, setTypeSaleActivity] = useState<
    { label: string; value: string }[]
  >([]);
  const [dataPartner, setDataPartner] = useState<PartnerData[]>([]);
  const idPartners = Form.useWatch('partnerID', form);

  const getPartner = useQuery({
    queryKey: [API_PARTNER.GET_ALL_PARTNER],
    queryFn: () => getAllPartner(),
    onSuccess: (data) => {
      if (!data.status) {
        router.back();
        errorToast(API_MESSAGE.ERROR);
      }
    },
    onError: () => {
      router.back();
      errorToast(API_MESSAGE.ERROR);
    },
  });

  useQuery({
    queryKey: [API_PARTNER.GET_ALL_PARTNER_BY_IDS, idPartners],
    queryFn: () => getUserPartnerId({ ids: [idPartners] }),
    enabled: idPartners !== undefined,
    onSuccess(data) {
      setDataPartner([]);
      if (data.status) {
        if (data.data) {
          setDataPartner(data.data);
        }
      }
    },
  });

  useEffect(() => {
    if (!id) return;
    setIdQuery(id as string);
  }, [router, form]);

  const onFinish = (formValues: IFormValues) => {
    if (idQuery) {
      handleSubmit && handleSubmit(formValues, idQuery);
    } else {
      handleSubmit && handleSubmit(formValues, undefined);
    }
  };

  const onSaveDraft = () => {
    if (idQuery) {
      handleSaveDraft && handleSaveDraft(form.getFieldsValue(), idQuery);
    } else {
      handleSaveDraft && handleSaveDraft(form.getFieldsValue(), undefined);
    }
  };

  const detailQuery = useQuery({
    queryKey: [API_PARTNER.GET_DETAIL, idQuery],
    queryFn: () => getUnitDetail(idQuery as string),
    enabled: idQuery !== undefined,
    onSuccess: (data) => {
      if (data.status) {
        form.setFieldsValue({
          saleActivityTypeID: data.data.saleActivityTypeID,
          partnerID: data.data.partnerID,
          timeActivitySaleActivity: dayjs(
            Number(data.data.timeActivitySaleActivity)
          ),
          statusSaleActivity: data.data.statusSaleActivity,
          listUserID: data.data.listUserID,
          descriptionEN: data.data.descriptionEN,
          descriptionVN: data.data.descriptionVN,
        });
      } else {
        router.back();
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
            ? (successToast(data.message), router.back())
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
    mutationFn: (body: UpdateStatusUnit) => {
      return updateStatus(body);
    },
  });

  const handleCopyAndCreate = () => {
    const props = {
      checkCopyAndCreate: true,
      saleActivityTypeID: form.getFieldValue('saleActivityTypeID'),
      partnerID: form.getFieldValue('partnerID'),
      descriptionEN: form.getFieldValue('descriptionEN'),
      descriptionVN: form.getFieldValue('descriptionVN'),
      listUserID: form.getFieldValue('listUserID'),
      statusSaleActivity: form.getFieldValue('statusSaleActivity'),
      timeActivitySaleActivity: form
        .getFieldValue('timeActivitySaleActivity')
        ?.valueOf(),
    };
    router.push({
      pathname: ROUTERS.SALE_ACTIVITY_CREATE,
      query: props,
    });
  };

  useEffect(() => {
    if (form.getFieldValue('statusSaleActivity')) {
      form.getFieldValue('statusSaleActivity') === STATUS_ALL_LABELS.ACTIVE
        ? setCheckStatus(true)
        : setCheckStatus(false);
    }
    if ((edit && checkRow) || manager) {
      setCheckPermissionEdit(true);
    }
    if (propCopyAndCreate.checkCopyAndCreate) {
      form.setFieldsValue({
        saleActivityTypeID: propCopyAndCreate.saleActivityTypeID as string,
        partnerID: propCopyAndCreate.partnerID as string,
        timeActivitySaleActivity: dayjs(
          Number(propCopyAndCreate.timeActivitySaleActivity as string)
        ),
        descriptionVN: propCopyAndCreate.descriptionVN as string,
        descriptionEN: propCopyAndCreate.descriptionEN as string,
        statusSaleActivity: propCopyAndCreate.statusSaleActivity as string,
        listUserID: propCopyAndCreate.listUserID as string[],
      });
    }
  }, [
    form,
    edit,
    checkRow,
    manager,
    propCopyAndCreate,
    form.getFieldValue('statusSaleActivity'),
  ]);

  useQuery({
    queryKey: [API_TYPE_SALE_ACTIVITY.GET_SEARCH],
    queryFn: () =>
      getDeclarationSearch({
        searchAll: '',
        statusSaleActivityType: [STATUS_MATER_LABELS.ACTIVE],
        paginateRequest: {
          currentPage: 1,
          pageSize: 10000,
        },
      }),
    onSuccess(data) {
      if (data.status) {
        setTypeSaleActivity(
          data.data.data.map((data) => ({
            value: data.saleActivityTypeID,
            label: data.name,
          }))
        );
      } else {
        setTypeSaleActivity([]);
      }
    },
  });

  const contentEN = () => {
    return (
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            label={translatePartner(
              'description_type_sale_activity_form.titleEn'
            )}
            name="descriptionEN"
          >
            <Input.TextArea
              size="large"
              placeholder={translatePartner(
                'description_type_sale_activity_form.placeholder'
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
            label={translatePartner('name_type_sale_activity_form.titleVn')}
            name="nameVN"
          >
            <Input
              placeholder={translatePartner(
                'name_type_sale_activity_form.placeholder'
              )}
              size="large"
              disabled={checkRow && isCheckPermissionEdit}
            />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item
            label={translatePartner(
              'description_type_sale_activity_form.title'
            )}
            name="descriptionVN"
          >
            <Input.TextArea
              size="large"
              placeholder={translatePartner(
                'description_type_sale_activity_form.placeholder'
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
                  {create && translatePartner('information_add_sale_activity')}
                  {manager && 'Approval needed requests'}
                  {edit &&
                    (checkRow ? (
                      <>
                        {isCheckPermissionEdit && 'View'}
                        {!isCheckPermissionEdit &&
                          translatePartner('information_edit_sale_activity')}
                      </>
                    ) : (
                      translatePartner('information_edit_sale_activity')
                    ))}
                </Title>
              </Col>
            </Row>
          }
          extra={
            <>
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
                label={translatePartner('name_type_sale_activity_form.title')}
                name="saleActivityTypeID"
                rules={[
                  {
                    required: true,
                    message: translatePartner(
                      'name_type_sale_activity_form.error_required'
                    ),
                  },
                ]}
              >
                <Select
                  showSearch
                  placeholder={translatePartner(
                    'name_type_sale_activity_form.placeholder'
                  )}
                  disabled={checkRow && isCheckPermissionEdit}
                  optionFilterProp="children"
                  size="large"
                  filterOption={(input, option) =>
                    (option?.label ?? '').includes(input)
                  }
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? '')
                      .toLowerCase()
                      .localeCompare((optionB?.label ?? '').toLowerCase())
                  }
                  mode="multiple"
                  options={typeSaleActivity}
                />
              </Form.Item>
            </Col>
            <Col lg={12} span={24}>
              <Form.Item
                label={translatePartner('timeActivitySaleActivity_form.title')}
                name="timeActivitySaleActivity"
                rules={[
                  {
                    required: true,
                    message: translatePartner(
                      'timeActivitySaleActivity_form.error_required'
                    ),
                  },
                ]}
              >
                <DatePicker
                  disabled={checkRow && isCheckPermissionEdit}
                  size="large"
                  format={dateFormat}
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>

            <Col lg={12} span={24}>
              <Form.Item
                label={translatePartner('partner_form.title')}
                name="partnerID"
                rules={[
                  {
                    required: true,
                    message: translatePartner('partner_form.error_required'),
                  },
                ]}
              >
                <Select
                  showSearch
                  placeholder={translatePartner('partner_form.placeholder')}
                  disabled={checkRow && isCheckPermissionEdit}
                  optionFilterProp="children"
                  size="large"
                  filterOption={(input, option) =>
                    (option?.label ?? '').includes(input)
                  }
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? '')
                      .toLowerCase()
                      .localeCompare((optionB?.label ?? '').toLowerCase())
                  }
                  options={
                    getPartner.data?.data?.map((item) => {
                      return {
                        value: item.partnerID,
                        label: item.name,
                      };
                    }) || []
                  }
                />
              </Form.Item>
            </Col>
            <Col span={idPartners ? 24 : 0}>
              <Form.Item
                label={translatePartner('user_form.title')}
                name="listUserID"
                rules={[
                  {
                    required: true,
                    message: translatePartner('user_form.error_required'),
                  },
                ]}
              >
                <Select
                  showSearch
                  placeholder={translatePartner('user_form.placeholder')}
                  disabled={checkRow && isCheckPermissionEdit}
                  optionFilterProp="children"
                  size="large"
                  mode="multiple"
                  filterOption={(input, option) =>
                    (option?.label ?? '').includes(input)
                  }
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? '')
                      .toLowerCase()
                      .localeCompare((optionB?.label ?? '').toLowerCase())
                  }
                  options={
                    dataPartner?.[0]?.userBaseDTOs?.map((item) => {
                      return {
                        value: item.userID,
                        label: item.fullName,
                      };
                    }) || []
                  }
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Tabs items={items} />
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

export default SaleActivityForm;
