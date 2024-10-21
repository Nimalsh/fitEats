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

const columns = (handleBlockUser) => [
  {
    title: 'Date',
    dataIndex: 'date',
    width: '20%',
  },
  {
    title: 'Time',
    dataIndex: 'time',
    width: '10%',
  },
  {
    title: 'Payment Done To',
    dataIndex: 'paymentDoneTo',
  },
  {
    title: 'Total Payment',
    dataIndex: 'totalPayment',
    width: '20%',
  },
];

const initialData = [
    {
        key: '1',
        date: '2023-10-01',
        time: '10:00 AM',
        paymentDoneTo: 'John Brown',
        totalPayment: '$100',
    },
    {
        key: '2',
        date: '2023-10-02',
        time: '11:00 AM',
        paymentDoneTo: 'Jim Green',
        totalPayment: '$150',
    },
    {
        key: '3',
        date: '2023-10-03',
        time: '12:00 PM',
        paymentDoneTo: 'Joe Black',
        totalPayment: '$200',
    },
    {
        key: '4',
        date: '2023-10-04',
        time: '01:00 PM',
        paymentDoneTo: 'Jim Red',
        totalPayment: '$250',
    },
    {
        key: '5',
        date: '2023-10-05',
        time: '02:00 PM',
        paymentDoneTo: 'Jim Red',
        totalPayment: '$300',
    },
    {
        key: '6',
        date: '2023-10-06',
        time: '03:00 PM',
        paymentDoneTo: 'Jim Red',
        totalPayment: '$350',
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
        {renderTable(activeUsers, 'Active Users')}
      </Col>

      <Col xs={20} md={24} xl={32}>
      <ReportWidget />
      </Col>
     
    </Row>
  );
};


