import { UseMutationResult, useQuery } from "@tanstack/react-query";
import { getDetail } from "../utill/httpApi";

interface DetailType {
  title: string;
  body: string;
}

export default function Detail({
  id,
  deleteMutation,
  updateMutation,
}: {
  id: number;
  deleteMutation: UseMutationResult;
  updateMutation: UseMutationResult;
}) {
  const { data, isLoading } = useQuery<DetailType>({
    queryKey: ["detail", id],
    queryFn: () => getDetail(id),
  });

  if (isLoading) return <p>Detail Loading...</p>;

  return (
    <div>
      <p>Title: {data?.title}</p>
      <p>Body: {data?.body}</p>
      <button onClick={() => deleteMutation.mutate(id)}>삭제하기</button>
      <button onClick={() => updateMutation.mutate(id)}>업데이트 하기</button>
      {/* 삭제 및 업데이트의 상태를 변경 시킴 (다른 곳에서 reset을 이용한 초기화를 해줘야함) */}
      {deleteMutation.isPending && <p>삭제중...</p>}
      {deleteMutation.isSuccess && <p>삭제되었습니다.</p>}
      {updateMutation.isPending && <p>업데이트중...</p>}
      {updateMutation.isSuccess && <p>업데이트 완료!</p>}
    </div>
  );
}
