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
  IFormValues,
  // SeaPricingFeeDTOs,
  UpdateStatus,
} from '../interface';
import {
  API_COMMODITY,
  API_FEE_GROUP,
  API_PARTNER,
  API_TRANSACTION_TYPE,
  API_TYPE_DECLARATION,
} from '@/fetcherAxios/endpoint';
import { getAllCommodity, getAllPartner, updateStatus } from '../fetcher';
import DraftTable from '../table/draft-table';
import { STATUS_ALL_LABELS, STATUS_MASTER_COLORS } from '@/constant/form';
import { errorToast, successToast } from '@/hook/toast';
import { API_MESSAGE } from '@/constant/message';
import { formatNumber } from '@/utils/format';
import dayjs from 'dayjs';
import { TYPE_FEE_GROUP } from '@/components/menu-item/master-data/fee-group/interface';
import { getAllFeeGroup } from '@/components/menu-item/master-data/fee-group/fetcher';
import {
  getListTypeDeclaration,
  getListTypeTransaction,
} from '@/components/menu-item/master-data/declaration-catalog/type-declaration/fetcher';

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
  const { translate: translatePricingCustom } = useI18n('pricingCustoms');
  const router = useRouter();
  const [checkStatus, setCheckStatus] = useState<boolean>(true);

  const propCopyAndCreate = router.query;

  const typeTransaction = useQuery(
    [API_TRANSACTION_TYPE.GET_ALL],
    getListTypeTransaction
  );
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
  const getDeclaration = useQuery({
    queryKey: [API_TYPE_DECLARATION.GET_ALL],
    queryFn: () => getListTypeDeclaration(),
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
    if (form.getFieldValue('statusCustomPricing')) {
      form.getFieldValue('statusCustomPricing') === STATUS_ALL_LABELS.ACTIVE
        ? setCheckStatus(true)
        : setCheckStatus(false);
    }
    if ((edit && checkRow) || manager) {
      handleCheckEdit(true);
    }

    if (propCopyAndCreate.checkCopyAndCreate) {
      form.setFieldsValue({
        typeDelaracrionID: propCopyAndCreate.typeDelaracrionID as string,
        partnerID: propCopyAndCreate.partnerID as string,
        commodityID: propCopyAndCreate.commodityID as string,
        currencyID: propCopyAndCreate.currencyID as string,
        transactionTypeID: propCopyAndCreate.transactionTypeID as string,
        note: propCopyAndCreate.note as string,
        customRedPrice: propCopyAndCreate.customRedPrice as string,
        customYellowPrice: propCopyAndCreate.customYellowPrice as string,
        customGreenPrice: propCopyAndCreate.customGreenPrice as string,
        effectDated: dayjs(Number(propCopyAndCreate.effectDated as string)),
        validityDate: dayjs(Number(propCopyAndCreate.validityDate as string)),
        public: propCopyAndCreate.public as unknown as boolean,
        statusCustomPricing: propCopyAndCreate.statusCustomPricing as string,
        customPricingFeeGroupDTOs:
          typeof propCopyAndCreate.customPricingFeeGroupDTOs === 'string'
            ? [propCopyAndCreate.customPricingFeeGroupDTOs as unknown as string]
            : (propCopyAndCreate.customPricingFeeGroupDTOs as unknown as string[]),
      });
    }
  }, [
    form,
    edit,
    checkRow,
    manager,
    propCopyAndCreate,
    form.getFieldValue('statusCustomPricing'),
  ]);

  const updateStatusMutation = useMutation({
    mutationFn: (body: UpdateStatus) => {
      return updateStatus(body);
    },
  });

  const suffixSelectorPrice = (
    <Form.Item
      name="currencyID"
      noStyle
      rules={[
        {
          required: true,
          message: translatePricingCustom('currency_form.placeholder'),
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
                translatePricingCustom('information_add_customs_pricing')}
              {manager && 'Approval needed requests'}
              {edit &&
                (checkRow ? (
                  <>
                    {isCheckPermissionEdit && 'View'}
                    {!isCheckPermissionEdit &&
                      translatePricingCustom(
                        'information_edit_customs_pricing'
                      )}
                  </>
                ) : (
                  translatePricingCustom('information_edit_customs_pricing')
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
        <Col lg={8} span={24}>
          <Form.Item
            label={translatePricingCustom('typeDelaracrionID_form.title')}
            name="typeDelaracrionID"
            rules={[
              {
                required: true,
                message: translatePricingCustom(
                  'typeDelaracrionID_form.error_required'
                ),
              },
            ]}
          >
            <Select
              showSearch
              placeholder={translatePricingCustom(
                'typeDelaracrionID_form.placeholder'
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
                getDeclaration.data?.data.map((item) => {
                  return {
                    value: item.typeDelaracrionID,
                    label: item.typeDelaracrionName,
                  };
                }) || []
              }
            />
          </Form.Item>
        </Col>
        <Col lg={8} span={24}>
          <Form.Item
            label={translatePricingCustom('vendor_form.title')}
            name="partnerID"
            rules={[
              {
                required: true,
                message: translatePricingCustom('vendor_form.error_required'),
              },
            ]}
          >
            <Select
              showSearch
              placeholder={translatePricingCustom('vendor_form.placeholder')}
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
            label={translatePricingCustom('transactionTypeID_form.title')}
            name="transactionTypeID"
            rules={[
              {
                required: true,
                message: translatePricingCustom(
                  'transactionTypeID_form.error_required'
                ),
              },
            ]}
          >
            <Select
              showSearch
              placeholder={translatePricingCustom(
                'transactionTypeID_form.placeholder'
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
                typeTransaction.data?.data.map((item) => {
                  return {
                    value: item.transactionTypeID,
                    label: item.transactionTypeName,
                  };
                }) || []
              }
            />
          </Form.Item>
        </Col>

        <Col lg={8} span={24}>
          <Form.Item
            label={translatePricingCustom('validity_form.title')}
            name="validityDate"
            rules={[
              {
                required: true,
                message: translatePricingCustom('validity_form.placeholder'),
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
            label={translatePricingCustom('effect_date_form.title')}
            name="effectDated"
            rules={[
              {
                required: true,
                message: translatePricingCustom('effect_date_form.placeholder'),
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
            label={translatePricingCustom('commodity_form.title')}
            name="commodityID"
            rules={[
              {
                required: true,
                message: translatePricingCustom('commodity_form.placeholder'),
              },
            ]}
          >
            <Select
              showSearch
              placeholder={translatePricingCustom('commodity_form.placeholder')}
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
            label={translatePricingCustom('customRedPrice_form.title')}
            name="customRedPrice"
            rules={[
              {
                required: true,
                message: translatePricingCustom(
                  'customRedPrice_form.placeholder'
                ),
              },
            ]}
          >
            <InputNumber
              addonAfter={suffixSelectorPrice}
              placeholder={translatePricingCustom(
                'customRedPrice_form.placeholder'
              )}
              formatter={(value) => formatNumber(Number(value) || 0)}
              parser={(value: any) => value.replace().replace(/,/g, '')}
              style={{ width: '100%' }}
              disabled={checkRow && isCheckPermissionEdit}
            />
          </Form.Item>
        </Col>
        <Col lg={8} span={24}>
          <Form.Item
            label={translatePricingCustom('customYellowPrice_form.title')}
            name="customYellowPrice"
            rules={[
              {
                required: true,
                message: translatePricingCustom(
                  'customYellowPrice_form.placeholder'
                ),
              },
            ]}
          >
            <InputNumber
              addonAfter={suffixSelectorPrice}
              placeholder={translatePricingCustom(
                'customYellowPrice_form.placeholder'
              )}
              formatter={(value) => formatNumber(Number(value) || 0)}
              parser={(value: any) => value.replace().replace(/,/g, '')}
              style={{ width: '100%' }}
              disabled={checkRow && isCheckPermissionEdit}
            />
          </Form.Item>
        </Col>
        <Col lg={8} span={24}>
          <Form.Item
            label={translatePricingCustom('customGreenPrice_form.title')}
            name="customGreenPrice"
            rules={[
              {
                required: true,
                message: translatePricingCustom(
                  'customGreenPrice_form.placeholder'
                ),
              },
            ]}
          >
            <InputNumber
              addonAfter={suffixSelectorPrice}
              placeholder={translatePricingCustom(
                'customGreenPrice_form.placeholder'
              )}
              formatter={(value) => formatNumber(Number(value) || 0)}
              parser={(value: any) => value.replace().replace(/,/g, '')}
              style={{ width: '100%' }}
              disabled={checkRow && isCheckPermissionEdit}
            />
          </Form.Item>
        </Col>

        <Col lg={8} span={24}>
          <Form.Item
            label={translatePricingCustom('fee_group_form.title')}
            name="customPricingFeeGroupDTOs"
            rules={[
              {
                required: true,
                message: translatePricingCustom(
                  'fee_group_form.error_required'
                ),
              },
            ]}
          >
            <Select
              showSearch
              mode="multiple"
              placeholder={translatePricingCustom('fee_group_form.placeholder')}
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
          <Form.Item
            label={translatePricingCustom('note_form.title')}
            name="note"
          >
            <Input.TextArea
              placeholder={translatePricingCustom('note_form.placeholder')}
              allowClear
              disabled={checkRow && isCheckPermissionEdit}
            />
          </Form.Item>
        </Col>
        <Col span={0}>
          <Form.Item name="statusCustomPricing"></Form.Item>
        </Col>
      </Row>
    </Card>
  );
};

export default CardMain;
