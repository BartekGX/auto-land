import { Bebas_Neue } from "next/font/google";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import Link from "next/link";

const S3BucketName = process.env.AWS_S3_BUCKET_NAME;
const S3Region = process.env.AWS_S3_REGION;
const neue = Bebas_Neue({ subsets: ["latin"], weight: "400" });
export default function Carcard({ reference , name = "brak nazwy", price = 0, yearProduction = "brak", process = 0, power = 0, engineSize = 0, fuel = "brak", drive = "brak", isSold, photo}) {

    const photoURL = `https://autolandstorage.s3.eu-north-1.amazonaws.com/${photo}`

    return (
        <Card className=" max-w-[350px] w-full relative overflow-hidden flex flex-col justify-between">
            {isSold &&
            <div className={neue.className + " absolute w-full h-full backdrop-blur-sm hover:backdrop-blur-none hover:opacity-10 transition-all z-50"}>
                <div className="absolute bg-black text-white flex flex-row flex-nowrap w-full text-center rotate-[6deg] top-[10%] text-3xl whitespace-nowrap"><div className="-translate-x-[10px] tracking-wider">SOLD OUT  SOLD OUT  SOLD OUT  SOLD OUT  SOLD OUT</div></div>
                <div className="absolute bg-black text-white flex flex-row flex-nowrap w-full text-center -rotate-[15deg] top-[30%] text-3xl whitespace-nowrap"><div className="-translate-x-[4px] tracking-wider">SOLD OUT  SOLD OUT  SOLD OUT  SOLD OUT  SOLD OUT</div></div>
                <div className="absolute bg-black text-white flex flex-row flex-nowrap w-full text-center rotate-[8deg] top-[55%] text-3xl whitespace-nowrap"><div className="-translate-x-[8px] tracking-wider">SOLD OUT  SOLD OUT  SOLD OUT  SOLD OUT  SOLD OUT</div></div>
                <div className="absolute bg-black text-white flex flex-row flex-nowrap w-full text-center -rotate-[6deg] top-[75%] text-3xl whitespace-nowrap"><div className="-translate-x-[17px] tracking-wider">SOLD OUT  SOLD OUT  SOLD OUT  SOLD OUT  SOLD OUT</div></div>
            </div>
            }

            <CardHeader>
                <div className="h-[200px] w-full object-contain relative">
                    {
                        photoURL !== "" ?
                        <Image src={photoURL} alt={photoURL} className="rounded-lg w-[200px] object-contain h-full" fill={true}/> :
                        <p>brak zdjęcia</p>
                    }
                </div>
            </CardHeader>
            <CardContent>
                <CardTitle>{name}</CardTitle>
                <div>
                    <div>
                        <div className="flex py-4 flex-wrap flex-col">
                            <span className="text-gray-400">cena</span>
                            <p className="text-2xl font-medium">{price} zł</p>
                        </div>
                        <div className=" grid grid-cols-2 gap-2">
                            <div className="flex flex-wrap flex-col">
                                <span className="text-gray-400">rok produkcji</span>
                                <p className="font-medium">{yearProduction}</p>
                            </div>
                            <div className="flex flex-wrap flex-col">
                                <span className="text-gray-400">przebieg</span>
                                <p className="font-medium">{process} km</p>
                            </div>
                            <div className="flex flex-wrap flex-col">
                                <span className="text-gray-400">moc</span>
                                <p className="font-medium">{power} KM</p>
                            </div>
                            <div className="flex flex-wrap flex-col">
                                <span className="text-gray-400">pojemność silnika</span>
                                <p className="font-medium">{engineSize} cm3</p>
                            </div>
                            <div className="flex flex-wrap flex-col">
                                <span className="text-gray-400">rodzaj paliwa</span>
                                <p className="font-medium">{fuel}</p>
                            </div>
                            <div className="flex flex-wrap flex-col">
                                <span className="text-gray-400">napęd</span>
                                <p className="font-medium">{drive}</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="mt-6">
                            <Button variant="outline" className="w-full" asChild><Link href={`/${reference}`}>{isSold ? "Sprzedany" : "Więcej informacji"}</Link></Button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
