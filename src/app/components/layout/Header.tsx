import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-0 z-50 w-full h-20 mx-auto bg-white">
      <nav className="flex flex-col max-w-[1200px] h-full mx-auto justify-center items-center">
        <div className="flex w-full justify-between">
          <div className="font-bold text-[30px]">
            <Link href={"/"}>로고</Link>
          </div>
          <ul className="flex items-center gap-7">
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
              <Link href={"/description"}>제작 설명</Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
