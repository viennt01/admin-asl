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
export default function CreateTypeOfLocation() {
  const [form] = Form.useForm<{ name: string; company: string }>();
  const { translate: translateCommon } = useI18n('common');
  const { translate: translateAddTypeOfLocation } = useI18n('typeOfLocation');

  return (
    <ModalForm<{
      name: string;
      company: string;
    }>
      title={translateAddTypeOfLocation('information_add_type_of_Location')}
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
          name="TypeOfLocation"
          label={translateAddTypeOfLocation('type_of_Location')}
          placeholder={translateAddTypeOfLocation(
            'type_of_Location_placeholder'
          )}
        />

        <ProFormText
          width="md"
          name="Teus"
          label={translateAddTypeOfLocation('teus')}
          placeholder={translateAddTypeOfLocation('teus_placeholder')}
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
          label={translateAddTypeOfLocation('detail')}
          placeholder={translateAddTypeOfLocation('detail_placeholder')}
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
          label={translateAddTypeOfLocation('status')}
          placeholder={translateAddTypeOfLocation('status_placeholder')}
        />
      </ProForm.Group>
    </ModalForm>
  );
}
