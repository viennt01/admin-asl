import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ROUTERS } from '@/constant/router';
import { errorToast, successToast } from '@/hook/toast';
import router from 'next/router';
import { API_MESSAGE } from '@/constant/message';
import TruckingPricingForm from '../components/form';
import {
  IFormValues,
  ITruckingPricingCreate,
  SeaPricingEdit,
  ITruckingPricingFeeFormValue,
  ITruckingPricingFeeUpdate,
  TYPE_TABS,
} from '../interface';
import { createTruckPricing, editTruckPricing } from '../fetcher';
import { STATUS_ALL_LABELS } from '@/constant/form';

export const returnFeeDTOs = (
  truckingPricingFeeDTOs?: ITruckingPricingFeeFormValue[],
  fromTruckingPricingFeeDTOs?: string[]
) => {
  const resultArray: Array<ITruckingPricingFeeUpdate> =
    truckingPricingFeeDTOs?.map((item) => ({
      truckingPricingFeeGroupID: item.truckingPricingFeeGroupID,
      feeGroupID: item.feeGroupID,
      public: item.public,
      isDelete: false,
    })) || [];

  for (const item of resultArray) {
    if (
      fromTruckingPricingFeeDTOs &&
      fromTruckingPricingFeeDTOs.includes(item.feeGroupID)
    ) {
      item.isDelete = false;
    } else {
      item.isDelete = true;
    }
  }
  if (fromTruckingPricingFeeDTOs) {
    for (const id of fromTruckingPricingFeeDTOs) {
      if (!resultArray.some((item) => item.feeGroupID === id)) {
        resultArray.push({
          feeGroupID: id,
          public: true,
          isDelete: false,
        });
      }
    }
  }
  return resultArray;
};

const CreateTruckingPricing = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (body: ITruckingPricingCreate) => {
      return createTruckPricing(body);
    },
  });

  const updateMutation = useMutation({
    mutationFn: (body: SeaPricingEdit) => {
      return editTruckPricing(body);
    },
  });

  const handleSubmit = (
    formValues: IFormValues,
    id?: string,
    truckingPricingFeeDTOs?: ITruckingPricingFeeFormValue[]
  ) => {
    const truckingPricingDetailRegisterRequests =
      formValues.truckingPricingDetailByContainerTypeDTOs.map((data) => {
        return {
          containerTypeID: data.containerTypeID,
          currencyID: data.currencyID,
          pricePricingDetail: data.price,
          vat: data.vat,
        };
      });
    const truckingPricingDetailLoadCapacityRegisterRequests =
      formValues.truckingPricingDetailByLoadCapacityDTOs.map((data) => {
        return {
          loadCapacityID: data.loadCapacityID,
          currencyID: data.currencyID,
          pricePricingDetail: data.price,
          vat: data.vat,
        };
      });
    const returnFeeDTO = returnFeeDTOs(
      truckingPricingFeeDTOs,
      formValues.truckingPricingFeeGroupDTOs
    );
    if (id) {
      const _requestData: SeaPricingEdit = {
        truckingPricingID: id || '',
        pickupID: formValues.pickupID || '',
        deliveryID: formValues.deliveryID || '',
        commodityID: formValues.commodityID || '',
        currencyID: formValues.currencyID || '',
        transitTimetruckingPricing:
          formValues.transitTimetruckingPricing || '0',
        lclTruckingPricing: formValues.lclTruckingPricing || '0',
        lclMinTruckingPricing: formValues.lclMinTruckingPricing || '0',
        note: formValues.note || '',
        public: formValues.public || true,
        effectDated: formValues.effectDated?.valueOf(),
        validityDate: formValues.validityDate?.valueOf(),
        freqDate: formValues.freqDate || '',
        seaPricingDetailUpdateRequests:
          formValues.truckingPricingDetailByContainerTypeDTOs || [],
        seaPricingFeeGroupUpdateRequests: returnFeeDTO,
        statusTruckingPricing: STATUS_ALL_LABELS.REQUEST,
      };
      updateMutation.mutate(_requestData, {
        onSuccess: (data) => {
          data.status
            ? (successToast(data.message),
              router.push(ROUTERS.TRUCKING_PRICING))
            : errorToast(data.message);
        },
        onError() {
          errorToast(API_MESSAGE.ERROR);
        },
      });
    } else {
      const _requestData: ITruckingPricingCreate = {
        pickupID: formValues.pickupID || '',
        deliveryID: formValues.deliveryID || '',
        commodityID: formValues.commodityID || '',
        currencyID: formValues.currencyID || '',
        transitTimetruckingPricing:
          formValues.transitTimetruckingPricing || '0',
        lclTruckingPricing: formValues.lclTruckingPricing || '0',
        lclMinTruckingPricing: formValues.lclMinTruckingPricing || '0',
        note: formValues.note || '',
        public: formValues.public || true,
        effectDated: formValues.effectDated?.valueOf(),
        validityDate: formValues.validityDate?.valueOf(),
        freqDate: formValues.freqDate || '',
        truckingPricingDetailRegisterRequests:
          truckingPricingDetailRegisterRequests || [],
        truckingLoadCapacityDetailRegisterRequests:
          truckingPricingDetailLoadCapacityRegisterRequests || [],
        truckingPricingFeeGroupRegisterRequests: returnFeeDTO,
        statusTruckingPricing: STATUS_ALL_LABELS.REQUEST,
      };
      createMutation.mutate(_requestData, {
        onSuccess: (data) => {
          data.status
            ? (successToast(data.message),
              router.push(ROUTERS.TRUCKING_PRICING))
            : errorToast(data.message);
        },
        onError() {
          errorToast(API_MESSAGE.ERROR);
        },
      });
    }
  };

  const handleSaveDraft = (
    formValues: IFormValues,
    id?: string,
    truckingPricingFeeDTOs?: ITruckingPricingFeeFormValue[]
  ) => {
    const truckingPricingDetailRegisterRequests =
      formValues.truckingPricingDetailByContainerTypeDTOs.map((data) => {
        return {
          containerTypeID: data.containerTypeID,
          currencyID: data.currencyID,
          pricePricingDetail: data.price,
          vat: data.vat,
        };
      });
    const truckingPricingDetailLoadCapacityRegisterRequests =
      formValues.truckingPricingDetailByLoadCapacityDTOs.map((data) => {
        return {
          loadCapacityID: data.loadCapacityID,
          currencyID: data.currencyID,
          pricePricingDetail: data.price,
          vat: data.vat,
        };
      });
    const returnFeeDTO = returnFeeDTOs(
      truckingPricingFeeDTOs,
      formValues.truckingPricingFeeGroupDTOs
    );

    if (id) {
      const _requestData: SeaPricingEdit = {
        truckingPricingID: id,
        pickupID: formValues.pickupID || '',
        deliveryID: formValues.deliveryID || '',
        commodityID: formValues.commodityID || '',
        currencyID: formValues.currencyID || '',
        transitTimetruckingPricing:
          formValues.transitTimetruckingPricing || '0',
        lclTruckingPricing: formValues.lclTruckingPricing || '0',
        lclMinTruckingPricing: formValues.lclMinTruckingPricing || '0',
        note: formValues.note || '',
        public: formValues.public || true,
        effectDated: formValues.effectDated?.valueOf(),
        validityDate: formValues.validityDate?.valueOf(),
        freqDate: formValues.freqDate || '',
        seaPricingDetailUpdateRequests:
          formValues.truckingPricingDetailByContainerTypeDTOs || [],
        seaPricingFeeGroupUpdateRequests: returnFeeDTO,
        statusTruckingPricing: STATUS_ALL_LABELS.DRAFT,
      };
      updateMutation.mutate(_requestData, {
        onSuccess: (data) => {
          data.status
            ? (successToast(data.message),
              queryClient.invalidateQueries({
                queryKey: [TYPE_TABS.GET_TRUCK_PRICING_BY_DRAFT_DATA],
              }))
            : errorToast(data.message);
        },
        onError() {
          errorToast(API_MESSAGE.ERROR);
        },
      });
    } else {
      const _requestData: ITruckingPricingCreate = {
        pickupID: formValues.pickupID || '',
        deliveryID: formValues.deliveryID || '',
        commodityID: formValues.commodityID || '',
        currencyID: formValues.currencyID || '',
        transitTimetruckingPricing:
          formValues.transitTimetruckingPricing || '0',
        lclTruckingPricing: formValues.lclTruckingPricing || '0',
        lclMinTruckingPricing: formValues.lclMinTruckingPricing || '0',
        note: formValues.note || '',
        public: formValues.public || true,
        effectDated: formValues.effectDated?.valueOf(),
        validityDate: formValues.validityDate?.valueOf(),
        freqDate: formValues.freqDate || '',
        truckingPricingDetailRegisterRequests:
          truckingPricingDetailRegisterRequests || [],
        truckingLoadCapacityDetailRegisterRequests:
          truckingPricingDetailLoadCapacityRegisterRequests || [],
        truckingPricingFeeGroupRegisterRequests: returnFeeDTO,
        statusTruckingPricing: STATUS_ALL_LABELS.DRAFT,
      };
      createMutation.mutate(_requestData, {
        onSuccess: (data) => {
          data.status
            ? (successToast(data.message),
              queryClient.invalidateQueries({
                queryKey: [TYPE_TABS.GET_TRUCK_PRICING_BY_DRAFT_DATA],
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
    <TruckingPricingForm
      create
      handleSubmit={handleSubmit}
      handleSaveDraft={handleSaveDraft}
      loadingSubmit={createMutation.isLoading || updateMutation.isLoading}
      checkRow={false}
      useDraft
    />
  );
};

export default CreateTruckingPricing;
