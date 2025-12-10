import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-[#000c] py-10">
      <div className="max-w-[1200px] mx-auto flex justify-between ">
        <div className="flex flex-col gap-2 text-[#d1d5db]">
          <div className="font-bold text-[25px] text-white">
            <Link href={"/"}>로고</Link>
          </div>
          <p>© 2025 Project Logo Corp. All rights reserved.</p>
          <div>
            <p>모든 로고의 저작권은 모두 각 폰트의 저작권자에게 있습니다.</p>
            <p>로고 사용에 대한 라이센스 문의는 저작권자에게 문의해주세요.</p>
          </div>
          <p>제휴 및 광고 문의 logo@logo.logo</p>
          <p>이용약관 | 개인정보처리방침</p>
          <div className="text-[14px]">
            <p>로고 사업자 정보</p>
            <p>
              주식회사 로고 | 대표 강아지 | 사업자등록번호 123-45-678910 |
              통신판매업신고번호 제2025-서울성동-1234 | 개인정보관리책임자
              고양이 |
            </p>
            <p>
              서울 성동구 왕십리로10길 6, 1234 | 문의 logo@logo.logo |
              123-4567-8910
            </p>
          </div>
        </div>
        <ul className="flex flex-col justify-center items-center gap-7 text-[#d1d5db]">
          <li className="font-bold text-[20px]">
            <Link href={"/"}>로고</Link>
          </li>
          <li>
            <Link href={"/todo-list"}>TodoList</Link>
          </li>
          <li>
            <Link href={"/board"}>게시판</Link>
          </li>
          <li>
            <Link href={"/chart"}>Chart</Link>
          </li>
          <li>
            <Link href={"#"}>제작 설명</Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
