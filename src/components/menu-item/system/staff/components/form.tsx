import { ROUTERS } from '@/constant/router';
import useI18n from '@/i18n/useI18N';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  Form,
  Input,
  Typography,
  Card,
  Row,
  Col,
  Switch,
  DatePicker,
  Select,
} from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { IFormValues, UpdateStatusUnit } from '../interface';
import { API_GENDER, API_STAFF, API_ROLE } from '@/fetcherAxios/endpoint';
import { BottomCreateEdit } from '@/components/commons/bottom-edit-creat-manager';
import {
  getListGender,
  getListRoleStaff,
  getStaffDetail,
  updateStatus,
} from '../fetcher';
import DraftTable from '../table/draft-table';
import { STATUS_ALL_LABELS, STATUS_MASTER_COLORS } from '@/constant/form';
import { UpdateStatusLocationType } from '@/components/menu-item/master-data/location-catalog/type-of-location/interface';
import { errorToast, successToast } from '@/hook/toast';
import { API_MESSAGE } from '@/constant/message';
import dayjs from 'dayjs';

const initialValue = {
  description: '',
};
const dateFormat = 'YYYY-MM-DD';

interface PortFormProps {
  create?: boolean;
  manager?: boolean;
  edit?: boolean;
  handleSubmit?: (formValues: IFormValues, id?: string) => void;
  handleSaveDraft?: (formValues: IFormValues, id?: string) => void;
  loadingSubmit?: boolean;
  checkRow: boolean;
  useDraft?: boolean;
}

const { Title } = Typography;
const { TextArea } = Input;

const UnitForm = ({
  create,
  manager,
  edit,
  handleSubmit,
  handleSaveDraft,
  loadingSubmit,
  checkRow,
  useDraft,
}: PortFormProps) => {
  const { translate: translateStaff } = useI18n('staff');
  const router = useRouter();
  const [form] = Form.useForm<IFormValues>();
  const { id } = router.query;
  const [idQuery, setIdQuery] = useState<string>();
  const [isCheckPermissionEdit, setCheckPermissionEdit] =
    useState<boolean>(false);
  const [checkStatus, setCheckStatus] = useState<boolean>(true);
  const propCopyAndCreate = router.query;

  const getGender = useQuery({
    queryKey: [API_GENDER.GET_ALL],
    queryFn: () => getListGender(),
    onSuccess: (data) => {
      if (!data.status) {
        router.back();
        errorToast(API_MESSAGE.ERROR);
      }
    },
    onError: () => {
      router.back();
      errorToast(API_MESSAGE.ERROR);
    },
  });

  const getRoleStaff = useQuery({
    queryKey: [API_ROLE.GET_ALL_ROLE_STAFF],
    queryFn: () => getListRoleStaff(),
    onSuccess: (data) => {
      if (!data.status) {
        router.back();
        errorToast(API_MESSAGE.ERROR);
      }
    },
    onError: () => {
      router.back();
      errorToast(API_MESSAGE.ERROR);
    },
  });

  useEffect(() => {
    if (!id) return;
    setIdQuery(id as string);
  }, [router, form]);

  const handleIdQuery = (id: string) => {
    setIdQuery(id as string);
  };

  const onFinish = (formValues: IFormValues) => {
    if (idQuery) {
      handleSubmit && handleSubmit(formValues, idQuery);
    } else {
      handleSubmit && handleSubmit(formValues);
    }
  };

  const onSaveDraft = () => {
    if (idQuery) {
      handleSaveDraft && handleSaveDraft(form.getFieldsValue(), idQuery);
    } else {
      handleSaveDraft && handleSaveDraft(form.getFieldsValue());
    }
  };

  const detailQuery = useQuery({
    queryKey: [API_STAFF.GET_DETAIL, idQuery],
    queryFn: () => getStaffDetail(idQuery as string),
    enabled: idQuery !== undefined,
    onSuccess: (data) => {
      if (data.status) {
        form.setFieldsValue({
          genderID: data.data.genderID,
          employeeCode: data.data.employeeCode,
          aslRoleID: data.data.aslRoleID,
          ipAddress: data.data.ipAddress,
          email: data.data.email,
          firstName: data.data.firstName,
          lastName: data.data.lastName,
          fullName: data.data.fullName,
          address: data.data.address,
          phoneNumber: data.data.phoneNumber,
          taxCode: data.data.taxCode,
          userBirthday: dayjs(Number(data.data.userBirthday)),
          workingBranch: data.data.workingBranch,
          nationality: data.data.nationality,
          visa: data.data.visa,
          citizenIdentification: data.data.citizenIdentification,
          note: data.data.note,
          avatar: data.data.avatar,
          statusUser: data.data.statusUser,
        });
      } else {
        router.push(ROUTERS.STAFF);
      }
    },
  });

  const handleCheckEdit = (data: boolean) => {
    setCheckPermissionEdit(data);
  };

  const handleAR = (status: string) => {
    if (idQuery) {
      const _requestData: UpdateStatusLocationType = {
        id: [idQuery],
        status,
      };
      updateStatusMutation.mutate(_requestData, {
        onSuccess: (data) => {
          data.status
            ? (successToast(data.message), router.push(ROUTERS.STAFF))
            : errorToast(data.message);
        },
        onError() {
          errorToast(API_MESSAGE.ERROR);
        },
      });
    } else {
      errorToast(API_MESSAGE.ERROR);
    }
  };

  const updateStatusMutation = useMutation({
    mutationFn: (body: UpdateStatusUnit) => {
      return updateStatus(body);
    },
  });

  const handleCopyAndCreate = () => {
    const props = {
      checkCopyAndCreate: true,
      genderID: form.getFieldValue('genderID'),
      roleID: form.getFieldValue('roleID'),
      aslRoleID: form.getFieldValue('aslRoleID'),
      ipAddress: form.getFieldValue('ipAddress'),
      email: form.getFieldValue('email'),
      firstName: form.getFieldValue('firstName'),
      lastName: form.getFieldValue('lastName'),
      fullName: form.getFieldValue('fullName'),
      employeeCode: form.getFieldValue('employeeCode'),
      address: form.getFieldValue('address'),
      phoneNumber: form.getFieldValue('phoneNumber'),
      taxCode: form.getFieldValue('taxCode'),
      userBirthday: form.getFieldValue('userBirthday')?.valueOf(),
      workingBranch: form.getFieldValue('workingBranch'),
      nationality: form.getFieldValue('nationality'),
      visa: form.getFieldValue('visa'),
      citizenIdentification: form.getFieldValue('citizenIdentification'),
      note: form.getFieldValue('note'),
      avatar: form.getFieldValue('avatar'),
      statusUser: form.getFieldValue('statusUser'),
    };
    router.push({
      pathname: ROUTERS.STAFF_CREATE,
      query: props,
    });
  };

  useEffect(() => {
    if (form.getFieldValue('statusUser')) {
      form.getFieldValue('statusUser') === STATUS_ALL_LABELS.ACTIVE
        ? setCheckStatus(true)
        : setCheckStatus(false);
    }
    if ((edit && checkRow) || manager) {
      setCheckPermissionEdit(true);
    }
    if (propCopyAndCreate.checkCopyAndCreate) {
      form.setFieldsValue({
        genderID: propCopyAndCreate.genderID as string,
        employeeCode: propCopyAndCreate.employeeCode as string,
        aslRoleID: propCopyAndCreate.aslRoleID as string,
        ipAddress: propCopyAndCreate.ipAddress as string,
        email: propCopyAndCreate.email as string,
        firstName: propCopyAndCreate.firstName as string,
        lastName: propCopyAndCreate.lastName as string,
        fullName: propCopyAndCreate.fullName as string,
        address: propCopyAndCreate.address as string,
        phoneNumber: propCopyAndCreate.phoneNumber as string,
        taxCode: propCopyAndCreate.taxCode as string,
        userBirthday: dayjs(Number(propCopyAndCreate.userBirthday as string)),
        workingBranch: propCopyAndCreate.workingBranch as string,
        nationality: propCopyAndCreate.nationality as string,
        visa: propCopyAndCreate.visa as string,
        citizenIdentification:
          propCopyAndCreate.citizenIdentification as string,
        note: propCopyAndCreate.note as string,
        avatar: propCopyAndCreate.avatar as string,
        statusUser: propCopyAndCreate.statusUser as string,
      });
    }
  }, [
    form,
    edit,
    checkRow,
    manager,
    propCopyAndCreate,
    form.getFieldValue('statusUser'),
  ]);

  return (
    <div style={{ padding: '24px 0' }}>
      <Form
        form={form}
        initialValues={initialValue}
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
      >
        <Card
          style={{ marginBottom: 24 }}
          title={
            <Row justify={'center'}>
              <Col>
                <Title level={3} style={{ margin: '-4px 0' }}>
                  {create && translateStaff('information_add_staff')}
                  {manager && 'Approval needed requests'}
                  {edit &&
                    (checkRow ? (
                      <>
                        {isCheckPermissionEdit && 'View'}
                        {!isCheckPermissionEdit &&
                          translateStaff('information_edit_staff')}
                      </>
                    ) : (
                      translateStaff('information_edit_staff')
                    ))}
                </Title>
              </Col>
            </Row>
          }
          extra={
            <>
              {create && useDraft && (
                <DraftTable handleIdQuery={handleIdQuery} />
              )}
              {edit && idQuery && !isCheckPermissionEdit && (
                <Switch
                  checked={checkStatus}
                  checkedChildren="Active"
                  unCheckedChildren="Deactive"
                  style={{
                    backgroundColor: checkStatus
                      ? STATUS_MASTER_COLORS.ACTIVE
                      : STATUS_MASTER_COLORS.DEACTIVE,
                  }}
                  onChange={(value) => {
                    const _requestData: UpdateStatusLocationType = {
                      id: [idQuery],
                      status: value
                        ? STATUS_ALL_LABELS.ACTIVE
                        : STATUS_ALL_LABELS.DEACTIVE,
                    };

                    updateStatusMutation.mutate(_requestData, {
                      onSuccess: (data) => {
                        data.status
                          ? (successToast(data.message),
                            setCheckStatus(!checkStatus))
                          : errorToast(data.message);
                      },
                      onError() {
                        errorToast(API_MESSAGE.ERROR);
                      },
                    });
                  }}
                  loading={updateStatusMutation.isLoading}
                />
              )}
            </>
          }
        >
          <Row gutter={16}>
            <Col lg={12} span={24}>
              <Form.Item
                label={translateStaff('lastName_form.title')}
                name="lastName"
                rules={[
                  {
                    required: true,
                    message: translateStaff('lastName_form.error_required'),
                  },
                ]}
              >
                <Input
                  placeholder={translateStaff('lastName_form.placeholder')}
                  size="large"
                  disabled={checkRow && isCheckPermissionEdit}
                />
              </Form.Item>
            </Col>
            <Col lg={12} span={24}>
              <Form.Item
                label={translateStaff('firstName_form.title')}
                name="firstName"
                rules={[
                  {
                    required: true,
                    message: translateStaff('firstName_form.error_required'),
                  },
                ]}
              >
                <Input
                  placeholder={translateStaff('firstName_form.placeholder')}
                  size="large"
                  disabled={checkRow && isCheckPermissionEdit}
                />
              </Form.Item>
            </Col>

            <Col lg={8} span={24}>
              <Form.Item
                label={translateStaff('employeeCode_form.title')}
                name="employeeCode"
                rules={[
                  {
                    required: true,
                    message: translateStaff('employeeCode_form.error_required'),
                  },
                ]}
              >
                <Input
                  placeholder={translateStaff('employeeCode_form.placeholder')}
                  size="large"
                  disabled={checkRow && isCheckPermissionEdit}
                />
              </Form.Item>
            </Col>
            <Col lg={8} span={24}>
              <Form.Item
                label={translateStaff('email_form.title')}
                name="email"
                rules={[
                  {
                    required: true,
                    message: translateStaff('email_form.error_required'),
                  },
                ]}
              >
                <Input
                  placeholder={translateStaff('email_form.placeholder')}
                  size="large"
                  disabled={checkRow && isCheckPermissionEdit}
                />
              </Form.Item>
            </Col>
            <Col lg={8} span={24}>
              <Form.Item
                label={translateStaff('phone_number_form.title')}
                name="phoneNumber"
                rules={[
                  {
                    required: true,
                    message: translateStaff('phone_number_form.error_required'),
                  },
                ]}
              >
                <Input
                  placeholder={translateStaff('phone_number_form.placeholder')}
                  size="large"
                  disabled={checkRow && isCheckPermissionEdit}
                />
              </Form.Item>
            </Col>

            <Col lg={8} span={24}>
              <Form.Item
                label={translateStaff('birthday_form.title')}
                name="userBirthday"
                rules={[
                  {
                    required: true,
                    message: translateStaff('birthday_form.error_required'),
                  },
                ]}
              >
                <DatePicker
                  disabled={checkRow && isCheckPermissionEdit}
                  format={dateFormat}
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>
            <Col lg={8} span={24}>
              <Form.Item
                label={translateStaff('aslRoleID_form.title')}
                name="aslRoleID"
                rules={[
                  {
                    required: true,
                    message: translateStaff('aslRoleID_form.error_required'),
                  },
                ]}
              >
                <Select
                  showSearch
                  placeholder={translateStaff('aslRoleID_form.placeholder')}
                  disabled={checkRow && isCheckPermissionEdit}
                  optionFilterProp="children"
                  size="large"
                  filterOption={(input, option) =>
                    (option?.label ?? '').includes(input)
                  }
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? '')
                      .toLowerCase()
                      .localeCompare((optionB?.label ?? '').toLowerCase())
                  }
                  options={
                    getRoleStaff.data?.data?.map((item) => {
                      return {
                        value: item.roleID,
                        label: item.name,
                      };
                    }) || []
                  }
                />
              </Form.Item>
            </Col>
            <Col lg={8} span={24}>
              <Form.Item
                label={translateStaff('gender_form.title')}
                name="genderID"
                rules={[
                  {
                    required: true,
                    message: translateStaff('gender_form.error_required'),
                  },
                ]}
              >
                <Select
                  showSearch
                  placeholder={translateStaff('gender_form.placeholder')}
                  disabled={checkRow && isCheckPermissionEdit}
                  optionFilterProp="children"
                  size="large"
                  filterOption={(input, option) =>
                    (option?.label ?? '').includes(input)
                  }
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? '')
                      .toLowerCase()
                      .localeCompare((optionB?.label ?? '').toLowerCase())
                  }
                  options={
                    getGender.data?.data.map((item) => {
                      return {
                        value: item.genderID,
                        label: item.name,
                      };
                    }) || []
                  }
                />
              </Form.Item>
            </Col>

            <Col lg={8} span={24}>
              <Form.Item
                label={translateStaff('visa_form.title')}
                name="visa"
                rules={[
                  {
                    required: true,
                    message: translateStaff('visa_form.error_required'),
                  },
                ]}
              >
                <Input
                  placeholder={translateStaff('visa_form.placeholder')}
                  size="large"
                  disabled={checkRow && isCheckPermissionEdit}
                />
              </Form.Item>
            </Col>
            <Col lg={8} span={24}>
              <Form.Item
                label={translateStaff('nationality_form.title')}
                name="nationality"
                rules={[
                  {
                    required: true,
                    message: translateStaff('nationality_form.error_required'),
                  },
                ]}
              >
                <Input
                  placeholder={translateStaff('nationality_form.placeholder')}
                  size="large"
                  disabled={checkRow && isCheckPermissionEdit}
                />
              </Form.Item>
            </Col>

            <Col lg={8} span={24}>
              <Form.Item
                label={translateStaff('workingBranch_form.title')}
                name="workingBranch"
                rules={[
                  {
                    required: true,
                    message: translateStaff(
                      'workingBranch_form.error_required'
                    ),
                  },
                ]}
              >
                <Input
                  placeholder={translateStaff('workingBranch_form.placeholder')}
                  size="large"
                  disabled={checkRow && isCheckPermissionEdit}
                />
              </Form.Item>
            </Col>
            <Col lg={8} span={24}>
              <Form.Item
                label={translateStaff('taxCode_form.title')}
                name="taxCode"
                rules={[
                  {
                    required: true,
                    message: translateStaff('taxCode_form.error_required'),
                  },
                ]}
              >
                <Input
                  placeholder={translateStaff('taxCode_form.placeholder')}
                  size="large"
                  disabled={checkRow && isCheckPermissionEdit}
                />
              </Form.Item>
            </Col>
            <Col lg={8} span={24}>
              <Form.Item
                label={translateStaff('ipAddress_form.title')}
                name="ipAddress"
                rules={[
                  {
                    required: true,
                    message: translateStaff('ipAddress_form.error_required'),
                  },
                ]}
              >
                <Input
                  placeholder={translateStaff('ipAddress_form.placeholder')}
                  size="large"
                  disabled={checkRow && isCheckPermissionEdit}
                />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                label={translateStaff('address_form.title')}
                name="address"
                rules={[
                  {
                    required: true,
                    message: translateStaff('address_form.error_required'),
                  },
                ]}
              >
                <Input
                  placeholder={translateStaff('address_form.placeholder')}
                  size="large"
                  disabled={checkRow && isCheckPermissionEdit}
                />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                label={translateStaff('note_form.title')}
                name="note"
                // rules={[
                //   {
                //     required: true,
                //     message: translateStaff('note_form.error_required'),
                //   },
                // ]}
              >
                <TextArea
                  size="large"
                  placeholder={translateStaff('note_form.placeholder')}
                  allowClear
                  disabled={checkRow && isCheckPermissionEdit}
                />
              </Form.Item>
            </Col>
            <Col span={0}>
              <Form.Item name="statusUser"></Form.Item>
            </Col>
            <Col span={0}>
              <Form.Item name="avatar"></Form.Item>
            </Col>
          </Row>
        </Card>

        <BottomCreateEdit
          create={create}
          checkRow={checkRow}
          edit={edit}
          loading={loadingSubmit || false}
          isCheckPermissionEdit={isCheckPermissionEdit}
          insertedByUser={''}
          dateInserted={''}
          updatedByUser={detailQuery.data?.data?.dateCreated || ''}
          dateUpdated={detailQuery.data?.data?.dateUpdated || ''}
          handleCheckEdit={handleCheckEdit}
          handleSaveDraft={onSaveDraft}
          manager={manager}
          handleAR={handleAR}
          checkQuery={idQuery ? true : false}
          useDraft={useDraft}
          handleCopyAndCreate={handleCopyAndCreate}
        />
      </Form>
    </div>
  );
};

export default UnitForm;
