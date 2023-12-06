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
} from 'antd';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import {
  FormValues,
  SeaPricingDetailDTOs,
  TYPE_LOCATION,
  // SeaPricingFeeDTOs,
  UpdateStatus,
} from '../interface';
import {
  API_COMMODITY,
  API_FEE_GROUP,
  API_LOCATION,
  API_PARTNER,
} from '@/fetcherAxios/endpoint';
import {
  getAllCommodity,
  getAllLocation,
  getAllPartner,
  updateStatus,
} from '../fetcher';
import DraftTable from '../table/draft-table';
import { STATUS_ALL_LABELS, STATUS_MASTER_COLORS } from '@/constant/form';
import { errorToast, successToast } from '@/hook/toast';
import { API_MESSAGE } from '@/constant/message';
import { formatNumber } from '@/utils/format';
import dayjs from 'dayjs';
import { TYPE_FEE_GROUP } from '@/components/menu-item/quotation/fee-group/interface';
import { getAllFeeGroup } from '@/components/menu-item/quotation/fee-group/fetcher';
import { ROLE } from '@/constant/permission';
import { AppContext } from '@/app-context';

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
  const { translate: translatePricingSea } = useI18n('pricingSea');
  const router = useRouter();
  const [checkStatus, setCheckStatus] = useState<boolean>(true);
  const { role } = useContext(AppContext);

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
  const getFeeGroup = useQuery({
    queryKey: [API_FEE_GROUP.GET_ALL],
    queryFn: () => getAllFeeGroup({ type: TYPE_FEE_GROUP.SEA_PRICING }),
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

  useEffect(() => {
    if (form.getFieldValue('statusSeaPricing')) {
      form.getFieldValue('statusSeaPricing') === STATUS_ALL_LABELS.ACTIVE
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
        demSeaPricing: propCopyAndCreate.demSeaPricing as string,
        detSeaPricing: propCopyAndCreate.detSeaPricing as string,
        stoSeaPricing: propCopyAndCreate.stoSeaPricing as string,
        lclMinSeaPricing: propCopyAndCreate.lclMinSeaPricing as string,
        lclSeaPricing: propCopyAndCreate.lclSeaPricing as string,
        currencyID: propCopyAndCreate.currencyID as string,
        public: propCopyAndCreate.public as unknown as boolean,
        statusSeaPricing: propCopyAndCreate.statusSeaPricing as string,
        seaPricingDetailDTOs: JSON.parse(
          propCopyAndCreate.seaPricingDetailDTOs as string
        ) as unknown as SeaPricingDetailDTOs[],
        seaPricingFeeGroupDTOs:
          typeof propCopyAndCreate.seaPricingFeeGroupDTOs === 'string'
            ? [propCopyAndCreate.seaPricingFeeGroupDTOs as unknown as string]
            : (propCopyAndCreate.seaPricingFeeGroupDTOs as unknown as string[]),
      });
    }
  }, [
    form,
    edit,
    checkRow,
    manager,
    propCopyAndCreate,
    form.getFieldValue('statusSeaPricing'),
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
              {create && translatePricingSea('information_add_sea_pricing')}
              {manager && 'Approval needed requests'}
              {edit &&
                (checkRow ? (
                  <>
                    {isCheckPermissionEdit && 'View'}
                    {!isCheckPermissionEdit &&
                      translatePricingSea('information_edit_sea_pricing')}
                  </>
                ) : (
                  translatePricingSea('information_edit_sea_pricing')
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
            label={translatePricingSea('POL')}
            tooltip={translatePricingSea('POL')}
            name="polid"
            rules={[
              {
                required: true,
                message: translatePricingSea('POL_form.placeholder'),
              },
            ]}
          >
            <Select
              showSearch
              placeholder={translatePricingSea('POL_form.placeholder')}
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
                message: translatePricingSea('POD_form.placeholder'),
              },
            ]}
          >
            <Select
              showSearch
              placeholder={translatePricingSea('POD_form.placeholder')}
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
                message: translatePricingSea('validity_form.placeholder'),
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
            label={translatePricingSea('effect_date')}
            name="dateEffect"
            rules={[
              {
                required: true,
                message: translatePricingSea('effect_date_form.placeholder'),
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
            name="freqDate"
            rules={[
              {
                required: true,
                message: translatePricingSea('freq_form.placeholder'),
              },
            ]}
          >
            <Select
              showSearch
              placeholder={translatePricingSea('freq_form.placeholder')}
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
              options={[
                {
                  value: '2',
                  label: 'Monday',
                },
                {
                  value: '3',
                  label: 'Tuesday',
                },
                {
                  value: '4',
                  label: 'Wednesday',
                },
                {
                  value: '5',
                  label: 'Thursday',
                },
                {
                  value: '6',
                  label: 'Friday',
                },
                {
                  value: '7',
                  label: 'Saturday',
                },
                {
                  value: '8',
                  label: 'Sunday',
                },
              ]}
            />
          </Form.Item>
        </Col>

        <Col lg={8} span={24}>
          <Form.Item label={translatePricingSea('STO')} name="stoSeaPricing">
            <InputNumber
              disabled={checkRow && isCheckPermissionEdit}
              placeholder={translatePricingSea('STO_form.placeholder')}
              formatter={(value) => formatNumber(Number(value) || 0)}
              parser={(value: any) => value.replace(/\$\s?|(,*)/g, '')}
              style={{ width: '100%' }}
            />
          </Form.Item>
        </Col>
        <Col lg={8} span={24}>
          <Form.Item label={translatePricingSea('DEM')} name="demSeaPricing">
            <InputNumber
              style={{ width: '100%' }}
              placeholder={translatePricingSea('DEM_form.placeholder')}
              disabled={checkRow && isCheckPermissionEdit}
              formatter={(value) => formatNumber(Number(value) || 0)}
              parser={(value: any) => value.replace(/\$\s?|(,*)/g, '')}
            />
          </Form.Item>
        </Col>
        <Col lg={8} span={24}>
          <Form.Item label={translatePricingSea('DET')} name="detSeaPricing">
            <InputNumber
              style={{ width: '100%' }}
              placeholder={translatePricingSea('DET_form.placeholder')}
              disabled={checkRow && isCheckPermissionEdit}
              formatter={(value) => formatNumber(Number(value) || 0)}
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
                message: translatePricingSea('commodity_form.placeholder'),
              },
            ]}
          >
            <Select
              showSearch
              placeholder={translatePricingSea('commodity_form.placeholder')}
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
          <Form.Item label={translatePricingSea('LCL')} name="lclSeaPricing">
            <InputNumber
              placeholder={translatePricingSea('LCL_form.placeholder')}
              formatter={(value) => formatNumber(Number(value) || 0)}
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
          >
            <InputNumber
              placeholder={translatePricingSea('LCLMin_form.placeholder')}
              formatter={(value) => formatNumber(Number(value) || 0)}
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
                message: translatePricingSea('currency_form.error_required'),
              },
            ]}
          >
            <Select
              placeholder={translatePricingSea('currency_form.placeholder')}
              disabled={checkRow && isCheckPermissionEdit}
              showSearch
              style={{ width: '100%' }}
              options={optionCurrency}
            />
          </Form.Item>
        </Col>
        <Col
          lg={8}
          span={24}
          style={{
            display: role === ROLE.MANAGER || role === ROLE.SALE ? '' : 'none',
          }}
        >
          <Form.Item
            label={translatePricingSea('vendor_form.title')}
            name="vendorID"
            rules={[
              {
                required: role === ROLE.MANAGER || role === ROLE.SALE,
                message: translatePricingSea('vendor_form.error_required'),
              },
            ]}
          >
            <Select
              showSearch
              placeholder={translatePricingSea('vendor_form.placeholder')}
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
            label={translatePricingSea('Fee_Group_form.title')}
            name="seaPricingFeeGroupDTOs"
            rules={[
              {
                required: true,
                message: translatePricingSea('Fee_Group_form.error_required'),
              },
            ]}
          >
            <Select
              showSearch
              mode="multiple"
              placeholder={translatePricingSea('Fee_Group_form.placeholder')}
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
          <Form.Item name="statusSeaPricing"></Form.Item>
        </Col>
        <Col span={0}>
          <Form.Item name="seaPricingDetailDTOs"></Form.Item>
        </Col>
      </Row>
    </Card>
  );
};

export default CardMain;
