import { SignIn } from "@clerk/nextjs";
import Topbar from "@/components/shared/Topbar";

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <Topbar />
      <main className="flex-grow">
    <div className="min-h-screen  bg-[#121212] flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
        <SignIn
          appearance={{
            elements: {
              formButtonPrimary: 'bg-purple-500 hover:bg-purple-600',
              card: 'bg-[#1e1e1e]',
              headerTitle: 'text-white',
              headerSubtitle: 'text-gray-300',
              socialButtonsBlockButton: 'bg-gray-700 hover:bg-gray-600',
              formFieldLabel: 'text-gray-300',
              formFieldInput: 'bg-gray-700 text-white',
              footerActionLink: 'text-purple-400 hover:text-purple-300',
            },
          }}
        />
      </div>
    </div>
    </main>
    </div>
  );
}