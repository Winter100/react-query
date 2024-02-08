import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import QueryPage from "./_components/page/queryPage";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <QueryPage />
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
}

export default App;
