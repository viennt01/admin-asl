import COLORS from '@/constant/color';
import { PlusOutlined } from '@ant-design/icons';
import {
  ModalForm,
  ProForm,
  ProFormSelect,
  ProFormText,
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
export default function CreateFeeGroup() {
  const [form] = Form.useForm<{ name: string; company: string }>();
  const { translate: translateCommon } = useI18n('common');
  const { translate: translateFeeGroup } = useI18n('feeGroup');

  return (
    <ModalForm<{
      name: string;
      company: string;
    }>
      title={translateFeeGroup('information_add_customer')}
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
          name="Abbreviation"
          label={translateFeeGroup('abbreviation')}
          placeholder={translateFeeGroup('abbreviation_placeholder')}
        />

        <ProFormText
          width="md"
          name="NameCustomer"
          label={translateFeeGroup('name')}
          placeholder={translateFeeGroup('name_placeholder')}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          width="md"
          name="NumberCustomer"
          label={translateFeeGroup('number')}
          placeholder={translateFeeGroup('number_placeholder')}
          rules={[
            {
              type: 'number',
              min: 0,
              message: 'Vui lòng nhập số lượng giao dịch',
            },
          ]}
        />

        <ProFormText
          width="md"
          name="Phone"
          label={translateFeeGroup('phone')}
          placeholder={translateFeeGroup('phone_placeholder')}
        />
      </ProForm.Group>
      <ProForm.Group>
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
          name="CountryName"
          label={translateFeeGroup('country')}
          placeholder={translateFeeGroup('country_placeholder')}
        />

        <ProFormText
          width="md"
          name="Address"
          label={translateFeeGroup('address')}
          placeholder={translateFeeGroup('address_placeholder')}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          width="sm"
          name="Email"
          label={translateFeeGroup('email')}
          placeholder={translateFeeGroup('email_placeholder')}
        />

        <ProFormSelect
          request={async () => [
            {
              value: '1',
              label: 'Nguyễn Văn A',
            },
            {
              value: '2',
              label: 'Nguyễn Văn B',
            },
          ]}
          width="sm"
          name="Saleman"
          label={translateFeeGroup('saleman')}
          placeholder={translateFeeGroup('saleman_placeholder')}
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
          width="sm"
          name="Status"
          label={translateFeeGroup('status')}
          placeholder={translateFeeGroup('status_placeholder')}
        />
      </ProForm.Group>
    </ModalForm>
  );
}
