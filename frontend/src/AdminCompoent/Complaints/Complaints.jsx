import React from 'react'
import { Card, Col, Row } from 'antd';
import { Typography } from 'antd';
import AdminTable from '../Admin/Table/Table';

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
  },
  {
    id: '2',
    complainId: 1002,
    complainTitle: 'Incorrect order received',
    userId: 'U002',
    restaurantOrDriverId: 'R102',
    complainDate: '2024-11-21',
  },
  {
    id: '3',
    complainId: 1003,
    complainTitle: 'Food not delivered',
    userId: 'U003',
    restaurantOrDriverId: 'D300',
    complainDate: '2024-11-22',
  },
  {
    id: '4',
    complainId: 1004,
    complainTitle: 'Missing items in the order',
    userId: 'U004',
    restaurantOrDriverId: 'R105',
    complainDate: '2024-11-23',
  },
  {
    id: '5',
    complainId: 1005,
    complainTitle: 'Rude behavior of delivery driver',
    userId: 'U005',
    restaurantOrDriverId: 'D302',
    complainDate: '2024-11-24',
  },
];



const onChange = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};

export const Complaints = () => {
  return (
    <Row gutter={[16, 16]}>
     
      <Col
        xs={20}
        md={24}
        xl={32}
      >

      <Card style={{ height: '100%' }}>

      <AdminTable title={"Complain"} columns={columns} data={data} />

        </Card>
        </Col>

      
      </Row>
  )
}
