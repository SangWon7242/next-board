"use client";

import { useEffect } from "react";

export default function useSaveShortCut(onSave: () => void, ...props: any[]) {
  useEffect(() => {
    const saveKeyDown = (e: KeyboardEvent) => {
      // Ctrl + s, cmd + s
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault(); // 브라우저에서 ctrl + s 눌렀을 때 기본 이벤트를 막음
        onSave();
      }
    };

    window.addEventListener("keydown", saveKeyDown);

    // 클린업 함수
    return () => {
      window.removeEventListener("keydown", saveKeyDown);
    };
  }, [onSave, ...props]);
}
