import { Button } from 'antd'

import { initialSystems } from '../mock/system'
import SystemPresenter from '../presenter/SystemPresenter'

import useCrud from '../../../hooks/useCrud'

import PageContainer from '../../../components/common/PageContainer'
import DataTable from '../../../components/common/DataTable'
import FormModal from '../../../components/common/FormModal'
import ActionButtons from '../../../components/common/ActionButtons'
import SystemForm from '../../../components/forms/SystemForm'
import useLocalStorage from '../../../hooks/useLocalStorage'


export default function SystemsPage() {
const [systems, setSystems] = useLocalStorage(
  'systems',
  initialSystems
)
  const presenter = SystemPresenter(systems, setSystems)

  const crud = useCrud(presenter)

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },

    {
      title: 'System Name',
      dataIndex: 'name',
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
        title="Systems Management"
        extra={
          <Button type="primary" onClick={crud.openAddModal}>
            Add System
          </Button>
        }
      >
        <DataTable dataSource={systems} columns={columns} />
      </PageContainer>

      <FormModal
        open={crud.isModalOpen}
        onCancel={crud.closeModal}
        title={crud.editingItem ? 'Edit System' : 'Add System'}
      >
        <SystemForm form={crud.form} onFinish={crud.handleSubmit} />
      </FormModal>
    </>
  )
}
