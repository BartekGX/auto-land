"use client"

import {Button} from "@/components/ui/button";
import {signOut, useSession} from "next-auth/react";
import { getSession } from "next-auth/react";

export default function layout({ children }) {
    const { data: session } = useSession();
    if (session) console.log(session)
    return (
        <div className="flex flex-col max-w-screen-2xl mx-auto">
            <div className="border-b-2 p-2 flex flex-row justify-between">
                <div className="py-3">
                    <h1 className="text-2xl">
                        Dashboard Auto-Land
                    </h1>
                </div>
                <div className="flex items-center">
                    <Button onClick={() => signOut()}>Wyloguj</Button>
                </div>
            </div>
            <div>
                {children}
            </div>
        </div>
    )
}