import React, { useState } from "react";
import { Layout, Menu, theme } from "antd";
import {
  UserOutlined,
  PlusOutlined,
  DashboardOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "@/features/auth/authSlice";
// import { useSelector } from "react-redux";

const { Sider } = Layout;
// type userInfoData = {
//   auth: {
//     name: string;
//     role: string;
//   };
// };
type SidebarProps = {
  role: string;
};

const Sidebar = ({ role }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  // Get the selected keys based on current path
  const selectedKey = location.pathname.split("/")[1] || "dashboard";

  const menuItems = [
    {
      key: "dashboard",
      icon: <DashboardOutlined className="text-lg" />,
      label: <Link to="/dashboard">Dashboard</Link>,
    },
    ...(role === "Super Admin" || role === "Admin"
      ? [
          {
            key: "create-user",
            icon: <PlusOutlined className="text-lg" />,
            label: <Link to="/create-user">Create User</Link>,
          },
        ]
      : []),

    ...(role === "User"
      ? [
          {
            key: "create-post",
            icon: <PlusOutlined className="text-lg" />,
            label: <Link to="/create-post">Create Post</Link>,
          },
        ]
      : []),
  ];

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      trigger={null}
      width={250}
      style={{ background: colorBgContainer }}
      className="h-screen shadow-lg"
    >
      <div className="flex items-center justify-between p-4">
        <div className={`flex items-center ${collapsed ? "pl-2" : "pl-0"}`}>
          <h1 className={`text-xl font-bold ${collapsed ? "hidden" : "block"}`}>
            {selectedKey.toUpperCase()}
          </h1>
        </div>
        {React.createElement(
          collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
          {
            className: "trigger text-lg",
            onClick: () => setCollapsed(!collapsed),
          }
        )}
      </div>

      <Menu
        mode="inline"
        defaultSelectedKeys={[selectedKey]}
        selectedKeys={[selectedKey]}
        items={menuItems}
        className="px-2"
      />

      <div className="shadow-lg bottom-28 absolute w-full p-0">
        <button
          onClick={() => {
            dispatch(logout());
            navigate("/");
          }}
          className="text-white font-bold text-lg bg-purple-950 cursor-pointer w-full p-3"
        >
          Logout
        </button>
      </div>
      {/* User Profile Section */}
      <div
        className={`absolute bottom-0 w-full p-4 ${
          collapsed ? "px-2" : "px-4"
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="bg-blue-100 p-2 rounded-full">
            <UserOutlined className="text-blue-600 text-lg" />
          </div>
          {!collapsed && (
            <>
              <div className="flex flex-col">
                <h4 className="font-semibold m-0">Welcome</h4>
                <p className="text-gray-500 text-sm m-0">{role}</p>
              </div>
            </>
          )}
        </div>
      </div>
    </Sider>
  );
};

export default Sidebar;
