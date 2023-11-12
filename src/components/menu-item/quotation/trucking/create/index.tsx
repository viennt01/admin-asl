import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ROUTERS } from '@/constant/router';
import { errorToast, successToast } from '@/hook/toast';
import router from 'next/router';
import { API_MESSAGE } from '@/constant/message';
import TruckQuotation from '../components/form';
import {
  IFormValues,
  ITruckQuotationCreate,
  ISeaQuotationDetailDTOsUpdate,
  ITruckQuotationEdit,
  ITruckQuotationFeeFormValue,
  IContainerDTOFormValue,
  ISalesLeadsSeaQuotationDTOs,
  IEditSalesLeadsSeaQuotationDTOs,
  ILoadCapacityDTOFormValue,
} from '../interface';
import { createSeaQuotation, editSeaQuotation } from '../fetcher';
import { STATUS_ALL_LABELS } from '@/constant/form';
import { API_TRUCKING_QUOTATION } from '@/fetcherAxios/endpoint';

export const returnQuotationDetails = (
  old?: IContainerDTOFormValue[],
  newData?: ISeaQuotationDetailDTOsUpdate[]
) => {
  if (!newData) {
    return [];
  }
  const mergedData = old?.map((oldItem) => {
    const newItem = newData.find(
      (newItem) =>
        newItem.truckingQuotationDetailByContainerTypeID ===
          oldItem.truckingQuotationDetailByContainerTypeID &&
        newItem.containerTypeID === oldItem.containerTypeID
    );

    if (newItem) {
      return {
        ...oldItem,
        ...newItem,
        isDelete: false,
      };
    }

    return { ...oldItem, isDelete: true };
  });

  const itemsInNewButNotInOld = newData
    .filter(
      (newItem) =>
        !old?.some(
          (oldItem) =>
            newItem.truckingQuotationDetailByContainerTypeID ===
              oldItem.truckingQuotationDetailByContainerTypeID &&
            newItem.containerTypeID === oldItem.containerTypeID
        )
    )
    .map((newItem) => ({ ...newItem, isDelete: false }));

  const result = [...(mergedData ?? []), ...(itemsInNewButNotInOld ?? [])].map(
    ({ ...rest }) => rest
  );

  return result;
};

export const returnSaleLeads = (
  seaPricingFeeDTOs?: ISalesLeadsSeaQuotationDTOs[],
  fromSeaPricingFeeDTOs?: string[]
) => {
  const resultArray: Array<IEditSalesLeadsSeaQuotationDTOs> =
    seaPricingFeeDTOs?.map((item) => ({
      salesLeadsSeaQuotationID: item.salesLeadsTruckingQuotationID,
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

const CreateSeaQuotation = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (body: ITruckQuotationCreate) => {
      return createSeaQuotation(body);
    },
  });

  const updateMutation = useMutation({
    mutationFn: (body: ITruckQuotationEdit) => {
      return editSeaQuotation(body);
    },
  });

  const handleSubmit = (
    formValues: IFormValues,
    id?: string,
    feeDTOs?: ITruckQuotationFeeFormValue[],
    containerDetail?: IContainerDTOFormValue[],
    loadCapacityDetail?: ILoadCapacityDTOFormValue[],
    salesLeads?: ISalesLeadsSeaQuotationDTOs[]
  ) => {
    const containerDetailRegisterRequests =
      formValues.truckingQuotationDetailByContainerTypeDTOs.map((data) => {
        return {
          containerTypeID: data.containerTypeID,
          priceQuotationDetail: data.price,
        };
      });

    const loadCapacityDetailRegisterRequests =
      formValues.truckingQuotationDetailByLoadCapacityDTOs.map((data) => {
        return {
          loadCapacityID: data.loadCapacityID,
          pricePricingDetail: data.price,
        };
      });

    const returnQuotationDetail = returnQuotationDetails(
      containerDetail,
      formValues.truckingQuotationDetailByContainerTypeDTOs
    );

    if (id) {
      const returnSaleLead = returnSaleLeads(
        salesLeads,
        formValues.salesLeadsTruckingQuotationDTOs
      );
      const _requestData: ITruckQuotationEdit = {
        truckingQuotationID: id || '',
        pickupID: formValues.pickupID || '',
        deliveryID: formValues.deliveryID || '',
        emtyPickupID: formValues.emtyPickupID || '',
        commodityID: formValues.commodityID || '',
        currencyID: formValues.currencyID || '',
        partnerID: formValues.vendor || '',
        note: formValues.note || '',
        effectDated: formValues.dateEffect?.valueOf(),
        validityDate: formValues.validityDate?.valueOf(),
        freqDate: formValues.freqDate || '',
        lclMinTruckingQuotation: formValues.lclMinTruckingQuotation || '',
        lclTruckingQuotation: formValues.lclTruckingQuotation || '',
        public: formValues.public || true,
        seaQuotationDetailUpdateRequests:
          (returnQuotationDetail as unknown as ISeaQuotationDetailDTOsUpdate[]) ||
          [],
        // seaPricingFeeGroupUpdateRequests: returnFeeDTO,
        salesLeadsSeaQuotationUpdateRequests: returnSaleLead || [],
        statusTruckingQuotation: STATUS_ALL_LABELS.REQUEST,
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
      const salesLeadsQuotationRegisters =
        formValues.salesLeadsTruckingQuotationDTOs?.map((id) => ({
          partnerID: id,
        })) || [];
      const truckQuotationPartnerRoleRegisters =
        formValues.truckingQuotaionGroupPartnerDTOs?.map((id) => ({
          groupPartnerID: id,
        })) || [];

      const truckQuotationFeeGroupRegisterRequests =
        formValues.truckingQuotaionGroupPartnerDTOs?.map((id) => ({
          feeGroupID: id,
        })) || [];

      const _requestData: ITruckQuotationCreate = {
        pickupID: formValues.pickupID || '',
        deliveryID: formValues.deliveryID || '',
        emtyPickupID: formValues.emtyPickupID || '',
        commodityID: formValues.commodityID || '',
        currencyID: formValues.currencyID || '',
        partnerID: formValues.vendor || '',
        note: formValues.note || '',
        effectDated: formValues.dateEffect?.valueOf(),
        validityDate: formValues.validityDate?.valueOf(),
        freqDate: formValues.freqDate || '',
        lclMinTruckingQuotation: formValues.lclMinTruckingQuotation || '',
        lclTruckingQuotation: formValues.lclTruckingQuotation || '',
        public: formValues.public || true,
        truckingQuotationDetailRegisterRequests:
          containerDetailRegisterRequests || [],
        truckingLoadCapacityDetailRegisterRequests:
          loadCapacityDetailRegisterRequests || [],
        truckingQuotationFeeGroupRegisterRequests:
          truckQuotationFeeGroupRegisterRequests || [],
        salesLeadsQuotationRegisters: salesLeadsQuotationRegisters,
        truckingQuotationGroupPartnerRegisterRequests:
          truckQuotationPartnerRoleRegisters,
        statusTruckingQuotation: STATUS_ALL_LABELS.REQUEST,
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
    feeDTOs?: ITruckQuotationFeeFormValue[],
    containerDetail?: IContainerDTOFormValue[],
    loadCapacityDetail?: ILoadCapacityDTOFormValue[],
    salesLeads?: ISalesLeadsSeaQuotationDTOs[]
  ) => {
    const truckQuotationDetailRegisterRequests =
      formValues.truckingQuotationDetailByContainerTypeDTOs.map((data) => {
        return {
          containerTypeID: data.containerTypeID,
          currencyID: data.currencyID,
          priceQuotationDetail: data.price,
        };
      });

    const loadCapacityDetailRegisterRequests =
      formValues.truckingQuotationDetailByLoadCapacityDTOs.map((data) => {
        return {
          loadCapacityID: data.loadCapacityID,
          pricePricingDetail: data.price,
        };
      });

    const returnQuotationDetail = returnQuotationDetails(
      containerDetail,
      formValues.truckingQuotationDetailByContainerTypeDTOs
    );
    if (id) {
      const returnSaleLead = returnSaleLeads(
        salesLeads,
        formValues.salesLeadsTruckingQuotationDTOs
      );
      const _requestData: ITruckQuotationEdit = {
        truckingQuotationID: id,
        pickupID: formValues.pickupID || '',
        deliveryID: formValues.deliveryID || '',
        emtyPickupID: formValues.emtyPickupID || '',
        commodityID: formValues.commodityID || '',
        currencyID: formValues.currencyID || '',
        partnerID: formValues.vendor || '',
        note: formValues.note || '',
        effectDated: formValues.dateEffect?.valueOf(),
        validityDate: formValues.validityDate?.valueOf(),
        freqDate: formValues.freqDate || '',
        lclMinTruckingQuotation: formValues.lclMinTruckingQuotation || '',
        lclTruckingQuotation: formValues.lclTruckingQuotation || '',
        public: formValues.public || true,
        seaQuotationDetailUpdateRequests:
          (returnQuotationDetail as unknown as ISeaQuotationDetailDTOsUpdate[]) ||
          [],
        salesLeadsSeaQuotationUpdateRequests: returnSaleLead || [],
        statusTruckingQuotation: STATUS_ALL_LABELS.DRAFT,
      };

      updateMutation.mutate(_requestData, {
        onSuccess: (data) => {
          data.status
            ? (successToast(data.message),
              queryClient.invalidateQueries({
                queryKey: [API_TRUCKING_QUOTATION.GET_SEARCH],
              }))
            : errorToast(data.message);
        },
        onError() {
          errorToast(API_MESSAGE.ERROR);
        },
      });
    } else {
      const salesLeadsQuotationRegisters =
        formValues.salesLeadsTruckingQuotationDTOs?.map((id) => ({
          partnerID: id,
        })) || [];
      const truckQuotationPartnerRoleRegisters =
        formValues.truckingQuotaionGroupPartnerDTOs?.map((id) => ({
          groupPartnerID: id,
        })) || [];
      const truckQuotationFeeGroupRegisterRequests =
        formValues.truckingQuotaionGroupPartnerDTOs?.map((id) => ({
          feeGroupID: id,
        })) || [];

      const _requestData: ITruckQuotationCreate = {
        pickupID: formValues.pickupID || '',
        deliveryID: formValues.deliveryID || '',
        emtyPickupID: formValues.emtyPickupID || '',
        commodityID: formValues.commodityID || '',
        currencyID: formValues.currencyID || '',
        partnerID: formValues.vendor || '',
        note: formValues.note || '',
        effectDated: formValues.dateEffect?.valueOf(),
        validityDate: formValues.validityDate?.valueOf(),
        freqDate: formValues.freqDate || '',
        lclMinTruckingQuotation: formValues.lclMinTruckingQuotation || '',
        lclTruckingQuotation: formValues.lclTruckingQuotation || '',
        public: formValues.public || true,
        truckingQuotationDetailRegisterRequests:
          truckQuotationDetailRegisterRequests || [],
        truckingLoadCapacityDetailRegisterRequests:
          loadCapacityDetailRegisterRequests || [],
        truckingQuotationFeeGroupRegisterRequests:
          truckQuotationFeeGroupRegisterRequests || [],
        salesLeadsQuotationRegisters: salesLeadsQuotationRegisters,
        truckingQuotationGroupPartnerRegisterRequests:
          truckQuotationPartnerRoleRegisters,
        statusTruckingQuotation: STATUS_ALL_LABELS.DRAFT,
      };

      createMutation.mutate(_requestData, {
        onSuccess: (data) => {
          data.status
            ? (successToast(data.message),
              queryClient.invalidateQueries({
                queryKey: [API_TRUCKING_QUOTATION.GET_SEARCH],
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
    <TruckQuotation
      create
      handleSubmit={handleSubmit}
      handleSaveDraft={handleSaveDraft}
      loadingSubmit={createMutation.isLoading || updateMutation.isLoading}
      checkRow={false}
      useDraft
    />
  );
};

export default CreateSeaQuotation;
