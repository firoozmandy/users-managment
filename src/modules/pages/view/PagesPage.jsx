import { useState } from 'react'

import { Button } from 'antd'

import { initialPages } from '../mock/pages'

import { initialSystems } from '../../systems/mock/system'

import PagePresenter from '../presenter/PagePresenter'

import useCrud from '../../../hooks/useCrud'

import PageContainer from '../../../components/common/PageContainer'

import DataTable from '../../../components/common/DataTable'

import FormModal from '../../../components/common/FormModal'

import ActionButtons from '../../../components/common/ActionButtons'

import PageForm from '../../../components/forms/PageForm'
import useLocalStorage from '../../../hooks/useLocalStorage'

export default function PagesPage() {
  const [pages, setPages] = useLocalStorage('pages', initialPages)

  const [systems] = useState(initialSystems)

  const presenter = PagePresenter(pages, setPages)

  const crud = useCrud(presenter)

  const getSystemName = (id) => {
    const system = systems.find((system) => system.id === id)

    return system ? system.name : '-'
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
        title="Pages Management"
        extra={
          <Button type="primary" onClick={crud.openAddModal}>
            Add Page
          </Button>
        }
      >
        <DataTable dataSource={pages} columns={columns} />
      </PageContainer>

      <FormModal
        open={crud.isModalOpen}
        onCancel={crud.closeModal}
        title={crud.editingItem ? 'Edit Page' : 'Add Page'}
      >
        <PageForm
          form={crud.form}
          onFinish={crud.handleSubmit}
          systems={systems}
        />
      </FormModal>
    </>
  )
}
