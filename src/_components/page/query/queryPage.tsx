import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import styles from "./queryPage.module.css";
import { deleteMethod, getPosts, updateMethod } from "../../utill/httpApi";
import Detail from "../../detail/detail";
import HeaderContent from "../header/header";

interface PostType {
  title: string;
  id: number;
}

export default function QueryPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectPost, setSelectPost] = useState(0);

  const queryClient = useQueryClient();

  //삭제 mutation
  const deleteMutation = useMutation({
    mutationFn: (id) => deleteMethod(id),
  });

  //업데이트 mutation
  const updateMutation = useMutation({
    mutationFn: (id) => updateMethod(id),
  });

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

  const headerContent = {
    title: "기본 쿼리 페이지에서 해본 것",
    content: [
      "1. 데이터 받아오기",
      "2. 클릭시 상세 데이터 받아오기",
      "3. 데이터 삭제 및 업데이트",
      "4. 삭제 및 업데이트 시 각 상태 초기화",
      "5. PreFetching",
    ],
  };

  return (
    <div>
      <HeaderContent headerContent={headerContent} />
      <div>
        {data?.map((item) => (
          <div key={item.id}>
            <li
              onClick={() => {
                //업데이트 및 삭제 mutation의 상태를 초기화 해줌
                deleteMutation.reset();
                updateMutation.reset();
                setSelectPost(item.id);
              }}
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
      {selectPost && (
        <Detail
          id={selectPost}
          deleteMutation={deleteMutation}
          updateMutation={updateMutation}
        />
      )}
    </div>
  );
}
