import { Modal } from 'antd'

export default function FormModal({ open, onCancel, title, children }) {
  return (
    <Modal
    
      open={open}
      onCancel={onCancel}
      footer={null}
      title={title}
      width={window.innerWidth < 768 ? '95%' : 700}
    >
      {children}
    </Modal>
  )
}
