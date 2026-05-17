import { Button, Space } from 'antd'

export default function ActionButtons({ onEdit, onDelete }) {
  return (
    <Space>
      <Button onClick={onEdit}>Edit</Button>

      <Button danger onClick={onDelete}>
        Delete
      </Button>
    </Space>
  )
}
