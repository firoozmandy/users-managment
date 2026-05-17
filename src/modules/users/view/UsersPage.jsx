import { useState } from 'react'

import { Button } from 'antd'

import { initialUsers } from '../mock/users'

import { initialCompanies } from '../../companies/mock/companies'

import { initialRoles } from '../../roles/mock/roles'

import UserPresenter from '../presenter/UserPresenter'

import useCrud from '../../../hooks/useCrud'

import PageContainer from '../../../components/common/PageContainer'

import DataTable from '../../../components/common/DataTable'

import FormModal from '../../../components/common/FormModal'

import ActionButtons from '../../../components/common/ActionButtons'

import UserForm from '../../../components/forms/UserForm'
import useLocalStorage from '../../../hooks/useLocalStorage'

export default function UsersPage() {
  const [users, setUsers] = useLocalStorage('users', initialUsers)

  const [companies] = useState(initialCompanies)

  const [roles] = useState(initialRoles)

  const presenter = UserPresenter(users, setUsers)

  const crud = useCrud(presenter)

  const getCompanyName = (id) => {
    const company = companies.find((company) => company.id === id)

    return company ? company.name : '-'
  }

  const getRoleName = (id) => {
    const role = roles.find((role) => role.id === id)

    return role ? role.name : '-'
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
        <ActionButtons
          onEdit={() => crud.openEditModal(record)}
          onDelete={() => presenter.delete(record.id)}
        />
      ),
    },
  ]

  return (
    <>
      <PageContainer
        title="Users Management"
        extra={
          <Button type="primary" onClick={crud.openAddModal}>
            Add User
          </Button>
        }
      >
        <DataTable dataSource={users} columns={columns} />
      </PageContainer>

      <FormModal
        open={crud.isModalOpen}
        onCancel={crud.closeModal}
        title={crud.editingItem ? 'Edit User' : 'Add User'}
      >
        <UserForm
          form={crud.form}
          onFinish={crud.handleSubmit}
          companies={companies}
          roles={roles}
        />
      </FormModal>
    </>
  )
}
