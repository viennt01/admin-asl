import { ROUTERS } from '@/constant/router';
import useI18n from '@/i18n/useI18N';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  Form,
  Input,
  Typography,
  Card,
  Row,
  Col,
  Switch,
  Select,
  DatePicker,
} from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  Fee,
  FeeDataOption,
  FeeTable,
  FormValues,
  UpdateStatusFeeGroup,
} from '../interface';
import {
  API_CURRENCY,
  API_FEE,
  API_FEE_GROUP,
  API_TYPE_FEE_GROUP,
  API_UNIT,
} from '@/fetcherAxios/endpoint';
import { BottomCreateEdit } from '@/components/commons/bottom-edit-creat-manager';
import { getFeeGroupDetail, updateStatus } from '../fetcher';
import DraftTable from '../table/draft-table';
import { STATUS_ALL_LABELS, STATUS_MASTER_COLORS } from '@/constant/form';
import { errorToast, successToast } from '@/hook/toast';
import { API_MESSAGE } from '@/constant/message';
import dayjs from 'dayjs';
import CollapseCard from '@/components/commons/collapse-card';
import FeeList from './fee-list';
import { TYPE_UNIT } from '@/components/menu-item/master-data/fee-catalog/fee/interface';
import {
  getListTypeCurrency,
  getListTypeUnit,
} from '@/components/menu-item/master-data/fee-catalog/fee/fetcher';
import {
  getListFeeByTypeFee,
  getListTypeFeeGroup,
} from '@/components/menu-item/pricing/fee-group/fetcher';
import {
  TYPE_FEE,
  TYPE_QUOTATION_PRICING,
} from '@/components/menu-item/pricing/fee-group/interface';

const initialValue = {
  description: '',
};
const dateFormat = 'YYYY-MM-DD';

interface PortFormProps {
  create?: boolean;
  manager?: boolean;
  edit?: boolean;
  handleSubmit?: (formValues: FormValues, id?: string, listFee?: Fee[]) => void;
  handleSaveDraft?: (
    formValues: FormValues,
    id?: string,
    listFee?: Fee[]
  ) => void;
  loadingSubmit?: boolean;
  checkRow: boolean;
  useDraft?: boolean;
}

const { Title } = Typography;

const FeeGroupForm = ({
  create,
  manager,
  edit,
  handleSubmit,
  handleSaveDraft,
  loadingSubmit,
  checkRow,
  useDraft,
}: PortFormProps) => {
  const { translate: translateFeeGroup } = useI18n('feeGroup');
  const router = useRouter();
  const [form] = Form.useForm<FormValues>();
  const { id } = router.query;
  const [idQuery, setIdQuery] = useState<string>();
  const [isCheckPermissionEdit, setCheckPermissionEdit] =
    useState<boolean>(false);
  const [checkStatus, setCheckStatus] = useState<boolean>(true);
  const propCopyAndCreate = router.query.props as string;
  const [optionFee, setOptionFee] = useState<FeeDataOption[]>([]);
  const [dataSource, setDataSource] = useState<FeeTable[]>([]);
  const [listFeeData, setListFeeData] = useState<Fee[]>([]);
  const [listIdTypeFeeNeedSearch, setListIdTypeFeeNeedSearch] = useState<
    TYPE_FEE[]
  >([]);
  const [dataUnit, setDataUnit] = useState<
    {
      label: string;
      value: string;
    }[]
  >([]);

  const typeFeeId = Form.useWatch('typeFeeGroupID', form);

  const typeCurrency = useQuery([API_CURRENCY.GET_ALL], getListTypeCurrency);

  useQuery({
    queryKey: [API_UNIT.GET_ALL],
    queryFn: () => getListTypeUnit({ typeUnit: TYPE_UNIT.TOTAL }),
    onSuccess: (data) => {
      if (!data.status) {
        router.back();
        errorToast(API_MESSAGE.ERROR);
      } else {
        const newData = data.data.map((unit) => ({
          label: unit.internationalCode,
          value: unit.unitID,
        }));
        setDataUnit(newData);
      }
    },
    onError: () => {
      router.back();
      errorToast(API_MESSAGE.ERROR);
    },
  });

  useEffect(() => {
    if (!id) return;
    setIdQuery(id as string);
  }, [router, form]);

  useEffect(() => {
    setListFeeData(
      dataSource.map((fee) => {
        return {
          feeID: fee.feeID,
          priceFeeGroup: fee.priceFeeGroup,
          vatFeeGroup: fee.vatFeeGroup,
          unitID: fee.unitID,
          currencyID: fee.currencyID,
        };
      })
    );
  }, [dataSource]);

  const handleIdQuery = (id: string) => {
    setIdQuery(id as string);
  };

  const onFinish = (formValues: FormValues) => {
    if (idQuery) {
      handleSubmit && handleSubmit(formValues, idQuery);
    } else {
      handleSubmit && handleSubmit(formValues, '', listFeeData);
    }
  };

  const onSaveDraft = () => {
    if (idQuery) {
      handleSaveDraft && handleSaveDraft(form.getFieldsValue(), idQuery);
    } else {
      handleSaveDraft &&
        handleSaveDraft(form.getFieldsValue(), '', listFeeData);
    }
  };

  // get Fee
  useQuery({
    queryKey: [API_FEE.GET_ALL_FEE_BY_TYPE_FEE, listIdTypeFeeNeedSearch],
    queryFn: () =>
      getListFeeByTypeFee({ typeFeeName: listIdTypeFeeNeedSearch }),
    enabled: listIdTypeFeeNeedSearch.length !== 0,
    onSuccess: (data) => {
      if (!data.status) {
        router.back();
        errorToast(API_MESSAGE.ERROR);
      } else {
        setOptionFee(
          data.data.map((fee) => {
            return {
              value: fee.feeID,
              label: fee.feeName,
              currencyID: fee.currencyID,
              currencyName: fee.currencyName,
              feeNo: fee.feeNo,
              feeName: fee.feeName,
              priceFeeGroup: fee.priceFeeGroup,
              unitID: fee.unitID,
              unitInternationalCode: fee.unitInternationalCode,
              vatFeeGroup: fee.vatFeeGroup,
            };
          })
        );
      }
    },
    onError: () => {
      router.back();
      errorToast(API_MESSAGE.ERROR);
    },
  });
  const typeFeeGroup = useQuery({
    queryKey: [API_TYPE_FEE_GROUP.GET_ALL],
    queryFn: () =>
      getListTypeFeeGroup({ type: TYPE_QUOTATION_PRICING.QUOTATION }),
  });

  const detailQuery = useQuery({
    queryKey: [API_FEE_GROUP.GET_DETAIL, idQuery],
    queryFn: () => getFeeGroupDetail(idQuery as string),
    enabled: idQuery !== undefined,
    onSuccess: (data) => {
      if (data.status) {
        form.setFieldsValue({
          typeFeeGroupID: data.data.typeFeeGroupID,
          feeGroupNo: data.data.feeGroupNo,
          feeGroupNameEN: data.data.feeGroupNameEN,
          feeGroupNameVN: data.data.feeGroupNameVN,
          statusFeeGroup: data.data.statusFeeGroup,
          dateStart: dayjs(Number(data.data.dateStart)),
          dateExpiration: dayjs(Number(data.data.dateExpiration)),
        });
      } else {
        router.push(ROUTERS.QUOTATION_FEE_GROUP);
      }
    },
  });

  const handleCheckEdit = (data: boolean) => {
    setCheckPermissionEdit(data);
  };

  const handleAR = (status: string) => {
    if (idQuery) {
      const _requestData: UpdateStatusFeeGroup = {
        id: [idQuery],
        status,
      };
      updateStatusMutation.mutate(_requestData, {
        onSuccess: (data) => {
          data.status
            ? (successToast(data.message),
              router.push(ROUTERS.QUOTATION_FEE_GROUP))
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

  const updateStatusMutation = useMutation({
    mutationFn: (body: UpdateStatusFeeGroup) => {
      return updateStatus(body);
    },
  });

  const handleCopyAndCreate = () => {
    const props = JSON.stringify({
      checkCopyAndCreate: true,
      typeFeeGroupID: form.getFieldValue('typeFeeGroupID'),
      feeGroupNo: form.getFieldValue('feeGroupNo'),
      feeGroupNameEN: form.getFieldValue('feeGroupNameEN'),
      feeGroupNameVN: form.getFieldValue('feeGroupNameVN'),
      listFee: dataSource,
    });
    router.push({
      pathname: ROUTERS.QUOTATION_FEE_GROUP_CREATE,
      query: { props: props },
    });
  };

  useEffect(() => {
    if (form.getFieldValue('statusFeeGroup')) {
      form.getFieldValue('statusFeeGroup') === STATUS_ALL_LABELS.ACTIVE
        ? setCheckStatus(true)
        : setCheckStatus(false);
    }
    if ((edit && checkRow) || manager) {
      setCheckPermissionEdit(true);
    }
    if (propCopyAndCreate) {
      const dataPropCopyAndCreate = JSON.parse(propCopyAndCreate);
      if (dataPropCopyAndCreate.checkCopyAndCreate) {
        form.setFieldsValue({
          typeFeeGroupID: dataPropCopyAndCreate.typeFeeGroupID as string,
          feeGroupNo: dataPropCopyAndCreate.feeGroupNo as string,
          feeGroupNameEN: dataPropCopyAndCreate.feeGroupNameEN as string,
          feeGroupNameVN: dataPropCopyAndCreate.feeGroupNameVN as string,
        });
        setDataSource(dataPropCopyAndCreate.listFee);
      }
    }
  }, [
    form,
    edit,
    checkRow,
    manager,
    propCopyAndCreate,
    form.getFieldValue('statusFeeGroup'),
  ]);

  useEffect(() => {
    if (typeFeeGroup.data?.data && typeFeeId) {
      const dataSelect = typeFeeGroup.data?.data
        .map((type) => ({
          label: type.typeFeeGroupName,
          value: type.typeFeeGroupID,
        }))
        .find((type) => type.value === typeFeeId)?.label;
      switch (dataSelect) {
        case 'Sea Quotation':
          setListIdTypeFeeNeedSearch([
            TYPE_FEE.SEA_FREIGHT,
            TYPE_FEE.SEA_LOCAL_CHARGES,
          ]);
          break;
        case 'Trucking Quotation':
          setListIdTypeFeeNeedSearch([TYPE_FEE.TRUCKING]);
          break;
        case 'Custom Quotation':
          setListIdTypeFeeNeedSearch([
            TYPE_FEE.SEA_FREIGHT,
            TYPE_FEE.SEA_LOCAL_CHARGES,
            TYPE_FEE.AIR_FREIGHT,
            TYPE_FEE.AIR_LOCAL_CHARGES,
            TYPE_FEE.CUSTOMS,
            TYPE_FEE.TRUCKING,
          ]);
          break;
        case 'Air Quotation':
          setListIdTypeFeeNeedSearch([
            TYPE_FEE.AIR_FREIGHT,
            TYPE_FEE.AIR_LOCAL_CHARGES,
          ]);
          break;
        default:
          break;
      }
    }
  }, [typeFeeId]);

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
                  {create && translateFeeGroup('information_add_fee_group')}
                  {manager && 'Approval needed requests'}
                  {edit &&
                    (checkRow ? (
                      <>
                        {isCheckPermissionEdit && 'View'}
                        {!isCheckPermissionEdit &&
                          translateFeeGroup('information_edit_fee_group')}
                      </>
                    ) : (
                      translateFeeGroup('information_edit_fee_group')
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
                    const _requestData: UpdateStatusFeeGroup = {
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
                label={translateFeeGroup('fee_group_code_form.title')}
                name="feeGroupNo"
                rules={[
                  {
                    required: true,
                    message: translateFeeGroup(
                      'fee_group_code_form.error_required'
                    ),
                  },
                ]}
              >
                <Input
                  placeholder={translateFeeGroup(
                    'fee_group_code_form.placeholder'
                  )}
                  size="large"
                  disabled={checkRow && isCheckPermissionEdit}
                />
              </Form.Item>
            </Col>
            <Col lg={12} span={24}>
              <Form.Item
                label={translateFeeGroup('type_fee_group_code_form.title')}
                name="typeFeeGroupID"
                rules={[
                  {
                    required: true,
                    message: translateFeeGroup(
                      'type_fee_group_code_form.error_required'
                    ),
                  },
                ]}
              >
                <Select
                  placeholder={translateFeeGroup(
                    'type_fee_group_code_form.placeholder'
                  )}
                  size="large"
                  options={
                    typeFeeGroup.data?.data.map((type) => ({
                      label: type.typeFeeGroupName,
                      value: type.typeFeeGroupID,
                    })) || []
                  }
                  disabled={checkRow && isCheckPermissionEdit}
                />
              </Form.Item>
            </Col>

            <Col lg={12} span={24}>
              <Form.Item
                label={translateFeeGroup('fee_group_name_form.titleEn')}
                name="feeGroupNameEN"
                rules={[
                  {
                    required: true,
                    message: translateFeeGroup(
                      'fee_group_name_form.error_required'
                    ),
                  },
                ]}
              >
                <Input
                  placeholder={translateFeeGroup(
                    'fee_group_name_form.placeholder'
                  )}
                  size="large"
                  disabled={checkRow && isCheckPermissionEdit}
                />
              </Form.Item>
            </Col>
            <Col lg={12} span={24}>
              <Form.Item
                label={translateFeeGroup('fee_group_name_form.titleVn')}
                name="feeGroupNameVN"
              >
                <Input
                  placeholder={translateFeeGroup(
                    'fee_group_name_form.placeholder'
                  )}
                  size="large"
                  disabled={checkRow && isCheckPermissionEdit}
                />
              </Form.Item>
            </Col>
            {!create && (
              <>
                <Col lg={12} span={24}>
                  <Form.Item
                    label={translateFeeGroup('date_start')}
                    name="dateStart"
                  >
                    <DatePicker
                      disabled
                      format={dateFormat}
                      style={{ width: '100%' }}
                    />
                  </Form.Item>
                </Col>
                <Col lg={12} span={24}>
                  <Form.Item
                    label={translateFeeGroup('date_expiration')}
                    name="dateExpiration"
                  >
                    <DatePicker
                      disabled
                      format={dateFormat}
                      style={{ width: '100%' }}
                    />
                  </Form.Item>
                </Col>
              </>
            )}

            <Col span={0}>
              <Form.Item name="statusFeeGroup"></Form.Item>
            </Col>
          </Row>
        </Card>

        <CollapseCard
          title="List Fee"
          style={{ marginBottom: '24px' }}
          defaultActive={true}
        >
          <FeeList
            optionFee={optionFee}
            optionUnit={dataUnit || []}
            optionCurrency={
              typeCurrency.data?.data.map((type) => ({
                label: type.abbreviations,
                value: type.currencyID,
              })) || []
            }
            isCheckPermissionEdit={isCheckPermissionEdit}
            idFeeGroup={id as string}
            dataSource={dataSource}
            setDataSource={setDataSource}
            edit
            create={create}
          />
        </CollapseCard>

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
          handleAR={handleAR}
          checkQuery={idQuery ? true : false}
          useDraft={useDraft}
          handleCopyAndCreate={handleCopyAndCreate}
        />
      </Form>
    </div>
  );
};

export default FeeGroupForm;
