import { ROUTERS } from '@/constant/router';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Form } from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FormValues, UpdateStatus } from '../interface';
import { API_CURRENCY, API_SEA_PRICING } from '@/fetcherAxios/endpoint';
import { BottomCreateEdit } from '@/components/commons/bottom-edit-creat-manager';
import { getAllCurrency, getSeaPricingDetail, updateStatus } from '../fetcher';
import { UpdateStatusLocationType } from '@/components/type-of-location-page/interface';
import { errorToast, successToast } from '@/hook/toast';
import { API_MESSAGE } from '@/constant/message';
import dayjs from 'dayjs';
import CardMain from './card-main';

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

  useEffect(() => {
    if (!id) return;
    setIdQuery(id as string);
  }, [router, form, id]);

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
              label: currency.currencyName,
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
          dateEffect: dayjs(Number(data.data.dateEffect)),
          validityDate: dayjs(Number(data.data.validityDate)),
          fregDate: dayjs(Number(data.data.fregDate)),
          demSeaPricing: data.data.demSeaPricing,
          detSeaPricing: data.data.detSeaPricing,
          stoSeaPricing: data.data.stoSeaPricing,
          lclMinSeaPricing: data.data.lclMinSeaPricing,
          lclMinCurrency: data.data.lclMinCurrency,
          lclSeaPricing: data.data.lclSeaPricing,
          lclCurrency: data.data.lclCurrency,
          public: data.data.public,
          statusSeaPricing: data.data.statusSeaPricing,
          seaPricingDetailDTOs: data.data.seaPricingDetailDTOs,
          seaPricingFeeDTOs: data.data.seaPricingFeeDTOs,
        });
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
      const _requestData: UpdateStatusLocationType = {
        id: idQuery,
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
      podid: form.getFieldValue('podid'),
      polid: form.getFieldValue('polid'),
      commodityID: form.getFieldValue('commodityID'),
      note: form.getFieldValue('note'),
      dateEffect: form.getFieldValue('dateEffect'),
      validityDate: form.getFieldValue('validityDate'),
      fregDate: form.getFieldValue('fregDate'),
      demSeaPricing: form.getFieldValue('demSeaPricing'),
      detSeaPricing: form.getFieldValue('detSeaPricing'),
      stoSeaPricing: form.getFieldValue('stoSeaPricing'),
      lclMinSeaPricing: form.getFieldValue('lclMinSeaPricing'),
      lclSeaPricing: form.getFieldValue('lclSeaPricing'),
      public: form.getFieldValue('public'),
      statusSeaPricing: form.getFieldValue('statusSeaPricing'),
      seaPricingDetailDTOs: form.getFieldValue('seaPricingDetailDTOs'),
      seaPricingFeeDTOs: form.getFieldValue('seaPricingFeeDTOs'),
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
        />

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
