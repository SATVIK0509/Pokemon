import { createRoot } from "react-dom/client";
import "./styles/globals.css";
import App from "./components/app";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </BrowserRouter>
  </QueryClientProvider>
);
