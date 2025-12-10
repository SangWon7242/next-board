"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import useSaveShortCut from "@/app/hooks/useSaveShortCut";
import { supabase } from "@/app/supabaseClient";

import Title from "@/components/Title";

import { IMAGE } from "@/app/constants/images";
import { Input } from "@/components/ui/input";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "@/components/ui/button";

export default function page() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const Swal = require("sweetalert2");
  const router = useRouter();

  const handleAdd = async () => {
    const { error } = await supabase.from("board").insert({ title, content });

    if (!title.trim() || !content.trim()) {
      return;
    }

    if (error) {
      console.error(error);
      Swal.fire({
        title: "Error!",
        text: "추가중 에러 발생",
        icon: "error",
        confirmButtonText: "확인",
      });
      return;
    }

    setTitle("");
    setContent("");
    Swal.fire({
      title: "성공!",
      text: "게시글 작성 완료",
      icon: "success",
      confirmButtonText: "확인",
    });
    router.push("/board");
  };

  useSaveShortCut(handleAdd, title, content);
  return (
    <div className="w-full">
      <Title image={IMAGE.board1}>게시글 작성</Title>
      <div className="py-20 max-w-7xl mx-auto">
        <div className="flex flex-col gap-2">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력하세요."
          />
          <MDEditor
            height={300}
            value={content}
            onChange={(e) => setContent(e || "")}
          />
          <Button onClick={handleAdd}>추가</Button>
        </div>
      </div>
    </div>
  );
}
