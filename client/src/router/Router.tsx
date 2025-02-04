import { Route, Routes } from "react-router-dom";
import NoPage from "@/components/PageNotFound";
import { authRoutes, privateRoutes } from "./Routes";
import { ROUTE_PROPS } from "@/utils/Interfaces";
import PageLayout from "@/layout";

const AppRouter = () => {
  return (
    <Routes>
      {authRoutes.map(({ path, name, component: Component }: ROUTE_PROPS) => (
        <Route key={name} path={path} element={<Component />} />
      ))}

      {privateRoutes.map(
        ({ path, name, component: Component }: ROUTE_PROPS) => (
          <Route
            key={name}
            path={path}
            element={
              <PageLayout>
                <Component />
              </PageLayout>
            }
          />
        )
      )}
      <Route path="*" element={<NoPage />} />
    </Routes>
  );
};

export default AppRouter;
