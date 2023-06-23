import COLORS from '@/constant/color';
import { PlusOutlined } from '@ant-design/icons';
import {
  ModalForm,
  ProForm,
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
export default function CreateBank() {
  const [form] = Form.useForm<{ name: string; company: string }>();
  const { translate: translateCommon } = useI18n('common');
  const { translate: translateAddBank } = useI18n('bank');

  return (
    <ModalForm<{
      name: string;
      company: string;
    }>
      title={translateAddBank('information_add_bank')}
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
          name="BankCode"
          label={translateAddBank('bank_code')}
          placeholder={translateAddBank('bank_code_placeholder')}
        />

        <ProFormText
          width="md"
          name="BankName"
          label={translateAddBank('bank_name')}
          placeholder={translateAddBank('bank_name_placeholder')}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          width="md"
          name="VNDAccountNumber"
          label={translateAddBank('VND_account_number')}
          placeholder={translateAddBank('VND_account_number_placeholder')}
        />

        <ProFormText
          width="md"
          name="USDAccountNumber"
          label={translateAddBank('USD_account_number')}
          placeholder={translateAddBank('USD_account_number_placeholder')}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          width="md"
          name="PhoneNumber"
          label={translateAddBank('phone')}
          placeholder={translateAddBank('phone_placeholder')}
        />

        <ProFormText
          width="md"
          name="BankEmail"
          label={translateAddBank('bank_email')}
          placeholder={translateAddBank('bank_email_placeholder')}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormSelect
          request={async () => [
            {
              value: '1',
              label: 'Hồ Chí Minh',
            },
            {
              value: '2',
              label: 'Thành phố Hà Nội',
            },
            {
              value: '3',
              label: 'Tỉnh Hà Giang',
            },
            {
              value: '4',
              label: 'Tỉnh Cao Bằng',
            },
          ]}
          width="md"
          name="BankBranch"
          label={translateAddBank('bank_branch')}
          placeholder={translateAddBank('bank_branch_placeholder')}
        />

        <ProFormText
          width="md"
          name="BankAddress"
          label={translateAddBank('bank_address')}
          placeholder={translateAddBank('bank_address_placeholder')}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormTextArea
          width="md"
          name="BankNote"
          label={translateAddBank('bank_note')}
          placeholder={translateAddBank('bank_note_placeholder')}
        />

        <ProFormSelect
          request={async () => [
            {
              value: '1',
              label: 'Active',
            },
            {
              value: '2',
              label: 'Tạm ngừng',
            },
          ]}
          width="md"
          name="Status"
          label={translateAddBank('status')}
          placeholder={translateAddBank('status_placeholder')}
        />
      </ProForm.Group>
    </ModalForm>
  );
}
