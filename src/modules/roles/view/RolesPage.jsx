import { useState } from 'react'
import { initialRoles } from '../mock/roles'
import { initialPermissions } from '../../permissions/mock/permissions'
import useCrud from '../../../hooks/useCrud'
import ActionButtons from '../../../components/common/ActionButtons'
import PageContainer from '../../../components/common/PageContainer'
import { Button } from 'antd'
import DataTable from '../../../components/common/DataTable'
import FormModal from '../../../components/common/FormModal'
import RoleForm from '../../../components/forms/RoleForm'
import RolePresenter from '../presenter/RolPresenter'
import useLocalStorage from '../../../hooks/useLocalStorage'

export default function RolesPage() {
  const [roles, setRoles] = useLocalStorage('roles', initialRoles)
  const [permissions] = useState(initialPermissions)

  const presenter = RolePresenter(roles, setRoles)

  const crud = useCrud(presenter)

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

      render: (_, record) => record.permissionIds?.join(', '),
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
        title="Roles Management"
        extra={
          <Button type="primary" onClick={crud.openAddModal}>
            Add Role
          </Button>
        }
      >
        <DataTable dataSource={roles} columns={columns} />
      </PageContainer>

      <FormModal
        open={crud.isModalOpen}
        onCancel={crud.closeModal}
        title={crud.editingItem ? 'Edit Role' : 'Add Role'}
      >
        <RoleForm
          form={crud.form}
          onFinish={crud.handleSubmit}
          permissions={permissions}
        />
      </FormModal>
    </>
  )
}
