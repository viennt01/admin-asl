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
export default function CreateLocation() {
  const [form] = Form.useForm<{ name: string; company: string }>();
  const { translate: translateCommon } = useI18n('common');
  const { translate: translateAddLocation } = useI18n('location');

  return (
    <ModalForm<{
      name: string;
      company: string;
    }>
      title={translateAddLocation('information_add_location')}
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
          name="NameLocation"
          label={translateAddLocation('name')}
          placeholder={translateAddLocation('name_placeholder')}
        />

        <ProFormText
          width="md"
          name="TypeOfLocation"
          label={translateAddLocation('type_of_location')}
          placeholder={translateAddLocation('type_of_location_placeholder')}
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
              value: 'US',
              label: 'Mỹ',
            },
          ]}
          width="md"
          name="CountryName"
          label={translateAddLocation('country_name')}
          placeholder={translateAddLocation('country_name_placeholder')}
        />

        <ProFormText
          width="md"
          name="Address"
          label={translateAddLocation('address')}
          placeholder={translateAddLocation('address_placeholder')}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          width="md"
          name="Phone"
          label={translateAddLocation('phone')}
          placeholder={translateAddLocation('phone_placeholder')}
        />

        <ProFormText
          width="md"
          name="Email"
          label={translateAddLocation('email')}
          placeholder={translateAddLocation('email_placeholder')}
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
          label={translateAddLocation('status')}
          placeholder={translateAddLocation('status_placeholder')}
        />
      </ProForm.Group>
    </ModalForm>
  );
}
