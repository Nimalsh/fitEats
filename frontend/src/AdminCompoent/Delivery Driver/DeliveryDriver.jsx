import React from 'react';
import { Card, Col, Row, Table, Typography, Input, Button } from 'antd';
import StatCard from '../Admin/Components/StatCard';
import { Admin } from '../Admin/Admin';
import AdminTable from '../Admin/Table/Table';
import { useEffect } from 'react';
import axios from 'axios';

const { Title } = Typography;

// Top metrics for drivers and deliveries
const statData = [
  { title: "Drivers Count", value: "6", change: "0", icon: "UserOutlined" },
  { title: "Delivery Income for the Day", value: "Rs.150", change: "-50", icon: "WalletTwoTone" },
  { title: "Number of Deliveries", value: "1", change: "-100", icon: "ShoppingCartOutlined" },
  { title: "Complain Count", value: "0", change: "0", icon: "ExclamationCircleOutlined" },
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
const fetchDrivers = async () => {
  const jwtToken = "";
    await axios.get('http://localhost:5454/api/delivery/all', {
    headers: {
      'Authorization': `Bearer ${jwtToken}`,
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      if (response.status === 200) {
        // Remove existing data
        activeDriversData.length = 0;
        blockedDriversData.length = 0;
        // Adding new data
        let i = 0;
        for (const driver of response.data) {
          i++;

          if (driver.blocked) {
            blockedDriversData.push({
              key: i,
              driverId: `D${driver.driveryId}`,
              name: driver.deliveryName,
              vehicleNumber: driver.vehicleNumber,
              email: driver.email,
              contactNumber: driver.contactNumber,
              blockedDate: "",
            })
          } else {
            activeDriversData.push({
              key: i,
              driverId: `D${driver.driveryId}`,
              name: driver.deliveryName,
              vehicleNumber: driver.vehicleNumber,
              email: driver.email,
              contactNumber: driver.contactNumber,
              blockedDate: "",
          });
        }
      }
    }
    })
    .catch(error => console.error('Error:', error));
}

useEffect(() => {
  fetchDrivers();
}, []);

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
      <Card style={{ height: '100%' }}>
        <AdminTable title={"Active Drivers"} columns={activeDriversColumns} data={activeDriversData} keyField='driverId' />
      </Card>
      </Col>
    </Row>
  );
};
