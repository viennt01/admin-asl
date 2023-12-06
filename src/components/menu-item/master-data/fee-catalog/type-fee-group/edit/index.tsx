import router from 'next/router';
import { FormValues, TypeFeeGroupEdit } from '../interface';
import { editTypeFeeGroup } from '../fetcher';
import { useMutation } from '@tanstack/react-query';
import { errorToast, successToast } from '@/hook/toast';
import { API_MESSAGE } from '@/constant/message';
import TypeFeeGroupForm from '../components/form';
import { STATUS_ALL_LABELS } from '@/constant/form';

const EditTypeFeeGroup = () => {
  const checkRow = router.query.checkRow as string;
  const updateMutation = useMutation({
    mutationFn: (body: TypeFeeGroupEdit) => {
      return editTypeFeeGroup(body);
    },
  });

  const handleSubmit = (formValues: FormValues, idQuery?: string) => {
    if (idQuery) {
      const _requestData: TypeFeeGroupEdit = {
        typeFeeGroupID: idQuery,
        typeFeeGroupNo: formValues.typeFeeGroupNo || '',
        typeFeeGroupNameEN: formValues.typeFeeGroupNameEN || '',
        typeFeeGroupNameVN:
          formValues.typeFeeGroupNameVN || formValues.typeFeeGroupNameEN || '',
        public: true,
        statusTypeFeeGroup:
          formValues.statusTypeFeeGroup || STATUS_ALL_LABELS.ACTIVE,
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
    <TypeFeeGroupForm
      edit
      handleSubmit={handleSubmit}
      loadingSubmit={updateMutation.isLoading}
      checkRow={checkRow === 'true' ? true : false}
    />
  );
};

export default EditTypeFeeGroup;
