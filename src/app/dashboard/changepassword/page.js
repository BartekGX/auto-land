"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import CryptoJS from "crypto-js";
import {useSession} from "next-auth/react";
import bcrypt from "bcryptjs";

export default function page() {
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [newPassword2, setNewPassword2] = useState("")
    const { data: session } = useSession();

    const encryptPassword = (password, secretKey) => {
        return CryptoJS.AES.encrypt(password, secretKey).toString();
    };

    const send = async (e) => {
        e.preventDefault()
        if (newPassword !== newPassword2) return null
        if (session) {
            const hashedPassword = encryptPassword(oldPassword, process.env.SECRET_KEY)
            const hashedNewPassword = encryptPassword(newPassword, process.env.SECRET_KEY)
            const hashedUser = encryptPassword(session.user.name, process.env.SECRET_KEY)
            try {
                const res = fetch("/api/chpass", {
                    method: "PUT",
                    body: JSON.stringify({value: [hashedPassword, hashedNewPassword, hashedUser]})
                })
                if (!res.ok) {
                    console.log("błąd podczas zmiany hasła")
                    return null
                }
                const info = res.json()
                console.log(info)

            } catch (e) {
                console.log(e)
            }
        }
    }
    return (
        <div className="flex justify-center items-center py-20">
            <Card>
                <CardHeader>
                    <CardTitle>
                        Zmiana hasła
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={send} className="flex flex-col gap-2">
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="password1">Stare hasło</Label>
                            <Input type="password" id="password1" placeholder="Hasło" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)}/>
                        </div>
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="password2">Nowe hasło</Label>
                            <Input type="password" id="password2" placeholder="Hasło" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}/>
                        </div>
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="password3">Nowe hasło</Label>
                            <Input type="password" id="password3" placeholder="Hasło" value={newPassword2} onChange={(e) => setNewPassword2(e.target.value)}/>
                        </div>
                        <div>
                            <Button>Zmień hasło</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>

    )
}