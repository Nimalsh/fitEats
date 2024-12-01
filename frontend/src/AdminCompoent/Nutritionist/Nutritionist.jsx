import React from 'react'
import { Card, Col, Row } from 'antd';
import StatCard from '../Admin/Components/StatCard';
import { Table } from 'antd';
import AdminTable from '../Admin/Table/Table';

const nutritionistData = [
  {
    id: "N001",
    name: "Dr. Ayesha Perera",
    slmcRegistration: "SLMC12345",
    email: "ayesha.perera@nutrition.lk",
    contact: "0712345678",
    signupDate: "2023-03-15",
  },
  {
    id: "N002",
    name: "Dr. Malith Silva",
    slmcRegistration: "SLMC54321",
    email: "malith.silva@nutrition.lk",
    contact: "0723456789",
    signupDate: "2023-06-12",
  },
  {
    id: "N003",
    name: "Dr. Nirosha Fernando",
    slmcRegistration: "SLMC98765",
    email: "nirosha.fernando@nutrition.lk",
    contact: "0761234567",
    signupDate: "2023-08-22",
  },
  {
    id: "N004",
    name: "Dr. Kusal Jayawardene",
    slmcRegistration: "SLMC11223",
    email: "kusal.jayawardene@nutrition.lk",
    contact: "0776543210",
    signupDate: "2023-09-05",
  },
  {
    id: "N005",
    name: "Dr. Shanika Rajapakse",
    slmcRegistration: "SLMC33211",
    email: "shanika.rajapakse@nutrition.lk",
    contact: "0789876543",
    signupDate: "2023-11-01",
  },
];

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'SLMC Registration',
    dataIndex: 'slmcRegistration',
    key: 'slmcRegistration',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Contact',
    dataIndex: 'contact',
    key: 'contact',
  },
  {
    title: 'Signup Date',
    dataIndex: 'signupDate',
    key: 'signupDate',
  },
];

const onChange = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};

export const Nutritionist = () => {
  return (
    <Row gutter={[16, 16]}>
      <StatCard title={"Nutritionist Count"} value={"5"} change={"-1"} icon="UserOutlined"></StatCard>
      <StatCard title={"Chanelling Income for the Day"} value={"Rs.2500"} change={"-10"} icon="DollarOutlined"></StatCard>
      <StatCard title={"Number of Chanelling Appointments"} value={"15"} change={"-2"} icon="CalendarOutlined"></StatCard>
      <StatCard title={"Complain Count"} value={"3"} change={"-1"} icon="WarningOutlined"></StatCard>
      <Col
        xs={20}
        md={24}
        xl={32}
      >
        <Card style={{ height: '100%' }}>
          <AdminTable title={"Nutritionist"} columns={columns} data={nutritionistData} />
        </Card>
      </Col>
    </Row>
  )
}
