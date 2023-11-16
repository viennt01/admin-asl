import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ROUTERS } from '@/constant/router';
import { errorToast, successToast } from '@/hook/toast';
import router from 'next/router';
import { API_MESSAGE } from '@/constant/message';
import UnitForm from '../components/form';
import { IFormValues, IPartnerCreate, IPartnerEdit } from '../interface';
import { createStaff, editStaff } from '../fetcher';
import { STATUS_ALL_LABELS } from '@/constant/form';
import { API_STAFF } from '@/fetcherAxios/endpoint';

const CreateStaff = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (body: IPartnerCreate) => {
      return createStaff(body);
    },
  });

  const updateMutation = useMutation({
    mutationFn: (body: IPartnerEdit) => {
      return editStaff(body);
    },
  });

  const handleSubmit = (formValues: IFormValues, id?: string) => {
    if (id) {
      const _requestData: IPartnerEdit = {
        userID: id,
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
        statusUser: STATUS_ALL_LABELS.REQUEST,
      };
      updateMutation.mutate(_requestData, {
        onSuccess: (data) => {
          data.status
            ? (successToast(data.message), router.push(ROUTERS.UNIT))
            : errorToast(data.message);
        },
        onError() {
          errorToast(API_MESSAGE.ERROR);
        },
      });
    } else {
      const _requestData: IPartnerCreate = {
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
        statusUser: STATUS_ALL_LABELS.REQUEST,
      };
      createMutation.mutate(_requestData, {
        onSuccess: (data) => {
          data.status
            ? (successToast(data.message), router.push(ROUTERS.UNIT))
            : errorToast(data.message);
        },
        onError() {
          errorToast(API_MESSAGE.ERROR);
        },
      });
    }
  };

  const handleSaveDraft = (formValues: IFormValues, id?: string) => {
    if (id) {
      const _requestData: IPartnerEdit = {
        userID: id,
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
        statusUser: STATUS_ALL_LABELS.DRAFT,
      };
      updateMutation.mutate(_requestData, {
        onSuccess: (data) => {
          data.status
            ? (successToast(data.message),
              queryClient.invalidateQueries({
                queryKey: [API_STAFF.GET_SEARCH],
              }))
            : errorToast(data.message);
        },
        onError() {
          errorToast(API_MESSAGE.ERROR);
        },
      });
    } else {
      const _requestData: IPartnerCreate = {
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
        statusUser: STATUS_ALL_LABELS.DRAFT,
      };
      createMutation.mutate(_requestData, {
        onSuccess: (data) => {
          data.status
            ? (successToast(data.message),
              queryClient.invalidateQueries({
                queryKey: [API_STAFF.GET_SEARCH],
              }))
            : errorToast(data.message);
        },
        onError() {
          errorToast(API_MESSAGE.ERROR);
        },
      });
    }
  };

  return (
    <UnitForm
      create
      handleSubmit={handleSubmit}
      handleSaveDraft={handleSaveDraft}
      loadingSubmit={createMutation.isLoading || updateMutation.isLoading}
      checkRow={false}
      useDraft
    />
  );
};

export default CreateStaff;
