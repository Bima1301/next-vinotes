
import prisma from "@/lib/prismadb";
import getCurrentUser from "./getCurrentUser";
const getNotesData = async () => {
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser) {
            return null;
        }
        const notes = await prisma.note.findMany({
            where: {
                userId: currentUser.id as string,
            },
            orderBy: {
                createdAt: 'desc',
            }
        });
        return notes;

    } catch (error: any) {
        return null;
    }
}

export default getNotesData;