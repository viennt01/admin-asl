import router from 'next/router';
import {
  IFormValues,
  SeaPricingEdit,
  ITruckingPricingFeeFormValue,
} from '../interface';
import { editTruckPricing } from '../fetcher';
import { useMutation } from '@tanstack/react-query';
import { errorToast, successToast } from '@/hook/toast';
import { API_MESSAGE } from '@/constant/message';
import TruckingPricingForm from '../components/form';
import { STATUS_ALL_LABELS } from '@/constant/form';
import { returnFeeDTOs } from '../create';

const EditTruckingPricing = () => {
  const checkRow = router.query.checkRow as string;
  const updateMutation = useMutation({
    mutationFn: (body: SeaPricingEdit) => {
      return editTruckPricing(body);
    },
  });

  const handleSubmit = (
    formValues: IFormValues,
    idQuery?: string,
    truckingPricingFeeDTOs?: ITruckingPricingFeeFormValue[]
  ) => {
    const returnFeeDTO = returnFeeDTOs(
      truckingPricingFeeDTOs,
      formValues.truckingPricingFeeGroupDTOs
    );

    if (idQuery) {
      const _requestData: SeaPricingEdit = {
        truckingPricingID: idQuery,
        pickupID: formValues.pickupID || '',
        deliveryID: formValues.deliveryID || '',
        commodityID: formValues.commodityID || '',
        currencyID: formValues.currencyID || '',
        vendorID: formValues.vendorID || '',
        note: formValues.note || '',
        public: formValues.public || true,
        effectDated: formValues.effectDated?.valueOf(),
        validityDate: formValues.validityDate?.valueOf(),
        freqDate: formValues.freqDate || '',
        seaPricingDetailUpdateRequests:
          formValues.truckingPricingDetailByContainerTypeDTOs || [],
        seaPricingFeeGroupUpdateRequests: returnFeeDTO,
        statusTruckingPricing: STATUS_ALL_LABELS.REQUEST,
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
    <TruckingPricingForm
      edit
      handleSubmit={handleSubmit}
      loadingSubmit={updateMutation.isLoading}
      checkRow={checkRow === 'true' ? true : false}
    />
  );
};

export default EditTruckingPricing;
