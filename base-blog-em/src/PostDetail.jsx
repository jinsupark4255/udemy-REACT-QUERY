import { fetchComments } from "./api";
import "./PostDetail.css";
import { useQuery } from "@tanstack/react-query";

export function PostDetail({ post, deleteMutation, updateMutation }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["comments", post.id],
    queryFn: () => fetchComments(post.id),
  });

  if (isLoading) {
    return <h3>로딩 중....</h3>;
  }

  if (isError) {
    return <h3>에러가 발생했습니다.</h3>;
  }

  return (
    <>
      <h3 style={{ color: "blue" }}>{post.title}</h3>
      <div>
        <button onClick={() => deleteMutation.mutate(post.id)}>Delete</button>
        {deleteMutation.isPending && <p>데이터 삭제 중...</p>}
        {deleteMutation.isError && <p>데이터 삭제 실패</p>}
        {deleteMutation.isSuccess && <p>데이터 삭제 성공</p>}
      </div>

      <div>
        <button onClick={() => updateMutation.mutate(post.id)}>
          Update title
        </button>
        {updateMutation.isPending && <p>데이터 업데이트 중...</p>}
        {updateMutation.isError && <p>데이터 업데이트 중 오류 발생</p>}
        {updateMutation.isSuccess && <p>{updateMutation.data.title}</p>}
      </div>

      <p>{post.body}</p>
      <h4>Comments</h4>
      {data.map((comment) => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}
    </>
  );
}
