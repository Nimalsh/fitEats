import React, { useState } from "react";
import { Table, Button, Input, Space, Popconfirm, Divider } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const AdminTable = ({title, columns, data }) => {
    const [searchText, setSearchText] = useState("");
    const [blockedRestaurants, setBlockedRestaurants] = useState([]);
    const [restaurants, setRestaurants] = useState(data);

    // Filter logic for search
    const filteredData = restaurants.filter((item) =>
        Object.values(item).some((value) =>
            String(value).toLowerCase().includes(searchText.toLowerCase())
        )
    );

    // Block and Unblock Logic
    const handleBlock = (id) => {
        const restaurantToBlock = restaurants.find((item) => item.id === id);
        setBlockedRestaurants([...blockedRestaurants, { ...restaurantToBlock, blockedDate: new Date().toLocaleDateString() }]);
        setRestaurants(restaurants.filter((item) => item.id !== id));
    };

    const handleUnblock = (id) => {
        const restaurantToUnblock = blockedRestaurants.find((item) => item.id === id);
        setRestaurants([...restaurants, { ...restaurantToUnblock, blockedDate: null }]);
        setBlockedRestaurants(blockedRestaurants.filter((item) => item.id !== id));
    };

    return (
        <Space direction="vertical" style={{ width: "100%" }}>
            <Input
                placeholder="Search ..."
                prefix={<SearchOutlined />}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                style={{ marginBottom: 16 }}
            />

            <Divider orientation="left">Active {title}</Divider>
            <Table
                dataSource={filteredData}
                columns={[
                    ...columns,
                    {
                        title: "Actions",
                        key: "actions",
                        render: (text, record) => (
                            <Popconfirm
                                title="Are you sure to block?"
                                onConfirm={() => handleBlock(record.id)}
                                okText="Yes"
                                cancelText="No"
                            >
                                <Button type="link" danger>
                                    Block
                                </Button>
                            </Popconfirm>
                        ),
                    },
                ]}
                rowKey="id"
                pagination={{ pageSize: 5 }}
            />

            <Divider orientation="left">Blocked {title}</Divider>
            <Table
                dataSource={blockedRestaurants}
                columns={[
                    ...columns,
                    {
                        title: "Blocked Date",
                        dataIndex: "blockedDate",
                        key: "blockedDate",
                    },
                    {
                        title: "Actions",
                        key: "actions",
                        render: (text, record) => (
                            <Popconfirm
                                title="Are you sure to unblock?"
                                onConfirm={() => handleUnblock(record.id)}
                                okText="Yes"
                                cancelText="No"
                            >
                                <Button type="link">Unblock</Button>
                            </Popconfirm>
                        ),
                    },
                ]}
                rowKey="id"
                pagination={{ pageSize: 5 }}
            />
        </Space>
    );
};

export default AdminTable;