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
export default function CreateDepot() {
  const [form] = Form.useForm<{ name: string; company: string }>();
  const { translate: translateCommon } = useI18n('common');
  const { translate: translateAddDepot } = useI18n('depot');

  return (
    <ModalForm<{
      name: string;
      company: string;
    }>
      title={translateAddDepot('information_add_depot')}
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
          resetText: 'Hủy',
          submitText: 'Thêm',
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
          name="DepotCode"
          label={translateAddDepot('depot_code')}
          placeholder={translateAddDepot('depot_code_placeholder')}
        />

        <ProFormText
          width="md"
          name="DepotName"
          label={translateAddDepot('depot_name')}
          placeholder={translateAddDepot('depot_name_placeholder')}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormSelect
          request={async () => [
            {
              value: 'VietNam',
              label: 'Việt Nam',
            },
            {
              value: 'US',
              label: 'US',
            },
          ]}
          width="md"
          name="CountryName"
          label={translateAddDepot('country_name')}
          placeholder={translateAddDepot('country_name_placeholder')}
        />

        <ProFormText
          width="md"
          name="Address"
          label={translateAddDepot('address')}
          placeholder={translateAddDepot('address_placeholder')}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormSelect
          request={async () => [
            {
              value: 'HCM',
              label: 'Hồ Chí Minh',
            },
            {
              value: 'HaiPhong',
              label: 'Hải Phòng',
            },
            {
              value: 'HaNoi',
              label: 'Hà Nội',
            },
            {
              value: 'US',
              label: 'US',
            },
            {
              value: 'BinhDuong',
              label: 'Bình Dương',
            },
            {
              value: 'DongNai',
              label: 'Đồng Nai',
            },
          ]}
          width="md"
          name="BranchDepot"
          label={translateAddDepot('branch_depot')}
          placeholder={translateAddDepot('branch_depot_placeholder')}
        />

        <ProFormText
          width="md"
          name="CompannyMamagementDepot"
          label={translateAddDepot('companny_mamagement_depot')}
          placeholder={translateAddDepot(
            'companny_mamagement_depot_placeholder'
          )}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormTextArea
          width="md"
          name="Description"
          label={translateAddDepot('description')}
          placeholder={translateAddDepot('description_placeholder')}
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
          name="StatusDepot"
          label={translateAddDepot('status_depot')}
          placeholder={translateAddDepot('status_depot_placeholder')}
        />
      </ProForm.Group>
    </ModalForm>
  );
}
