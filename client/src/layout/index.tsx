import Sidebar from "@/components/Sidebar";
import { Content, Header } from "antd/es/layout/layout";
import { Layout } from "antd";

import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { userInfoData } from "@/utils/Interfaces";

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  const { role } = useSelector((state: userInfoData) => state.auth);

  return role ? (
    <Layout className="min-h-screen">
      <Sidebar role={role} />
      <Layout>
        <Header className="p-0 shadow-sm">
          {/* Add header content here if needed */}
        </Header>
        <Content className="m-4 p-6 min-h-[280px] rounded-lg">
          {children}
        </Content>
      </Layout>
    </Layout>
  ) : (
    <Navigate to={"/"} />
  );
};

export default PageLayout;
