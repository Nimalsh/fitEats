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
    title: 'Appointment ID',
    dataIndex: 'appointmentId',
    key: 'appointmentId',
    sorter: (a, b) => a.appointmentId.localeCompare(b.appointmentId),
  },
  {
    title: 'User ID',
    dataIndex: 'userId',
    key: 'userId',
  },
  {
    title: 'Nutritionist ID',
    dataIndex: 'nutritionistId',
    key: 'nutritionistId',
  },
  {
    title: 'Appointment Date',
    dataIndex: 'appointmentDate',
    key: 'appointmentDate',
    sorter: (a, b) => new Date(a.appointmentDate) - new Date(b.appointmentDate),
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

const pendingAppointments = [
  {
    key: '1',
    appointmentId: 'APP001',
    userId: 'USR001',
    nutritionistId: 'NUT001',
    appointmentDate: '2023-11-15',
    transactionId: 'TXN001',
    transactionAmount: 'LKR 2000',
  },
  {
    key: '2',
    appointmentId: 'APP002',
    userId: 'USR002',
    nutritionistId: 'NUT002',
    appointmentDate: '2023-11-16',
    transactionId: 'TXN002',
    transactionAmount: 'LKR 2500',
  },
];

const completeAppointments = [
  {
    key: '1',
    appointmentId: 'APP003',
    userId: 'USR003',
    nutritionistId: 'NUT003',
    appointmentDate: '2023-11-10',
    transactionId: 'TXN003',
    transactionAmount: 'LKR 3000',
  },
  {
    key: '2',
    appointmentId: 'APP004',
    userId: 'USR004',
    nutritionistId: 'NUT004',
    appointmentDate: '2023-11-09',
    transactionId: 'TXN004',
    transactionAmount: 'LKR 3500',
  },
];

export const NutritionistChanneling = () => {
  return (
    <Row gutter={[16, 16]}>
      <Col
        xs={20}
        md={24}
        xl={32}
      >

      <Card style={{ height: '100%' }}>

      <div style={{ margin: '24px 0' }}>
        <h2>Pending Appointments</h2>
        <ReusableTable columns={columns} data={pendingAppointments} />
      </div>

      <div>
        <h2>Complete Appointments</h2>
        <ReusableTable columns={columns} data={completeAppointments} />
      </div>

        </Card>
        </Col>

      
      </Row>
  )
}
