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
export default function CreateExchangeRate() {
  const [form] = Form.useForm<{ name: string; company: string }>();
  const { translate: translateCommon } = useI18n('common');
  const { translate: translateAddExchangeRate } = useI18n('exchangeRate');

  return (
    <ModalForm<{
      name: string;
      company: string;
    }>
      title={translateAddExchangeRate('information_add_exchange_rate')} //"Add new exchange rate"
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
          submitText: 'Add Exchange Rate',
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
          label={translateAddExchangeRate('currency_from')}
          placeholder={translateAddExchangeRate('currency_from_placeholder')}
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
          label={translateAddExchangeRate('currency_to')}
          placeholder={translateAddExchangeRate('currency_to_placeholder')}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          width="md"
          name="Bank"
          label={translateAddExchangeRate('bank')}
          placeholder={translateAddExchangeRate('bank_placeholder')}
        />
        <ProFormText
          width="md"
          name="ExchangeRate"
          label={translateAddExchangeRate('exchange_rate')}
          placeholder={translateAddExchangeRate('exchange_rate_placeholder')}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          width="md"
          name="CashBuy"
          label={translateAddExchangeRate('cash_buy')}
          placeholder={translateAddExchangeRate('cash_buy_placeholder')}
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
          label={translateAddExchangeRate('cash_sell')}
          placeholder={translateAddExchangeRate('cash_sell_placeholder')}
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
          label={translateAddExchangeRate('transfer_buy')}
          placeholder={translateAddExchangeRate('transfer_buy_placeholder')}
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
          label={translateAddExchangeRate('transfer_sell')}
          placeholder={translateAddExchangeRate('transfer_sell_placeholder')}
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
