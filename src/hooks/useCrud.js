import { useState } from 'react'
import { Form } from 'antd'

export default function useCrud(presenter) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [editingItem, setEditingItem] = useState(null)

  const [form] = Form.useForm()

  const openAddModal = () => {
    setEditingItem(null)
    form.resetFields()
    setIsModalOpen(true)
  }

  const openEditModal = (item) => {
    setEditingItem(item)

    form.setFieldsValue(item)

    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)

    form.resetFields()
  }

  const handleSubmit = (values) => {
    if (editingItem) {
      presenter.update({
        ...editingItem,
        ...values,
      })
    } else {
      presenter.add(values)
    }

    closeModal()
  }

  return {
    form,
    isModalOpen,
    editingItem,

    openAddModal,
    openEditModal,
    closeModal,

    handleSubmit,
  }
}
