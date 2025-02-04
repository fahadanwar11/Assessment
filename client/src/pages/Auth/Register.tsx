import { useRegisterMutation } from "@/features/auth/authSlice";
import { RegisterFormValues } from "@/utils/Interfaces";
import {
  HomeOutlined,
  LockOutlined,
  MailOutlined,
  MobileOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const Register: React.FC = () => {
  const [form] = Form.useForm();
  const [register, { isLoading }] = useRegisterMutation();
  const onFinish = async (values: RegisterFormValues) => {
    await register(values);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Create an Account
          </h1>
          <p className="text-gray-500">Please sign up to continue</p>
        </div>

        <Form
          form={form}
          name="register"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          className="space-y-6"
        >
          <Form.Item<RegisterFormValues>
            name="fullName"
            rules={[
              { required: true, message: "Please input your full name!" },
              { type: "string", message: "Name is required" },
            ]}
          >
            <Input
              prefix={<UserOutlined className="text-gray-300" />}
              placeholder="Full Name"
              className="h-12 rounded-lg hover:border-blue-400 focus:border-blue-400"
            />
          </Form.Item>
          <Form.Item<RegisterFormValues>
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Invalid email format" },
            ]}
          >
            <Input
              prefix={<MailOutlined className="text-gray-300" />}
              placeholder="Email"
              className="h-12 rounded-lg hover:border-blue-400 focus:border-blue-400 mt-2"
            />
          </Form.Item>

          <Form.Item<RegisterFormValues>
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined className="text-gray-300" />}
              placeholder="Password"
              className="h-12 rounded-lg hover:border-blue-400 focus:border-blue-400 mt-2"
            />
          </Form.Item>

          <Form.Item<RegisterFormValues>
            name="address"
            rules={[
              { required: true, message: "Please input your address!" },
              { type: "string", message: "Address is required" },
            ]}
          >
            <Input
              prefix={<HomeOutlined className="text-gray-300" />}
              placeholder="Address"
              className="h-12 rounded-lg hover:border-blue-400 focus:border-blue-400 mt-2"
            />
          </Form.Item>

          <Form.Item<RegisterFormValues>
            name="phoneNo"
            rules={[
              { required: true, message: "Please input your phone number!" },
              { type: "string", message: "Phone number is required" },
            ]}
          >
            <Input
              prefix={<MobileOutlined className="text-gray-300" />}
              placeholder="Phone Number"
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
              Sign Up
            </Button>
          </Form.Item>
        </Form>

        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
          </div>
        </div>

        <p className="text-center mt-8 text-gray-500">
          Already have have an account?
          <Link
            to="/"
            className="text-blue-600 ml-0.5 hover:text-blue-700 font-medium underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};
export default Register;
