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
  ISeaQuotationFeeFormValue,
  UpdateStatus,
} from '../interface';
import {
  API_COMMODITY,
  API_PARTNER,
  API_TRANSACTION_TYPE,
  API_TYPE_DECLARATION,
} from '@/fetcherAxios/endpoint';
import {
  getAllCommodity,
  getAllPartner,
  getAllPartnerGroup,
  updateStatus,
} from '../fetcher';
import DraftTable from '../table/draft-table';
import { STATUS_ALL_LABELS, STATUS_MASTER_COLORS } from '@/constant/form';
import { errorToast, successToast } from '@/hook/toast';
import { API_MESSAGE } from '@/constant/message';
import { formatNumber } from '@/utils/format';
import dayjs from 'dayjs';
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
  const { translate: translateQuotationCustom } = useI18n('customsQuotation');
  const router = useRouter();
  const [checkStatus, setCheckStatus] = useState<boolean>(true);
  const checkObject = Form.useWatch('checkbox-group', form);

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
    if (form.getFieldValue('statusCustomQuotation')) {
      form.getFieldValue('statusCustomQuotation') === STATUS_ALL_LABELS.ACTIVE
        ? setCheckStatus(true)
        : setCheckStatus(false);
    }
    if ((edit && checkRow) || manager) {
      handleCheckEdit(true);
    }

    if (propCopyAndCreate.checkCopyAndCreate) {
      form.setFieldsValue({
        typeDelaracrionID: propCopyAndCreate.typeDelaracrionID as string,
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
        statusCustomQuotation:
          propCopyAndCreate.statusCustomQuotation as string,
        customQuotationFeeGroupDTOs: JSON.parse(
          propCopyAndCreate.customQuotationFeeGroupDTOs as string
        ) as unknown as ISeaQuotationFeeFormValue[],
      });
    }
  }, [
    form,
    edit,
    checkRow,
    manager,
    propCopyAndCreate,
    form.getFieldValue('statusCustomQuotation'),
  ]);

  const updateStatusMutation = useMutation({
    mutationFn: (body: UpdateStatus) => {
      return updateStatus(body);
    },
  });
  useEffect(() => {
    if (!checkObject?.includes('Group')) {
      form.setFieldValue('Group', []);
    }
    if (!checkObject?.includes('Customer')) {
      form.setFieldValue('Customer', []);
    }
  }, [checkObject]);

  const suffixSelectorPrice = (
    <Form.Item
      name="currencyID"
      noStyle
      rules={[
        {
          required: true,
          message: translateQuotationCustom('currency_form.placeholder'),
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
                translateQuotationCustom('information_add_customs_quotation')}
              {manager && 'Approval needed requests'}
              {edit &&
                (checkRow ? (
                  <>
                    {isCheckPermissionEdit && 'View'}
                    {!isCheckPermissionEdit &&
                      translateQuotationCustom(
                        'information_edit_customs_quotation'
                      )}
                  </>
                ) : (
                  translateQuotationCustom('information_edit_customs_quotation')
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
            label={translateQuotationCustom('transactionTypeID_form.title')}
            name="transactionTypeID"
            rules={[
              {
                required: true,
                message: translateQuotationCustom(
                  'transactionTypeID_form.error_required'
                ),
              },
            ]}
          >
            <Select
              showSearch
              placeholder={translateQuotationCustom(
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
        <Col lg={12} span={24}>
          <Form.Item
            label={translateQuotationCustom('typeDelaracrionID_form.title')}
            name="typeDelaracrionID"
            rules={[
              {
                required: true,
                message: translateQuotationCustom(
                  'typeDelaracrionID_form.error_required'
                ),
              },
            ]}
          >
            <Select
              showSearch
              placeholder={translateQuotationCustom(
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
            label={translateQuotationCustom('validity_form.title')}
            name="validityDate"
            rules={[
              {
                required: true,
                message: translateQuotationCustom('validity_form.placeholder'),
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
            label={translateQuotationCustom('effect_date_form.title')}
            name="effectDated"
            rules={[
              {
                required: true,
                message: translateQuotationCustom(
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
            label={translateQuotationCustom('commodity_form.title')}
            name="commodityID"
            rules={[
              {
                required: true,
                message: translateQuotationCustom('commodity_form.placeholder'),
              },
            ]}
          >
            <Select
              showSearch
              placeholder={translateQuotationCustom(
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
            label={translateQuotationCustom('customRedPrice_form.title')}
            name="customRedPrice"
            rules={[
              {
                required: true,
                message: translateQuotationCustom(
                  'customRedPrice_form.placeholder'
                ),
              },
            ]}
          >
            <InputNumber
              addonAfter={suffixSelectorPrice}
              placeholder={translateQuotationCustom(
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
            label={translateQuotationCustom('customYellowPrice_form.title')}
            name="customYellowPrice"
            rules={[
              {
                required: true,
                message: translateQuotationCustom(
                  'customYellowPrice_form.placeholder'
                ),
              },
            ]}
          >
            <InputNumber
              addonAfter={suffixSelectorPrice}
              placeholder={translateQuotationCustom(
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
            label={translateQuotationCustom('customGreenPrice_form.title')}
            name="customGreenPrice"
            rules={[
              {
                required: true,
                message: translateQuotationCustom(
                  'customGreenPrice_form.placeholder'
                ),
              },
            ]}
          >
            <InputNumber
              addonAfter={suffixSelectorPrice}
              placeholder={translateQuotationCustom(
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
            name="Group"
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
            name="Customer"
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
          <Form.Item
            label={translateQuotationCustom('note_form.title')}
            name="note"
          >
            <Input.TextArea
              placeholder={translateQuotationCustom('note_form.placeholder')}
              allowClear
              disabled={checkRow && isCheckPermissionEdit}
            />
          </Form.Item>
        </Col>
        <Col span={0}>
          <Form.Item name="statusCustomQuotation"></Form.Item>
        </Col>
        <Col span={0}>
          <Form.Item name="customQuotationFeeGroupDTOs"></Form.Item>
        </Col>
      </Row>
    </Card>
  );
};

export default CardMain;
