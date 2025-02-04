import { Card, Button, Row, Col, Modal } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import {
  useDeletePostMutation,
  useGetMyPostsQuery,
} from "@/features/post/postSlice";
import { Post, PostDeleteProps } from "@/utils/Interfaces";

interface UserDetailsModalProps {
  userId: string;
  visible: boolean;
  onClose: () => void;
}

function UserDetailsModal({ userId, visible, onClose }: UserDetailsModalProps) {
  const { data: postsData, isLoading } = useGetMyPostsQuery(userId, {
    skip: !userId,
  });
  const [onDelete] = useDeletePostMutation();

  const handleDelete: PostDeleteProps = async (id) => {
    try {
      await onDelete(id);
    } catch (error) {
      console.error("Post deletion failed:", error);
    }
  };

  return (
    <Modal
      title="User Posts"
      open={visible}
      onCancel={onClose}
      footer={null}
      width={1000}
    >
      <Card>
        <Row>
          {postsData?.length ? (
            postsData.map((post: Post) => (
              <Col xs={24} sm={12} md={12} lg={12} key={post._id} className="p-2">
                <Card
                  cover={
                    <img
                      alt="thumbnail"
                      className="w-64 h-64"
                      src={post.thumbnail}
                    />
                  }
                  actions={[
                    <Button
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => handleDelete(post._id)}
                      loading={isLoading}
                    >
                      Delete
                    </Button>,
                  ]}
                >
                  <Card.Meta
                    title={post.title}
                    description={`${post.content.substring(0, 150)}...`}
                  />
                  <p className="py-2">
                    Created: {new Date(post.createdAt).toLocaleString()}
                  </p>
                </Card>
              </Col>
            ))
          ) : (
            <Col span={24}>
              <Card className="text-center">
                <p>{isLoading ? "Loading posts..." : "No posts found."}</p>
              </Card>
            </Col>
          )}
        </Row>
      </Card>
    </Modal>
  );
}

export default UserDetailsModal;
