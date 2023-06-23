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
export default function CreateContainer() {
  const [form] = Form.useForm<{ name: string; company: string }>();
  const { translate: translateCommon } = useI18n('common');
  const { translate: translateAddContainer } = useI18n('container');

  return (
    <ModalForm<{
      name: string;
      company: string;
    }>
      title={translateAddContainer('information_add_container')}
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
          name="CodeContainer"
          label={translateAddContainer('code')}
          placeholder={translateAddContainer('code_placeholder')}
        />

        <ProFormText
          width="md"
          name="TypeOfContainer"
          label={translateAddContainer('type_of_container')}
          placeholder={translateAddContainer('type_of_container_placeholder')}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          width="md"
          name="Location"
          label={translateAddContainer('location')}
          placeholder={translateAddContainer('location_placeholder')}
        />
        <ProFormSelect
          request={async () => [
            {
              value: '1',
              label: 'Đang cho thuê',
            },
            {
              value: '2',
              label: 'Yêu cầu vệ sinh',
            },
          ]}
          width="md"
          name="ContainerStatus"
          label={translateAddContainer('containerStatus')}
          placeholder={translateAddContainer('container_status_placeholder')}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          width="md"
          name="RentCost"
          label={translateAddContainer('rentCost')}
          placeholder={translateAddContainer('rent_cost_placeholder')}
          rules={[
            {
              // required: true,
              type: 'number',
              min: 0,
              message: 'Vui lòng nhập giá thuê',
            },
          ]}
        />
        <ProFormText
          width="md"
          name="Price"
          label={translateAddContainer('price')}
          placeholder={translateAddContainer('price_placeholder')}
          rules={[
            {
              // required: true,
              type: 'number',
              min: 0,
              message: 'Vui lòng nhập giá bán',
            },
          ]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          width="md"
          name="Supplier"
          label={translateAddContainer('supplier')}
          placeholder={translateAddContainer('supplier_placeholder')}
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
          label={translateAddContainer('status')}
          placeholder={translateAddContainer('status_placeholder')}
        />
      </ProForm.Group>
    </ModalForm>
  );
}
