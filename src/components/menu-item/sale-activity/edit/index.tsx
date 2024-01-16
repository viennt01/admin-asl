import router from 'next/router';
import { IFormValues, ISaleActivityEdit, STATUS } from '../interface';
import { editUnit } from '../fetcher';
import { useMutation } from '@tanstack/react-query';
import { errorToast, successToast } from '@/hook/toast';
import { API_MESSAGE } from '@/constant/message';
import SaleActivityForm from '../components/form';

const EditSaleActivity = () => {
  const checkRow = router.query.checkRow as string;
  const updateMutation = useMutation({
    mutationFn: (body: ISaleActivityEdit) => {
      return editUnit(body);
    },
  });

  const handleSubmit = (formValues: IFormValues, idQuery?: string) => {
    if (idQuery) {
      const _requestData: ISaleActivityEdit = {
        saleActivityID: idQuery,
        saleActivityTypeID: formValues.saleActivityTypeID || '',
        partnerID: formValues.partnerID || '',
        timeActivitySaleActivity:
          formValues.timeActivitySaleActivity?.valueOf() || 1,
        descriptionEN: formValues.descriptionEN || '',
        descriptionVN:
          formValues.descriptionVN || formValues.descriptionEN || '',
        statusSaleActivity: STATUS.COMING,
        listUserID: formValues.listUserID || [],
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
    <SaleActivityForm
      edit
      handleSubmit={handleSubmit}
      loadingSubmit={updateMutation.isLoading}
      checkRow={checkRow === 'true' ? true : false}
    />
  );
};

export default EditSaleActivity;
