import React from 'react';
import { Collapse, CollapseProps, Typography } from 'antd';

const { Panel } = Collapse;
const { Title } = Typography;

interface CollapseCardProps extends CollapseProps {
  title: string;
  defaultActive?: boolean;
}

const CollapseCard = React.forwardRef<HTMLDivElement, CollapseCardProps>(
  (props, ref) => {
    const collapseStyle = {
      borderRadius: 4,
      boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
      background: 'white',
      border: 'none',
      ...props.style,
    };

    const panelStyle = {
      border: 'none',
    };

    return (
      <Collapse
        ref={ref}
        defaultActiveKey={props.defaultActive ? ['1'] : ['']}
        style={collapseStyle}
        size="large"
      >
        <Panel
          style={panelStyle}
          forceRender
          header={
            <Title level={3} style={{ margin: '-4px 0' }}>
              {props.title}
            </Title>
          }
          key="1"
        >
          {props.children}
        </Panel>
      </Collapse>
    );
  }
);

CollapseCard.displayName = 'CollapseCard';

export default CollapseCard;
