import COLORS from '@/constant/color';
import { PlusOutlined } from '@ant-design/icons';
import {
  ModalForm,
  ProForm,
  ProFormDatePicker,
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
export default function CreateRequestForApproval() {
  const [form] = Form.useForm<{ name: string; company: string }>();
  const { translate: translateCommon } = useI18n('common');
  const { translate: translateRequestForApproval } =
    useI18n('requestForApproval');

  return (
    <ModalForm<{
      name: string;
      company: string;
    }>
      title={translateRequestForApproval('information_add_RequestForApproval')}
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
          resetText: 'Cancel',
          submitText: 'Add',
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
          name="CustomerName"
          label={translateRequestForApproval('customer_name')}
          placeholder={translateRequestForApproval('customer_name_placeholder')}
        />

        <ProFormSelect
          request={async () => [
            {
              value: '1',
              label: 'Đóng hàng',
            },
            {
              value: '2',
              label: 'Trả hàng',
            },
          ]}
          width="md"
          name="ReceiptOfGoods"
          label={translateRequestForApproval('receipt_of_goods')}
          placeholder={translateRequestForApproval(
            'receipt_of_goods_placeholder'
          )}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormSelect
          request={async () => [
            {
              value: '1',
              label: 'Đang Giao',
            },
            {
              value: '2',
              label: 'Chưa giao',
            },
          ]}
          width="md"
          name="Delivery"
          label={translateRequestForApproval('delivery')}
          placeholder={translateRequestForApproval('delivery_placeholder')}
        />

        <ProFormText
          width="md"
          name="Fee"
          label={translateRequestForApproval('fee')}
          placeholder={translateRequestForApproval('fee_placeholder')}
          rules={[
            {
              type: 'number',
              min: 0,
              message: 'Vui lòng nhập số cước',
            },
          ]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormSelect
          request={async () => [
            {
              value: '1',
              label: 'Nhận rỗng',
            },
            {
              value: '2',
              label: 'Trả rỗng',
            },
          ]}
          width="md"
          name="EmptyGetOrReturn"
          label={translateRequestForApproval('empty_get_or_return')}
          placeholder={translateRequestForApproval(
            'empty_get_or_return_placeholder'
          )}
        />

        <ProFormText
          width="md"
          name="ItemType"
          label={translateRequestForApproval('item_type')}
          placeholder={translateRequestForApproval('item_type_placeholder')}
        />

        <ProFormDatePicker
          width="md"
          name="EffectiveDate"
          label={translateRequestForApproval('effective_date')}
          placeholder={translateRequestForApproval(
            'effective_date_placeholder'
          )}
        />
      </ProForm.Group>
    </ModalForm>
  );
}
