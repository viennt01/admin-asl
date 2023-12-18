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
        vendorID: formValues.vendorID || '',
        forNewUser: formValues.forNewUser || false,
        note: formValues.note || '',
        effectDated: formValues.effectDated.valueOf(),
        validityDate: formValues.validityDate.valueOf(),
        freqDate: formValues.freqDate || '',
        demSeaQuotation: formValues.demSeaQuotation || '0',
        detSeaQuotation: formValues.detSeaQuotation || '0',
        stoSeaQuotation: formValues.stoSeaQuotation || '0',
        lclSeaQuotation: formValues.lclSeaQuotation || '0',
        lclMinSeaQuotation: formValues.lclMinSeaQuotation || '0',
        currencyID: formValues.currencyID || '',
        public: formValues.public || true,
        seaQuotationDetailUpdateRequests: returnQuotationDetail || [],
        // seaPricingFeeGroupUpdateRequests: returnFeeDTO,
        salesLeadsSeaQuotationUpdateRequests: returnSaleLead || [],
        statusSeaQuotation: STATUS_ALL_LABELS.REQUEST,
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
