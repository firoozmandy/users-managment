import { useState, useEffect } from 'react'
import {
  Avatar,
  Layout,
  Menu,
  Space,
  Typography,
  Drawer,
  Button,
  theme,
} from 'antd'

import { MenuOutlined, UserOutlined } from '@ant-design/icons'

import { Link, useLocation } from 'react-router-dom'

const { Header, Content, Footer } = Layout
const { Title, Text } = Typography

const AppLayout = ({ children }) => {
  const location = useLocation()

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  const [drawerOpen, setDrawerOpen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()

  const currentYear = new Date().getFullYear()

  const menuItems = [
    {
      key: '/users',
      label: <Link to="/users">Users</Link>,
    },
    {
      key: '/roles',
      label: <Link to="/roles">Roles</Link>,
    },
    {
      key: '/companies',
      label: <Link to="/companies">Companies</Link>,
    },
    {
      key: '/systems',
      label: <Link to="/systems">Systems</Link>,
    },
    {
      key: '/pages',
      label: <Link to="/pages">Pages</Link>,
    },
    {
      key: '/permissions',
      label: <Link to="/permissions">Permissions</Link>,
    },
    {
      key: '/access-viewer',
      label: <Link to="/access-viewer">Access Viewer</Link>,
    },
  ]

  return (
    <Layout
      style={{
        minHeight: '100vh',
        background: '#f5f7fa',
      }}
    >
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: isMobile ? '0 16px' : '0 24px',
        }}
      >
        {/* Left Side */}
        <Space size={16}>
          {isMobile && (
            <Button
              type="text"
              icon={
                <MenuOutlined
                  style={{
                    color: 'white',
                    fontSize: 20,
                  }}
                />
              }
              onClick={() => setDrawerOpen(true)}
            />
          )}

          <Title
            level={4}
            style={{
              color: 'white',
              margin: 0,
              fontSize: isMobile ? '16px' : '20px',
            }}
          >
            RBAC Dashboard
          </Title>
        </Space>

        {/* Desktop Menu */}
        {!isMobile && (
          <Menu
            theme="dark"
            mode="horizontal"
            selectedKeys={[location.pathname]}
            items={menuItems}
            style={{
              flex: 1,
              justifyContent: 'center',
              minWidth: 0,
              borderBottom: 'none',
            }}
          />
        )}

        {/* Right Side */}
        <Space size={12}>
          {!isMobile && (
            <Text
              style={{
                color: 'white',
              }}
            >
              Admin
            </Text>
          )}

          <Avatar icon={<UserOutlined />} />
        </Space>
      </Header>

      {/* Mobile Drawer */}
      <Drawer
        title="Navigation"
        placement="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Menu
          mode="vertical"
          selectedKeys={[location.pathname]}
          items={menuItems}
        />
      </Drawer>

      <Content
        style={{
          padding: isMobile ? '16px' : '24px 48px',
        }}
      >
        <div
          style={{
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            padding: isMobile ? 16 : 24,
            minHeight: '80vh',
          }}
        >
          {children}
        </div>
      </Content>

      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        RBAC Management System ©{currentYear}
      </Footer>
    </Layout>
  )
}

export default AppLayout
