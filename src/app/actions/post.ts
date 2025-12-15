"use server";

import { createClient } from "@/lib/supabase/server";
import { Post } from "@/app/types/post";
import { nanoid } from "nanoid";
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
  const thumbnail = formData.get("thumbnail_url") as File | string | null;

  // 유효성 검사
  if (!title?.trim() || !content?.trim() || !thumbnail) {
    return {
      success: false,
      error: "제목과 내용과 썸네일을 입력해주세요.",
    };
  }

  // 파일 업로드 시, Supabase의 Storage 즉, bucket 폴더에 이미지를 먼저 업로드 한 후,
  // 이미지가 저장된 bucket 폴더의 경로 URL 주소를 우리가 관리하고 있는
  // post 테이블 thumnail 컬럼에 문자열 형태, 즉 string 타입(DB에서는 Text 타입)으로 저장

  let thumbnailUrl: string | null = null;
  if (thumbnail && thumbnail instanceof File) {
    // 파일이 있는 경우
    const fileExt = thumbnail.name.split(".").pop();
    const fileName = `${nanoid()}.${fileExt}`;
    const filePath = `thumbnails/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("posts") // 버킷 이름 (Supabase에서 생성 필요)
      .upload(filePath, thumbnail, {
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
    const { data } = supabase.storage.from("posts").getPublicUrl(filePath);

    if (!data) {
      return {
        success: false,
        error: "썸네일 URL 생성 중 오류가 발생했습니다.",
      };
    }

    thumbnailUrl = data.publicUrl;
  }

  const { data, error } = await supabase
    .from("posts")
    .insert({ title, content, thumbnail_url: thumbnailUrl })
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
