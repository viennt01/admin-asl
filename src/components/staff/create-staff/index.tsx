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
import { Button, Form } from 'antd';
import useI18n from '@/i18n/useI18N';

// const waitTime = (time = 100) => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(true);
//     }, time);
//   });
// };
export default function CreateStaff() {
  const [form] = Form.useForm<{ name: string; company: string }>();
  const { translate: translateCommon } = useI18n('common');
  const { translate: translateStaff } = useI18n('staff');

  return (
    <ModalForm<{
      name: string;
      company: string;
    }>
      title={translateStaff('information_add_staff')}
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
      // submitTimeout={2000}
      // onFinish={async (values) => {
      //   await waitTime(2000);
      //   message.success('提交成功');
      //   return true;
      // }}
    >
      <ProForm.Group>
        <ProFormText
          width="md"
          name="FullName"
          label={translateStaff('full_name')}
          placeholder={translateStaff('full_name_placeholder')}
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
          label={translateStaff('gender')}
          placeholder={translateStaff('gender_placeholder')}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormDatePicker
          width="md"
          name="Dob"
          label={translateStaff('dob')}
          placeholder={translateStaff('dob_placeholder')}
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
          label={translateStaff('nationality')}
          placeholder={translateStaff('nationality_placeholder')}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          width="md"
          name="CCCDVisa"
          label={translateStaff('CCCD_Visa')}
          placeholder={translateStaff('CCCD_Visa_placeholder')}
        />

        <ProFormText
          width="md"
          name="PhoneNumber"
          label={translateStaff('phone')}
          placeholder={translateStaff('phone_placeholder')}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          width="md"
          name="Email"
          label={translateStaff('email')}
          placeholder={translateStaff('email_placeholder')}
        />

        <ProFormText
          width="md"
          name="Address"
          label={translateStaff('address')}
          placeholder={translateStaff('address_placeholder')}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          width="md"
          name="WorkingBranch"
          label={translateStaff('working_branch')}
          placeholder={translateStaff('working_branch_placeholder')}
        />

        <ProFormSelect
          request={async () => [
            {
              value: 'Accountant',
              label: 'Accountant',
            },
            {
              value: 'Sale',
              label: 'Sale',
            },
            {
              value: 'Manager',
              label: 'Manager',
            },
          ]}
          width="md"
          name="Position"
          label={translateStaff('position')}
          placeholder={translateStaff('position_placeholder')}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          width="md"
          name="Department"
          label={translateStaff('department')}
          placeholder={translateStaff('department_placeholder')}
        />

        <ProFormText
          width="md"
          name="Manager"
          label={translateStaff('manager')}
          placeholder={translateStaff('manager_placeholder')}
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
          label={translateStaff('status')}
          placeholder={translateStaff('status_placeholder')}
        />

        <ProFormTextArea
          width="md"
          name="Note"
          label={translateStaff('note')}
          placeholder={translateStaff('note_placeholder')}
        />
      </ProForm.Group>
    </ModalForm>
  );
}
