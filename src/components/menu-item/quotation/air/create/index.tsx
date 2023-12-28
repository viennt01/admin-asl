import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ROUTERS } from '@/constant/router';
import { errorToast, successToast } from '@/hook/toast';
import router from 'next/router';
import { API_MESSAGE } from '@/constant/message';
import AirQuotation from '../components/form';
import {
  IFormValues,
  IAirQuotationCreate,
  IAirQuotationEdit,
  IAirQuotationFeeFormValue,
  TYPE_TABS,
  ISalesLeadsAirQuotationDTOs,
  IEditSalesLeadsAirQuotationDTOs,
} from '../interface';
import { createAirPricing, editAirPricing } from '../fetcher';
import { STATUS_ALL_LABELS } from '@/constant/form';

export const returnFeeDTOs = (
  seaPricingFeeDTOs?: IAirQuotationFeeFormValue[],
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
          (item: IAirQuotationFeeFormValue) => item.feeGroupID === id
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

export const returnSaleLeads = (
  seaPricingFeeDTOs?: ISalesLeadsAirQuotationDTOs[],
  fromSeaPricingFeeDTOs?: string[]
) => {
  const resultArray: Array<IEditSalesLeadsAirQuotationDTOs> =
    seaPricingFeeDTOs?.map((item) => ({
      salesLeadsSeaQuotationID: item.salesLeadsAirQuotationID,
      partnerID: item.partnerID,
      isDelete: false,
    })) || [];

  for (const item of resultArray) {
    if (
      fromSeaPricingFeeDTOs &&
      fromSeaPricingFeeDTOs.includes(item.partnerID)
    ) {
      item.isDelete = false;
    } else {
      item.isDelete = true;
    }
  }
  if (fromSeaPricingFeeDTOs) {
    for (const id of fromSeaPricingFeeDTOs) {
      if (!resultArray.some((item) => item.partnerID === id)) {
        resultArray.push({
          partnerID: id,
          isDelete: false,
        });
      }
    }
  }
  return resultArray;
};

const CreateAirQuotation = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (body: IAirQuotationCreate) => {
      return createAirPricing(body);
    },
  });

  const updateMutation = useMutation({
    mutationFn: (body: IAirQuotationEdit) => {
      return editAirPricing(body);
    },
  });

  const handleSubmit = (
    formValues: IFormValues,
    id?: string,
    seaPricingFeeDTOs?: IAirQuotationFeeFormValue[]
  ) => {
    const returnFeeDTO = returnFeeDTOs(
      seaPricingFeeDTOs,
      formValues.airQuotaionFeeGroupDTOs
    );

    const airPricingDetailRegisterRequests =
      formValues?.airQuotationDetailDTOs?.map((data) => {
        return {
          loadCapacityID: data.loadCapacityID,
          pricePricingDetail: data.price,
        };
      }) || [];

    if (id) {
      const _requestData: IAirQuotationEdit = {
        airQuotationID: id || '',
        aodid: formValues.aodid || '',
        aolid: formValues.aolid || '',
        commodityID: formValues.commodityID || '',
        note: formValues.note || '',
        validityDate: formValues.validityDate?.valueOf(),
        effectDated: formValues.effectDated?.valueOf(),
        freqDate: formValues.freqDate || '',
        currencyID: formValues.currencyID || '',
        vendorID: formValues.vendorID || '',
        transitTimeAirQuotation: formValues.transitTimeAirQuotation || '',
        hscAirQuotation: formValues.hscAirQuotation || '',
        sscAirQuotation: formValues.sscAirQuotation || '',
        loadCapacityMinAirQuotation:
          formValues.loadCapacityMinAirQuotation || '',
        priceLoadCapacityMinAirQuotation:
          formValues.priceLoadCapacityMinAirQuotation || '',
        gw: formValues.gw,
        public: formValues.public || true,
        forNewUser: formValues.forNewUser || false,
        airQuotationDetailRegisterRequests:
          formValues.airQuotationDetailDTOs || [],
        airQuotationFeeGroupRegisterRequests: returnFeeDTO,
        statusAirQuotation: STATUS_ALL_LABELS.REQUEST,
      };
      updateMutation.mutate(_requestData, {
        onSuccess: (data) => {
          data.status
            ? (successToast(data.message), router.push(ROUTERS.AIR_QUOTATION))
            : errorToast(data.message);
        },
        onError() {
          errorToast(API_MESSAGE.ERROR);
        },
      });
    } else {
      const salesLeadsQuotationRegisters =
        formValues.salesLeadsAirQuotationDTOs?.map((id) => ({
          partnerID: id,
        })) || [];
      const _requestData: IAirQuotationCreate = {
        aodid: formValues.aodid || '',
        aolid: formValues.aolid || '',
        commodityID: formValues.commodityID || '',
        note: formValues.note || '',
        validityDate: formValues.validityDate?.valueOf(),
        effectDated: formValues.effectDated?.valueOf(),
        freqDate: formValues.freqDate || '',
        currencyID: formValues.currencyID || '',
        vendorID: formValues.vendorID || '',
        transitTimeAirQuotation: formValues.transitTimeAirQuotation || '',
        hscAirQuotation: formValues.hscAirQuotation || '',
        sscAirQuotation: formValues.sscAirQuotation || '',
        loadCapacityMinAirQuotation:
          formValues.loadCapacityMinAirQuotation || '',
        priceLoadCapacityMinAirQuotation:
          formValues.priceLoadCapacityMinAirQuotation || '',
        gw: formValues.gw,
        public: formValues.public || true,
        forNewUser: formValues.forNewUser || false,
        airQuotationDetailRegisterRequests: airPricingDetailRegisterRequests,
        airQuotationFeeGroupRegisterRequests: returnFeeDTO,
        salesLeadsQuotationRegisters: salesLeadsQuotationRegisters,
        statusAirQuotation: STATUS_ALL_LABELS.REQUEST,
      };
      createMutation.mutate(_requestData, {
        onSuccess: (data) => {
          data.status
            ? (successToast(data.message), router.push(ROUTERS.AIR_QUOTATION))
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
    seaPricingFeeDTOs?: IAirQuotationFeeFormValue[]
  ) => {
    const airPricingDetailRegisterRequests =
      formValues?.airQuotationDetailDTOs?.map((data) => {
        return {
          loadCapacityID: data.loadCapacityID,
          pricePricingDetail: data.price,
        };
      }) || [];
    const returnFeeDTO = returnFeeDTOs(
      seaPricingFeeDTOs,
      formValues.airQuotaionFeeGroupDTOs
    );
    if (id) {
      const _requestData: IAirQuotationEdit = {
        airQuotationID: id || '',
        aodid: formValues.aodid || '',
        aolid: formValues.aolid || '',
        commodityID: formValues.commodityID || '',
        note: formValues.note || '',
        validityDate: formValues.validityDate?.valueOf(),
        effectDated: formValues.effectDated?.valueOf(),
        freqDate: formValues.freqDate || '',
        currencyID: formValues.currencyID || '',
        vendorID: formValues.vendorID || '',
        transitTimeAirQuotation: formValues.transitTimeAirQuotation || '',
        hscAirQuotation: formValues.hscAirQuotation || '',
        sscAirQuotation: formValues.sscAirQuotation || '',
        loadCapacityMinAirQuotation:
          formValues.loadCapacityMinAirQuotation || '',
        priceLoadCapacityMinAirQuotation:
          formValues.priceLoadCapacityMinAirQuotation || '',
        gw: formValues.gw,
        public: formValues.public || true,
        forNewUser: formValues.forNewUser || false,
        airQuotationDetailRegisterRequests:
          formValues.airQuotationDetailDTOs || [],
        airQuotationFeeGroupRegisterRequests: returnFeeDTO,
        statusAirQuotation: STATUS_ALL_LABELS.DRAFT,
      };
      updateMutation.mutate(_requestData, {
        onSuccess: (data) => {
          data.status
            ? (successToast(data.message),
              queryClient.invalidateQueries({
                queryKey: [TYPE_TABS.GET_AIR_QUOTATION_BY_DRAFT_DATA],
              }))
            : errorToast(data.message);
        },
        onError() {
          errorToast(API_MESSAGE.ERROR);
        },
      });
    } else {
      const salesLeadsQuotationRegisters =
        formValues.salesLeadsAirQuotationDTOs?.map((id) => ({
          partnerID: id,
        })) || [];
      const _requestData: IAirQuotationCreate = {
        aodid: formValues.aodid || '',
        aolid: formValues.aolid || '',
        commodityID: formValues.commodityID || '',
        note: formValues.note || '',
        validityDate: formValues.validityDate?.valueOf(),
        effectDated: formValues.effectDated?.valueOf(),
        freqDate: formValues.freqDate || '',
        currencyID: formValues.currencyID || '',
        vendorID: formValues.vendorID || '',
        transitTimeAirQuotation: formValues.transitTimeAirQuotation || '',
        hscAirQuotation: formValues.hscAirQuotation || '',
        sscAirQuotation: formValues.sscAirQuotation || '',
        loadCapacityMinAirQuotation:
          formValues.loadCapacityMinAirQuotation || '',
        priceLoadCapacityMinAirQuotation:
          formValues.priceLoadCapacityMinAirQuotation || '',
        gw: formValues.gw,
        public: formValues.public || true,
        forNewUser: formValues.forNewUser || false,
        airQuotationDetailRegisterRequests: airPricingDetailRegisterRequests,
        airQuotationFeeGroupRegisterRequests: returnFeeDTO,
        salesLeadsQuotationRegisters: salesLeadsQuotationRegisters,
        statusAirQuotation: STATUS_ALL_LABELS.DRAFT,
      };
      createMutation.mutate(_requestData, {
        onSuccess: (data) => {
          data.status
            ? (successToast(data.message),
              queryClient.invalidateQueries({
                queryKey: [TYPE_TABS.GET_AIR_QUOTATION_BY_DRAFT_DATA],
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
    <AirQuotation
      create
      handleSubmit={handleSubmit}
      handleSaveDraft={handleSaveDraft}
      loadingSubmit={createMutation.isLoading || updateMutation.isLoading}
      checkRow={false}
      useDraft
    />
  );
};

export default CreateAirQuotation;
