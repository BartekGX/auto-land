import Carcard from "@/components/carcard";

const getData = async () => {
    const apiURL = process.env.API_URL
    try {
        const res = await fetch(`${apiURL}/api/offer`, {
            method: "GET",
            cache: "no-store"
        })
        if (!res.ok) {
            console.log("Błąd pobierania danych")
            return []
        }
        const data = await res.json()
        return data
    } catch (e) {
        console.log(e)
        return []
    }
}
export default async function Home() {
    const data = await getData()
    return (
        <main className="flex min-h-screen flex-col items-center">
            <div className="w-full max-w-[1100px]">
                <div className="flex justify-between w-full items-end py-2 border-[#27272a]">
                    <div>
                    <h1 className="text-5xl font-bold py-3">Samochody</h1>
                    </div>
                    <div>
                        ilość {data.length}
                    </div>
                </div>
                {data.length > 0 ? (
                <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3 m-2">
                    {data.map(item => <Carcard key={item.id} reference={item.reference} name={item.name} price={item.info.price.toLocaleString()} yearProduction={item.info.year} process={item.info.process.toLocaleString()} power={item.info.power} engineSize={item.info.capacity} fuel={item.info.fuel} drive={item.info.drive} isSold={item.isSold}/>)}
                </div>
                ) : (
                    <div className="w-full">
                        <p className="text-center">Brak samochodów do wyświetlenia</p>
                    </div>
                )}
            </div>

        </main>
    );
}