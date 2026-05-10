import { useState } from 'react'
import { Select, Card, List } from 'antd'

import { initialUsers } from '../mock/users'
import { initialCompanies } from '../../companies/mock/companies'
import { initialRoles } from '../../roles/mock/roles'
import { initialPermissions } from '../../permissions/mock/permissions'
import { initialPages } from '../../pages/mock/pages'

export default function AccessViewerPage() {
  const [selectedUserId, setSelectedUserId] = useState(null)

  const selectedUser = initialUsers.find((user) => user.id === selectedUserId)

  if (!selectedUser) {
    return (
      <>
        <h2>Access Viewer</h2>

        <Select
          style={{ width: 300 }}
          placeholder="Select User"
          onChange={setSelectedUserId}
        >
          {initialUsers.map((user) => (
            <Select.Option key={user.id} value={user.id}>
              {user.name}
            </Select.Option>
          ))}
        </Select>
      </>
    )
  }

  const company = initialCompanies.find((c) => c.id === selectedUser.companyId)

  const role = initialRoles.find((r) => r.id === selectedUser.roleId)

  const permissions = initialPermissions.filter((permission) =>
    role.permissions.includes(permission.id)
  )

  return (
    <>
      <h2>Access Viewer</h2>

      <Select
        style={{ width: 300, marginBottom: 20 }}
        value={selectedUserId}
        onChange={setSelectedUserId}
      >
        {initialUsers.map((user) => (
          <Select.Option key={user.id} value={user.id}>
            {user.name}
          </Select.Option>
        ))}
      </Select>

      <Card title="User Info">
        <p>Name: {selectedUser.name}</p>
        <p>Email: {selectedUser.email}</p>
        <p>Company: {company?.name}</p>
        <p>Role: {role?.name}</p>
      </Card>

      <Card title="Permissions" style={{ marginTop: 20 }}>
        <List
          dataSource={permissions}
          renderItem={(permission) => {
            const page = initialPages.find((p) => p.id === permission.pageId)

            return (
              <List.Item>
                {page?.name} — {permission.action}
              </List.Item>
            )
          }}
        />
      </Card>
    </>
  )
}
