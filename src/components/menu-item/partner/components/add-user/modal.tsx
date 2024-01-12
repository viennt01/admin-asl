import React from 'react';
import { Button, Modal, Form, Row, Col, DatePicker, Input, Select } from 'antd';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addUserPartner, getListGender } from '../../fetcher';
import { IRequestAddUserPartner } from '../../interface';
import { errorToast, successToast } from '@/hook/toast';
import { API_MESSAGE } from '@/constant/message';
import { API_GENDER, API_PARTNER } from '@/fetcherAxios/endpoint';
import useI18n from '@/i18n/useI18N';
import { useRouter } from 'next/router';

export interface ImportFormValues {
  file: FileList;
}

interface ImportModalProps {
  open: boolean;
  handleOk: () => void;
  handleCancel: () => void;
}
const dateFormat = 'YYYY-MM-DD';

export interface DataType {
  key: React.Key;
  containerName: string;
  profitRate: string;
}

export interface DataTypeProfit {
  key: React.Key;
  unitName: string;
  profitRate: string;
}

const { TextArea } = Input;

const AddUserModal: React.FC<ImportModalProps> = ({
  open,
  handleOk,
  handleCancel,
}) => {
  const router = useRouter();
  const [form] = Form.useForm();
  const { id } = router.query;
  const onOke = () => form.submit();
  const onCancel = () => handleCancel();
  const queryClient = useQueryClient();
  const { translate: translateStaff } = useI18n('staff');
  const createMutation = useMutation({
    mutationFn: (body: IRequestAddUserPartner) => {
      return addUserPartner(body);
    },
    onSuccess: (data) => {
      data.status
        ? (successToast(data.message),
          handleOk(),
          queryClient.invalidateQueries({
            queryKey: [API_PARTNER.GET_DETAIL],
          }))
        : errorToast(data.message);
    },
    onError() {
      errorToast(API_MESSAGE.ERROR);
    },
  });

  const onSubmit = (value: IRequestAddUserPartner) => {
    const _requestData: IRequestAddUserPartner = {
      partnerID: id as string,
      email: value.email || '',
      firstName: value.firstName || '',
      lastName: value.lastName || '',
      fullName: `${value.firstName} ${value.lastName}` || '',
      address: value.address || '',
      phoneNumber: value.phoneNumber || '',
      taxCode: value.taxCode || '',
      birthday: value.birthday?.valueOf(),
      workingBranch: value.workingBranch || '',
      nationality: value.nationality || '',
      visa: value.visa || '',
      citizenIdentification: value.visa || '',
      genderID: value.genderID || '',
      note: value.note || '',
    };
    createMutation.mutate(_requestData);
  };

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

  return (
    <Modal
      title="Add user"
      open={open}
      onOk={onOke}
      onCancel={onCancel}
      width={1300}
      footer={[
        <Row key="back">
          <Button onClick={onCancel} loading={createMutation.isLoading}>
            Cancel
          </Button>
          <Button
            type="primary"
            onClick={onOke}
            loading={createMutation.isLoading}
          >
            Add
          </Button>
        </Row>,
      ]}
    >
      <Form
        form={form}
        onFinish={onSubmit}
        layout="vertical"
        autoComplete="off"
      >
        <Row gutter={24} style={{ margin: 0 }}>
          <Row gutter={24}>
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
                />
              </Form.Item>
            </Col>
            <Col lg={8} span={24}>
              <Form.Item
                label={translateStaff('birthday_form.title')}
                name="birthday"
                rules={[
                  {
                    required: true,
                    message: translateStaff('birthday_form.error_required'),
                  },
                ]}
              >
                <DatePicker
                  format={dateFormat}
                  style={{ width: '100%' }}
                  size="large"
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
                label={'Citizen identification or visa'}
                name="visa"
                rules={[
                  {
                    required: true,
                    message: translateStaff(
                      'Please enter citizen identification or visa'
                    ),
                  },
                ]}
              >
                <Input
                  placeholder={'Please enter citizen identification or visa'}
                  size="large"
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
                />
              </Form.Item>
            </Col>
            <Col lg={8} span={24}>
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
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label={translateStaff('note_form.title')} name="note">
                <TextArea
                  size="large"
                  placeholder={translateStaff('note_form.placeholder')}
                  allowClear
                />
              </Form.Item>
            </Col>
          </Row>
        </Row>
      </Form>
    </Modal>
  );
};

export default AddUserModal;
