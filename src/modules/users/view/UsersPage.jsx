import { useState } from 'react'
import { Table, Button, Modal, Form, Input, Select, Space } from 'antd'

import { initialUsers } from '../mock/users'
import { initialCompanies } from '../../companies/mock/companies'
import { initialRoles } from '../../roles/mock/roles'

import UserPresenter from '../presenter/UserPresenter'

export default function UsersPage() {
  const [users, setUsers] = useState(initialUsers)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingUser, setEditingUser] = useState(null)

  const [form] = Form.useForm()

  const presenter = UserPresenter(users, setUsers)

  const openAddModal = () => {
    setEditingUser(null)
    form.resetFields()
    setIsModalOpen(true)
  }

  const openEditModal = (user) => {
    setEditingUser(user)
    form.setFieldsValue(user)
    setIsModalOpen(true)
  }

  const handleSubmit = (values) => {
    if (editingUser) {
      presenter.updateUser({
        ...editingUser,
        ...values,
      })
    } else {
      presenter.addUser(values)
    }

    setIsModalOpen(false)
    form.resetFields()
  }

  const getCompanyName = (companyId) => {
    const company = initialCompanies.find((c) => c.id === companyId)
    return company ? company.name : 'Unknown'
  }

  const getRoleName = (roleId) => {
    const role = initialRoles.find((r) => r.id === roleId)
    return role ? role.name : 'Unknown'
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Company',
      render: (_, record) => getCompanyName(record.companyId),
    },
    {
      title: 'Role',
      render: (_, record) => getRoleName(record.roleId),
    },
    {
      title: 'Actions',
      render: (_, record) => (
        <Space>
          <Button onClick={() => openEditModal(record)}>Edit</Button>

          <Button danger onClick={() => presenter.deleteUser(record.id)}>
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
        Add User
      </Button>

      <Table dataSource={users} columns={columns} rowKey="id" />

      <Modal
        title={editingUser ? 'Edit User' : 'Add User'}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleSubmit}>
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: 'Enter name',
              },
            ]}
          >
            <Input placeholder="Name" />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: 'Enter email',
              },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="companyId"
            rules={[
              {
                required: true,
                message: 'Select company',
              },
            ]}
          >
            <Select placeholder="Select Company">
              {initialCompanies.map((company) => (
                <Select.Option key={company.id} value={company.id}>
                  {company.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="roleId"
            rules={[
              {
                required: true,
                message: 'Select role',
              },
            ]}
          >
            <Select placeholder="Select Role">
              {initialRoles.map((role) => (
                <Select.Option key={role.id} value={role.id}>
                  {role.name}
                </Select.Option>
              ))}
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
