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
