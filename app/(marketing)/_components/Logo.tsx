import Image from "next/image";
import { Poppins } from "next/font/google";
import { FaGraduationCap } from 'react-icons/fa'

import { cn } from "@/lib/utils";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"]
});

export const Logo = () => {
  return (
    <div className="hidden md:flex items-center gap-x-2">
        <FaGraduationCap className="w-7 h-7" />
      <p className={cn("font-semibold", font.className)}>
    Peerup
      </p>
    </div>
  )
}