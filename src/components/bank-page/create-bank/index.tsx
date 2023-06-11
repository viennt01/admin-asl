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
          name="BankName"
          label={translateAddBank('bank_name')}
          placeholder={translateAddBank('bank_name_placeholder')}
        />

        <ProFormText
          width="md"
          name="BankAccountNumber"
          label={translateAddBank('bank_account_number')}
          placeholder={translateAddBank('bank_account_number_placeholder')}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          width="md"
          name="BankHotlinePhoneNumber"
          label={translateAddBank('bank_hotline_phone_number')}
          placeholder={translateAddBank(
            'bank_hotline_phone_number_placeholder'
          )}
        />

        <ProFormText
          width="md"
          name="BankEmail"
          label={translateAddBank('bank_email')}
          placeholder={translateAddBank('bank_email_placeholder')}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          width="md"
          name="BankAddress"
          label={translateAddBank('bank_address')}
          placeholder={translateAddBank('bank_address_placeholder')}
        />

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
      </ProForm.Group>
      <ProForm.Group>
        <ProFormTextArea
          width="xl"
          name="BankNote"
          label={translateAddBank('bank_note')}
          placeholder={translateAddBank('bank_note_placeholder')}
        />
      </ProForm.Group>
    </ModalForm>
  );
}
