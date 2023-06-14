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
export default function CreateQuotation() {
  const [form] = Form.useForm<{ name: string; company: string }>();
  const { translate: translateCommon } = useI18n('common');
  const { translate: translateQuotation } = useI18n('quotation');

  return (
    <ModalForm<{
      name: string;
      company: string;
    }>
      title={translateQuotation('information_add_quotation')}
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
          label={translateQuotation('customer_name')}
          placeholder={translateQuotation('customer_name_placeholder')}
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
          label={translateQuotation('receipt_of_goods')}
          placeholder={translateQuotation('receipt_of_goods_placeholder')}
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
          label={translateQuotation('delivery')}
          placeholder={translateQuotation('delivery_placeholder')}
        />

        <ProFormText
          width="md"
          name="Fee"
          label={translateQuotation('fee')}
          placeholder={translateQuotation('fee_placeholder')}
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
          label={translateQuotation('empty_get_or_return')}
          placeholder={translateQuotation('empty_get_or_return_placeholder')}
        />

        <ProFormText
          width="md"
          name="ItemType"
          label={translateQuotation('item_type')}
          placeholder={translateQuotation('item_type_placeholder')}
        />

        <ProFormDatePicker
          width="md"
          name="EffectiveDate"
          label={translateQuotation('effective_date')}
          placeholder={translateQuotation('effective_date_placeholder')}
        />
      </ProForm.Group>
    </ModalForm>
  );
}
