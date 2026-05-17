import { Table } from 'antd'

export default function DataTable({ dataSource, columns, rowKey = 'id' }) {
  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      rowKey={rowKey}
      scroll={{ x: 800 }}
    />
  )
}
