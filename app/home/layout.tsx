import type { Metadata } from 'next'
import MainLayout from './components/MainLayout'

export const metadata: Metadata = {
    title: 'Dashboard Attendance App',
    description: 'A Web App for Attendance',
}

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <MainLayout>
            {children}
        </MainLayout>
    )
}
