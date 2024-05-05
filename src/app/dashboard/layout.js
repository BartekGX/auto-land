"use client"

import {Button} from "@/components/ui/button";
import {signOut, useSession} from "next-auth/react";
import Link from "next/link";

export default function layout({ children }) {
    const { data: session } = useSession();
    return (
        <div className="flex flex-col max-w-screen-2xl mx-auto">
            <div className="border-b-2 p-2 flex flex-row justify-between">
                <div className="py-3">
                    <Link href="/dashboard">
                        <h1 className="sm:text-2xl md:text-xl text-lg">
                            Dashboard Auto-Land
                        </h1>
                    </Link>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                    <div>
                        <Button asChild>
                            <Link href="/dashboard/changepassword">
                                Zmień hasło
                            </Link>
                        </Button>
                    </div>
                    <div>
                        <Button onClick={() => signOut()}>Wyloguj</Button>
                    </div>
                </div>
            </div>
            <div>
                {children}
            </div>
        </div>
    )
}