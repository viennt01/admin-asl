import router from 'next/router';
import {
  IFormValues,
  ITruckQuotationEdit,
  ITruckQuotationFeeFormValue,
  IContainerDTOFormValue,
  ISalesLeadsSeaQuotationDTOs,
  ILoadCapacityDTOFormValue,
} from '../interface';
import { editSeaQuotation } from '../fetcher';
import { useMutation } from '@tanstack/react-query';
import { errorToast, successToast } from '@/hook/toast';
import { API_MESSAGE } from '@/constant/message';
import TruckQuotation from '../components/form';
import { STATUS_ALL_LABELS } from '@/constant/form';
import { returnQuotationDetails, returnSaleLeads } from '../create';

const EditTruckQuotation = () => {
  const checkRow = router.query.checkRow as string;
  const updateMutation = useMutation({
    mutationFn: (body: ITruckQuotationEdit) => {
      return editSeaQuotation(body);
    },
  });

  const handleSubmit = (
    formValues: IFormValues,
    idQuery?: string,
    feeDTOs?: ITruckQuotationFeeFormValue[],
    containerDetail?: IContainerDTOFormValue[],
    loadCapacityDetail?: ILoadCapacityDTOFormValue[],
    salesLeads?: ISalesLeadsSeaQuotationDTOs[]
  ) => {
    if (idQuery) {
      const returnQuotationDetail = returnQuotationDetails(
        containerDetail,
        formValues.truckingQuotationDetailByContainerTypeDTOs
      );
      const returnSaleLead = returnSaleLeads(
        salesLeads,
        formValues.salesLeadsTruckingQuotationDTOs
      );
      const _requestData: ITruckQuotationEdit = {
        truckingQuotationID: idQuery,
        pickupID: formValues.pickupID || '',
        deliveryID: formValues.deliveryID || '',
        emtyPickupID: formValues.emtyPickupID || '',
        commodityID: formValues.commodityID || '',
        currencyID: formValues.currencyID || '',
        vendor: formValues.vendor || '',
        note: formValues.note || '',
        effectDated: formValues.dateEffect?.valueOf(),
        validityDate: formValues.validityDate?.valueOf(),
        freqDate: formValues.freqDate || '',
        lclMinTruckingQuotation: formValues.lclMinTruckingQuotation || '',
        lclTruckingQuotation: formValues.lclTruckingQuotation || '',
        public: formValues.public || true,
        seaQuotationDetailUpdateRequests: returnQuotationDetail || [],
        // seaPricingFeeGroupUpdateRequests: returnFeeDTO,
        salesLeadsSeaQuotationUpdateRequests: returnSaleLead || [],
        statusTruckingQuotation:
          formValues.statusTruckingQuotation || STATUS_ALL_LABELS.ACTIVE,
      };

      updateMutation.mutate(_requestData, {
        onSuccess: (data) => {
          data.status ? successToast(data.message) : errorToast(data.message);
        },
        onError() {
          errorToast(API_MESSAGE.ERROR);
        },
      });
    } else {
      errorToast(API_MESSAGE.ERROR);
    }
  };

  return (
    <TruckQuotation
      edit
      handleSubmit={handleSubmit}
      loadingSubmit={updateMutation.isLoading}
      checkRow={checkRow === 'true' ? true : false}
    />
  );
};

export default EditTruckQuotation;
