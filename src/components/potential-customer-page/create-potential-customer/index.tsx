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
export default function CreatePotentialCustomer() {
  const [form] = Form.useForm<{ name: string; company: string }>();
  const { translate: translateCommon } = useI18n('common');
  const { translate: translatePotentialCustomer } =
    useI18n('potentialCustomer');

  return (
    <ModalForm<{
      name: string;
      company: string;
    }>
      title={translatePotentialCustomer('information_add_customer')}
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
          label={translatePotentialCustomer('abbreviation')}
          placeholder={translatePotentialCustomer('abbreviation_placeholder')}
        />

        <ProFormText
          width="md"
          name="NameCustomer"
          label={translatePotentialCustomer('name')}
          placeholder={translatePotentialCustomer('name_placeholder')}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          width="md"
          name="NumberCustomer"
          label={translatePotentialCustomer('number')}
          placeholder={translatePotentialCustomer('number_placeholder')}
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
          label={translatePotentialCustomer('phone')}
          placeholder={translatePotentialCustomer('phone_placeholder')}
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
          label={translatePotentialCustomer('country')}
          placeholder={translatePotentialCustomer('country_placeholder')}
        />

        <ProFormText
          width="md"
          name="Address"
          label={translatePotentialCustomer('address')}
          placeholder={translatePotentialCustomer('address_placeholder')}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          width="sm"
          name="Email"
          label={translatePotentialCustomer('email')}
          placeholder={translatePotentialCustomer('email_placeholder')}
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
          label={translatePotentialCustomer('saleman')}
          placeholder={translatePotentialCustomer('saleman_placeholder')}
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
          label={translatePotentialCustomer('status')}
          placeholder={translatePotentialCustomer('status_placeholder')}
        />
      </ProForm.Group>
    </ModalForm>
  );
}
