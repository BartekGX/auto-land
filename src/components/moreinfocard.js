"use client"
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import { useState, useEffect} from "react";

export default function Moreinfocard({ data, setInfo, index }) {
    const [newName, setNewName] = useState(data.name)
    const [newValue, setNewValue] = useState(data.value)

    useEffect(() => {
        setInfo(prevItems => {
            return prevItems.map((item, i) => {
                if (i === index) {
                    return {name: newName, value: newValue};
                }
                return item;
            })
            })
    }, [newName, newValue])

    const handleRemove = () => {
        setInfo(prevItems => {
            return prevItems.filter((item, i) => i !== index);
        });
    }
    return (
        <div className="flex gap-2">
            <Input type="text" value={newName} placeholder="nazwa" onChange={e => setNewName(e.target.value)}/>
            <Input type="text" value={newValue} placeholder="wartość" onChange={e => setNewValue(e.target.value)}/>
            <Button variant="outline" size="icon" onClick={handleRemove}><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
            </svg></Button>
        </div>
    )
}