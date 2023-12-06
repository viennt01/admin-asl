import router from 'next/router';
import { FormValues, FeeGroupEdit } from '../interface';
import { editFeeGroup } from '../fetcher';
import { useMutation } from '@tanstack/react-query';
import { errorToast, successToast } from '@/hook/toast';
import { API_MESSAGE } from '@/constant/message';
import FeeGroupForm from '../components/form';
import { STATUS_ALL_LABELS } from '@/constant/form';

const EditFeeGroup = () => {
  const checkRow = router.query.checkRow as string;
  const updateMutation = useMutation({
    mutationFn: (body: FeeGroupEdit) => {
      return editFeeGroup(body);
    },
  });

  const handleSubmit = (formValues: FormValues, idQuery?: string) => {
    if (idQuery) {
      const _requestData: FeeGroupEdit = {
        feeGroupID: idQuery,
        typeFeeGroupID: formValues.typeFeeGroupID || '',
        feeGroupNo: formValues.feeGroupNo || '',
        feeGroupNameEN: formValues.feeGroupNameEN || '',
        feeGroupNameVN:
          formValues.feeGroupNameVN || formValues.feeGroupNameEN || '',
        public: true,
        statusFeeGroup: formValues.statusFeeGroup || STATUS_ALL_LABELS.ACTIVE,
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
    <FeeGroupForm
      edit
      handleSubmit={handleSubmit}
      loadingSubmit={updateMutation.isLoading}
      checkRow={checkRow === 'true' ? true : false}
    />
  );
};

export default EditFeeGroup;
