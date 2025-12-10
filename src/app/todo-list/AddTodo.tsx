"use client";

import { supabase } from "@/app/supabaseClient";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useSaveShortCut from "@/app/hooks/useSaveShortCut";

export default function AddTodo() {
  const router = useRouter();
  const [title, setTitle] = useState<string>("");
  const Swal = require("sweetalert2");

  const handleAdd = async () => {
    if (!title.trim()) {
      return;
    }

    const { error } = await supabase.from("todo").insert({ title });

    if (error) {
      console.error(error);
      return;
    }

    Swal.fire({
      title: "성공!",
      text: "투두 작성 완료",
      icon: "success",
      confirmButtonText: "확인",
    });
    setTitle("");
    router.push("/todo-list");
  };

  useSaveShortCut(handleAdd, title);
  return (
    <div>
      <div className="flex gap-5">
        <Input
          placeholder="할 일을 작성해 주세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Button onClick={handleAdd}>추가</Button>
      </div>
    </div>
  );
}
