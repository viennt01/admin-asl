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
  FormInstance,
  Checkbox,
  Tag,
} from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  IFormValues,
  ISeaQuotationDetailDTOs,
  ISeaQuotationFeeFormValue,
  // SeaPricingFeeDTOs,
  UpdateStatus,
} from '../interface';
import {
  API_COMMODITY,
  API_LOCATION,
  API_PARTNER,
} from '@/fetcherAxios/endpoint';
import { getAllCommodity, updateStatus } from '../fetcher';
import DraftTable from '../table/draft-table';
import { STATUS_ALL_LABELS, STATUS_MASTER_COLORS } from '@/constant/form';
import { errorToast, successToast } from '@/hook/toast';
import { API_MESSAGE } from '@/constant/message';
import { formatNumber } from '@/utils/format';
import {
  getAllCustomer,
  getAllLocation,
  getAllVendor,
} from '@/components/menu-item/pricing/sea/fetcher';
import dayjs from 'dayjs';
import { TYPE_LOCATION } from '@/components/menu-item/pricing/sea/interface';
import { DAY_WEEK } from '@/constant';

interface Props {
  create?: boolean;
  manager?: boolean;
  edit?: boolean;
  handleSubmit?: (formValues: IFormValues, id?: string) => void;
  handleSaveDraft?: (formValues: IFormValues, id?: string) => void;
  loadingSubmit?: boolean;
  checkRow: boolean;
  useDraft?: boolean;
  optionCurrency: { value: string; label: string }[];
  form: FormInstance<IFormValues>;
  idQuery?: string;
  handleIdQuery: (id: string) => void;
  handleCheckEdit: (data: boolean) => void;
  isCheckPermissionEdit: boolean;
}

const { Title } = Typography;
const dateFormat = 'YYYY-MM-DD';

const CardMain = ({
  create,
  manager,
  edit,
  checkRow,
  useDraft,
  optionCurrency,
  form,
  idQuery,
  handleIdQuery,
  handleCheckEdit,
  isCheckPermissionEdit,
}: Props) => {
  const { translate: translateQuotationSea } = useI18n('seaQuotation');
  const router = useRouter();
  const [checkStatus, setCheckStatus] = useState<boolean>(true);
  const [componentDisabled, setComponentDisabled] = useState<boolean>(false);
  useEffect(() => {
    form.setFieldValue('forNewUser', componentDisabled);
  }, [componentDisabled]);

  useEffect(() => {
    setComponentDisabled(form.getFieldValue('forNewUser'));
  }, [form.getFieldValue('forNewUser')]);

  const propCopyAndCreate = router.query;

  const getLocation = useQuery({
    queryKey: [API_LOCATION.GET_ALL],
    queryFn: () => getAllLocation({ type: [TYPE_LOCATION.PORT] }),
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

  const getPartner = useQuery({
    queryKey: [API_PARTNER.GET_ALL_VENDOR],
    queryFn: () => getAllVendor(),
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

  const getCustomer = useQuery({
    queryKey: [API_PARTNER.GET_ALL_CUSTOMER],
    queryFn: () => getAllCustomer(),
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
  useEffect(() => {
    if (form.getFieldValue('statusSeaQuotation')) {
      form.getFieldValue('statusSeaQuotation') === STATUS_ALL_LABELS.ACTIVE
        ? setCheckStatus(true)
        : setCheckStatus(false);
    }
    if ((edit && checkRow) || manager) {
      handleCheckEdit(true);
    }

    if (propCopyAndCreate.checkCopyAndCreate) {
      form.setFieldsValue({
        podid: propCopyAndCreate.podid as string,
        polid: propCopyAndCreate.polid as string,
        commodityID: propCopyAndCreate.commodityID as string,
        note: propCopyAndCreate.note as string,
        effectDated: dayjs(Number(propCopyAndCreate.effectDated as string)),
        validityDate: dayjs(Number(propCopyAndCreate.validityDate as string)),
        freqDate: propCopyAndCreate.freqDate as string,
        vendorID: propCopyAndCreate.vendorID as string,
        forNewUser: propCopyAndCreate.forNewUser as unknown as boolean,
        demSeaQuotation: propCopyAndCreate.demSeaQuotation as string,
        detSeaQuotation: propCopyAndCreate.detSeaQuotation as string,
        stoSeaQuotation: propCopyAndCreate.stoSeaQuotation as string,
        lclMinSeaQuotation: propCopyAndCreate.lclMinSeaQuotation as string,
        lclSeaQuotation: propCopyAndCreate.lclSeaQuotation as string,
        currencyID: propCopyAndCreate.currencyID as string,
        public: propCopyAndCreate.public as unknown as boolean,
        statusSeaQuotation: propCopyAndCreate.statusSeaQuotation as string,
        seaQuotationDetailDTOs: JSON.parse(
          propCopyAndCreate.seaQuotationDetailDTOs as string
        ) as unknown as ISeaQuotationDetailDTOs[],
        seaQuotaionFeeGroupDTOs: JSON.parse(
          propCopyAndCreate.seaQuotaionFeeGroupDTOs as string
        ) as unknown as ISeaQuotationFeeFormValue[],
        salesLeadsSeaQuotationDTOs: JSON.parse(
          propCopyAndCreate.salesLeadsSeaQuotationDTOs as string
        ) as unknown as string[],
        seaQuotaionGroupPartnerDTOs: JSON.parse(
          propCopyAndCreate.seaQuotaionGroupPartnerDTOs as string
        ) as unknown as string[],
      });
    }
  }, [
    form,
    edit,
    checkRow,
    manager,
    propCopyAndCreate,
    form.getFieldValue('statusSeaQuotation'),
  ]);

  const updateStatusMutation = useMutation({
    mutationFn: (body: UpdateStatus) => {
      return updateStatus(body);
    },
  });

  return (
    <Card
      style={{ marginBottom: 24 }}
      title={
        <Row justify={'center'}>
          <Col>
            <Title level={3} style={{ margin: '-4px 0' }}>
              {create && translateQuotationSea('information_add_sea_quotation')}
              {manager && 'Approval needed requests'}
              {edit &&
                (checkRow ? (
                  <>
                    {isCheckPermissionEdit && 'View'}
                    {!isCheckPermissionEdit &&
                      translateQuotationSea('information_edit_sea_quotation')}
                  </>
                ) : (
                  translateQuotationSea('information_edit_sea_quotation')
                ))}
            </Title>
          </Col>
        </Row>
      }
      extra={
        <>
          {create && useDraft && <DraftTable handleIdQuery={handleIdQuery} />}
          {edit && idQuery && (
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
                const _requestData: UpdateStatus = {
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
            label={translateQuotationSea('POL')}
            tooltip={translateQuotationSea('POL')}
            name="polid"
            rules={[
              {
                required: true,
                message: translateQuotationSea('POL_form.placeholder'),
              },
            ]}
          >
            <Select
              showSearch
              placeholder={translateQuotationSea('POL_form.placeholder')}
              disabled={checkRow && isCheckPermissionEdit}
              optionFilterProp="label"
              filterOption={(input, option) => {
                return (option?.display ?? '').includes(
                  input.toString().toLocaleUpperCase()
                );
              }}
              size="large"
              options={
                getLocation.data?.data?.map((item) => {
                  return {
                    value: item.locationID,
                    display: item.locationName,
                    label: (
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <div>{item.locationName}</div>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                        >
                          {item.typeLocation.map((item, index) => {
                            return (
                              <Tag
                                key={index}
                                style={{
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  height: '20px',
                                  marginRight: '4px',
                                }}
                              >
                                {item}
                              </Tag>
                            );
                          })}
                        </div>
                      </div>
                    ),
                  };
                }) || []
              }
            />
          </Form.Item>
        </Col>
        <Col lg={12} span={24}>
          <Form.Item
            label={translateQuotationSea('POD')}
            tooltip={translateQuotationSea('POD')}
            name="podid"
            rules={[
              {
                required: true,
                message: translateQuotationSea('POD_form.placeholder'),
              },
            ]}
          >
            <Select
              showSearch
              placeholder={translateQuotationSea('POD_form.placeholder')}
              disabled={checkRow && isCheckPermissionEdit}
              optionFilterProp="label"
              filterOption={(input, option) => {
                return (option?.display ?? '').includes(
                  input.toString().toLocaleUpperCase()
                );
              }}
              size="large"
              options={
                getLocation.data?.data?.map((item) => {
                  return {
                    value: item.locationID,
                    display: item.locationName,
                    label: (
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <div>{item.locationName}</div>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                        >
                          {item.typeLocation.map((item, index) => {
                            return (
                              <Tag
                                key={index}
                                style={{
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  height: '20px',
                                  marginRight: '4px',
                                }}
                              >
                                {item}
                              </Tag>
                            );
                          })}
                        </div>
                      </div>
                    ),
                  };
                }) || []
              }
            />
          </Form.Item>
        </Col>

        <Col lg={8} span={24}>
          <Form.Item
            label={translateQuotationSea('effect_date')}
            name="effectDated"
            rules={[
              {
                required: true,
                message: translateQuotationSea('effect_date_form.placeholder'),
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
            label={translateQuotationSea('validity')}
            name="validityDate"
            rules={[
              {
                required: true,
                message: translateQuotationSea('validity_form.placeholder'),
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
            label={translateQuotationSea('freq')}
            name="freqDate"
            rules={[
              {
                required: true,
                message: translateQuotationSea('freq_form.placeholder'),
              },
            ]}
          >
            <Select
              showSearch
              placeholder={translateQuotationSea('freq_form.placeholder')}
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
              options={DAY_WEEK}
            />
          </Form.Item>
        </Col>

        <Col lg={8} span={24}>
          <Form.Item
            label={translateQuotationSea('STO')}
            name="stoSeaQuotation"
          >
            <InputNumber
              disabled={checkRow && isCheckPermissionEdit}
              placeholder={translateQuotationSea('STO_form.placeholder')}
              formatter={(value) => formatNumber(Number(value) || '0')}
              parser={(value: any) => value.replace(/\$\s?|(,*)/g, '')}
              style={{ width: '100%' }}
            />
          </Form.Item>
        </Col>
        <Col lg={8} span={24}>
          <Form.Item
            label={translateQuotationSea('DEM')}
            name="demSeaQuotation"
          >
            <InputNumber
              style={{ width: '100%' }}
              placeholder={translateQuotationSea('DEM_form.placeholder')}
              disabled={checkRow && isCheckPermissionEdit}
              formatter={(value) => formatNumber(Number(value) || '0')}
              parser={(value: any) => value.replace(/\$\s?|(,*)/g, '')}
            />
          </Form.Item>
        </Col>
        <Col lg={8} span={24}>
          <Form.Item
            label={translateQuotationSea('DET')}
            name="detSeaQuotation"
          >
            <InputNumber
              style={{ width: '100%' }}
              placeholder={translateQuotationSea('DET_form.placeholder')}
              disabled={checkRow && isCheckPermissionEdit}
              formatter={(value) => formatNumber(Number(value) || '0')}
              parser={(value: any) => value.replace(/\$\s?|(,*)/g, '')}
            />
          </Form.Item>
        </Col>

        <Col lg={8} span={24}>
          <Form.Item
            label={translateQuotationSea('commodity')}
            name="commodityID"
            rules={[
              {
                required: true,
                message: translateQuotationSea('commodity_form.placeholder'),
              },
            ]}
          >
            <Select
              showSearch
              placeholder={translateQuotationSea('commodity_form.placeholder')}
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
            label={translateQuotationSea('LCL')}
            name="lclSeaQuotation"
          >
            <InputNumber
              placeholder={translateQuotationSea('LCL_form.placeholder')}
              formatter={(value) => formatNumber(Number(value) || '0')}
              parser={(value: any) => value.replace().replace(/,/g, '')}
              style={{ width: '100%' }}
              disabled={checkRow && isCheckPermissionEdit}
            />
          </Form.Item>
        </Col>
        <Col lg={8} span={24}>
          <Form.Item
            label={translateQuotationSea('LCLMin')}
            name="lclMinSeaQuotation"
          >
            <InputNumber
              placeholder={translateQuotationSea('LCLMin_form.placeholder')}
              formatter={(value) => formatNumber(Number(value) || '0')}
              parser={(value: any) => value.replace().replace(/,/g, '')}
              style={{ width: '100%' }}
              disabled={checkRow && isCheckPermissionEdit}
            />
          </Form.Item>
        </Col>

        <Col lg={8} span={24}>
          <Form.Item
            name="currencyID"
            label="Currency"
            rules={[
              {
                required: true,
                message: translateQuotationSea('currency_form.error_required'),
              },
            ]}
          >
            <Select
              placeholder={translateQuotationSea('currency_form.placeholder')}
              disabled={checkRow && isCheckPermissionEdit}
              showSearch
              style={{ width: '100%' }}
              options={optionCurrency}
            />
          </Form.Item>
        </Col>
        <Col lg={8} span={24}>
          <Form.Item
            label={translateQuotationSea('carrier_form.title')}
            name="vendorID"
            rules={[
              {
                required: true,
                message: translateQuotationSea('carrier_form.error_required'),
              },
            ]}
          >
            <Select
              showSearch
              placeholder={translateQuotationSea('carrier_form.placeholder')}
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
                getPartner.data?.data?.map((item) => {
                  return {
                    value: item.partnerID,
                    label: item.companyName,
                  };
                }) || []
              }
            />
          </Form.Item>
        </Col>

        <Col lg={8} span={24} style={{ display: create ? 'none' : '' }}>
          <Form.Item label={'Sea pricing'} name="seaPricingID">
            <Input style={{ width: '100%' }} disabled={true} />
          </Form.Item>
        </Col>

        <Col lg={8} span={24}>
          <Form.Item name="forNewUser" label=" ">
            <Checkbox
              checked={componentDisabled}
              onChange={(e) => setComponentDisabled(e.target.checked)}
            >
              Public
            </Checkbox>
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item
            label={'Customer'}
            name="salesLeadsSeaQuotationDTOs"
            // rules={[
            //   {
            //     required: checkObject?.includes('Customer'),
            //     message: 'Please select customer',
            //   },
            // ]}
          >
            <Select
              showSearch
              mode="multiple"
              placeholder="Select customer"
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
                getCustomer.data?.data?.map((item) => {
                  return {
                    value: item.partnerID,
                    label: item.companyName,
                  };
                }) || []
              }
            />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item label="Note" name="note">
            <Input.TextArea
              placeholder="Please enter note"
              allowClear
              disabled={checkRow && isCheckPermissionEdit}
            />
          </Form.Item>
        </Col>
        <Col span={0}>
          <Form.Item name="statusSeaQuotation"></Form.Item>
        </Col>
        <Col span={0}>
          <Form.Item name="seaQuotationDetailDTOs"></Form.Item>
        </Col>
        <Col span={0}>
          <Form.Item name="seaQuotaionFeeGroupDTOs"></Form.Item>
        </Col>
      </Row>
    </Card>
  );
};

export default CardMain;
