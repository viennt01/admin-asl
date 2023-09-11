import router from 'next/router';
import { FormValues, EditCommodity } from '../interface';
import { editCommodity } from '../fetcher';
import { useMutation } from '@tanstack/react-query';
import { errorToast, successToast } from '@/hook/toast';
import { API_MESSAGE } from '@/constant/message';
import CommodityForm from '../components/form';
import { STATUS_ALL_LABELS } from '@/constant/form';

const CommodityEditPage = () => {
  const checkRow = router.query.checkRow as string;
  const updatetMutation = useMutation({
    mutationFn: (body: EditCommodity) => {
      return editCommodity(body);
    },
  });

  const handleSubmit = (formValues: FormValues, idQuery?: string) => {
    if (idQuery) {
      const _requestData: EditCommodity = {
        commodityID: idQuery,
        commodityNameEN: formValues.commodityNameEN || '',
        commodityNameVN:
          formValues.commodityNameVN || formValues.commodityNameEN || '',
        statusCommodity: formValues.statusCommodity || STATUS_ALL_LABELS.ACTIVE,
      };
      updatetMutation.mutate(_requestData, {
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
    <CommodityForm
      edit
      handleSubmit={handleSubmit}
      loadingSubmit={updatetMutation.isLoading}
      checkRow={checkRow === 'true' ? true : false}
    />
  );
};

export default CommodityEditPage;
