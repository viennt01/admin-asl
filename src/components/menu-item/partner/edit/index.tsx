import router from 'next/router';
import { IFormValues, IPartnerEdit } from '../interface';
import { editUnit } from '../fetcher';
import { useMutation } from '@tanstack/react-query';
import { errorToast, successToast } from '@/hook/toast';
import { API_MESSAGE } from '@/constant/message';
import UnitForm from '../components/form';
import { STATUS_ALL_LABELS } from '@/constant/form';

const EditPartner = () => {
  const checkRow = router.query.checkRow as string;
  const updateMutation = useMutation({
    mutationFn: (body: IPartnerEdit) => {
      return editUnit(body);
    },
  });

  const handleSubmit = (formValues: IFormValues, idQuery?: string) => {
    if (idQuery) {
      const _requestData: IPartnerEdit = {
        userID: idQuery,
        languageID: formValues.languageID || '',
        genderID: formValues.genderID || '',
        roleID: formValues.roleID || '',
        cityID: formValues.cityID || '',
        aslPersonalContactID: formValues.aslPersonalContactID || '',
        email: formValues.email || '',
        firstName: formValues.firstName || '',
        lastName: formValues.lastName || '',
        fullName: `${formValues.firstName} ${formValues.lastName}` || '',
        companyNameEN: formValues.companyNameEN || '',
        companyNameVN:
          formValues.companyNameVN || formValues.companyNameEN || '',
        abbreviations: formValues.abbreviations || '',
        emailCompany: formValues.emailCompany || '',
        phoneNumber: formValues.phoneNumber || '',
        taxCode: formValues.taxCode || '',
        addressEN: formValues.addressEN || '',
        addressVN: formValues.addressVN || formValues.addressEN || '',
        birthday: formValues.birthdated?.valueOf(),
        workingBranch: formValues.workingBranch || '',
        nationality: formValues.nationality || '',
        visa: formValues.visa || '',
        citizenIdentification: formValues.citizenIdentification || '',
        website: formValues.website || '',
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

export default EditPartner;
