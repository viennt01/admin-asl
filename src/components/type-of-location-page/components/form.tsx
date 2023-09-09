import { ROUTERS } from '@/constant/router';
import useI18n from '@/i18n/useI18N';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Form, Input, Typography, Card, Row, Col, Tabs, Switch } from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { API_LOCATION_TYPE } from '@/fetcherAxios/endpoint';
import { BottomCreateEdit } from '@/components/commons/bottom-edit-creat-manager';
import { geLocationTypeDetail, updateStatus } from '../fetcher';
import DraftTable from '../table/draft-table';
import { FormValues, UpdateStatusLocationType } from '../interface';
import { STATUS_ALL_LABELS } from '@/constant/form';
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
  handleApproveAndReject?: (id: string, status: string) => void;
  loadingSubmit: boolean;
  checkRow: boolean;
  useDraft?: boolean;
}

const { Title } = Typography;

const LocationTypeForm = ({
  create,
  manager,
  edit,
  handleSubmit,
  handleSaveDraft,
  loadingSubmit: loading,
  checkRow,
  handleApproveAndReject,
  useDraft,
}: FormProps) => {
  const { translate: translateLocationType } = useI18n('typeOfLocation');
  const router = useRouter();
  const [form] = Form.useForm<FormValues>();
  const { id } = router.query;
  const [idQuery, setIdQuery] = useState<string>();
  const [isCheckPermissionEdit, setCheckPermissionEdit] =
    useState<boolean>(true);
  const [checkStatus, setCheckStatus] = useState<boolean>(true);

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
    queryKey: [API_LOCATION_TYPE.GET_DETAIL, idQuery],
    queryFn: () => geLocationTypeDetail(idQuery as string),
    enabled: idQuery !== undefined,
    onSuccess: (data) => {
      if (data.status) {
        form.setFieldsValue({
          typeLocationID: data.data.typeLocationID,
          typeLocationNameEN: data.data.typeLocationNameEN,
          descriptionEN: data.data.descriptionEN,
          typeLocationNameVN: data.data.typeLocationNameVN,
          descriptionVN: data.data.descriptionVN,
          statusTypeLocation: data.data.statusTypeLocation,
        });
      } else {
        router.push(ROUTERS.TYPE_OF_LOCATION);
      }
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: (body: UpdateStatusLocationType) => {
      return updateStatus(body);
    },
  });

  const handleCheckEdit = (data: boolean) => {
    setCheckPermissionEdit(data);
  };

  const handleAJ = (status: string) => {
    handleApproveAndReject && handleApproveAndReject(id as string, status);
  };

  const contentEN = () => {
    return (
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            label={translateLocationType('international_code_form.title')}
            name="typeLocationNameEN"
            rules={[
              {
                required: true,
                message: translateLocationType(
                  'international_code_form.error_required'
                ),
              },
            ]}
          >
            <Input
              placeholder={translateLocationType(
                'international_code_form.placeholder'
              )}
              size="large"
              disabled={checkRow && isCheckPermissionEdit}
            />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item
            label={translateLocationType('descriptionEN_vn_form.title')}
            name="descriptionEN"
            rules={[
              {
                required: true,
                message: translateLocationType(
                  'descriptionEN_vn_form.error_required'
                ),
              },
            ]}
          >
            <Input.TextArea
              size="large"
              placeholder={translateLocationType(
                'descriptionEN_vn_form.placeholder'
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
            label={translateLocationType('international_code_form.title')}
            name="typeLocationNameVN"
          >
            <Input
              placeholder={translateLocationType(
                'international_code_form.placeholder'
              )}
              size="large"
              disabled={checkRow && isCheckPermissionEdit}
            />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item
            label={translateLocationType('descriptionEN_vn_form.title')}
            name="descriptionVN"
          >
            <Input.TextArea
              size="large"
              placeholder={translateLocationType(
                'descriptionEN_vn_form.placeholder'
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
  useEffect(() => {
    if (form.getFieldValue('statusTypeLocation')) {
      form.getFieldValue('statusTypeLocation') === STATUS_ALL_LABELS.ACTIVE
        ? setCheckStatus(true)
        : setCheckStatus(false);
    }
  }, [form, checkStatus]);
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
                    translateLocationType('information_add_type_of_location')}
                  {manager && 'Approval needed requests'}
                  {edit &&
                    (checkRow ? (
                      <>
                        {isCheckPermissionEdit && 'View'}
                        {!isCheckPermissionEdit &&
                          translateLocationType(
                            'information_edit_type_of_location'
                          )}
                      </>
                    ) : (
                      translateLocationType('information_edit_type_of_location')
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
              {edit && idQuery && (
                <Switch
                  checked={checkStatus}
                  checkedChildren="Active"
                  unCheckedChildren="Deactive"
                  onChange={(value) => {
                    const _requestData: UpdateStatusLocationType = {
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
        </Card>

        <BottomCreateEdit
          create={create}
          checkRow={checkRow}
          edit={edit}
          loading={loading}
          isCheckPermissionEdit={isCheckPermissionEdit}
          insertedByUser={detailQuery.data?.data?.insertedByUser || ''}
          dateInserted={detailQuery.data?.data?.dateInserted || ''}
          updatedByUser={detailQuery.data?.data?.updatedByUser || ''}
          dateUpdated={detailQuery.data?.data?.dateUpdated || ''}
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

export default LocationTypeForm;
