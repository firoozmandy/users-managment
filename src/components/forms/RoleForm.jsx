import { Form, Input, Button, Select } from 'antd'

export default function RoleForm({ form, onFinish, permissions }) {
  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item
        name="name"
        label="Role Name"
        rules={[
          {
            required: true,
            message: 'Enter role name',
          },
        ]}
      >
        <Input placeholder="Role Name" />
      </Form.Item>

      <Form.Item name="permissionIds" label="Permissions">
        <Select mode="multiple" placeholder="Select Permissions">
          {permissions.map((permission) => (
            <Select.Option key={permission.id} value={permission.id}>
              {permission.name}
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
