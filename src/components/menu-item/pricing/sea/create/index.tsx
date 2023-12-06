import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ROUTERS } from '@/constant/router';
import { errorToast, successToast } from '@/hook/toast';
import router from 'next/router';
import { API_MESSAGE } from '@/constant/message';
import SeaPricing from '../components/form';
import {
  FormValues,
  SeaPricingCreate,
  SeaPricingEdit,
  SeaPricingFeeFormValue,
  SeaPricingFeeUpdate,
} from '../interface';
import { createSeaPricing, editSeaPricing } from '../fetcher';
import { STATUS_ALL_LABELS } from '@/constant/form';
import { API_SEA_PRICING } from '@/fetcherAxios/endpoint';
import { AppContext } from '@/app-context';
import { useContext } from 'react';
import { ROLE } from '@/constant/permission';

export const returnFeeDTOs = (
  seaPricingFeeDTOs?: SeaPricingFeeFormValue[],
  fromSeaPricingFeeDTOs?: string[]
) => {
  const resultArray: Array<SeaPricingFeeUpdate> =
    seaPricingFeeDTOs?.map((item) => ({
      seaPricingFeeGroupID: item.seaPricingFeeGroupID,
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

const CreateSeaPricing = () => {
  const queryClient = useQueryClient();
  const { role, userInfo } = useContext(AppContext);

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

  const handleSubmit = (
    formValues: FormValues,
    id?: string,
    seaPricingFeeDTOs?: SeaPricingFeeFormValue[]
  ) => {
    const seaPricingDetailRegisterRequests =
      formValues.seaPricingDetailDTOs.map((data) => {
        return {
          containerTypeID: data.containerTypeID,
          currencyID: data.currencyID,
          pricePricingDetail: data.price,
        };
      });
    const returnFeeDTO = returnFeeDTOs(
      seaPricingFeeDTOs,
      formValues.seaPricingFeeGroupDTOs
    );
    if (id) {
      const _requestData: SeaPricingEdit = {
        seaPricingID: id || '',
        podid: formValues.podid || '',
        polid: formValues.polid || '',
        commodityID: formValues.commodityID || '',
        vendorID:
          role === ROLE.MANAGER || role === ROLE.SALE
            ? formValues.vendorID || ''
            : userInfo?.userID || '',
        note: formValues.note || '',
        dateEffect: formValues.dateEffect?.valueOf(),
        validityDate: formValues.validityDate?.valueOf(),
        freqDate: formValues.freqDate || '',
        demSeaPricing: formValues.demSeaPricing || '0',
        detSeaPricing: formValues.detSeaPricing || '0',
        stoSeaPricing: formValues.stoSeaPricing || '0',
        lclMinSeaPricing: formValues.lclMinSeaPricing || '0',
        lclSeaPricing: formValues.lclSeaPricing || '0',
        currencyID: formValues.currencyID || '',
        public: formValues.public || true,
        seaPricingDetailUpdateRequests: formValues.seaPricingDetailDTOs || [],
        seaPricingFeeGroupUpdateRequests: returnFeeDTO,
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
        vendorID:
          role === ROLE.MANAGER || role === ROLE.SALE
            ? formValues.vendorID || ''
            : userInfo?.userID || '',
        note: formValues.note || '',
        dateEffect: formValues.dateEffect?.valueOf(),
        validityDate: formValues.validityDate?.valueOf(),
        freqDate: formValues.freqDate || '',
        demSeaPricing: formValues.demSeaPricing || '0',
        detSeaPricing: formValues.detSeaPricing || '0',
        stoSeaPricing: formValues.stoSeaPricing || '0',
        lclMinSeaPricing: formValues.lclMinSeaPricing || '0',
        lclSeaPricing: formValues.lclSeaPricing || '0',
        currencyID: formValues.currencyID || '',
        public: formValues.public || true,
        seaPricingDetailRegisterRequests:
          seaPricingDetailRegisterRequests || [],
        seaPricingFeeGroupRegisterRequests: returnFeeDTO,
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

  const handleSaveDraft = (
    formValues: FormValues,
    id?: string,
    seaPricingFeeDTOs?: SeaPricingFeeFormValue[]
  ) => {
    const seaPricingDetailRegisterRequests =
      formValues.seaPricingDetailDTOs.map((data) => {
        return {
          containerTypeID: data.containerTypeID,
          currencyID: data.currencyID,
          pricePricingDetail: data.price,
        };
      });
    const returnFeeDTO = returnFeeDTOs(
      seaPricingFeeDTOs,
      formValues.seaPricingFeeGroupDTOs
    );

    if (id) {
      const _requestData: SeaPricingEdit = {
        seaPricingID: id,
        podid: formValues.podid || '',
        polid: formValues.polid || '',
        commodityID: formValues.commodityID || '',
        vendorID:
          role === ROLE.MANAGER || role === ROLE.SALE
            ? formValues.vendorID || ''
            : userInfo?.userID || '',
        note: formValues.note || '',
        dateEffect: formValues.dateEffect?.valueOf(),
        validityDate: formValues.validityDate?.valueOf(),
        freqDate: formValues.freqDate || '',
        demSeaPricing: formValues.demSeaPricing || '0',
        detSeaPricing: formValues.detSeaPricing || '0',
        stoSeaPricing: formValues.stoSeaPricing || '0',
        lclMinSeaPricing: formValues.lclMinSeaPricing || '0',
        lclSeaPricing: formValues.lclSeaPricing || '0',
        currencyID: formValues.currencyID || '',
        public: formValues.public || true,
        seaPricingDetailUpdateRequests: formValues.seaPricingDetailDTOs || [],
        seaPricingFeeGroupUpdateRequests: returnFeeDTO,
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
        vendorID:
          role === ROLE.MANAGER || role === ROLE.SALE
            ? formValues.vendorID || ''
            : userInfo?.userID || '',
        note: formValues.note || '',
        dateEffect: formValues.dateEffect?.valueOf(),
        validityDate: formValues.validityDate?.valueOf(),
        freqDate: formValues.freqDate || '',
        demSeaPricing: formValues.demSeaPricing || '0',
        detSeaPricing: formValues.detSeaPricing || '0',
        stoSeaPricing: formValues.stoSeaPricing || '0',
        lclMinSeaPricing: formValues.lclMinSeaPricing || '0',
        lclSeaPricing: formValues.lclSeaPricing || '0',
        currencyID: formValues.currencyID || '',
        public: formValues.public || true,
        seaPricingDetailRegisterRequests:
          seaPricingDetailRegisterRequests || [],
        seaPricingFeeGroupRegisterRequests: returnFeeDTO,
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
