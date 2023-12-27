import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ROUTERS } from '@/constant/router';
import { errorToast, successToast } from '@/hook/toast';
import router from 'next/router';
import { API_MESSAGE } from '@/constant/message';
import SeaQuotation from '../components/form';
import {
  IFormValues,
  ISeaQuotationCreate,
  ISeaQuotationDetailDTOsUpdate,
  ISeaQuotationEdit,
  ISeaQuotationFeeFormValue,
  ISeaQuotationDetailDTOsFormValue,
  ISalesLeadsSeaQuotationDTOs,
  IEditSalesLeadsSeaQuotationDTOs,
  TYPE_TABS,
} from '../interface';
import { createSeaQuotation, editSeaQuotation } from '../fetcher';
import { STATUS_ALL_LABELS } from '@/constant/form';

export const returnQuotationDetails = (
  old?: ISeaQuotationDetailDTOsFormValue[],
  newData?: ISeaQuotationDetailDTOsUpdate[]
) => {
  if (!newData) {
    return [];
  }
  const mergedData = old?.map((oldItem) => {
    const newItem = newData.find(
      (newItem) =>
        newItem.seaQuotationDetailID === oldItem.seaQuotationDetailID &&
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
            newItem.seaQuotationDetailID === oldItem.seaQuotationDetailID &&
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
      salesLeadsSeaQuotationID: item.salesLeadsSeaQuotationID,
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
    mutationFn: (body: ISeaQuotationCreate) => {
      return createSeaQuotation(body);
    },
  });

  const updateMutation = useMutation({
    mutationFn: (body: ISeaQuotationEdit) => {
      return editSeaQuotation(body);
    },
  });

  const handleSubmit = (
    formValues: IFormValues,
    id?: string,
    seaPricingFeeDTOs?: ISeaQuotationFeeFormValue[],
    seaQuotationDetail?: ISeaQuotationDetailDTOsFormValue[],
    salesLeads?: ISalesLeadsSeaQuotationDTOs[]
  ) => {
    const seaQuotationDetailRegisterRequests =
      formValues.seaQuotationDetailDTOs.map((data) => {
        return {
          containerTypeID: data.containerTypeID,
          priceQuotationDetail: data.price,
        };
      });

    const returnQuotationDetail = returnQuotationDetails(
      seaQuotationDetail,
      formValues.seaQuotationDetailDTOs
    );

    if (id) {
      const returnSaleLead = returnSaleLeads(
        salesLeads,
        formValues.salesLeadsSeaQuotationDTOs
      );
      const _requestData: ISeaQuotationEdit = {
        seaQuotationID: id || '',
        podid: formValues.podid || '',
        polid: formValues.polid || '',
        commodityID: formValues.commodityID || '',
        vendorID: formValues.vendorID || '',
        note: formValues.note || '',
        forNewUser: formValues.forNewUser || false,
        effectDated: formValues.effectDated?.valueOf(),
        validityDate: formValues.validityDate?.valueOf(),
        freqDate: formValues.freqDate || '',
        demSeaQuotation: formValues.demSeaQuotation || '0',
        detSeaQuotation: formValues.detSeaQuotation || '0',
        stoSeaQuotation: formValues.stoSeaQuotation || '0',
        lclSeaQuotation: formValues.lclSeaQuotation || '0',
        transitTimeSeaQuotation: formValues.transitTimeSeaQuotation || '0',
        lclMinSeaQuotation: formValues.lclMinSeaQuotation || '0',
        currencyID: formValues.currencyID || '',
        public: formValues.public || true,
        seaQuotationDetailUpdateRequests:
          (returnQuotationDetail as unknown as ISeaQuotationDetailDTOsUpdate[]) ||
          [],
        // seaPricingFeeGroupUpdateRequests: returnFeeDTO,
        salesLeadsSeaQuotationUpdateRequests: returnSaleLead || [],
        statusSeaQuotation: STATUS_ALL_LABELS.REQUEST,
      };
      updateMutation.mutate(_requestData, {
        onSuccess: (data) => {
          data.status
            ? (successToast(data.message), router.push(ROUTERS.SEA_QUOTATION))
            : errorToast(data.message);
        },
        onError() {
          errorToast(API_MESSAGE.ERROR);
        },
      });
    } else {
      const salesLeadsQuotationRegisters =
        formValues.salesLeadsSeaQuotationDTOs?.map((id) => ({
          partnerID: id,
        })) || [];
      const seaQuotationPartnerRoleRegisters =
        formValues.seaQuotaionGroupPartnerDTOs?.map((id) => ({
          groupPartnerID: id,
        })) || [];

      const seaQuotationFeeGroupRegisterRequests =
        formValues.seaQuotaionFeeGroupDTOs?.map((id) => {
          return {
            feeGroupID: id.feeGroupID,
          };
        });

      const _requestData: ISeaQuotationCreate = {
        podid: formValues.podid || '',
        polid: formValues.polid || '',
        commodityID: formValues.commodityID || '',
        vendorID: formValues.vendorID || '',
        note: formValues.note || '',
        effectDated: formValues.effectDated?.valueOf(),
        validityDate: formValues.validityDate?.valueOf(),
        freqDate: formValues.freqDate || '',
        demSeaQuotation: formValues.demSeaQuotation || '0',
        detSeaQuotation: formValues.detSeaQuotation || '0',
        stoSeaQuotation: formValues.stoSeaQuotation || '0',
        lclSeaQuotation: formValues.lclSeaQuotation || '0',
        transitTimeSeaQuotation: formValues.transitTimeSeaQuotation || '0',
        lclMinSeaQuotation: formValues.lclMinSeaQuotation || '0',
        currencyID: formValues.currencyID || '',
        public: formValues.public || true,
        forNewUser: formValues.forNewUser || false,
        seaQuotationDetailRegisterRequests:
          seaQuotationDetailRegisterRequests || [],
        seaQuotationFeeGroupRegisterRequests:
          seaQuotationFeeGroupRegisterRequests || [],
        salesLeadsQuotationRegisters: salesLeadsQuotationRegisters,
        seaQuotationGroupPartnerRegisterRequests:
          seaQuotationPartnerRoleRegisters,
        statusSeaQuotation: STATUS_ALL_LABELS.REQUEST,
      };
      createMutation.mutate(_requestData, {
        onSuccess: (data) => {
          data.status
            ? (successToast(data.message), router.push(ROUTERS.SEA_QUOTATION))
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
    seaPricingFeeDTOs?: ISeaQuotationFeeFormValue[],
    seaQuotationDetail?: ISeaQuotationDetailDTOsFormValue[],
    salesLeads?: ISalesLeadsSeaQuotationDTOs[]
  ) => {
    const seaQuotationDetailRegisterRequests =
      formValues.seaQuotationDetailDTOs.map((data) => {
        return {
          containerTypeID: data.containerTypeID,
          currencyID: data.currencyID,
          priceQuotationDetail: data.price,
        };
      });

    const returnQuotationDetail = returnQuotationDetails(
      seaQuotationDetail,
      formValues.seaQuotationDetailDTOs
    );
    if (id) {
      const returnSaleLead = returnSaleLeads(
        salesLeads,
        formValues.salesLeadsSeaQuotationDTOs
      );
      const _requestData: ISeaQuotationEdit = {
        seaQuotationID: id,
        podid: formValues.podid || '',
        polid: formValues.polid || '',
        commodityID: formValues.commodityID || '',
        vendorID: formValues.vendorID || '',
        note: formValues.note || '',
        forNewUser: formValues.forNewUser || false,
        effectDated: formValues.effectDated?.valueOf(),
        validityDate: formValues.validityDate?.valueOf(),
        freqDate: formValues.freqDate || '',
        demSeaQuotation: formValues.demSeaQuotation || '0',
        detSeaQuotation: formValues.detSeaQuotation || '0',
        stoSeaQuotation: formValues.stoSeaQuotation || '0',
        lclSeaQuotation: formValues.lclSeaQuotation || '0',
        transitTimeSeaQuotation: formValues.transitTimeSeaQuotation || '0',
        lclMinSeaQuotation: formValues.lclMinSeaQuotation || '0',
        currencyID: formValues.currencyID || '',
        public: formValues.public || true,
        seaQuotationDetailUpdateRequests:
          (returnQuotationDetail as unknown as ISeaQuotationDetailDTOsUpdate[]) ||
          [],
        salesLeadsSeaQuotationUpdateRequests: returnSaleLead || [],
        statusSeaQuotation: STATUS_ALL_LABELS.DRAFT,
      };

      updateMutation.mutate(_requestData, {
        onSuccess: (data) => {
          data.status
            ? (successToast(data.message),
              queryClient.invalidateQueries({
                queryKey: [TYPE_TABS.GET_SEA_QUOTATION_BY_DRAFT_DATA],
              }))
            : errorToast(data.message);
        },
        onError() {
          errorToast(API_MESSAGE.ERROR);
        },
      });
    } else {
      const salesLeadsQuotationRegisters =
        formValues.salesLeadsSeaQuotationDTOs?.map((id) => ({
          partnerID: id,
        })) || [];
      const seaQuotationPartnerRoleRegisters =
        formValues.seaQuotaionGroupPartnerDTOs?.map((id) => ({
          groupPartnerID: id,
        })) || [];
      const seaQuotationFeeGroupRegisterRequests =
        formValues.seaQuotaionFeeGroupDTOs?.map((id) => {
          return {
            feeGroupID: id.feeGroupID,
          };
        });

      const _requestData: ISeaQuotationCreate = {
        podid: formValues.podid || '',
        polid: formValues.polid || '',
        commodityID: formValues.commodityID || '',
        vendorID: formValues.vendorID || '',
        note: formValues.note || '',
        forNewUser: formValues.forNewUser || false,
        effectDated: formValues.effectDated?.valueOf(),
        validityDate: formValues.validityDate?.valueOf(),
        freqDate: formValues.freqDate || '',
        demSeaQuotation: formValues.demSeaQuotation || '0',
        detSeaQuotation: formValues.detSeaQuotation || '0',
        stoSeaQuotation: formValues.stoSeaQuotation || '0',
        lclSeaQuotation: formValues.lclSeaQuotation || '0',
        transitTimeSeaQuotation: formValues.transitTimeSeaQuotation || '0',
        lclMinSeaQuotation: formValues.lclMinSeaQuotation || '0',
        currencyID: formValues.currencyID || '',
        public: formValues.public || true,
        seaQuotationDetailRegisterRequests:
          seaQuotationDetailRegisterRequests || [],
        seaQuotationFeeGroupRegisterRequests:
          seaQuotationFeeGroupRegisterRequests || [],
        salesLeadsQuotationRegisters: salesLeadsQuotationRegisters,
        seaQuotationGroupPartnerRegisterRequests:
          seaQuotationPartnerRoleRegisters,
        statusSeaQuotation: STATUS_ALL_LABELS.DRAFT,
      };

      createMutation.mutate(_requestData, {
        onSuccess: (data) => {
          data.status
            ? (successToast(data.message),
              queryClient.invalidateQueries({
                queryKey: [TYPE_TABS.GET_SEA_QUOTATION_BY_DRAFT_DATA],
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
    <SeaQuotation
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
