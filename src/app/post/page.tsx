import Title from "@/components/Title";
import { IMAGE } from "@/app/constants/images";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/app/uitils/dateForatter";
import { getPosts } from "@/app/actions/post";

export default async function PostPage() {
  const posts = await getPosts();

  if (!posts) {
    return <div>게시물 목록 조회 실패</div>;
  }

  return (
    <section>
      <Title image={IMAGE.board1}>게시판</Title>
      <div className="w-7xl mx-auto py-20">
        <ul>
          <li className="grid grid-cols-2 p-2 border-b font-bold">
            <p>제목</p>
            <p>작성일</p>
          </li>
          {posts?.map((post) => (
            <li key={post.id} className="grid grid-cols-2 p-2 border-b">
              <Link href={`/post/${post.id}`}>{post.title}</Link>
              <p>{formatDate(post.created_at)}</p>
            </li>
          ))}
          <li className="ml-0">
            <Button>
              <Link href={"/post/write"}>글쓰기</Link>
            </Button>
          </li>
        </ul>
      </div>
    </section>
  );
}
