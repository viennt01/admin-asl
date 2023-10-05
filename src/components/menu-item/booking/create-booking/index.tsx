import COLORS from '@/constant/color';
import { PlusOutlined } from '@ant-design/icons';
import {
  ModalForm,
  ProForm,
  ProFormDatePicker,
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
export default function CreateBooking() {
  const [form] = Form.useForm<{ name: string; company: string }>();
  const { translate: translateCommon } = useI18n('common');
  const { translate: translateBooking } = useI18n('booking');

  return (
    <ModalForm<{
      name: string;
      company: string;
    }>
      title={translateBooking('information_add_booking')}
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
        <ProFormSelect
          request={async () => [
            {
              value: '1',
              label: 'Hải Phòng',
            },
            {
              value: '2',
              label: 'Hồ Chí Minh',
            },
          ]}
          width="md"
          name="PortOfLoading"
          placeholder={translateBooking('port_of_loading')}
          label={translateBooking('port_of_loading_placeholder')}
        />

        <ProFormSelect
          request={async () => [
            {
              value: '1',
              label: 'Hải Phòng',
            },
            {
              value: '2',
              label: 'Hồ Chí Minh',
            },
          ]}
          width="md"
          name="PortOfDischarge"
          placeholder={translateBooking('port_of_discharge')}
          label={translateBooking('port_of_discharge_placeholder')}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormSelect
          request={async () => [
            {
              value: '1',
              label: 'ASLU4824373',
            },
            {
              value: '2',
              label: 'ASLU4824376',
            },
          ]}
          width="md"
          name="ContainerCode"
          placeholder={translateBooking('container_code')}
          label={translateBooking('container_code_placeholder')}
        />

        <ProFormText
          width="md"
          name="package"
          label={translateBooking('package')}
          placeholder={translateBooking('package_placeholder')}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          width="md"
          name="Package"
          label={translateBooking('package')}
          placeholder={translateBooking('package_placeholder')}
        />

        <ProFormText
          width="md"
          name="NameCustomer"
          label={translateBooking('name_customer')}
          placeholder={translateBooking('name_customer_placeholder')}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          width="md"
          name="NameCnee"
          label={translateBooking('name_cnee')}
          placeholder={translateBooking('name_cnee_placeholder')}
        />

        <ProFormText
          width="md"
          name="PlaceOfDelivery"
          label={translateBooking('place_of_delivery')}
          placeholder={translateBooking('place_of_delivery_placeholder')}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormDatePicker
          width="md"
          name="Etd"
          label={translateBooking('etd')}
          placeholder={translateBooking('etd_placeholder')}
        />

        <ProFormDatePicker
          width="md"
          name="Eta"
          label={translateBooking('eta')}
          placeholder={translateBooking('eta_placeholder')}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormTextArea
          width="xl"
          name="Note"
          label={translateBooking('note')}
          placeholder={translateBooking('note_placeholder')}
        />
      </ProForm.Group>
    </ModalForm>
  );
}
