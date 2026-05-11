import { useState } from 'react'
import { Table, Button, Modal, Form, Select, Space, Card } from 'antd'

import { initialPermissions } from '../mock/permissions'
import { initialPages } from '../../pages/mock/pages'
import PermissionPresenter from '../presenter/PermissionPresenter'

export default function PermissionsPage() {
  const [permissions, setPermissions] = useState(initialPermissions)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingPermission, setEditingPermission] = useState(null)
  const [form] = Form.useForm()

  const presenter = PermissionPresenter(permissions, setPermissions)

  const openAddModal = () => {
    setEditingPermission(null)
    form.resetFields()
    setIsModalOpen(true)
  }

  const openEditModal = (permission) => {
    setEditingPermission(permission)
    form.setFieldsValue(permission)
    setIsModalOpen(true)
  }

  const handleSubmit = (values) => {
    if (editingPermission) {
      presenter.updatePermission({
        ...editingPermission,
        ...values,
      })
    } else {
      presenter.addPermission(values)
    }

    setIsModalOpen(false)
    form.resetFields()
  }

  const getPageName = (pageId) => {
    const page = initialPages.find((p) => p.id === pageId)
    return page ? page.name : 'Unknown'
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: 'Page',
      render: (_, record) => getPageName(record.pageId),
    },
    {
      title: 'Action',
      dataIndex: 'action',
    },
    {
      title: 'Actions',
      render: (_, record) => (
        <Space>
          <Button onClick={() => openEditModal(record)}>Edit</Button>

          <Button danger onClick={() => presenter.deletePermission(record.id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ]

  return (
    <>
      <Button
        type="primary"
        onClick={openAddModal}
        style={{ marginBottom: 16 }}
      >
        Add Permission
      </Button>
      <Card title="Companies">
        <Table
          dataSource={permissions}
          columns={columns}
          rowKey="id"
          scroll={{ x: 800 }}
        />
      </Card>
      <Modal
        width={window.innerWidth < 768 ? '95%' : 700}
        title={editingPermission ? 'Edit Permission' : 'Add Permission'}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item
            name="pageId"
            rules={[
              {
                required: true,
                message: 'Select page',
              },
            ]}
          >
            <Select placeholder="Select Page">
              {initialPages.map((page) => (
                <Select.Option key={page.id} value={page.id}>
                  {page.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="action"
            rules={[
              {
                required: true,
                message: 'Select action',
              },
            ]}
          >
            <Select placeholder="Select Action">
              <Select.Option value="view">View</Select.Option>
              <Select.Option value="create">Create</Select.Option>
              <Select.Option value="edit">Edit</Select.Option>
              <Select.Option value="delete">Delete</Select.Option>
            </Select>
          </Form.Item>

          <Button htmlType="submit" type="primary">
            Save
          </Button>
        </Form>
      </Modal>
    </>
  )
}
