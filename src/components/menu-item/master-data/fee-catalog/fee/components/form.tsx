import { ROUTERS } from '@/constant/router';
import useI18n from '@/i18n/useI18N';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Form, Input, Typography, Card, Row, Col, Switch, Select } from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  FeeDetailType,
  FormValues,
  TYPE_UNIT,
  TypeUnitData,
  UpdateStatusFee,
} from '../interface';
import {
  API_CURRENCY,
  API_FEE,
  API_TYPE_FEE,
  API_UNIT,
} from '@/fetcherAxios/endpoint';
import { BottomCreateEdit } from '@/components/commons/bottom-edit-creat-manager';
import {
  getFeeDetail,
  getListTypeCurrency,
  getListTypeFee,
  getListTypeUnit,
  updateStatus,
} from '../fetcher';
import DraftTable from '../table/draft-table';
import { errorToast, successToast } from '@/hook/toast';
import { API_MESSAGE } from '@/constant/message';
import { STATUS_ALL_LABELS, STATUS_MASTER_COLORS } from '@/constant/form';

const initialValue = {
  feeName: '',
};

interface FormProps {
  create?: boolean;
  manager?: boolean;
  edit?: boolean;
  handleSubmit?: (formValues: FormValues, id?: string) => void;
  handleSaveDraft?: (formValues: FormValues, id?: string) => void;
  loadingSubmit?: boolean;
  checkRow: boolean;
  useDraft?: boolean;
}

const { Title } = Typography;

const FeeForm = ({
  create,
  manager,
  edit,
  handleSubmit,
  handleSaveDraft,
  loadingSubmit,
  checkRow,
  useDraft,
}: FormProps) => {
  const { translate: translateFee } = useI18n('fee');
  const router = useRouter();
  const [form] = Form.useForm<FeeDetailType>();
  const { id } = router.query;
  const [idQuery, setIdQuery] = useState<string>();
  const [isCheckPermissionEdit, setCheckPermissionEdit] =
    useState<boolean>(false);
  const [checkStatus, setCheckStatus] = useState<boolean>(true);
  const [dataUnit, setDataUnit] = useState<TypeUnitData[]>([]);

  const propCopyAndCreate = router.query;

  useEffect(() => {
    if (!id) return;
    setIdQuery(id as string);
  }, [router, form]);

  const handleIdQuery = (id: string) => {
    setIdQuery(id as string);
  };

  const onFinish = (formValues: FormValues) => {
    if (idQuery) {
      handleSubmit && handleSubmit(formValues, idQuery);
    } else {
      handleSubmit && handleSubmit(formValues);
    }
  };

  const onSaveDraft = () => {
    if (idQuery) {
      handleSaveDraft && handleSaveDraft(form.getFieldsValue(), idQuery);
    } else {
      handleSaveDraft && handleSaveDraft(form.getFieldsValue());
    }
  };

  const typeFee = useQuery([API_TYPE_FEE.GET_ALL], getListTypeFee);
  const typeCurrency = useQuery([API_CURRENCY.GET_ALL], getListTypeCurrency);

  useQuery({
    queryKey: [API_UNIT.GET_ALL],
    queryFn: () => getListTypeUnit({ typeUnit: TYPE_UNIT.ALL }),
    onSuccess: (data) => {
      if (!data.status) {
        router.back();
        errorToast(API_MESSAGE.ERROR);
      } else {
        const newData = data.data.map((unit) => ({
          unitName: unit.internationalCode,
          profitRate: '',
        }));
        setDataUnit((prevData: any) => [...newData, ...prevData]);
      }
    },
    onError: () => {
      router.back();
      errorToast(API_MESSAGE.ERROR);
    },
  });

  const detailQuery = useQuery({
    queryKey: [API_FEE.GET_DETAIL, idQuery],
    queryFn: () => getFeeDetail(idQuery as string),
    enabled: idQuery !== undefined,
    onSuccess: (data) => {
      if (data.status) {
        form.setFieldsValue({
          feeID: data.data.feeID,
          feeNo: data.data.feeNo,
          feeNameEN: data.data.feeNameEN,
          feeNameVN: data.data.feeNameVN,
          vatFee: data.data.vatFee,
          statusFee: data.data.statusFee,
          typeFeeID: data.data.typeFeeID,
          typeFeeName: data.data.typeFeeName,
          currencyID: data.data.currencyID,
          currencyName: data.data.currencyName,
          unitID: data.data.unitID,
          unitInternationalCode: data.data.unitInternationalCode,
        });
      } else {
        router.push(ROUTERS.FEE);
      }
    },
  });

  const handleCheckEdit = (data: boolean) => {
    setCheckPermissionEdit(data);
  };

  const updateStatusMutation = useMutation({
    mutationFn: (body: UpdateStatusFee) => {
      return updateStatus(body);
    },
  });

  const handleAJ = (status: string) => {
    if (idQuery) {
      const _requestData: UpdateStatusFee = {
        id: [idQuery],
        status,
      };
      updateStatusMutation.mutate(_requestData, {
        onSuccess: (data) => {
          data.status
            ? (successToast(data.message), router.push(ROUTERS.FEE))
            : errorToast(data.message);
        },
        onError() {
          errorToast(API_MESSAGE.ERROR);
        },
      });
    } else {
      errorToast(API_MESSAGE.ERROR);
    }
  };

  const handleCopyAndCreate = () => {
    const props = {
      checkCopyAndCreate: true,
      feeNo: form.getFieldValue('feeNo'),
      feeName: form.getFieldValue('feeName'),
      vatFee: form.getFieldValue('vatFee'),
      typeFeeID: form.getFieldValue('typeFeeID'),
      typeFeeName: form.getFieldValue('typeFeeName'),
      currencyID: form.getFieldValue('currencyID'),
      currencyName: form.getFieldValue('currencyName'),
      unitID: form.getFieldValue('unitID'),
      unitInternationalCode: form.getFieldValue('unitInternationalCode'),
    };
    router.push({
      pathname: ROUTERS.FEE_CREATE,
      query: props,
    });
  };

  useEffect(() => {
    if (form.getFieldValue('statusFee')) {
      form.getFieldValue('statusFee') === STATUS_ALL_LABELS.ACTIVE
        ? setCheckStatus(true)
        : setCheckStatus(false);
    }
    if ((edit && checkRow) || manager) {
      setCheckPermissionEdit(true);
    }
    if (propCopyAndCreate.checkCopyAndCreate) {
      form.setFieldsValue({
        feeNo: propCopyAndCreate.feeNo as string,
        feeNameEN: propCopyAndCreate.feeNameEN as string,
        feeNameVN: propCopyAndCreate.feeNameVN as string,
        vatFee: propCopyAndCreate.vatFee as string,
        typeFeeID: propCopyAndCreate.typeFeeID as string,
        typeFeeName: propCopyAndCreate.typeFeeName as string,
        currencyID: propCopyAndCreate.currencyID as string,
        currencyName: propCopyAndCreate.currencyName as string,
        unitID: propCopyAndCreate.unitID as string,
        unitInternationalCode:
          propCopyAndCreate.unitInternationalCode as string,
      });
    }
  }, [
    form,
    edit,
    checkRow,
    manager,
    propCopyAndCreate,
    form.getFieldValue('statusFee'),
  ]);

  return (
    <div style={{ padding: '24px 0' }}>
      <Form
        form={form}
        initialValues={initialValue}
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
      >
        <Card
          style={{ marginBottom: 24 }}
          title={
            <Row justify={'center'}>
              <Col>
                <Title level={3} style={{ margin: '-4px 0' }}>
                  {create && translateFee('information_add_fee')}
                  {manager && 'Approval needed requests'}
                  {edit &&
                    (checkRow ? (
                      <>
                        {isCheckPermissionEdit && 'View'}
                        {!isCheckPermissionEdit &&
                          translateFee('information_edit_fee')}
                      </>
                    ) : (
                      translateFee('information_edit_fee')
                    ))}
                </Title>
              </Col>
            </Row>
          }
          extra={
            <>
              {create && useDraft && (
                <DraftTable handleIdQuery={handleIdQuery} />
              )}
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
                    const _requestData: UpdateStatusFee = {
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
                label={translateFee('fee_name_form.titleEN')}
                name="feeNameEN"
                rules={[
                  {
                    required: true,
                    message: translateFee('fee_name_form.error_required'),
                  },
                ]}
              >
                <Input
                  placeholder={translateFee('fee_name_form.placeholder')}
                  size="large"
                  disabled={checkRow && isCheckPermissionEdit}
                />
              </Form.Item>
            </Col>
            <Col lg={12} span={24}>
              <Form.Item
                label={translateFee('fee_name_form.titleVN')}
                name="feeNameVN"
              >
                <Input
                  placeholder={translateFee('fee_name_form.placeholder')}
                  size="large"
                  disabled={checkRow && isCheckPermissionEdit}
                />
              </Form.Item>
            </Col>

            <Col lg={12} span={24}>
              <Form.Item
                label={translateFee('fee_code_form.title')}
                name="feeNo"
                rules={[
                  {
                    required: true,
                    message: translateFee('fee_code_form.error_required'),
                  },
                ]}
              >
                <Input
                  size="large"
                  placeholder={translateFee('fee_code_form.placeholder')}
                  disabled={checkRow && isCheckPermissionEdit}
                />
              </Form.Item>
            </Col>
            <Col lg={12} span={24}>
              <Form.Item
                label={translateFee('vat_fee_form.title')}
                name="vatFee"
                rules={[
                  {
                    required: true,
                    message: translateFee('vat_fee_form.error_required'),
                  },
                ]}
              >
                <Input
                  type="number"
                  min={0}
                  suffix="%"
                  size="large"
                  placeholder={translateFee('vat_fee_form.placeholder')}
                  allowClear
                  disabled={checkRow && isCheckPermissionEdit}
                />
              </Form.Item>
            </Col>

            <Col lg={12} span={24}>
              <Form.Item
                label={translateFee('type_fee_form.title')}
                name="typeFeeID"
                rules={[
                  {
                    required: true,
                    message: translateFee('type_fee_form.error_required'),
                  },
                ]}
              >
                <Select
                  placeholder={translateFee('type_fee_form.placeholder')}
                  size="large"
                  options={
                    typeFee.data?.data.map((type) => ({
                      label: type.typeFeeName,
                      value: type.typeFeeID,
                    })) || []
                  }
                  disabled={checkRow && isCheckPermissionEdit}
                />
              </Form.Item>
            </Col>
            <Col lg={12} span={24}>
              <Form.Item
                label={translateFee('currency_form.title')}
                name="currencyID"
                rules={[
                  {
                    required: true,
                    message: translateFee('currency_form.error_required'),
                  },
                ]}
              >
                <Select
                  placeholder={translateFee('currency_form.placeholder')}
                  size="large"
                  options={
                    typeCurrency.data?.data.map((type) => ({
                      label: type.abbreviations,
                      value: type.currencyID,
                    })) || []
                  }
                  disabled={checkRow && isCheckPermissionEdit}
                />
              </Form.Item>
            </Col>

            <Col lg={12} span={24}>
              <Form.Item
                label={translateFee('unit_form.title')}
                name="unitID"
                rules={[
                  {
                    required: true,
                    message: translateFee('unit_form.error_required'),
                  },
                ]}
              >
                <Select
                  placeholder={translateFee('unit_form.placeholder')}
                  size="large"
                  options={dataUnit || []}
                  disabled={checkRow && isCheckPermissionEdit}
                />
              </Form.Item>
            </Col>

            <Col span={0}>
              <Form.Item name="statusFee"></Form.Item>
            </Col>
          </Row>
        </Card>

        <BottomCreateEdit
          create={create}
          checkRow={checkRow}
          edit={edit}
          loading={loadingSubmit || false}
          isCheckPermissionEdit={isCheckPermissionEdit}
          insertedByUser={detailQuery.data?.data?.insertedByUser || ''}
          dateInserted={detailQuery.data?.data?.dateInserted || ''}
          updatedByUser={detailQuery.data?.data?.updatedByUser || ''}
          dateUpdated={detailQuery.data?.data?.dateUpdated || ''}
          handleCheckEdit={handleCheckEdit}
          handleSaveDraft={onSaveDraft}
          manager={manager}
          handleAR={handleAJ}
          checkQuery={idQuery ? true : false}
          useDraft={useDraft}
          handleCopyAndCreate={handleCopyAndCreate}
        />
      </Form>
    </div>
  );
};

export default FeeForm;
