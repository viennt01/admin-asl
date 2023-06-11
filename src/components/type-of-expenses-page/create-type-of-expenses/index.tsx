import COLORS from '@/constant/color';
import { PlusOutlined } from '@ant-design/icons';
import { ModalForm, ProForm, ProFormText } from '@ant-design/pro-components';
import { Button, Form } from 'antd';
import useI18n from '@/i18n/useI18N';

// const waitTime = (time = 100) => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(true);
//     }, time);
//   });
// };
export default function CreateExpensesType() {
  const [form] = Form.useForm<{ name: string; company: string }>();
  const { translate: translateCommon } = useI18n('common');
  const { translate: translateAddTypeOfExpenses } = useI18n('typeOfExpenses');

  return (
    <ModalForm<{
      name: string;
      company: string;
    }>
      title={translateAddTypeOfExpenses('information_add_type_of_expenses')}
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
          name="NameTypeOfExpenses"
          label={translateAddTypeOfExpenses('name')}
          placeholder={translateAddTypeOfExpenses('name_placeholder')}
        />

        <ProFormText
          width="xl"
          name="VatTypeOfExpenses"
          label={translateAddTypeOfExpenses('VAT')}
          placeholder={translateAddTypeOfExpenses('VAT_placeholder')}
          rules={[
            {
              // required: true,
              type: 'number',
              message: 'Vui lòng nhập VAT',
            },
          ]}
        />
      </ProForm.Group>
    </ModalForm>
  );
}
