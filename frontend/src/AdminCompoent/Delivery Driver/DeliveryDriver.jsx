import React from 'react';
import { Card, Col, Row, Table, Typography, Input, Button } from 'antd';
import StatCard from '../Admin/Components/StatCard';

const { Title } = Typography;

// Top metrics for drivers and deliveries
const statData = [
  { title: "Drivers Count", value: "150", change: "2", icon: "UserOutlined" },
  { title: "Delivery Income for the Day", value: "Rs.45,000", change: "2", icon: "WalletTwoTone" },
  { title: "Number of Deliveries", value: "320", change: "2", icon: "ShoppingCartOutlined" },
  { title: "Complain Count", value: "10", change: "2", icon: "ExclamationCircleOutlined" },
];

// Table columns and data for active drivers
const activeDriversColumns = [
  {
    title: 'Driver ID',
    dataIndex: 'driverId',
    key: 'driverId',
  },
  {
    title: 'Driver Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Vehicle Number',
    dataIndex: 'vehicleNumber',
    key: 'vehicleNumber',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Contact Number',
    dataIndex: 'contactNumber',
    key: 'contactNumber',
  },
  {
    title: 'Sign-Up Date',
    dataIndex: 'signUpDate',
    key: 'signUpDate',
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Button type="primary" danger onClick={() => handleBlockDriver(record.driverId)}>
        Block
      </Button>
    ),
  },
];

// Table columns and data for blocked drivers
const blockedDriversColumns = [
  {
    title: 'Driver ID',
    dataIndex: 'driverId',
    key: 'driverId',
  },
  {
    title: 'Driver Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Vehicle Number',
    dataIndex: 'vehicleNumber',
    key: 'vehicleNumber',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Contact Number',
    dataIndex: 'contactNumber',
    key: 'contactNumber',
  },
  {
    title: 'Blocked Date',
    dataIndex: 'blockedDate',
    key: 'blockedDate',
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Button type="primary" onClick={() => handleUnblockDriver(record.driverId)}>
        Unblock
      </Button>
    ),
  },
];

// Sample data for active and blocked drivers
const activeDriversData = [
  {
    key: '1',
    driverId: 'D001',
    name: 'Kamal Perera',
    vehicleNumber: 'ABC-1234',
    email: 'kamal@example.com',
    contactNumber: '0771234567',
    signUpDate: '2024-01-01',
  },
  {
    key: '2',
    driverId: 'D002',
    name: 'Nimal Silva',
    vehicleNumber: 'XYZ-5678',
    email: 'nimal@example.com',
    contactNumber: '0779876543',
    signUpDate: '2024-01-15',
  },
];

const blockedDriversData = [
  {
    key: '1',
    driverId: 'D003',
    name: 'Sunil Fernando',
    vehicleNumber: 'LMN-3456',
    email: 'sunil@example.com',
    contactNumber: '0774567890',
    blockedDate: '2024-02-01',
  },
];

const handleBlockDriver = (driverId) => {
  console.log(`Blocked Driver ID: ${driverId}`);
};

const handleUnblockDriver = (driverId) => {
  console.log(`Unblocked Driver ID: ${driverId}`);
};

export const DeliveryDriver = () => {
  return (
    <Row gutter={[16, 16]}>
      {/* Top metrics */}
      {statData.map((stat, index) => (
        <StatCard
          key={index}
          title={stat.title}
          value={stat.value}
          change={stat.change}
          icon={stat.icon}
        />
      ))}

      {/* Active Drivers Section */}
      <Col span={24}>
        <Card title="Active Drivers" extra={<Input.Search placeholder="Search Drivers" style={{ width: 300 }} />}>
          <Table columns={activeDriversColumns} dataSource={activeDriversData} />
        </Card>
      </Col>

      {/* Blocked Drivers Section */}
      <Col span={24}>
        <Card title="Blocked Drivers" extra={<Input.Search placeholder="Search Blocked Drivers" style={{ width: 300 }} />}>
          <Table columns={blockedDriversColumns} dataSource={blockedDriversData} />
        </Card>
      </Col>
    </Row>
  );
};
