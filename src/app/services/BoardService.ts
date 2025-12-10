import { Board } from "@/app/types/Board";
import { supabase } from "@/app/supabaseClient";

// 보드 리스트
export async function getAllBoards(): Promise<Board[] | null> {
  const { data, error } = await supabase
    .from("board")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    console.error("Error fetching boards:", error);
    return null;
  }
  return data;
}

export async function getBoardById(id: number): Promise<Board | null> {
  const { data, error } = await supabase
    .from("board")
    .select("*")
    .eq("id", id)
    .single();
  if (error) {
    console.error("Error fetching board by ID:", error);
    return null;
  }
  return data;
}
