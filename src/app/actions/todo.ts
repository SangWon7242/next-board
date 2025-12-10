"use server";

import { createClient } from "@/lib/supabase/server";
import { Todo } from "@/app/types/todo";

// 모든 투두 가져오기
export async function getTodos(): Promise<Todo[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("todos")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }

  return data || [];
}
