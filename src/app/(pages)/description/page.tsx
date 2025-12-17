import Title from "@/components/Title";
import { IMAGE } from "@/app/constants/images";

export default function descriptionPage() {
  return (
    <section>
      <Title image={IMAGE.description1}>제작 설명</Title>
      <div className="max-w-[1200px] mx-auto py-20">
        <div>
          <p className="text-[20px] font-bold ">투두 리스트</p>
          <div>
            <p className="pt-2">
              <span className="font-bold">1.</span> CRUD 구현
            </p>
            <p className="pl-5 pt-2">
              - 서버 컴포넌트와 클라이언트 컴포넌트의 기본을 까먹지 않기
            </p>
            <p className="pl-5 pt-2">
              - 클라이언트 컴포넌트 자식으로 들어간 서버 컴포넌트는 클라이언트
              컴포넌트로 인식 함
            </p>
            <p className="pl-5 pt-2">
              - 서버컴포넌트에서 import로 클라이언트,서버 컴포넌트를 합쳐서
              사용하는건 가능함으로 투두리스트에 적용
            </p>
            <p className="pl-5 pt-2">
              - sweetAlert2 적용 공식문서에 쉽게 설명이 되어있음
            </p>

            <p className="pt-2">
              <span className="font-bold">2.</span> 질문
            </p>
            <p className="pl-5 pt-2">투두 작성 경로: TodoList.tsx</p>
            <p className="pl-5 pt-2">투두 수정,삭제 경로: Actions.tsx</p>
            <p className="pl-5 pt-2">
              - TodoList.tsx p태그에 제목이 보여지는데 수정 아이콘
              클릭시(Actions.tsx) p태그 부분에 Input가 뜨게 하고 싶음 지금은
              수정 아이콘 옆에 나타남
            </p>
          </div>
        </div>
      </div>
      <div className="max-w-[1200px] mx-auto py-20">
        <div>
          <p className="text-[20px] font-bold ">게시판</p>
          <div>
            <p className="pt-2">
              <span className="font-bold">1.</span> 에러
            </p>
            <p className="pl-5 pt-2">
              - BoardItemPage(&#123; params, &#125;: &#123; params:
              Promise&lt;&#123; boardId: string &#125;&gt;; &#125;)
            </p>
            <p className="pl-5 pt-2">
              - const &#123;boardId&#125; = await params;
            </p>
            <p>위 내용처럼 Promise로 받아와야하는데</p>
            <p className="pl-5 pt-2">
              - BoardItemPage(&#123; params, &#125;: &#123; params: &#123;
              boardId: string &#125;; &#125;)
            </p>
            <p className="pl-5 pt-2">- const boardId = params.boardId;</p>
            <p>
              Promise로 받아 오지 않아서 id값을 못찹고 언디파인드가 뜨는
              에러발생..!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
