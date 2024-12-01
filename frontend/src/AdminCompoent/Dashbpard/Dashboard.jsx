import React from 'react';
import { Card, Col, Row } from 'antd';
import { Typography, List } from 'antd';
import { Segmented } from 'antd';
import StatCard from '../Admin/Components/StatCard';
import CustomLineChart from '../Admin/chart/chart';

const { Title } = Typography;

const dishes = [
  { name: 'Pizza', count: 25 },
  { name: 'Pasta', count: 18 },
  { name: 'Burger', count: 15 },
  { name: 'Salad', count: 10 },
  { name: 'Sushi', count: 7 },
];

const data = [
  { day: 'Nov 28', income: 1850 },
  { day: 'Nov 29', income: 1150 },
  { day: 'Nov 30', income: 1500 },
  { day: 'Dec 1', income: 1100 },
  { day: 'Dec 2', income: 1400 },
  { day: 'Dec 3', income: 2000 },
  { day: 'Dec 4', income: 1000 },
];

export const Dashboard = () => {
  const [chartData, setChartData] = React.useState(data);
  const [selectedChart, setSelectedChart] = React.useState('Income Chart');

  const handleChartChange = (value) => {
    setSelectedChart(value);
    switch (value) {
      case 'Income Chart':
        setChartData(data);
        break;
      case 'SignUp Chart':
        setChartData([
          { day: 'Nov 28', signups: 5 },
          { day: 'Nov 29', signups: 3 },
          { day: 'Nov 30', signups: 4 },
          { day: 'Dec 1', signups: 2 },
          { day: 'Dec 2', signups: 3 },
          { day: 'Dec 3', signups: 6 },
          { day: 'Dec 4', signups: 1 },
        ]);
        break;
      case 'Order Chart':
        setChartData([
          { day: 'Nov 28', orders: 10 },
          { day: 'Nov 29', orders: 8 },
          { day: 'Nov 30', orders: 9 },
          { day: 'Dec 1', orders: 7 },
          { day: 'Dec 2', orders: 8 },
          { day: 'Dec 3', orders: 12 },
          { day: 'Dec 4', orders: 2 },
        ]);
        break;
      default:
        setChartData(data);
    }
  };

  return (
    <Row gutter={[16, 16]}>
      <StatCard title={"Total Income for the Day"} value={"Rs.1000"} change={"-85"} icon="WalletTwoTone"></StatCard>
      <StatCard title={"Total Orders for the Day"} value={"12"} change={"-22"} icon="ShoppingCartOutlined"></StatCard>
      <StatCard title={"Total Users"} value={"50"} change={"0"} icon="UserOutlined"></StatCard>
      <StatCard title={"Total Resturants"} value={"15"} change={"0"} icon="ShopOutlined"></StatCard>

      <Col
        xs={20}
        md={12}
        xl={16}
      >
        <Card style={{ height: '100%' }}>
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
            onChange={handleChartChange}
          />
          <CustomLineChart data={chartData} yAxisKey={selectedChart === 'Income Chart' ? 'income' : selectedChart === 'SignUp Chart' ? 'signups' : 'orders'} yAxisLabel={selectedChart === 'Income Chart' ? 'Income' : selectedChart === 'SignUp Chart' ? 'Signups' : 'Orders'} />
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
