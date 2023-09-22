import { ROUTERS } from '@/constant/router';
import useI18n from '@/i18n/useI18N';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Form, Input, Typography, Card, Row, Col, Switch, Tabs } from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FormValues, UpdateStatusCommodity } from '../interface';
import { API_COMMODITY } from '@/fetcherAxios/endpoint';
import { BottomCreateEdit } from '@/components/commons/bottom-edit-creat-manager';
import { getCommodityDetail, updateStatus } from '../fetcher';
import DraftTable from '../table/draft-table';
import { STATUS_ALL_LABELS, STATUS_MASTER_COLORS } from '@/constant/form';
import { errorToast, successToast } from '@/hook/toast';
import { API_MESSAGE } from '@/constant/message';

const initialValue = {
  commodityName: '',
};

interface PortFormProps {
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

const CommodityForm = ({
  create,
  manager,
  edit,
  handleSubmit,
  handleSaveDraft,
  loadingSubmit,
  checkRow,
  useDraft,
}: PortFormProps) => {
  const { translate: translateCommodity } = useI18n('commodity');
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
    queryKey: [API_COMMODITY.GET_DETAIL, idQuery],
    queryFn: () => getCommodityDetail(idQuery as string),
    enabled: idQuery !== undefined,
    onSuccess: (data) => {
      if (data.status) {
        form.setFieldsValue({
          commodityID: data.data.commodityID,
          commodityNameEN: data.data.commodityNameEN,
          commodityNameVN: data.data.commodityNameVN,
          statusCommodity: data.data.statusCommodity,
        });
      } else {
        router.push(ROUTERS.COMMODITY);
      }
    },
  });

  const handleCheckEdit = (data: boolean) => {
    setCheckPermissionEdit(data);
  };

  const handleAR = (status: string) => {
    if (idQuery) {
      const _requestData: UpdateStatusCommodity = {
        id: idQuery,
        status,
      };
      updateStatusMutation.mutate(_requestData, {
        onSuccess: (data) => {
          data.status
            ? (successToast(data.message), router.push(ROUTERS.COMMODITY))
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
      <Col span={24}>
        <Form.Item
          label={translateCommodity('NameEN')}
          name="commodityNameEN"
          rules={[
            {
              required: true,
              message: translateCommodity(
                'international_code_form.error_required'
              ),
            },
          ]}
        >
          <Input
            placeholder={translateCommodity(
              'international_code_form.placeholder'
            )}
            size="large"
            disabled={checkRow && isCheckPermissionEdit}
          />
        </Form.Item>
      </Col>
    );
  };

  const contentVN = () => {
    return (
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            label={translateCommodity('NameVN')}
            name="commodityNameVN"
          >
            <Input
              placeholder={translateCommodity(
                'international_code_form.placeholder'
              )}
              size="large"
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

  const updateStatusMutation = useMutation({
    mutationFn: (body: UpdateStatusCommodity) => {
      return updateStatus(body);
    },
  });

  const handleCopyAndCreate = () => {
    const props = {
      checkCopyAndCreate: true,
      commodityNameEN: form.getFieldValue('commodityNameEN'),
      commodityNameVN: form.getFieldValue('commodityNameVN'),
    };
    router.push({
      pathname: ROUTERS.COMMODITY_CREATE,
      query: props,
    });
  };

  useEffect(() => {
    if (form.getFieldValue('statusCommodity')) {
      form.getFieldValue('statusCommodity') === STATUS_ALL_LABELS.ACTIVE
        ? setCheckStatus(true)
        : setCheckStatus(false);
    }
    if ((edit && checkRow) || manager) {
      setCheckPermissionEdit(true);
    }
    if (propCopyAndCreate.checkCopyAndCreate) {
      form.setFieldsValue({
        commodityNameEN: propCopyAndCreate.commodityNameEN as string,
        commodityNameVN: propCopyAndCreate.commodityNameVN as string,
      });
    }
  }, [
    form,
    edit,
    checkRow,
    manager,
    propCopyAndCreate,
    form.getFieldValue('statusCommodity'),
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
                  {create && translateCommodity('information_add_commodity')}
                  {manager && 'Approval needed requests'}
                  {edit &&
                    (checkRow ? (
                      <>
                        {isCheckPermissionEdit && 'View'}
                        {!isCheckPermissionEdit &&
                          translateCommodity('information_edit_commodity')}
                      </>
                    ) : (
                      translateCommodity('information_edit_commodity')
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
                    const _requestData: UpdateStatusCommodity = {
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
          <Tabs items={items} />
          <Col span={0}>
            <Form.Item name="statusCommodity"></Form.Item>
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

export default CommodityForm;
