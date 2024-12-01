import React, { useState } from 'react';
import { Select, DatePicker, Typography, Row, Col, Button, message, Table } from 'antd';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import moment from 'moment';

const { Option } = Select;
const { RangePicker } = DatePicker;
const { Title } = Typography;

const columns = [
  {
    title: 'Transaction ID',
    dataIndex: 'transactionId',
    width: '15%',
  },
  {
    title: 'Date',
    dataIndex: 'date',
    width: '15%',
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
    width: '15%',
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
  },
  {
    key: '2',
    transactionId: 'TXN002',
    date: '2023-10-02',
    time: '11:00 AM',
    paymentDoneBy: 'Amali Wijesinghe',
    orderAppointmentId: 'ORD002',
    paymentDoneTo: 'Sunil Fernando',
    totalPayment: 'LKR 1500',
  },
  {
    key: '3',
    transactionId: 'TXN003',
    date: '2023-10-03',
    time: '12:00 PM',
    paymentDoneBy: 'Sajith Jayawardena',
    orderAppointmentId: 'ORD003',
    paymentDoneTo: 'Chathura Gamage',
    totalPayment: 'LKR 2000',
  },
  {
    key: '4',
    transactionId: 'TXN004',
    date: '2023-10-04',
    time: '01:00 PM',
    paymentDoneBy: 'Chamali Bandara',
    orderAppointmentId: 'ORD004',
    paymentDoneTo: 'Hirantha Abeysekera',
    totalPayment: 'LKR 2500',
  },
  {
    key: '5',
    transactionId: 'TXN005',
    date: '2023-10-05',
    time: '02:00 PM',
    paymentDoneBy: 'Tharindu Rathnayake',
    orderAppointmentId: 'ORD005',
    paymentDoneTo: 'Kumara Silva',
    totalPayment: 'LKR 3000',
  },
  {
    key: '6',
    transactionId: 'TXN006',
    date: '2023-10-06',
    time: '03:00 PM',
    paymentDoneBy: 'Dilini Senanayake',
    orderAppointmentId: 'ORD006',
    paymentDoneTo: 'Kumara Silva',
    totalPayment: 'LKR 3500',
  },
];

const ReportWidget = () => {
  const [userType, setUserType] = useState(null);
  const [user, setUser] = useState(null);
  const [dateRange, setDateRange] = useState([null, null]);

  // Filter payments based on user type, user, and date range
  const filteredPayments = initialData.filter((payment) => {
    const paymentDate = moment(payment.date);
    const isWithinDateRange = dateRange[0] && dateRange[1] ? paymentDate.isBetween(dateRange[0], dateRange[1], 'days', '[]') : true;
    const isUserTypeMatch = userType ? payment.paymentDoneTo === userType : true;
    const isUserMatch = user ? payment.paymentDoneBy === user : true;

    return isWithinDateRange && isUserTypeMatch && isUserMatch;
  });

  // Calculate total payment for filtered data
  const totalPayment = filteredPayments.reduce((sum, payment) => sum + parseFloat(payment.totalPayment.replace('LKR ', '')), 0);

  // Handle Date Range Selection
  const handleDateChange = (dates) => {
    setDateRange(dates);
    if (!dates) {
      message.error('Please select a date range');
    }
  };

  // Function to generate PDF report
  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Payment Report', 14, 22);
    
    // Add date range info
    doc.setFontSize(12);
    doc.text(`Date Range: ${dateRange[0] ? moment(dateRange[0]).format('YYYY-MM-DD') : ''} to ${dateRange[1] ? moment(dateRange[1]).format('YYYY-MM-DD') : ''}`, 14, 32);

    // Add table using autoTable
    doc.autoTable({
      head: [['Transaction ID', 'Date', 'Time', 'Payment Done By', 'Order/Appointment ID', 'Payment Done To', 'Total Payment']],
      body: filteredPayments.map(payment => [
        payment.transactionId,
        payment.date,
        payment.time,
        payment.paymentDoneBy,
        payment.orderAppointmentId,
        payment.paymentDoneTo,
        payment.totalPayment
      ]),
      startY: 40,
    });

    // Add total payment
    doc.setFontSize(14);
    doc.text(`Total Payment: LKR ${totalPayment}`, 14, doc.lastAutoTable.finalY + 10);

    // Save the PDF
    doc.save(`payment_report_${moment().format('YYYYMMDD')}.pdf`);
  };

  return (
    <div style={{ maxWidth: 800, margin: 'auto', padding: '20px',  backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <Title level={3} style={{ textAlign: 'center' }}>Payment Report Generator</Title>

      <Row gutter={16} style={{ marginBottom: '16px' }}>
        <Col span={12}>
          <Select
            placeholder="Select User Type"
            style={{ width: '100%' }}
            onChange={(value) => setUserType(value)}
          >
            <Option value="Kumara Silva">Kumara Silva</Option>
            <Option value="Sunil Fernando">Sunil Fernando</Option>
            <Option value="Chathura Gamage">Chathura Gamage</Option>
            <Option value="Hirantha Abeysekera">Hirantha Abeysekera</Option>
          </Select>
        </Col>
        <Col span={12}>
          <Select
            placeholder="Select User"
            style={{ width: '100%' }}
            onChange={(value) => setUser(value)}
            disabled={!userType} // Only enable user selection after userType is selected
          >
            <Option value="Nimal Perera">Nimal Perera</Option>
            <Option value="Amali Wijesinghe">Amali Wijesinghe</Option>
            <Option value="Sajith Jayawardena">Sajith Jayawardena</Option>
            <Option value="Chamali Bandara">Chamali Bandara</Option>
            <Option value="Tharindu Rathnayake">Tharindu Rathnayake</Option>
            <Option value="Dilini Senanayake">Dilini Senanayake</Option>
          </Select>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginBottom: '16px' }}>
        <Col span={24}>
          <RangePicker
            style={{ width: '100%' }}
            onChange={handleDateChange}
            disabled={!user} // Only enable date picker after user is selected
          />
        </Col>
      </Row>

      <Row gutter={16} style={{ marginBottom: '16px' }}>
        <Col span={24}>
          <Table columns={columns} dataSource={filteredPayments} pagination={false} />
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24} style={{ textAlign: 'center' }}>
          <Button type="primary" onClick={generatePDF} disabled={!dateRange[0] || !dateRange[1]}>
            Generate PDF Report
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default ReportWidget;
