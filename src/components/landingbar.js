import Link from "next/link";

export default function Landingbar() {
    return (
        <div className=" w-full rounded-b-lg border-x-2 border-b-2 flex flex-row justify-end py-5">
            <div className="flex justify-center items-center w-full text-2xl font-bold">
                <Link href="/">
                    Auto-Land
                </Link>

            </div>
            <div className="flex justify-center items-center min-w-60 w-full">
                <h1 className="text-3xl font-medium text-red-400">IMPORT SAMOCHODÓW Z UE, USA I JAPONII</h1>
            </div>
        </div>
    )
}