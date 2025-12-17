import { getPostById } from "@/app/actions/post";
import EditForm from "./EditForm";

export default async function EditPage({
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

  if (!post) {
    return <div>해당 데이터가 존재하지 않습니다.</div>;
  }

  return (
    <div>
      <EditForm post={post} />
    </div>
  );
}
