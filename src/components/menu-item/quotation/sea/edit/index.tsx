import router from 'next/router';
import {
  IFormValues,
  ISeaQuotationEdit,
  ISeaQuotationFeeFormValue,
  ISeaQuotationDetailDTOsFormValue,
  ISalesLeadsSeaQuotationDTOs,
} from '../interface';
import { editSeaQuotation } from '../fetcher';
import { useMutation } from '@tanstack/react-query';
import { errorToast, successToast } from '@/hook/toast';
import { API_MESSAGE } from '@/constant/message';
import SeaQuotation from '../components/form';
import { STATUS_ALL_LABELS } from '@/constant/form';
import { returnQuotationDetails, returnSaleLeads } from '../create';

const EditSeaQuotation = () => {
  const checkRow = router.query.checkRow as string;
  const updateMutation = useMutation({
    mutationFn: (body: ISeaQuotationEdit) => {
      return editSeaQuotation(body);
    },
  });

  const handleSubmit = (
    formValues: IFormValues,
    idQuery?: string,
    seaPricingFeeDTOs?: ISeaQuotationFeeFormValue[],
    seaQuotationDetail?: ISeaQuotationDetailDTOsFormValue[],
    salesLeads?: ISalesLeadsSeaQuotationDTOs[]
  ) => {
    if (idQuery) {
      const returnQuotationDetail = returnQuotationDetails(
        seaQuotationDetail,
        formValues.seaQuotationDetailDTOs
      );
      const returnSaleLead = returnSaleLeads(
        salesLeads,
        formValues.salesLeadsSeaQuotationDTOs
      );
      const _requestData: ISeaQuotationEdit = {
        seaQuotationID: idQuery,
        podid: formValues.podid || '',
        polid: formValues.polid || '',
        commodityID: formValues.commodityID || '',
        partnerID: formValues.vendor || '',
        forNewUser: formValues.forNewUser || false,
        note: formValues.note || '',
        dateEffect: formValues.dateEffect.valueOf(),
        validityDate: formValues.validityDate.valueOf(),
        freqDate: formValues.freqDate || '',
        demSeaQuotation: formValues.demSeaQuotation || '',
        detSeaQuotation: formValues.detSeaQuotation || '',
        stoSeaQuotation: formValues.stoSeaQuotation || '',
        lclMinSeaQuotation: formValues.lclMinSeaQuotation || '',
        lclSeaQuotation: formValues.lclSeaQuotation || '',
        currencyID: formValues.currencyID || '',
        public: formValues.public || true,
        seaQuotationDetailUpdateRequests: returnQuotationDetail || [],
        // seaPricingFeeGroupUpdateRequests: returnFeeDTO,
        salesLeadsSeaQuotationUpdateRequests: returnSaleLead || [],
        statusSeaQuotation:
          formValues.statusSeaQuotation || STATUS_ALL_LABELS.ACTIVE,
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
    <SeaQuotation
      edit
      handleSubmit={handleSubmit}
      loadingSubmit={updateMutation.isLoading}
      checkRow={checkRow === 'true' ? true : false}
    />
  );
};

export default EditSeaQuotation;
