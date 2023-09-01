import type { Metadata } from 'next'
import MainLayout from '../../components/organisms/MainLayout'
import getCurrentUser from '@/actions/getCurrentUser'

export const metadata: Metadata = {
    title: 'Dashboard Attendance App',
    description: 'A Web App for Attendance',
}

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const currentUser = await getCurrentUser();
    return (
        <MainLayout
            currentUser={currentUser}
        >
            {children}
        </MainLayout>
    )
}
