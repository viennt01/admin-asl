import COLORS from '@/constant/color';
import { PlusOutlined } from '@ant-design/icons';
import { ModalForm, ProForm, ProFormText } from '@ant-design/pro-components';
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
          submitText: 'Thêm kho chứa',
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
          name="DepotName"
          label={translateAddDepot('depot_name')}
          placeholder={translateAddDepot('depot_name_placeholder')}
        />
        <ProFormText
          width="md"
          name="Address"
          label={translateAddDepot('address')}
          placeholder={translateAddDepot('address_placeholder')}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
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
        <ProFormText
          width="lg"
          name="Description"
          label={translateAddDepot('description')}
          placeholder={translateAddDepot('description_placeholder')}
        />
      </ProForm.Group>
    </ModalForm>
  );
}
