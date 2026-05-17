import { useState } from 'react'

import { Button } from 'antd'

import { initialPermissions } from '../mock/permissions'

import { initialSystems } from '../../systems/mock/system'

import { initialPages } from '../../pages/mock/pages'

import PermissionPresenter from '../presenter/PermissionPresenter'

import useCrud from '../../../hooks/useCrud'

import PageContainer from '../../../components/common/PageContainer'

import DataTable from '../../../components/common/DataTable'

import FormModal from '../../../components/common/FormModal'

import ActionButtons from '../../../components/common/ActionButtons'

import PermissionForm from '../../../components/forms/PermissionForm'
import useLocalStorage from '../../../hooks/useLocalStorage'

export default function PermissionsPage() {
  const [permissions, setPermissions] = useLocalStorage(
    'permissions',
    initialPermissions,
  )

  const [systems] = useState(initialSystems)

  const [pages] = useState(initialPages)

  const presenter = PermissionPresenter(permissions, setPermissions)

  const crud = useCrud(presenter)

  const getSystemName = (id) => {
    const system = systems.find((system) => system.id === id)

    return system ? system.name : '-'
  }

  const getPageName = (id) => {
    const page = pages.find((page) => page.id === id)

    return page ? page.name : '-'
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },

    {
      title: 'System',

      render: (_, record) => getSystemName(record.systemId),
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
        title="Permissions Management"
        extra={
          <Button type="primary" onClick={crud.openAddModal}>
            Add Permission
          </Button>
        }
      >
        <DataTable dataSource={permissions} columns={columns} />
      </PageContainer>

      <FormModal
        open={crud.isModalOpen}
        onCancel={crud.closeModal}
        title={crud.editingItem ? 'Edit Permission' : 'Add Permission'}
      >
        <PermissionForm
          form={crud.form}
          onFinish={crud.handleSubmit}
          systems={systems}
          pages={pages}
        />
      </FormModal>
    </>
  )
}
