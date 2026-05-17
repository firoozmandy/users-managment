import { Card } from 'antd'

export default function PageContainer({ title, extra, children }) {
  return (
    <div style={{ padding: 4 }}>
      <Card title={title} extra={extra}>
        {children}
      </Card>
    </div>
  )
}
