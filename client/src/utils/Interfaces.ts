import { ComponentType, LazyExoticComponent } from "react";

export interface ROUTE_PROPS {
  path: string;
  name: string;
  component: LazyExoticComponent<ComponentType<any>>;
}
export interface LoginFormValues {
  email: string;
  password: string;
}
export interface RegisterFormValues {
  fullName: string;
  email: string;
  password: string;
  address: string;
  phoneNo: string;
  role?: string;
}
export type userInfoData = {
  auth: {
    userId: string;
    role: string;
  };
};

export interface dashboardColumnType {
  title: string;
  dataIndex: string;
  key: string;
  render?: (text: string, record: any) => JSX.Element | null;
}
export interface PostValues {
  title: string;
  content: string;
  thumbnail: string;
  author: string;
}

export interface Post {
  _id: string;
  thumbnail: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
}

export interface PostDeleteProps {
  (id: string): Promise<void>;
}
