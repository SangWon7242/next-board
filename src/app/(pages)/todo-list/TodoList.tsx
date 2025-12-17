import Actions from "@/components/TodoActions";
import { getAllTodos } from "@/app/services/TodoService";

export default async function TodoList() {
  const todos = await getAllTodos();

  if (todos.length === 0) {
    return (
      <div className="text-center pt-20 pb-10 text-[20px]">
        <p>작성된 리스트가 없습니다.</p>
        <br />
        <p>할 일을 추가해주세요.</p>
      </div>
    );
  }

  return (
    <div>
      <ul className="pt-10">
        {todos.map((todo) => (
          <li key={todo.id} className="py-3">
            <div className="flex justify-between items-center">
              <p>{todo.title}</p>
              <Actions todoId={todo.id} todoTitle={todo.title} />
            </div>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
}
