import { useState } from 'react'
import { Table, Button, Modal, Form, Input, Space, Card, Row } from 'antd'

import { initialCompanies } from '../mock/companies'
import CompanyPresenter from '../presenter/CompanyPresenter'
import Title from 'antd/es/skeleton/Title'

export default function CompaniesPage() {
  const [companies, setCompanies] = useState(initialCompanies)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCompany, setEditingCompany] = useState(null)

  const [form] = Form.useForm()

  const presenter = new CompanyPresenter(companies, setCompanies)

  const openAddModal = () => {
    setEditingCompany(null)
    form.resetFields()
    setIsModalOpen(true)
  }

  const openEditModal = (company) => {
    setEditingCompany(company)
    form.setFieldsValue(company)
    setIsModalOpen(true)
  }

  const handleSubmit = (values) => {
    if (editingCompany) {
      presenter.updateCompany({
        ...editingCompany,
        ...values,
      })
    } else {
      presenter.addCompany(values)
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
      title: 'Company Name',
      dataIndex: 'name',
    },
    {
      title: 'Actions',
      render: (_, record) => (
        <Space>
          <Button onClick={() => openEditModal(record)}>Edit</Button>

          <Button danger onClick={() => presenter.deleteCompany(record.id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ]

  return (
    <>
      <Row justify="space-between">
        <Title level={3}>Companies</Title>
        <Button
          type="primary"
          onClick={openAddModal}
          style={{ marginBottom: 16 }}
        >
          Add Company
        </Button>
      </Row>

      <Card title="Companies">
        <Table
          dataSource={companies}
          columns={columns}
          rowKey="id"
          scroll={{ x: 800 }}
        />
      </Card>
      <Modal
        width={window.innerWidth < 768 ? '95%' : 700}
        title={editingCompany ? 'Edit Company' : 'Add Company'}
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
                message: 'Enter company name',
              },
            ]}
          >
            <Input placeholder="Company Name" />
          </Form.Item>

          <Button htmlType="submit" type="primary">
            Save
          </Button>
        </Form>
      </Modal>
    </>
  )
}
