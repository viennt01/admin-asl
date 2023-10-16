import { ROUTERS } from '@/constant/router';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Form } from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FormValues, UpdateStatus } from '../interface';
import {
  API_CONTAINER_TYPE,
  API_CURRENCY,
  API_AIR_PRICING,
} from '@/fetcherAxios/endpoint';
import { BottomCreateEdit } from '@/components/commons/bottom-edit-creat-manager';
import {
  getAllContainerType,
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

interface PortFormProps {
  create?: boolean;
  manager?: boolean;
  edit?: boolean;
  handleSubmit?: (formValues: FormValues, id?: string) => void;
  handleSaveDraft?: (formValues: FormValues, id?: string) => void;
  loadingSubmit?: boolean;
  checkRow: boolean;
  useDraft?: boolean;
}

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
  const [isCheckPermissionEdit, setCheckPermissionEdit] =
    useState<boolean>(false);
  const [optionCurrency, setOptionCurrency] = useState<
    { value: string; label: string }[]
  >([]);
  const [optionTypeContainer, setOptionTypeContainer] = useState<
    { value: string; label: string }[]
  >([]);

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

  const handleIdQuery = (id: string) => {
    console.log(id);

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
          dateEffect: dayjs(Number(data.data.dateEffect)),
          validityDate: dayjs(Number(data.data.validityDate)),
          freqDate: data.data.freqDate,
          demAirPricing: data.data.demAirPricing,
          detAirPricing: data.data.detAirPricing,
          stoAirPricing: data.data.stoAirPricing,
          lclMinAirPricing: data.data.lclMinAirPricing,
          lclAirPricing: data.data.lclAirPricing,
          currencyID: data.data.currencyID,
          public: data.data.public,
          statusAirPricing: data.data.statusAirPricing,
          airPricingDetailDTOs: data.data.airPricingDetailDTOs,
          airPricingFeeDTOs: data.data.airPricingFeeDTOs,
        });
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
      dateEffect: form.getFieldValue('dateEffect'),
      validityDate: form.getFieldValue('validityDate'),
      freqDate: form.getFieldValue('freqDate'),
      demAirPricing: form.getFieldValue('demAirPricing'),
      detAirPricing: form.getFieldValue('detAirPricing'),
      stoAirPricing: form.getFieldValue('stoAirPricing'),
      lclMinAirPricing: form.getFieldValue('lclMinAirPricing'),
      lclAirPricing: form.getFieldValue('lclAirPricing'),
      currencyID: form.getFieldValue('currencyID'),
      public: form.getFieldValue('public'),
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
            optionCurrency={optionCurrency}
            optionTypeContainer={optionTypeContainer}
            isCheckPermissionEdit={isCheckPermissionEdit}
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

export default AirPricing;
