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
import {
  API_GENDER,
  API_MASTER_DATA,
  API_PARTNER,
  API_PARTNER_ROLE,
} from '@/fetcherAxios/endpoint';
import { BottomCreateEdit } from '@/components/commons/bottom-edit-creat-manager';
import { getListGender, getUnitDetail, updateStatus } from '../fetcher';
import DraftTable from '../table/draft-table';
import { STATUS_ALL_LABELS, STATUS_MASTER_COLORS } from '@/constant/form';
import { UpdateStatusLocationType } from '@/components/menu-item/master-data/location-catalog/type-of-location/interface';
import { errorToast, successToast } from '@/hook/toast';
import { API_MESSAGE } from '@/constant/message';
import dayjs from 'dayjs';
import { getAllPartnerRole } from '../../quotation/sea/fetcher';
import { getListCity } from '@/layout/fetcher';

const initialValue = {
  description: '',
};
const dateFormat = 'YYYY/MM/DD';

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
  const { translate: translatePartner } = useI18n('partner');
  const router = useRouter();
  const [form] = Form.useForm<IFormValues>();
  const { id } = router.query;
  const [idQuery, setIdQuery] = useState<string>();
  const [isCheckPermissionEdit, setCheckPermissionEdit] =
    useState<boolean>(false);
  const [checkStatus, setCheckStatus] = useState<boolean>(true);
  const propCopyAndCreate = router.query;

  const getAllPartner = useQuery({
    queryKey: [API_PARTNER_ROLE.GET_ALL],
    queryFn: () => getAllPartnerRole(),
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

  const city = useQuery([API_MASTER_DATA.GET_COUNTRY], () =>
    getListCity({
      currentPage: 1,
      pageSize: 5000,
    })
  );
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
    queryKey: [API_PARTNER.GET_DETAIL, idQuery],
    queryFn: () => getUnitDetail(idQuery as string),
    enabled: idQuery !== undefined,
    onSuccess: (data) => {
      if (data.status) {
        form.setFieldsValue({
          languageID: data.data.languageID,
          genderID: data.data.genderID,
          roleID: data.data.roleID,
          cityID: data.data.cityID,
          aslPersonalContactID: data.data.aslPersonalContactID,
          email: data.data.email,
          firstName: data.data.firstName,
          lastName: data.data.lastName,
          fullName: data.data.fullName,
          companyNameEN: data.data.companyNameEN,
          companyNameVN: data.data.companyNameVN,
          abbreviations: data.data.abbreviations,
          emailCompany: data.data.emailCompany,
          phoneNumber: data.data.phoneNumber,
          taxCode: data.data.taxCode,
          addressEN: data.data.addressEN,
          addressVN: data.data.addressVN,
          birthdated: dayjs(Number(data.data.birthdated)),
          workingBranch: data.data.workingBranch,
          nationality: data.data.nationality,
          visa: data.data.visa,
          citizenIdentification: data.data.citizenIdentification,
          website: data.data.website,
          note: data.data.note,
          avatar: data.data.avatar,
          statusUser: data.data.statusUser,
        });
      } else {
        router.push(ROUTERS.PARTNER);
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
            ? (successToast(data.message), router.push(ROUTERS.PARTNER))
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
      languageID: form.getFieldValue('languageID'),
      genderID: form.getFieldValue('genderID'),
      roleID: form.getFieldValue('roleID'),
      cityID: form.getFieldValue('cityID'),
      aslPersonalContactID: form.getFieldValue('aslPersonalContactID'),
      email: form.getFieldValue('email'),
      firstName: form.getFieldValue('firstName'),
      lastName: form.getFieldValue('lastName'),
      fullName: form.getFieldValue('fullName'),
      companyNameEN: form.getFieldValue('companyNameEN'),
      companyNameVN: form.getFieldValue('companyNameVN'),
      abbreviations: form.getFieldValue('abbreviations'),
      emailCompany: form.getFieldValue('emailCompany'),
      phoneNumber: form.getFieldValue('phoneNumber'),
      taxCode: form.getFieldValue('taxCode'),
      addressEN: form.getFieldValue('addressEN'),
      addressVN: form.getFieldValue('addressVN'),
      birthdated: form.getFieldValue('birthdated')?.valueOf(),
      workingBranch: form.getFieldValue('workingBranch'),
      nationality: form.getFieldValue('nationality'),
      visa: form.getFieldValue('visa'),
      citizenIdentification: form.getFieldValue('citizenIdentification'),
      website: form.getFieldValue('website'),
      note: form.getFieldValue('note'),
      avatar: form.getFieldValue('avatar'),
      statusUser: form.getFieldValue('statusUser'),
    };
    router.push({
      pathname: ROUTERS.PARTNER_CREATE,
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
        languageID: propCopyAndCreate.languageID as string,
        genderID: propCopyAndCreate.genderID as string,
        roleID: propCopyAndCreate.roleID as string,
        cityID: propCopyAndCreate.cityID as string,
        aslPersonalContactID: propCopyAndCreate.aslPersonalContactID as string,
        email: propCopyAndCreate.email as string,
        firstName: propCopyAndCreate.firstName as string,
        lastName: propCopyAndCreate.lastName as string,
        fullName: propCopyAndCreate.fullName as string,
        companyNameEN: propCopyAndCreate.companyNameEN as string,
        companyNameVN: propCopyAndCreate.companyNameVN as string,
        abbreviations: propCopyAndCreate.abbreviations as string,
        emailCompany: propCopyAndCreate.emailCompany as string,
        phoneNumber: propCopyAndCreate.phoneNumber as string,
        taxCode: propCopyAndCreate.taxCode as string,
        addressEN: propCopyAndCreate.addressEN as string,
        addressVN: propCopyAndCreate.addressVN as string,
        birthdated: dayjs(Number(propCopyAndCreate.birthdated as string)),
        workingBranch: propCopyAndCreate.workingBranch as string,
        nationality: propCopyAndCreate.nationality as string,
        visa: propCopyAndCreate.visa as string,
        citizenIdentification:
          propCopyAndCreate.citizenIdentification as string,
        website: propCopyAndCreate.website as string,
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
                  {create && translatePartner('information_add_partner')}
                  {manager && 'Approval needed requests'}
                  {edit &&
                    (checkRow ? (
                      <>
                        {isCheckPermissionEdit && 'View'}
                        {!isCheckPermissionEdit &&
                          translatePartner('information_edit_partner')}
                      </>
                    ) : (
                      translatePartner('information_edit_partner')
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
                label={translatePartner('firstName_form.title')}
                name="firstName"
                rules={[
                  {
                    required: true,
                    message: translatePartner('firstName_form.error_required'),
                  },
                ]}
              >
                <Input
                  placeholder={translatePartner('firstName_form.placeholder')}
                  size="large"
                  disabled={checkRow && isCheckPermissionEdit}
                />
              </Form.Item>
            </Col>
            <Col lg={12} span={24}>
              <Form.Item
                label={translatePartner('lastName_form.title')}
                name="lastName"
                rules={[
                  {
                    required: true,
                    message: translatePartner('lastName_form.error_required'),
                  },
                ]}
              >
                <Input
                  placeholder={translatePartner('lastName_form.placeholder')}
                  size="large"
                  disabled={checkRow && isCheckPermissionEdit}
                />
              </Form.Item>
            </Col>

            <Col lg={8} span={24}>
              <Form.Item
                label={translatePartner('email_form.title')}
                name="email"
                rules={[
                  {
                    required: true,
                    message: translatePartner('email_form.error_required'),
                  },
                ]}
              >
                <Input
                  placeholder={translatePartner('email_form.placeholder')}
                  size="large"
                  disabled={checkRow && isCheckPermissionEdit}
                />
              </Form.Item>
            </Col>
            <Col lg={8} span={24}>
              <Form.Item
                label={translatePartner('phone_number_form.title')}
                name="phoneNumber"
                rules={[
                  {
                    required: true,
                    message: translatePartner(
                      'phone_number_form.error_required'
                    ),
                  },
                ]}
              >
                <Input
                  placeholder={translatePartner(
                    'phone_number_form.placeholder'
                  )}
                  size="large"
                  disabled={checkRow && isCheckPermissionEdit}
                />
              </Form.Item>
            </Col>
            <Col lg={8} span={24}>
              <Form.Item
                label={translatePartner('birthday_form.title')}
                name="birthdated"
                rules={[
                  {
                    required: true,
                    message: translatePartner('birthday_form.error_required'),
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
                label={translatePartner('role_form.title')}
                name="roleID"
                rules={[
                  {
                    required: true,
                    message: translatePartner('role_form.error_required'),
                  },
                ]}
              >
                <Select
                  showSearch
                  placeholder={translatePartner('role_form.placeholder')}
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
                    getAllPartner.data?.data.map((item) => {
                      return {
                        value: item.partnerRoleID,
                        label: item.abbreviations,
                      };
                    }) || []
                  }
                />
              </Form.Item>
            </Col>
            <Col lg={8} span={24}>
              <Form.Item
                label={translatePartner('city_form.title')}
                name="cityID"
                rules={[
                  {
                    required: true,
                    message: translatePartner('city_form.error_required'),
                  },
                ]}
              >
                <Select
                  showSearch
                  placeholder={translatePartner('city_form.placeholder')}
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
                    city.data?.data?.data.map((item) => {
                      return {
                        value: item.cityID,
                        label: item.cityName,
                      };
                    }) || []
                  }
                />
              </Form.Item>
            </Col>
            <Col lg={8} span={24}>
              <Form.Item
                label={translatePartner('gender_form.title')}
                name="genderID"
                rules={[
                  {
                    required: true,
                    message: translatePartner('gender_form.error_required'),
                  },
                ]}
              >
                <Select
                  showSearch
                  placeholder={translatePartner('gender_form.placeholder')}
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
                label={translatePartner('visa_form.title')}
                name="visa"
                rules={[
                  {
                    required: true,
                    message: translatePartner('visa_form.error_required'),
                  },
                ]}
              >
                <Input
                  placeholder={translatePartner('visa_form.placeholder')}
                  size="large"
                  disabled={checkRow && isCheckPermissionEdit}
                />
              </Form.Item>
            </Col>
            <Col lg={8} span={24}>
              <Form.Item
                label={translatePartner('citizenIdentification_form.title')}
                name="citizenIdentification"
                rules={[
                  {
                    required: true,
                    message: translatePartner(
                      'citizenIdentification_form.error_required'
                    ),
                  },
                ]}
              >
                <Input
                  placeholder={translatePartner(
                    'citizenIdentification_form.placeholder'
                  )}
                  size="large"
                  disabled={checkRow && isCheckPermissionEdit}
                />
              </Form.Item>
            </Col>
            <Col lg={8} span={24}>
              <Form.Item
                label={translatePartner('nationality_form.title')}
                name="nationality"
                rules={[
                  {
                    required: true,
                    message: translatePartner(
                      'nationality_form.error_required'
                    ),
                  },
                ]}
              >
                <Input
                  placeholder={translatePartner('nationality_form.placeholder')}
                  size="large"
                  disabled={checkRow && isCheckPermissionEdit}
                />
              </Form.Item>
            </Col>

            <Col lg={8} span={24}>
              <Form.Item
                label={translatePartner('workingBranch_form.title')}
                name="workingBranch"
                rules={[
                  {
                    required: true,
                    message: translatePartner(
                      'workingBranch_form.error_required'
                    ),
                  },
                ]}
              >
                <Input
                  placeholder={translatePartner(
                    'workingBranch_form.placeholder'
                  )}
                  size="large"
                  disabled={checkRow && isCheckPermissionEdit}
                />
              </Form.Item>
            </Col>
            <Col lg={8} span={24}>
              <Form.Item
                label={translatePartner('taxCode_form.title')}
                name="taxCode"
                rules={[
                  {
                    required: true,
                    message: translatePartner('taxCode_form.error_required'),
                  },
                ]}
              >
                <Input
                  placeholder={translatePartner('taxCode_form.placeholder')}
                  size="large"
                  disabled={checkRow && isCheckPermissionEdit}
                />
              </Form.Item>
            </Col>
            <Col lg={8} span={24}>
              <Form.Item
                label={translatePartner('emailCompany_form.title')}
                name="emailCompany"
                rules={[
                  {
                    required: true,
                    message: translatePartner(
                      'emailCompany_form.error_required'
                    ),
                  },
                ]}
              >
                <Input
                  placeholder={translatePartner(
                    'emailCompany_form.placeholder'
                  )}
                  size="large"
                  disabled={checkRow && isCheckPermissionEdit}
                />
              </Form.Item>
            </Col>

            <Col lg={8} span={24}>
              <Form.Item
                label={translatePartner('companyName_form.titleEN')}
                name="companyNameEN"
                rules={[
                  {
                    required: true,
                    message: translatePartner(
                      'companyName_form.error_required'
                    ),
                  },
                ]}
              >
                <Input
                  placeholder={translatePartner('companyName_form.placeholder')}
                  size="large"
                  disabled={checkRow && isCheckPermissionEdit}
                />
              </Form.Item>
            </Col>
            <Col lg={8} span={24}>
              <Form.Item
                label={translatePartner('companyName_form.titleVN')}
                name="companyNameVN"
                rules={[
                  {
                    required: true,
                    message: translatePartner(
                      'companyName_form.error_required'
                    ),
                  },
                ]}
              >
                <Input
                  placeholder={translatePartner('companyName_form.placeholder')}
                  size="large"
                  disabled={checkRow && isCheckPermissionEdit}
                />
              </Form.Item>
            </Col>
            <Col lg={8} span={24}>
              <Form.Item
                label={translatePartner('abbreviations_form.title')}
                name="abbreviations"
                rules={[
                  {
                    required: true,
                    message: translatePartner(
                      'abbreviations_form.error_required'
                    ),
                  },
                ]}
              >
                <Input
                  placeholder={translatePartner(
                    'abbreviations_form.placeholder'
                  )}
                  size="large"
                  disabled={checkRow && isCheckPermissionEdit}
                />
              </Form.Item>
            </Col>

            <Col lg={8} span={24}>
              <Form.Item
                label={translatePartner('website_form.title')}
                name="website"
                rules={[
                  {
                    required: true,
                    message: translatePartner('website_form.error_required'),
                  },
                ]}
              >
                <Input
                  placeholder={translatePartner('website_form.placeholder')}
                  size="large"
                  disabled={checkRow && isCheckPermissionEdit}
                />
              </Form.Item>
            </Col>
            <Col lg={8} span={24}>
              <Form.Item
                label={translatePartner('address_form.titleEN')}
                name="addressEN"
                rules={[
                  {
                    required: true,
                    message: translatePartner('address_form.error_required'),
                  },
                ]}
              >
                <Input
                  placeholder={translatePartner('address_form.placeholder')}
                  size="large"
                  disabled={checkRow && isCheckPermissionEdit}
                />
              </Form.Item>
            </Col>
            <Col lg={8} span={24}>
              <Form.Item
                label={translatePartner('address_form.titleVN')}
                name="addressVN"
                rules={[
                  {
                    required: true,
                    message: translatePartner('address_form.error_required'),
                  },
                ]}
              >
                <Input
                  placeholder={translatePartner('address_form.placeholder')}
                  size="large"
                  disabled={checkRow && isCheckPermissionEdit}
                />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                label={translatePartner('note_form.title')}
                name="note"
                rules={[
                  {
                    required: true,
                    message: translatePartner('note_form.error_required'),
                  },
                ]}
              >
                <TextArea
                  size="large"
                  placeholder={translatePartner('note_form.placeholder')}
                  allowClear
                  disabled={checkRow && isCheckPermissionEdit}
                />
              </Form.Item>
            </Col>
            <Col span={0}>
              <Form.Item name="statusUser"></Form.Item>
            </Col>
          </Row>
        </Card>

        <BottomCreateEdit
          create={create}
          checkRow={checkRow}
          edit={edit}
          loading={loadingSubmit || false}
          isCheckPermissionEdit={isCheckPermissionEdit}
          insertedByUser={detailQuery.data?.data?.insertedByUser || ''}
          dateInserted={detailQuery.data?.data?.dateInserted || ''}
          updatedByUser={detailQuery.data?.data?.updatedByUser || ''}
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
