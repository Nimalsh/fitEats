import React, { useState } from 'react'
import { Card, Col, Row } from 'antd';
import { Table, Button, Space, Divider, Popconfirm, Tag } from "antd";

const RequestTable = ({ title, pendingData, actionData }) => {
  const [pendingRequests, setPendingRequests] = useState(pendingData);
  const [actionTakenRequests, setActionTakenRequests] = useState(actionData);

  // Handle Action Taken
  const handleActionTaken = (id) => {
    const requestToMove = pendingRequests.find((item) => item.id === id);
    setActionTakenRequests([
      ...actionTakenRequests,
      { ...requestToMove, action: "Resolved", actionDate: new Date().toLocaleDateString() },
    ]);
    setPendingRequests(pendingRequests.filter((item) => item.id !== id));
  };

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Divider orientation="left">{title} - Pending</Divider>
      <Table
        dataSource={pendingRequests}
        columns={[
          { title: "Request ID", dataIndex: "id", key: "id" },
          { title: "User Type", dataIndex: "userType", key: "userType" },
          { title: "User Name", dataIndex: "userName", key: "userName" },
          { title: "Request Date", dataIndex: "requestDate", key: "requestDate" },
          {
            title: "Actions",
            key: "actions",
            render: (text, record) => (
              <Space>
                <Popconfirm
                  title="Are you sure you want to resolve this request?"
                  onConfirm={() => handleActionTaken(record.id)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button type="link" style={{ color: "green" }}>
                    Resolve
                  </Button>
                </Popconfirm>
                <Button type="link" style={{ color: "blue" }}>
                  View
                </Button>
              </Space>
            ),
          },
        ]}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />

      <Divider orientation="left">{title} - Action Taken</Divider>
      <Table
        dataSource={actionTakenRequests}
        columns={[
          { title: "Request ID", dataIndex: "id", key: "id" },
          { title: "User Type", dataIndex: "userType", key: "userType" },
          { title: "User Name", dataIndex: "userName", key: "userName" },
          { title: "Request Date", dataIndex: "requestDate", key: "requestDate" },
          { title: "Action", dataIndex: "action", key: "action" },
          {
            title: "View Details",
            key: "view",
            render: () => (
              <Button type="link" style={{ color: "blue" }}>
                View
              </Button>
            ),
          },
        ]}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />
    </Space>
  );
};

const pendingData = [
    {
      id: "REQ001",
      userType: "Admin",
      userName: "Chaminda Perera",
      requestDate: "2024-11-01",
    },
    {
      id: "REQ002",
      userType: "User",
      userName: "Nimali Fernando",
      requestDate: "2024-11-05",
    },
    {
      id: "REQ003",
      userType: "Admin",
      userName: "Ruwan Jayasena",
      requestDate: "2024-11-10",
    },
    {
      id: "REQ004",
      userType: "User",
      userName: "Sachini Dias",
      requestDate: "2024-11-15",
    },
  ];

  const actionData = [
    {
      id: "REQ000",
      userType: "User",
      userName: "Tharindu Silva",
      requestDate: "2024-10-20",
      action: "Resolved",
      actionDate: "2024-10-25",
    },
  ];


export const UserApprovals = () => {

  
  return (
    <Row gutter={[16, 16]}>
      <Col
        xs={20}
        md={24}
        xl={32}
      >

      <Card style={{ height: '100%' }}>

      <RequestTable
      title="Requests"
      pendingData={pendingData}
      actionData={actionData}
    />

        </Card>
        </Col>

      
      </Row>
  )
}
