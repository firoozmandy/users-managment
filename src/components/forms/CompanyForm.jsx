import { Form, Input, Button } from 'antd'

export default function CompanyForm({ form, onFinish }) {
  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item
        name="name"
        label="Company Name"
        rules={[
          {
            required: true,
            message: 'Please enter company name',
          },
        ]}
      >
        <Input placeholder="Company Name" />
      </Form.Item>

      <Button type="primary" htmlType="submit">
        Save
      </Button>
    </Form>
  )
}
