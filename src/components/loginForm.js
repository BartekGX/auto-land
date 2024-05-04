"use client"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {useState} from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")
    const [login2, setLogin2] = useState("")
    const [email2, setEmail2] = useState("")
    const [password2, setPassword2] = useState("")

    const router = useRouter()

    const handleSubmitLogin = async (e) => {
        e.preventDefault()

        if (!login || !password) return
        try {
            const res = await signIn('credentials', {
                name: login, password, redirect: false
            })

            if (res.error) {
                console.log("invalid credentials")
            }
            router.replace("/dashboard")
        } catch (e) {
            console.log(e)
        }

    }
    const handleSubmitRegister = async (e) => {
        e.preventDefault()

        if (!login2 || !password2 || !email2) return

        try {
            const resUserExists = await fetch("api/userExists", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email2 })
            })

            const {user} = await resUserExists.json();

            if(user) {
                console.log("user already exists")
                return
            }

            const res = await fetch('api/register', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: login2,
                    email: email2,
                    password: password2
                })
            })
            if (res.ok) {
                const form = e.target;
                form.reset();
            } else {
                console.log("User registration failed")
            }
        } catch (e) {
            console.log("Error during registration: ", e)
        }


    }


    return (
        <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-br from-gray-950">
            <div>
                <Card>
                    <CardHeader>
                        <div>
                            <p className="font-bold text-3xl text-center py-5">
                                AUTO LAND
                            </p>
                        </div>
                        <CardTitle className="text-center">
                            Zaloguj się
                        </CardTitle>
                        <CardContent>
                            <form onSubmit={handleSubmitLogin} className="flex gap-2 flex-col max-w-[350px] w-full mt-2">
                                <div className="grid items-center gap-1.5 w-[350px]">
                                    <Label htmlFor="login">Login</Label>
                                    <Input type="text" id="login" placeholder="Login" value={login} onChange={(e) => setLogin(e.target.value)}/>
                                </div>
                                <div className="grid items-center gap-1.5  max-w-[350px] w-full">
                                    <Label htmlFor="password">Hasło</Label>
                                    <Input type="password" id="password" placeholder="Hasło" value={password} onChange={(e) => setPassword(e.target.value)}/>
                                </div>
                                <div className="w-full mt-4">
                                    <Button className="w-full">Zaloguj</Button>
                                </div>
                            </form>
                        </CardContent>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader>
                        Zarejestruj się
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmitRegister}>
                            <div className="grid items-center gap-1.5 w-[350px]">
                                <Label htmlFor="login2">Login</Label>
                                <Input type="text" id="login2" placeholder="example123" value={login2} onChange={(e) => setLogin2(e.target.value)}/>
                            </div>
                            <div className="grid items-center gap-1.5 w-[350px]">
                                <Label htmlFor="email2">Email</Label>
                                <Input type="email" id="email2" placeholder="example@example.com" value={email2} onChange={(e) => setEmail2(e.target.value)}/>
                            </div>
                            <div className="grid items-center gap-1.5 w-[350px]">
                                <Label htmlFor="password2">Hasło</Label>
                                <Input type="password" id="password2" value={password2} onChange={(e) => setPassword2(e.target.value)}/>
                            </div>
                            <div>
                                <Button>zarejestruj się</Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}