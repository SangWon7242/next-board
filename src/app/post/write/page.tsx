"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import useSaveShortCut from "@/app/hooks/useSaveShortCut";
import { createPost } from "@/app/actions/post";

import Title from "@/components/Title";
import { IMAGE } from "@/app/constants/images";
import { Input } from "@/components/ui/input";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "@/components/ui/button";
import ThumbnailUpload from "@/app/components/post/ThumbnailUpload";

export default function WritePage() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
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
      formData.append("title", title);
      formData.append("content", content);

      // 썸네일이 있으면 추가
      if (thumbnail) {
        formData.append("thumbnail_url", thumbnail);
      }

      const { success, error, data } = await createPost(formData);

      if (success) {
        setTitle("");
        setContent("");
        setThumbnail(null);

        Swal.fire({
          title: "성공!",
          text: `${data.id}번 게시물 작성`,
          icon: "success",
          confirmButtonText: "확인",
        });

        router.push(`/post/${data.id}`);
      } else {
        Swal.fire({
          title: "Error!",
          text: error || "추가중 에러 발생",
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
      <Title image={IMAGE.board1}>게시글 작성</Title>
      <div className="py-20 max-w-7xl mx-auto">
        <form
          id="post-form"
          onSubmit={handleSubmit}
          className="flex flex-col gap-2"
        >
          <ThumbnailUpload onThumbnailChange={setThumbnail} />
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
            {isPending ? "추가 중..." : "추가"}
          </Button>
        </form>
      </div>
    </div>
  );
}
