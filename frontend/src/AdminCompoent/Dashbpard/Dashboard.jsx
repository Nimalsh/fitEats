import React from 'react'
import { Card, Col, Row } from 'antd';
import { Typography, List } from 'antd';
import { LineChart } from '@mui/x-charts/LineChart';
import {Segmented,  } from 'antd';
import StatCard from '../Admin/Components/StatCard';
import { color } from '@mui/system';
import CustomLineChart from '../Admin/chart/chart';

const { Title } = Typography;

const dishes = [
  { name: 'Pizza', count: 25 },
  { name: 'Pasta', count: 18 },
  { name: 'Burger', count: 15 },
  { name: 'Salad', count: 10 },
  { name: 'Sushi', count: 7 },
];


export const Dashboard = () => {
  return (
    <Row gutter={[16, 16]}>
      <StatCard title={"Total Income for the Day"} value={"Rs.1,200"} change={"10"} icon="WalletTwoTone"></StatCard>
      <StatCard title={"Total Orders for the Day"} value={"Rs.12"} change={"22"} icon="ShoppingCartOutlined"></StatCard>
      <StatCard title={"Total Users"} value={"1200"} change={"2"} icon="UserOutlined"></StatCard>
      <StatCard title={"Total Resturants"} value={"Rs.12"} change={"-5"} icon="ShopOutlined"></StatCard>

      <Col
        xs={20}
        md={12}
        xl={16}
      >
        <Card style={{ height: '100%' }}>
          {/* <Typography.Title
            level={4}
            style={{ marginTop: 0, marginBottom: '20px' }}
          >
            Active Users
          </Typography.Title> */}
          <Segmented
            options={[
              'Income Chart',
              'SignUp Chart',
              'Order Chart'
            ]}
            defaultValue="Income Chart"
            size="med"
            block={true}
            style={{ marginBottom: '20px' }}
          />
          <CustomLineChart />
         
        </Card>
      </Col>

      <Col
        xs={20}
        md={6}
        xl={8}
      >
        <Card 
        title="Most Frequent Dishes for the Day" 
        bordered={false} style={{ height: "100%" }}>

        <List
        itemLayout="horizontal"
        dataSource={dishes}
        renderItem={(dish) => (
          <List.Item>
            <List.Item.Meta
              title={<Title level={5}>{dish.name}</Title>}
              description={`Orders: ${dish.count}`}
            />
          </List.Item>
        )}
      />

        
        </Card>
      </Col>

    </Row>

  )
}
