import Link from "next/link";
import { Separator } from "@/components/ui/separator"

export default function Landingbar() {
    return (
        <div className=" w-full border-b-2 border-gray-600 flex justify-end py-3 flex-col">
            <div className="mx-auto">
            <div className="flex justify-center items-center w-full text-4xl font-bold text-[#ff0000] font-[Georgia] tracking-wider">
                <Link href="/">
                    AUTO-LAND
                </Link>
            </div>
                <Separator className="mt-2 bg-white"/>
            <div className="flex justify-center items-center min-w-60 w-full">
                <p className="lg:text-2xl md:text-xl sm:text-lg text-base font-bold text-[#ff0000] sm:text-start text-center">IMPORT SAMOCHODÓW Z UE, USA I JAPONII</p>
            </div>
            </div>
        </div>
    )
}