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
export default function CreateCurrency() {
  const [form] = Form.useForm<{ name: string; company: string }>();
  const { translate: translateCommon } = useI18n('common');
  const { translate: translateAddCurrency } = useI18n('currency');

  return (
    <ModalForm<{
      name: string;
      company: string;
    }>
      title={translateAddCurrency('information_add_currency')} //"Add new exchange rate"
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
          submitText: 'Add Currency',
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
          name="CurrencyFrom"
          label={translateAddCurrency('currency_from')}
          placeholder={translateAddCurrency('currency_from_placeholder')}
        />

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
          name="CurrencyTo"
          label={translateAddCurrency('currency_to')}
          placeholder={translateAddCurrency('currency_to_placeholder')}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          width="md"
          name="Bank"
          label={translateAddCurrency('bank')}
          placeholder={translateAddCurrency('bank_placeholder')}
        />
        <ProFormText
          width="md"
          name="Currency"
          label={translateAddCurrency('exchange_rate')}
          placeholder={translateAddCurrency('exchange_rate_placeholder')}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          width="md"
          name="CashBuy"
          label={translateAddCurrency('cash_buy')}
          placeholder={translateAddCurrency('cash_buy_placeholder')}
          rules={[
            {
              // required: true,
              type: 'number',
              min: 0,
              message: 'Vui lòng nhập tiền mặt (mua)',
            },
          ]}
        />
        <ProFormText
          width="md"
          name="CashSell"
          label={translateAddCurrency('cash_sell')}
          placeholder={translateAddCurrency('cash_sell_placeholder')}
          rules={[
            {
              // required: true,
              type: 'number',
              min: 0,
              message: 'Vui lòng nhập tiền mặt (bán)',
            },
          ]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          width="md"
          name="TransferBuy"
          label={translateAddCurrency('transfer_buy')}
          placeholder={translateAddCurrency('transfer_buy_placeholder')}
          rules={[
            {
              // required: true,
              type: 'number',
              min: 0,
              message: 'Vui lòng nhập số tiền chuyển khoản (Mua)',
            },
          ]}
        />
        <ProFormText
          width="md"
          name="TransferSell"
          label={translateAddCurrency('transfer_sell')}
          placeholder={translateAddCurrency('transfer_sell_placeholder')}
          rules={[
            {
              // required: true,
              type: 'number',
              min: 0,
              message: 'Vui lòng nhập số tiền chuyển khoản (Bán)',
            },
          ]}
        />
      </ProForm.Group>
    </ModalForm>
  );
}
