import COLORS from '@/constant/color';
import { PlusOutlined } from '@ant-design/icons';
import {
  ModalForm,
  ProForm,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { Button, Form, message } from 'antd';
import useI18n from '@/i18n/useI18N';

const waitTime = (time = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};
export default function CreateUnit() {
  const [form] = Form.useForm<{ name: string; company: string }>();
  const { translate: translateCommon } = useI18n('common');
  const { translate: translateAddUnit } = useI18n('unit');

  return (
    <ModalForm<{
      name: string;
      company: string;
    }>
      title={translateAddUnit('information_add_unit')}
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
      submitTimeout={2000}
      onFinish={async (values) => {
        await waitTime(2000);
        message.success('提交成功');
        console.log(values);
        return true;
      }}
    >
      <ProForm.Group>
        <ProFormText
          width="md"
          name="InternationalCode"
          label={translateAddUnit('international_code')}
          placeholder={translateAddUnit('international_code_placeholder')}
        />

        <ProFormTextArea
          width="md"
          name="Description"
          label={translateAddUnit('description')}
          placeholder={translateAddUnit('description_placeholder')}
        />
      </ProForm.Group>
    </ModalForm>
  );
}
