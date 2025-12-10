"use client";
import { getBoardById } from "@/app/services/BoardService";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export default function BoardActions({ boardId }: { boardId: number }) {
  const router = useRouter();
  const Swal = require("sweetalert2");
  const handleDelete = async () => {
    const board = await getBoardById(boardId);
    if (!board) {
      Swal.fire({
        title: "Error!",
        text: "삭제중 에러 발생",
        icon: "error",
        confirmButtonText: "확인",
      });
      return;
    }

    Swal.fire({
      title: "성공!",
      text: "삭제 완료",
      icon: "success",
      confirmButtonText: "확인",
    });
    router.push("/board");
  };
  return (
    <div>
      <Button onClick={handleDelete}>삭제</Button>
    </div>
  );
}
