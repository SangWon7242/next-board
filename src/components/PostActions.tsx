"use client";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Button } from "./ui/button";
import { deletePost } from "@/app/actions/post";

export default function PostActions({ id }: { id: number }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const Swal = require("sweetalert2");

  const handleDelete = async () => {
    // 1. 삭제 확인 컨펌
    const result = await Swal.fire({
      title: "정말 삭제하시겠습니까?",
      text: "삭제된 게시글은 복구할 수 없습니다.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
    });

    // 2. 취소 시 리턴
    if (!result.isConfirmed) {
      return;
    }

    // 3. 삭제 실행
    startTransition(async () => {
      const { success, error } = await deletePost(id);

      if (success) {
        await Swal.fire({
          title: "삭제 완료!",
          text: "게시글이 삭제되었습니다.",
          icon: "success",
          confirmButtonText: "확인",
        });
        router.push("/post");
        router.refresh(); // 캐시 갱신
      } else {
        Swal.fire({
          title: "Error!",
          text: error || "삭제 중 에러 발생",
          icon: "error",
          confirmButtonText: "확인",
        });
      }
    });
  };

  return (
    <Button onClick={handleDelete} disabled={isPending} variant="destructive">
      {isPending ? "삭제 중..." : "삭제"}
    </Button>
  );
}
