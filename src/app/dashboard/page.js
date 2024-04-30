import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import Dashboardtablerow from "@/components/dashboardtablerow";
const getData = async () => {
    const apiURL = process.env.API_URL
    try {
        const res = await fetch(`${apiURL}/api/offer`, {
            method: "GET",
            cache: "no-store"
        })
        if (!res.ok) {
            console.log("elo")
            console.log("Błąd pobierania danych")
            return []
        }
        const data = await res.json() || []
        console.log(data)
        return data
    } catch (e) {
        console.log(e)
    }
}
export default async function page() {
    const data = await getData()
    return (
        <div>
            <div className="border-b-2 py-3 px-2 flex justify-between items-center">
                <div>
                    <p className="text-xl">
                        Opcje
                    </p>
                </div>
                <div>
                    <Button asChild>
                        <Link href="/dashboard/create">
                            Dodaj ogłoszenie
                        </Link>
                    </Button>
                </div>

            </div>
            <div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[60px] text-center">Lp.</TableHead>
                            <TableHead>Nazwa</TableHead>
                            <TableHead className="w-[250px] text-center">Cena</TableHead>
                            <TableHead className="text-center">Publiczny</TableHead>
                            <TableHead className="text-center w-[100px]">Sprzedany</TableHead>
                            <TableHead className="text-center">opcje</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.length > 0 && data.map((item, index) => (
                            <Dashboardtablerow key={item.key} item={item} index={index}/>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}