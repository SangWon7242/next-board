import { Todo } from "@/app/types/Todo";
import { supabase } from "../app/supabaseClient";

// 모든 투두 가져오기
export async function getAllTodos(): Promise<Todo[]> {
  const { data: todos, error } = await supabase
    .from("todo")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    console.error(error);
    return [];
  }
  return todos || [];
}
