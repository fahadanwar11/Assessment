import { useGetAllUsersQuery } from "@/features/createUser/createUserSlice";
import { useGetMyPostsQuery } from "@/features/post/postSlice";
import { dashboardColumnType } from "@/utils/Interfaces";
import { Card, Table, Button } from "antd";
import { useEffect, useState } from "react";
import UserDetailsModal from "./UserDetailsModal";

interface AdminPanelProps {
  role: string;
}

function AdminPanel({ role }: AdminPanelProps) {
  const { data: tableData, isLoading } = useGetAllUsersQuery(role);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { data: postDetails } = useGetMyPostsQuery(selectedUserId, {
    skip: !selectedUserId,
  });

  useEffect(() => {
    if (postDetails) {
      console.log("User Post Details:", postDetails);
    }
  }, [postDetails]);

  const columns: dashboardColumnType[] = [
    {
      title: "Id",
      dataIndex: "_id",
      key: "id",
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      key: "role",
      dataIndex: "role",
      title: "Role",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => <span>{new Date(text).toLocaleString()}</span>,
    },
    {
      title: "Action",
      key: "action",
      dataIndex: "action",
      render: (_, record) =>
        record.role === "User" ? (
          <Button type="primary" danger onClick={() => openModal(record._id)}>
            View Details
          </Button>
        ) : null,
    },
  ];

  const openModal = (userId: string) => {
    setSelectedUserId(userId);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedUserId(null);
  };

  return (
    <>
      <Card title="All Users">
        <Table
          dataSource={tableData}
          columns={columns}
          loading={isLoading}
          rowKey="_id"
        />
      </Card>
      {selectedUserId && (
        <UserDetailsModal
          userId={selectedUserId}
          visible={isModalVisible}
          onClose={closeModal}
        />
      )}
    </>
  );
}

export default AdminPanel;
