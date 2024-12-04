import {React,useEffect} from 'react'
import { Card, Col, Row,Table,Button } from 'antd';
import StatCard from '../Admin/Components/StatCard';
import AdminTable from '../Admin/Table/Table';
import { useDispatch, useSelector } from "react-redux";
import { getAllRequests,getDocumentByRequestId,updateRequestStatus} from "../../component/State/Nutritionist/Action";


export const Nutritionist = () => {
  const columns = [
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
    },
   
    {
      title: "Specializations",
      dataIndex: "specializations",
      key: "specializations",
    },
    {
      title: "Experience (Years)",
      dataIndex: "experience",
      key: "experience",
    },
    {
      title: "Qualifications",
      dataIndex: "qualifications",
      key: "qualifications",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <span
          style={{
            color: status === "PENDING" ? "orange" : status === "APPROVED" ? "green" : "red",
          }}
        >
          {status}
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button type="primary" onClick={() => handleViewClick(record)}>
          View
        </Button>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button type="primary"onClick={() => handleUpdateStatus(record, "confirmed")} >
         Confirm
        </Button>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button type="primary" onClick={() => handleUpdateStatus(record, "Declined")}>
          Decline
        </Button>
      ),
    },
  ];
   const dispatch = useDispatch();
  const nutritionistRequests = useSelector(
    (state) => state.nutritionist.nutritionistRequest // Assuming `nutritionist.requests` contains the fetched data
  );
  const loading = useSelector((state) => state.nutritionist.loading);
  const error = useSelector((state) => state.nutritionist.error);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      dispatch(getAllRequests (token));
      
    }
  }, [dispatch]);
  
  const handleViewClick = (requestId) => {
    const token = localStorage.getItem("jwt");
   
    if (token) {
      dispatch(getDocumentByRequestId(requestId.id, token)); // Dispatch the action to get the document
    }
  };
  const handleUpdateStatus = (requestId,newStatus) => {
    const Id=requestId.id;
    const token = localStorage.getItem("jwt");

    dispatch(updateRequestStatus({Id, newStatus, token }));
  };


  
  return (
    <Row gutter={[16, 16]}>
      <StatCard title={"Nutritionist Count"} value={"5"} change={"-1"} icon="UserOutlined"></StatCard>
      <StatCard title={"Chanelling Income for the Day"} value={"Rs.2500"} change={"-10"} icon="DollarOutlined"></StatCard>
      <StatCard title={"Number of Chanelling Appointments"} value={"15"} change={"-2"} icon="CalendarOutlined"></StatCard>
      <StatCard title={"Complain Count"} value={"3"} change={"-1"} icon="WarningOutlined"></StatCard>
      <Col
        xs={20}
        md={24}
        xl={32}
      >
        <Card style={{ height: '100%' }}>
        <Row gutter={[16, 16]}>
      <Col span={24}>
        <Card style={{ marginBottom: 16 }}>
          <h2>Nutritionist Requests</h2>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p style={{ color: "red" }}>Error: {error}</p>
          ) : (
            <Table
              dataSource={nutritionistRequests || []}
              columns={columns}
              rowKey={(record) => record.id} // Use a unique key field from your data
              pagination={{ pageSize: 5 }}
            />
          )}
        </Card>
      </Col>
    </Row>
        </Card>
      </Col>
    </Row>
  )
}
