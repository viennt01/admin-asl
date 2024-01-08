import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ROUTERS } from '@/constant/router';
import { errorToast, successToast } from '@/hook/toast';
import router from 'next/router';
import { API_MESSAGE } from '@/constant/message';
import AirPricing from '../components/form';
import {
  FormValues,
  AirPricingCreate,
  AirPricingEdit,
  AirPricingFeeFormValue,
  TYPE_TABS,
} from '../interface';
import { createAirPricing, editAirPricing } from '../fetcher';
import { STATUS_ALL_LABELS } from '@/constant/form';

export const returnFeeDTOs = (
  seaPricingFeeDTOs?: AirPricingFeeFormValue[],
  fromSeaPricingFeeDTOs?: string[]
) => {
  const resultArray = JSON.parse(
    JSON.stringify(
      seaPricingFeeDTOs?.map((item) => ({
        seaPricingFeeGroupID: item.airPricingFeeGroupID,
        feeGroupID: item.feeGroupID,
        public: item.public,
      }))
    )
  );

  for (const item of resultArray) {
    if (
      fromSeaPricingFeeDTOs &&
      fromSeaPricingFeeDTOs.includes(item.feeGroupID)
    ) {
      item.isDelete = false;
    } else {
      item.isDelete = true;
    }
  }
  if (fromSeaPricingFeeDTOs) {
    for (const id of fromSeaPricingFeeDTOs) {
      if (
        !resultArray.some(
          (item: AirPricingFeeFormValue) => item.feeGroupID === id
        )
      ) {
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

  const handleSubmit = (
    formValues: FormValues,
    id?: string,
    seaPricingFeeDTOs?: AirPricingFeeFormValue[]
  ) => {
    const airPricingDetailRegisterRequests =
      formValues.airPricingDetailDTOs.map((data) => {
        return {
          loadCapacityID: data.loadCapacityID,
          pricePricingDetail: data.price,
        };
      });
    const returnFeeDTO = returnFeeDTOs(
      seaPricingFeeDTOs,
      formValues.airPricingFeeDTOs
    );
    if (id) {
      const _requestData: AirPricingEdit = {
        airPricingID: id || '',
        aodid: formValues.aodid || '',
        aolid: formValues.aolid || '',
        commodityID: formValues.commodityID || '',
        note: formValues.note || '',
        validityDate: formValues.validityDate?.valueOf(),
        effectDated: formValues.effectDated?.valueOf(),
        freqDate: formValues.freqDate || '',
        currencyID: formValues.currencyID || '',
        vendorID: formValues.vendorID || '',
        transitTimeAirPricing: formValues.transitTimeAirPricing || '',
        fscAirPricing: formValues.fscAirPricing || '0',
        sscAirPricing: formValues.sscAirPricing || '0',
        loadCapacityMinAirPricing: formValues.loadCapacityMinAirPricing || '0',
        priceLoadCapacityMinAirPricing:
          formValues.priceLoadCapacityMinAirPricing || '0',
        gw: formValues.gw,
        public: formValues.public || true,
        airPricingDetailUpdateRequests: formValues.airPricingDetailDTOs || [],
        airPricingFeeGroupUpdateRequests: returnFeeDTO,
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
        validityDate: formValues.validityDate?.valueOf(),
        effectDated: formValues.effectDated?.valueOf(),
        freqDate: formValues.freqDate || '',
        gw: formValues.gw,
        vendorID: formValues.vendorID || '',
        transitTimeAirPricing: formValues.transitTimeAirPricing || '',
        fscAirPricing: formValues.fscAirPricing || '0',
        sscAirPricing: formValues.sscAirPricing || '0',
        loadCapacityMinAirPricing: formValues.loadCapacityMinAirPricing || '0',
        priceLoadCapacityMinAirPricing:
          formValues.priceLoadCapacityMinAirPricing || '0',
        currencyID: formValues.currencyID || '',
        public: formValues.public || true,
        airPricingDetailRegisterRequests:
          airPricingDetailRegisterRequests || [],
        airPricingFeeGroupRegisterRequests: returnFeeDTO,
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

  const handleSaveDraft = (
    formValues: FormValues,
    id?: string,
    seaPricingFeeDTOs?: AirPricingFeeFormValue[]
  ) => {
    const airPricingDetailRegisterRequests =
      formValues.airPricingDetailDTOs.map((data) => {
        return {
          loadCapacityID: data.loadCapacityID,
          pricePricingDetail: data.price,
        };
      });
    const returnFeeDTO = returnFeeDTOs(
      seaPricingFeeDTOs,
      formValues.airPricingFeeDTOs
    );
    if (id) {
      const _requestData: AirPricingEdit = {
        airPricingID: id,
        aodid: formValues.aodid || '',
        aolid: formValues.aolid || '',
        commodityID: formValues.commodityID || '',
        note: formValues.note || '',
        validityDate: formValues.validityDate?.valueOf(),
        effectDated: formValues.effectDated?.valueOf(),
        freqDate: formValues.freqDate || '',
        gw: formValues.gw,
        vendorID: formValues.vendorID || '',
        transitTimeAirPricing: formValues.transitTimeAirPricing || '',
        fscAirPricing: formValues.fscAirPricing || '0',
        sscAirPricing: formValues.sscAirPricing || '0',
        loadCapacityMinAirPricing: formValues.loadCapacityMinAirPricing || '0',
        priceLoadCapacityMinAirPricing:
          formValues.priceLoadCapacityMinAirPricing || '0',
        currencyID: formValues.currencyID || '',
        public: formValues.public || true,
        airPricingDetailUpdateRequests: formValues.airPricingDetailDTOs || [],
        airPricingFeeGroupUpdateRequests: returnFeeDTO,
        statusAirPricing: STATUS_ALL_LABELS.DRAFT,
      };
      updateMutation.mutate(_requestData, {
        onSuccess: (data) => {
          data.status
            ? (successToast(data.message),
              queryClient.invalidateQueries({
                queryKey: [TYPE_TABS.GET_AIR_PRICING_BY_DRAFT_DATA],
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
        validityDate: formValues.validityDate?.valueOf(),
        effectDated: formValues.effectDated?.valueOf(),
        freqDate: formValues.freqDate || '',
        gw: formValues.gw,
        vendorID: formValues.vendorID || '',
        transitTimeAirPricing: formValues.transitTimeAirPricing || '',
        fscAirPricing: formValues.fscAirPricing || '0',
        sscAirPricing: formValues.sscAirPricing || '0',
        loadCapacityMinAirPricing: formValues.loadCapacityMinAirPricing || '0',
        priceLoadCapacityMinAirPricing:
          formValues.priceLoadCapacityMinAirPricing || '0',
        currencyID: formValues.currencyID || '',
        public: formValues.public || true,
        airPricingDetailRegisterRequests:
          airPricingDetailRegisterRequests || [],
        airPricingFeeGroupRegisterRequests: returnFeeDTO,
        statusAirPricing: STATUS_ALL_LABELS.DRAFT,
      };
      createMutation.mutate(_requestData, {
        onSuccess: (data) => {
          data.status
            ? (successToast(data.message),
              queryClient.invalidateQueries({
                queryKey: [TYPE_TABS.GET_AIR_PRICING_BY_DRAFT_DATA],
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
