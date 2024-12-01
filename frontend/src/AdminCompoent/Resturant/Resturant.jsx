import React from 'react'
import { Card, Col, Row } from 'antd';
import StatCard from '../Admin/Components/StatCard';
import AdminTable from '../Admin/Table/Table';

const columns = [
  { title: "Restaurant ID", dataIndex: "id", key: "id" },
  { title: "Restaurant Name", dataIndex: "name", key: "name" },
  { title: "Location", dataIndex: "location", key: "location" },
  { title: "Owner Name", dataIndex: "owner", key: "owner" },
  { title: "Contact Number", dataIndex: "contact", key: "contact" },
  { title: "Email", dataIndex: "email", key: "email" },
  { title: "SignUp Date", dataIndex: "signupDate", key: "signupDate" },
];

const initialData = [
  {
    id: "1",
    name: "The Lankan Delight",
    location: "Colombo",
    owner: "John Perera",
    contact: "0112345678",
    email: "john@example.com",
    signupDate: "2024-01-15",
  },
  {
    id: "2",
    name: "Spicy Rice",
    location: "Kandy",
    owner: "Mala Silva",
    contact: "0811234567",
    email: "mala@example.com",
    signupDate: "2024-02-20",
  },
];

export const Restaurant = () => {
  return (
    <Row gutter={[16, 16]}>
      <StatCard title={"Restaurant Count"} value={"15"} change={"0"} icon="ShopOutlined"></StatCard>
      <StatCard title={"Restaurants Income for the Day"} value={"Rs.800"} change={"-9"} icon="DollarOutlined"></StatCard>
      <StatCard title={"Order Count for the Day"} value={"2"} change={"-20"} icon="ShoppingCartOutlined"></StatCard>
      <StatCard title={"Complain Count"} value={"1"} change={"100"} icon="WarningOutlined"></StatCard>
      <Col
        xs={20}
        md={24}
        xl={32}
      >
        <Card style={{ height: '100%' }}>
          <AdminTable title={"Resturants"} columns={columns} data={initialData} />
        </Card>
      </Col>
    </Row>
  )
}
