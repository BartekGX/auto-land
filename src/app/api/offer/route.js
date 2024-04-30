import {connectDB} from "../../../../utils/connect";
import Offer from "../../../../models/offerModel";
import {NextResponse} from "next/server";
import diacritics from "diacritics";

export const dynamic = 'force-dynamic';
function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}
export async function GET() {
    try {
        await connectDB()
        const offers = await Offer.find({})
        return NextResponse.json(offers)
    } catch (e) {
        console.log(e)
    }
}
export async function POST(req) {
    try {
        const {name, description, info, moreInfo, photos} = await req.json();
        const noDiacritics = diacritics.remove(name)
        const reference = noDiacritics.replace(/\s+/g, '-') + "-" +  generateRandomString(4)
        await connectDB()
        await Offer.create({ name, description, info, moreInfo, photos, reference})
        return NextResponse.json({message: "Oferta stworzona"}, {status: 201})
    } catch (e) {
        console.log("error", e)
    }
}
export async function PUT(req) {
    try {
        const id = req.nextUrl.searchParams.get("id")
        const updatedData = await req.json()
        await connectDB()
        await Offer.findByIdAndUpdate(id, updatedData)
        return NextResponse.json({message: "Pomyślnie zmienione"}, {status: 201})
    } catch (e) {
        console.log("error", e)
    }
}