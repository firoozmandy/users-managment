import { useState } from 'react'
import { Table, Button, Modal, Form, Input, Space, Select, Card } from 'antd'

import { initialPages } from '../mock/pages'
import PagePresenter from '../presenter/PagePresenter'
import { initialSystems } from '../../systems/mock/system'

export default function PagesPage() {
  const [pages, setPages] = useState(initialPages)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingPage, setEditingPage] = useState(null)

  const [form] = Form.useForm()

  const presenter = PagePresenter(pages, setPages)

  const openAddModal = () => {
    setEditingPage(null)
    form.resetFields()
    setIsModalOpen(true)
  }

  const openEditModal = (page) => {
    setEditingPage(page)
    form.setFieldsValue(page)
    setIsModalOpen(true)
  }

  const handleSubmit = (values) => {
    if (editingPage) {
      presenter.updatePage({
        ...editingPage,
        ...values,
      })
    } else {
      presenter.addPage(values)
    }

    setIsModalOpen(false)
    form.resetFields()
  }

  const getSystemName = (systemId) => {
    const system = initialSystems.find((s) => s.id === systemId)
    return system ? system.name : 'Unknown'
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: 'Page Name',
      dataIndex: 'name',
    },
    {
      title: 'System',
      render: (_, record) => getSystemName(record.systemId),
    },
    {
      title: 'Actions',
      render: (_, record) => (
        <Space>
          <Button onClick={() => openEditModal(record)}>Edit</Button>

          <Button danger onClick={() => presenter.deletePage(record.id)}>
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
        Add Page
      </Button>
      <Card title="Companies">
        <Table
          dataSource={pages}
          columns={columns}
          rowKey="id"
          scroll={{ x: 800 }}
        />
      </Card>
      <Modal
        width={window.innerWidth < 768 ? '95%' : 700}
        title={editingPage ? 'Edit Page' : 'Add Page'}
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
                message: 'Enter page name',
              },
            ]}
          >
            <Input placeholder="Page Name" />
          </Form.Item>

          <Form.Item
            name="systemId"
            rules={[
              {
                required: true,
                message: 'Select system',
              },
            ]}
          >
            <Select placeholder="Select System">
              {initialSystems.map((system) => (
                <Select.Option key={system.id} value={system.id}>
                  {system.name}
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
