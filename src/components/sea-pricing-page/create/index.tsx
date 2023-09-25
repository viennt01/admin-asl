import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ROUTERS } from '@/constant/router';
import { errorToast, successToast } from '@/hook/toast';
import router from 'next/router';
import { API_MESSAGE } from '@/constant/message';
import SeaPricing from '../components/form';
import { FormValues, SeaPricingCreate, SeaPricingEdit } from '../interface';
import { createSeaPricing, editSeaPricing } from '../fetcher';
import { STATUS_ALL_LABELS } from '@/constant/form';
import { API_SEA_PRICING } from '@/fetcherAxios/endpoint';

const CreateSeaPricing = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (body: SeaPricingCreate) => {
      return createSeaPricing(body);
    },
  });

  const updateMutation = useMutation({
    mutationFn: (body: SeaPricingEdit) => {
      return editSeaPricing(body);
    },
  });

  const handleSubmit = (formValues: FormValues, id?: string) => {
    const seaPricingDetailRegisterRequests =
      formValues.seaPricingDetailDTOs.map((data) => {
        return {
          containerTypeID: data.containerTypeID,
          currencyID: data.currencyID,
          priceSeaPricingDetail: data.price,
        };
      });
    if (id) {
      const _requestData: SeaPricingEdit = {
        seaPricingID: id || '',
        podid: formValues.podid || '',
        polid: formValues.polid || '',
        commodityID: formValues.commodityID || '',
        note: formValues.note || '',
        dateEffect: formValues.dateEffect?.valueOf(),
        validityDate: formValues.validityDate?.valueOf(),
        freqDate: formValues.freqDate || '',
        demSeaPricing: formValues.demSeaPricing || '',
        detSeaPricing: formValues.detSeaPricing || '',
        stoSeaPricing: formValues.stoSeaPricing || '',
        lclMinSeaPricing: formValues.lclMinSeaPricing || '',
        lclSeaPricing: formValues.lclSeaPricing || '',
        currencyID: formValues.currencyID || '',
        public: formValues.public || true,
        seaPricingDetailUpdateRequests: formValues.seaPricingDetailDTOs || [],
        seaPricingFeeUpdateRequests: formValues.seaPricingFeeDTOs || [],
        statusSeaPricing: STATUS_ALL_LABELS.REQUEST,
      };
      updateMutation.mutate(_requestData, {
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
      const _requestData: SeaPricingCreate = {
        podid: formValues.podid || '',
        polid: formValues.polid || '',
        commodityID: formValues.commodityID || '',
        note: formValues.note || '',
        dateEffect: formValues.dateEffect?.valueOf(),
        validityDate: formValues.validityDate?.valueOf(),
        freqDate: formValues.freqDate || '',
        demSeaPricing: formValues.demSeaPricing || '',
        detSeaPricing: formValues.detSeaPricing || '',
        stoSeaPricing: formValues.stoSeaPricing || '',
        lclMinSeaPricing: formValues.lclMinSeaPricing || '',
        lclSeaPricing: formValues.lclSeaPricing || '',
        currencyID: formValues.currencyID || '',
        public: formValues.public || true,
        seaPricingDetailRegisterRequests:
          seaPricingDetailRegisterRequests || [],
        seaPricingFeeRegisterRequests: formValues.seaPricingFeeDTOs || [],
        statusSeaPricing: STATUS_ALL_LABELS.REQUEST,
      };
      createMutation.mutate(_requestData, {
        onSuccess: (data) => {
          data.status
            ? (successToast(data.message), router.push(ROUTERS.SEA_PRICING))
            : errorToast(data.message);
        },
        onError() {
          errorToast(API_MESSAGE.ERROR);
        },
      });
    }
  };

  const handleSaveDraft = (formValues: FormValues, id?: string) => {
    const seaPricingDetailRegisterRequests =
      formValues.seaPricingDetailDTOs.map((data) => {
        return {
          containerTypeID: data.containerTypeID,
          currencyID: data.currencyID,
          priceSeaPricingDetail: data.price,
        };
      });

    if (id) {
      const _requestData: SeaPricingEdit = {
        seaPricingID: id,
        podid: formValues.podid || '',
        polid: formValues.polid || '',
        commodityID: formValues.commodityID || '',
        note: formValues.note || '',
        dateEffect: formValues.dateEffect?.valueOf(),
        validityDate: formValues.validityDate?.valueOf(),
        freqDate: formValues.freqDate || '',
        demSeaPricing: formValues.demSeaPricing || '',
        detSeaPricing: formValues.detSeaPricing || '',
        stoSeaPricing: formValues.stoSeaPricing || '',
        lclMinSeaPricing: formValues.lclMinSeaPricing || '',
        lclSeaPricing: formValues.lclSeaPricing || '',
        currencyID: formValues.currencyID || '',
        public: formValues.public || true,
        seaPricingDetailUpdateRequests: formValues.seaPricingDetailDTOs || [],
        seaPricingFeeUpdateRequests: formValues.seaPricingFeeDTOs || [],
        statusSeaPricing: STATUS_ALL_LABELS.DRAFT,
      };
      updateMutation.mutate(_requestData, {
        onSuccess: (data) => {
          data.status
            ? (successToast(data.message),
              queryClient.invalidateQueries({
                queryKey: [API_SEA_PRICING.GET_SEARCH],
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
        note: formValues.note || '',
        dateEffect: formValues.dateEffect?.valueOf(),
        validityDate: formValues.validityDate?.valueOf(),
        freqDate: formValues.freqDate || '',
        demSeaPricing: formValues.demSeaPricing || '',
        detSeaPricing: formValues.detSeaPricing || '',
        stoSeaPricing: formValues.stoSeaPricing || '',
        lclMinSeaPricing: formValues.lclMinSeaPricing || '',
        lclSeaPricing: formValues.lclSeaPricing || '',
        currencyID: formValues.currencyID || '',
        public: formValues.public || true,
        seaPricingDetailRegisterRequests:
          seaPricingDetailRegisterRequests || [],
        seaPricingFeeRegisterRequests: formValues.seaPricingFeeDTOs || [],
        statusSeaPricing: STATUS_ALL_LABELS.DRAFT,
      };
      createMutation.mutate(_requestData, {
        onSuccess: (data) => {
          data.status
            ? (successToast(data.message),
              queryClient.invalidateQueries({
                queryKey: [API_SEA_PRICING.GET_SEARCH],
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
    <SeaPricing
      create
      handleSubmit={handleSubmit}
      handleSaveDraft={handleSaveDraft}
      loadingSubmit={createMutation.isLoading || updateMutation.isLoading}
      checkRow={false}
      useDraft
    />
  );
};

export default CreateSeaPricing;
