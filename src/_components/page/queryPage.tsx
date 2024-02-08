import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

interface PostType {
  title: string;
}

export default function QueryPage() {
  const [currentPage, setCurrentPage] = useState(1);

  async function getData(page: number) {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_page=${page}`
    );

    return response.json();
  }
  const queryClient = useQueryClient();

  useEffect(() => {
    if (currentPage < 10) {
      const nextPage = currentPage + 1;
      queryClient.prefetchQuery({
        queryKey: ["posts", nextPage],
        queryFn: () => getData(nextPage),
      });
    }
  }, [queryClient, currentPage]);

  const { data, isLoading } = useQuery<PostType[]>({
    queryKey: ["posts", currentPage],
    queryFn: () => getData(currentPage),
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {data?.map((item, index) => (
        <li key={index}>{item.title}</li>
      ))}
      <button
        disabled={currentPage <= 1}
        onClick={() => setCurrentPage((pre) => pre - 1)}
      >
        이번 페이지
      </button>
      <button
        disabled={currentPage >= 10}
        onClick={() => setCurrentPage((pre) => pre + 1)}
      >
        다음 페이지
      </button>
    </div>
  );
}
