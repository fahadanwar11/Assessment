import { Card, Button, Row, Col } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import {
  useDeletePostMutation,
  useGetMyPostsQuery,
} from "@/features/post/postSlice";
import { Post, PostDeleteProps } from "@/utils/Interfaces";

interface UserPanelProps {
  userId: string;
}

function UserPanel({ userId }: UserPanelProps) {
  const { data: postsData, isLoading } = useGetMyPostsQuery(userId);
  const [onDelete] = useDeletePostMutation();

  const handleDelete: PostDeleteProps = async (id) => {
    try {
      await onDelete(id);
    } catch (error) {
      console.error("Post deletion failed:", error);
    }
  };
  return (
    <>
      <Card title="My Posts">
        <Row gutter={[16, 16]}>
          {postsData?.map((post: Post) => (
            <Col xs={24} sm={12} md={8} lg={6} key={post._id}>
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
                  className="flex-col flex gap-2"
                  title={post.title}
                  description={`${post.content.substring(0, 150)}...`}
                />
                <p className="py-2">
                  Created: {new Date(post.createdAt).toLocaleString()}
                </p>
              </Card>
            </Col>
          ))}
        </Row>
      </Card>
      {postsData?.length === 0 && !isLoading && (
        <Card className="text-center">
          <p>No posts found.</p>
        </Card>
      )}
    </>
  );
}

export default UserPanel;
