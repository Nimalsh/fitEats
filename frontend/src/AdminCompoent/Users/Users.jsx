import React, { useState } from 'react'
import { Card, Col, Row } from 'antd';
import { Typography, List } from 'antd';
import { LineChart } from '@mui/x-charts/LineChart';
import {Segmented,  } from 'antd';
import StatCard from '../Admin/Components/StatCard';
import { color } from '@mui/system';
import { Table } from 'antd';

const { Title } = Typography;

const columns = (handleBlockUser) => [
  {
    title: 'User ID',
    dataIndex: 'userID',
    width: '10%',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    width: '20%',
  },
  {
    title: 'Contact Number',
    dataIndex: 'contactNumber',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    width: '20%',
  },
  {
    title: 'Action',
    dataIndex: 'blocked',
    render: (blocked, record) => (
      <a onClick={() => handleBlockUser(record.key)}>
        {blocked ? 'Unblock' : 'Block'}
      </a>
    ),
  },
];

const initialData = [
  {
    key: '1',
    userID: 'FEU12',
    name: 'John Brown',
    contactNumber: '1234567890',
    email: 'john@gmail.com',
    blocked: false,
  },
  {
    key: '2',
    userID: 'FEU13',
    name: 'Jim Green',
    contactNumber: '1234567890',
    email: 'jim@gmail.com',
    blocked: false,
  },
  {
    key: '3',
    userID: 'FEU14',
    name: 'Joe Black',
    contactNumber: '1234567890',
    email: 'joe@gmail.com',
    blocked: false,
  },
  {
    key: '4',
    userID: 'FEU15',
    name: 'Jim Red',
    contactNumber: '1234567890',
    email: 'jim@gmail.com',
    blocked: false,
  },
  {
    key: '5',
    userID: 'FEU16',
    name: 'Jim Red',
    contactNumber: '1234567890',
    email: 'red@fdf.com',
    blocked: false,
  },
  {
    key: '6',
    userID: 'FEU17',
    name: 'Jim Red',
    contactNumber: '1234567890',
    email: 'gg@gg.com',
    blocked: false,
  },
];

const onChange = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};

export const Users = () => {
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
      <StatCard title={'Total Income for the Day'} value={'Rs.1,200'} change={'-31'} icon="WalletTwoTone" />
      <StatCard title={'Total Orders for the Day'} value={'Rs.12'} change={'-31'} icon="ShoppingCartOutlined" />
      <StatCard title={'Total Users'} value={'1200'} change={'-31'} icon="UserOutlined" />
      <StatCard title={'Total Restaurants'} value={'Rs.12'} change={'-31'} icon="ShopOutlined" />
      <Col xs={20} md={24} xl={32}>
        {renderTable(activeUsers, 'Active Users')}
      </Col>
      <Col xs={20} md={24} xl={32}>
        {renderTable(blockedUsers, 'Blocked Users')}
      </Col>
    </Row>
  );
};


