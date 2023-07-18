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
export default function CreateSupplier() {
  const [form] = Form.useForm<{ name: string; company: string }>();
  const { translate: translateCommon } = useI18n('common');
  const { translate: translateSupplier } = useI18n('supplier');

  return (
    <ModalForm<{
      name: string;
      company: string;
    }>
      title={translateSupplier('information_add_supplier')}
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
          label={translateSupplier('abbreviation')}
          placeholder={translateSupplier('abbreviation_placeholder')}
        />

        <ProFormText
          width="md"
          name="NameSupplier"
          label={translateSupplier('name')}
          placeholder={translateSupplier('name_placeholder')}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormSelect
          request={async () => [
            {
              value: '1',
              label: 'Đóng hàng',
            },
          ]}
          width="md"
          name="ServiceSupplier"
          label={translateSupplier('service')}
          placeholder={translateSupplier('service_placeholder')}
        />

        <ProFormText
          width="md"
          name="NumberSupplier"
          label={translateSupplier('number')}
          placeholder={translateSupplier('number_placeholder')}
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
        <ProFormText
          width="md"
          name="Phone"
          label={translateSupplier('phone')}
          placeholder={translateSupplier('phone_placeholder')}
        />
        <ProFormText
          width="md"
          name="Email"
          label={translateSupplier('email')}
          placeholder={translateSupplier('email_placeholder')}
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
          width="sm"
          name="CountryName"
          label={translateSupplier('country')}
          placeholder={translateSupplier('country_placeholder')}
        />

        <ProFormText
          width="sm"
          name="Address"
          label={translateSupplier('address')}
          placeholder={translateSupplier('address_placeholder')}
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
          label={translateSupplier('status')}
          placeholder={translateSupplier('status_placeholder')}
        />
      </ProForm.Group>
    </ModalForm>
  );
}
