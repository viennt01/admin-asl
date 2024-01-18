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
import { FormValues, AirPricingDetailDTOs, UpdateStatus } from '../interface';
import {
  API_COMMODITY,
  API_FEE_GROUP,
  API_LOCATION,
  API_PARTNER,
} from '@/fetcherAxios/endpoint';
import { getAllCommodity, updateStatus } from '../fetcher';
import DraftTable from '../table/draft-table';
import { STATUS_ALL_LABELS, STATUS_MASTER_COLORS } from '@/constant/form';
import { errorToast, successToast } from '@/hook/toast';
import { API_MESSAGE } from '@/constant/message';
import { formatNumber } from '@/utils/format';
import { getAllLiner, getAllLocation } from '../../sea/fetcher';
import { TYPE_LOCATION } from '../../sea/interface';
import { getAllFeeGroup } from '@/components/menu-item/quotation/fee-group/fetcher';
import { TYPE_FEE_GROUP } from '@/components/menu-item/quotation/fee-group/interface';
import { DAY_WEEK } from '@/constant';

interface Props {
  create?: boolean;
  manager?: boolean;
  edit?: boolean;
  handleSubmit?: (formValues: FormValues, id?: string) => void;
  handleSaveDraft?: (formValues: FormValues, id?: string) => void;
  loadingSubmit?: boolean;
  checkRow: boolean;
  useDraft?: boolean;
  optionCurrency: { value: string; label: string }[];
  form: FormInstance<FormValues>;
  idQuery?: string;
  handleIdQuery: (id: string) => void;
  handleCheckEdit: (data: boolean) => void;
  isCheckPermissionEdit: boolean;
}

const { Title } = Typography;

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
  const { translate: translatePricingAir } = useI18n('pricingAir');
  const router = useRouter();
  const [checkStatus, setCheckStatus] = useState<boolean>(true);
  const [componentDisabled, setComponentDisabled] = useState<boolean>(false);

  useEffect(() => {
    form.setFieldValue('gw', componentDisabled);
  }, [componentDisabled]);

  useEffect(() => {
    setComponentDisabled(form.getFieldValue('gw'));
  }, [form.getFieldValue('gw')]);

  const propCopyAndCreate = router.query;
  const dateFormat = 'YYYY-MM-DD';

  const getLocation = useQuery({
    queryKey: [API_LOCATION.GET_ALL],
    queryFn: () => getAllLocation({ type: [TYPE_LOCATION.AIR_PORT] }),
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

  const getFeeGroup = useQuery({
    queryKey: [API_FEE_GROUP.GET_ALL],
    queryFn: () => getAllFeeGroup({ type: TYPE_FEE_GROUP.AIR_PRICING }),
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

  const getLiner = useQuery({
    queryKey: [API_PARTNER.GET_ALL_VENDOR],
    queryFn: () => getAllLiner(),
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
    if (form.getFieldValue('statusAirPricing')) {
      form.getFieldValue('statusAirPricing') === STATUS_ALL_LABELS.ACTIVE
        ? setCheckStatus(true)
        : setCheckStatus(false);
    }
    if ((edit && checkRow) || manager) {
      handleCheckEdit(true);
    }

    if (propCopyAndCreate.checkCopyAndCreate) {
      form.setFieldsValue({
        aodid: propCopyAndCreate.aodid as string,
        aolid: propCopyAndCreate.aolid as string,
        commodityID: propCopyAndCreate.commodityID as string,
        note: propCopyAndCreate.note as string,
        validityDate: propCopyAndCreate.validityDate as string,
        effectDated: propCopyAndCreate.effectDated as string,
        freqDate: propCopyAndCreate.freqDate as string,
        currencyID: propCopyAndCreate.currencyID as string,
        vendorID: propCopyAndCreate.vendorID as string,
        fscAirPricing: propCopyAndCreate.fscAirPricing as string,
        sscAirPricing: propCopyAndCreate.sscAirPricing as string,
        loadCapacityMinAirPricing:
          propCopyAndCreate.loadCapacityMinAirPricing as string,
        priceLoadCapacityMinAirPricing:
          propCopyAndCreate.priceLoadCapacityMinAirPricing as string,
        gw: propCopyAndCreate.gw as unknown as boolean,
        transitTimeAirPricing:
          propCopyAndCreate.transitTimeAirPricing as string,
        public: propCopyAndCreate.public as unknown as boolean,
        statusAirPricing: propCopyAndCreate.statusAirPricing as string,
        airPricingDetailDTOs:
          propCopyAndCreate.airPricingDetailDTOs as unknown as AirPricingDetailDTOs[],
        airPricingFeeDTOs:
          typeof propCopyAndCreate.airPricingFeeDTOs === 'string'
            ? [propCopyAndCreate.airPricingFeeDTOs as unknown as string]
            : (propCopyAndCreate.airPricingFeeDTOs as unknown as string[]),
      });
    }
  }, [
    form,
    edit,
    checkRow,
    manager,
    propCopyAndCreate,
    form.getFieldValue('statusAirPricing'),
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
              {create && translatePricingAir('information_add_air_pricing')}
              {manager && 'Approval needed requests'}
              {edit &&
                (checkRow ? (
                  <>
                    {isCheckPermissionEdit && 'View'}
                    {!isCheckPermissionEdit &&
                      translatePricingAir('information_edit_air_pricing')}
                  </>
                ) : (
                  translatePricingAir('information_edit_air_pricing')
                ))}
            </Title>
          </Col>
        </Row>
      }
      extra={
        <>
          {create && useDraft && <DraftTable handleIdQuery={handleIdQuery} />}
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
            label={translatePricingAir('AOL_form.title')}
            tooltip={translatePricingAir('AOL_form.title')}
            name="aolid"
            rules={[
              {
                required: true,
                message: translatePricingAir('AOL_form.placeholder'),
              },
            ]}
          >
            <Select
              showSearch
              placeholder={translatePricingAir('AOL_form.placeholder')}
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
            label={translatePricingAir('AOD_form.title')}
            tooltip={translatePricingAir('AOD_form.title')}
            name="aodid"
            rules={[
              {
                required: true,
                message: translatePricingAir('AOD_form.error_required'),
              },
            ]}
          >
            <Select
              showSearch
              placeholder={translatePricingAir('AOD_form.placeholder')}
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
            label={translatePricingAir('effect_date_form.title')}
            name="effectDated"
            rules={[
              {
                required: true,
                message: translatePricingAir('effect_date_form.error_required'),
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
            label={translatePricingAir('validity_form.title')}
            name="validityDate"
            rules={[
              {
                required: true,
                message: translatePricingAir('validity_form.error_required'),
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
            label={translatePricingAir('freq_form.title')}
            name="freqDate"
            rules={[
              {
                required: true,
                message: translatePricingAir('freq_form.error_required'),
              },
            ]}
          >
            <Select
              showSearch
              placeholder={translatePricingAir('freq_form.placeholder')}
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
            label={translatePricingAir('commodity_form.title')}
            name="commodityID"
            rules={[
              {
                required: true,
                message: translatePricingAir('commodity_form.error_required'),
              },
            ]}
          >
            <Select
              showSearch
              placeholder={translatePricingAir('commodity_form.placeholder')}
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
            label={translatePricingAir('carrier_form.title')}
            name="vendorID"
            rules={[
              {
                required: true,
                message: translatePricingAir('carrier_form.error_required'),
              },
            ]}
          >
            <Select
              showSearch
              placeholder={translatePricingAir('carrier_form.placeholder')}
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
                getLiner.data?.data.map((item) => {
                  return {
                    value: item.partnerID,
                    label: item.companyName,
                  };
                }) || []
              }
            />
          </Form.Item>
        </Col>
        <Col lg={8} span={24}>
          <Form.Item
            label={translatePricingAir('transitTime_form.title')}
            name="transitTimeAirPricing"
          >
            <Input
              style={{ width: '100%' }}
              placeholder={translatePricingAir('transitTime_form.placeholder')}
              disabled={checkRow && isCheckPermissionEdit}
            />
          </Form.Item>
        </Col>

        <Col lg={8} span={24}>
          <Form.Item
            label={translatePricingAir('currency_form.title')}
            name="currencyID"
            rules={[
              {
                required: true,
                message: translatePricingAir('currency_form.error_required'),
              },
            ]}
          >
            <Select
              placeholder={translatePricingAir('currency_form.placeholder')}
              disabled={checkRow && isCheckPermissionEdit}
              showSearch
              style={{ width: '100%' }}
              options={optionCurrency}
            />
          </Form.Item>
        </Col>
        <Col lg={8} span={24}>
          <Form.Item
            label={translatePricingAir('loadCapacityMin_form.title')}
            name="loadCapacityMinAirQuotation"
            rules={[
              {
                required: true,
                message: translatePricingAir(
                  'loadCapacityMin_form.error_required'
                ),
              },
            ]}
          >
            <InputNumber
              style={{ width: '100%' }}
              placeholder={translatePricingAir(
                'loadCapacityMin_form.placeholder'
              )}
              min={0}
              disabled={checkRow && isCheckPermissionEdit}
              formatter={(value) => formatNumber(Number(value) || '0')}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              parser={(value: any) => value.replace(/\$\s?|(,*)/g, '')}
            />
          </Form.Item>
        </Col>
        <Col lg={8} span={24}>
          <Form.Item
            label={translatePricingAir('priceLoadCapacityMin_form.title')}
            name="priceLoadCapacityMinAirQuotation"
            rules={[
              {
                required: true,
                message: translatePricingAir(
                  'priceLoadCapacityMin_form.error_required'
                ),
              },
            ]}
          >
            <InputNumber
              style={{ width: '100%' }}
              placeholder={translatePricingAir(
                'priceLoadCapacityMin_form.placeholder'
              )}
              min={0}
              disabled={checkRow && isCheckPermissionEdit}
              formatter={(value) => formatNumber(Number(value) || '0')}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              parser={(value: any) => value.replace(/\$\s?|(,*)/g, '')}
            />
          </Form.Item>
        </Col>

        <Col lg={8} span={24}>
          <Form.Item
            label={translatePricingAir('fscAirPricing_form.title')}
            name="fscAirPricing"
            rules={[
              {
                required: true,
                message: translatePricingAir(
                  'fscAirPricing_form.error_required'
                ),
              },
            ]}
          >
            <InputNumber
              style={{ width: '100%' }}
              placeholder={translatePricingAir(
                'fscAirPricing_form.placeholder'
              )}
              min={0}
              disabled={checkRow && isCheckPermissionEdit}
              formatter={(value) => formatNumber(Number(value) || '0')}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              parser={(value: any) => value.replace(/\$\s?|(,*)/g, '')}
            />
          </Form.Item>
        </Col>
        <Col lg={8} span={24}>
          <Form.Item
            label={translatePricingAir('sscAirPricing_form.title')}
            name="sscAirPricing"
            rules={[
              {
                required: true,
                message: translatePricingAir(
                  'sscAirPricing_form.error_required'
                ),
              },
            ]}
          >
            <InputNumber
              style={{ width: '100%' }}
              placeholder={translatePricingAir(
                'sscAirPricing_form.placeholder'
              )}
              min={0}
              disabled={checkRow && isCheckPermissionEdit}
              formatter={(value) => formatNumber(Number(value) || '0')}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              parser={(value: any) => value.replace(/\$\s?|(,*)/g, '')}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label={'GW'} name="gw">
            <Checkbox
              disabled={checkRow && isCheckPermissionEdit}
              checked={componentDisabled}
              onChange={(e) => setComponentDisabled(e.target.checked)}
            />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item
            label={translatePricingAir('Fee_Group_form.title')}
            name="airPricingFeeDTOs"
            // rules={[
            //   {
            //     required: true,
            //     message: translatePricingAir('Fee_Group_form.error_required'),
            //   },
            // ]}
          >
            <Select
              showSearch
              mode="multiple"
              placeholder={translatePricingAir('Fee_Group_form.placeholder')}
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
                getFeeGroup.data?.data.map((item) => {
                  return {
                    value: item.feeGroupID,
                    label: item.feeGroupName,
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
          <Form.Item name="statusAirPricing"></Form.Item>
        </Col>
        <Col span={0}>
          <Form.Item name="airPricingDetailDTOs"></Form.Item>
        </Col>
      </Row>
    </Card>
  );
};

export default CardMain;
