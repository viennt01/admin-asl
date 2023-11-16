import router from 'next/router';
import { IFormValues, IPartnerEdit } from '../interface';
import { editStaff } from '../fetcher';
import { useMutation } from '@tanstack/react-query';
import { errorToast, successToast } from '@/hook/toast';
import { API_MESSAGE } from '@/constant/message';
import UnitForm from '../components/form';
import { STATUS_ALL_LABELS } from '@/constant/form';

const EditStaff = () => {
  const checkRow = router.query.checkRow as string;
  const updateMutation = useMutation({
    mutationFn: (body: IPartnerEdit) => {
      return editStaff(body);
    },
  });

  const handleSubmit = (formValues: IFormValues, idQuery?: string) => {
    if (idQuery) {
      const _requestData: IPartnerEdit = {
        userID: idQuery,
        languageID: formValues.languageID || '',
        genderID: formValues.genderID || '',
        roleID: formValues.roleID || '',
        aslRoleID: formValues.aslRoleID || '',
        ipAddress: formValues.ipAddress || '',
        email: formValues.email || '',
        firstName: formValues.firstName || '',
        lastName: formValues.lastName || '',
        fullName: `${formValues.firstName} ${formValues.lastName}` || '',
        address: formValues.address || '',
        phoneNumber: formValues.phoneNumber || '',
        taxCode: formValues.taxCode || '',
        birthday: formValues.userBirthday?.valueOf(),
        workingBranch: formValues.workingBranch || '',
        nationality: formValues.nationality || '',
        visa: formValues.visa || '',
        citizenIdentification: formValues.citizenIdentification || '',
        note: formValues.note || '',
        avatar: formValues.avatar || '',
        statusUser: formValues.statusUser || STATUS_ALL_LABELS.ACTIVE,
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
    <UnitForm
      edit
      handleSubmit={handleSubmit}
      loadingSubmit={updateMutation.isLoading}
      checkRow={checkRow === 'true' ? true : false}
    />
  );
};

export default EditStaff;
