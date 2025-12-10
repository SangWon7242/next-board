"use client";
import { supabase } from "@/app/supabaseClient";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Input } from "./ui/input";
import { FaEdit } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import useSaveShortCut from "@/app/hooks/useSaveShortCut";

export default function Actions({
  todoId,
  todoTitle,
}: {
  todoId: number;
  todoTitle: string;
}) {
  const [isEdit, setIsEdit] = useState(false);
  const [editTitle, setEditTitle] = useState(todoTitle || "");
  const router = useRouter();
  const Swal = require("sweetalert2");

  // 수정 오픈 버튼
  const handleEditOpen = () => {
    setIsEdit(true);
  };

  // 수정 버튼
  const handleEdit = async () => {
    const { error } = await supabase
      .from("todo")
      .update({ title: editTitle })
      .eq("id", todoId)
      .select();

    if (error) {
      console.error(error);
      Swal.fire({
        title: "Error!",
        text: "수정 중 에러 발생",
        icon: "error",
        confirmButtonText: "확인",
      });
      return;
    }

    Swal.fire({
      title: "성공!",
      text: "수정 완료",
      icon: "success",
      confirmButtonText: "Cool",
    });
    setIsEdit(false);

    router.refresh();
  };

  useSaveShortCut(handleEdit, editTitle);

  // 삭제버튼
  const handleDelete = async () => {
    const { error } = await supabase.from("todo").delete().eq("id", todoId);

    if (error) {
      console.error(error);
      Swal.fire({
        title: "Error!",
        text: "삭제 중 에러 발생",
        icon: "error",
        confirmButtonText: "확인",
      });
      // alert("삭제 중 에러 발생");
    }

    Swal.fire({
      title: "성공!",
      text: "삭제 완료",
      icon: "success",
      confirmButtonText: "확인",
    });
    // alert("삭제");
    router.push("/todo-list");
  };

  return (
    <div>
      <div className="flex gap-3">
        {isEdit ? (
          <>
            <Input
              type="text"
              value={editTitle ?? ""}
              onChange={(e) => setEditTitle(e.target.value)}
            />
            <button onClick={handleEdit}>
              <FaCheck className="text-green-500 w-[30px] h-[30px]" />
            </button>
          </>
        ) : (
          <button onClick={handleEditOpen}>
            <FaEdit className="text-green-500 w-[30px] h-[30px]" />
          </button>
        )}
        <button onClick={handleDelete}>
          <FaTrashAlt className="text-red-500 w-[30px] h-[30px]" />
        </button>
      </div>
    </div>
  );
}
