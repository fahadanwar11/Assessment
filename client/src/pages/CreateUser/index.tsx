import { useCreateUserMutation } from "@/features/createUser/createUserSlice";
import { RegisterFormValues, userInfoData } from "@/utils/Interfaces";
import { Button, Form, Input, Radio } from "antd";
import { useSelector } from "react-redux";

function CreateUser() {
  const { role } = useSelector((state: userInfoData) => state.auth);

  const [createUser, { isLoading }] = useCreateUserMutation();
  const [form] = Form.useForm();
  const onFinish = async (values: RegisterFormValues) => {
    const payload = {
      role,
      ...values,
    };
    try {
      await createUser(payload).unwrap();
      form.resetFields();
    } catch (error) {
      console.error("User creation failed:", error);
    }
  };

  return (
    <div>
      <Form
        form={form}
        name="createUser"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        className="space-y-6"
      >
        <label className="font-bold">Full Name</label>
        <Form.Item
          name="fullName"
          rules={[
            { required: true, message: "Please input your name!" },
            { type: "string", message: "name is required" },
          ]}
        >
          <Input
            placeholder="Full Name"
            className="h-10 rounded-lg hover:border-blue-400 focus:border-blue-400 mt-2"
          />
        </Form.Item>

        <label className="font-bold">Email</label>
        <Form.Item
          name="email"
          rules={[
            { required: true, message: "Please input your email!" },
            { type: "email", message: "Invalid email format" },
          ]}
        >
          <Input
            placeholder="Email"
            className="h-10 rounded-lg hover:border-blue-400 focus:border-blue-400 mt-2"
          />
        </Form.Item>

        <label className="font-bold">Password</label>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password
            placeholder="Password"
            className="h-10 rounded-lg hover:border-blue-400 focus:border-blue-400 mt-2"
          />
        </Form.Item>

        <label className="font-bold">Address</label>
        <Form.Item
          name="address"
          rules={[
            { required: true, message: "Please input your address!" },
            { type: "string", message: "Address is required" },
          ]}
        >
          <Input
            placeholder="Address"
            className="h-10 rounded-lg hover:border-blue-400 focus:border-blue-400 mt-2"
          />
        </Form.Item>

        <label className="font-bold">Phone No</label>
        <Form.Item
          name="phoneNo"
          rules={[
            { required: true, message: "Please input your phone number!" },
            { type: "string", message: "Phone number is required" },
          ]}
        >
          <Input
            placeholder="Phone Number"
            className="h-10 rounded-lg hover:border-blue-400 focus:border-blue-400 mt-2"
          />
        </Form.Item>
        {role === "Super Admin" && (
          <>
            <label className="font-bold mr-2">Role</label>

            <Form.Item
              name="role"
              rules={[{ required: true, message: "Please select a role!" }]}
            >
              <Radio.Group>
                <Radio value="Admin">Admin</Radio>
                <Radio value="User">User</Radio>
              </Radio.Group>
            </Form.Item>
          </>
        )}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            loading={isLoading}
            disabled={isLoading}
            className="h-12 rounded-lg font-semibold text-base bg-blue-600 hover:bg-blue-700 transition-all mt-2"
          >
            Create New User
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default CreateUser;
