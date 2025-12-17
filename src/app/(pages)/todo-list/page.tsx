import { IMAGE } from "@/app/constants/images";

import Title from "@/components/Title";
import TodoList from "./TodoList";
import AddTodo from "./AddTodo";

export default function TodoListPage() {
  return (
    <section>
      <Title image={IMAGE.todo1img}>투두 리스트</Title>
      <div className="py-20">
        <div className="max-w-[1200px] mx-auto p-10 bg-gray-50 rounded-2xl shadow-2xl">
          <AddTodo />
          <TodoList />
        </div>
      </div>
    </section>
  );
}
