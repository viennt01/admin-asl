import React from 'react';
import { Badge, Card, Descriptions } from 'antd';
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  HomeOutlined,
} from '@ant-design/icons';

export default function EditLPermission() {
  return (
    <Card bordered={false} style={{ margin: '10px 0' }}>
      <Descriptions title="THÔNG TIN CHI TIẾT CỦA PHÂN QUYỀN" column={2}>
        <Descriptions.Item label={<UserOutlined />}>
          Công ty Cảng quốc tế SP-PSA
        </Descriptions.Item>
        <Descriptions.Item label={<MailOutlined />}>
          thanhviennguyen01@gmail.com
        </Descriptions.Item>
        <Descriptions.Item label={<PhoneOutlined />}>
          1810000000
        </Descriptions.Item>
        <Descriptions.Item label={<HomeOutlined />}>
          Thành phố Hồ Chí Minh
        </Descriptions.Item>
      </Descriptions>
      <hr style={{ width: '70%', marginBottom: '24px' }} color="#BBBBBB" />

      <Descriptions column={2}>
        <Descriptions.Item label="Số lượng container">
          100.000.000{' '}
        </Descriptions.Item>
        <Descriptions.Item label="Sức chứa">181</Descriptions.Item>
        <Descriptions.Item label="Trạng thái">
          <Badge status="processing" text="Hoạt động bình thường" />
        </Descriptions.Item>
        <Descriptions.Item label="Trạng thái sức chứa">
          <Badge status="error" text="Đầy" />
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
}
