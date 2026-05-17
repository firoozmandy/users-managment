import { Form, Button, Select } from 'antd'

export default function PermissionForm({ form, onFinish, systems, pages }) {
  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item
        name="systemId"
        label="System"
        rules={[
          {
            required: true,
            message: 'Please select system',
          },
        ]}
      >
        <Select placeholder="Select System">
          {systems.map((system) => (
            <Select.Option key={system.id} value={system.id}>
              {system.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="pageId"
        label="Page"
        rules={[
          {
            required: true,
            message: 'Please select page',
          },
        ]}
      >
        <Select placeholder="Select Page">
          {pages.map((page) => (
            <Select.Option key={page.id} value={page.id}>
              {page.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="action"
        label="Action"
        rules={[
          {
            required: true,
            message: 'Please select action',
          },
        ]}
      >
        <Select
          placeholder="Select Action"
          options={[
            {
              value: 'create',
              label: 'Create',
            },

            {
              value: 'read',
              label: 'Read',
            },

            {
              value: 'update',
              label: 'Update',
            },

            {
              value: 'delete',
              label: 'Delete',
            },
          ]}
        />
      </Form.Item>

      <Button type="primary" htmlType="submit">
        Save
      </Button>
    </Form>
  )
}
