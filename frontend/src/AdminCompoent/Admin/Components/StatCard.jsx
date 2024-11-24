import React from 'react';
import { Card, Row, Col, Typography, Space } from 'antd';
import * as Icons from '@ant-design/icons';

function Icon(props) {
    return React.createElement(Icons[props.icon], { ...props });
  }

const StatCard = ({ title, value, change, icon, iconColor }) => {
  return (
    <Col xs={24} md={12} xl={6}>
      <Card style={{ height: '100%' }}>
        <Row>
          <Col xs={18}>
            <Typography.Text type="secondary" strong={true}>
              <p>{title}</p>
            </Typography.Text>
            <Space size="small" align="baseline">
              <Typography.Title level={3} style={{ margin: 0 }}>
                <p>{value}</p>
              </Typography.Title>
              <Typography.Text type={change < 0 ? "danger" : "success"} strong={true}>
                {change > 0 ? `+${change}%` : `${change}%`}
              </Typography.Text>
            </Space>
          </Col>
          <Col xs={6} style={{ textAlign: 'center' }}>
            <Icon
                icon={icon}
              style={{ fontSize: '60px', color: '#777525' }}
            />
          </Col>
        </Row>
      </Card>
    </Col>
  );
};

export default StatCard;
