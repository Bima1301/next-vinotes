"use server"

import { NextResponse } from "next/server";
import getCurrentUser from "./getCurrentUser";
import prisma from "@/lib/prismadb";
import { revalidatePath } from "next/cache";
import { categorySchema } from "@/lib/types";

const createCategory = async (data: unknown) => {

    try {
        const currentUser = await getCurrentUser();
        if (!currentUser) {
            return {
                status: 'error',
                type: 'unauthorized',
                message: 'You must be logged in to create a category.',
            }
        }
        const result = categorySchema.safeParse(data)
        if (!result.success) {
            let zodErrors = {};
            if (!result.success) {
                zodErrors = result.error.flatten().fieldErrors

                return {
                    status: 'error',
                    type: 'validation',
                    message: 'Validation error.',
                    errors: zodErrors,
                }
            }

        }
        const { name, color } = data as { name: string, color: string };

        await prisma.category.create({
            data: {
                name,
                color,
                user: {
                    connect: {
                        id: currentUser.id as string,

                    }
                }
            }
        });

        revalidatePath('/home');

        return {
            status: 'success',
            type: 'success',
            message: 'Category created successfully.',
        }

    } catch (error: any) {
        return {
            status: 'error',
            type: 'error',
            message: 'Something went wrong.',
        }
    }
}

export default createCategory;