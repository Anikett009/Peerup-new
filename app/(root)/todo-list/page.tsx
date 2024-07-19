import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { fetchUser } from "@/lib/actions/user.actions";
import TodoList from "@/components/todolist/TodoList"  // Import your TodoList component

async function Page() {
  const user = await currentUser();
  if (!user) return null;

  // fetch user information
  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  return (
    <>
      <h1 className='head-text'>To-Do List</h1>
      <TodoList />  {/* Use your TodoList component */}
    </>
  );
}

export default Page;