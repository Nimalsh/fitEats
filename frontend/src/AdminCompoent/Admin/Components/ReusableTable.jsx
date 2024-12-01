import React from 'react';
import { Table } from 'antd';
import './ReusableTable.css'; // Custom styles for modern business look

/**
 * ReusableTable Component
 * @param {Array} columns - Column configuration for the table.
 * @param {Array} data - Data to populate the table.
 * @param {Object} rowSelection - Row selection options (optional).
 * @param {Boolean} pagination - Whether to enable pagination.
 * @param {Object} style - Additional styling for the table (optional).
 */

const ReusableTable = ({ columns, data, rowSelection = null, pagination = true, style = {} }) => {
  return (
    <Table
      columns={columns}
      dataSource={data}
      rowSelection={rowSelection}
      pagination={pagination}
      bordered
      sticky
      className="business-table"
      style={{ borderRadius: '8px', ...style }}
    />
  );
};

export default ReusableTable;
