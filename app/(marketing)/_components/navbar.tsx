"use client";
import { useScrollTop } from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export const Navbar = () => {
    const scrolled = useScrollTop();
    const router = useRouter();

    const handleLoginClick = () => {
        router.push("/sign-in");
    };

    return (
        <div className={cn(
            "z-50 bg-background fixed top-0 flex items-center w-full p-6",
            scrolled && 'border-b-shadow-sm'
        )}>
            <Logo />
            <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
                <Button 
                    onClick={handleLoginClick} 
                    className="cursor-pointer hover:opacity-75 transition"
                >
                    Login
                </Button>
            </div>
        </div>
    )
}