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
  Select,
  Collapse,
  Button,
  Badge,
} from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  IFormValues,
  IRolePartners,
  IUserBaseDTOs,
  UpdateStatusUnit,
} from '../interface';
import {
  API_MASTER_DATA,
  API_PARTNER,
  API_PARTNER_ROLE,
  API_STAFF,
} from '@/fetcherAxios/endpoint';
import { BottomCreateEdit } from '@/components/commons/bottom-edit-creat-manager';
import { getUnitDetail, updateStatus } from '../fetcher';
import { STATUS_ALL_LABELS, STATUS_MASTER_COLORS } from '@/constant/form';
import { UpdateStatusLocationType } from '@/components/menu-item/master-data/location-catalog/type-of-location/interface';
import { errorToast, successToast } from '@/hook/toast';
import { API_MESSAGE } from '@/constant/message';
import { getAllPartnerRole } from '../../quotation/sea/fetcher';
import { getListCity } from '@/layout/fetcher';
import { getListStaff } from '../../system/staff/fetcher';
import ListUser from './list-user';
import AddUserModal from './add-user/modal';
import ListSea from './list-sea';
import ListTrucking from './list-trucking';
import ListCustoms from './list-customs';
import ChartPricing from './chart-pricing';
import AirPricing from './list-air';

const { Panel } = Collapse;

const initialValue = {
  address: '',
};

interface PortFormProps {
  create?: boolean;
  manager?: boolean;
  edit?: boolean;
  handleSubmit?: (
    formValues: IFormValues,
    id?: string,
    listPartnerDTOs?: IRolePartners[]
  ) => void;
  handleSaveDraft?: (
    formValues: IFormValues,
    id?: string,
    listPartnerDTOs?: IRolePartners[]
  ) => void;
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
  const [listPartnerDTOs, setListPartnerDTOsDTOs] = useState<IRolePartners[]>(
    []
  );
  const [openAddUserModal, setOpenAddUser] = useState(false);
  const valueRole = Form.useWatch('rolePartners', form);
  const [checkRoleCustomer, setCheckRoleCustomer] = useState<boolean>(false);

  const getAllRole = useQuery({
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

  const getAllStaff = useQuery({
    queryKey: [API_STAFF.GET_ALL],
    queryFn: () => getListStaff(),
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

  const onFinish = (formValues: IFormValues) => {
    if (idQuery) {
      handleSubmit && handleSubmit(formValues, idQuery, listPartnerDTOs);
    } else {
      handleSubmit && handleSubmit(formValues, undefined, listPartnerDTOs);
    }
  };

  const onSaveDraft = () => {
    if (idQuery) {
      handleSaveDraft &&
        handleSaveDraft(form.getFieldsValue(), idQuery, listPartnerDTOs);
    } else {
      handleSaveDraft &&
        handleSaveDraft(form.getFieldsValue(), undefined, listPartnerDTOs);
    }
  };

  const detailQuery = useQuery({
    queryKey: [API_PARTNER.GET_DETAIL, idQuery],
    queryFn: () => getUnitDetail(idQuery as string),
    enabled: idQuery !== undefined,
    onSuccess: (data) => {
      if (data.status) {
        form.setFieldsValue({
          partnerID: data.data.partnerID,
          cityID: data.data.cityID,
          aslPersonalContactID: data.data.aslPersonalContactID,
          companyName: data.data.companyName,
          abbreviations: data.data.abbreviations,
          emailCompany: data.data.emailCompany,
          phoneNumber: data.data.phoneNumber,
          taxCode: data.data.taxCode,
          address: data.data.address,
          website: data.data.website,
          note: data.data.note,
          statusPartner: data.data.statusPartner,
          seaPricingForPartnerDTOs: data.data.seaPricingForPartnerDTOs,
          truckingPricingForPartnerDTOs:
            data.data.truckingPricingForPartnerDTOs,
          customPricingForPartnerDTOs: data.data.customPricingForPartnerDTOs,
          rolePartners: data.data.rolePartners.map(
            (rolePartner) => rolePartner.partnerRoleID
          ),
          userBaseDTOs: data.data.userBaseDTOs,
        });
        setListPartnerDTOsDTOs(data.data.rolePartners);
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
      partnerID: form.getFieldValue('partnerID'),
      cityID: form.getFieldValue('cityID'),
      aslPersonalContactID: form.getFieldValue('aslPersonalContactID'),
      companyName: form.getFieldValue('companyName'),
      abbreviations: form.getFieldValue('abbreviations'),
      emailCompany: form.getFieldValue('emailCompany'),
      phoneNumber: form.getFieldValue('phoneNumber'),
      taxCode: form.getFieldValue('taxCode'),
      address: form.getFieldValue('address'),
      website: form.getFieldValue('website'),
      note: form.getFieldValue('note'),
      statusPartner: form.getFieldValue('statusPartner'),
      rolePartners: form.getFieldValue('rolePartners'),
      userBaseDTOs: form.getFieldValue('userBaseDTOs'),
    };
    router.push({
      pathname: ROUTERS.PARTNER_CREATE,
      query: props,
    });
  };

  useEffect(() => {
    if (form.getFieldValue('statusPartner')) {
      form.getFieldValue('statusPartner') === STATUS_ALL_LABELS.ACTIVE
        ? setCheckStatus(true)
        : setCheckStatus(false);
    }
    if ((edit && checkRow) || manager) {
      setCheckPermissionEdit(true);
    }
    if (propCopyAndCreate.checkCopyAndCreate) {
      form.setFieldsValue({
        partnerID: propCopyAndCreate.partnerID as string,
        cityID: propCopyAndCreate.cityID as string,
        aslPersonalContactID: propCopyAndCreate.aslPersonalContactID as string,
        companyName: propCopyAndCreate.companyName as string,
        abbreviations: propCopyAndCreate.abbreviations as string,
        emailCompany: propCopyAndCreate.emailCompany as string,
        phoneNumber: propCopyAndCreate.phoneNumber as string,
        taxCode: propCopyAndCreate.taxCode as string,
        address: propCopyAndCreate.address as string,
        website: propCopyAndCreate.website as string,
        note: propCopyAndCreate.note as string,
        statusPartner: propCopyAndCreate.statusPartner as string,
        rolePartners: propCopyAndCreate.rolePartners as unknown as string[],
        userBaseDTOs:
          propCopyAndCreate.userBaseDTOs as unknown as IUserBaseDTOs[],
      });
    }
  }, [
    form,
    edit,
    checkRow,
    manager,
    propCopyAndCreate,
    form.getFieldValue('statusPartner'),
  ]);

  //handle create quotation
  const cancelAddUser = () => {
    setOpenAddUser(false);
  };

  const handleOpenAddUser = () => {
    setOpenAddUser(true);
  };

  const handleAddUser = () => {
    setOpenAddUser(false);
  };

  useEffect(() => {
    const Role =
      getAllRole.data?.data.map((item) => {
        return {
          value: item.roleID,
          label: item.name,
        };
      }) || [];
    const filteredRoles = Role.filter((item1) =>
      valueRole?.includes(item1.value)
    );
    const checkRoleCustomer = filteredRoles.find(
      (item) => item.label === 'CUSTOMER'
    );
    checkRoleCustomer
      ? setCheckRoleCustomer(true)
      : setCheckRoleCustomer(false);
  }, [valueRole]);

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
            <Col lg={16} span={24}>
              <Form.Item
                label={translatePartner('companyName_form.title')}
                name="companyName"
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
                label={translatePartner('address_form.title')}
                name="address"
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
                label={translatePartner('role_form.title')}
                name="rolePartners"
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
                  mode="multiple"
                  options={
                    getAllRole.data?.data.map((item) => {
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
                label={translatePartner('city_form.title')}
                name="cityID"
                // rules={[
                //   {
                //     required: true,
                //     message: translatePartner('city_form.error_required'),
                //   },
                // ]}
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
                label={translatePartner('taxCode_form.title')}
                name="taxCode"
                rules={[
                  {
                    required: checkRoleCustomer ? true : false,
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
                label={translatePartner('website_form.title')}
                name="website"
                // rules={[
                //   {
                //     required: true,
                //     message: translatePartner('website_form.error_required'),
                //   },
                // ]}
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
                label={translatePartner('aslPersonalContactID_form.title')}
                name="aslPersonalContactID"
                // rules={[
                //   {
                //     required: true,
                //     message: translatePartner(
                //       'aslPersonalContactID_form.error_required'
                //     ),
                //   },
                // ]}
              >
                <Select
                  showSearch
                  placeholder={translatePartner(
                    'aslPersonalContactID_form.placeholder'
                  )}
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
                    getAllStaff.data?.data.map((item) => {
                      return {
                        value: item.aslPersonalContactID,
                        label: item.fullName,
                      };
                    }) || []
                  }
                />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                label={translatePartner('note_form.title')}
                name="note"
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
              <Form.Item name="statusPartner"></Form.Item>
            </Col>
            <Col span={0}>
              <Form.Item name="userBaseDTOs"></Form.Item>
            </Col>
            <Col span={0}>
              <Form.Item name="seaPricingForPartnerDTOs"></Form.Item>
            </Col>
            <Col span={0}>
              <Form.Item name="truckingPricingForPartnerDTOs"></Form.Item>
            </Col>
            <Col span={0}>
              <Form.Item name="customPricingForPartnerDTOs"></Form.Item>
            </Col>
          </Row>
        </Card>

        <Collapse
          style={{
            borderRadius: 4,
            boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
            background: 'white',
            border: 'none',
            marginBottom: '16px',
            display: create ? 'none' : '',
          }}
        >
          <Panel
            style={{
              borderRadius: 4,
              boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
              background: 'white',
              border: 'none',
            }}
            forceRender
            header={
              <Badge count={0} style={{ marginRight: '-10px' }}>
                <Title level={3} style={{ margin: '-4px 0' }}>
                  List user
                </Title>
              </Badge>
            }
            extra={
              <Button
                type="primary"
                // htmlType="submit"
                onClick={(event) => {
                  handleOpenAddUser();
                  event.stopPropagation();
                }}
              >
                Add user
              </Button>
            }
            key="1"
          >
            <AddUserModal
              open={openAddUserModal}
              handleOk={handleAddUser}
              handleCancel={cancelAddUser}
            />
            <ListUser form={form} />
          </Panel>
        </Collapse>

        <Collapse
          style={{
            borderRadius: 4,
            boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
            background: 'white',
            border: 'none',
            marginBottom: '16px',
            display:
              create || valueRole?.length > 1 || !checkRoleCustomer
                ? ''
                : 'none',
          }}
        >
          <Panel
            style={{
              borderRadius: 4,
              boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
              background: 'white',
              border: 'none',
            }}
            forceRender
            header={
              <Badge count={0} style={{ marginRight: '-10px' }}>
                <Title level={3} style={{ margin: '-4px 0' }}>
                  List sea pricing
                </Title>
              </Badge>
            }
            key="1"
          >
            <ListSea />
          </Panel>
        </Collapse>

        <Collapse
          style={{
            borderRadius: 4,
            boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
            background: 'white',
            border: 'none',
            marginBottom: '16px',
            display:
              create || valueRole?.length > 1 || !checkRoleCustomer
                ? ''
                : 'none',
          }}
        >
          <Panel
            style={{
              borderRadius: 4,
              boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
              background: 'white',
              border: 'none',
            }}
            forceRender
            header={
              <Badge count={0} style={{ marginRight: '-10px' }}>
                <Title level={3} style={{ margin: '-4px 0' }}>
                  List air pricing
                </Title>
              </Badge>
            }
            key="1"
          >
            <AirPricing />
          </Panel>
        </Collapse>

        <Collapse
          style={{
            borderRadius: 4,
            boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
            background: 'white',
            border: 'none',
            marginBottom: '16px',
            display:
              create || valueRole?.length > 1 || !checkRoleCustomer
                ? ''
                : 'none',
          }}
        >
          <Panel
            style={{
              borderRadius: 4,
              boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
              background: 'white',
              border: 'none',
            }}
            forceRender
            header={
              <Badge count={0} style={{ marginRight: '-10px' }}>
                <Title level={3} style={{ margin: '-4px 0' }}>
                  List trucking pricing
                </Title>
              </Badge>
            }
            key="1"
          >
            <ListTrucking />
          </Panel>
        </Collapse>

        <Collapse
          style={{
            borderRadius: 4,
            boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
            background: 'white',
            border: 'none',
            marginBottom: '16px',
            display:
              create || valueRole?.length > 1 || !checkRoleCustomer
                ? ''
                : 'none',
          }}
        >
          <Panel
            style={{
              borderRadius: 4,
              boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
              background: 'white',
              border: 'none',
            }}
            forceRender
            header={
              <Badge count={0} style={{ marginRight: '-10px' }}>
                <Title level={3} style={{ margin: '-4px 0' }}>
                  List customs pricing
                </Title>
              </Badge>
            }
            key="1"
          >
            <ListCustoms />
          </Panel>
        </Collapse>

        <Collapse
          style={{
            borderRadius: 4,
            boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
            background: 'white',
            border: 'none',
            marginBottom: '16px',
            display: create || !checkRoleCustomer ? 'none' : '',
          }}
        >
          <Panel
            style={{
              borderRadius: 4,
              boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
              background: 'white',
              border: 'none',
            }}
            forceRender
            header={
              <Badge count={0} style={{ marginRight: '-10px' }}>
                <Title level={3} style={{ margin: '-4px 0' }}>
                  Booking
                </Title>
              </Badge>
            }
            key="1"
          >
            <ChartPricing />
          </Panel>
        </Collapse>

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
