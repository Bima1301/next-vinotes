import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_KEY,
    api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_SECRET,
});

export async function POST(request: Request) {
    const { path } = await request.json();

    if (!path) {
        return NextResponse.json("Image path is required", { status: 400 });
    }

    try {
        const options = {
            use_filename: true,
            unique_filename: false,
            overwrite: true,
            transformation: [{ crop: "scale" }],
        };

        const result = await cloudinary.uploader.upload(path, options);

        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        return NextResponse.json("Failed to upload image on Cloudinary", { status: 500 });
    }
}