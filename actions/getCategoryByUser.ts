import getCurrentUser from "./getCurrentUser";
import prisma from "@/lib/prismadb";

const getCategoryByUser = async () => {
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser) {
            return null;
        }
        const categories = await prisma.category.findMany({
            where: {
                userId: currentUser.id as string,
            },
            orderBy: {
                createdAt: 'desc',
            }
        });
        return categories;
    } catch (error: any) {
        return null;
    }
}

export default getCategoryByUser;