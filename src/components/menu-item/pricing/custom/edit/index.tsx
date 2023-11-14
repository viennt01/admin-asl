import router from 'next/router';
import { IFormValues, ICustomPricingEdit } from '../interface';
import { editCustomPricing } from '../fetcher';
import { useMutation } from '@tanstack/react-query';
import { errorToast, successToast } from '@/hook/toast';
import { API_MESSAGE } from '@/constant/message';
import CustomPricing from '../components/form';
import { STATUS_ALL_LABELS } from '@/constant/form';

const EditCustomPricing = () => {
  const checkRow = router.query.checkRow as string;
  const updateMutation = useMutation({
    mutationFn: (body: ICustomPricingEdit) => {
      return editCustomPricing(body);
    },
  });

  const handleSubmit = (formValues: IFormValues, idQuery?: string) => {
    if (idQuery) {
      const _requestData: ICustomPricingEdit = {
        customPricingID: idQuery,
        typeDelaracrionID: formValues.typeDelaracrionID || '',
        partnerID: formValues.partnerID || '',
        commodityID: formValues.commodityID || '',
        currencyID: formValues.currencyID || '',
        transactionTypeID: formValues.transactionTypeID || '',
        note: formValues.note || '',
        customRedPrice: formValues.customRedPrice || '',
        customYellowPrice: formValues.customYellowPrice || '',
        customGreenPrice: formValues.customGreenPrice || '',
        effectDated: formValues.effectDated?.valueOf(),
        validityDate: formValues.validityDate?.valueOf(),
        public: formValues.public || true,
        statusCustomPricing:
          formValues.statusCustomPricing || STATUS_ALL_LABELS.ACTIVE,
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
    <CustomPricing
      edit
      handleSubmit={handleSubmit}
      loadingSubmit={updateMutation.isLoading}
      checkRow={checkRow === 'true' ? true : false}
    />
  );
};

export default EditCustomPricing;
