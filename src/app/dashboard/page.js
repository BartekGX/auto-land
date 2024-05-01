import { Button } from "@/components/ui/button"
import Link from 'next/link'
import Dashboardtable from "@/components/dashboardtable";
const getData = async () => {
    const apiURL = process.env.API_URL
    try {
        const res = await fetch(`${apiURL}/api/offer`, {
            method: "GET",
            cache: "no-store"
        })
        if (!res.ok) {
            console.log("Błąd pobierania danych")
            return false
        }
        return await res.json() || []
    } catch (e) {
        console.log(e)
        return false
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
               <Dashboardtable _data={data}/>
                {
                    !data ? (<div className="text-center py-4">
                        błąd pobierania postów
                    </div>) : data.length === 0 && (<div className="text-center py-4">
                        brak ogłoszeń
                    </div>)
                }
            </div>
        </div>
    )
}