import getCurrentUser from '@/actions/getCurrentUser';
import { uploadImage } from '@/actions/uploadImage';
import prisma from '@/lib/prismadb';
import { noteSchema } from '@/lib/types';
import { revalidatePath, revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    console.log("POST NOTE", req);
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser) {
            return NextResponse.json("You must be logged in to create a note", { status: 401 });
        }
        const body = await req.json();
        const result = noteSchema.safeParse(body);

        let zodErrors = {};
        if (!result.success) {
            zodErrors = result.error.flatten().fieldErrors
        }
        if (Object.keys(zodErrors).length > 0) {
            return NextResponse.json({ errors: zodErrors }, { status: 400 });
        } else {
            const { title, content, imageSrc } = body;
            let imageUrl;
            if (imageSrc) {
                imageUrl = await uploadImage(imageSrc);
            }

            const note = await prisma.note.create({
                data: {
                    userId: currentUser.id,
                    title: title as string,
                    content: content as string,
                    image: imageSrc ? imageUrl.url : null,
                    categoryId: '0b50e2b2-4067-46b4-beed-9e061d8b3586'
                }
            });

            return NextResponse.json({ note }, { status: 201 });
        }

    } catch (error: any) {
        console.log(error, "REGISTER ERROR");
        return NextResponse.json("Something went wrong", { status: 500 });
    }

};