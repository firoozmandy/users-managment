import { useState } from 'react'
import { initialSystems } from '../mock/system'
import { Button, Card, Form, Input, Modal, Space, Table } from 'antd'
import SystemPresenter from '../presenter/SystemPresenter'

export default function SystemsPage() {
  const [systems, setSystems] = useState(initialSystems)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingSystem, setEditingSystem] = useState(null)

  const [form] = Form.useForm()

  const presenter = SystemPresenter(systems, setSystems)

  const openAddModal = () => {
    setEditingSystem(null)
    form.resetFields()
    setIsModalOpen(true)
  }

  const openEditModal = (system) => {
    setEditingSystem(system)
    form.setFieldsValue(system)
    setIsModalOpen(true)
  }

  const handleSubmit = (values) => {
    if (editingSystem) {
      presenter.updateSystem({
        ...editingSystem,
        ...values,
      })
    } else {
      presenter.addSystem(values)
    }

    setIsModalOpen(false)
    form.resetFields()
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      render: (id) => id,
    },
    {
      title: 'System Name',
      dataIndex: 'name',
    },
    {
      title: 'Actions',
      render: (_, record) => (
        <Space>
          <Button onClick={() => openEditModal(record)}>Edit</Button>

          <Button danger onClick={() => presenter.deleteSystem(record.id)}>
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
        Add System
      </Button>
      <Card title="Companies">
        <Table
          dataSource={systems}
          columns={columns}
          rowKey="id"
          scroll={{ x: 800 }}
        />
      </Card>
      <Modal
        width={window.innerWidth < 768 ? '95%' : 700}
        title={editingSystem ? 'Edit System' : 'Add System'}
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
      </Modal>
    </>
  )
}
