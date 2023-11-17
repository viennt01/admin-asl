import router from 'next/router';
import { IFormValues, ICustomQuotationEdit } from '../interface';
import { editCustomQuotation } from '../fetcher';
import { useMutation } from '@tanstack/react-query';
import { errorToast, successToast } from '@/hook/toast';
import { API_MESSAGE } from '@/constant/message';
import CustomsQuotation from '../components/form';
import { STATUS_ALL_LABELS } from '@/constant/form';

const EditCustomQuotation = () => {
  const checkRow = router.query.checkRow as string;
  const updateMutation = useMutation({
    mutationFn: (body: ICustomQuotationEdit) => {
      return editCustomQuotation(body);
    },
  });

  const handleSubmit = (formValues: IFormValues, idQuery?: string) => {
    if (idQuery) {
      const _requestData: ICustomQuotationEdit = {
        customQuotationID: idQuery,
        typeDelaracrionID: formValues.typeDelaracrionID || '',
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
        statusCustomQuotation:
          formValues.statusCustomQuotation || STATUS_ALL_LABELS.ACTIVE,
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
    <CustomsQuotation
      edit
      handleSubmit={handleSubmit}
      loadingSubmit={updateMutation.isLoading}
      checkRow={checkRow === 'true' ? true : false}
    />
  );
};

export default EditCustomQuotation;
