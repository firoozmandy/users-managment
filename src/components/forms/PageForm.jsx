import { Form, Input, Button, Select } from 'antd'

export default function PageForm({ form, onFinish, systems }) {
  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item
        name="name"
        label="Page Name"
        rules={[
          {
            required: true,
            message: 'Please enter page name',
          },
        ]}
      >
        <Input placeholder="Page Name" />
      </Form.Item>

      <Form.Item name="systemId" label="System">
        <Select placeholder="Select System">
          {systems.map((system) => (
            <Select.Option key={system.id} value={system.id}>
              {system.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Button type="primary" htmlType="submit">
        Save
      </Button>
    </Form>
  )
}
