import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import styles from "./queryPage.module.css";
import { getPosts } from "../utill/httpApi";
import Detail from "../detail/detail";

interface PostType {
  title: string;
  id: number;
}

export default function QueryPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectPost, setSelectPost] = useState(0);

  const queryClient = useQueryClient();

  useEffect(() => {
    if (currentPage < 10) {
      const nextPage = currentPage + 1;
      queryClient.prefetchQuery({
        queryKey: ["posts", nextPage],
        queryFn: () => getPosts(nextPage),
      });
    }
  }, [queryClient, currentPage]);

  const { data, isLoading } = useQuery<PostType[]>({
    queryKey: ["posts", currentPage],
    queryFn: () => getPosts(currentPage),
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <div>
        {data?.map((item) => (
          <div key={item.id}>
            <li
              onClick={() => setSelectPost(item.id)}
              className={styles.li}
            >{`id: ${item.id} - ${item.title}`}</li>
          </div>
        ))}
      </div>
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
      <hr></hr>
      {selectPost && <Detail id={selectPost} />}
    </div>
  );
}
