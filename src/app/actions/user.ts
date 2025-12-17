"use server";

import { createClient } from "@/lib/supabase/server";
import { User } from "@/app/types/user";
import type { AuthResponse } from "@supabase/supabase-js";

export async function signUp(
  email: string,
  password: string
): Promise<AuthResponse> {
  const supabase = await createClient();

  // 회원가입 API 호출 - 실제 폼에서 입력받은 이메일과 비밀번호 사용
  return await supabase.auth.signUp({
    email: email.trim(),
    password: password,
  });
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const supabase = await createClient();

  // user 테이블에 회원 정보 조회
  const { data, error } = await supabase
    .from("user")
    .select("*")
    .eq("email", email)
    .single();

  if (error) {
    console.log("error : ", error);
    return null;
  }

  return data;
}

export async function createUser(
  id: string,
  email: string
): Promise<User | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("user")
    .insert([{ id: id, email: email }])
    .select()
    .single();

  if (error) {
    console.error("Error creating user:", error);
    return null;
  }

  return data;
}
