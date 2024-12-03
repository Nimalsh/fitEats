import React from 'react'
import { Card, Col, Row } from 'antd';
import StatCard from '../Admin/Components/StatCard';
import AdminTable from '../Admin/Table/Table';
import axios from 'axios';
import { useEffect } from 'react';

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

const fetchRestaurants = async () => {
  const jwtToken = "";
    await axios.get('http://localhost:5454/api/restaurant/all', {
    headers: {
      'Authorization': `Bearer ${jwtToken}`,
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    // Assuming response.data is an array of objects
    if (response.status === 200) {
      initialData.length = 0;
    response.data.forEach(item => {
      const convertedItem = {
        id: item.id.toString(), // Convert ID to string
        name: item.name || "", // Set default name if null
        location: "", // Set default location
        owner: item.owner || "", // Set default owner if null
        contact: item.contactInformation && item.contactInformation.mobile, // Set default contact number
        email: item.contactInformation && item.contactInformation.email, // Set default email
        signupDate: item.registrationDate // Set default signup date
      };

      // Push the converted item to the array
      initialData.push(convertedItem);
    });
  }
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
}

  useEffect(() => {
    fetchRestaurants();
  }, []);

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
