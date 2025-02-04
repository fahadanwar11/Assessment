import { webPages } from "@/pages";

export const authRoutes = [
  {
    path: "/",
    component: webPages.LOGIN,
    name: "Login",
  },
  {
    path: "/register",
    component: webPages.REGISTER,
    name: "Register",
  },
];

export const privateRoutes = [
  {
    path: "/dashboard",
    component: webPages.DASHBOARD,
    name: "Dashboard",
  },
  {
    path: "/create-user",
    component: webPages.CREATE_USER,
    name: "Create User",
  },
  {
    path: "/create-post",
    component: webPages.CREATE_POST,
    name: "Create Post",
  },
];
