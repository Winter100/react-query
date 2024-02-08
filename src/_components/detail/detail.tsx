import { useQuery } from "@tanstack/react-query";
import { getDetail } from "../utill/httpApi";

interface DetailType {
  title: string;
  body: string;
}

export default function Detail({ id }: { id: number }) {
  const { data, isLoading } = useQuery<DetailType>({
    queryKey: ["detail", id],
    queryFn: () => getDetail(id),
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <p>Title: {data?.title}</p>
      <p>Body: {data?.body}</p>
    </div>
  );
}
