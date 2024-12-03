/*import React, { useState } from 'react';
import { Select, DatePicker, Typography, Row, Col, Button, message } from 'antd';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import moment from 'moment';

const { Option } = Select;
const { RangePicker } = DatePicker;
const { Title } = Typography;

const ReportWidget = () => {
  const [userType, setUserType] = useState(null);
  const [user, setUser] = useState(null);
  const [dateRange, setDateRange] = useState([null, null]);
  const [payments, setPayments] = useState([
    {
      date: '2024-10-01',
      time: '10:30 AM',
      to: 'Jane Doe',
      type: 'Admin',
      amount: 200,
    },
    {
      date: '2024-10-15',
      time: '2:00 PM',
      to: 'John Smith',
      type: 'User',
      amount: 150,
    },
    {
      date: '2024-10-05',
      time: '9:00 AM',
      to: 'Alice Johnson',
      type: 'Admin',
      amount: 300,
    },
    // add more data
    {
      date: '2024-10-10',
      time: '11:00 AM',
      to: 'Jane Doe',
      type: 'Admin',
      amount: 250,
    },
    {
      date: '2024-10-20',
      time: '3:30 PM',
      to: 'John Smith',
      type: 'User',
    }
  ]); // Mocked payment data

  // Filter payments based on user type, user, and date range
  const filteredPayments = payments.filter((payment) => {
    const paymentDate = moment(payment.date);
    const isWithinDateRange = dateRange[0] && dateRange[1] ? paymentDate.isBetween(dateRange[0], dateRange[1], 'days', '[]') : true;
    const isUserTypeMatch = userType ? payment.type === userType : true;
    const isUserMatch = user ? payment.to === user : true;

    return isWithinDateRange && isUserTypeMatch && isUserMatch;
  });

  // Calculate total payment for filtered data
  const totalPayment = filteredPayments.reduce((sum, payment) => sum + payment.amount, 0);

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
      head: [['Date', 'Time', 'Payment To', 'Amount']],
      body: filteredPayments.map(payment => [
        payment.date,
        payment.time,
        payment.to,
        `$${payment.amount}`
      ]),
      startY: 40,
    });

    // Add total payment
    doc.setFontSize(14);
    doc.text(`Total Payment: $${totalPayment}`, 14, doc.lastAutoTable.finalY + 10);

    // Save the PDF
    doc.save(`payment_report_${moment().format('YYYYMMDD')}.pdf`);
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: '20px',  backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <Title level={3} style={{ textAlign: 'center' }}>Payment Report Generator</Title>

      <Row gutter={16} style={{ marginBottom: '16px' }}>
        <Col span={12}>
          <Select
            placeholder="Select User Type"
            style={{ width: '100%' }}
            onChange={(value) => setUserType(value)}
          >
            <Option value="Admin">Admin</Option>
            <Option value="User">User</Option>
          </Select>
        </Col>
        <Col span={12}>
          <Select
            placeholder="Select User"
            style={{ width: '100%' }}
            onChange={(value) => setUser(value)}
            disabled={!userType} // Only enable user selection after userType is selected
          >
            <Option value="Jane Doe">Jane Doe</Option>
            <Option value="John Smith">John Smith</Option>
            <Option value="Alice Johnson">Alice Johnson</Option>
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

export default ReportWidget;*/
