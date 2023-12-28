import router from 'next/router';
import {
  FormValues,
  AirPricingEdit,
  AirPricingFeeFormValue,
} from '../interface';
import { editAirPricing } from '../fetcher';
import { useMutation } from '@tanstack/react-query';
import { errorToast, successToast } from '@/hook/toast';
import { API_MESSAGE } from '@/constant/message';
import AirPricing from '../components/form';
import { STATUS_ALL_LABELS } from '@/constant/form';
import { returnFeeDTOs } from '../create';

const EditAirPricing = () => {
  const checkRow = router.query.checkRow as string;
  const updateMutation = useMutation({
    mutationFn: (body: AirPricingEdit) => {
      return editAirPricing(body);
    },
  });

  const handleSubmit = (
    formValues: FormValues,
    idQuery?: string,
    airPricingFeeDTOs?: AirPricingFeeFormValue[]
  ) => {
    const returnFeeDTO = returnFeeDTOs(
      airPricingFeeDTOs,
      formValues.airPricingFeeDTOs
    );

    if (idQuery) {
      const _requestData: AirPricingEdit = {
        airPricingID: idQuery,
        aodid: formValues.aodid || '',
        aolid: formValues.aolid || '',
        commodityID: formValues.commodityID || '',
        note: formValues.note || '',
        validityDate: formValues.validityDate.valueOf(),
        effectDated: formValues.effectDated.valueOf(),
        freqDate: formValues.freqDate || '',
        gw: formValues.gw,
        vendorID: formValues.vendorID || '',
        transitTimeAirPricing: formValues.transitTimeAirPricing || '',
        hscAirPricing: formValues.hscAirPricing || '0',
        sscAirPricing: formValues.sscAirPricing || '0',
        loadCapacityMinAirPricing: formValues.loadCapacityMinAirPricing || '0',
        priceLoadCapacityMinAirPricing:
          formValues.priceLoadCapacityMinAirPricing || '0',
        currencyID: formValues.currencyID || '',
        public: formValues.public || true,
        airPricingDetailUpdateRequests: formValues.airPricingDetailDTOs || [],
        airPricingFeeGroupUpdateRequests: returnFeeDTO,
        statusAirPricing: STATUS_ALL_LABELS.REQUEST,
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
    <AirPricing
      edit
      handleSubmit={handleSubmit}
      loadingSubmit={updateMutation.isLoading}
      checkRow={checkRow === 'true' ? true : false}
    />
  );
};

export default EditAirPricing;
