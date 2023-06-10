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
export default function CreateBooking() {
  const [form] = Form.useForm<{ name: string; company: string }>();
  const { translate: translateCommon } = useI18n('common');

  return (
    <ModalForm<{
      name: string;
      company: string;
    }>
      title="Thêm mới booking"
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
          submitText: 'Thêm',
          resetText: 'Hủy',
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
          name="ContainerCode"
          label="Mã Container"
          placeholder="Nhập mã container"
        />

        <ProFormText
          width="md"
          name="Address"
          label="Nơi lấy rỗng"
          placeholder="Nhập nơi lấy rỗng"
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          width="md"
          name="PortName"
          label="Cảng hạ hàng"
          placeholder="Nhập cảng hạ hàng"
        />
        <ProFormText
          width="md"
          name="Route"
          label="Tuyến đường"
          placeholder="Nhập tuyến đường"
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          width="md"
          name="TotalContainer"
          label="Số lượng container"
          placeholder="Nhập số lượng container"
          rules={[
            {
              // required: true,
              type: 'number',
              min: 0,
              max: 100,
              message: 'Vui lòng nhập tổng số container',
            },
          ]}
        />
        <ProFormSelect
          request={async () => [
            {
              value: '1',
              label: 'Active',
            },
            {
              value: '2',
              label: 'Ngừng hoạt động',
            },
          ]}
          width="md"
          name="useMode1"
          placeholder="Chọn trạng thái hoạt động"
          label="Trạng thái"
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          width="md"
          name="12"
          placeholder="Nhập sức chứa"
          label="Sức chứa"
          rules={[
            {
              // required: true,
              type: 'number',
              min: 0,
              max: 100,
              message: 'Vui lòng nhập sức chứa',
            },
          ]}
        />
        <ProFormSelect
          request={async () => [
            {
              value: '1',
              label: 'Active',
            },
            {
              value: '2',
              label: 'Ngừng hoạt động',
            },
          ]}
          width="md"
          name="useMode"
          placeholder="Chọn trạng thái sức chứa"
          label="Trạng thái sức chứa"
        />
      </ProForm.Group>
    </ModalForm>
  );
}
