"use client"

import {Button} from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import Tiptap from "@/components/tiptap";
import {useEffect, useState} from "react";
import Photodropzone from "@/components/photodropzone";
import {useRouter} from "next/navigation";
import MoreInfoBox from "@/components/moreInfoBox";
import imageCompression from "browser-image-compression";

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
    const [file, setFile] = useState([])
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")

    useEffect(() => {
        setIsLoading(false)
    }, []);

    useEffect(() => {
        setTimeout(() => {
            setError("")
        }, 5000)
    }, [error])

    async function compressAndConvertImage(file) {
        const options = {
            maxSizeMB: 0.7,
            maxWidthOrHeight: 720,
            useWebWorker: true,
            fileType: 'image/jpeg',
            initialQuality: 0.75
        };

        try {
            const compressedFile = await imageCompression(file, options);
            return compressedFile;
        } catch (error) {
            console.error(error);
        }
    }
    async function compressFiles(files) {
        const compressedFiles = [];
        for (const file of files) {
            const compressedFile = await compressAndConvertImage(file);
            compressedFiles.push(compressedFile);
        }
        return compressedFiles;
    }


    function chunkArray(array, size) {
        const result = [];
        for (let i = 0; i < array.length; i += size) {
            result.push(array.slice(i, i + size));
        }
        return result;
    }

    async function sendFilesInChunks(files, chunkSize) {
        const compressedFiles = await compressFiles(files);
        const chunks = chunkArray(compressedFiles, chunkSize);
        let allNewPhotos = [];

        for (const chunk of chunks) {
            const newPhotos = await sendFile(chunk);
            allNewPhotos = allNewPhotos.concat(newPhotos);
        }

        return allNewPhotos;
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
        const resData = await res.json()
        return resData.fileNames
    }

    const imageDrop = async (imageFiles) => {
        if (imageFiles) {
            setFiles(files.concat(imageFiles))
        }
    }
    const mainImageDrop = async (imageFile) => {
        if (imageFile) {
            setFile(imageFile)
        }
    }
    const send = async () => {
        if (name === "" || price === "" || year === "" || process === "" || power === "" || capacity === "" || fuel === "" || drive === "" || file.length === 0) {
            setIsLoading(false)
            setError("wypełnij podstatowe dane i główne zdjęcie")
            return
        }
        setIsLoading(true)
        const photo = await sendFile(file)
        const photos = await sendFilesInChunks(files, 5)
        const info = {
            price: parseInt(price.replace(/\s/g, '')) || 0,
            year: parseInt(year) || 0,
            process: parseInt(process.replace(/\s/g, '')) || 0,
            power: parseInt(power) || 0,
            capacity: parseInt(capacity) || 0,
            fuel: fuel,
            drive: drive
        }
        const data= {
            photo: photo[0],
            name: name,
            description: description,
            info: info,
            moreInfo: moreInfo,
            photos: photos
        }
        try {
            const res = await fetch(`/api/offer`, {
                method: "POST",
                body: JSON.stringify(data)
            })
            if (!res.ok) {
                throw new Error(await res.text())
            }
            router.push("/dashboard")
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
                {error !== "" && (
                    <div className="sm:text-base text-sm text-center text-red-400">
                        {error}
                    </div>
                )}
                <div>
                    <Button onClick={send} disabled={isLoading}>
                            Stwórz
                    </Button>
                </div>
            </div>
            <div className="grid lg:grid-cols-2 p-2 gap-2 grid-cols-1">
                <div className="flex sm:flex-row gap-2 w-auto flex-col">
                    <Card className="p-3 md:w-auto sm:w-full mx-auto">
                        <CardHeader>
                            <CardTitle className="whitespace-nowrap text-center md:px-10 sm:px-5 px-3 md:text-2xl text-lg">
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
                    <div className="h-full flex flex-col gap-2 w-full">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-center">
                                    Główne zdjęcie
                                </CardTitle>
                                <div>
                                    <div>
                                        <Photodropzone onImageDrop={(imageFile) => mainImageDrop(imageFile)}/>
                                    </div>
                                    <div className="mt-2">
                                        {file.length > 0 && (
                                            <div className="flex justify-center items-center max-w-full max-h-[300px] object-contain overflow-hidden relative group" title="usuń zdjęcie" onClick={() => setFile([])}>
                                                <div className="absolute w-full h-full bg-black bg-opacity-40 text-red-400 flex justify-center items-center cursor-pointer group-hover:opacity-100 opacity-0 transition-opacity">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50"
                                                         fill="currentColor" className="bi bi-x select-none"
                                                         viewBox="0 0 16 16">
                                                        <path
                                                            d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                                                    </svg>
                                                </div>
                                                <img src={URL.createObjectURL(file[0])} alt={file[0]}
                                                     className="object-contain select-none w-full max-h-[300px]"/>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </CardHeader>
                        </Card>
                        <MoreInfoBox moreInfo={moreInfo} setMoreInfo={setMoreInfo}/>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-center">
                                    Dodatkowe zdjęcia
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Photodropzone onImageDrop={(imageFile) => imageDrop(imageFile)} type="slider"/>
                                {files.length > 0 && (
                                <div className="flex flex-wrap gap-1 mt-2 justify-center max-h-[300px] overflow-y-auto">
                                    <div className="border-2 rounded-lg overflow-hidden h-[100px] w-[100px] flex flex-wrap justify-center items-center text-center">
                                            razem {files.length} {files.length === 1 ? "zdjęcie" : files.length < 5 ? "zdjęcia" : files.length >= 5  && "zdjęć"}
                                    </div>
                                    {files.map((_file, index) => (
                                        <div key={_file.name + index} onClick={() => removeImage(index)} className="relative group border-2 rounded-lg overflow-hidden h-[100px] w-[100px] select-none">
                                            <div className="absolute w-full h-full top-0 left-0 flex justify-center items-center opacity-0 group-hover:opacity-100 bg-black bg-opacity-0 group-hover:bg-opacity-40 text-red-400 transition-all cursor-pointer select-none">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-x select-none" viewBox="0 0 16 16">
                                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                                                </svg>
                                            </div>
                                            <div className="flex justify-center items-center w-full h-full">
                                                <img src={URL.createObjectURL(_file)} alt={_file.name} width={100} height={100} className="object-contain object-center select-none"/>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                )}
                            </CardContent>
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
                </div>
            </div>
        </div>
    )
}