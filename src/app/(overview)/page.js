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
    const data = await fetch(`${process.env.API_URL}/api/offeru/meta`).then((res) => res.json())
    let products = ""
    data.forEach((product, index) => {
        products += `${index + 1}. ${product.name} | cena ${product.info.price}zł\n`;
    });
    console.log(products)
    return {
        title: "AutoLand Import Samochodów z UE, USA i JAPONII",
        siteName: 'AutoLand - Import Samochodów z UE, USA i JAPONII',
        description: products,
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
                <div className="flex justify-between w-full items-end py-2 border-[#27272a] md:px-0 px-1">
                    <div>
                    <h1 className="md:text-5xl sm:text-2xl text-lg font-bold py-3">Samochody</h1>
                    </div>
                    <div>
                        ilość {data.length}
                    </div>
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