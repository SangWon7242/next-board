"use client";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import MDEditor from "@uiw/react-md-editor";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useSaveShortCut from "@/app/hooks/useSaveShortCut";
import { Post } from "@/app/types/post";
import { modifyPost } from "@/app/actions/post";
import Title from "@/components/Title";
import { IMAGE } from "@/app/constants/images";

export default function EditForm({ post }: { post: Post }) {
  const [title, setTitle] = useState<string>(post.title);
  const [content, setContent] = useState<string>(post.content);
  const [isPending, startTransition] = useTransition();
  const Swal = require("sweetalert2");
  const router = useRouter();

  const submitPost = async () => {
    if (!title.trim() || !content.trim()) {
      Swal.fire({
        title: "알림",
        text: "제목과 내용을 입력해주세요.",
        icon: "warning",
        confirmButtonText: "확인",
      });
      return;
    }

    startTransition(async () => {
      const formData = new FormData();
      formData.append("id", post.id.toString());
      formData.append("title", title);
      formData.append("content", content);

      const { success, error, data } = await modifyPost(formData);

      if (success) {
        setTitle("");
        setContent("");
        Swal.fire({
          title: "성공!",
          text: `${data.id}번 게시물 수정`,
          icon: "success",
          confirmButtonText: "확인",
        });
        router.push(`/post/${data.id}`);
      } else {
        Swal.fire({
          title: "Error!",
          text: error || "수정중 에러 발생",
          icon: "error",
          confirmButtonText: "확인",
        });
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitPost();
  };

  useSaveShortCut(submitPost, title, content);

  return (
    <div className="w-full">
      <Title image={IMAGE.board1}>게시글 수정</Title>
      <div className="py-20 max-w-7xl mx-auto">
        <form
          id="post-form"
          onSubmit={handleSubmit}
          className="flex flex-col gap-2"
        >
          <Input
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력하세요."
            disabled={isPending}
          />
          <MDEditor
            height={300}
            value={content}
            onChange={(e) => setContent(e || "")}
          />
          <input type="hidden" name="content" value={content} />
          <Button type="submit" disabled={isPending}>
            {isPending ? "수정 중..." : "수정"}
          </Button>
        </form>
      </div>
    </div>
  );
}
