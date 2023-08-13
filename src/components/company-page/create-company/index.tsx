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
export default function CreateCompany() {
  const [form] = Form.useForm<{ name: string; company: string }>();
  const { translate: translateCommon } = useI18n('common');
  const { translate: translateAddCompany } = useI18n('company');

  return (
    <ModalForm<{
      name: string;
      company: string;
    }>
      title={translateAddCompany('information_add_Company')}
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
        <ProFormSelect
          request={async () => [
            {
              value: '1',
              label: 'USD',
            },
            {
              value: '2',
              label: 'VND',
            },
            {
              value: '3',
              label: 'Euro',
            },
          ]}
          width="md"
          name="Company"
          label={translateAddCompany('Company')}
          placeholder={translateAddCompany('Company_placeholder')}
        />

        <ProFormText
          width="md"
          name="ExchangeRateToVND"
          label={translateAddCompany('exchange_rate_to_VND')}
          placeholder={translateAddCompany('exchange_rate_to_VND_placeholder')}
          rules={[
            {
              type: 'number',
              message: 'Vui lòng nhập tỉ giá sang VND',
            },
          ]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          width="md"
          name="ExchangeRateToUSD"
          label={translateAddCompany('exchange_rate_to_USD')}
          placeholder={translateAddCompany('exchange_rate_to_USD_placeholder')}
          rules={[
            {
              type: 'number',
              message: 'Vui lòng nhập tỉ giá sang USD',
            },
          ]}
        />
      </ProForm.Group>
    </ModalForm>
  );
}
