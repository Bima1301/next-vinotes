import { getServerSession } from "next-auth";

import { authOptions } from "@/services/authOptions";

export default async function getSession() {
    return await getServerSession(authOptions);
}