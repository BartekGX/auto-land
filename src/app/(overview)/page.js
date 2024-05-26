import Carcard from "@/components/carcard";

const getData = async () => {
    const apiURL = process.env.API_URL
    try {
        const res = await fetch(`${apiURL}/api/offeru`, {
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

export async function generateMetadata() {
    return {
        title: "AutoLand Import Samochodów z UE, USA i JAPONII",
        siteName: 'AutoLand - Import Samochodów z UE, USA i JAPONII',
        description: 'AutoLand Piotr Wójcik - Import Samochodów z UE, USA i JAPONII, Rawa Mazowiecka. Kontakt: +48 602 22 00 44 | +48 572 37 00 37',
        locale: 'pl_PL',
        type: 'website',
        keywords: "Rawa Mazowiecka Piotr Wójcik samochody na zamównienie sprowadzamy import USA UE Japonia"
    }
}

export default async function Home() {
    const data = await getData()
    return (
        <main className="flex min-h-screen flex-col items-center">
            <div className="w-full max-w-[1100px]">
                <div className="w-full pt-2 md:px-0 px-1">
                    <h1 className="md:text-2xl sm:text-xl text-lg font-medium pt-3 text-center">OFERTA POJAZDÓW</h1>
                </div>
                {data.length > 0 ? (
                <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3 m-2">
                    {data.map(item => <Carcard key={item.id} reference={item.reference} name={item.name} price={item.info.price.toLocaleString()} yearProduction={item.info.year} process={item.info.process.toLocaleString()} power={item.info.power} engineSize={item.info.capacity} fuel={item.info.fuel} drive={item.info.drive} isSold={item.isSold} photo={item.photo}/>)}
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