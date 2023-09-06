import { ROUTERS } from '@/constant/router';
import useI18n from '@/i18n/useI18N';
import { useQuery } from '@tanstack/react-query';
import {
  Form,
  Input,
  Typography,
  Card,
  Row,
  Col,
  Select,
  DatePicker,
} from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FormValues, STATUS_MATER_LABELS } from '../interface';
import { API_UNIT } from '@/fetcherAxios/endpoint';
import { BottomCreateEdit } from '@/components/commons/bottom-edit-creat-manager';
import { getSeaPricingDetail } from '../fetcher';
import DraftTable from '../table/draft-table';
import dayjs from 'dayjs';

const initialValue = {
  description: '',
};

interface PortFormProps {
  create?: boolean;
  manager?: boolean;
  edit?: boolean;
  handleSubmit?: (formValues: FormValues, id?: string) => void;
  handleSaveDraft?: (formValues: FormValues, id?: string) => void;
  handleApproveAndReject?: (id: string, status: string) => void;
  loadingSubmit: boolean;
  checkRow: boolean;
  useDraft?: boolean;
}

const { Title } = Typography;

const UnitForm = ({
  create,
  manager,
  edit,
  handleSubmit,
  handleSaveDraft,
  loadingSubmit: loading,
  checkRow,
  handleApproveAndReject,
  useDraft,
}: PortFormProps) => {
  const { translate: translatePricingSea } = useI18n('pricingSea');
  const router = useRouter();
  const [form] = Form.useForm<FormValues>();
  const { id } = router.query;
  const [idQuery, setIdQuery] = useState<string>();
  const [isCheckPermissionEdit, setCheckPermissionEdit] =
    useState<boolean>(true);
  const dateFormat = 'YYYY/MM/DD';
  useEffect(() => {
    if (!id) return;
    setIdQuery(id as string);
  }, [router, form]);

  const handleIdQuery = (id: string) => {
    setIdQuery(id as string);
  };

  const onFinish = (formValues: FormValues) => {
    if (idQuery) {
      handleSubmit && handleSubmit(formValues, idQuery);
    } else {
      handleSubmit && handleSubmit(formValues);
    }
  };

  const onSaveDraft = () => {
    if (idQuery) {
      handleSaveDraft && handleSaveDraft(form.getFieldsValue(), idQuery);
    } else {
      handleSaveDraft && handleSaveDraft(form.getFieldsValue());
    }
  };

  const unitDetailQuery = useQuery({
    queryKey: [API_UNIT.GET_DETAIL, idQuery],
    queryFn: () => getSeaPricingDetail(idQuery as string),
    enabled: idQuery !== undefined,
    onSuccess: (data) => {
      if (data.status) {
        form.setFieldsValue({
          seaPricingID: data.data.seaPricingID,
          podid: data.data.podid,
          polid: data.data.polid,
          commodityID: data.data.commodityID,
          currencyID: data.data.currencyID,
          partnerID: data.data.partnerID,
          note: data.data.note,
          effectDate: data.data.effectDate,
          validity: data.data.validity,
          freg: data.data.freg,
          dem: data.data.dem,
          det: data.data.det,
          sto: data.data.sto,
          lclMin: data.data.lclMin,
          lcl: data.data.lcl,
          public: data.data.public,
          statusSeaPricing: data.data.statusSeaPricing,
        });
      } else {
        router.push(ROUTERS.LOCATION);
      }
    },
  });

  const handleCheckEdit = (data: boolean) => {
    setCheckPermissionEdit(data);
  };

  const handleAJ = (status: string) => {
    handleApproveAndReject && handleApproveAndReject(id as string, status);
  };

  return (
    <div style={{ padding: '24px 0' }}>
      <Form
        form={form}
        initialValues={initialValue}
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
      >
        <Card
          style={{ marginBottom: 24 }}
          title={
            <Row justify={'center'}>
              <Col>
                <Title level={3} style={{ margin: '-4px 0' }}>
                  {create && 'Create a new sea pricing'}
                  {manager && 'Approval needed requests'}
                  {edit && 'Edit a new sea pricing'}
                </Title>
              </Col>
            </Row>
          }
          extra={
            create && useDraft && <DraftTable handleIdQuery={handleIdQuery} />
          }
        >
          <Row gutter={16}>
            <Col lg={12} span={24}>
              <Form.Item
                label={translatePricingSea('POL')}
                tooltip={translatePricingSea('POL')}
                name="polid"
                rules={[
                  {
                    required: true,
                    message: translatePricingSea('POL_placeholder'),
                  },
                ]}
              >
                <Input placeholder={translatePricingSea('POL_placeholder')} />
              </Form.Item>
            </Col>
            <Col lg={12} span={24}>
              <Form.Item
                label={translatePricingSea('POD')}
                tooltip={translatePricingSea('POD')}
                name="podid"
                rules={[
                  {
                    required: true,
                    message: translatePricingSea('POD_placeholder'),
                  },
                ]}
              >
                <Input placeholder={translatePricingSea('POD_placeholder')} />
              </Form.Item>
            </Col>

            <Col lg={6} span={24}>
              <Form.Item
                label={translatePricingSea('vendor')}
                name="partnerName"
                rules={[
                  {
                    required: true,
                    message: translatePricingSea('vendor_placeholder'),
                  },
                ]}
              >
                <Input
                  placeholder={translatePricingSea('vendor_placeholder')}
                />
              </Form.Item>
            </Col>

            <Col lg={6} span={24}>
              <Form.Item
                label={translatePricingSea('commodity')}
                name="commodityName"
                rules={[
                  {
                    required: true,
                    message: translatePricingSea('commodity_placeholder'),
                  },
                ]}
              >
                <Input
                  placeholder={translatePricingSea('commodity_placeholder')}
                />
              </Form.Item>
            </Col>

            <Col lg={6} span={24}>
              <Form.Item
                label={translatePricingSea('currency')}
                name="currencyName"
                rules={[
                  {
                    required: true,
                    message: translatePricingSea('currency_placeholder'),
                  },
                ]}
              >
                <Select
                  options={[
                    {
                      value: 'USD',
                      label: 'USD',
                    },
                    {
                      value: 'VND',
                      label: 'VND',
                    },
                  ]}
                />
              </Form.Item>
            </Col>

            <Col lg={6} span={24}>
              <Form.Item
                label={translatePricingSea('effect_date')}
                name="effectDate"
                rules={[
                  {
                    required: true,
                    message: translatePricingSea('effect_date_placeholder'),
                  },
                ]}
              >
                <DatePicker
                  defaultValue={dayjs('2015/01/01', dateFormat)}
                  format={dateFormat}
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>

            <Col lg={8} span={24}>
              <Form.Item
                label={translatePricingSea('validity')}
                name="validity"
                rules={[
                  {
                    required: true,
                    message: translatePricingSea('validity_placeholder'),
                  },
                ]}
              >
                <Input
                  placeholder={translatePricingSea('validity_placeholder')}
                />
              </Form.Item>
            </Col>

            <Col lg={8} span={24}>
              <Form.Item
                label={translatePricingSea('freq')}
                name="freg"
                rules={[
                  {
                    required: true,
                    message: translatePricingSea('freq_placeholder'),
                  },
                ]}
              >
                <Input placeholder={translatePricingSea('freq_placeholder')} />
              </Form.Item>
            </Col>

            <Col lg={8} span={24}>
              <Form.Item
                label={translatePricingSea('DEM')}
                name="dem"
                rules={[
                  {
                    required: true,
                    message: translatePricingSea('DEM_placeholder'),
                  },
                ]}
              >
                <Input placeholder={translatePricingSea('DEM_placeholder')} />
              </Form.Item>
            </Col>

            <Col lg={8} span={24}>
              <Form.Item
                label={translatePricingSea('DET')}
                name="det"
                rules={[
                  {
                    required: true,
                    message: translatePricingSea('DET_placeholder'),
                  },
                ]}
              >
                <Input placeholder={translatePricingSea('DET_placeholder')} />
              </Form.Item>
            </Col>

            <Col lg={8} span={24}>
              <Form.Item
                label={translatePricingSea('STO')}
                name="sto"
                rules={[
                  {
                    required: true,
                    message: translatePricingSea('STO_placeholder'),
                  },
                ]}
              >
                <Input placeholder={translatePricingSea('STO_placeholder')} />
              </Form.Item>
            </Col>

            <Col lg={8} span={24}>
              <Form.Item
                label={translatePricingSea('STO')}
                name="sto"
                rules={[
                  {
                    required: true,
                    message: translatePricingSea('STO_placeholder'),
                  },
                ]}
              >
                <Input placeholder={translatePricingSea('STO_placeholder')} />
              </Form.Item>
            </Col>
            {!create && !manager ? (
              <Col lg={6} span={12}>
                <Form.Item
                  label={translatePricingSea('status')}
                  name="statusSeaPricing"
                  rules={[
                    {
                      required: true,
                      message: 'status_form.error_required',
                    },
                  ]}
                >
                  <Select
                    size="large"
                    placeholder={'status_form.placeholder'}
                    options={Object.keys(STATUS_MATER_LABELS).map((key) => ({
                      text: key,
                      value: key,
                    }))}
                    disabled={checkRow && isCheckPermissionEdit}
                  />
                </Form.Item>
              </Col>
            ) : (
              <></>
            )}
          </Row>
        </Card>

        <BottomCreateEdit
          create={create}
          checkRow={checkRow}
          edit={edit}
          loading={loading}
          isCheckPermissionEdit={isCheckPermissionEdit}
          insertedByUser={unitDetailQuery.data?.data?.insertedByUser || ''}
          dateInserted={unitDetailQuery.data?.data?.dateInserted || ''}
          updatedByUser={unitDetailQuery.data?.data?.updatedByUser || ''}
          dateUpdated={unitDetailQuery.data?.data?.dateUpdated || ''}
          handleCheckEdit={handleCheckEdit}
          handleSaveDraft={onSaveDraft}
          manager={manager}
          handleAJ={handleAJ}
          checkQuery={idQuery ? true : false}
          useDraft={useDraft}
        />
      </Form>
    </div>
  );
};

export default UnitForm;
