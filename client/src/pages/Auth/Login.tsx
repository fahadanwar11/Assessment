import { setUser, useLoginMutation } from "@/features/auth/authSlice";
import { LoginFormValues } from "@/utils/Interfaces";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

type FieldType = {
  email?: string;
  password?: string;
};

const Login: React.FC = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();

  const onFinish = async (values: LoginFormValues) => {
    try {
      const response = await login(values).unwrap();

      if (response?.token) {
        dispatch(
          setUser({
            userId: response.userId,
            role: response.role,
            token: response.token,
          })
        );
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-500">Please sign in to continue</p>
        </div>

        <Form
          form={form}
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          className="space-y-6"
        >
          <Form.Item<FieldType>
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Invalid email format" },
            ]}
          >
            <Input
              prefix={<MailOutlined className="text-gray-300" />}
              placeholder="Email"
              className="h-12 rounded-lg hover:border-blue-400 focus:border-blue-400"
            />
          </Form.Item>

          <Form.Item<FieldType>
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined className="text-gray-300" />}
              placeholder="Password"
              className="h-12 rounded-lg hover:border-blue-400 focus:border-blue-400 mt-2"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={isLoading}
              className="h-12 rounded-lg font-semibold text-base bg-blue-600 hover:bg-blue-700 transition-all mt-2"
            >
              Sign In
            </Button>
          </Form.Item>
        </Form>

        <div className="text-center mt-6">
          <a
            href="#forgot"
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            Forgot Password?
          </a>
        </div>

        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
          </div>
        </div>

        {/* <p className="text-center mt-8 text-gray-500">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 hover:text-blue-700 font-medium underline"
          >
            Sign Up
          </Link>
        </p> */}
      </div>
    </div>
  );
};
export default Login;
