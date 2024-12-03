import React, { useState } from 'react'
import { Card, Col, Row } from 'antd';
import StatCard from '../Admin/Components/StatCard';
import { Table } from 'antd';
import { Admin } from '../Admin/Admin';
import AdminTable from '../Admin/Table/Table';
import { useEffect } from 'react';
import axios from 'axios';


const columns =  [
  {
    title: 'User ID',
    dataIndex: 'userID',
    key: 'userID',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    
  },
  {
    title: 'Contact Number',
    dataIndex: 'contactNumber',
    key: 'contactNumber',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Signup Date',
    dataIndex: 'signupDate',
    key: 'signupDate',
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
  },
  {
    key: '2',
    userID: 'FEU13',
    name: 'Kasun Silva',
    contactNumber: '0712345679',
    email: 'kasun@gmail.com',
    signupDate: '2024-10-02',
  },
  {
    key: '3',
    userID: 'FEU14',
    name: 'Nimal Fernando',
    contactNumber: '0712345680',
    email: 'nimal@gmail.com',
    signupDate: '2024-10-03',
  },
  {
    key: '4',
    userID: 'FEU15',
    name: 'Sunil Jayawardena',
    contactNumber: '0712345681',
    email: 'sunil@gmail.com',
    signupDate: '2024-10-04',
  },
  {
    key: '5',
    userID: 'FEU16',
    name: 'Amara Wijesinghe',
    contactNumber: '0712345682',
    email: 'amara@gmail.com',
    signupDate: '2024-10-05',
  },
  {
    key: '6',
    userID: 'FEU17',
    name: 'Ruwan Gunasekara',
    contactNumber: '0712345683',
    email: 'ruwan@gmail.com',
    signupDate: '2024-10-06',
  },
];

const onChange = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};

export const Users = () => {

const fetchUsers = async () => {
  const jwtToken = "";
    await axios.get('http://localhost:5454/api/users/all-users', {
    headers: {
      'Authorization': `Bearer ${jwtToken}`,
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      initialData.length = 0;
      if (response.status === 200) {
        let i = 0;
        for (const user of response.data) {
          i++;
          console.log(user);
          initialData.push({
            key: i,
            id: user.id,
            userID: `FEU${user.id}`,
            name: user.fullName,
            contactNumber: user.contactNumber,
            email: user.email,
            signupDate: user.signUpDate,
            blocked: user.blocked,
          })
        }
      }
    })
    .catch(error => console.error('Error:', error));
}

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Row gutter={[16, 16]}>
      <StatCard title={'User Count'} value={'50'} change={'10'} icon="UserOutlined" />
      <StatCard title={'Regular Users'} value={'10'} change={'2'} icon="UserOutlined" />
      <StatCard title={'New SignUps'} value={'5'} change={'5'} icon="UserOutlined" />
      <StatCard title={'Average Signup '} value={'10%'} change={'1'} icon="UserOutlined" />
      <Col xs={20} md={24} xl={32}>
      <Card style={{ height: '100%' }}>
        <AdminTable title={"Users"} columns={columns} data={initialData} keyField='userID' />
        </Card>
      </Col>
    </Row>
  );
};


