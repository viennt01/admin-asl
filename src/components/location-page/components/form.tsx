import { ROUTERS } from '@/constant/router';
import useI18n from '@/i18n/useI18N';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Form, Input, Typography, Card, Row, Col, Select, Switch } from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { API_LOCATION_TYPE, API_MASTER_DATA } from '@/fetcherAxios/endpoint';
import { BottomCreateEdit } from '@/components/commons/bottom-edit-creat-manager';
import { geLocationDetail, updateStatus } from '../fetcher';
import DraftTable from '../table/draft-table';
import { FormValues, UpdateStatusLocation } from '../interface';
import { getListCity, getListTypeLocations } from '@/layout/fetcher';
import { UpdateStatusLocationType } from '@/components/type-of-location-page/interface';
import { STATUS_ALL_LABELS, STATUS_MASTER_COLORS } from '@/constant/form';
import { errorToast, successToast } from '@/hook/toast';
import { API_MESSAGE } from '@/constant/message';

const initialValue = {
  typeLocationName: '',
  description: '',
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

const LocationForm = ({
  create,
  manager,
  edit,
  handleSubmit,
  handleSaveDraft,
  loadingSubmit,
  checkRow,
  useDraft,
}: FormProps) => {
  const { translate: translateLocation } = useI18n('location');
  const router = useRouter();
  const [form] = Form.useForm<FormValues>();
  const { id } = router.query;
  const [idQuery, setIdQuery] = useState<string>();
  const [isCheckPermissionEdit, setCheckPermissionEdit] =
    useState<boolean>(false);
  const [checkStatus, setCheckStatus] = useState<boolean>(true);
  const propCopyAndCreate = router.query;

  const typeLocations = useQuery(
    [API_LOCATION_TYPE.GET_TYPE_LOCATION],
    getListTypeLocations
  );
  const city = useQuery([API_MASTER_DATA.GET_COUNTRY], () =>
    getListCity({
      currentPage: 1,
      pageSize: 500,
    })
  );

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
    queryFn: () => geLocationDetail(idQuery as string),
    enabled: idQuery !== undefined,
    onSuccess: (data) => {
      if (data.status) {
        form.setFieldsValue({
          locationID: data.data.locationID,
          cityID: data.data.cityID,
          locationCode: data.data.locationCode,
          locationNameEN: data.data.locationNameEN,
          locationNameVN: data.data.locationNameVN,
          statusLocation: data.data.statusLocation,
          typeLocations: data.data.typeLocations.map(
            (type) => type.typeLocationID
          ),
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
    mutationFn: (body: UpdateStatusLocation) => {
      return updateStatus(body);
    },
  });

  const handleAR = (status: string) => {
    if (idQuery) {
      const _requestData: UpdateStatusLocation = {
        id: idQuery,
        status,
      };
      updateStatusMutation.mutate(_requestData, {
        onSuccess: (data) => {
          data.status
            ? (successToast(data.message), router.push(ROUTERS.LOCATION))
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
      cityID: form.getFieldValue('cityID'),
      locationCode: form.getFieldValue('locationCode'),
      locationNameEN: form.getFieldValue('locationNameEN'),
      locationNameVN: form.getFieldValue('locationNameVN'),
      typeLocations: form.getFieldValue('typeLocations'),
    };
    router.push({
      pathname: ROUTERS.LOCATION_CREATE,
      query: props,
    });
  };

  useEffect(() => {
    if (form.getFieldValue('statusLocation')) {
      form.getFieldValue('statusLocation') === STATUS_ALL_LABELS.ACTIVE
        ? setCheckStatus(true)
        : setCheckStatus(false);
    }
    if ((edit && checkRow) || manager) {
      setCheckPermissionEdit(true);
    }
    if (propCopyAndCreate.checkCopyAndCreate) {
      form.setFieldsValue({
        cityID: propCopyAndCreate.cityID as string,
        locationCode: propCopyAndCreate.locationCode as string,
        locationNameEN: propCopyAndCreate.locationNameEN as string,
        locationNameVN: propCopyAndCreate.locationNameVN as string,
        typeLocations: propCopyAndCreate.typeLocations as string[],
      });
    }
  }, [
    form,
    edit,
    checkRow,
    manager,
    propCopyAndCreate,
    form.getFieldValue('statusLocation'),
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
                  {create && translateLocation('information_add_port')}
                  {manager && 'Approval needed requests'}
                  {edit &&
                    (checkRow ? (
                      <>
                        {isCheckPermissionEdit && 'View'}
                        {!isCheckPermissionEdit &&
                          translateLocation('information_edit_port')}
                      </>
                    ) : (
                      translateLocation('information_edit_port')
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
                label={translateLocation('port_code.title')}
                tooltip={translateLocation('code')}
                name="locationCode"
                rules={[
                  {
                    required: true,
                    message: translateLocation('port_code.error_required'),
                  },
                ]}
              >
                <Input
                  placeholder={translateLocation('port_code.placeholder')}
                  size="large"
                  disabled={checkRow && isCheckPermissionEdit}
                />
              </Form.Item>
            </Col>
            <Col lg={12} span={24}>
              <Form.Item
                label={translateLocation('type_port.title')}
                name="typeLocations"
                rules={[
                  {
                    required: true,
                    message: translateLocation('type_port.error_required'),
                  },
                ]}
              >
                <Select
                  placeholder={translateLocation('type_port.placeholder')}
                  mode="multiple"
                  size="large"
                  options={
                    typeLocations.data?.data.map((type) => ({
                      label: type.typeLocationName,
                      value: type.typeLocationID,
                    })) || []
                  }
                  disabled={checkRow && isCheckPermissionEdit}
                />
              </Form.Item>
            </Col>

            <Col lg={12} span={24}>
              <Form.Item
                label={translateLocation('port_name.titleEn')}
                name="locationNameEN"
                rules={[
                  {
                    required: true,
                    message: translateLocation('port_name.error_required'),
                  },
                ]}
              >
                <Input
                  placeholder={translateLocation('port_name.placeholder')}
                  size="large"
                  disabled={checkRow && isCheckPermissionEdit}
                />
              </Form.Item>
            </Col>
            <Col lg={12} span={24}>
              <Form.Item
                label={translateLocation('port_name.titleVn')}
                name="locationNameVN"
              >
                <Input
                  placeholder={translateLocation('port_name.placeholder')}
                  size="large"
                  disabled={checkRow && isCheckPermissionEdit}
                />
              </Form.Item>
            </Col>

            <Col lg={12} span={24}>
              <Form.Item
                label={translateLocation('City')}
                name="cityID"
                rules={[
                  {
                    required: true,
                    message: translateLocation('country.error_required'),
                  },
                ]}
              >
                <Select
                  placeholder={translateLocation('country.placeholder')}
                  showSearch
                  size="large"
                  options={
                    city.data?.data.data.map((item) => ({
                      value: item.cityID,
                      label: item.cityName,
                    })) || []
                  }
                  filterOption={(input, option) =>
                    (option?.label ?? '')
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  disabled={checkRow && isCheckPermissionEdit}
                />
              </Form.Item>
            </Col>
            <Col span={0}>
              <Form.Item name="typeLocations"></Form.Item>
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

export default LocationForm;
