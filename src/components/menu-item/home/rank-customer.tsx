import React from 'react';
import { Avatar, List } from 'antd';
import { ICustomerTopBooking } from './interface';

interface Props {
  dataTopASL: ICustomerTopBooking[];
}

const RankCustomer = ({ dataTopASL }: Props) => (
  <div
    style={{
      height: 385,
      overflow: 'auto',
      padding: '16px',
      border: '1px solid rgba(140, 140, 140, 0.35)',
    }}
  >
    <List
      itemLayout="horizontal"
      dataSource={dataTopASL}
      renderItem={(item, index) => (
        <List.Item>
          <List.Item.Meta
            title={<div>{item.companyName}</div>}
            description={item.emailCompany}
          />
          <div>{item.quantityBooking}</div>
          <Avatar src={`/images/rank/no${index < 3 ? index : ''}.png`} />
        </List.Item>
      )}
    />
  </div>
);

export default RankCustomer;
