export async function getPosts(page: number) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_page=${page}`
  );

  return response.json();
}
export async function getDetail(id: number) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );

  return response.json();
}
export async function deleteMethod(id: number): Promise<void> {
  await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    method: "DELETE",
  });

  return;
}
export async function updateMethod(id: number): Promise<void> {
  await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ title: "업데이트..." }),
  });

  return;
}
