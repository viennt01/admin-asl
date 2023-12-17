import React from 'react';
import { Avatar, List } from 'antd';
import { IAslTopSale } from './interface';

interface Props {
  dataTopASL: IAslTopSale[];
}
const RankMember = ({ dataTopASL }: Props) => (
  <div
    style={{
      height: 580,
      overflow: 'auto',
      padding: '0 16px',
      border: '1px solid rgba(140, 140, 140, 0.35)',
    }}
  >
    <List
      itemLayout="horizontal"
      dataSource={dataTopASL}
      renderItem={(item, index) => (
        <List.Item>
          <List.Item.Meta
            avatar={
              <Avatar
                style={{
                  verticalAlign: 'middle',
                  marginRight: '10px',
                  backgroundColor: item?.colorAvatar,
                }}
                src={item?.avatar}
              >
                {item?.defaultAvatar || ''}
              </Avatar>
            }
            title={<div>{item.fullName}</div>}
            description={item.email}
          />
          <div>{item.quantityBooking}</div>
          <Avatar src={`/images/rank/no${index < 3 ? index : ''}.png`} />
        </List.Item>
      )}
    />
  </div>
);

export default RankMember;
