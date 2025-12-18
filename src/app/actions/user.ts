"use server";

import { createClient } from "@/lib/supabase/server";
import { User } from "@/app/types/user";
import type { AuthResponse } from "@supabase/supabase-js";

export async function signUp(
  email: string,
  password: string
): Promise<AuthResponse> {
  const supabase = await createClient();

  // 회원가입 API 호출 및 AuthResponse 반환
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });

  if (error) {
    return {
      data: {
        user: null,
        session: null,
      },
      error: error,
    }
  }

  return {
    data: {
      user: data.user,
      session: data.session,
    },
    error: null,
  }
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
