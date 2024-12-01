import React from 'react'
import { Card, Col, Row } from 'antd';
import { Typography } from 'antd';
import AdminTable from '../Admin/Table/Table';
import { Button, Modal } from 'antd';
import { useState } from 'react';

const { Title } = Typography;

const columns = [
  {
    title: 'Complain ID',
    dataIndex: 'complainId',
    key: 'complainId',
  },
  {
    title: 'Complain Title',
    dataIndex: 'complainTitle',
    key: 'complainTitle',
  },
  {
    title: 'User ID',
    dataIndex: 'userId',
    key: 'userId',
  },
  {
    title: 'Restaurant ID/Delivery Driver ID',
    dataIndex: 'restaurantOrDriverId',
    key: 'restaurantOrDriverId',
  },
  {
    title: 'Complain Date',
    dataIndex: 'complainDate',
    key: 'complainDate',
  },
];

const data = [
  {
    id: '1',
    complainId: 1001,
    complainTitle: 'Late delivery',
    userId: 'U001',
    restaurantOrDriverId: 'R100',
    complainDate: '2024-11-20',
    complainReason: 'The delivery was very late.',
  },
  {
    id: '2',
    complainId: 1002,
    complainTitle: 'Incorrect order received',
    userId: 'U002',
    restaurantOrDriverId: 'R102',
    complainDate: '2024-11-21',
    complainReason: 'I received the wrong order.',
  },
  {
    id: '3',
    complainId: 1003,
    complainTitle: 'Food not delivered',
    userId: 'U003',
    restaurantOrDriverId: 'D300',
    complainDate: '2024-11-22',
    complainReason: 'I did not receive the food that I ordered.',
  },
  {
    id: '4',
    complainId: 1004,
    complainTitle: 'Missing items in the order',
    userId: 'U004',
    restaurantOrDriverId: 'R105',
    complainDate: '2024-11-23',
    complainReason: 'Some items were missing in the order that I received.',
  },
  {
    id: '5',
    complainId: 1005,
    complainTitle: 'Rude behavior of delivery driver',
    userId: 'U005',
    restaurantOrDriverId: 'D302',
    complainDate: '2024-11-24',
    complainReason: 'The delivery driver was very rude and did not deliver the food on time.',
  },
];


export const Complaints = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  const showModal = (complaint) => {
    setSelectedComplaint(complaint);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    setSelectedComplaint(null);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedComplaint(null);
  };

  const columnsWithAction = [
    ...columns,
    {
      title: 'Review',
      key: 'action',
      render: (text, record) => (
        <Button type="primary" onClick={() => showModal(record)}>
          View
        </Button>
      ),
    },
  ];

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col xs={20} md={24} xl={32}>
          <Card style={{ height: '100%' }}>
            <AdminTable title={"Complain"} columns={columnsWithAction} data={data} />
          </Card>
        </Col>
      </Row>
      <Modal title="Complaint Details" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        {selectedComplaint && (
          <div>
            <p><strong>Complain ID:</strong> {selectedComplaint.complainId}</p>
            <p><strong>Complain Title:</strong> {selectedComplaint.complainTitle}</p>
            <p><strong>User ID:</strong> {selectedComplaint.userId}</p>
            <p><strong>Restaurant ID/Delivery Driver ID:</strong> {selectedComplaint.restaurantOrDriverId}</p>
            <p><strong>Complain Date:</strong> {selectedComplaint.complainDate}</p>
            <p><strong>Complain Details:</strong> {selectedComplaint.complainReason}</p>
          </div>
        )}
      </Modal>
    </>
  );
};