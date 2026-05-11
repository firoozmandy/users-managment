import { Avatar, Layout, Menu, Space } from 'antd'
import Text from 'antd/es/typography/Text'
import Title from 'antd/es/typography/Title'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const { Header, Sider, Content } = Layout

export default function AppLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false)
  return (
    <Layout style={{ minHeight: '100vh', background: '#f5f7fa' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <div
          style={{
            color: 'white',
            padding: '16px',
            fontSize: '18px',
          }}
        >
          Admin Panel
        </div>

        <Menu theme="dark" mode="inline">
          <Menu.Item key="1">
            <Link to="/users">Users</Link>
          </Menu.Item>

          <Menu.Item key="2">
            <Link to="/roles">Roles</Link>
          </Menu.Item>

          <Menu.Item key="3">
            <Link to="/companies">Companies</Link>
          </Menu.Item>

          <Menu.Item key="4">
            <Link to="/systems">Systems</Link>
          </Menu.Item>

          <Menu.Item key="5">
            <Link to="/pages">Pages</Link>
          </Menu.Item>

          <Menu.Item key="6">
            <Link to="/permissions">Permissions</Link>
          </Menu.Item>
          <Menu.Item key="7">
            <Link to="/access-viewer">AccessViewer</Link>
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout>
        <Header
          style={{
            background: '#fff',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 24px',
          }}
        >
          <Title level={4} style={{ margin: 0 }}>
            User Management Dashboard
          </Title>

          <Space>
            <Text>Admin</Text>
            <Avatar>A</Avatar>
          </Space>
        </Header>
        <Content style={{ margin: '16px', padding: '24px' }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  )
}
