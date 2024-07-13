"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Router } from "lucide-react";
import { useRouter } from "next/navigation";


const Heading = () => {
    const router = useRouter();
    
const handleSignupClick = () => {
    router.push("/sign-up");
};

    return ( 
        <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
                Welcome To <span>Peerlink</span>
            </h1>
            <h3 className="text-base sm:text-xl md:text-2xl font-medium">
            The platform where you can connect with like-minded individuals who share your interests, goals, and challenges. 
            </h3>
            <Button onClick={handleSignupClick} >
                Enter Peerup <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
           
        </div>

        
     );
}
 
export default Heading;