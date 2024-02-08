import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Route, Routes } from "react-router-dom";
import QueryPage from "./_components/page/query/queryPage";
import MainNavBar from "./_components/gnb/mainNavBar";
import InfinitePage from "./_components/page/infinite/infinite";

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <MainNavBar />
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<p>홈페이지</p>} />
          <Route path="/query" element={<QueryPage />} />
          <Route path="/infinite" element={<InfinitePage />} />
        </Routes>
        <ReactQueryDevtools initialIsOpen={true} />
      </QueryClientProvider>
    </>
  );
}

export default App;
