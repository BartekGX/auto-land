"use client"

import {Button} from "@/components/ui/button";
import Link from "next/link";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import Tiptap from "@/components/tiptap";
import {useState} from "react";
import Moreinfocard from "@/components/moreinfocard";
import Photodropzone from "@/components/photodropzone";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";

export default function page() {
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [year, setYear] = useState("")
    const [process, setProcess] = useState("")
    const [power, setPower] = useState("")
    const [capacity, setCapacity] = useState("")
    const [fuel, setFuel] = useState("")
    const [drive, setDrive] = useState("")
    const [description, setDescription] = useState("");
    const [moreInfo, setMoreInfo] = useState([])
    const [files, setFiles] = useState([])


    const addMoreInfo = () => {
        const demo = {name: "", value: ""}
        setMoreInfo(prevState => prevState.concat(demo))
    }

    const sendFile = async (fileSF) => {
        const formData = new FormData()
        fileSF.forEach(file => {
            formData.append("file", file)
        })

        const res = await fetch("/api/s3-upload", {
            method: "POST",
            body: formData
        })
        if (!res.ok) {
            console.log("błąd wysyłania pliku")
            return ""
        }
        console.log("odebrano", res)
    }

    const imageDrop = async (imageFiles) => {
        if (imageFiles) {
            console.log("drop", imageFiles)
            setFiles(files.concat(imageFiles))
            console.log("pliki", files)
        }
    }
    const send = async () => {
        await sendFile(files)
        const info = {
            price: parseInt(price.replace(/\s/g, '')),
            year: parseInt(year),
            process: parseInt(process.replace(/\s/g, '')),
            power: parseInt(power),
            capacity: parseInt(capacity),
            fuel: fuel,
            drive: drive
        }
        const data= {
            name: name,
            description: description,
            info: info,
            moreInfo: moreInfo,
            photos: []
        }
        console.log(data)
        try {
            const res = await fetch(`/api/offer`, {
                method: "POST",
                body: JSON.stringify(data)
            })
            if (!res.ok) {
                throw new Error(await res.text())
            }
        } catch (e) {
            console.log(e)
        }

    }
    const removeImage = (index) => {
        setFiles(prevState => {
            const newState = [...prevState]
            newState.splice(index, 1)
            return newState
        });
    }
    return (
        <div>
            <div className="border-b-2 py-3 px-2 flex justify-between items-center">
                <div>
                    <p className="text-xl">
                        Opcje
                    </p>
                </div>
                <div>
                    <Button onClick={send}>
                            Stwórz
                    </Button>
                </div>
            </div>
            <div className="grid grid-cols-2 p-2 gap-2">
                <div className="flex flex-row gap-2 w-auto">
                    <Card className="p-3">
                        <CardHeader>
                            <CardTitle className="whitespace-nowrap text-center px-10">
                                Podstatowe dane
                            </CardTitle>
                        </CardHeader>
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="marka">marka/model</Label>
                            <Input type="text" id="marka" placeholder="marka/model" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="flex flex-col gap-2 mt-2">
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="price">cena</Label>
                                <div className="flex items-center gap-1"><Input type="text" id="price" placeholder="cena" value={price} onChange={(e) => {
                                    let newPriceValue = e.target.value.replace(/\D/g, '');
                                    newPriceValue = newPriceValue.replace(/\s/g, '');
                                    newPriceValue = newPriceValue.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
                                    setPrice(newPriceValue);}}/>zł</div>
                            </div>
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="rok">rok produkcji</Label>
                                <Input type="number" id="rok" placeholder="rok produkcji" value={year} onChange={(e) => setYear(e.target.value)}/>
                            </div>
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="przebieg">przebieg</Label>
                                <div className="flex items-center gap-1"><Input type="text" id="przebieg" placeholder="przebieg" value={process} onChange={(e) => {
                                    let newPriceValue = e.target.value.replace(/\D/g, '');
                                    newPriceValue = newPriceValue.replace(/\s/g, '');
                                    newPriceValue = newPriceValue.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
                                    setProcess(newPriceValue);}}/>km</div>
                            </div>
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="moc">moc silnika</Label>
                                <div className="flex items-center gap-1"><Input type="number" id="moc" placeholder="moc silnika" value={power} onChange={(e) => setPower(e.target.value)}/>KM</div>
                            </div>
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="pojemnosc">pojemoność silnika</Label>
                                <div className="flex items-center gap-1"><Input type="number" id="pojemnosc" placeholder="pojemoność silnika" value={capacity} onChange={(e) => setCapacity(e.target.value)}/>cm3</div>
                            </div>
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="paliwo">rodzaj paliwa</Label>
                                <Input type="text" id="paliwo" placeholder="rodzaj paliwa" value={fuel} onChange={(e) => setFuel(e.target.value)}/>
                            </div>
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="naped">napęd</Label>
                                <Input type="text" id="naped" placeholder="napęd" value={drive} onChange={(e) => setDrive(e.target.value)}/>
                            </div>
                        </div>
                    </Card>
                    <Card className="w-full">
                        <CardHeader>
                            <CardTitle className="text-center">
                                Dodatkowe informacje
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-1">
                            {moreInfo.map((item, index) => <Moreinfocard key={index} data={item} setInfo={setMoreInfo} index={index}/>)}
                            <Button onClick={addMoreInfo} className="w-full">dodaj informację</Button>
                        </CardContent>
                    </Card>
                </div>
                <div className="flex flex-col gap-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                Główne zdjęcie
                            </CardTitle>
                        </CardHeader>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-center">
                                Opis
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Tiptap setTextState={setDescription} />
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-center">
                                Zdjęcia
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Photodropzone onImageDrop={(imageFile) => imageDrop(imageFile)} type="slider"/>
                            {files.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2 justify-center">
                                <div className="border-2 rounded-lg overflow-hidden h-[100px] w-[100px] flex flex-wrap justify-center items-center text-center">
                                        razem {files.length} {files.length === 1 ? "zdjęcie" : files.length < 5 ? "zdjęcia" : files.length >= 5  && "zdjęć"}
                                </div>
                                {files.map((file, index) => (
                                    <div onClick={() => removeImage(index)} className="relative group border-2 rounded-lg overflow-hidden h-[100px] w-[100px] select-none">
                                        <div className="absolute w-full h-full top-0 left-0 flex justify-center items-center opacity-0 group-hover:opacity-100 bg-black bg-opacity-0 group-hover:bg-opacity-40 text-red-400 transition-all cursor-pointer select-none">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-x select-none" viewBox="0 0 16 16">
                                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                                            </svg>
                                        </div>
                                        <div className="flex justify-center items-center">
                                            <img src={URL.createObjectURL(file)} alt={file.name} width={100} height={100} className="object-contain object-center select-none"/>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}