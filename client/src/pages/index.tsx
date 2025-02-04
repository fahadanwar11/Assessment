import { lazy } from "react";

const LOGIN = lazy(() => import("@/pages/Auth/Login"));
const REGISTER = lazy(() => import("@/pages/Auth/Register"));
const DASHBOARD = lazy(() => import("@/pages/Dashboard"));
const CREATE_USER = lazy(() => import("@/pages/CreateUser"));
const CREATE_POST = lazy(() => import("@/pages/CreatePost"));
export const webPages = {
  LOGIN,
  REGISTER,
  DASHBOARD,
  CREATE_USER,
  CREATE_POST,
};
