import COLORS from '@/constant/color';
import { ROUTERS } from '@/constant/router';
import {
  Button,
  Form,
  Input,
  Typography,
  Card,
  Row,
  Col,
  ConfigProvider,
  DatePicker,
  Space,
  Avatar,
  Descriptions,
  Switch,
} from 'antd';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useI18n from '@/i18n/useI18N';
import { API_USER } from '@/fetcherAxios/endpoint';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getUserDetail, updateStatus } from '../fetcher';
import { FormValues, UpdateStatusUser } from '../interface';
import { formatDate } from '@/utils/format';
import { STATUS_ALL_LABELS, STATUS_MASTER_COLORS } from '@/constant/form';
import { errorToast, successToast } from '@/hook/toast';
import { API_MESSAGE } from '@/constant/message';

const { Title } = Typography;

export default function UserForm() {
  const router = useRouter();
  const [form] = Form.useForm<FormValues>();
  const { id } = router.query;
  const [checkStatus, setCheckStatus] = useState<boolean>(true);

  const dateFormat = 'YYYY-MM-DD';
  const { translate: translateUser } = useI18n('user');
  const { translate: translateCommon } = useI18n('common');
  useEffect(() => {
    if (!id) {
      router.back();
      return;
    }
  }, [router, form]);

  const onFinish = (formValues: FormValues) => {
    return formValues;
  };
  const dataDetail = useQuery({
    queryKey: [API_USER.GET_DETAIL],
    queryFn: () => getUserDetail(id as string),
    enabled: id !== undefined,
    onSuccess: (data) => {
      if (data.status) {
        form.setFieldsValue({
          userID: data.data.userID,
          roleID: data.data.roleID,
          roleName: data.data.roleName,
          genderID: data.data.genderID,
          genderName: data.data.genderName,
          emailAccount: data.data.emailAccount,
          firstName: data.data.firstName,
          lastName: data.data.lastName,
          fullName: data.data.fullName,
          companyName: data.data.companyName,
          abbreviationsCompany: data.data.abbreviationsCompany,
          emailCompany: data.data.emailCompany,
          birthday: dayjs(Number(data.data.birthday)),
          employeeCode: data.data.employeeCode,
          taxCode: data.data.taxCode,
          phoneNumber: data.data.phoneNumber,
          address: data.data.address,
          citizenIdentification: data.data.citizenIdentification,
          visa: data.data.visa,
          nationality: data.data.nationality,
          workingBranch: data.data.workingBranch,
          note: data.data.note,
          website: data.data.website,
          avatar: data.data.avatar,
          colorAvatar: data.data.colorAvatar,
          defaultAvatar: data.data.defaultAvatar,
          lastLoginUser: data.data.lastLoginUser,
          lastFailedLoginUser: data.data.lastFailedLoginUser,
          statusUser: data.data.statusUser,
          createdDateUser: data.data.createdDateUser,
          updatedDateUser: data.data.updatedDateUser,
        });
      } else {
        router.push(ROUTERS.USER);
      }
    },
  });
  useEffect(() => {
    if (form.getFieldValue('statusUser')) {
      form.getFieldValue('statusUser') === STATUS_ALL_LABELS.ACTIVE
        ? setCheckStatus(true)
        : setCheckStatus(false);
    }
  }, [form, form.getFieldValue('statusUser')]);
  const updateStatusMutation = useMutation({
    mutationFn: (body: UpdateStatusUser) => {
      return updateStatus(body);
    },
  });

  return (
    <div style={{ padding: '24px 0' }}>
      <Card
        style={{ marginBottom: 24 }}
        title={
          <Row justify={'center'}>
            <Col>
              <Title level={3} style={{ margin: '-4px 0' }}>
                Detail user
              </Title>
            </Col>
          </Row>
        }
        extra={
          <>
            <Switch
              checked={checkStatus}
              checkedChildren="ACTIVE"
              unCheckedChildren="DEACTIVE"
              style={{
                backgroundColor: checkStatus
                  ? STATUS_MASTER_COLORS.ACTIVE
                  : STATUS_MASTER_COLORS.DEACTIVE,
              }}
              onChange={(value) => {
                const _requestData: UpdateStatusUser = {
                  id: [id as string],
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
          </>
        }
      >
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: COLORS.GREEN,
            },
          }}
        >
          <Form
            form={form}
            onFinish={onFinish}
            autoComplete="off"
            layout="vertical"
          >
            <Row>
              <Col lg={19} span={24}>
                <Row gutter={16}>
                  <Col lg={8} span={24}>
                    <Form.Item
                      label={translateUser('last_name')}
                      name="lastName"
                    >
                      <Input placeholder="Please input Last Name" disabled />
                    </Form.Item>
                  </Col>
                  <Col lg={8} span={24}>
                    <Form.Item
                      label={translateUser('first_name')}
                      name="firstName"
                    >
                      <Input placeholder="Please input First Name" disabled />
                    </Form.Item>
                  </Col>
                  <Col lg={8} span={24}>
                    <Form.Item
                      label={translateUser('full_name')}
                      name="fullName"
                    >
                      <Input placeholder="Please input Full Name" disabled />
                    </Form.Item>
                  </Col>

                  <Col lg={8} span={24}>
                    <Form.Item label={translateUser('CCCD_Visa')} name="visa">
                      <Input disabled />
                    </Form.Item>
                  </Col>
                  <Col lg={8} span={24}>
                    <Form.Item
                      label={translateUser('Citizen Identification')}
                      name="citizenIdentification"
                    >
                      <Input disabled />
                    </Form.Item>
                  </Col>
                  <Col lg={8} span={24}>
                    <Form.Item label={translateUser('Tax')} name="taxCode">
                      <Input disabled />
                    </Form.Item>
                  </Col>

                  <Col lg={8} span={24}>
                    <Form.Item
                      label={translateUser('gender')}
                      name="genderName"
                    >
                      <Input disabled />
                    </Form.Item>
                  </Col>
                  <Col lg={8} span={24}>
                    <Form.Item label={translateUser('dob')} name="birthday">
                      <DatePicker
                        format={dateFormat}
                        style={{ width: '100%' }}
                        disabled
                      />
                    </Form.Item>
                  </Col>
                  <Col lg={8} span={24}>
                    <Form.Item
                      label={translateUser('phone')}
                      name="phoneNumber"
                    >
                      <Input disabled />
                    </Form.Item>
                  </Col>

                  <Col lg={8} span={24}>
                    <Form.Item label={translateUser('role')} name="roleName">
                      <Input disabled />
                    </Form.Item>
                  </Col>
                  <Col lg={16} span={24}></Col>

                  <Col lg={8} span={24}>
                    <Form.Item
                      label={translateUser('email')}
                      name="emailAccount"
                    >
                      <Input disabled />
                    </Form.Item>
                  </Col>
                  <Col lg={16} span={24}>
                    <Form.Item label={translateUser('address')} name="address">
                      <Input disabled />
                    </Form.Item>
                  </Col>

                  <Col lg={16} span={24}>
                    <Form.Item
                      label={translateUser('company')}
                      name="companyName"
                    >
                      <Input disabled />
                    </Form.Item>
                  </Col>
                  <Col lg={8} span={24}>
                    <Form.Item
                      label={translateUser('Abbreviations Company')}
                      name="abbreviationsCompany"
                    >
                      <Input disabled />
                    </Form.Item>
                  </Col>

                  <Col lg={8} span={24}>
                    <Form.Item
                      label={translateUser('nationality')}
                      name="nationality"
                    >
                      <Input disabled />
                    </Form.Item>
                  </Col>
                  <Col lg={8} span={24}>
                    <Form.Item
                      label={translateUser('working_branch')}
                      name="workingBranch"
                    >
                      <Input disabled />
                    </Form.Item>
                  </Col>
                  <Col lg={8} span={24}>
                    <Form.Item label={translateUser('Website')} name="website">
                      <Input disabled />
                    </Form.Item>
                  </Col>

                  <Col lg={8} span={24}>
                    <Form.Item
                      label={translateUser('Email company')}
                      name="emailCompany"
                    >
                      <Input disabled />
                    </Form.Item>
                  </Col>

                  <Col lg={24} span={24}>
                    <Form.Item label={translateUser('note')} name="note">
                      <Input.TextArea disabled />
                    </Form.Item>
                  </Col>
                </Row>
              </Col>

              <Col
                lg={5}
                span={24}
                style={{
                  display: 'flex',
                  justifyContent: 'start',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <Space style={{ position: 'relative' }}>
                  <Avatar
                    style={{
                      backgroundColor: dataDetail.data?.data?.colorAvatar,
                      verticalAlign: 'middle',
                      fontSize: '56px',
                    }}
                    src={dataDetail.data?.data?.avatar}
                    alt="Avatar"
                    size={160}
                  >
                    {dataDetail.data?.data?.defaultAvatar || ''}
                  </Avatar>
                </Space>

                <p
                  style={{
                    marginTop: '10px',
                    fontSize: '18px',
                    marginBottom: '0',
                  }}
                >
                  {dataDetail.data?.data?.employeeCode}
                </p>

                <p
                  style={{
                    fontSize: '18px',
                    marginBottom: '0',
                  }}
                >
                  {dataDetail.data?.data?.fullName}
                </p>
              </Col>
            </Row>
          </Form>
        </ConfigProvider>
      </Card>
      <Card
        style={{
          position: 'sticky',
          bottom: 0,
          zIndex: 11,
        }}
      >
        <Row gutter={12}>
          <Col span={12}>
            <Button onClick={() => router.back()}>Close</Button>
          </Col>
          <Col span={12}>
            <Descriptions column={2}>
              <Descriptions.Item label={translateUser('last_login')}>
                {formatDate(Number(dataDetail.data?.data?.lastLoginUser))}
              </Descriptions.Item>
              <Descriptions.Item label={translateCommon('date_created')}>
                {formatDate(Number(dataDetail.data?.data?.createdDateUser))}
              </Descriptions.Item>
              <Descriptions.Item label={translateCommon('Last Failed Login')}>
                {formatDate(Number(dataDetail.data?.data?.lastFailedLoginUser))}
              </Descriptions.Item>
              <Descriptions.Item label={translateCommon('date_inserted')}>
                {formatDate(Number(dataDetail.data?.data?.updatedDateUser))}
              </Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>
      </Card>
    </div>
  );
}
