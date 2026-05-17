import { Button } from 'antd'

import CompanyPresenter from '../presenter/CompanyPresenter'

import useCrud from '../../../hooks/useCrud'

import PageContainer from '../../../components/common/PageContainer'

import DataTable from '../../../components/common/DataTable'

import FormModal from '../../../components/common/FormModal'

import ActionButtons from '../../../components/common/ActionButtons'

import CompanyForm from '../../../components/forms/CompanyForm'
import { initialCompanies } from '../mock/companies'
import useLocalStorage from '../../../hooks/useLocalStorage'

export default function CompaniesPage() {
  const [companies, setCompanies] = useLocalStorage(
    'companies',
    initialCompanies,
  )

  const presenter = CompanyPresenter(companies, setCompanies)

  const crud = useCrud(presenter)

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },

    {
      title: 'Company Name',
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
        title="Companies Management"
        extra={
          <Button type="primary" onClick={crud.openAddModal}>
            Add Company
          </Button>
        }
      >
        <DataTable dataSource={companies} columns={columns} />
      </PageContainer>

      <FormModal
        open={crud.isModalOpen}
        onCancel={crud.closeModal}
        title={crud.editingItem ? 'Edit Company' : 'Add Company'}
      >
        <CompanyForm form={crud.form} onFinish={crud.handleSubmit} />
      </FormModal>
    </>
  )
}
