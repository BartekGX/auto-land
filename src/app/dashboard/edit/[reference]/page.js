import Dashboardeditbox from "@/components/dashboardeditbox";


const apiURL = process.env.API_URL
const getData = async (reference) => {
    try {
        const res = await fetch(`${apiURL}/api/offer/${reference}`, {
            method: "GET",
            cache: "no-store"
        })
        if (!res.ok) {
            console.log("błąd pobierania danych")
            return false
        }
        const data = await res.json()
        return data[0]
    } catch (e) {
        console.log("błąd podczas pobierania danych")
        return false
    }
}

export default async function page({ params }) {
    const { reference } = params
    const data = await getData(reference)
    return (
        <div>
            {data ? (
                <Dashboardeditbox _data={data}/>
            ) : (
                <div>błąd pobierania danych</div>
            )}
        </div>
    )
}