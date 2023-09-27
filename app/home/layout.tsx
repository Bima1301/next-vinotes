import type { Metadata } from 'next'
import MainLayout from '../../components/organisms/MainLayout'
import getCurrentUser from '@/actions/getCurrentUser'
import getCategoryByUser from '@/actions/getCategoryByUser'

export const metadata: Metadata = {
    title: 'ViNotes - Home',
    description: 'A simple note taking app',
}

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const currentUser = await getCurrentUser();
    const category = await getCategoryByUser();
    return (
        <MainLayout
            currentUser={currentUser}
            category={category}
        >
            {children}
        </MainLayout>
    )
}
