import { Form, Input, Button } from 'antd'

export default function SystemForm({ form, onFinish }) {
  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item
        name="name"
        rules={[
          {
            required: true,
            message: 'Enter system name',
          },
        ]}
      >
        <Input placeholder="System Name" />
      </Form.Item>

      <Button htmlType="submit" type="primary">
        Save
      </Button>
    </Form>
  )
}
