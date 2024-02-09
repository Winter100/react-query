import { useInfiniteQuery } from "@tanstack/react-query";
import HeaderContent from "../header/header";
import InfiniteScroll from "react-infinite-scroll-component";

export default function InfinitePage() {
  const headerContent = {
    title: "무한 스크롤 페이지 에서 해본 것",
    content: ["1. useInfiniteQuery", "2. InfiniteScroll 라이브러리 사용"],
  };

  const initalUrl = "https://swapi.dev/api/people/";

  const fetchUrl = async (url: string) => {
    console.log(url);
    const response = await fetch(url);
    return response.json();
  };

  const { data, fetchNextPage, hasNextPage, isLoading, isFetching } =
    useInfiniteQuery({
      // 쿼리 키, 쿼리 키가 같아야 초기화되지않고 계속해서 데이터가 쌓임
      queryKey: ["sw-people"],

      // 실제 데이터를 받아올 URL 처음엔 initialPageParam으로 받아왔다가
      // 이후 getNextPageParam의 lastPage가 전달됨
      queryFn: ({ pageParam }) => fetchUrl(pageParam),

      // 초기에 http요청할 URL
      initialPageParam: initalUrl,

      // return 값은 다음 요청할 데이터의 URL이면 됨
      // undefined가 리턴되면 다음값이 없는 것이기 때문에 더이상 데이터를 요청하지 않음
      getNextPageParam: (lastPage) => {
        return lastPage.next || undefined;
      },
    });

  if (isLoading) return <p>로딩</p>;

  return (
    <div>
      <HeaderContent headerContent={headerContent} />
      <InfiniteScroll
        dataLength={data?.pages.length}
        next={fetchNextPage}
        loader={<h2>로딩 로딩</h2>}
        hasMore={hasNextPage}
        scrollThreshold={0.8}
      >
        {data?.pages.map((item) => {
          return item.results.map((item) => (
            <li key={item.name}>{item.name}</li>
          ));
        })}
      </InfiniteScroll>
      <p>...</p>
      <p>...</p>
      <p>...</p>
      <p>...</p>
      <p>...</p>
      <p>...</p>
      <p>...</p>
      <p>...</p>
      <p>...</p>
      <p>...</p>
      <p>...</p>
      <p>...</p>
      <p>...</p>
      <p>...</p>
      <p>...</p>
      <p>...</p>
      <p>...</p>
      <p>...</p>
    </div>
  );
}
