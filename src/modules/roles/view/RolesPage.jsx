import { useState } from 'react'
import { Table, Button, Modal, Form, Input, Checkbox, Space, Card } from 'antd'
import { initialRoles } from '../mock/roles'
import RolePresenter from '../presenter/RolPresenter'
import { initialPages } from '../../pages/mock/pages'
import { initialPermissions } from '../../permissions/mock/permissions'

export default function RolesPage() {
  const [roles, setRoles] = useState(initialRoles)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingRole, setEditingRole] = useState(null)

  const [form] = Form.useForm()

  const presenter = RolePresenter(roles, setRoles)

  const openAddModal = () => {
    setEditingRole(null)
    form.resetFields()
    setIsModalOpen(true)
  }

  const openEditModal = (role) => {
    setEditingRole(role)
    form.setFieldsValue(role)
    setIsModalOpen(true)
  }

  const handleSubmit = (values) => {
    if (editingRole) {
      presenter.updateRole({
        ...editingRole,
        ...values,
      })
    } else {
      presenter.addRole(values)
    }

    setIsModalOpen(false)
    form.resetFields()
  }

  const getPermissionLabel = (permission) => {
    const page = initialPages.find((p) => p.id === permission.pageId)

    return ` ${page?.name} - ${permission.action}`
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: 'Role Name',
      dataIndex: 'name',
    },
    {
      title: 'Permissions',
      render: (_, record) => record.permissions.length,
    },
    {
      title: 'Actions',
      render: (_, record) => (
        <Space>
          <Button onClick={() => openEditModal(record)}>Edit</Button>

          <Button danger onClick={() => presenter.deleteRole(record.id)}>
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
        Add Role
      </Button>
      <Card title="Companies">
        <Table
          dataSource={roles}
          columns={columns}
          rowKey="id"
          scroll={{ x: 800 }}
        />
      </Card>
      <Modal
        width={window.innerWidth < 768 ? '95%' : 700}
        title={editingRole ? 'Edit Role' : 'Add Role'}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        
      >
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: 'Enter role name',
              },
            ]}
          >
            <Input placeholder="Role Name" />
          </Form.Item>

          <Form.Item
            name="permissions"
            rules={[
              {
                required: true,
                message: 'Select at least one permission',
              },
            ]}
          >
            <Checkbox.Group>
              <Space direction="vertical">
                {initialPermissions.map((permission) => (
                  <Checkbox key={permission.id} value={permission.id}>
                    {getPermissionLabel(permission)}
                  </Checkbox>
                ))}
              </Space>
            </Checkbox.Group>
          </Form.Item>

          <Button htmlType="submit" type="primary">
            Save
          </Button>
        </Form>
      </Modal>
    </>
  )
}
