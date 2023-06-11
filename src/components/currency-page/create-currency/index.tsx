import COLORS from '@/constant/color';
import { PlusOutlined } from '@ant-design/icons';
import {
  ModalForm,
  ProForm,
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
export default function CreateCurrency() {
  const [form] = Form.useForm<{ name: string; company: string }>();
  const { translate: translateCommon } = useI18n('common');
  const { translate: translateAddCurrency } = useI18n('currency');

  return (
    <ModalForm<{
      name: string;
      company: string;
    }>
      title={translateAddCurrency('information_add_currency')}
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
          width="xl"
          name="CurrencyName"
          label={translateAddCurrency('currency_name')}
          placeholder={translateAddCurrency('currency_name_placeholder')}
        />

        <ProFormTextArea
          width="xl"
          name="CurrencyDescription"
          label={translateAddCurrency('currency_description')}
          placeholder={translateAddCurrency('currency_description_placeholder')}
        />
      </ProForm.Group>
    </ModalForm>
  );
}
