import Title from "@/components/Title";
import { IMAGE } from "@/app/constants/images";
import BoardList from "./BoardList";

export default function BoardPage() {
  return (
    <section>
      <Title image={IMAGE.board1}>게시판</Title>
      <div>
        <BoardList />
      </div>
    </section>
  );
}
