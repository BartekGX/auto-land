import { connectDB } from "../../../../../utils/connect";
import Offer from "../../../../../models/offerModel";
import { NextResponse } from "next/server";
import diacritics from "diacritics";
import { DeleteObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getToken } from "next-auth/jwt";

export async function PUT(req) {
	const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
	if (!session) {
		return NextResponse.json(
			{ error: "User is not authenticated" },
			{ status: 401 }
		);
	}
	try {
		const data = await req.json();
		// console.log(data)
		// const id = req.nextUrl.searchParams.get("id")
		// const updatedData = await req.json()
		await connectDB();

		// const updatedData = req.body;

		// Zaktualizuj dane w bazie
		for (const item of data) {
			// Sprawdź, czy dokument istnieje
			const existingOffer = await Offer.findOne({ reference: item.reference });
			if (!existingOffer) {
				console.log(`Nie znaleziono oferty o reference: ${item.reference}`);
				continue;
			}

			// Jeśli dokument istnieje, zaktualizuj
			await Offer.findOneAndUpdate(
				{ reference: item.reference },
				{ position: item.position },
				{ new: true }
			);
			console.log(`Zaktualizowano ofertę: ${item.reference}`);
		}
		// await Offer.findByIdAndUpdate(id, updatedData)
		return NextResponse.json(
			{ message: "Dane zostały zaktualizowane" },
			{ status: 201 }
		);
	} catch (error) {
		console.error("error", error);
		res
			.status(500)
			.json({ message: "Wystąpił błąd podczas aktualizacji danych" });
	}
}
