import Link from "next/link";

export default function Landingbar() {
    return (
        <div className=" w-full rounded-b-lg border-x-2 border-b-2 flex sm:flex-row justify-end py-5 flex-col">
            <div className="flex justify-center items-center w-full text-2xl font-bold">
                <Link href="/">
                    Auto-Land
                </Link>

            </div>
            <div className="flex justify-center items-center min-w-60 w-full">
                <h1 className="sm:text-3xl text-lg font-medium text-red-400 sm:text-start text-center">IMPORT SAMOCHODÓW Z UE, USA I JAPONII</h1>
            </div>
        </div>
    )
}