"use client"

import Photodropzone from "@/components/photodropzone"
import { useState } from "react"

export default function page() {
    const [files, setFiles] = useState([])
    const imageDrop = async (imageFiles) => {
        if (imageFiles) {
            setFiles(files.concat(imageFiles))
        }
    }
    const sendFile = async () => {
        const formData = new FormData()
        files.forEach(file => {
            formData.append("file", file)
        })
        const res = await fetch("/api/s3-up", {
            method: "POST",
            body: formData
        })
        if (!res.ok) {
            console.log("błąd wysyłania pliku")
            return ""
        }
    }

    return (
        <div>
            <Photodropzone onImageDrop={(imageFile) => imageDrop(imageFile)} type="slider"/>
            <button onClick={sendFile}>
                wyślij
            </button>
            <p>{files.length}</p>
        </div>

    )
}
