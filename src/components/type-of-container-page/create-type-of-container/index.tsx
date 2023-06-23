import COLORS from '@/constant/color';
import { PlusOutlined } from '@ant-design/icons';
import {
  ModalForm,
  ProForm,
  ProFormSelect,
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
export default function CreateTypeOfContainer() {
  const [form] = Form.useForm<{ name: string; company: string }>();
  const { translate: translateCommon } = useI18n('common');
  const { translate: translateAddTypeOfContainer } = useI18n('typeOfContainer');

  return (
    <ModalForm<{
      name: string;
      company: string;
    }>
      title={translateAddTypeOfContainer('information_add_type_of_container')}
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
          name="TypeOfContainer"
          label={translateAddTypeOfContainer('type_of_container')}
          placeholder={translateAddTypeOfContainer(
            'type_of_container_placeholder'
          )}
        />

        <ProFormText
          width="md"
          name="Teus"
          label={translateAddTypeOfContainer('teus')}
          placeholder={translateAddTypeOfContainer('teus_placeholder')}
          rules={[
            {
              type: 'number',
              min: 0,
              message: 'Vui lòng nhập teus',
            },
          ]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormTextArea
          width="md"
          name="Detail"
          label={translateAddTypeOfContainer('detail')}
          placeholder={translateAddTypeOfContainer('detail_placeholder')}
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
          width="md"
          name="Status"
          label={translateAddTypeOfContainer('status')}
          placeholder={translateAddTypeOfContainer('status_placeholder')}
        />
      </ProForm.Group>
    </ModalForm>
  );
}
