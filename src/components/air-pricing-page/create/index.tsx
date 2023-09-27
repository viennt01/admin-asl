import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ROUTERS } from '@/constant/router';
import { errorToast, successToast } from '@/hook/toast';
import router from 'next/router';
import { API_MESSAGE } from '@/constant/message';
import AirPricing from '../components/form';
import { FormValues, AirPricingCreate, AirPricingEdit } from '../interface';
import { createAirPricing, editAirPricing } from '../fetcher';
import { STATUS_ALL_LABELS } from '@/constant/form';
import { API_AIR_PRICING } from '@/fetcherAxios/endpoint';

const CreateAirPricing = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (body: AirPricingCreate) => {
      return createAirPricing(body);
    },
  });

  const updateMutation = useMutation({
    mutationFn: (body: AirPricingEdit) => {
      return editAirPricing(body);
    },
  });

  const handleSubmit = (formValues: FormValues, id?: string) => {
    const airPricingDetailRegisterRequests =
      formValues.airPricingDetailDTOs.map((data) => {
        return {
          containerTypeID: data.containerTypeID,
          currencyID: data.currencyID,
          priceAirPricingDetail: data.price,
        };
      });
    if (id) {
      const _requestData: AirPricingEdit = {
        airPricingID: id || '',
        aodid: formValues.aodid || '',
        aolid: formValues.aolid || '',
        commodityID: formValues.commodityID || '',
        note: formValues.note || '',
        dateEffect: formValues.dateEffect?.valueOf(),
        validityDate: formValues.validityDate?.valueOf(),
        freqDate: formValues.freqDate || '',
        demAirPricing: formValues.demAirPricing || '',
        detAirPricing: formValues.detAirPricing || '',
        stoAirPricing: formValues.stoAirPricing || '',
        lclMinAirPricing: formValues.lclMinAirPricing || '',
        lclAirPricing: formValues.lclAirPricing || '',
        currencyID: formValues.currencyID || '',
        public: formValues.public || true,
        airPricingDetailUpdateRequests: formValues.airPricingDetailDTOs || [],
        airPricingFeeUpdateRequests: formValues.airPricingFeeDTOs || [],
        statusAirPricing: STATUS_ALL_LABELS.REQUEST,
      };
      updateMutation.mutate(_requestData, {
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
      const _requestData: AirPricingCreate = {
        aodid: formValues.aodid || '',
        aolid: formValues.aolid || '',
        commodityID: formValues.commodityID || '',
        note: formValues.note || '',
        dateEffect: formValues.dateEffect?.valueOf(),
        validityDate: formValues.validityDate?.valueOf(),
        freqDate: formValues.freqDate || '',
        demAirPricing: formValues.demAirPricing || '',
        detAirPricing: formValues.detAirPricing || '',
        stoAirPricing: formValues.stoAirPricing || '',
        lclMinAirPricing: formValues.lclMinAirPricing || '',
        lclAirPricing: formValues.lclAirPricing || '',
        currencyID: formValues.currencyID || '',
        public: formValues.public || true,
        airPricingDetailRegisterRequests:
          airPricingDetailRegisterRequests || [],
        airPricingFeeRegisterRequests: formValues.airPricingFeeDTOs || [],
        statusAirPricing: STATUS_ALL_LABELS.REQUEST,
      };
      createMutation.mutate(_requestData, {
        onSuccess: (data) => {
          data.status
            ? (successToast(data.message), router.push(ROUTERS.AIR_PRICING))
            : errorToast(data.message);
        },
        onError() {
          errorToast(API_MESSAGE.ERROR);
        },
      });
    }
  };

  const handleSaveDraft = (formValues: FormValues, id?: string) => {
    const airPricingDetailRegisterRequests =
      formValues.airPricingDetailDTOs.map((data) => {
        return {
          containerTypeID: data.containerTypeID,
          currencyID: data.currencyID,
          priceAirPricingDetail: data.price,
        };
      });

    if (id) {
      const _requestData: AirPricingEdit = {
        airPricingID: id,
        aodid: formValues.aodid || '',
        aolid: formValues.aolid || '',
        commodityID: formValues.commodityID || '',
        note: formValues.note || '',
        dateEffect: formValues.dateEffect?.valueOf(),
        validityDate: formValues.validityDate?.valueOf(),
        freqDate: formValues.freqDate || '',
        demAirPricing: formValues.demAirPricing || '',
        detAirPricing: formValues.detAirPricing || '',
        stoAirPricing: formValues.stoAirPricing || '',
        lclMinAirPricing: formValues.lclMinAirPricing || '',
        lclAirPricing: formValues.lclAirPricing || '',
        currencyID: formValues.currencyID || '',
        public: formValues.public || true,
        airPricingDetailUpdateRequests: formValues.airPricingDetailDTOs || [],
        airPricingFeeUpdateRequests: formValues.airPricingFeeDTOs || [],
        statusAirPricing: STATUS_ALL_LABELS.DRAFT,
      };
      updateMutation.mutate(_requestData, {
        onSuccess: (data) => {
          data.status
            ? (successToast(data.message),
              queryClient.invalidateQueries({
                queryKey: [API_AIR_PRICING.GET_SEARCH],
              }))
            : errorToast(data.message);
        },
        onError() {
          errorToast(API_MESSAGE.ERROR);
        },
      });
    } else {
      const _requestData: AirPricingCreate = {
        aodid: formValues.aodid || '',
        aolid: formValues.aolid || '',
        commodityID: formValues.commodityID || '',
        note: formValues.note || '',
        dateEffect: formValues.dateEffect?.valueOf(),
        validityDate: formValues.validityDate?.valueOf(),
        freqDate: formValues.freqDate || '',
        demAirPricing: formValues.demAirPricing || '',
        detAirPricing: formValues.detAirPricing || '',
        stoAirPricing: formValues.stoAirPricing || '',
        lclMinAirPricing: formValues.lclMinAirPricing || '',
        lclAirPricing: formValues.lclAirPricing || '',
        currencyID: formValues.currencyID || '',
        public: formValues.public || true,
        airPricingDetailRegisterRequests:
          airPricingDetailRegisterRequests || [],
        airPricingFeeRegisterRequests: formValues.airPricingFeeDTOs || [],
        statusAirPricing: STATUS_ALL_LABELS.DRAFT,
      };
      createMutation.mutate(_requestData, {
        onSuccess: (data) => {
          data.status
            ? (successToast(data.message),
              queryClient.invalidateQueries({
                queryKey: [API_AIR_PRICING.GET_SEARCH],
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
    <AirPricing
      create
      handleSubmit={handleSubmit}
      handleSaveDraft={handleSaveDraft}
      loadingSubmit={createMutation.isLoading || updateMutation.isLoading}
      checkRow={false}
      useDraft
    />
  );
};

export default CreateAirPricing;
