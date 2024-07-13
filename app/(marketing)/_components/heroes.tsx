import Image from "next/image";
export const Heroes = () => {
    return (
        <div className="flex flex-col items-center justify-center max-w-5xl">
            <div className="flex items-center">
                <div className="relative w-[400px] h-[300px] sm:w-[350px] h-[350px] md:w-[500px] h-[400px]">
                    <Image
                    src = "/landing.png"
                    layout="fill"
                    className="object-contain"
                    alt = "Document" />
                </div>
            </div>
        </div>
    )
}