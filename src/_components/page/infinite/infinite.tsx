import HeaderContent from "../header/header";
export default function InfinitePage() {
  const headerContent = {
    title: "무한 스크롤 페이지 에서 해본 것",
    content: ["1....", "2...."],
  };

  return (
    <div>
      <HeaderContent headerContent={headerContent} />
    </div>
  );
}
