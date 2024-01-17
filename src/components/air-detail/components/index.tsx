import React, { useEffect, useState } from 'react';
import style from '../index.module.scss';
import {
  Button,
  Card,
  Col,
  Flex,
  Row,
  Modal,
  Form,
  Select,
  SelectProps,
} from 'antd';
import { MailOutlined, FilePdfOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';
import { successToast } from '@/hook/toast';
import { IDataBookingProps } from '..';
import { IRequireSendListEmail } from '@/components/fcl-sea-detail/interface';
import { sendListEmail } from '@/components/fcl-sea-detail/fetcher';
import COLORS from '@/constant/color';
import FormBooking from '../form-booking';
import FormBookingPDF from '../form-booking-pdf';
interface Props {
  dataPropsBooking: IDataBookingProps | undefined;
}

export default function Step5({ dataPropsBooking }: Props) {
  const router = useRouter();
  const { id } = router.query;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const sendListEmailMutation = useMutation({
    mutationFn: (body: IRequireSendListEmail) => {
      return sendListEmail(body);
    },
  });

  useEffect(() => {
    // Dynamically import html2pdf only on the client side
    const importHtml2pdf = async () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const { default: html2pdf } = await import('html2pdf.js');
      window.html2pdf = html2pdf;
    };

    importHtml2pdf();

    return () => {
      // Cleanup: Remove html2pdf from the window object when the component unmounts
      if (window.html2pdf) {
        delete window.html2pdf;
      }
    };
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const options: SelectProps['options'] = [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFinish = (formValues: any) => {
    const _requestData = {
      bookingID: (id as string) || '',
      listEmail: formValues.email || [],
    };
    sendListEmailMutation.mutate(_requestData, {
      onSuccess: () => {
        successToast('Send Email Successfully');
        setIsModalOpen(false);
        form.resetFields();
      },
      onError() {
        successToast('Send Email Successfully');
        setIsModalOpen(false);
        form.resetFields();
      },
    });
  };

  const handlePrint = async () => {
    // Ensure html2pdf is available in the window object
    if (window.html2pdf) {
      // Get the HTML element to print
      const element = document.getElementById('content-to-print');

      if (!element) {
        console.error('Element not found.');
        return;
      }

      // Specify the parameters for html2pdf
      const parameters = {
        filename: 'Booking.pdf',
        image: { type: 'jpeg', quality: 1 },
        // margin: '10px',
        jsPDF: {
          unit: 'in',
          format: 'a3',
          // format: [8000, 2300],
          orientation: 'portrait',
        },
        html2canvas: {
          scale: 6, // You can adjust the scale to fit more content into a single page
        },
        // pagebreak: {
        //   mode: ['avoid-all', 'css'],
        //   before: 'pageX',
        // },
      };
      window.html2pdf(element, parameters);
    } else {
      console.error('html2pdf is not available.');
    }
  };

  return (
    <div className={style.step5}>
      <div className={style.container}>
        <Flex style={{ marginBottom: '16px' }} justify="space-between">
          <Button
            style={{ color: '#DE231B', border: '1px solid #DE231B' }}
            icon={<MailOutlined />}
            onClick={showModal}
          >
            Send Email
          </Button>

          <Button
            icon={<FilePdfOutlined />}
            onClick={() => handlePrint()}
            style={{ background: '#DE231B', color: COLORS.WHITE }}
          >
            Download PDF
          </Button>
        </Flex>
        <Card className={style.cardMain} title="Review Booking">
          <Row gutter={26}>
            <div
              style={{
                width: '100%',
                padding: '0 16px',
              }}
            >
              <FormBooking dataPropsBooking={dataPropsBooking?.detailBooking} />
            </div>
            <div
              style={{
                display: 'none',
              }}
            >
              <div
                id="content-to-print"
                style={{
                  width: '100%',
                  padding: '0 16px',
                }}
              >
                <FormBookingPDF
                  dataPropsBooking={dataPropsBooking?.detailBooking}
                />
              </div>
            </div>
          </Row>
        </Card>

        <Modal
          title="Send Email"
          open={isModalOpen}
          onCancel={handleCancel}
          footer={[]}
        >
          <Form form={form} onFinish={onFinish}>
            <Row>
              <Col span={24}>
                <Form.Item
                  label={'To'}
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter email address',
                    },
                  ]}
                >
                  <Select
                    mode="tags"
                    style={{ width: '100%' }}
                    placeholder="Please enter email address"
                    options={options}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Flex justify="flex-end" key="back">
                  <Button
                    onClick={handleCancel}
                    style={{ marginRight: '16px' }}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={sendListEmailMutation.isLoading}
                  >
                    Send
                  </Button>
                </Flex>
              </Col>
            </Row>
          </Form>
        </Modal>
      </div>
    </div>
  );
}
