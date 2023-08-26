import COLORS from '@/constant/color';
import { PlusOutlined } from '@ant-design/icons';
import {
  ModalForm,
  ProForm,
  ProFormDatePicker,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { Button, Form, message } from 'antd';
import useI18n from '@/i18n/useI18N';

const waitTime = (time = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};
export default function CreateUser() {
  const [form] = Form.useForm<{ name: string; company: string }>();
  const { translate: translateCommon } = useI18n('common');
  const { translate: translateUser } = useI18n('user');

  return (
    <ModalForm<{
      name: string;
      company: string;
    }>
      title={translateUser('information_add_staff')}
      trigger={
        <Button
          type="primary"
          icon={<PlusOutlined />}
          style={{
            marginRight: '4px',
            backgroundColor: COLORS.BRIGHT,
            color: COLORS.GREEN,
            borderColor: COLORS.GREEN,
            fontWeight: '500',
          }}
        >
          {translateCommon('button_add')}
        </Button>
      }
      submitter={{
        searchConfig: {
          submitText: 'Add',
          resetText: 'Cancel',
        },
      }}
      form={form}
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
      }}
      submitTimeout={2000}
      onFinish={async (values) => {
        await waitTime(2000);
        message.success(`${values}`);
        return true;
      }}
    >
      <ProForm.Group>
        <ProFormText
          width="md"
          name="FullName"
          label={translateUser('full_name')}
          placeholder={translateUser('full_name_placeholder')}
        />

        <ProFormSelect
          request={async () => [
            {
              value: 'Male',
              label: 'Nam',
            },
            {
              value: 'Female',
              label: 'Nữ',
            },
          ]}
          width="md"
          name="Gender"
          label={translateUser('gender')}
          placeholder={translateUser('gender_placeholder')}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormDatePicker
          width="md"
          name="Dob"
          label={translateUser('dob')}
          placeholder={translateUser('dob_placeholder')}
        />

        <ProFormSelect
          request={async () => [
            {
              value: 'VietNam',
              label: 'Việt Nam',
            },
            {
              value: 'American',
              label: 'Mỹ',
            },
          ]}
          width="md"
          name="Nationality"
          label={translateUser('nationality')}
          placeholder={translateUser('nationality_placeholder')}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          width="md"
          name="CCCDVisa"
          label={translateUser('CCCD_Visa')}
          placeholder={translateUser('CCCD_Visa_placeholder')}
        />

        <ProFormText
          width="md"
          name="PhoneNumber"
          label={translateUser('phone')}
          placeholder={translateUser('phone_placeholder')}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          width="md"
          name="Email"
          label={translateUser('email')}
          placeholder={translateUser('email_placeholder')}
        />

        <ProFormText
          width="md"
          name="Address"
          label={translateUser('address')}
          placeholder={translateUser('address_placeholder')}
        />
      </ProForm.Group>

      <ProForm.Group>
        <ProFormText
          width="md"
          name="company"
          label={translateUser('company')}
          placeholder={translateUser('company_placeholder')}
        />

        <ProFormText
          width="md"
          name="WorkingBranch"
          label={translateUser('working_branch')}
          placeholder={translateUser('working_branch_placeholder')}
        />
      </ProForm.Group>

      <ProForm.Group>
        <ProFormSelect
          request={async () => [
            {
              value: 'Active',
              label: 'Active',
            },
            {
              value: 'Deactive',
              label: 'Deactive',
            },
          ]}
          width="md"
          name="Status"
          label={translateUser('status')}
          placeholder={translateUser('status_placeholder')}
        />

        <ProFormTextArea
          width="md"
          name="Note"
          label={translateUser('note')}
          placeholder={translateUser('note_placeholder')}
        />
      </ProForm.Group>
    </ModalForm>
  );
}
