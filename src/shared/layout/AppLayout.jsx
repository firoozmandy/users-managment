import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";

const { Header, Sider, Content } = Layout;

export default function AppLayout({ children }) {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider>
        <div
          style={{
            color: "white",
            padding: "16px",
            fontSize: "18px",
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
        <Header style={{ background: "#fff" }}>User Management</Header>

        <Content style={{ margin: "16px", padding: "24px" }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
