import { ROUTERS } from '@/constant/router';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Form } from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FormValues, SeaPricingFeeFormValue, UpdateStatus } from '../interface';
import {
  API_CONTAINER_TYPE,
  API_CURRENCY,
  API_FEE_GROUP,
  API_SEA_PRICING,
} from '@/fetcherAxios/endpoint';
import { BottomCreateEdit } from '@/components/commons/bottom-edit-creat-manager';
import {
  getAllContainerType,
  getAllCurrency,
  getSeaPricingDetail,
  updateStatus,
} from '../fetcher';
import { errorToast, successToast } from '@/hook/toast';
import { API_MESSAGE } from '@/constant/message';
import dayjs from 'dayjs';
import CardMain from './card-main';
import CollapseCard from '@/components/commons/collapse-card';
import SeaPricingDetailDTO from './sea-pricing-detail-dto';
import { getFeeWithFeeGroup } from '@/components/menu-item/quotation/fee-group/fetcher';
import { FeeTable } from '@/components/menu-item/quotation/fee-group/interface';
import ListFee from './list-fee';

interface PortFormProps {
  create?: boolean;
  manager?: boolean;
  edit?: boolean;
  handleSubmit?: (
    formValues: FormValues,
    id?: string,
    seaPricingFeeDTOs?: SeaPricingFeeFormValue[]
  ) => void;
  handleSaveDraft?: (
    formValues: FormValues,
    id?: string,
    seaPricingFeeDTOs?: SeaPricingFeeFormValue[]
  ) => void;
  loadingSubmit?: boolean;
  checkRow: boolean;
  useDraft?: boolean;
}

const SeaPricing = ({
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
  const [isCheckPermissionEdit, setCheckPermissionEdit] =
    useState<boolean>(false);
  const [optionCurrency, setOptionCurrency] = useState<
    { value: string; label: string }[]
  >([]);
  const [optionTypeContainer, setOptionTypeContainer] = useState<
    { value: string; label: string }[]
  >([]);
  const [seaPricingFeeDTOs, setSeaPricingFeeDTOs] = useState<
    SeaPricingFeeFormValue[]
  >([]);
  const [dataFeeTable, setDataFeeTable] = useState<FeeTable[]>([]);

  const listIdFeeGroup = Form.useWatch('seaPricingFeeGroupDTOs', form);

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
  // get container type
  useQuery({
    queryKey: [API_CONTAINER_TYPE.GET_ALL],
    queryFn: () => getAllContainerType(),
    onSuccess: (data) => {
      if (!data.status) {
        router.back();
        errorToast(API_MESSAGE.ERROR);
      } else {
        setOptionTypeContainer(
          data.data.map((currency) => {
            return {
              value: currency.containerTypeID,
              label: currency.code,
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
      handleSubmit && handleSubmit(formValues, idQuery, seaPricingFeeDTOs);
    } else {
      handleSubmit && handleSubmit(formValues, '', seaPricingFeeDTOs);
    }
  };

  const onSaveDraft = () => {
    if (idQuery) {
      handleSaveDraft &&
        handleSaveDraft(form.getFieldsValue(), idQuery, seaPricingFeeDTOs);
    } else {
      handleSaveDraft &&
        handleSaveDraft(form.getFieldsValue(), '', seaPricingFeeDTOs);
    }
  };

  const handleIdQuery = (id: string) => {
    setIdQuery(id as string);
  };

  const detailQuery = useQuery({
    queryKey: [API_SEA_PRICING.GET_DETAIL, idQuery],
    queryFn: () => getSeaPricingDetail(idQuery as string),
    enabled: idQuery !== undefined,
    onSuccess: (data) => {
      if (data.status) {
        form.setFieldsValue({
          podid: data.data.podid,
          polid: data.data.polid,
          commodityID: data.data.commodityID,
          note: data.data.note,
          vendorID: data.data.vendorID,
          dateEffect: dayjs(Number(data.data.dateEffect)),
          validityDate: dayjs(Number(data.data.validityDate)),
          freqDate: data.data.freqDate,
          demSeaPricing: data.data.demSeaPricing,
          detSeaPricing: data.data.detSeaPricing,
          stoSeaPricing: data.data.stoSeaPricing,
          lclMinSeaPricing: data.data.lclMinSeaPricing,
          lclSeaPricing: data.data.lclSeaPricing,
          currencyID: data.data.currencyID,
          public: data.data.public,
          statusSeaPricing: data.data.statusSeaPricing,
          seaPricingDetailDTOs: data.data.seaPricingDetailDTOs,
          seaPricingFeeGroupDTOs: data.data.seaPricingFeeGroupDTOs?.map(
            (fee) => fee.feeGroupID
          ),
        });
        setSeaPricingFeeDTOs(data.data.seaPricingFeeGroupDTOs);
      } else {
        router.push(ROUTERS.SEA_PRICING);
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
            ? (successToast(data.message), router.push(ROUTERS.SEA_PRICING))
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
      podid: form.getFieldValue('podid'),
      polid: form.getFieldValue('polid'),
      commodityID: form.getFieldValue('commodityID'),
      note: form.getFieldValue('note'),
      vendorID: form.getFieldValue('vendorID'),
      dateEffect: form.getFieldValue('dateEffect')?.valueOf(),
      validityDate: form.getFieldValue('validityDate')?.valueOf(),
      freqDate: form.getFieldValue('freqDate'),
      demSeaPricing: form.getFieldValue('demSeaPricing'),
      detSeaPricing: form.getFieldValue('detSeaPricing'),
      stoSeaPricing: form.getFieldValue('stoSeaPricing'),
      lclMinSeaPricing: form.getFieldValue('lclMinSeaPricing'),
      lclSeaPricing: form.getFieldValue('lclSeaPricing'),
      currencyID: form.getFieldValue('currencyID'),
      public: form.getFieldValue('public'),
      statusSeaPricing: form.getFieldValue('statusSeaPricing'),
      seaPricingDetailDTOs: JSON.stringify(
        form.getFieldValue('seaPricingDetailDTOs')
      ),
      seaPricingFeeGroupDTOs: form.getFieldValue('seaPricingFeeGroupDTOs'),
    };
    router.push({
      pathname: ROUTERS.SEA_PRICING_CREATE,
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
          title="Sea Pricing Detail"
          style={{ marginBottom: '24px' }}
          defaultActive={true}
        >
          <SeaPricingDetailDTO
            form={form}
            optionCurrency={optionCurrency}
            optionTypeContainer={optionTypeContainer}
            isCheckPermissionEdit={isCheckPermissionEdit}
          />
        </CollapseCard>

        <CollapseCard
          title="Other Charges"
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
          handleAR={handleAR}
          checkQuery={idQuery ? true : false}
          useDraft={useDraft}
          handleCopyAndCreate={handleCopyAndCreate}
        />
      </Form>
    </div>
  );
};

export default SeaPricing;
