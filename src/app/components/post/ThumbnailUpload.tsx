"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X, Upload, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

interface ThumbnailUploadProps {
  // 타입이 3개인 이유는 처음 파일 업로드시 타입이 파일임
  onThumbnailChange: (file: File | string | null) => void;
}

export default function ThumbnailUpload({
  onThumbnailChange,
}: ThumbnailUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      // 이미지 파일인지 확인
      if (!file.type.startsWith("image/")) {
        alert("이미지 파일만 업로드 가능합니다.");
        return;
      }

      // 파일 크기 제한 (예: 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("파일 크기는 5MB 이하여야 합니다.");
        return;
      }

      // 이전 blob URL이 있으면 해제 (메모리 누수 방지)
      if (preview) {
        URL.revokeObjectURL(preview);
      }
      // 미리보기 생성 (blob URL 방식)
      const blobUrl = URL.createObjectURL(file);
      setPreview(blobUrl);
      setFileName(file.name);

      onThumbnailChange(file);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    setFileName("");
    onThumbnailChange(null);

    // input 초기화
    const input = document.getElementById(
      "thumbnail-input"
    ) as HTMLInputElement;
    if (input) input.value = "";
  };

  return (
    <div className="w-full border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-gray-400 transition-colors">
      {!preview ? (
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
            <ImageIcon className="w-8 h-8 text-gray-400" />
          </div>
          <div className="text-center">
            <label
              htmlFor="thumbnail-input"
              className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              <Upload className="w-4 h-4" />
              썸네일 이미지 선택
            </label>
            <Input
              id="thumbnail-input"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <p className="text-sm text-gray-500 mt-2">
              JPG, PNG, GIF (최대 5MB)
            </p>
          </div>
        </div>
      ) : (
        <div className="relative">
          <div className="relative w-full h-64 bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src={preview}
              alt="썸네일 미리보기"
              className="object-contain"
              fill
              unoptimized
            />
          </div>
          <div className="mt-3 flex items-center justify-between">
            <p className="text-sm text-gray-600 truncate flex-1">{fileName}</p>
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={handleRemove}
              className="ml-2"
            >
              <X className="w-4 h-4 mr-1" />
              삭제
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
