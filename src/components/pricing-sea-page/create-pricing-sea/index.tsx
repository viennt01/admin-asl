import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FormValues, SeaPricingCreate, SeaPricingEdit } from '../interface';
import { createUnit, editUnit } from '../fetcher';
import { STATUS_ALL_LABELS } from '@/constant/form';
import { errorToast, successToast } from '@/hook/toast';
import router from 'next/router';
import { ROUTERS } from '@/constant/router';
import { API_MESSAGE } from '@/constant/message';
import { API_UNIT } from '@/fetcherAxios/endpoint';
import UnitForm from '../components/form';

export default function CreatePricingSea() {
  const queryClient = useQueryClient();

  const createPortMutation = useMutation({
    mutationFn: (body: SeaPricingCreate) => {
      return createUnit(body);
    },
  });

  const updateUnitMutation = useMutation({
    mutationFn: (body: SeaPricingEdit) => {
      return editUnit(body);
    },
  });

  const handleSubmit = (formValues: FormValues, id?: string) => {
    if (id) {
      const _requestData: SeaPricingEdit = {
        seaPricingID: id,
        podid: formValues.podid || '',
        polid: formValues.polid || '',
        commodityID: formValues.commodityID || '',
        currencyID: formValues.currencyID || '',
        partnerID: formValues.partnerID || '',
        note: formValues.note || '',
        effectDate: formValues.effectDate || '',
        validity: formValues.validity || '',
        freg: formValues.freg || '',
        dem: formValues.dem || '',
        det: formValues.det || '',
        sto: formValues.sto || '',
        lclMin: formValues.lclMin || '',
        lcl: formValues.lcl || '',
        public: formValues.public || false,
        statusSeaPricing: STATUS_ALL_LABELS.REQUEST,
      };
      updateUnitMutation.mutate(_requestData, {
        onSuccess: (data) => {
          data.status
            ? (successToast(data.message), router.push(ROUTERS.UNIT))
            : errorToast(data.message);
        },
        onError() {
          errorToast(API_MESSAGE.ERROR);
        },
      });
    } else {
      const _requestData: SeaPricingCreate = {
        podid: formValues.podid || '',
        polid: formValues.polid || '',
        commodityID: formValues.commodityID || '',
        currencyID: formValues.currencyID || '',
        partnerID: formValues.partnerID || '',
        note: formValues.note || '',
        effectDate: formValues.effectDate || '',
        validity: formValues.validity || '',
        freg: formValues.freg || '',
        dem: formValues.dem || '',
        det: formValues.det || '',
        sto: formValues.sto || '',
        lclMin: formValues.lclMin || '',
        lcl: formValues.lcl || '',
        public: formValues.public || false,
        statusSeaPricing: STATUS_ALL_LABELS.REQUEST,
      };
      createPortMutation.mutate(_requestData, {
        onSuccess: (data) => {
          data.status
            ? (successToast(data.message), router.push(ROUTERS.UNIT))
            : errorToast(data.message);
        },
        onError() {
          errorToast(API_MESSAGE.ERROR);
        },
      });
    }
  };

  const handleSaveDraft = (formValues: FormValues, id?: string) => {
    if (id) {
      const _requestData: SeaPricingEdit = {
        seaPricingID: id,
        podid: formValues.podid || '',
        polid: formValues.polid || '',
        commodityID: formValues.commodityID || '',
        currencyID: formValues.currencyID || '',
        partnerID: formValues.partnerID || '',
        note: formValues.note || '',
        effectDate: formValues.effectDate || '',
        validity: formValues.validity || '',
        freg: formValues.freg || '',
        dem: formValues.dem || '',
        det: formValues.det || '',
        sto: formValues.sto || '',
        lclMin: formValues.lclMin || '',
        lcl: formValues.lcl || '',
        public: formValues.public || false,
        statusSeaPricing: STATUS_ALL_LABELS.DRAFT,
      };
      updateUnitMutation.mutate(_requestData, {
        onSuccess: (data) => {
          data.status
            ? (successToast(data.message),
              queryClient.invalidateQueries({
                queryKey: [API_UNIT.GET_SEARCH],
              }))
            : errorToast(data.message);
        },
        onError() {
          errorToast(API_MESSAGE.ERROR);
        },
      });
    } else {
      const _requestData: SeaPricingCreate = {
        podid: formValues.podid || '',
        polid: formValues.polid || '',
        commodityID: formValues.commodityID || '',
        currencyID: formValues.currencyID || '',
        partnerID: formValues.partnerID || '',
        note: formValues.note || '',
        effectDate: formValues.effectDate || '',
        validity: formValues.validity || '',
        freg: formValues.freg || '',
        dem: formValues.dem || '',
        det: formValues.det || '',
        sto: formValues.sto || '',
        lclMin: formValues.lclMin || '',
        lcl: formValues.lcl || '',
        public: formValues.public || false,
        statusSeaPricing: STATUS_ALL_LABELS.DRAFT,
      };
      createPortMutation.mutate(_requestData, {
        onSuccess: (data) => {
          data.status
            ? (successToast(data.message),
              queryClient.invalidateQueries({
                queryKey: [API_UNIT.GET_SEARCH],
              }))
            : errorToast(data.message);
        },
        onError() {
          errorToast(API_MESSAGE.ERROR);
        },
      });
    }
  };

  return (
    <UnitForm
      create
      handleSubmit={handleSubmit}
      handleSaveDraft={handleSaveDraft}
      loadingSubmit={createPortMutation.isLoading}
      checkRow={false}
      useDraft
    />
  );
}
