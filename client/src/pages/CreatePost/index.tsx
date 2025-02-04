import { Form, Input, Button } from "antd";
import TextArea from "antd/es/input/TextArea";
import { PostValues, userInfoData } from "@/utils/Interfaces";
import { useSelector } from "react-redux";
import { useCreatePostMutation } from "@/features/post/postSlice";

const CreatePost = () => {
  const [form] = Form.useForm();
  const { userId } = useSelector((state: userInfoData) => state.auth);
  const [createPost, { isLoading }] = useCreatePostMutation();
  const onFinish = async (values: PostValues) => {
    const payload = {
      ...values,
      userId,
    };
    try {
      await createPost(payload).unwrap();
      form.resetFields();
    } catch (error) {
      console.error("Post creation failed:", error);
    }
  };
  // https://picsum.photos/seed/picsum/200/300
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Create New Post</h1>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className="w-full"
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please input the title!" }]}
        >
          <Input size="large" />
        </Form.Item>

        <Form.Item
          label="Content"
          name="content"
          rules={[{ required: true, message: "Please input the content!" }]}
        >
          <TextArea rows={6} />
        </Form.Item>

        <Form.Item
          label="Thumbnail URL"
          name="thumbnail"
          rules={[
            { required: true, message: "Please input the thumbnail URL!" },
          ]}
        >
          <Input size="large" />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={isLoading}
            className="mr-4"
          >
            Create Post
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreatePost;
