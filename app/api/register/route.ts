import bcrypt from 'bcrypt';
import prisma from '@/lib/prismadb';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, name, password, confirmPassword } = body;

        if (!email || !password || !name || !confirmPassword) {
            return new NextResponse("Missing fields", { status: 400 });
        }

        if (password !== confirmPassword) {
            return new NextResponse("Passwords don't match", { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await prisma.user.create({
            data: {
                email,
                name,
                password: hashedPassword,
            }
        });

        return new NextResponse(JSON.stringify(user), { status: 201 });

    } catch (error: any) {
        console.error(error, "Register error");
        return new NextResponse("Internal server error", { status: 500 });
    }


}