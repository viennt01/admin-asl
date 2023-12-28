import { ROUTERS } from '@/constant/router';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Form } from 'antd';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import {
  AirPricingFeeFormValue,
  FormValues,
  TYPE_LOAD_CAPACITY,
  UpdateStatus,
} from '../interface';
import {
  API_CURRENCY,
  API_FEE_GROUP,
  API_AIR_PRICING,
  API_LOAD_CAPACITY,
} from '@/fetcherAxios/endpoint';
import { BottomCreateEdit } from '@/components/commons/bottom-edit-creat-manager';
import {
  getAllTypeLoadCapacity,
  getAllCurrency,
  getAirPricingDetail,
  updateStatus,
} from '../fetcher';
import { errorToast, successToast } from '@/hook/toast';
import { API_MESSAGE } from '@/constant/message';
import dayjs from 'dayjs';
import CardMain from './card-main';
import CollapseCard from '@/components/commons/collapse-card';
import AirPricingDetailDTO from './air-pricing-detail-dto';
import { FeeTable } from '@/components/menu-item/quotation/fee-group/interface';
import ListFee from './list-fee';
import { getFeeWithFeeGroup } from '@/components/menu-item/quotation/fee-group/fetcher';
import { ROLE } from '@/constant/permission';
import { AppContext } from '@/app-context';

interface PortFormProps {
  create?: boolean;
  manager?: boolean;
  edit?: boolean;
  handleSubmit?: (
    formValues: FormValues,
    id?: string,
    airPricingFeeDTOs?: AirPricingFeeFormValue[]
  ) => void;
  handleSaveDraft?: (
    formValues: FormValues,
    id?: string,
    airPricingFeeDTOs?: AirPricingFeeFormValue[]
  ) => void;
  loadingSubmit?: boolean;
  checkRow: boolean;
  useDraft?: boolean;
}

const initialValues = {
  gw: false,
};

const AirPricing = ({
  create,
  manager,
  edit,
  handleSubmit,
  handleSaveDraft,
  loadingSubmit,
  checkRow,
  useDraft,
}: PortFormProps) => {
  const router = useRouter();
  const [form] = Form.useForm<FormValues>();
  const { id } = router.query;
  const [idQuery, setIdQuery] = useState<string>();
  const { role } = useContext(AppContext);
  const [isCheckPermissionEdit, setCheckPermissionEdit] =
    useState<boolean>(false);
  const [optionCurrency, setOptionCurrency] = useState<
    { value: string; label: string }[]
  >([]);
  const [optionTypeLoadCapacity, setOptionTypeLoadCapacity] = useState<
    { value: string; label: string }[]
  >([]);
  const [airPricingFeeDTOs, setAirPricingFeeDTOs] = useState<
    AirPricingFeeFormValue[]
  >([]);
  const [dataFeeTable, setDataFeeTable] = useState<FeeTable[]>([]);
  const listIdFeeGroup = Form.useWatch('airPricingFeeDTOs', form);

  useEffect(() => {
    if (!id) return;
    setIdQuery(id as string);
  }, [router, form, id]);
  //get currencies
  useQuery({
    queryKey: [API_CURRENCY.GET_ALL],
    queryFn: () => getAllCurrency(),
    onSuccess: (data) => {
      if (!data.status) {
        router.back();
        errorToast(API_MESSAGE.ERROR);
      } else {
        setOptionCurrency(
          data.data.map((currency) => {
            return {
              value: currency.currencyID,
              label: currency.abbreviations,
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
  // get load capacity type
  useQuery({
    queryKey: [API_LOAD_CAPACITY.GET_ALL],
    queryFn: () => getAllTypeLoadCapacity({ type: TYPE_LOAD_CAPACITY.AIR }),
    onSuccess: (data) => {
      if (!data.status) {
        router.back();
        errorToast(API_MESSAGE.ERROR);
      } else {
        setOptionTypeLoadCapacity(
          data.data.map((currency) => {
            return {
              value: currency.loadCapacityID,
              label: currency.name,
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

  useQuery({
    queryKey: [API_FEE_GROUP.GET_ALL_FEE_WITH_FEE_GROUP, listIdFeeGroup],
    queryFn: () => getFeeWithFeeGroup({ id: listIdFeeGroup }),
    enabled: listIdFeeGroup !== undefined,
    onSuccess(data) {
      setDataFeeTable([]);
      if (data.status) {
        if (data.data) {
          setDataFeeTable(data.data);
        }
      }
    },
  });

  const onFinish = (formValues: FormValues) => {
    if (idQuery) {
      handleSubmit && handleSubmit(formValues, idQuery, airPricingFeeDTOs);
    } else {
      handleSubmit && handleSubmit(formValues, '', airPricingFeeDTOs);
    }
  };

  const onSaveDraft = () => {
    if (idQuery) {
      handleSaveDraft &&
        handleSaveDraft(form.getFieldsValue(), idQuery, airPricingFeeDTOs);
    } else {
      handleSaveDraft &&
        handleSaveDraft(form.getFieldsValue(), '', airPricingFeeDTOs);
    }
  };

  const handleIdQuery = (id: string) => {
    setIdQuery(id as string);
  };

  const detailQuery = useQuery({
    queryKey: [API_AIR_PRICING.GET_DETAIL, idQuery],
    queryFn: () => getAirPricingDetail(idQuery as string),
    enabled: idQuery !== undefined,
    onSuccess: (data) => {
      if (data.status) {
        form.setFieldsValue({
          aodid: data.data.aodid,
          aolid: data.data.aolid,
          commodityID: data.data.commodityID,
          note: data.data.note,
          validityDate: dayjs(Number(data.data.validityDate)),
          effectDated: dayjs(Number(data.data.effectDated)),
          freqDate: data.data.freqDate,
          currencyID: data.data.currencyID,
          public: data.data.public,
          vendorID: data.data.vendorID,
          hscAirPricing: data.data.hscAirPricing,
          sscAirPricing: data.data.sscAirPricing,
          gw: data.data.gw,
          transitTimeAirPricing: data.data.transitTimeAirPricing,
          statusAirPricing: data.data.statusAirPricing,
          airPricingDetailDTOs: data.data.airPricingDetailDTOs,
          airPricingFeeDTOs: data.data.airPricingFeeDTOs.map(
            (fee) => fee.feeGroupID
          ),
        });
        setAirPricingFeeDTOs(data.data.airPricingFeeDTOs);
      } else {
        router.push(ROUTERS.AIR_PRICING);
      }
    },
  });

  const handleCheckEdit = (data: boolean) => {
    setCheckPermissionEdit(data);
  };

  const handleAR = (status: string) => {
    if (idQuery) {
      const _requestData: UpdateStatus = {
        id: [idQuery],
        status,
      };
      updateStatusMutation.mutate(_requestData, {
        onSuccess: (data) => {
          data.status
            ? (successToast(data.message), router.push(ROUTERS.AIR_PRICING))
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
    mutationFn: (body: UpdateStatus) => {
      return updateStatus(body);
    },
  });

  const handleCopyAndCreate = () => {
    const props = {
      checkCopyAndCreate: true,
      aodid: form.getFieldValue('aodid'),
      aolid: form.getFieldValue('aolid'),
      commodityID: form.getFieldValue('commodityID'),
      note: form.getFieldValue('note'),
      validityDate: form.getFieldValue('validityDate'),
      effectDated: form.getFieldValue('effectDated'),
      freqDate: form.getFieldValue('freqDate'),
      currencyID: form.getFieldValue('currencyID'),
      public: form.getFieldValue('public'),
      vendorID: form.getFieldValue('vendorID'),
      hscAirPricing: form.getFieldValue('hscAirPricing'),
      sscAirPricing: form.getFieldValue('sscAirPricing'),
      gw: form.getFieldValue('gw'),
      transitTimeAirPricing: form.getFieldValue('transitTimeAirPricing'),
      statusAirPricing: form.getFieldValue('statusAirPricing'),
      airPricingDetailDTOs: form.getFieldValue('airPricingDetailDTOs'),
      airPricingFeeDTOs: form.getFieldValue('airPricingFeeDTOs'),
    };
    router.push({
      pathname: ROUTERS.AIR_PRICING_CREATE,
      query: props,
    });
  };

  return (
    <div style={{ padding: '24px 0' }}>
      <Form
        form={form}
        onFinish={onFinish}
        initialValues={initialValues}
        autoComplete="off"
        layout="vertical"
      >
        <CardMain
          create={create}
          manager={manager}
          edit={edit}
          handleSubmit={handleSubmit}
          handleSaveDraft={handleSaveDraft}
          loadingSubmit={loadingSubmit}
          checkRow={checkRow}
          useDraft={useDraft}
          optionCurrency={optionCurrency}
          form={form}
          idQuery={idQuery}
          handleIdQuery={handleIdQuery}
          handleCheckEdit={handleCheckEdit}
          isCheckPermissionEdit={isCheckPermissionEdit}
        />

        <CollapseCard
          title="Air Pricing Detail"
          style={{ marginBottom: '24px' }}
          defaultActive={true}
        >
          <AirPricingDetailDTO
            form={form}
            create={create}
            optionCurrency={optionCurrency}
            optionTypeLoadCapacity={optionTypeLoadCapacity}
            isCheckPermissionEdit={isCheckPermissionEdit}
          />
        </CollapseCard>

        <CollapseCard
          title="List Fee"
          style={{ marginBottom: '24px' }}
          defaultActive={true}
        >
          <ListFee FeeDataTable={dataFeeTable} />
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
          handleAR={
            role === ROLE.LINER || role === ROLE.AGENT ? undefined : handleAR
          }
          checkQuery={idQuery ? true : false}
          useDraft={useDraft}
          handleCopyAndCreate={handleCopyAndCreate}
          checkPermissionEdit={true}
        />
      </Form>
    </div>
  );
};

export default AirPricing;
