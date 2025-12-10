import { getPostById } from "@/app/actions/post";

import { formatDate } from "@/app/uitils/dateForatter";
import MarkdownViewer from "@/components/MarkdownViewer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import BoardActions from "@/components/BoardActions";

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const paramId = parseInt(id, 10);

  // 잘못된 ID 형식
  if (isNaN(paramId)) {
    return <div>인증 정보가 올바르지 않습니다.</div>;
  }

  const post = await getPostById(paramId);

  // 게시글을 찾을 수 없음
  if (!post) {
    return <div>해당 데이터가 존재하지 않습니다.</div>;
  }

  return (
    <div className="max-w-7xl mx-auto py-20">
      <div>
        <span className="font-bold">작성일:</span>
        <span> {formatDate(post.created_at)}</span>
      </div>
      <p className="font-bold text-[30px] py-5">{post.title}</p>
      <div className="border p-4">
        <MarkdownViewer content={post.content} />
      </div>
      <div className="flex justify-end py-5 gap-3">
        <Button>
          <Link href={`/post/${post.id}/edit`}>수정</Link>
        </Button>
        <BoardActions boardId={post.id} />
        <Button>
          <Link href={`/post`}>목록으로</Link>
        </Button>
      </div>
    </div>
  );
}
