import router from 'next/router';
import {
  IFormValues,
  IAirQuotationEdit,
  IAirQuotationFeeFormValue,
} from '../interface';
import { editAirPricing } from '../fetcher';
import { useMutation } from '@tanstack/react-query';
import { errorToast, successToast } from '@/hook/toast';
import { API_MESSAGE } from '@/constant/message';
import AirQuotation from '../components/form';
import { STATUS_ALL_LABELS } from '@/constant/form';
import { returnFeeDTOs } from '../create';

const EditAirQuotation = () => {
  const checkRow = router.query.checkRow as string;
  const updateMutation = useMutation({
    mutationFn: (body: IAirQuotationEdit) => {
      return editAirPricing(body);
    },
  });

  const handleSubmit = (
    formValues: IFormValues,
    idQuery?: string,
    airPricingFeeDTOs?: IAirQuotationFeeFormValue[]
  ) => {
    const returnFeeDTO = returnFeeDTOs(
      airPricingFeeDTOs,
      formValues.airQuotaionFeeGroupDTOs
    );

    if (idQuery) {
      const _requestData: IAirQuotationEdit = {
        airQuotationID: idQuery || '',
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
        fscAirQuotation: formValues.fscAirQuotation || '',
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
    <AirQuotation
      edit
      handleSubmit={handleSubmit}
      loadingSubmit={updateMutation.isLoading}
      checkRow={checkRow === 'true' ? true : false}
    />
  );
};

export default EditAirQuotation;
