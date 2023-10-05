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
import { useEffect, useState } from 'react';
import {
  FormValues,
  AirPricingDetailDTOs,
  AirPricingFeeDTOs,
  UpdateStatus,
} from '../interface';
import { API_COMMODITY, API_LOCATION } from '@/fetcherAxios/endpoint';
import { getAllCommodity, getAllLocation, updateStatus } from '../fetcher';
import DraftTable from '../table/draft-table';
import { STATUS_ALL_LABELS, STATUS_MASTER_COLORS } from '@/constant/form';
import { UpdateStatusLocationType } from '@/components/type-of-location/interface';
import { errorToast, successToast } from '@/hook/toast';
import { API_MESSAGE } from '@/constant/message';

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

  const propCopyAndCreate = router.query;
  const dateFormat = 'YYYY/MM/DD';

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
        dateEffect: propCopyAndCreate.dateEffect as string,
        validityDate: propCopyAndCreate.validityDate as string,
        freqDate: propCopyAndCreate.freqDate as string,
        demAirPricing: propCopyAndCreate.demAirPricing as string,
        detAirPricing: propCopyAndCreate.detAirPricing as string,
        stoAirPricing: propCopyAndCreate.stoAirPricing as string,
        lclMinAirPricing: propCopyAndCreate.lclMinAirPricing as string,
        lclAirPricing: propCopyAndCreate.lclAirPricing as string,
        currencyID: propCopyAndCreate.currencyID as string,
        public: propCopyAndCreate.public as unknown as boolean,
        statusAirPricing: propCopyAndCreate.statusAirPricing as string,
        airPricingDetailDTOs:
          propCopyAndCreate.airPricingDetailDTOs as unknown as AirPricingDetailDTOs[],
        airPricingFeeDTOs:
          propCopyAndCreate.airPricingFeeDTOs as unknown as AirPricingFeeDTOs[],
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

  const suffixSelectorCurrencyLCLMin = (
    <Form.Item
      name="currencyID"
      noStyle
      rules={[
        {
          required: true,
          message: 'Please chooses currency',
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
          message: 'Please chooses currency',
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
              {create && 'Create a new air pricing'}
              {manager && 'Approval needed requests'}
              {edit &&
                (checkRow ? (
                  <>
                    {isCheckPermissionEdit && 'View'}
                    {!isCheckPermissionEdit && 'Edit a new air pricing'}
                  </>
                ) : (
                  'Edit a new air pricing'
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
            label={translatePricingAir('POL')}
            tooltip={translatePricingAir('POL')}
            name="polid"
            rules={[
              {
                required: true,
                message: translatePricingAir('POL_placeholder'),
              },
            ]}
          >
            <Select
              showSearch
              placeholder={translatePricingAir('POL_placeholder')}
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
            label={translatePricingAir('POD')}
            tooltip={translatePricingAir('POD')}
            name="podid"
            rules={[
              {
                required: true,
                message: translatePricingAir('POD_placeholder'),
              },
            ]}
          >
            <Select
              showSearch
              placeholder={translatePricingAir('POD_placeholder')}
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
            label={translatePricingAir('validity')}
            name="validityDate"
            rules={[
              {
                required: true,
                message: translatePricingAir('validity_placeholder'),
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
            label={translatePricingAir('effect_date')}
            name="dateEffect"
            rules={[
              {
                required: true,
                message: translatePricingAir('effect_date_placeholder'),
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
            label={translatePricingAir('freq')}
            name="freqDate"
            rules={[
              {
                required: true,
                message: translatePricingAir('freq_placeholder'),
              },
            ]}
          >
            <InputNumber
              disabled={checkRow && isCheckPermissionEdit}
              placeholder={translatePricingAir('freq_placeholder')}
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
            label={translatePricingAir('STO')}
            name="stoAirPricing"
            rules={[
              {
                required: true,
                message: translatePricingAir('STO_placeholder'),
              },
            ]}
          >
            <InputNumber
              disabled={checkRow && isCheckPermissionEdit}
              placeholder={translatePricingAir('STO_placeholder')}
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
            label={translatePricingAir('DEM')}
            name="demAirPricing"
            rules={[
              {
                required: true,
                message: translatePricingAir('DEM_placeholder'),
              },
            ]}
          >
            <InputNumber
              style={{ width: '100%' }}
              placeholder={translatePricingAir('DEM_placeholder')}
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
            label={translatePricingAir('DET')}
            name="detAirPricing"
            rules={[
              {
                required: true,
                message: translatePricingAir('DET_placeholder'),
              },
            ]}
          >
            <InputNumber
              style={{ width: '100%' }}
              placeholder={translatePricingAir('DET_placeholder')}
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
            label={translatePricingAir('commodity')}
            name="commodityID"
            rules={[
              {
                required: true,
                message: translatePricingAir('commodity_placeholder'),
              },
            ]}
          >
            <Select
              showSearch
              placeholder={translatePricingAir('commodity_placeholder')}
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
            label={translatePricingAir('LCL')}
            name="lclAirPricing"
            rules={[
              {
                required: true,
                message: translatePricingAir('LCL_placeholder'),
              },
            ]}
          >
            <InputNumber
              addonAfter={suffixSelectorCurrencyLCL}
              placeholder={translatePricingAir('LCL_placeholder')}
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
            label={translatePricingAir('LCLMin')}
            name="lclMinAirPricing"
            rules={[
              {
                required: true,
                message: translatePricingAir('LCLMin_placeholder'),
              },
            ]}
          >
            <InputNumber
              addonAfter={suffixSelectorCurrencyLCLMin}
              placeholder={translatePricingAir('LCLMin_placeholder')}
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
          <Form.Item label={translatePricingAir('vendor')} name="vendor">
            <Input
              placeholder={translatePricingAir('vendor_placeholder')}
              disabled
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
        <Col span={0}>
          <Form.Item name="airPricingFeeDTOs"></Form.Item>
        </Col>
      </Row>
    </Card>
  );
};

export default CardMain;
