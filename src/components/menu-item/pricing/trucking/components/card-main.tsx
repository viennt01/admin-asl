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
  FormInstance,
  Tag,
} from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  IFormValues,
  ITypeDTOs,
  // SeaPricingFeeDTOs,
  IUpdateStatus,
} from '../interface';
import {
  API_COMMODITY,
  API_FEE_GROUP,
  API_LOCATION,
} from '@/fetcherAxios/endpoint';
import { getAllCommodity, updateStatus } from '../fetcher';
import DraftTable from '../table/draft-table';
import { STATUS_ALL_LABELS, STATUS_MASTER_COLORS } from '@/constant/form';
import { errorToast, successToast } from '@/hook/toast';
import { API_MESSAGE } from '@/constant/message';
import dayjs from 'dayjs';
import { getAllFeeGroup } from '@/components/menu-item/quotation/fee-group/fetcher';
import { TYPE_FEE_GROUP } from '@/components/menu-item/quotation/fee-group/interface';
import { getAllLocation } from '../../sea/fetcher';
import { TYPE_LOCATION } from '../../sea/interface';
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
  const { translate: translatePricingTrucking } = useI18n('pricingTrucking');
  const router = useRouter();
  const [checkStatus, setCheckStatus] = useState<boolean>(true);

  const propCopyAndCreate = router.query;
  const dateFormat = 'YYYY-MM-DD';

  const getLocation = useQuery({
    queryKey: [API_LOCATION.GET_ALL],
    queryFn: () =>
      getAllLocation({
        type: [
          TYPE_LOCATION.AIR_PORT,
          TYPE_LOCATION.DEPOT,
          TYPE_LOCATION.INDUSTRIAL_ZONE,
          TYPE_LOCATION.PORT,
        ],
      }),
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
    queryFn: () => getAllFeeGroup({ type: TYPE_FEE_GROUP.TRUCKING_PRICING }),
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
    if (form.getFieldValue('statusTruckingPricing')) {
      form.getFieldValue('statusTruckingPricing') === STATUS_ALL_LABELS.ACTIVE
        ? setCheckStatus(true)
        : setCheckStatus(false);
    }
    if ((edit && checkRow) || manager) {
      handleCheckEdit(true);
    }

    if (propCopyAndCreate.checkCopyAndCreate) {
      form.setFieldsValue({
        pickupID: propCopyAndCreate.pickupID as string,
        deliveryID: propCopyAndCreate.deliveryID as string,
        commodityID: propCopyAndCreate.commodityID as string,
        currencyID: propCopyAndCreate.currencyID as string,
        transitTimetruckingPricing:
          propCopyAndCreate.transitTimetruckingPricing as string,
        public: propCopyAndCreate.public as unknown as boolean,
        note: propCopyAndCreate.note as string,
        effectDated: dayjs(Number(propCopyAndCreate.effectDated as string)),
        validityDate: dayjs(Number(propCopyAndCreate.validityDate as string)),
        freqDate: propCopyAndCreate.freqDate as string,
        statusTruckingPricing:
          propCopyAndCreate.statusTruckingPricing as string,

        truckingPricingDetailByContainerTypeDTOs: JSON.parse(
          propCopyAndCreate.truckingPricingDetailByContainerTypeDTOs as string
        ) as unknown as ITypeDTOs[],
        truckingPricingFeeGroupDTOs:
          typeof propCopyAndCreate.truckingPricingFeeGroupDTOs === 'string'
            ? [
                propCopyAndCreate.truckingPricingFeeGroupDTOs as unknown as string,
              ]
            : (propCopyAndCreate.truckingPricingFeeGroupDTOs as unknown as string[]),
      });
    }
  }, [
    form,
    edit,
    checkRow,
    manager,
    propCopyAndCreate,
    form.getFieldValue('statusTruckingPricing'),
  ]);

  const updateStatusMutation = useMutation({
    mutationFn: (body: IUpdateStatus) => {
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
              {create &&
                translatePricingTrucking('information_add_trucking_pricing')}
              {manager && 'Approval needed requests'}
              {edit &&
                (checkRow ? (
                  <>
                    {isCheckPermissionEdit && 'View'}
                    {!isCheckPermissionEdit &&
                      translatePricingTrucking(
                        'information_edit_trucking_pricing'
                      )}
                  </>
                ) : (
                  translatePricingTrucking('information_edit_trucking_pricing')
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
                const _requestData: IUpdateStatus = {
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
            label={translatePricingTrucking('pickup')}
            tooltip={translatePricingTrucking('pickup')}
            name="pickupID"
            rules={[
              {
                required: true,
                message: translatePricingTrucking('pickup_form.error_required'),
              },
            ]}
          >
            <Select
              showSearch
              placeholder={translatePricingTrucking('pickup_form.placeholder')}
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
            label={translatePricingTrucking('delivery_form.title')}
            tooltip={translatePricingTrucking('delivery_form.title')}
            name="deliveryID"
            rules={[
              {
                required: true,
                message: translatePricingTrucking(
                  'delivery_form.error_required'
                ),
              },
            ]}
          >
            <Select
              showSearch
              placeholder={translatePricingTrucking(
                'delivery_form.placeholder'
              )}
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
            label={translatePricingTrucking('effect_date')}
            name="effectDated"
            rules={[
              {
                required: true,
                message: translatePricingTrucking(
                  'effect_date_form.placeholder'
                ),
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
            label={translatePricingTrucking('validity')}
            name="validityDate"
            rules={[
              {
                required: true,
                message: translatePricingTrucking('validity_form.placeholder'),
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
            label={translatePricingTrucking('freq')}
            name="freqDate"
            rules={[
              {
                required: true,
                message: translatePricingTrucking('freq_form.placeholder'),
              },
            ]}
          >
            <Select
              showSearch
              placeholder={translatePricingTrucking('freq_form.placeholder')}
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
            label={translatePricingTrucking('transitTimeSeaPricing_form.title')}
            name="transitTimeSeaPricing"
          >
            <Input
              style={{ width: '100%' }}
              placeholder={translatePricingTrucking(
                'transitTimeSeaPricing_form.placeholder'
              )}
              disabled={checkRow && isCheckPermissionEdit}
            />
          </Form.Item>
        </Col>

        <Col lg={8} span={24}>
          <Form.Item
            label={translatePricingTrucking('commodity')}
            name="commodityID"
            rules={[
              {
                required: true,
                message: translatePricingTrucking('commodity_form.placeholder'),
              },
            ]}
          >
            <Select
              showSearch
              placeholder={translatePricingTrucking(
                'commodity_form.placeholder'
              )}
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
        <Col span={8}>
          <Form.Item
            label="Currency"
            name="currencyID"
            rules={[
              {
                required: true,
                message: translatePricingTrucking(
                  'currency_form.error_required'
                ),
              },
            ]}
          >
            <Select
              placeholder={translatePricingTrucking(
                'currency_form.placeholder'
              )}
              disabled={checkRow && isCheckPermissionEdit}
              showSearch
              style={{ width: '100%' }}
              options={optionCurrency}
            />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item
            label={translatePricingTrucking('Fee_Group_form.title')}
            name="truckingPricingFeeGroupDTOs"
          >
            <Select
              showSearch
              mode="multiple"
              placeholder={translatePricingTrucking(
                'Fee_Group_form.placeholder'
              )}
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
          <Form.Item name="statusTruckingPricing"></Form.Item>
        </Col>
        <Col span={0}>
          <Form.Item name="truckingPricingDetailByContainerTypeDTOs"></Form.Item>
        </Col>
        <Col span={0}>
          <Form.Item name="truckingPricingDetailByLoadCapacityDTOs"></Form.Item>
        </Col>
      </Row>
    </Card>
  );
};

export default CardMain;
