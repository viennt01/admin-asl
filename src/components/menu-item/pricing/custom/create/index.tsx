import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ROUTERS } from '@/constant/router';
import { errorToast, successToast } from '@/hook/toast';
import router from 'next/router';
import { API_MESSAGE } from '@/constant/message';
import CustomPricing from '../components/form';
import {
  IFormValues,
  ICustomPricingCreate,
  ICustomPricingEdit,
  ICustomPricingFeeFormValue,
  ICustomPricingFeeUpdate,
  TYPE_TABS,
} from '../interface';
import { createCustomPricing, editCustomPricing } from '../fetcher';
import { STATUS_ALL_LABELS } from '@/constant/form';

export const returnFeeDTOs = (
  seaPricingFeeDTOs?: ICustomPricingFeeFormValue[],
  fromSeaPricingFeeDTOs?: string[]
) => {
  const resultArray: Array<ICustomPricingFeeUpdate> =
    seaPricingFeeDTOs?.map((item) => ({
      customPricingFeeGroupID: item.customPricingFeeGroupID,
      feeGroupID: item.feeGroupID,
      public: item.public,
      isDelete: false,
    })) || [];

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

const CreateCustomPricing = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (body: ICustomPricingCreate) => {
      return createCustomPricing(body);
    },
  });

  const updateMutation = useMutation({
    mutationFn: (body: ICustomPricingEdit) => {
      return editCustomPricing(body);
    },
  });

  const handleSubmit = (
    formValues: IFormValues,
    id?: string,
    seaPricingFeeDTOs?: ICustomPricingFeeFormValue[]
  ) => {
    const returnFeeDTO = returnFeeDTOs(
      seaPricingFeeDTOs,
      formValues.customPricingFeeGroupDTOs
    );
    if (id) {
      const _requestData: ICustomPricingEdit = {
        customPricingID: id || '',
        typeDelaracrionID: formValues.typeDelaracrionID || '',
        vendorID: formValues.vendorID || '',
        commodityID: formValues.commodityID || '',
        currencyID: formValues.currencyID || '',
        transactionTypeID: formValues.transactionTypeID || '',
        note: formValues.note || '',
        effectDated: formValues.effectDated?.valueOf(),
        validityDate: formValues.validityDate?.valueOf(),
        public: formValues.public || true,
        statusCustomPricing: STATUS_ALL_LABELS.REQUEST,
      };
      updateMutation.mutate(_requestData, {
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
      const _requestData: ICustomPricingCreate = {
        typeDelaracrionID: formValues.typeDelaracrionID || '',
        commodityID: formValues.commodityID || '',
        vendorID: formValues.vendorID || '',
        currencyID: formValues.currencyID || '',
        transactionTypeID: formValues.transactionTypeID || '',
        note: formValues.note || '',
        effectDated: formValues.effectDated?.valueOf(),
        validityDate: formValues.validityDate?.valueOf(),
        public: formValues.public || true,
        customPricingFeeGroupRegisterRequests: returnFeeDTO,
        customPricingLCLDetailRegisterRequest:
          formValues.customPricingLCLDetailDTO,
        customPricingFCLDetailRegisterRequests:
          formValues.customPricingFCLDetailDTOs,
        customPricingAirDetailRegisterRequest:
          formValues.customPricingAirDetailDTO,
        statusCustomPricing: STATUS_ALL_LABELS.REQUEST,
      };
      console.log(formValues.customPricingFCLDetailDTOs);

      createMutation.mutate(_requestData, {
        onSuccess: (data) => {
          data.status
            ? (successToast(data.message), router.push(ROUTERS.CUSTOMS_PRICING))
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
    seaPricingFeeDTOs?: ICustomPricingFeeFormValue[]
  ) => {
    const returnFeeDTO = returnFeeDTOs(
      seaPricingFeeDTOs,
      formValues.customPricingFeeGroupDTOs
    );

    if (id) {
      const _requestData: ICustomPricingEdit = {
        customPricingID: id,
        typeDelaracrionID: formValues.typeDelaracrionID || '',
        commodityID: formValues.commodityID || '',
        vendorID: formValues.vendorID || '',
        currencyID: formValues.currencyID || '',
        transactionTypeID: formValues.transactionTypeID || '',
        note: formValues.note || '',
        effectDated: formValues.effectDated?.valueOf(),
        validityDate: formValues.validityDate?.valueOf(),
        public: formValues.public || true,
        statusCustomPricing: STATUS_ALL_LABELS.DRAFT,
      };
      updateMutation.mutate(_requestData, {
        onSuccess: (data) => {
          data.status
            ? (successToast(data.message),
              queryClient.invalidateQueries({
                queryKey: [TYPE_TABS.GET_CUSTOM_PRICING_BY_DRAFT_DATA],
              }))
            : errorToast(data.message);
        },
        onError() {
          errorToast(API_MESSAGE.ERROR);
        },
      });
    } else {
      const _requestData: ICustomPricingCreate = {
        typeDelaracrionID: formValues.typeDelaracrionID || '',
        commodityID: formValues.commodityID || '',
        vendorID: formValues.vendorID || '',
        currencyID: formValues.currencyID || '',
        transactionTypeID: formValues.transactionTypeID || '',
        note: formValues.note || '',
        effectDated: formValues.effectDated?.valueOf(),
        validityDate: formValues.validityDate?.valueOf(),
        public: formValues.public || true,
        customPricingFeeGroupRegisterRequests: returnFeeDTO,
        customPricingLCLDetailRegisterRequest:
          formValues.customPricingLCLDetailDTO,
        customPricingFCLDetailRegisterRequests:
          formValues.customPricingFCLDetailDTOs,
        customPricingAirDetailRegisterRequest:
          formValues.customPricingAirDetailDTO,
        statusCustomPricing: STATUS_ALL_LABELS.DRAFT,
      };
      createMutation.mutate(_requestData, {
        onSuccess: (data) => {
          data.status
            ? (successToast(data.message),
              queryClient.invalidateQueries({
                queryKey: [TYPE_TABS.GET_CUSTOM_PRICING_BY_DRAFT_DATA],
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
    <CustomPricing
      create
      handleSubmit={handleSubmit}
      handleSaveDraft={handleSaveDraft}
      loadingSubmit={createMutation.isLoading || updateMutation.isLoading}
      checkRow={false}
      useDraft
    />
  );
};

export default CreateCustomPricing;
