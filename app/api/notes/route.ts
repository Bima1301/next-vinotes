import getCurrentUser from '@/actions/getCurrentUser';
import prisma from '@/lib/prismadb';
import { noteSchema } from '@/lib/types';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
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
            const { title, content, image } = body;
            const note = await prisma.note.create({
                data: {
                    userId: currentUser.id,
                    title: title as string,
                    content: content as string,
                    image: image as string,
                }
            });
            return NextResponse.json({ note }, { status: 201 });
        }

    } catch (error: any) {
        console.log(error, "REGISTER ERROR");
        return NextResponse.json("Something went wrong", { status: 500 });
    }

};