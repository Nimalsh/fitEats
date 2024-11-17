import React from 'react'
import { Card, Col, Row } from 'antd';
import { Typography, List } from 'antd';
import { LineChart } from '@mui/x-charts/LineChart';
import {Segmented,  } from 'antd';
import StatCard from '../Admin/Components/StatCard';
import { color } from '@mui/system';

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
      <StatCard title={"Total Income for the Day"} value={"Rs.1,200"} change={"-31"} icon="WalletTwoTone"></StatCard>
      <StatCard title={"Total Orders for the Day"} value={"Rs.12"} change={"-31"} icon="ShoppingCartOutlined"></StatCard>
      <StatCard title={"Total Users"} value={"1200"} change={"-31"} icon="UserOutlined"></StatCard>
      <StatCard title={"Total Resturants"} value={"Rs.12"} change={"-31"} icon="ShopOutlined"></StatCard>

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
          <LineChart
            xAxis={[{ data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }]}
            series={[
              {
                data: [2, 3, 5.5, 8.5, 1.5, 5, 1, 4, 3, 8],
                showMark: ({ index }) => index % 2 === 0,
              },
            ]}
            width={500}
            height={300}
          />
         
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
