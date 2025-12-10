import { getBoardById } from "@/app/services/BoardService";
import EditBtn from "./EditBtn";

export default async function EditPage({
  params,
}: {
  params: Promise<{ boardId: number }>;
}) {
  const { boardId } = await params;
  const board = await getBoardById(boardId);

  if (!board) {
    return <div>게시글을 찾을 수 없습니다</div>;
  }

  return (
    <div>
      <EditBtn
        boardId={board.id}
        editTitle={board.title}
        editContent={board.content}
      />
    </div>
  );
}
