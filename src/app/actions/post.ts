"use server";

import { createClient } from "@/lib/supabase/server";
import { Post } from "@/app/types/post";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";

// 보드 리스트
export async function getPosts(): Promise<Post[] | null> {
  noStore();

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
  noStore();

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

export async function createPost(formData: FormData) {
  const supabase = await createClient();

  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const thumbnailFile = formData.get("thumbnail_url") as File | null;

  // 유효성 검사
  if (!title?.trim() || !content?.trim()) {
    return {
      success: false,
      error: "제목과 내용을 입력해주세요.",
    };
  }

  let thumbnail_url = null;

  // 썸네일 파일이 있으면 Supabase Storage에 업로드
  if (thumbnailFile && thumbnailFile instanceof File) {
    const fileExt = thumbnailFile.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random()
      .toString(36)
      .substring(2)}.${fileExt}`;
    const filePath = `thumbnails/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("posts") // 버킷 이름 (Supabase에서 생성 필요)
      .upload(filePath, thumbnailFile, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      console.error("Error uploading thumbnail:", uploadError);
      return {
        success: false,
        error: "썸네일 업로드 중 오류가 발생했습니다.",
      };
    }

    // 업로드된 파일의 공개 URL 가져오기
    const {
      data: { publicUrl },
    } = supabase.storage.from("posts").getPublicUrl(filePath);

    thumbnail_url = publicUrl;
  }

  const { data, error } = await supabase
    .from("posts")
    .insert({ title, content, thumbnail_url })
    .select()
    .single();

  if (error) {
    console.error("Error creating post:", error);
    return {
      success: false,
      error: "게시글 작성 중 오류가 발생했습니다.",
    };
  }

  revalidatePath("/post");

  return {
    success: true,
    data,
  };
}

export async function modifyPost(formData: FormData) {
  const supabase = await createClient();

  const id = formData.get("id") as string;
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
    .update({ title, content })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error creating post:", error);
    return {
      success: false,
      error: "게시글 수정 중 오류가 발생했습니다.",
    };
  }

  revalidatePath("/post");
  revalidatePath(`/post/${id}`);

  return {
    success: true,
    data,
  };
}

export async function deletePost(id: number) {
  const supabase = await createClient();

  const { error } = await supabase.from("posts").delete().eq("id", id);

  if (error) {
    console.error("Error deleting post:", error);
    return {
      success: false,
      error: "게시글 삭제 중 오류가 발생했습니다.",
    };
  }

  revalidatePath("/post");

  return {
    success: true,
  };
}
