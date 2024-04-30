import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import parser from "html-react-parser"
import "../../../components/tiptapstyle.css"

const getData = async (name) => {
    const apiURL = process.env.API_URL
    try {
        const res = await fetch(`${apiURL}/api/offer/${name}`, {
            method: "GET",
            cache: "no-store"
        })
        if (!res.ok) {
            console.log("Błąd pobierania danych")
            return []
        }
        const data = await res.json()
        return data[0]
    } catch (e) {
        console.log(e)
    }
}

export default async function page({ params}) {
    const { name } = params
    const data = await getData(name)
    return (
        <div className="flex relative p-3 gap-2">
            <div className="w-full flex flex-col gap-2">
                <Card className="h-[500px]">
                    zdjęcia
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>
                            Opis
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CardDescription className="text-box">
                            {parser(data.description)}
                        </CardDescription>
                    </CardContent>
                </Card>
            </div>
            <div className="sticky top-2 h-full">
                <Card className="w-[400px]">
                    <CardHeader>
                        <CardTitle>{data.name}</CardTitle>
                        <CardDescription className="text-xl mt-4">{data.info.price.toLocaleString()} zł</CardDescription>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2">
                            <div className="flex flex-wrap flex-col">
                                <span className="text-gray-400">rok produkcji</span>
                                <p className="font-medium">{data.info.year}</p>
                            </div>
                            <div className="flex flex-wrap flex-col">
                                <span className="text-gray-400">przebieg</span>
                                <p className="font-medium">{data.info.process.toLocaleString()} km</p>
                            </div>
                            <div className="flex flex-wrap flex-col">
                                <span className="text-gray-400">moc silnika</span>
                                <p className="font-medium">{data.info.power} KM</p>
                            </div>
                            <div className="flex flex-wrap flex-col">
                                <span className="text-gray-400">pojemność silnika</span>
                                <p className="font-medium">{data.info.capacity} cm<sup>3</sup></p>
                            </div>
                            <div className="flex flex-wrap flex-col">
                                <span className="text-gray-400">rodzaj paliwa</span>
                                <p className="font-medium">{data.info.fuel}</p>
                            </div>
                            <div className="flex flex-wrap flex-col">
                                <span className="text-gray-400">napęd</span>
                                <p className="font-medium">{data.info.drive}</p>
                            </div>
                        {data.moreInfo.map((item, index) => (
                            item.name && item.value && (
                                <div key={item.name + index} className="flex flex-wrap flex-col">
                                    <span className="text-gray-400">{item.name}</span>
                                    <p className="font-medium">{item.value}</p>
                                </div>
                            )
                        ))}

                    </CardContent>
                </Card>
            </div>
        </div>
    )
}