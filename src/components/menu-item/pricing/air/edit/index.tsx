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
        dateEffect: formValues.dateEffect.valueOf(),
        validityDate: formValues.validityDate.valueOf(),
        freqDate: formValues.freqDate || '',
        demAirPricing: formValues.demAirPricing || '',
        detAirPricing: formValues.detAirPricing || '',
        stoAirPricing: formValues.stoAirPricing || '',
        lclMinAirPricing: formValues.lclMinAirPricing || '',
        lclAirPricing: formValues.lclAirPricing || '',
        currencyID: formValues.currencyID || '',
        public: formValues.public || true,
        airPricingDetailUpdateRequests: formValues.airPricingDetailDTOs || [],
        airPricingFeeGroupUpdateRequests: returnFeeDTO,
        statusAirPricing:
          formValues.statusAirPricing || STATUS_ALL_LABELS.ACTIVE,
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
