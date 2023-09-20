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
  DatePicker,
  Switch,
  InputNumber,
} from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  FormValues,
  SeaPricingDetailDTOs,
  SeaPricingFeeDTOs,
  UpdateStatus,
} from '../interface';
import {
  API_COMMODITY,
  API_CURRENCY,
  API_LOCATION,
  API_SEA_PRICING,
} from '@/fetcherAxios/endpoint';
import { BottomCreateEdit } from '@/components/commons/bottom-edit-creat-manager';
import {
  getAllCommodity,
  getAllCurrency,
  getAllLocation,
  getSeaPricingDetail,
  updateStatus,
} from '../fetcher';
import DraftTable from '../table/draft-table';
import { STATUS_ALL_LABELS, STATUS_MASTER_COLORS } from '@/constant/form';
import { UpdateStatusLocationType } from '@/components/type-of-location-page/interface';
import { errorToast, successToast } from '@/hook/toast';
import { API_MESSAGE } from '@/constant/message';
import dayjs from 'dayjs';

const initialValue = {
  description: '',
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

const SeaPricing = ({
  create,
  manager,
  edit,
  handleSubmit,
  handleSaveDraft,
  loadingSubmit,
  checkRow,
  useDraft,
}: PortFormProps) => {
  const { translate: translatePricingSea } = useI18n('pricingSea');
  const router = useRouter();
  const [form] = Form.useForm<FormValues>();
  const { id } = router.query;
  const [idQuery, setIdQuery] = useState<string>();
  const [isCheckPermissionEdit, setCheckPermissionEdit] =
    useState<boolean>(false);
  const [checkStatus, setCheckStatus] = useState<boolean>(true);
  const [optionCurrency, setOptionCurrency] = useState<
    { value: string; label: string }[]
  >([]);

  const propCopyAndCreate = router.query;
  const dateFormat = 'YYYY/MM/DD';
  useEffect(() => {
    if (!id) return;
    setIdQuery(id as string);
  }, [router, form]);

  const getLocation = useQuery({
    queryKey: [API_LOCATION.GET_ALL],
    queryFn: () => getAllLocation(),
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

  const getCommodity = useQuery({
    queryKey: [API_COMMODITY.GET_ALL],
    queryFn: () => getAllCommodity(),
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
    queryKey: [API_CURRENCY.GET_ALL],
    queryFn: () => getAllCurrency(),
    onSuccess: (data) => {
      if (!data.status) {
        router.back();
        errorToast(API_MESSAGE.ERROR);
      } else {
        setOptionCurrency(
          data.data.map((currency) => {
            return {
              value: currency.currencyID,
              label: currency.currencyName,
            };
          })
        );
      }
    },
    onError: () => {
      router.back();
      errorToast(API_MESSAGE.ERROR);
    },
  });

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
    queryKey: [API_SEA_PRICING.GET_DETAIL, idQuery],
    queryFn: () => getSeaPricingDetail(idQuery as string),
    enabled: idQuery !== undefined,
    onSuccess: (data) => {
      if (data.status) {
        form.setFieldsValue({
          podid: data.data.podid,
          polid: data.data.polid,
          commodityID: data.data.commodityID,
          note: data.data.note,
          dateEffect: dayjs(Number(data.data.dateEffect)),
          validityDate: dayjs(Number(data.data.validityDate)),
          fregDate: dayjs(Number(data.data.fregDate)),
          demSeaPricing: data.data.demSeaPricing,
          detSeaPricing: data.data.detSeaPricing,
          stoSeaPricing: data.data.stoSeaPricing,
          lclMinSeaPricing: data.data.lclMinSeaPricing,
          lclSeaPricing: data.data.lclSeaPricing,
          public: data.data.public,
          statusSeaPricing: data.data.statusSeaPricing,
          seaPricingDetailDTOs: data.data.seaPricingDetailDTOs,
          seaPricingFeeDTOs: data.data.seaPricingFeeDTOs,
        });
      } else {
        router.push(ROUTERS.SEA_PRICING);
      }
    },
  });

  const handleCheckEdit = (data: boolean) => {
    setCheckPermissionEdit(data);
  };

  const handleAR = (status: string) => {
    if (idQuery) {
      const _requestData: UpdateStatusLocationType = {
        id: idQuery,
        status,
      };
      updateStatusMutation.mutate(_requestData, {
        onSuccess: (data) => {
          data.status
            ? (successToast(data.message), router.push(ROUTERS.SEA_PRICING))
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
    mutationFn: (body: UpdateStatus) => {
      return updateStatus(body);
    },
  });

  const handleCopyAndCreate = () => {
    const props = {
      podid: form.getFieldValue('podid'),
      polid: form.getFieldValue('polid'),
      commodityID: form.getFieldValue('commodityID'),
      note: form.getFieldValue('note'),
      dateEffect: form.getFieldValue('dateEffect'),
      validityDate: form.getFieldValue('validityDate'),
      fregDate: form.getFieldValue('fregDate'),
      demSeaPricing: form.getFieldValue('demSeaPricing'),
      detSeaPricing: form.getFieldValue('detSeaPricing'),
      stoSeaPricing: form.getFieldValue('stoSeaPricing'),
      lclMinSeaPricing: form.getFieldValue('lclMinSeaPricing'),
      lclSeaPricing: form.getFieldValue('lclSeaPricing'),
      public: form.getFieldValue('public'),
      statusSeaPricing: form.getFieldValue('statusSeaPricing'),
      seaPricingDetailDTOs: form.getFieldValue('seaPricingDetailDTOs'),
      seaPricingFeeDTOs: form.getFieldValue('seaPricingFeeDTOs'),
    };
    router.push({
      pathname: ROUTERS.UNIT_CREATE,
      query: props,
    });
  };

  useEffect(() => {
    if (form.getFieldValue('statusSeaPricing')) {
      form.getFieldValue('statusSeaPricing') === STATUS_ALL_LABELS.ACTIVE
        ? setCheckStatus(true)
        : setCheckStatus(false);
    }
    if ((edit && checkRow) || manager) {
      setCheckPermissionEdit(true);
    }
    if (propCopyAndCreate) {
      form.setFieldsValue({
        podid: propCopyAndCreate.podid as string,
        polid: propCopyAndCreate.polid as string,
        commodityID: propCopyAndCreate.commodityID as string,
        note: propCopyAndCreate.note as string,
        dateEffect: propCopyAndCreate.dateEffect as string,
        validityDate: propCopyAndCreate.validityDate as string,
        fregDate: propCopyAndCreate.fregDate as string,
        demSeaPricing: propCopyAndCreate.demSeaPricing as string,
        detSeaPricing: propCopyAndCreate.detSeaPricing as string,
        stoSeaPricing: propCopyAndCreate.stoSeaPricing as string,
        lclMinSeaPricing: propCopyAndCreate.lclMinSeaPricing as string,
        lclSeaPricing: propCopyAndCreate.lclSeaPricing as string,
        public: propCopyAndCreate.public as unknown as boolean,
        statusSeaPricing: propCopyAndCreate.statusSeaPricing as string,
        seaPricingDetailDTOs:
          propCopyAndCreate.seaPricingDetailDTOs as unknown as SeaPricingDetailDTOs[],
        seaPricingFeeDTOs:
          propCopyAndCreate.seaPricingFeeDTOs as unknown as SeaPricingFeeDTOs[],
      });
    }
  }, [form, edit, checkRow, manager, propCopyAndCreate]);

  const suffixSelectorCurrencyLCLMin = (
    <Form.Item name="lclMinCurrency3" noStyle>
      <Select
        disabled={checkRow && isCheckPermissionEdit}
        showSearch
        style={{ width: 75 }}
        options={optionCurrency}
      />
    </Form.Item>
  );

  const suffixSelectorCurrencyLCL = (
    <Form.Item name="lclCurrency" noStyle>
      <Select
        disabled={checkRow && isCheckPermissionEdit}
        showSearch
        style={{ width: 75 }}
        options={optionCurrency}
      />
    </Form.Item>
  );
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
                  {create && 'Create a new sea pricing'}
                  {manager && 'Approval needed requests'}
                  {edit && 'Edit a new sea pricing'}
                  {edit &&
                    (checkRow ? (
                      <>
                        {isCheckPermissionEdit && 'View'}
                        {!isCheckPermissionEdit && 'Edit a new sea pricing'}
                      </>
                    ) : (
                      'Edit a new sea pricing'
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
                label={translatePricingSea('POL')}
                tooltip={translatePricingSea('POL')}
                name="polid"
                rules={[
                  {
                    required: true,
                    message: translatePricingSea('POL_placeholder'),
                  },
                ]}
              >
                <Select
                  showSearch
                  placeholder={translatePricingSea('POL_placeholder')}
                  disabled={checkRow && isCheckPermissionEdit}
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? '').includes(input)
                  }
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? '')
                      .toLowerCase()
                      .localeCompare((optionB?.label ?? '').toLowerCase())
                  }
                  options={
                    getLocation.data?.data.map((item) => {
                      return {
                        value: item.locationID,
                        label: item.locationName,
                      };
                    }) || []
                  }
                />
              </Form.Item>
            </Col>
            <Col lg={12} span={24}>
              <Form.Item
                label={translatePricingSea('POD')}
                tooltip={translatePricingSea('POD')}
                name="podid"
                rules={[
                  {
                    required: true,
                    message: translatePricingSea('POD_placeholder'),
                  },
                ]}
              >
                <Select
                  showSearch
                  placeholder={translatePricingSea('POD_placeholder')}
                  disabled={checkRow && isCheckPermissionEdit}
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? '').includes(input)
                  }
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? '')
                      .toLowerCase()
                      .localeCompare((optionB?.label ?? '').toLowerCase())
                  }
                  options={
                    getLocation.data?.data.map((item) => {
                      return {
                        value: item.locationID,
                        label: item.locationName,
                      };
                    }) || []
                  }
                />
              </Form.Item>
            </Col>

            <Col lg={8} span={24}>
              <Form.Item
                label={translatePricingSea('validity')}
                name="validityDate"
                rules={[
                  {
                    required: true,
                    message: translatePricingSea('validity_placeholder'),
                  },
                ]}
              >
                <DatePicker
                  disabled={checkRow && isCheckPermissionEdit}
                  // format={dateFormat}
                  // showTime
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>
            <Col lg={8} span={24}>
              <Form.Item
                label={translatePricingSea('effect_date')}
                name="dateEffect"
                rules={[
                  {
                    required: true,
                    message: translatePricingSea('effect_date_placeholder'),
                  },
                ]}
              >
                <DatePicker
                  disabled={checkRow && isCheckPermissionEdit}
                  format={dateFormat}
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>
            <Col lg={8} span={24}>
              <Form.Item
                label={translatePricingSea('freq')}
                name="fregDate"
                rules={[
                  {
                    required: true,
                    message: translatePricingSea('freq_placeholder'),
                  },
                ]}
              >
                <DatePicker
                  disabled={checkRow && isCheckPermissionEdit}
                  format={dateFormat}
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>

            <Col lg={8} span={24}>
              <Form.Item
                label={translatePricingSea('STO')}
                name="stoSeaPricing"
                rules={[
                  {
                    required: true,
                    message: translatePricingSea('STO_placeholder'),
                  },
                  {
                    type: 'integer',
                    message: 'Vui lòng nhập số nguyên',
                  },
                ]}
              >
                <InputNumber
                  disabled={checkRow && isCheckPermissionEdit}
                  placeholder={translatePricingSea('STO_placeholder')}
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                  }
                  parser={(value: any) => value.replace(/\$\s?|(,*)/g, '')}
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>
            <Col lg={8} span={24}>
              <Form.Item
                label={translatePricingSea('DEM')}
                name="demSeaPricing"
                rules={[
                  {
                    required: true,
                    message: translatePricingSea('DEM_placeholder'),
                  },
                ]}
              >
                <InputNumber
                  style={{ width: '100%' }}
                  placeholder={translatePricingSea('DEM_placeholder')}
                  disabled={checkRow && isCheckPermissionEdit}
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                  }
                  parser={(value: any) => value.replace(/\$\s?|(,*)/g, '')}
                />
              </Form.Item>
            </Col>
            <Col lg={8} span={24}>
              <Form.Item
                label={translatePricingSea('DET')}
                name="detSeaPricing"
                rules={[
                  {
                    required: true,
                    message: translatePricingSea('DET_placeholder'),
                  },
                ]}
              >
                <InputNumber
                  style={{ width: '100%' }}
                  placeholder={translatePricingSea('DET_placeholder')}
                  disabled={checkRow && isCheckPermissionEdit}
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                  }
                  parser={(value: any) => value.replace(/\$\s?|(,*)/g, '')}
                />
              </Form.Item>
            </Col>

            <Col lg={8} span={24}>
              <Form.Item
                label={translatePricingSea('commodity')}
                name="commodityID"
                rules={[
                  {
                    required: true,
                    message: translatePricingSea('commodity_placeholder'),
                  },
                ]}
              >
                <Select
                  showSearch
                  placeholder={translatePricingSea('commodity_placeholder')}
                  disabled={checkRow && isCheckPermissionEdit}
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? '').includes(input)
                  }
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? '')
                      .toLowerCase()
                      .localeCompare((optionB?.label ?? '').toLowerCase())
                  }
                  options={
                    getCommodity.data?.data.map((item) => {
                      return {
                        value: item.commodityID,
                        label: item.commodityName,
                      };
                    }) || []
                  }
                />
              </Form.Item>
            </Col>
            <Col lg={8} span={24}>
              <Form.Item
                label={translatePricingSea('LCL')}
                name="lclSeaPricing"
                rules={[
                  {
                    required: true,
                    message: translatePricingSea('LCL_placeholder'),
                  },
                ]}
              >
                <InputNumber
                  addonAfter={suffixSelectorCurrencyLCL}
                  placeholder={translatePricingSea('LCL_placeholder')}
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                  }
                  parser={(value: any) => value.replace().replace(/,/g, '')}
                  style={{ width: '100%' }}
                  disabled={checkRow && isCheckPermissionEdit}
                />
              </Form.Item>
            </Col>
            <Col lg={8} span={24}>
              <Form.Item
                label={translatePricingSea('LCLMin')}
                name="lclMinSeaPricing"
                rules={[
                  {
                    required: true,
                    message: translatePricingSea('LCLMin_placeholder'),
                  },
                ]}
              >
                <InputNumber
                  addonAfter={suffixSelectorCurrencyLCLMin}
                  placeholder={translatePricingSea('LCLMin_placeholder')}
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                  }
                  parser={(value: any) => value.replace().replace(/,/g, '')}
                  style={{ width: '100%' }}
                  disabled={checkRow && isCheckPermissionEdit}
                />
              </Form.Item>
            </Col>

            <Col lg={8} span={24}>
              <Form.Item
                label={translatePricingSea('vendor')}
                name="vendor"
                rules={[
                  {
                    required: true,
                    message: translatePricingSea('vendor_placeholder'),
                  },
                ]}
              >
                <Input
                  placeholder={translatePricingSea('vendor_placeholder')}
                  disabled
                />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item label="Note" name="note">
                <Input.TextArea
                  // size="large"
                  placeholder="Please enter note"
                  allowClear
                  disabled={checkRow && isCheckPermissionEdit}
                />
              </Form.Item>
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

export default SeaPricing;
