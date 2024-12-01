import React, { useState } from 'react';
import { Card, Col, Row, DatePicker, Button, Select } from 'antd';
import { Typography, Table } from 'antd';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import ReportWidget from '../Admin/Components/UserWidget';

const { Title } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

const columns = (handleBlockUser) => [
  {
    title: 'Transaction ID',
    dataIndex: 'transactionId',
    width: '10%',
  },
  {
    title: 'Date',
    dataIndex: 'date',
    width: '10%',
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
    width: '10%',
  },
  {
    title: 'User Type',
    dataIndex: 'userType',
    width: '10%',
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
    userType: 'Customer',
  },
  {
    key: '2',
    transactionId: 'TXN002',
    date: '2023-10-02',
    time: '11:00 AM',
    paymentDoneBy: 'Sandaru Silva',
    orderAppointmentId: 'ORD002',
    paymentDoneTo: 'Nuwan Perera',
    totalPayment: 'LKR 2000',
    userType: 'Admin',
  },
  {
    key: '3',
    transactionId: 'TXN003',
    date: '2023-10-03',
    time: '12:00 PM',
    paymentDoneBy: 'Kamal Chathuranga',
    orderAppointmentId: 'ORD003',
    paymentDoneTo: 'Ruwan Silva',
    totalPayment: 'LKR 1500',
    userType: 'Customer',
  },
  {
    key: '4',
    transactionId: 'TXN004',
    date: '2023-10-04',
    time: '01:00 PM',
    paymentDoneBy: 'Saman Kumara',
    orderAppointmentId: 'ORD004',
    paymentDoneTo: 'Kumara Silva',
    totalPayment: 'LKR 2500',
    userType: 'Customer',
  },
  {
    key: '5',
    transactionId: 'TXN005',
    date: '2023-10-05',
    time: '02:00 PM',
    paymentDoneBy: 'Nuwan Perera',
    orderAppointmentId: 'ORD005',
    paymentDoneTo: 'Sandaru Silva',
    totalPayment: 'LKR 3000',
    userType: 'Customer',
  },
  {
    key: '6',
    transactionId: 'TXN006',
    date: '2023-10-06',
    time: '03:00 PM',
    paymentDoneBy: 'Ruwan Silva',
    orderAppointmentId: 'ORD006',
    paymentDoneTo: 'Kamal Chathuranga',
    totalPayment: 'LKR 3500',
    userType: 'Admin',
  },
];

const onChange = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};

export const Transactions = () => {
  const [usersData, setUsersData] = useState(initialData);
  const [selectedUserType, setSelectedUserType] = useState(null);
  const [selectedUserName, setSelectedUserName] = useState(null);
  const [dateRange, setDateRange] = useState(null);

  const handleBlockUser = (key) => {
    const updatedUsers = usersData.map((user) =>
      user.key === key ? { ...user, blocked: !user.blocked } : user
    );
    setUsersData(updatedUsers);
  };

  const handleDownloadPDF = () => {
    const filteredData = usersData.filter((user) => {
      const userDate = new Date(user.date);
      const [startDate, endDate] = dateRange || [];
      return (
        (!selectedUserType || user.userType === selectedUserType) &&
        (!selectedUserName || user.paymentDoneBy === selectedUserName) &&
        (!dateRange || (userDate >= startDate && userDate <= endDate))
      );
    });

    const doc = new jsPDF();
    doc.autoTable({
      head: [['Transaction ID', 'Date', 'Time', 'Payment Done By', 'Order/Appointment ID', 'Payment Done To', 'Total Payment', 'User Type']],
      body: filteredData.map((user) => [
        user.transactionId,
        user.date,
        user.time,
        user.paymentDoneBy,
        user.orderAppointmentId,
        user.paymentDoneTo,
        user.totalPayment,
        user.userType,
      ]),
    });
    doc.save('transactions.pdf');
  };

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
        <Select
          placeholder="Select User Type"
          style={{ width: 200, marginRight: 16 }}
          onChange={(value) => setSelectedUserType(value)}
        >
          <Option value="Customer">Customer</Option>
          <Option value="Driver">Driver</Option>
          <Option value="Admin">Admin</Option>
          <Option value="Nutritionist">Nutritionist</Option>
          {/* Add more user types as needed */}
        </Select>
        <Select
          placeholder="Select User Name"
          style={{ width: 200, marginRight: 16 }}
          onChange={(value) => setSelectedUserName(value)}
        >
          {usersData.map((user) => (
            <Option key={user.key} value={user.paymentDoneBy}>
              {user.paymentDoneBy}
            </Option>
          ))}
        </Select>
        <RangePicker onChange={(dates) => setDateRange(dates)} style={{ marginRight: 16 }} />
        <Button type="primary" onClick={handleDownloadPDF}>
          Download PDF
        </Button>
      </Col>
      <Col xs={20} md={24} xl={32}>
        {renderTable(usersData, 'Transaction History')}
      </Col>
      <Col xs={20} md={24} xl={32}>
        {/* <ReportWidget /> */}
      </Col>
    </Row>
  );
};
