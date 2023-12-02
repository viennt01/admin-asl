import { ROUTERS } from '@/constant/router';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Form } from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  IFormValues,
  ICustomPricingFeeFormValue,
  UpdateStatus,
  RequireColorRouter,
  ICustomPricingLCLAndAirDetailRegisterRequests,
} from '../interface';
import {
  API_CURRENCY,
  API_FEE_GROUP,
  API_CUSTOM_PRICING,
  API_COLOR_ROUTER,
} from '@/fetcherAxios/endpoint';
import { BottomCreateEdit } from '@/components/commons/bottom-edit-creat-manager';
import {
  getAllColorRouter,
  getAllCurrency,
  getCustomPricingDetail,
  updateStatus,
} from '../fetcher';
import { errorToast, successToast } from '@/hook/toast';
import { API_MESSAGE } from '@/constant/message';
import dayjs from 'dayjs';
import CardMain from './card-main';
import CollapseCard from '@/components/commons/collapse-card';
import { getFeeWithFeeGroup } from '@/components/menu-item/quotation/fee-group/fetcher';
import { FeeTable } from '@/components/menu-item/quotation/fee-group/interface';
import ListFee from './list-fee';
import LCL from './lcl';
import Air from './fcl';

interface FormProps {
  create?: boolean;
  manager?: boolean;
  edit?: boolean;
  handleSubmit?: (
    formValues: IFormValues,
    id?: string,
    seaPricingFeeDTOs?: ICustomPricingFeeFormValue[],
    dataLCLSea?: ICustomPricingLCLAndAirDetailRegisterRequests[],
    dataAir?: ICustomPricingLCLAndAirDetailRegisterRequests[]
  ) => void;
  handleSaveDraft?: (
    formValues: IFormValues,
    id?: string,
    seaPricingFeeDTOs?: ICustomPricingFeeFormValue[],
    dataLCLSea?: ICustomPricingLCLAndAirDetailRegisterRequests[],
    dataAir?: ICustomPricingLCLAndAirDetailRegisterRequests[]
  ) => void;
  loadingSubmit?: boolean;
  checkRow: boolean;
  useDraft?: boolean;
}

const CustomPricing = ({
  create,
  manager,
  edit,
  handleSubmit,
  handleSaveDraft,
  loadingSubmit,
  checkRow,
  useDraft,
}: FormProps) => {
  const router = useRouter();
  const [form] = Form.useForm<IFormValues>();
  const { id } = router.query;
  const [idQuery, setIdQuery] = useState<string>();
  const [isCheckPermissionEdit, setCheckPermissionEdit] =
    useState<boolean>(false);
  const [optionCurrency, setOptionCurrency] = useState<
    { value: string; label: string }[]
  >([]);
  const [seaPricingFeeDTOs, setSeaPricingFeeDTOs] = useState<
    ICustomPricingFeeFormValue[]
  >([]);
  const [dataFeeTable, setDataFeeTable] = useState<FeeTable[]>([]);
  const [dataColorRouter, setDataColorRouter] = useState<RequireColorRouter[]>(
    []
  );
  const [dataLCLSea, setDataLCLSea] = useState<
    ICustomPricingLCLAndAirDetailRegisterRequests[]
  >([]);
  const [dataAir, setDataAir] = useState<
    ICustomPricingLCLAndAirDetailRegisterRequests[]
  >([]);

  const listIdFeeGroup = Form.useWatch('customPricingFeeGroupDTOs', form);

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

  useQuery({
    queryKey: [API_COLOR_ROUTER.GET_ALL],
    queryFn: () => getAllColorRouter(),
    onSuccess: (data) => {
      if (!data.status) {
        router.back();
        errorToast(API_MESSAGE.ERROR);
      } else {
        setDataColorRouter(data.data);
      }
    },
    onError: () => {
      router.back();
      errorToast(API_MESSAGE.ERROR);
    },
  });

  const onFinish = (formValues: IFormValues) => {
    if (idQuery) {
      handleSubmit &&
        handleSubmit(
          formValues,
          idQuery,
          seaPricingFeeDTOs,
          dataLCLSea,
          dataAir
        );
    } else {
      handleSubmit &&
        handleSubmit(formValues, '', seaPricingFeeDTOs, dataLCLSea, dataAir);
    }
  };

  const onSaveDraft = () => {
    if (idQuery) {
      handleSaveDraft &&
        handleSaveDraft(
          form.getFieldsValue(),
          idQuery,
          seaPricingFeeDTOs,
          dataLCLSea,
          dataAir
        );
    } else {
      handleSaveDraft &&
        handleSaveDraft(
          form.getFieldsValue(),
          '',
          seaPricingFeeDTOs,
          dataLCLSea,
          dataAir
        );
    }
  };

  const handleIdQuery = (id: string) => {
    setIdQuery(id as string);
  };

  const detailQuery = useQuery({
    queryKey: [API_CUSTOM_PRICING.GET_DETAIL, idQuery],
    queryFn: () => getCustomPricingDetail(idQuery as string),
    enabled: idQuery !== undefined,
    onSuccess: (data) => {
      if (data.status) {
        form.setFieldsValue({
          typeDelaracrionID: data.data.typeDelaracrionID,
          partnerID: data.data.partnerID,
          commodityID: data.data.commodityID,
          currencyID: data.data.currencyID,
          transactionTypeID: data.data.transactionTypeID,
          note: data.data.note,
          customRedPrice: data.data.customRedPrice,
          customYellowPrice: data.data.customYellowPrice,
          customGreenPrice: data.data.customGreenPrice,
          effectDated: dayjs(Number(data.data.effectDated)),
          validityDate: dayjs(Number(data.data.validityDate)),
          public: data.data.public,
          statusCustomPricing: data.data.statusCustomPricing,
          customPricingFeeGroupDTOs: data.data.customPricingFeeGroupDTOs?.map(
            (fee) => fee.feeGroupID
          ),
        });
        setSeaPricingFeeDTOs(data.data.customPricingFeeGroupDTOs);
      } else {
        router.push(ROUTERS.CUSTOMS_PRICING);
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
            ? (successToast(data.message), router.push(ROUTERS.CUSTOMS_PRICING))
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
      typeDelaracrionID: form.getFieldValue('typeDelaracrionID'),
      partnerID: form.getFieldValue('partnerID'),
      commodityID: form.getFieldValue('commodityID'),
      currencyID: form.getFieldValue('currencyID'),
      transactionTypeID: form.getFieldValue('transactionTypeID'),
      note: form.getFieldValue('note'),
      customRedPrice: form.getFieldValue('customRedPrice'),
      customYellowPrice: form.getFieldValue('customYellowPrice'),
      customGreenPrice: form.getFieldValue('customGreenPrice'),
      effectDated: form.getFieldValue('effectDated')?.valueOf(),
      validityDate: form.getFieldValue('validityDate')?.valueOf(),
      public: form.getFieldValue('public'),
      statusCustomPricing: form.getFieldValue('statusCustomPricing'),
      customPricingFeeGroupDTOs: form.getFieldValue(
        'customPricingFeeGroupDTOs'
      ),
    };
    router.push({
      pathname: ROUTERS.CUSTOMS_PRICING_CREATE,
      query: props,
    });
  };

  return (
    <div style={{ padding: '24px 0' }}>
      <Form
        form={form}
        onFinish={onFinish}
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
          title="Other Charges"
          style={{ marginBottom: '24px' }}
          defaultActive={true}
        >
          <ListFee FeeDataTable={dataFeeTable} />
        </CollapseCard>

        <CollapseCard
          title="SEA LCL"
          style={{ marginBottom: '24px' }}
          defaultActive={true}
        >
          <LCL
            dataColorRouter={dataColorRouter}
            setDataLCLSea={setDataLCLSea}
          />
        </CollapseCard>

        <CollapseCard
          title="Air"
          style={{ marginBottom: '24px' }}
          defaultActive={true}
        >
          <Air dataColorRouter={dataColorRouter} setDataAir={setDataAir} />
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

export default CustomPricing;
