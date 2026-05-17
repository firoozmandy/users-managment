import { Form, Input, Button, Select } from 'antd'

export default function UserForm({ form, onFinish, companies, roles }) {
  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item
        name="name"
        label="Name"
        rules={[
          {
            required: true,
            message: 'Please enter name',
          },
        ]}
      >
        <Input placeholder="Name" />
      </Form.Item>

      <Form.Item
        name="email"
        label="Email"
        rules={[
          {
            required: true,
            message: 'Please enter email',
          },
        ]}
      >
        <Input placeholder="Email" />
      </Form.Item>

      <Form.Item name="companyId" label="Company">
        <Select placeholder="Select Company">
          {companies.map((company) => (
            <Select.Option key={company.id} value={company.id}>
              {company.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item name="roleId" label="Role">
        <Select placeholder="Select Role">
          {roles.map((role) => (
            <Select.Option key={role.id} value={role.id}>
              {role.name}
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
