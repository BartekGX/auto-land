import {connectDB} from "../../../../utils/connect";
import Offer from "../../../../models/offerModel";
import {NextResponse} from "next/server";
import diacritics from "diacritics";
import {DeleteObjectCommand, S3Client} from "@aws-sdk/client-s3";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {getToken} from "next-auth/jwt";

export const dynamic = 'force-dynamic';

const s3Client = new S3Client({
    region: process.env.AWS_S3_REGION,
    credentials: {
        accessKeyId: process.env.AWS_S3_ACCESS_KEY,
        secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
    }
})

function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}
export async function GET(req) {
    const session = await getToken({req, secret:process.env.NEXTAUTH_SECRET})
    if (!session) {
        return NextResponse.json({error: "User is not authenticated"}, {status: 401})
    }
    try {
        await connectDB()
        const offers = await Offer.find({}).sort({ position: 1 })
        return NextResponse.json(offers)
    } catch (e) {
        console.log(e)
    }
}
export async function POST(req) {
    const session = await getToken({req, secret:process.env.NEXTAUTH_SECRET})
    if (!session) {
        return NextResponse.json({error: "User is not authenticated"}, {status: 401})
    }
    try {
        const {name, description, info, moreInfo, photos, photo} = await req.json();
        const noDiacritics = diacritics.remove(name)
        const reference = noDiacritics.replace(/\s+/g, '-') + "-" +  generateRandomString(4)
        await connectDB()
        await Offer.create({ name, description, info, moreInfo, photo, photos, reference})
        return NextResponse.json({message: "Oferta stworzona"}, {status: 201})
    } catch (e) {
        console.log("error", e)
    }
}
export async function PUT(req) {
    const session = await getToken({req, secret:process.env.NEXTAUTH_SECRET})
    if (!session) {
        return NextResponse.json({error: "User is not authenticated"}, {status: 401})
    }
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
export async function DELETE(req) {
    const session = await getToken({req, secret:process.env.NEXTAUTH_SECRET})
    if (!session) {
        return NextResponse.json({error: "User is not authenticated"}, {status: 401})
    }
    const {reference, photo, photos} = await req.json()
    let photosToDelete = []


    if  ((photo.length + photos.length) === 0) NextResponse.json({error: "brak zdjęć do usunięcia"}, {status: 400})
    else if (photo.length === 0) photosToDelete = photos
    else if (photos.length === 0) photosToDelete = [photo]
    else photosToDelete = [photo, ...photos]
    try {
        if (reference !== undefined) {
            await connectDB()
            await  Offer.findOneAndDelete({ reference: reference })
        }

        for (const photoToDelete of photosToDelete) {
            const params = {
                Bucket: process.env.AWS_S3_BUCKET_NAME,
                Key: photoToDelete
            }
            const command = new DeleteObjectCommand(params);
            await s3Client.send(command)
        }
        return NextResponse.json({ message: "deleted" }, { status: 201 })
    } catch (e) {
        console.log(e)
    }
}