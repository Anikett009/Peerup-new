import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { fetchUser } from "@/lib/actions/user.actions";
import TodoList from "@/components/todolist/TodoList"  // Import your TodoList component
import FileUpload from "@/components/forms/FileUpload";

async function Page() {
  const user = await currentUser();
  if (!user) return null;

  // fetch user information
  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  return (
    <>
      <h1 className='head-text'>Documents Vault</h1>
      <FileUpload />  {/* Use your TodoList component */}
    </>
  );
}

export default Page;