import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ROUTERS } from '@/constant/router';
import { errorToast, successToast } from '@/hook/toast';
import router from 'next/router';
import { API_MESSAGE } from '@/constant/message';
import CustomsQuotation from '../components/form';
import {
  IFormValues,
  ICustomQuotationCreate,
  ICustomQuotationEdit,
  ISeaQuotationFeeFormValue,
  ISalesLeadsSeaQuotationDTOs,
} from '../interface';
import { createCustomQuotation, editCustomQuotation } from '../fetcher';
import { STATUS_ALL_LABELS } from '@/constant/form';
import { API_CUSTOMS_QUOTATION } from '@/fetcherAxios/endpoint';
import { returnSaleLeads } from '../../sea/create';

const CreateCustomQuotation = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (body: ICustomQuotationCreate) => {
      return createCustomQuotation(body);
    },
  });

  const updateMutation = useMutation({
    mutationFn: (body: ICustomQuotationEdit) => {
      return editCustomQuotation(body);
    },
  });

  const handleSubmit = (
    formValues: IFormValues,
    id?: string,
    seaQuotationFeeDTOs?: ISeaQuotationFeeFormValue[],
    salesLeads?: ISalesLeadsSeaQuotationDTOs[]
  ) => {
    if (id) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const returnSaleLead = returnSaleLeads(
        salesLeads,
        formValues.salesLeadsCustomQuotationDTOs
      );
      const _requestData: ICustomQuotationEdit = {
        customQuotationID: id || '',
        typeDelaracrionID: formValues.typeDelaracrionID || '',
        commodityID: formValues.commodityID || '',
        currencyID: formValues.currencyID || '',
        transactionTypeID: formValues.transactionTypeID || '',
        note: formValues.note || '',
        vendorID: formValues.vendorID || '',
        effectDated: formValues.effectDated?.valueOf(),
        validityDate: formValues.validityDate?.valueOf(),
        forNewUser: formValues.forNewUser || false,
        public: formValues.public || true,
        statusCustomQuotation: STATUS_ALL_LABELS.REQUEST,
      };
      updateMutation.mutate(_requestData, {
        onSuccess: (data) => {
          data.status
            ? (successToast(data.message),
              router.push(ROUTERS.CUSTOMS_QUOTATION))
            : errorToast(data.message);
        },
        onError() {
          errorToast(API_MESSAGE.ERROR);
        },
      });
    } else {
      const seaQuotationFeeGroupRegisterRequests =
        formValues.customQuotationFeeGroupDTOs?.map((id) => {
          return {
            feeGroupID: id.feeGroupID,
          };
        });

      const salesLeadsQuotationRegisters =
        formValues.salesLeadsCustomQuotationDTOs?.map((id) => {
          return {
            partnerID: id,
          };
        });
      const _requestData: ICustomQuotationCreate = {
        typeDelaracrionID: formValues.typeDelaracrionID || '',
        commodityID: formValues.commodityID || '',
        currencyID: formValues.currencyID || '',
        transactionTypeID: formValues.transactionTypeID || '',
        note: formValues.note || '',
        vendorID: formValues.vendorID || '',
        effectDated: formValues.effectDated?.valueOf(),
        validityDate: formValues.validityDate?.valueOf(),
        forNewUser: formValues.forNewUser || false,
        public: formValues.public || true,
        customQuotationLCLDetailRegisterRequest:
          formValues.customQuotationLCLDetailDTO,
        customQuotationFCLDetailRegisterRequests:
          formValues.customQuotationFCLDetailDTOs,
        customQuotationAirDetailRegisterRequest:
          formValues.customQuotationAirDetailDTO,
        customQuotationFeeGroupRegisterRequests:
          seaQuotationFeeGroupRegisterRequests || [],
        salesLeadsQuotationRegisters: salesLeadsQuotationRegisters || [],
        statusCustomQuotation: STATUS_ALL_LABELS.REQUEST,
      };
      createMutation.mutate(_requestData, {
        onSuccess: (data) => {
          data.status
            ? (successToast(data.message),
              router.push(ROUTERS.CUSTOMS_QUOTATION))
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
    seaQuotationFeeDTOs?: ISeaQuotationFeeFormValue[],
    salesLeads?: ISalesLeadsSeaQuotationDTOs[]
  ) => {
    if (id) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const returnSaleLead = returnSaleLeads(
        salesLeads,
        formValues.salesLeadsCustomQuotationDTOs
      );
      const _requestData: ICustomQuotationEdit = {
        customQuotationID: id,
        typeDelaracrionID: formValues.typeDelaracrionID || '',
        commodityID: formValues.commodityID || '',
        currencyID: formValues.currencyID || '',
        transactionTypeID: formValues.transactionTypeID || '',
        note: formValues.note || '',
        vendorID: formValues.vendorID || '',
        effectDated: formValues.effectDated?.valueOf(),
        validityDate: formValues.validityDate?.valueOf(),
        forNewUser: formValues.forNewUser || false,
        public: formValues.public || true,
        statusCustomQuotation: STATUS_ALL_LABELS.DRAFT,
      };
      updateMutation.mutate(_requestData, {
        onSuccess: (data) => {
          data.status
            ? (successToast(data.message),
              queryClient.invalidateQueries({
                queryKey: [API_CUSTOMS_QUOTATION.GET_SEARCH],
              }))
            : errorToast(data.message);
        },
        onError() {
          errorToast(API_MESSAGE.ERROR);
        },
      });
    } else {
      const seaQuotationFeeGroupRegisterRequests =
        formValues.customQuotationFeeGroupDTOs?.map((id) => {
          return {
            feeGroupID: id.feeGroupID,
          };
        });

      const salesLeadsQuotationRegisters =
        formValues.salesLeadsCustomQuotationDTOs?.map((id) => {
          return {
            partnerID: id,
          };
        });
      const _requestData: ICustomQuotationCreate = {
        typeDelaracrionID: formValues.typeDelaracrionID || '',
        commodityID: formValues.commodityID || '',
        currencyID: formValues.currencyID || '',
        transactionTypeID: formValues.transactionTypeID || '',
        note: formValues.note || '',
        vendorID: formValues.vendorID || '',
        effectDated: formValues.effectDated?.valueOf(),
        validityDate: formValues.validityDate?.valueOf(),
        forNewUser: formValues.forNewUser || false,
        public: formValues.public || true,
        customQuotationLCLDetailRegisterRequest:
          formValues.customQuotationLCLDetailDTO,
        customQuotationFCLDetailRegisterRequests:
          formValues.customQuotationFCLDetailDTOs,
        customQuotationAirDetailRegisterRequest:
          formValues.customQuotationAirDetailDTO,
        customQuotationFeeGroupRegisterRequests:
          seaQuotationFeeGroupRegisterRequests || [],
        salesLeadsQuotationRegisters: salesLeadsQuotationRegisters || [],
        statusCustomQuotation: STATUS_ALL_LABELS.DRAFT,
      };
      createMutation.mutate(_requestData, {
        onSuccess: (data) => {
          data.status
            ? (successToast(data.message),
              queryClient.invalidateQueries({
                queryKey: [API_CUSTOMS_QUOTATION.GET_SEARCH],
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
    <CustomsQuotation
      create
      handleSubmit={handleSubmit}
      handleSaveDraft={handleSaveDraft}
      loadingSubmit={createMutation.isLoading || updateMutation.isLoading}
      checkRow={false}
      useDraft
    />
  );
};

export default CreateCustomQuotation;
