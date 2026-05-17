import { useState } from 'react'

import { Select, Card, List, Tag, Empty, Space, Typography } from 'antd'

import useLocalStorage from '../../../hooks/useLocalStorage'

import { initialUsers } from '../../users/mock/users'

import { initialCompanies } from '../../companies/mock/companies'

import { initialRoles } from '../../roles/mock/roles'

import { initialPermissions } from '../../permissions/mock/permissions'

import { initialPages } from '../../pages/mock/pages'

const { Text } = Typography

export default function AccessViewerPage() {
  const [selectedUserId, setSelectedUserId] = useState(null)

  const [users] = useLocalStorage('users', initialUsers)

  const [companies] = useLocalStorage('companies', initialCompanies)

  const [roles] = useLocalStorage('roles', initialRoles)

  const [permissions] = useLocalStorage('permissions', initialPermissions)

  const [pages] = useLocalStorage('pages', initialPages)

  const selectedUser = users.find((user) => user.id === selectedUserId)

  const company = companies.find(
    (company) => company.id === selectedUser?.companyId,
  )

  const role = roles.find((role) => role.id === selectedUser?.roleId)

  const userPermissions = permissions.filter((permission) =>
    role?.permissions?.includes(permission.id),
  )

  return (
    <Card title="Access Viewer">
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Select
          placeholder="Select User"
          style={{ width: 300 }}
          value={selectedUserId}
          onChange={setSelectedUserId}
        >
          {users.map((user) => (
            <Select.Option key={user.id} value={user.id}>
              {user.name}
            </Select.Option>
          ))}
        </Select>

        {!selectedUser && <Empty description="Please select a user" />}

        {selectedUser && (
          <>
            <Card title="User Info">
              <Space direction="vertical">
                <Text>
                  <strong>Name:</strong> {selectedUser.name}
                </Text>

                <Text>
                  <strong>Email:</strong> {selectedUser.email}
                </Text>

                <Text>
                  <strong>Company:</strong> {company?.name}
                </Text>

                <Text>
                  <strong>Role:</strong> <Tag color="blue">{role?.name}</Tag>
                </Text>
              </Space>
            </Card>

            <Card title="Permissions">
              <List
                dataSource={userPermissions}
                locale={{
                  emptyText: 'No Permissions',
                }}
                renderItem={(permission) => {
                  const page = pages.find((p) => p.id === permission.pageId)

                  return (
                    <List.Item>
                      <Space>
                        <Tag color="purple">{page?.name}</Tag>

                        <Tag color="green">{permission.action}</Tag>
                      </Space>
                    </List.Item>
                  )
                }}
              />
            </Card>
          </>
        )}
      </Space>
    </Card>
  )
}
