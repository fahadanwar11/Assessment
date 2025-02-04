import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./App.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { Loader } from "./components/Loader.tsx";
import { store } from "./store/index.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <main className="dark text-foreground bg-background">
        <Suspense fallback={<Loader />}>
          <App />
        </Suspense>
      </main>
    </Provider>
  </StrictMode>
);
