import React, { useEffect, useState } from 'react';
import style from './index.module.scss';
import { Button, Card, Col, Row, Modal, Form, Select, SelectProps } from 'antd';
import { MailOutlined, FilePdfOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import FormBooking from '../../form-booking';
import { IDataBookingProps } from '../..';
import { useMutation } from '@tanstack/react-query';
import { IRequireSendListEmail } from '../../interface';
import { sendListEmail } from '../../fetcher';
import { errorToast, successToast } from '@/hook/toast';
import { API_MESSAGE } from '@/constant/message';
import COLORS from '@/constant/color';
import FormBookingPDF from '../../form-booking-pdf';
interface Props {
  displayStep: number;
  dataPropsBooking: IDataBookingProps;
}

export default function Step5({ displayStep, dataPropsBooking }: Props) {
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
        errorToast(API_MESSAGE.ERROR);
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
      };

      window.html2pdf(element, parameters);
    } else {
      console.error('html2pdf is not available.');
    }
  };

  return (
    <div
      className={style.step5}
      style={{
        display: displayStep === 5 ? '' : 'none',
      }}
    >
      <div className={style.container}>
        <div style={{ marginBottom: '16px' }}>
          <Button
            style={{
              color: '#DE231B',
              border: '1px solid #DE231B',
              marginRight: '16px',
            }}
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
        </div>
        <Card className={style.cardMain} title="Review Booking">
          <Row gutter={26}>
            <div
              // id="content-to-print"
              style={{
                width: '100%',
                padding: '0 16px',
              }}
            >
              <FormBooking dataPropsBooking={dataPropsBooking} />
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
                <FormBookingPDF dataPropsBooking={dataPropsBooking} />
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
                <div key="back">
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
                </div>
              </Col>
            </Row>
          </Form>
        </Modal>
      </div>
    </div>
  );
}
