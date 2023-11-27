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
  getAllLocation,
  getAllPartner,
  getAllPartnerGroup,
} from '@/components/menu-item/pricing/sea/fetcher';
import dayjs from 'dayjs';
import { TYPE_LOCATION } from '@/components/menu-item/pricing/sea/interface';

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
const dateFormat = 'YYYY-MM-DD HH:MM';

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
  const checkObject = Form.useWatch('checkbox-group', form);
  const valuePartnerId = Form.useWatch('salesLeadsSeaQuotationDTOs', form);
  const valueGroupPartnerId = Form.useWatch(
    'seaQuotaionGroupPartnerDTOs',
    form
  );

  const propCopyAndCreate = router.query;

  const getLocation = useQuery({
    queryKey: [API_LOCATION.GET_ALL],
    queryFn: () => getAllLocation({ type: TYPE_LOCATION.SEA }),
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
        dateEffect: dayjs(Number(propCopyAndCreate.dateEffect as string)),
        validityDate: dayjs(Number(propCopyAndCreate.validityDate as string)),
        freqDate: propCopyAndCreate.freqDate as string,
        vendor: propCopyAndCreate.vendor as string,
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
    mutationFn: (body: UpdateStatus) => {
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
          message: translateQuotationSea('currency_form.placeholder'),
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
          message: translateQuotationSea('currency_form.placeholder'),
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
            label={translateQuotationSea('effect_date')}
            name="dateEffect"
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
            label={translateQuotationSea('freq')}
            name="freqDate"
            rules={[
              {
                required: true,
                message: translateQuotationSea('freq_form.placeholder'),
              },
            ]}
          >
            <InputNumber
              disabled={checkRow && isCheckPermissionEdit}
              placeholder={translateQuotationSea('freq_form.placeholder')}
              formatter={(value) => formatNumber(Number(value) || 0)}
              parser={(value: any) => value.replace(/\$\s?|(,*)/g, '')}
              style={{ width: '100%' }}
            />
          </Form.Item>
        </Col>

        <Col lg={8} span={24}>
          <Form.Item
            label={translateQuotationSea('STO')}
            name="stoSeaQuotation"
            rules={[
              {
                required: true,
                message: translateQuotationSea('STO_form.placeholder'),
              },
            ]}
          >
            <InputNumber
              disabled={checkRow && isCheckPermissionEdit}
              placeholder={translateQuotationSea('STO_form.placeholder')}
              formatter={(value) => formatNumber(Number(value) || 0)}
              parser={(value: any) => value.replace(/\$\s?|(,*)/g, '')}
              style={{ width: '100%' }}
            />
          </Form.Item>
        </Col>
        <Col lg={8} span={24}>
          <Form.Item
            label={translateQuotationSea('DEM')}
            name="demSeaQuotation"
            rules={[
              {
                required: true,
                message: translateQuotationSea('DEM_form.placeholder'),
              },
            ]}
          >
            <InputNumber
              style={{ width: '100%' }}
              placeholder={translateQuotationSea('DEM_form.placeholder')}
              disabled={checkRow && isCheckPermissionEdit}
              formatter={(value) => formatNumber(Number(value) || 0)}
              parser={(value: any) => value.replace(/\$\s?|(,*)/g, '')}
            />
          </Form.Item>
        </Col>
        <Col lg={8} span={24}>
          <Form.Item
            label={translateQuotationSea('DET')}
            name="detSeaQuotation"
            rules={[
              {
                required: true,
                message: translateQuotationSea('DET_form.placeholder'),
              },
            ]}
          >
            <InputNumber
              style={{ width: '100%' }}
              placeholder={translateQuotationSea('DET_form.placeholder')}
              disabled={checkRow && isCheckPermissionEdit}
              formatter={(value) => formatNumber(Number(value) || 0)}
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
            rules={[
              {
                required: true,
                message: translateQuotationSea('LCL_form.placeholder'),
              },
            ]}
          >
            <InputNumber
              addonAfter={suffixSelectorCurrencyLCL}
              placeholder={translateQuotationSea('LCL_form.placeholder')}
              formatter={(value) => formatNumber(Number(value) || 0)}
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
            rules={[
              {
                required: true,
                message: translateQuotationSea('LCLMin_form.placeholder'),
              },
            ]}
          >
            <InputNumber
              addonAfter={suffixSelectorCurrencyLCLMin}
              placeholder={translateQuotationSea('LCLMin_form.placeholder')}
              formatter={(value) => formatNumber(Number(value) || 0)}
              parser={(value: any) => value.replace().replace(/,/g, '')}
              style={{ width: '100%' }}
              disabled={checkRow && isCheckPermissionEdit}
            />
          </Form.Item>
        </Col>

        <Col lg={8} span={24}>
          <Form.Item
            label={translateQuotationSea('vendor_form.title')}
            name="vendor"
            rules={[
              {
                required: true,
                message: translateQuotationSea('vendor_form.error_required'),
              },
            ]}
          >
            <Select
              showSearch
              placeholder={translateQuotationSea('vendor_form.placeholder')}
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
            name="seaQuotaionGroupPartnerDTOs"
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
            name="salesLeadsSeaQuotationDTOs"
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
