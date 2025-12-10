"use server";

import { createClient } from "@/lib/supabase/server";
import { Post } from "@/app/types/post";

// 보드 리스트
export async function getPosts(): Promise<Post[] | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching boards:", error);
    return null;
  }

  return data;
}

export async function getPostById(id: number): Promise<Post | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching board by ID:", error);
    return null;
  }

  return data;
}

// src/app/actions/post.ts에 추가
export async function createPost(formData: FormData) {
  const supabase = await createClient();

  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  // 유효성 검사
  if (!title?.trim() || !content?.trim()) {
    return {
      success: false,
      error: "제목과 내용을 입력해주세요.",
    };
  }

  const { data, error } = await supabase
    .from("posts")
    .insert({ title, content })
    .select()
    .single();

  if (error) {
    console.error("Error creating post:", error);
    return {
      success: false,
      error: "게시글 작성 중 오류가 발생했습니다.",
    };
  }

  return {
    success: true,
    data,
  };
}
