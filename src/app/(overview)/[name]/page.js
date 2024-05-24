import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import parser from "html-react-parser"
import "../../../components/tiptapstyle.css"
import Link from "next/link";
import ImageSlider from "@/components/imageslider";
import striptags from "striptags";

export async function generateMetadata({ params }) {
    const product = await fetch(`${process.env.API_URL}/api/offeru/meta/${params.name}`).then((res) => res.json())
    return {
        title: product?.name || "zły odnościk",
        applicationName: "AutoLand Import Samochodów z UE, USA i JAPONII",
        siteName: 'AutoLand - AutoLand Import Samochodów z UE, USA i JAPONII',
        description: striptags(product?.description) || "AutoLand Import Samochodów z UE, USA i JAPONII",
        locale: 'pl_PL',
        type: 'website',
        keywords: "Rawa Mazowiecka Piotr Wójcik samochody na zamównienie sprowadzamy import USA UE Japonia"
    }
}

const getData = async (name) => {
    const apiURL = process.env.API_URL
    try {
        const res = await fetch(`${apiURL}/api/offeru/${name}`, {
            method: "GET",
            cache: "no-store"
        })
        if (!res.ok) {
            console.log("Błąd pobierania danych")
            return false
        }
        const data = await res.json()
        return data[0]
    } catch (e) {
        console.log(e)
        return false
    }
}
export default async function page({ params }) {
    const { name } = params
    const data = await getData(name)
    const allPhotos = data ? [...data.photos, data.photo] : []
    return (
            <div className="flex relative sm:px-3 px-0 py-3 gap-2 md:flex-row flex-col-reverse w-full">

                {data ? (
                    <div className="grid lg:grid-cols-[1fr_400px] grid-cols-1 gap-3 w-full">
                        <div className="w-full flex flex-col gap-2 row-start-2 lg:row-start-auto">
                            <Card className="flex justify-center">
                                {data.photos.length > 0 ? (
                                    <ImageSlider urls={allPhotos}/>
                                ) : (
                                    <div className="py-32">
                                        brak zdjęć
                                    </div>
                                )}
                            </Card>
                            <Card className="w-full lg:hidden">
                                <CardHeader>
                                    <CardTitle>{data.name === "" ? "brak nazwy" : data.name}</CardTitle>
                                    <div className="flex flex-wrap flex-col">
                                        <span className="text-gray-400 text-lg">cena</span>
                                        <p className="font-medium text-2xl whitespace-nowrap">{data.info.price.toLocaleString()} zł</p>
                                    </div>
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
                                        <p className="font-medium">{data.info.fuel === "" ? "brak" : data.info.fuel}</p>
                                    </div>
                                    <div className="flex flex-wrap flex-col">
                                        <span className="text-gray-400">napęd</span>
                                        <p className="font-medium">{data.info.drive === "" ? "brak" : data.info.drive}</p>
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
                            <Card>
                                <CardHeader>
                                    <CardTitle>
                                        Opis
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-box">
                                        {parser(data.description)}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                        <div className=" h-full">
                            <Card className="lg:w-[400px] w-full lg:sticky lg:top-2 lg:block hidden">
                                <CardHeader>
                                    <CardTitle>{data.name}</CardTitle>
                                    <div className="flex flex-wrap flex-col">
                                        <span className="text-gray-400 text-lg">cena</span>
                                        <p className="font-medium text-2xl whitespace-nowrap">{data.info.price.toLocaleString()} zł</p>
                                    </div>
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
                                        <p className="font-medium">{data.info.fuel === "" ? "brak" : data.info.fuel}</p>
                                    </div>
                                    <div className="flex flex-wrap flex-col">
                                        <span className="text-gray-400">napęd</span>
                                        <p className="font-medium">{data.info.drive === "" ? "brak" : data.info.drive}</p>
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
                ) : (<div className="py-10 w-full text-center"><p className="text-2xl">Niepoprawny odnościk - brak
                    takiego zasobu</p>
                    <Link href="/" className="text-gray-400 text-lg">strona główna</Link></div>)}
            </div>
    )
}