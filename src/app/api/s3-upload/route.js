import {S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import {NextResponse} from "next/server";
import sharp from "sharp"

export const dynamic = 'force-dynamic';
const s3Client = new S3Client({
    region: process.env.AWS_S3_REGION,
    credentials: {
        accessKeyId: process.env.AWS_S3_ACCESS_KEY,
        secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
    }
})

async function uploadFileToS3(file, filename) {
    const fileBuffer = file

    const params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: filename,
        Body: fileBuffer,
        ContentType: "image/jpg"
    }
    const command = new PutObjectCommand(params);
    await s3Client.send(command);
    return filename
}

export async function POST(req) {
    try {
        const data = await req.formData();
        const files = data.getAll("file");
        for (const file of files) {
            const extension = file.name.split('.').pop();
            const oldName = file.name.split('.')
            const newFileName = `${oldName[0]}-${Date.now()}.${extension}`;
            const buffer = Buffer.from(await file.arrayBuffer());
            const processedImage = await sharp(buffer)
                .resize(1920, 1080, {
                    fit: 'inside',
                    withoutEnlargement: true,
                })
                .toFormat('jpg')
                .toBuffer();
            console.log(newFileName)
            // const fileName = await uploadFileToS3(processedImage, newFileName);

        }
        if (!file) return NextResponse.json( { error: "File is required."}, { status: 400 })





        return NextResponse.json({ success: true, fileName})
    } catch (e) {
        return NextResponse.json({ error: "Error uplading file"})
    }
}
export async function DELETE(req) {
    const img = req.nextUrl.searchParams.get("img");
    const params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: img
    }
    try {
        const command = new DeleteObjectCommand(params);
        // await s3Client.send(command)
        return NextResponse.json({message: "deleted"}, { status: 200 })
    } catch (e) {
        console.log("error", e)
        return NextResponse.json({ error: "error while deleting file"})
    }
}