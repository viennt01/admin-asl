import COLORS from '@/constant/color';
import { PlusOutlined } from '@ant-design/icons';
import {
  ModalForm,
  ProForm,
  ProFormDatePicker,
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
export default function CreateCustomer() {
  const [form] = Form.useForm<{ name: string; company: string }>();
  const { translate: translateCommon } = useI18n('common');
  const { translate: translateCustomer } = useI18n('customer');

  return (
    <ModalForm<{
      name: string;
      company: string;
    }>
      title={translateCustomer('information_add_customer')}
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
          name="NameCustomer"
          label={translateCustomer('name')}
          placeholder={translateCustomer('name_placeholder')}
        />

        <ProFormText
          width="md"
          name="NumberCustomer"
          label={translateCustomer('number')}
          placeholder={translateCustomer('number_placeholder')}
          rules={[
            {
              type: 'number',
              min: 0,
              message: 'Vui lòng nhập số lượng giao dịch',
            },
          ]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormDatePicker
          width="md"
          name="Dob"
          label={translateCustomer('dob')}
          placeholder={translateCustomer('dob_placeholder')}
        />

        <ProFormText
          width="md"
          name="Phone"
          label={translateCustomer('phone')}
          placeholder={translateCustomer('phone_placeholder')}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          width="md"
          name="Address"
          label={translateCustomer('address')}
          placeholder={translateCustomer('address_placeholder')}
        />

        <ProFormText
          width="md"
          name="Email"
          label={translateCustomer('email')}
          placeholder={translateCustomer('email_placeholder')}
        />
      </ProForm.Group>
    </ModalForm>
  );
}
