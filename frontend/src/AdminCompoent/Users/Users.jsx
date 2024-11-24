import React, { useState } from 'react'
import { Card, Col, Row } from 'antd';
import StatCard from '../Admin/Components/StatCard';
import { Table } from 'antd';


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
    title: 'Signup Date',
    dataIndex: 'signupDate',
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
    name: 'Danindu Perera',
    contactNumber: '0712345678',
    email: 'danindu@gmail.com',
    signupDate: '2024-10-01',
    blocked: false,
  },
  {
    key: '2',
    userID: 'FEU13',
    name: 'Kasun Silva',
    contactNumber: '0712345679',
    email: 'kasun@gmail.com',
    signupDate: '2024-10-02',
    blocked: false,
  },
  {
    key: '3',
    userID: 'FEU14',
    name: 'Nimal Fernando',
    contactNumber: '0712345680',
    email: 'nimal@gmail.com',
    signupDate: '2024-10-03',
    blocked: false,
  },
  {
    key: '4',
    userID: 'FEU15',
    name: 'Sunil Jayawardena',
    contactNumber: '0712345681',
    email: 'sunil@gmail.com',
    signupDate: '2024-10-04',
    blocked: false,
  },
  {
    key: '5',
    userID: 'FEU16',
    name: 'Amara Wijesinghe',
    contactNumber: '0712345682',
    email: 'amara@gmail.com',
    signupDate: '2024-10-05',
    blocked: false,
  },
  {
    key: '6',
    userID: 'FEU17',
    name: 'Ruwan Gunasekara',
    contactNumber: '0712345683',
    email: 'ruwan@gmail.com',
    signupDate: '2024-10-06',
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
      <StatCard title={'User Count'} value={'100'} change={'10'} icon="UserOutlined" />
      <StatCard title={'Regular Users'} value={'20'} change={'2'} icon="UserOutlined" />
      <StatCard title={'New SignUps'} value={'20'} change={'5'} icon="UserOutlined" />
      <StatCard title={'Average Signup '} value={'10'} change={'0'} icon="UserOutlined" />
      <Col xs={20} md={24} xl={32}>
        {renderTable(activeUsers, 'Active Users')}
      </Col>
      <Col xs={20} md={24} xl={32}>
        {renderTable(blockedUsers, 'Blocked Users')}
      </Col>
    </Row>
  );
};


