import React from 'react'
import { Card, Col, Row } from 'antd';
import { Typography, List } from 'antd';
import { LineChart } from '@mui/x-charts/LineChart';
import {Segmented,  } from 'antd';
import StatCard from '../Admin/Components/StatCard';
import { color } from '@mui/system';
import { Table } from 'antd';
import ReusableTable from '../Admin/Components/ReusableTable';

const { Title } = Typography;

const columns = [
  {
    title: 'Order ID',
    dataIndex: 'orderId',
    key: 'orderId',
    sorter: (a, b) => a.orderId.localeCompare(b.orderId),
  },
  {
    title: 'User ID',
    dataIndex: 'userId',
    key: 'userId',
  },
  {
    title: 'Restaurant ID',
    dataIndex: 'restaurantId',
    key: 'restaurantId',
  },
  {
    title: 'Delivery Driver ID',
    dataIndex: 'deliveryDriverId',
    key: 'deliveryDriverId',
  },
  {
    title: 'Order Date',
    dataIndex: 'orderDate',
    key: 'orderDate',
    sorter: (a, b) => new Date(a.orderDate) - new Date(b.orderDate),
  },
  {
    title: 'Transaction ID',
    dataIndex: 'transactionId',
    key: 'transactionId',
  },
  {
    title: 'Transaction Amount',
    dataIndex: 'transactionAmount',
    key: 'transactionAmount',
    render: (amount) => <span style={{ color: '#52c41a', fontWeight: 'bold' }}>{amount}</span>,
  },
];

const pendingOrders = [
  {
    key: '1',
    orderId: 'ORD001',
    userId: 'USR001',
    restaurantId: 'REST001',
    deliveryDriverId: 'DRV001',
    orderDate: '2023-11-01',
    transactionId: 'TXN001',
    transactionAmount: 'LKR 1200',
  },
  {
    key: '2',
    orderId: 'ORD002',
    userId: 'USR002',
    restaurantId: 'REST002',
    deliveryDriverId: 'DRV002',
    orderDate: '2023-11-02',
    transactionId: 'TXN002',
    transactionAmount: 'LKR 1500',
  },
];

const completeOrders = [
  {
    key: '1',
    orderId: 'ORD003',
    userId: 'USR003',
    restaurantId: 'REST003',
    deliveryDriverId: 'DRV003',
    orderDate: '2023-10-30',
    transactionId: 'TXN003',
    transactionAmount: 'LKR 2000',
  },
  {
    key: '2',
    orderId: 'ORD004',
    userId: 'USR004',
    restaurantId: 'REST004',
    deliveryDriverId: 'DRV004',
    orderDate: '2023-10-29',
    transactionId: 'TXN004',
    transactionAmount: 'LKR 2500',
  },
];
const onChange = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};

export const OrderHistory = () => {
  return (
    <Row gutter={[16, 16]}>
      <Col
        xs={20}
        md={24}
        xl={32}
      >

      <Card style={{ height: '100%' }}>

      <div>
        <h2>Pending Orders</h2>
        <ReusableTable columns={columns} data={pendingOrders} />
      </div>

      <div>
        <h2>Complete Orders</h2>
        <ReusableTable columns={columns} data={completeOrders} />
      </div>
        </Card>
        </Col>

      
      </Row>
  )
}
