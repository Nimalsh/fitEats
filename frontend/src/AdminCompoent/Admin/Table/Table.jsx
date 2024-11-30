import React, { useState } from "react";
import { Table, Button, Input, Space, Popconfirm, Divider } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const AdminTable = ({ title, columns, data, keyField = "id" }) => {
    const [searchText, setSearchText] = useState("");
    const [blockedData, setBlockedData] = useState([]);
    const [activeData, setActiveData] = useState(data);

    // Filter logic for search
    const filteredData = activeData.filter((item) =>
        Object.values(item).some((value) =>
            String(value).toLowerCase().includes(searchText.toLowerCase())
        )
    );

    // Block logic using keyField
    const handleBlock = (keyValue) => {
        const itemToBlock = activeData.find((item) => item[keyField] === keyValue);
        if (itemToBlock) {
            setBlockedData([
                ...blockedData,
                { ...itemToBlock, blockedDate: new Date().toLocaleDateString() },
            ]);
            setActiveData(activeData.filter((item) => item[keyField] !== keyValue));
        }
    };

    // Unblock logic using keyField
    const handleUnblock = (keyValue) => {
        const itemToUnblock = blockedData.find((item) => item[keyField] === keyValue);
        if (itemToUnblock) {
            setActiveData([
                ...activeData,
                { ...itemToUnblock, blockedDate: null },
            ]);
            setBlockedData(blockedData.filter((item) => item[keyField] !== keyValue));
        }
    };

    return (
        <Space direction="vertical" style={{ width: "100%" }}>
            <Input
                placeholder={`Search ${title}...`}
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
                                title={`Are you sure to block this ${title.toLowerCase()}?`}
                                onConfirm={() => handleBlock(record[keyField])}
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
                rowKey={keyField}
                pagination={{ pageSize: 5 }}
            />

            <Divider orientation="left">Blocked {title}</Divider>
            <Table
                dataSource={blockedData}
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
                                title={`Are you sure to unblock this ${title.toLowerCase()}?`}
                                onConfirm={() => handleUnblock(record[keyField])}
                                okText="Yes"
                                cancelText="No"
                            >
                                <Button type="link">Unblock</Button>
                            </Popconfirm>
                        ),
                    },
                ]}
                rowKey={keyField}
                pagination={{ pageSize: 5 }}
            />
        </Space>
    );
};

export default AdminTable;
