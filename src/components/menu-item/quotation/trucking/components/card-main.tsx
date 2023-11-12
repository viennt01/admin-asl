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
} from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  IFormValues,
  IDetailDTOs,
  ITruckQuotationFeeFormValue,
  // SeaPricingFeeDTOs,
  IUpdateStatus,
} from '../interface';
import {
  API_COMMODITY,
  API_LOCATION,
  API_PARTNER,
} from '@/fetcherAxios/endpoint';
import { getAllCommodity, getAllLocation, updateStatus } from '../fetcher';
import DraftTable from '../table/draft-table';
import { STATUS_ALL_LABELS, STATUS_MASTER_COLORS } from '@/constant/form';
import { errorToast, successToast } from '@/hook/toast';
import { API_MESSAGE } from '@/constant/message';
import { formatNumber } from '@/utils/format';
import {
  getAllPartner,
  getAllPartnerGroup,
} from '@/components/menu-item/pricing/sea/fetcher';
import dayjs from 'dayjs';

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
const dateFormat = 'YYYY/MM/DD';

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
  const { translate: translateQuotationTruck } = useI18n('truckingQuotation');
  const router = useRouter();
  const [checkStatus, setCheckStatus] = useState<boolean>(true);
  const checkObject = Form.useWatch('checkbox-group', form);
  const valuePartnerId = Form.useWatch('salesLeadsTruckingQuotationDTOs', form);
  const valueGroupPartnerId = Form.useWatch(
    'truckingQuotaionGroupPartnerDTOs',
    form
  );

  const propCopyAndCreate = router.query;

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
  const getPartnerGroup = useQuery({
    queryKey: [API_PARTNER.GET_ALL_PARTNER_GROUP],
    queryFn: () => getAllPartnerGroup(),
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
    if (form.getFieldValue('statusTruckingQuotation')) {
      form.getFieldValue('statusTruckingQuotation') === STATUS_ALL_LABELS.ACTIVE
        ? setCheckStatus(true)
        : setCheckStatus(false);
    }
    if ((edit && checkRow) || manager) {
      handleCheckEdit(true);
    }

    if (propCopyAndCreate.checkCopyAndCreate) {
      form.setFieldsValue({
        truckingPricingID: propCopyAndCreate.truckingPricingID as string,
        truckingQuotationNo: propCopyAndCreate.truckingQuotationNo as string,
        pickupID: propCopyAndCreate.pickupID as string,
        deliveryID: propCopyAndCreate.deliveryID as string,
        emtyPickupID: propCopyAndCreate.emtyPickupID as string,
        commodityID: propCopyAndCreate.commodityID as string,
        currencyID: propCopyAndCreate.currencyID as string,
        vendor: propCopyAndCreate.vendor as string,
        note: propCopyAndCreate.note as string,
        dateEffect: dayjs(Number(propCopyAndCreate.dateEffect as string)),
        validityDate: dayjs(Number(propCopyAndCreate.validityDate as string)),
        freqDate: propCopyAndCreate.freqDate as string,
        lclMinTruckingQuotation:
          propCopyAndCreate.lclMinTruckingQuotation as string,
        lclTruckingQuotation: propCopyAndCreate.lclTruckingQuotation as string,
        public: propCopyAndCreate.public as unknown as boolean,
        statusTruckingQuotation:
          propCopyAndCreate.statusTruckingQuotation as string,

        truckingQuotationDetailByContainerTypeDTOs: JSON.parse(
          propCopyAndCreate.truckingQuotationDetailByContainerTypeDTOs as string
        ) as unknown as IDetailDTOs[],
        truckingQuotationDetailByLoadCapacityDTOs: JSON.parse(
          propCopyAndCreate.truckingQuotationDetailByLoadCapacityDTOs as string
        ) as unknown as IDetailDTOs[],
        truckingQuotaionFeeGroupDTOs: JSON.parse(
          propCopyAndCreate.truckingQuotaionFeeGroupDTOs as string
        ) as unknown as ITruckQuotationFeeFormValue[],
        salesLeadsTruckingQuotationDTOs: JSON.parse(
          propCopyAndCreate.salesLeadsTruckingQuotationDTOs as string
        ) as unknown as string[],
        truckingQuotaionGroupPartnerDTOs: JSON.parse(
          propCopyAndCreate.truckingQuotaionGroupPartnerDTOs as string
        ) as unknown as string[],
      });
    }
  }, [
    form,
    edit,
    checkRow,
    manager,
    propCopyAndCreate,
    form.getFieldValue('statusTruckingQuotation'),
  ]);

  useEffect(() => {
    if (valuePartnerId && valuePartnerId.length !== 0) {
      form.setFieldValue('checkbox-group', ['Customer']);
    }
    if (valueGroupPartnerId && valueGroupPartnerId.length !== 0) {
      form.setFieldValue('checkbox-group', ['Group']);
    }
    if (
      valuePartnerId &&
      valuePartnerId.length !== 0 &&
      valueGroupPartnerId &&
      valueGroupPartnerId.length !== 0
    ) {
      form.setFieldValue('checkbox-group', ['Customer', 'Group']);
    }
  }, [valuePartnerId, valueGroupPartnerId]);

  const updateStatusMutation = useMutation({
    mutationFn: (body: IUpdateStatus) => {
      return updateStatus(body);
    },
  });

  const suffixSelectorCurrencyLCLMin = (
    <Form.Item
      name="currencyID"
      noStyle
      rules={[
        {
          required: true,
          message: translateQuotationTruck('currency_form.placeholder'),
        },
      ]}
    >
      <Select
        placeholder={'$'}
        disabled={checkRow && isCheckPermissionEdit}
        showSearch
        style={{ width: 75 }}
        options={optionCurrency}
      />
    </Form.Item>
  );

  const suffixSelectorCurrencyLCL = (
    <Form.Item
      name="currencyID"
      noStyle
      rules={[
        {
          required: true,
          message: translateQuotationTruck('currency_form.placeholder'),
        },
      ]}
    >
      <Select
        placeholder={'$'}
        disabled={checkRow && isCheckPermissionEdit}
        showSearch
        style={{ width: 75 }}
        options={optionCurrency}
      />
    </Form.Item>
  );
  return (
    <Card
      style={{ marginBottom: 24 }}
      title={
        <Row justify={'center'}>
          <Col>
            <Title level={3} style={{ margin: '-4px 0' }}>
              {create &&
                translateQuotationTruck('information_add_trucking_quotation')}
              {manager && 'Approval needed requests'}
              {edit &&
                (checkRow ? (
                  <>
                    {isCheckPermissionEdit && 'View'}
                    {!isCheckPermissionEdit &&
                      translateQuotationTruck(
                        'information_edit_trucking_quotation'
                      )}
                  </>
                ) : (
                  translateQuotationTruck('information_edit_trucking_quotation')
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
        <Col lg={8} span={24}>
          <Form.Item
            label={translateQuotationTruck('pickup_form.title')}
            tooltip={translateQuotationTruck('pickup_form.title')}
            name="pickupID"
            rules={[
              {
                required: true,
                message: translateQuotationTruck('pickup_form.error_required'),
              },
            ]}
          >
            <Select
              showSearch
              placeholder={translateQuotationTruck('pickup_form.placeholder')}
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
            label={translateQuotationTruck('delivery_form.title')}
            tooltip={translateQuotationTruck('delivery_form.title')}
            name="deliveryID"
            rules={[
              {
                required: true,
                message: translateQuotationTruck(
                  'delivery_form.error_required'
                ),
              },
            ]}
          >
            <Select
              showSearch
              placeholder={translateQuotationTruck('delivery_form.placeholder')}
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
            label={translateQuotationTruck('emtyPickup_form.title')}
            tooltip={translateQuotationTruck('emtyPickup_form.title')}
            name="emtyPickupID"
            rules={[
              {
                required: true,
                message: translateQuotationTruck(
                  'emtyPickup_form.error_required'
                ),
              },
            ]}
          >
            <Select
              showSearch
              placeholder={translateQuotationTruck(
                'emtyPickup_form.placeholder'
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
            label={translateQuotationTruck('validity')}
            name="validityDate"
            rules={[
              {
                required: true,
                message: translateQuotationTruck('validity_form.placeholder'),
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
            label={translateQuotationTruck('effect_date')}
            name="dateEffect"
            rules={[
              {
                required: true,
                message: translateQuotationTruck(
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
            label={translateQuotationTruck('freq')}
            name="freqDate"
            rules={[
              {
                required: true,
                message: translateQuotationTruck('freq_form.placeholder'),
              },
            ]}
          >
            <InputNumber
              disabled={checkRow && isCheckPermissionEdit}
              placeholder={translateQuotationTruck('freq_form.placeholder')}
              formatter={(value) => formatNumber(Number(value) || 0)}
              parser={(value: any) => value.replace(/\$\s?|(,*)/g, '')}
              style={{ width: '100%' }}
            />
          </Form.Item>
        </Col>

        <Col lg={8} span={24}>
          <Form.Item
            label={translateQuotationTruck('commodity')}
            name="commodityID"
            rules={[
              {
                required: true,
                message: translateQuotationTruck('commodity_form.placeholder'),
              },
            ]}
          >
            <Select
              showSearch
              placeholder={translateQuotationTruck(
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
        <Col lg={8} span={24}>
          <Form.Item
            label={translateQuotationTruck('LCL')}
            name="lclTruckingQuotation"
            rules={[
              {
                required: true,
                message: translateQuotationTruck('LCL_form.placeholder'),
              },
            ]}
          >
            <InputNumber
              addonAfter={suffixSelectorCurrencyLCL}
              placeholder={translateQuotationTruck('LCL_form.placeholder')}
              formatter={(value) => formatNumber(Number(value) || 0)}
              parser={(value: any) => value.replace().replace(/,/g, '')}
              style={{ width: '100%' }}
              disabled={checkRow && isCheckPermissionEdit}
            />
          </Form.Item>
        </Col>
        <Col lg={8} span={24}>
          <Form.Item
            label={translateQuotationTruck('LCLMin')}
            name="lclMinTruckingQuotation"
            rules={[
              {
                required: true,
                message: translateQuotationTruck('LCLMin_form.placeholder'),
              },
            ]}
          >
            <InputNumber
              addonAfter={suffixSelectorCurrencyLCLMin}
              placeholder={translateQuotationTruck('LCLMin_form.placeholder')}
              formatter={(value) => formatNumber(Number(value) || 0)}
              parser={(value: any) => value.replace().replace(/,/g, '')}
              style={{ width: '100%' }}
              disabled={checkRow && isCheckPermissionEdit}
            />
          </Form.Item>
        </Col>

        <Col lg={8} span={24}>
          <Form.Item
            label={translateQuotationTruck('vendor_form.title')}
            name="vendor"
            rules={[
              {
                required: true,
                message: translateQuotationTruck('vendor_form.error_required'),
              },
            ]}
          >
            <Select
              showSearch
              placeholder={translateQuotationTruck('vendor_form.placeholder')}
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
                getPartner.data?.data.map((item) => {
                  return {
                    value: item.partnerID,
                    label: item.name,
                  };
                }) || []
              }
            />
          </Form.Item>
        </Col>

        <Col lg={8} span={24}>
          <Form.Item
            name="checkbox-group"
            label="Object"
            rules={[
              {
                required: true,
                message: 'Please choose an object',
              },
            ]}
          >
            <Checkbox.Group>
              <Row>
                <Col span={14}>
                  <Checkbox value="Customer" style={{ lineHeight: '32px' }}>
                    Customer
                  </Checkbox>
                </Col>
                <Col span={10}>
                  <Checkbox value="Group" style={{ lineHeight: '32px' }}>
                    Group
                  </Checkbox>
                </Col>
              </Row>
            </Checkbox.Group>
          </Form.Item>
        </Col>

        <Col span={checkObject?.includes('Group') ? 24 : 0}>
          <Form.Item
            label={'Group'}
            name="truckingQuotaionGroupPartnerDTOs"
            rules={[
              {
                required: checkObject?.includes('Group'),
                message: 'Please select group',
              },
            ]}
          >
            <Select
              disabled={!checkObject?.includes('Group')}
              showSearch
              mode="multiple"
              placeholder="Select group"
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
                getPartnerGroup.data?.data.map((item) => {
                  return {
                    value: item.groupPartnerID,
                    label: item.abbreviations,
                  };
                }) || []
              }
            />
          </Form.Item>
        </Col>

        <Col span={checkObject?.includes('Customer') ? 24 : 0}>
          <Form.Item
            label={'Customer'}
            name="salesLeadsTruckingQuotationDTOs"
            rules={[
              {
                required: checkObject?.includes('Customer'),
                message: 'Please select customer',
              },
            ]}
          >
            <Select
              disabled={!checkObject?.includes('Customer')}
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
                getPartner.data?.data.map((item) => {
                  return {
                    value: item.partnerID,
                    label: item.name,
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
          <Form.Item name="statusTruckingQuotation"></Form.Item>
        </Col>
        <Col span={0}>
          <Form.Item name="truckingQuotationDetailByContainerTypeDTOs"></Form.Item>
        </Col>
        <Col span={0}>
          <Form.Item name="truckingQuotationDetailByLoadCapacityDTOs"></Form.Item>
        </Col>
        <Col span={0}>
          <Form.Item name="truckingQuotaionFeeGroupDTOs"></Form.Item>
        </Col>
      </Row>
    </Card>
  );
};

export default CardMain;
