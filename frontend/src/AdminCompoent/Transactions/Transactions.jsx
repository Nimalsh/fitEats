import React, { useState } from 'react'
import { Card, Col, Row } from 'antd';
import { Typography, List } from 'antd';
import { LineChart } from '@mui/x-charts/LineChart';
import {Segmented,  } from 'antd';
import StatCard from '../Admin/Components/StatCard';
import { color } from '@mui/system';
import { Table } from 'antd';
import UserWidget from '../Admin/Components/UserWidget';
import ReportWidget from '../Admin/Components/UserWidget';

const { Title } = Typography;

const columns = () => [
  {
    title: 'Transaction ID',
    dataIndex: 'transactionId',
    width: '15%',
  },
  {
    title: 'Date',
    dataIndex: 'date',
    width: '15%',
  },
  {
    title: 'Time',
    dataIndex: 'time',
    width: '10%',
  },
  {
    title: 'Payment Done By',
    dataIndex: 'paymentDoneBy',
    width: '15%',
  },
  {
    title: 'Order/Appointment ID',
    dataIndex: 'orderAppointmentId',
    width: '15%',
  },
  {
    title: 'Payment Done To',
    dataIndex: 'paymentDoneTo',
    width: '15%',
  },
  {
    title: 'Total Payment',
    dataIndex: 'totalPayment',
    width: '15%',
  },
];

const initialData = [
  {
    key: '1',
    transactionId: 'TXN001',
    date: '2023-10-01',
    time: '10:00 AM',
    paymentDoneBy: 'Nimal Perera',
    orderAppointmentId: 'ORD001',
    paymentDoneTo: 'Kumara Silva',
    totalPayment: 'LKR 1000',
  },
  {
    key: '2',
    transactionId: 'TXN002',
    date: '2023-10-02',
    time: '11:00 AM',
    paymentDoneBy: 'Amali Wijesinghe',
    orderAppointmentId: 'ORD002',
    paymentDoneTo: 'Sunil Fernando',
    totalPayment: 'LKR 1500',
  },
  {
    key: '3',
    transactionId: 'TXN003',
    date: '2023-10-03',
    time: '12:00 PM',
    paymentDoneBy: 'Sajith Jayawardena',
    orderAppointmentId: 'ORD003',
    paymentDoneTo: 'Chathura Gamage',
    totalPayment: 'LKR 2000',
  },
  {
    key: '4',
    transactionId: 'TXN004',
    date: '2023-10-04',
    time: '01:00 PM',
    paymentDoneBy: 'Chamali Bandara',
    orderAppointmentId: 'ORD004',
    paymentDoneTo: 'Hirantha Abeysekera',
    totalPayment: 'LKR 2500',
  },
  {
    key: '5',
    transactionId: 'TXN005',
    date: '2023-10-05',
    time: '02:00 PM',
    paymentDoneBy: 'Tharindu Rathnayake',
    orderAppointmentId: 'ORD005',
    paymentDoneTo: 'Kumara Silva',
    totalPayment: 'LKR 3000',
  },
  {
    key: '6',
    transactionId: 'TXN006',
    date: '2023-10-06',
    time: '03:00 PM',
    paymentDoneBy: 'Dilini Senanayake',
    orderAppointmentId: 'ORD006',
    paymentDoneTo: 'Kumara Silva',
    totalPayment: 'LKR 3500',
  },
];


const onChange = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};

export const Transactions = () => {
  const [usersData, setUsersData] = useState(initialData);

  // Function to handle blocking/unblocking users
  const handleBlockUser = (key) => {
    const updatedUsers = usersData.map((user) =>
      user.key === key ? { ...user, blocked: !user.blocked } : user
    );
    setUsersData(updatedUsers);
  };

  const blockedUsers = usersData.filter((user) => user.blocked);
  const activeUsers = usersData.filter((user) => !user.blocked);

  const renderTable = (users, title) => {
    return (
      <Card title={title} style={{ height: '100%' }}>
        <Table columns={columns(handleBlockUser)} dataSource={users} onChange={onChange} />
      </Card>
    );
  };

  return (
    <Row gutter={[16, 16]}>
      <Col xs={20} md={24} xl={32}>
        {renderTable(activeUsers, 'Transaction History')}
      </Col>

      <Col xs={20} md={24} xl={32}>
      <ReportWidget />""
      </Col>
     
    </Row>
  );
};


