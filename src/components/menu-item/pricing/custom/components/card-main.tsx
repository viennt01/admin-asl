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
} from 'antd';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import {
  ICustomPricingAirDetailDTO,
  ICustomPricingFCLDetailDTOs,
  ICustomPricingLCLDetailDTO,
  IFormValues,
  UpdateStatus,
} from '../interface';
import {
  API_COMMODITY,
  API_FEE_GROUP,
  API_PARTNER,
  API_TRANSACTION_TYPE,
  API_TYPE_DECLARATION,
} from '@/fetcherAxios/endpoint';
import { getAllCommodity, updateStatus } from '../fetcher';
import DraftTable from '../table/draft-table';
import { STATUS_ALL_LABELS, STATUS_MASTER_COLORS } from '@/constant/form';
import { errorToast, successToast } from '@/hook/toast';
import { API_MESSAGE } from '@/constant/message';
import dayjs from 'dayjs';
import { TYPE_FEE_GROUP } from '@/components/menu-item/quotation/fee-group/interface';
import { getAllFeeGroup } from '@/components/menu-item/quotation/fee-group/fetcher';
import {
  getListTypeDeclaration,
  getListTypeTransaction,
} from '@/components/menu-item/master-data/declaration-catalog/type-declaration/fetcher';
import { ROLE } from '@/constant/permission';
import { AppContext } from '@/app-context';
import { getAllVendor } from '../../sea/fetcher';

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
  const { translate: translatePricingCustom } = useI18n('pricingCustoms');
  const router = useRouter();
  const [checkStatus, setCheckStatus] = useState<boolean>(true);
  const { role } = useContext(AppContext);

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
    queryFn: () => getAllFeeGroup({ type: TYPE_FEE_GROUP.CUSTOM_PRICING }),
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
        vendorID: propCopyAndCreate.vendorID as string,
        commodityID: propCopyAndCreate.commodityID as string,
        currencyID: propCopyAndCreate.currencyID as string,
        transactionTypeID: propCopyAndCreate.transactionTypeID as string,
        note: propCopyAndCreate.note as string,
        effectDated: dayjs(Number(propCopyAndCreate.effectDated as string)),
        validityDate: dayjs(Number(propCopyAndCreate.validityDate as string)),
        public: propCopyAndCreate.public as unknown as boolean,
        statusCustomPricing: propCopyAndCreate.statusCustomPricing as string,
        customPricingLCLDetailDTO:
          propCopyAndCreate.customPricingLCLDetailDTO as unknown as ICustomPricingLCLDetailDTO,
        customPricingFCLDetailDTOs:
          propCopyAndCreate.customPricingFCLDetailDTOs as unknown as ICustomPricingFCLDetailDTOs[],
        customPricingAirDetailDTO:
          propCopyAndCreate.customPricingAirDetailDTO as unknown as ICustomPricingAirDetailDTO,
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
            name="vendorID"
            rules={[
              {
                required: role === ROLE.MANAGER || role === ROLE.SALE,
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
                    label: item.companyName,
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

        <Col span={8}>
          <Form.Item
            label="Currency"
            name="currencyID"
            rules={[
              {
                required: true,
                message: translatePricingCustom('currency_form.error_required'),
              },
            ]}
          >
            <Select
              placeholder={translatePricingCustom('currency_form.placeholder')}
              disabled={checkRow && isCheckPermissionEdit}
              showSearch
              style={{ width: '100%' }}
              options={optionCurrency}
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
        <Col span={0}>
          <Form.Item name="customPricingLCLDetailDTO"></Form.Item>
        </Col>
        <Col span={0}>
          <Form.Item name="customPricingAirDetailDTO"></Form.Item>
        </Col>
        <Col span={0}>
          <Form.Item name="customPricingFCLDetailDTOs"></Form.Item>
        </Col>
      </Row>
    </Card>
  );
};

export default CardMain;
