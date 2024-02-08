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
