import React, { useEffect } from 'react';
import { Button, Modal, Form, Row, Col, Typography, Upload } from 'antd';
import { InboxOutlined, DownloadOutlined } from '@ant-design/icons';
import { InternalFieldProps } from 'rc-field-form/lib/Field';
import { UseMutationResult } from '@tanstack/react-query';
export interface ImportFormValues {
  file: FileList;
}

interface ImportModalProps {
  loadingImport: boolean;
  open: boolean;
  handleOk: (formValues: ImportFormValues) => void;
  handleCancel: () => void;
  downloadFile: UseMutationResult<BlobPart, unknown, void, unknown>;
  isLoadingDownload: boolean;
}

const { Text } = Typography;
const { Dragger } = Upload;

const ImportCSVModal: React.FC<ImportModalProps> = ({
  loadingImport,
  downloadFile,
  open,
  handleOk,
  handleCancel,
  isLoadingDownload,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (open) form.resetFields();
  }, [open, form]);

  const normFile: InternalFieldProps['getValueFromEvent'] = (e) => {
    return e.fileList[0] ? [e.fileList[0].originFileObj] : [];
  };

  const onOke = () => form.submit();

  const onCancel = () => handleCancel();

  return (
    <Modal
      title="Import excel file"
      open={open}
      onOk={onOke}
      onCancel={loadingImport ? () => null : onCancel}
      maskClosable={!loadingImport}
      footer={[
        <Row key="back">
          <Col span={8}>
            <Row>
              <Button
                onClick={() => downloadFile.mutate()}
                disabled={isLoadingDownload}
                icon={<DownloadOutlined />}
              >
                Download example
              </Button>
            </Row>
          </Col>
          <Col span={8} offset={8}>
            <Button onClick={onCancel} disabled={loadingImport}>
              Cancel
            </Button>
            <Button type="primary" loading={loadingImport} onClick={onOke}>
              Ok
            </Button>
          </Col>
        </Row>,
      ]}
    >
      <Form form={form} layout="vertical" onFinish={handleOk}>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Form.Item
              name="file"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              label={<Text strong>EXCEL file</Text>}
              style={{ margin: 0 }}
              rules={[{ required: true, message: 'File is required' }]}
            >
              <Dragger>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Click or drag file to this area to upload
                </p>
                <p className="ant-upload-hint">
                  Support for a single or bulk upload. Strictly prohibited from
                  uploading company data or other banned files.
                </p>
              </Dragger>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default ImportCSVModal;
