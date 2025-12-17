"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const SignUpPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 유효성 검사
    if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (password.length < 6) {
      alert("비밀번호는 최소 6자 이상이어야 합니다.");
      return;
    }

    // 이메일 형식 검사
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("올바른 이메일 형식을 입력해주세요.");
      return;
    }

    startTransition(async () => {
      // TODO: 회원가입 API 호출
      console.log("회원가입 시도:", { email, password });
      // 회원가입 성공 후 처리
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">회원가입</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            새 계정을 만들어 시작하세요
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              이메일
            </label>
            <Input
              id="email"
              type="email"
              placeholder="이메일을 입력하세요"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isPending}
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              비밀번호
            </label>
            <Input
              id="password"
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isPending}
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="text-sm font-medium">
              비밀번호 확인
            </label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="비밀번호를 다시 입력하세요"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={isPending}
              required
            />
          </div>

          <div className="space-y-3 pt-4 flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={isPending}
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>

            <Button type="submit" disabled={isPending} className="flex-1">
              {isPending ? "처리 중..." : "회원가입"}
            </Button>
          </div>
        </form>

        <div className="text-center text-sm">
          <span className="text-muted-foreground">
            이미 계정이 있으신가요?{" "}
          </span>
          <Link
            href="/signin"
            className="font-medium text-primary hover:underline"
          >
            로그인
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
