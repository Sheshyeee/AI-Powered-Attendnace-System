import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Record Attendance',
        href: '/manager/employees',
    },
];

export default function Employees() {
    const { department } = usePage<{ department: { id: number; name: string } }>().props;

    const [time, setTime] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();

            let hours = now.getHours();
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');

            const ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12 || 12; // convert 0 → 12 and 13–23 → 1–11

            setTime(`${hours}:${minutes}:${seconds} ${ampm}`);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex w-full items-center justify-center p-4 text-center">
                <p className="text-[60px] tracking-widest">{time}</p>
                <div>
                    <div>
                        <Card>
                            <CardHeader>
                                <CardTitle>Card Title</CardTitle>
                                <CardDescription>Card Description</CardDescription>
                            </CardHeader>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
