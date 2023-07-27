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
export default function CreateCustomerOnSales() {
  const [form] = Form.useForm<{ name: string; company: string }>();
  const { translate: translateCommon } = useI18n('common');
  const { translate: translateCustomerOnSales } = useI18n('customerOnSales');

  return (
    <ModalForm<{
      name: string;
      company: string;
    }>
      title={translateCustomerOnSales('information_add_customer')}
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
          label={translateCustomerOnSales('abbreviation')}
          placeholder={translateCustomerOnSales('abbreviation_placeholder')}
        />

        <ProFormText
          width="md"
          name="NameCustomer"
          label={translateCustomerOnSales('name')}
          placeholder={translateCustomerOnSales('name_placeholder')}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          width="md"
          name="NumberCustomer"
          label={translateCustomerOnSales('number')}
          placeholder={translateCustomerOnSales('number_placeholder')}
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
          label={translateCustomerOnSales('phone')}
          placeholder={translateCustomerOnSales('phone_placeholder')}
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
          label={translateCustomerOnSales('country')}
          placeholder={translateCustomerOnSales('country_placeholder')}
        />

        <ProFormText
          width="md"
          name="Address"
          label={translateCustomerOnSales('address')}
          placeholder={translateCustomerOnSales('address_placeholder')}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          width="sm"
          name="Email"
          label={translateCustomerOnSales('email')}
          placeholder={translateCustomerOnSales('email_placeholder')}
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
          label={translateCustomerOnSales('saleman')}
          placeholder={translateCustomerOnSales('saleman_placeholder')}
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
          label={translateCustomerOnSales('status')}
          placeholder={translateCustomerOnSales('status_placeholder')}
        />
      </ProForm.Group>
    </ModalForm>
  );
}
